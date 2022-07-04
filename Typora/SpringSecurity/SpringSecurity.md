# SpringSecurity

## 简介

- Spring Security 基于 Spring 框架，提供了一套Web应用安全性的完整解决方案

- 重要核心功能包括用户认证（Authentication） 和用户授权（Authorization）

- 本质上是一个过滤器链

	![image-20220302191741225](C:\Users\67090\Desktop\Typora\SpringSecurity\SpringSecurity过滤器流程.png)
	- UsernamePasswordAuthorizationFilter：负责处理我们在登录页面填写了用户名密码后的登录其你去，主要负责认证工作
	- ExceptionTranslationFilter：处理过滤器链中抛出的任何AccessDeniedException和AuthorizationException
	- FilterSecurityInterceptor：负责权限校验的过滤器

### 对比Shiro

- SpringSecurity
	- 和Spring无缝整合
	- 全面的权限控制
	- 专门为Web开发而设计，新版本对整个框架进行了分层抽取，分成了核心模块和Web模块。单独引入核心模块就可以脱离Web环境
	- 重量级
- Shiro（Apache）
	- 轻量级：Shiro主张的理念是把复杂的事情变简单，针对对性能有更高要求的互联网应用有更好表现
	- 通用性：不局限于Web环境，可以脱离Web环境使用，但是在Web环境下一些特定的需求需要手动编写代码定制

## 入门案例

- 导入依赖

	```xml
	<dependency>
	    <groupId>org.springframework.boot</groupId>
	    <artifactId>springframework.boot</groupId>
	    <artifactId>spring-boot-starter-security</artifactId>
	</dependency>
	```

- 编写TestController测试

	```java
	package com.SnHI.security.controller;
	
	import org.springframework.web.bind.annotation.GetMapping;
	import org.springframework.web.bind.annotation.RestController;
	
	@RestController
	public class TestController {
	
	    @GetMapping("/hello")
	    public String HelloSecurity() {
	        return "Hello Security";
	    }
	}
	```

- 登录页面

	![image-20220302084948848](C:\Users\67090\Desktop\Typora\SpringSecurity\入门案例-登录页面.png)
	- 用户名默认是user
	- 密码为项目启动时展示的长串代码![image-20220302085326384](C:\Users\67090\Desktop\Typora\SpringSecurity\入门案例-密码.png)

### 底层源码流程

![image-20220302193108977](C:\Users\67090\Desktop\Typora\SpringSecurity\底层源码流程.png)

## 两个重要接口

### UserDetailsService接口

- 查询数据库用户名和密码的过程

- 当什么也没有配置的时候，账号和密码是由Spring Security定义生成的，而在实际项目中账号和密码都是从数据库中查询出来的，所以要通过自定义逻辑控制认证登录逻辑，即需要创建类实现UserDetailsService接口，在该类中编写查询数据库过程并返回该接口提供的User对象

- 自定义用户名密码需要创建类继承UsernamePasswordAuthenticationFilter，重写attemptAuthentication方法获取用户名密码，重写successfulAuthentication方法编写获取成功时的逻辑，重写unsuccessfulAuthentication方法编写获取失败时的逻辑

### PasswordEncoder接口

- 数据加密接口，用于返回User对象中加密后的密码

## 设置登录信息

### 配置文件方式

- application.yml

	```yml
	spring:
	  security:
	    user:
	      name: SnHI
	      password: 123123
	```

### 配置类方式

- SecurityConfig配置类

	```java
	package com.SnHI.security.config;
	
	import org.springframework.context.annotation.Configuration;
	import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
	import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
	import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
	
	@Configuration
	public class SecurityConfig extends WebSecurityConfigurerAdapter {
	
	    @Override
	    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
	        // 对密码进行加密
	        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
	        String password = passwordEncoder.encode("123456");
	        auth.inMemoryAuthentication().passwordEncoder(new BCryptPasswordEncoder()).withUser("SnHI").password(password).roles("admin");
	    }
	}
	```

### 自定义实现类方式

- SecurityConfig配置类

	```java
	package com.SnHI.security.config;
	
	import org.springframework.beans.factory.annotation.Autowired;
	import org.springframework.context.annotation.Configuration;
	import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
	import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
	import org.springframework.security.core.userdetails.UserDetailsService;
	import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
	
	@Configuration
	public class SecurityConfig extends WebSecurityConfigurerAdapter {
	
	    @Autowired
	    private UserDetailsService userDetailsService;
	
	    /**
	     * 通过自定义实现类设置用户名密码
	     * @param auth
	     * @throws Exception
	     */
	    @Override
	    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
	        auth.userDetailsService(userDetailsService).passwordEncoder(new BCryptPasswordEncoder());
	    }
	    
	}
	```

- MyUserDetailsService自定义实现类

	```java
	package com.SnHI.security.service;
	
	import org.springframework.security.core.GrantedAuthority;
	import org.springframework.security.core.authority.AuthorityUtils;
	import org.springframework.security.core.userdetails.User;
	import org.springframework.security.core.userdetails.UserDetails;
	import org.springframework.security.core.userdetails.UserDetailsService;
	import org.springframework.security.core.userdetails.UsernameNotFoundException;
	import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
	import org.springframework.stereotype.Service;
	
	import java.util.List;
	
	@Service("userDetailsService")
	public class MyUserDetailsService implements UserDetailsService {
	
	    @Override
	    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
	        // 权限
	        List<GrantedAuthority> list = AuthorityUtils.commaSeparatedStringToAuthorityList("admin");
	        return new User("SnHI", new BCryptPasswordEncoder().encode("123123"), list);
	    }
	}
	```

	