# Token

- Token是服务端生成的一串字符串，以作客户端进行请求的一个令牌，当第一次登录后，服务器生成一个Token便将此Token返回给客户端，以后客户端只需带上这个Token前来请求数据即可，无需再次带上用户名和密码
- Token的目的是为了减轻服务器的压力，减少频繁的查询数据库，使服务器更加健壮

## 使用方式

- 用设备号/设备mac地址作为Token

	- 客户端：客户端在登录的时候获取设备的设备号/mac地址，并将其作为参数传递到服务端
	- 服务端：服务端接收到该参数后，便用一个变量来接收同时将其作为Token保存在数据库，并将该Token设置到session中，客户端每次请求的时候都要统一拦截，并将客户端传递的token和服务器端session中的token进行对比，如果相同则放行，不同则拒绝
	- 分析：此刻客户端和服务器端就统一了一个唯一的标识Token，而且保证了每一个设备拥有了一个唯一的会话。该方法的缺点是客户端需要带设备号/mac地址作为参数传递，而且服务器端还需要保存；优点是客户端不需重新登录，只要登录一次以后一直可以使用，至于超时的问题是有服务器这边来处理，如何处理？若服务器的Token超时后，服务器只需将客户端传递的Token向数据库中查询，同时并赋值给变量Token，如此，Token的超时又重新计时

- 用session值作为Token

	- 客户端：客户端只需携带用户名和密码登陆即可

	- 服务端：服务端接收到用户名和密码后并判断，如果正确了就将本地获取sessionID作为Token返回给客户端，客户端以后只需带上请求数据即可

	- 分析：这种方式使用的好处是方便，不用存储数据，但是缺点就是当session过期后，客户端必须重新登录才能进行访问数据

# JWT

- JSON Web Token，通过数字签名的方式以JSON对象为载体，在不同的服务终端之间安全的传输信息，是token的一种具体实现方式
- JWT的本质就是一个字符串，它是将用户信息保存到一个Json字符串中，然后进行编码后得到一个JWT token，并且这个JWT token带有签名信息，接收后可以校验是否被篡改，所以可以用于在各方之间安全地将信息作为Json对象传输
- JWT最常见的场景就是授权认证，一旦用户登录，后续每个请求都将包含JWT，系统在每次处理用户请求之前都要先进行JWT安全校验，通过之后再进行处理

## 组成

- JWT由3部分组成：标头(Header)、有效载荷(Payload)和签名(Signature)。在传输的时候，会将JWT的3部分分别进行Base64编码后用`.`进行连接形成最终传输的字符串

	![image-20220301084352466](C:\Users\67090\Desktop\Typora\JWT\示例.png)

- Header（标头）

	```json
	{
	    // Token类型 
		'typ': 'JWT',
	    // 算法名称
		'alg': 'HS256'
	}
	```

- Payload（载荷）

	```json
	{
	    // JWT的主体内容部分，也是一个JSON对象，包含需要传递的数据。 JWT指定七个默认字段供选择
	    /*
	    	iss：发行人
	        exp：到期时间
	        sub：主题
	        aud：用户
	        nbf：在此之前不可用
	        iat：发布时间
	        jti：JWT ID用于标识该JWT
	    */
	    
	    // 自定义私有字段，一般会把包含用户信息的数据放到payload中
		'sub': '1234567890',
		'name': 'SnHI',
		'admin': true
	}
	```

	[^注意]: **默认情况下JWT是未加密的，因为只是采用base64算法，拿到JWT字符串后可以转换回原本的JSON数据，任何人都可以解读其内容，因此不要构建隐私信息字段，比如用户的密码一定不能保存到JWT中，以防止信息泄露。JWT只是适合在网络中传输一些非敏感的信息**

- Signature（签名）

	```js
	// 签名哈希部分是对上面两部分数据签名，需要使用base64编码后的header和payload数据，通过指定的算法生成哈希，以确保数据不会被篡改。首先，需要指定一个密钥（secret）。该密码仅仅为保存在服务器中，并且不能向用户公开。然后，使用header中指定的签名算法（默认情况下为HMAC SHA256）根据以下公式生成签名
	var encodedString = base64UrlEncode(header) + '.' + base64UrlEncode(payload);
	
	var signature = HMACSHA256(encodedString, 'secret');
	```

- JWT每部分的作用
	- 在服务端接收到客户端发送过来的JWT token之后：header和payload可以直接利用base64解码出原文，从header中获取哈希签名的算法，从payload中获取有效数据
	- signature由于使用了不可逆的加密算法，无法解码出原文，它的作用是校验token有没有被篡改。服务端获取header中的加密算法之后，利用该算法加上secretKey对header、payload进行加密，比对加密后的数据和客户端发送过来的是否一致。注意secretKey只能保存在服务端，而且对于不同的加密算法其含义有所不同，一般对于MD5类型的摘要加密算法，secretKey实际上代表的是盐值

## 流程

- 首先，前端通过Web表单将自己的用户名和密码发送到后端的接口，这个过程一般是一个POST请求。建议的方式是通过SSL加密的传输(HTTPS)，从而避免敏感信息被嗅探
- 后端核对用户名和密码成功后，将包含用户信息的数据作为JWT的Payload，将其与JWT Header分别进行Base64编码拼接后签名，形成一个JWT Token，形成的JWT Token就是一个如同lll.zzz.xxx的字符串
- 后端将JWT Token字符串作为登录成功的结果返回给前端。前端可以将返回的结果保存在浏览器中，退出登录时删除保存的JWT Token即可
- 前端在每次请求时将JWT Token放入HTTP请求头中的Authorization属性中(解决XSS和XSRF问题)
- 后端检查前端传过来的JWT Token，验证其有效性，比如检查签名是否正确、是否过期、token的接收方是否是自己等等
- 验证通过后，后端解析出JWT Token中包含的用户信息，进行其他逻辑操作(一般是根据用户信息得到权限等)，返回结果
	![image-20220301092019874](C:\Users\67090\Desktop\Typora\JWT\JWT流程.png)

## 依赖

```xml
<!--JWT 依赖-->
<dependency>
   <groupId>io.jsonwebtoken</groupId>
   <artifactId>jjwt</artifactId>
   <version>0.9.0</version>
</dependency>
```

## 测试

- 加密

	```java
	/**
	 * 加密
	 */
	
	private long time = 1000 * 60 * 60 * 24;
	private String signature = "SnHI";
	
	@Test
	public void Jwt() {
	    JwtBuilder jwtBuilder = Jwts.builder();
	    String jwtToken = jwtBuilder
	        // Header
	        .setHeaderParam("typ", "JWT")
	        .setHeaderParam("alg", "HS256")
	        // payload
	        // 自定义私有字段
	        .claim("userName", "SnHI")
	        .claim("role", "admin")
	        // 有效期
	        .setExpiration(new Date(System.currentTimeMillis() + time))
	        // 主题
	        .setSubject("JWT-Test")
	        .setId(UUID.randomUUID().toString())
	        // Signature
	        .signWith(SignatureAlgorithm.HS256, signature)
	        .compact();
	    System.out.println(jwtToken);
	}
	```

- 解密

	```java
	/**
	 * 解密
	 */
	@Test
	public void parse() {
	    String token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyTmFtZSI6IlNuSEkiLCJyb2xlIjoiYWRtaW4iLCJleHAiOjE2NDYxOTczNzksInN1YiI6IkpXVC1UZXN0IiwianRpIjoiMTA4ZTk3YzAtNzU1Ni00YzFlLTkyMTEtYWE4YTA2Njk2Mzc2In0.mvk2Sq9QeiKjoYNaVed0VqpZwKDGEY0_R5kmZvGC70c";
	    JwtParser jwtParser = Jwts.parser();
	    Jws<Claims> claimsJws = jwtParser.setSigningKey(signature).parseClaimsJws(token);
	    Claims jwsBody = claimsJws.getBody();
	    System.out.println(jwsBody.getId());
	    System.out.println(jwsBody.get("userName"));
	    System.out.println(jwsBody.get("role"));
	    System.out.println(jwsBody.getExpiration());
	    System.out.println(jwsBody.getSubject());
	}
	```


## 案例

### 后端

- JwtUtils 工具类

	```java
	package com.SnHI.server.Jwt;
	
	import io.jsonwebtoken.*;
	
	import java.util.Date;
	import java.util.UUID;
	
	public class JwtUtils {
	
	    // 5秒内失效
	    private static long time = 1000 * 5;
	//    private static long time = 1000 * 60 * 60 * 24;
	    private static String signature = "SnHI";
	
	    /**
	     * 加密
	     */
	    public static String createToken() {
	        JwtBuilder jwtBuilder = Jwts.builder();
	        String jwtToken = jwtBuilder
	                // Header
	                .setHeaderParam("typ", "JWT")
	                .setHeaderParam("alg", "HS256")
	                // payload
	                .claim("userName", "admin")
	                .claim("role", "admin")
	                .setExpiration(new Date(System.currentTimeMillis() + time))
	                .setSubject("JWT-Test")
	                .setId(UUID.randomUUID().toString())
	                // Signature
	                .signWith(SignatureAlgorithm.HS256, signature)
	                .compact();
	        return jwtToken;
	    }
	
	    /**
	     * 解密
	     */
	    public static void parse() {
	        String token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyTmFtZSI6IlNuSEkiLCJyb2xlIjoiYWRtaW4iLCJleHAiOjE2NDYxOTczNzksInN1YiI6IkpXVC1UZXN0IiwianRpIjoiMTA4ZTk3YzAtNzU1Ni00YzFlLTkyMTEtYWE4YTA2Njk2Mzc2In0.mvk2Sq9QeiKjoYNaVed0VqpZwKDGEY0_R5kmZvGC70c";
	        JwtParser jwtParser = Jwts.parser();
	        Jws<Claims> claimsJws = jwtParser.setSigningKey(signature).parseClaimsJws(token);
	        Claims jwsBody = claimsJws.getBody();
	        System.out.println(jwsBody.getId());
	        System.out.println(jwsBody.get("userName"));
	        System.out.println(jwsBody.get("role"));
	        System.out.println(jwsBody.getExpiration());
	        System.out.println(jwsBody.getSubject());
	    }
	
	    /**
	     * 校验Token
	     * @param token
	     * @return
	     */
	    public static boolean checkToken(String token) {
	        if (token == null) return false;
	        try {
	            // 只检测解析是否正常，不关注token中的内容
	            Jwts.parser().setSigningKey(signature).parseClaimsJws(token);
	        } catch (Exception e) {
	            return false;
	        }
	        return true;
	    }
	
	}
	
	```

- UserController.java 控制器

	```java
	package com.SnHI.server.controller;
	
	import com.SnHI.server.Jwt.JwtUtils;
	import com.SnHI.server.pojo.User;
	import org.springframework.web.bind.annotation.GetMapping;
	import org.springframework.web.bind.annotation.RestController;
	
	import javax.servlet.http.HttpServletRequest;
	
	@RestController
	public class UserController {
	
	    private String USERNAME = "admin";
	    private String PASSWORD = "123123";
	
	    /**
	     * 客户端第一次登陆后台给予token
	     * @param user
	     * @return
	     */
	    @GetMapping("/login")
	    public User login(User user) {
	        // 登录成功
	        if (USERNAME.equals(user.getUserName()) && PASSWORD.equals(user.getPassword())) {
	            // 添加token
	            user.setToken(JwtUtils.createToken());
	            return user;
	        }
	        return null;
	    }
	
	    /**
	     * 前端每次请求都要检验token是否正确
	     * @param request
	     * @return
	     */
	    @GetMapping("/checkToken")
	    public boolean checkToken(HttpServletRequest request) {
	        String token = request.getHeader("token");
	        return JwtUtils.checkToken(token);
	    }
	
	}
	
	```

- CrosConfiguration.java 配置文件解决跨域问题

	```java
	package com.SnHI.server.config;
	
	import org.springframework.context.annotation.Configuration;
	import org.springframework.web.servlet.config.annotation.CorsRegistry;
	import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
	
	@Configuration
	public class CrosConfiguration implements WebMvcConfigurer {
	
	    // 解决跨域问题
	    @Override
	    public void addCorsMappings(CorsRegistry registry) {
	        registry.addMapping("/**")
	                .allowedOriginPatterns("*")
	                .allowedMethods("POST", "GET", "PUT", "OPTIONS", "DELETE")
	                .allowCredentials(true)
	                .allowedHeaders("*")
	                .maxAge(3600);
	    }
	}
	```

### 前端

- 前端路由

	```js
	// 该文件专门用于创建整个应用的路由器
	import Login from '../views/Login'
	import Home from '../views/Home'
	import About from '../views/About'
	import errorPage from '../views/Error'
	
	import VueRouter from 'vue-router'
	import axios from 'axios'
	
	// 创建一个路由器
	const router = new VueRouter({
	    routes: [
	        {
	            name: 'login',
	            path: '/Login',
	            component: Login
	        },
	        {
	            name: 'home',
	            path: '/Home',
	            component: Home
	        },
	        {
	            name: 'about',
	            path: '/About',
	            component: About
	        },
	        {
	            name: 'error',
	            path: '/Error',
	            component: errorPage
	        },
	    ]
	})
	
	// 每次路由跳转之前发送请求到后端校验token是否合法
	router.beforeEach((to, from, next) => {
	    if (to.path.startsWith('/Login')) {
	        window.localStorage.removeItem('admin_token')
	        next()
	    } else {
	        let admin = JSON.parse(window.localStorage.getItem('admin_token'))
	        if (!admin) {
	            next({path: '/Login'})
	        } else {
	            // 校验token合法性
	            axios({
	                url: 'http://localhost:8081/checkToken',
	                method: 'get',
	                headers: {
	                    token: admin.token
	                }
	            }).then((response) => {
	                console.log(response.data);
	                if (!response.data) {
	                    console.log('校验失败');
	                    next({path: '/Error'})
	                }
	            })
	            next()
	        }
	    }
	})
	
	export default router;
	```

- 登录页面

	```vue
	<template>
	    <div>
	        <el-form :rules="rules" class="loginContainer" ref="LoginForm" label-position="top" label-width="80px" :model="LoginInfo">
	            <h2 class="loginTitle">用户登录</h2>
	            <el-form-item prop="userName" label="用户名">
	                <el-input type="text" v-model="LoginInfo.userName" placeholder="请输入用户名"></el-input>
	            </el-form-item>
	            <el-form-item prop="password" label="密码">
	                <el-input type="password" v-model="LoginInfo.password" placeholder="请输入密码"></el-input>
	            </el-form-item>
	            <el-form-item prop="code" label="验证码">
	                <el-input type="text" style="width: 200px; margin-right: 5px" v-model="LoginInfo.code" placeholder="点击图片更换验证码"></el-input>
	                <img :src="captchaUrl">
	            </el-form-item>
	            <el-button type="primary" style="width: 100%" @click="submitForm()">登录</el-button>
	        </el-form>
	    </div>
	</template>
	           
	<script>
	    import axios from "axios";
	
	
	    export default {
	        name: 'Login',
	        components: {
	            
	        },
	        data() {
	            return {
	                captchaUrl: '',
	                LoginInfo: {
	                    userName: 'admin',
	                    password: '123123',
	                    code: '123',
	                },
	                rules: {
	                    userName: [
	                        { required: true, message: '请输入用户名', trigger: 'blur' },
	                        { min: 4, max: 12, message: '用户名长度在 4 到 12 个字符', trigger: 'blur' }
	                    ],
	                    password: [
	                        { required: true, message: '请输入密码', trigger: 'blur' },
	                        { min: 6, max: 10, message: '密码长度在 6 到 10 个字符', trigger: 'blur' }
	                    ],
	                    code: [
	                        { required: true, message: '请输入验证码', trigger: 'blur' },
	                    ],
	                },
	            }
	        },
	        methods: {
	            submitForm() {
	                this.$refs.LoginForm.validate((valid) => {
	                    // 第一次登陆将后端传来的token存入本地存储中
	                    if (valid) {
	                        axios.get("http://localhost:8081/login", {params: this.LoginInfo}).then(
	                            response => {
	                                if (response.data != null) {
	                                    localStorage.setItem("admin_token", JSON.stringify(response.data));
	                                    this.$router.push({name: 'home'});
	                                }
	                            },
	                            error => {
	                                console.log(error.message);
	                            }
	                        )
	                    } else {
	                        this.$message.error('请填写完整登录信息！');
	                        return false;
	                    }
	                });
	            }
	        },  
	    }
	</script>
	         
	<style>
	    .loginContainer {
	        width: 400px;
	        margin: 100px auto;
	        border: 1px solid #cacaca;
	        padding: 15px 35px;
	        border-radius: 15px;
	        background-clip: padding-box;
	        background: #fff;
	        box-shadow: 0 0 25px #cacaca;
	    }
	
	    .loginTitle {
	        text-align: center;
	    }
	</style>
	```

	

