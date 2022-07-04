# SpringBoot

[^SpringBoot是整合Spring技术栈的一站式框架，是简化Spring技术栈的快速开发脚手架]: 

[源码]: https://gitee.com/leifengyang/springboot2
[笔记]: https://yuque.com/atguigu/springboot
[官网]: https://spring.io/projects/spring-boot

- 优点
	- 创建独立Spring应用
	- 内嵌web服务器
	- 自动starter依赖，简化构建配置
	- 自动配置Spring以及第三方功能
	- 提供生产级别的监控、健康检查及外部化配置
	- 无代码生成、无需编写XML

# 时代背景

## 微服务

- 微服务是一种架构风格
- 一个应用拆分为一组小型服务
- 每个服务运行在自己的进程内，也就是可独立部署和升级
- 服务之间使用轻量级HTTP交互
- 服务围绕业务功能拆分
- 可以由全自动部署机制独立部署
- 去中心化，服务自治，服务可以使用不同的语言、不同的存储技术

## 分布式

- 远程调用：不同的服务分布在不同的机器上，需要进行远程调用，一般用HTTP进行交互
- 服务发现：服务地址由集群系统动态分配，当我们需要访问服务时，需要服务发现
- 负载均衡：通过分流算法，合理的分摊服务器压力，达到服务器性能的最大优化
- 服务容错：如果一个服务出现了问题，调用这个服务就会出现线程阻塞的情况，此时若有大量的请求涌入，就会出现多条线程阻塞等待，进而导致服务瘫痪，因此需要服务容错，常见容错方案有隔离、超时、限流、熔断、降级等
- 配置管理：建立配置中心，统一管理配置
- 服务监控：对整个应用网的资源消耗以及健康状况进行监控
- 链路追踪：通过链路追踪去跟进一个请求到底有哪些服务参与，参与的顺序又是怎样的，从而达到每个请求的步骤清晰可见，出了问题，很快定位
- 日志管理：需要一个独立的日志平台，收集所有节点的日志数据并可方便对其进行汇总分析，然后进行可视化展示
- 任务调度：定时任务，是指基于给定时间点，给定时间间隔或者给定执行次数自动执行任务

## 云原生

- 服务自愈：当一台服务器产生故障，需要能够拉起其他服务器
- 弹性伸缩：当流量处于高峰时，能自动扩充服务器，反之减少
- 服务隔离：产生故障时服务器之间不互相影响
- 自动化部署：自动化部署
- 灰度发布：是指在黑与白之间，能够平滑过渡的一种发布方式。 在其上可以进行A/B testing，即让一部分用户继续用产品特性A，一部分用户开始用产品特性B，如果用户对B没有什么反对意见，那么逐步扩大范围，把所有用户都迁移到B上面来
- 流量治理：限制服务器的流量接收量

# 入门案例

## 引入依赖

- pom.xml

	```xml
	<parent>
	    <groupId>org.springframework.boot</groupId>
	    <artifactId>spring-boot-starter-parent</artifactId>
	    <version>2.3.4.RELEASE</version>
	</parent>
	<dependencies>
	    <dependency>
	        <groupId>org.springframework.boot</groupId>
	        <artifactId>spring-boot-starter-web</artifactId>
	    </dependency>
	</dependencies>
	```

## 创建主程序

- MainApplication

	```java
	package com.SnHI.boot;
	
	import org.springframework.boot.SpringApplication;
	import org.springframework.boot.autoconfigure.SpringBootApplication;
	
	/**
	 * 主程序类
	 * @SpringBootApplication: 这是一个SpringBoot应用
	 * 想要改变扫描路径，使用@SpringBootApplication(scanBasePackages = "指定包路径"
	 */
	@SpringBootApplication
	public class MainApplication {
	
	    public static void main(String[] args) {
	        SpringApplication.run(MainApplication.class, args);
	    }
	}
	```

## 编写业务

- HelloController

	```java
	package com.SnHI.boot.controller;
	
	import org.springframework.web.bind.annotation.RequestMapping;
	import org.springframework.web.bind.annotation.RestController;
	
	//@RestController = @Controller + @ResponseBody
	@RestController
	public class HelloController {
	
	    @RequestMapping("/hello")
	    public String handle01() {
	        return "Hello SpringBoot!";
	    }
	
	}
	```

- 执行main方法，在浏览器页面打印Hello SpringBoot！

## 简化配置

- 创建application.properties配置文件统一管理配置

	[Application properties配置列表 ]: https://docs.spring.io/spring-boot/docs/current/reference/html/application-properties.html#application-properties

## 简化部署

- pom.xml

	```xml
	<build>
	    <plugins>
	        <plugin>
	            <groupId>org.springframework.boot</groupId>
	            <artifactId>spring-boot-maven-plugin</artifactId>
	        </plugin>
	    </plugins>
	</build>
	```

- 把项目打成jar包，直接在目标服务器执行即可

# 自动配置

## 特性

### 依赖管理特性

- 此依赖的父项目spring-boot-dependencies几乎声明了所有开发中常用的依赖版本号，无需单独配置版本号，实现自动版本仲裁机制

	```xml
	<parent>
	    <groupId>org.springframework.boot</groupId>
	    <artifactId>spring-boot-starter-parent</artifactId>
	    <version>2.3.4.RELEASE</version>
	</parent>
	```

- 开发导入starter场景启动器

	- 只要引入spring-boot-starter-*，那么该场景下所有常规需要的依赖都自动引入

	- *-spring-boot-starter为第三方提供的简化开发的场景启动器

	- [场景依赖]: https://docs.spring.io/spring-boot/docs/current/reference/html/using.html#using.build-systems.starters

	- 所有场景启动器最底层的依赖

		```xml
		<dependency>
		  <groupId>org.springframework.boot</groupId>
		  <artifactId>spring-boot-starter</artifactId>
		  <version>2.3.4.RELEASE</version>
		  <scope>compile</scope>
		</dependency>
		```

- 修改版本号

	- 查看spring-boot-dependencies里面规定当前依赖版本用的 key
	- 在pom.xml文件内重写配置

### 自动配置特性

- 引入需要的starter后，会自动引入并配置相应的依赖，例如引入Web场景，会自动引入并配置Tomcat，SpringMVC等所需要的依赖
- 提供默认的包结构，主程序所在包及其下面的所有子包中的组件都会被扫描到，无需以前的包扫描配置；想要改变扫描路径，使用@SpringBootApplication(scanBasePackages = "指定包路径")
- 各种配置都拥有默认值，并且映射到某个类上，这个类会在容器中创建对象
- 按需加载，引入场景后，这个场景的自动配置才会开启，SpringBoot所有的自动配置功能都在spring-boot-autoconfigure包里面

## 组件添加

### @Configuration

- 创建employee和pet实体类

- 创建Myconfig配置类

- MyConfig配置类中利用@Bean添加组件

	```java
	package com.SnHI.boot.config;
	
	import com.SnHI.boot.bean.Pet;
	import com.SnHI.boot.bean.employee;
	import org.springframework.context.annotation.Bean;
	import org.springframework.context.annotation.Configuration;
	
	//@Configuration：告诉SpringBoot这是一个配置类，配置类本身也是一个组件
	@Configuration(proxyBeanMethods = true)
	public class MyConfig {
	
	    //给容器中添加组件，以方法名作为组件的id，返回类型就是组件类型，返回的值是组件在容器中的实例；默认为单实例
	    @Bean
	    public employee person01() {
	        employee person1 = new employee("张三", 20);
	        //person01组件依赖了Pet组件
	        person1.setPet(pet());
	        return person1;
	    }
	
	    //@Bean可以设置组件id
	    @Bean("pet")
	    public Pet pet() {
	        return new Pet("tom");
	    }
	
	}
	
	```

	- proxyBeanMethods：代理Bean的方法
		- Full(proxyBeanMethods = true)：保证每个bean不管被调多少次返回的值都是单实例
		- Lite(proxyBeanMethods = false)：每个bean每次被调用都是重新创建的新实例
	- 最佳实践
		- 配置类组件之间无依赖关系用Lite模式加速容器启动过程，减少判断
		- 配置类组件之间有依赖关系用Full模式，方法会被调用得到已经存在的单实例组件

- MainApplication测试

	```java
	package com.SnHI.boot;
	
	import com.SnHI.boot.bean.Pet;
	import com.SnHI.boot.bean.employee;
	import com.SnHI.boot.config.MyConfig;
	import org.springframework.boot.SpringApplication;
	import org.springframework.boot.autoconfigure.SpringBootApplication;
	import org.springframework.context.ConfigurableApplicationContext;
	
	/**
	 * 主程序类
	 * @SpringBootApplication: 这是一个SpringBoot应用
	 */
	@SpringBootApplication
	public class MainApplication {
	
	    public static void main(String[] args) {
	
	        //返回IOC容器
	        ConfigurableApplicationContext run = SpringApplication.run(MainApplication.class, args);
	
	        //查看场景内部引入并配置的所有依赖
	        String[] names = run.getBeanDefinitionNames();
	        for(String name: names) {
	            System.out.println(name);
	        }
	
	        //利用组件id从容器中获取组件
	        employee person01 = run.getBean("person01", employee.class);
	        System.out.println(person01.toString());
	
	        //配置类本身也是一个组件
	        //如果@Configuration(proxyBeanMethods = true)代理对象调用方法，那么SpringBoot会检查这个组件是否在容器中有，也就会保持组件单实例
	        MyConfig bean = run.getBean(MyConfig.class);
	        employee employee = bean.person01();
	        employee employee1 = bean.person01();
	        //proxyBeanMethods = true，结果为true；否则为false
	        System.out.println(employee == employee1);
	
	        //employee依赖组件pet，将proxyBeanMethods设为true，结果为true
	        employee person01 = run.getBean("person01", employee.class);
	        Pet pet = run.getBean("pet", Pet.class);
	        System.out.println(person01.getPet() == pet);
	    }
	}
	
	```

### @Import

- 给容器中自动创建指定类型的组件，以数组形式出现，默认组件名为全类名

	```java
	@Import({User.class, DBHelper.class})
	```

### @Conditional

- 条件注解，将会根据各种限制条件决定是否生成组件

	![](C:\Users\67090\Desktop\Typora\SpringBoot\Conditional.png)

- MyConfig添加@Conditional注解

	```java
	package com.SnHI.boot.config;
	
	import com.SnHI.boot.bean.Pet;
	import com.SnHI.boot.bean.employee;
	import org.springframework.boot.autoconfigure.condition.ConditionalOnBean;
	import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
	import org.springframework.context.annotation.Bean;
	import org.springframework.context.annotation.Configuration;
	
	@Configuration(proxyBeanMethods = true)
	public class MyConfig {
	
	    //@Bean
	    public employee person01() {
	        employee person1 = new employee("张三", 20);
	        person1.setPet(pet());
	        return person1;
	    }
	
	    //存在person01组件才会创建pet组件
	    @ConditionalOnBean(name = "person01")
	    @Bean
	    public Pet pet() {
	        return new Pet("tom");
	    }
	}
	```
	- 注意：被依赖方需要写在@Conditional前面，程序是按顺序加载的

- MainApplication测试

	```java
	package com.SnHI.boot;
	
	import org.springframework.boot.SpringApplication;
	import org.springframework.boot.autoconfigure.SpringBootApplication;
	import org.springframework.context.ConfigurableApplicationContext;
	
	@SpringBootApplication
	public class MainApplication {
	
	    public static void main(String[] args) {
	
	        ConfigurableApplicationContext run = SpringApplication.run(MainApplication.class, args);
	
	        boolean pet = run.containsBean("pet");
	        System.out.println(pet);//false
	        boolean flag = run.containsBean("person01");
	        System.out.println(flag);//false
	    }
	}
	
	```

### @ImportResource

- 导入原生Spring配置文件，使其生效

	```java
	@ImportResource("classpath:beans.xml")
	```

## 配置绑定

- 将properties文件内容封装到JavaBean中的传统方法

	```java
	public class getProperties {
	     public static void main(String[] args) throws FileNotFoundException, IOException {
	         Properties pps = new Properties();
	         pps.load(new FileInputStream("a.properties"));
	         Enumeration enum1 = pps.propertyNames();//得到配置文件的名字
	         while(enum1.hasMoreElements()) {
	             String strKey = (String) enum1.nextElement();
	             String strValue = pps.getProperty(strKey);
	             System.out.println(strKey + "=" + strValue);
	             //封装到JavaBean。
	         }
	     }
	 }
	```

### @ConfigurationProperties

- application.properties主配置文件

	```properties
	employee.name = lisa
	employee.age = 30
	```

- employee实体类

	```java
	//用@Component将类注入到容器中，用@ConfigurationProperties读取主配置文件中的内容绑定到JavaBean；prefix = "employee"：前缀为employee
	@Component
	@ConfigurationProperties(prefix = "employee")
	public class employee {
	
	    private String name;
	    private int age;
	    
	    ...
	}
	```

### @EnableConfigurationProperties

- 当需要将第三方类绑定配置文件时无法手动将类注入容器，则需要使用@EnableConfigurationProperties

- application.properties主配置文件

	```properties
	employee.name = lisa
	employee.age = 30
	```

- MyConfig配置类

	```java
	//开启实体类配置绑定功能，并把组件自动注册到容器中
	@EnableConfigurationProperties(employee.class)
	public class MyConfig {
	    ...
	}
	```

## 底层源码

### 引导加载自动配置类

#### @SpringBootconfiguration

- 代表当前是一个配置类

#### @ComponentScan

- 指定扫描路径

#### @EnableAutoConfiguration

##### @AutoConfigurationPackage

- 指定了默认的包规则，利用Registrar给容器中导入一系列组件，将MainApplication下的所有组件导入进来

##### @Import

- 利用getAutoConfigurationEntry(annotationMetadata)，给容器中批量导入一些组件
- 调用getCandidateConfigurations(annotationMetadata, attributes)，获取到所有需要导入到容器中的配置类
- 利用工厂加载loadSpringFactories(@Nullable ClassLoader classLoader)，得到所有的组件 
- 从META-INF/spring.factories位置来加载一个文件，默认扫描我们当前系统里面所有META-INF/spring.factories位置的文件；核心文件为spring-boot-autoconfigure-2.3.4.RELEASE.jar，文件里面写死了spring-boot一启动就要给容器中加载的所有配置类
- <u>虽然我们127个场景的所有自动配置启动的时候默认全部加载，但是xxxxAutoConfiguration按照条件装配规则（@Conditional），最终会按需配置</u>

##### 图解

[原图]: C:\Users\67090\Desktop\Typora\SpringBoot\配置原理底层源码01.png

![](C:\Users\67090\Desktop\Typora\SpringBoot\配置原理底层源码01.png)

### 修改默认配置

#### 规范化

- 给容器加上规范的文件上传解析器

	```java
	@Bean
	//容器中有这个类型组件
	@ConditionalOnBean(MultipartResolver.class)  
	//容器中没有这个名字 multipartResolver 的组件
	@ConditionalOnMissingBean(name = DispatcherServlet.MULTIPART_RESOLVER_BEAN_NAME) 
	public MultipartResolver multipartResolver(MultipartResolver resolver) {
	    //返回值为传入的参数，这个参数的值就会从容器中找，防止用户配置的文件上传解析器不符合规范
	    return resolver;
	}
	```

#### 用户优先

- SpringBoot会默认在底层配置好所有的组件，但是如果用户自己配置了则以用户优先，主要利用@ConditionalOnMissingBean进行判断

	```java
	@Bean
	@ConditionalOnMissingBean
	public CharacterEncodingFilter characterEncodingFilter() {}
	```

#### 总结

- SpringBoot先加载所有的自动配置类：xxxAutoConfiguration
- 每个自动配置类按照@Conditional条件进行判断，生效后默认都会绑定xxxProperties配置文件指定的值，并给容器装配组件，只要容器中有了这些组件相当于有了相应的功能
- xxxProperties和application.properties主配置文件进行了绑定

- 定制化配置
	- 用户自己使用@Bean替换底层的组件
	- 用户查看这个组件在xxxProperties中的prefix以及value，修改相应值

### 最佳实践

- 引入场景依赖

	[场景依赖]: https://docs.spring.io/spring-boot/docs/current/reference/html/using.html#using.build-systems.starters

- 查看已有配置

	- 自己分析，引入场景对应的自动配置一般都生效了
	- 在application.properties主配置文件中使用debug=true开启自动配置报告：Negative（不生效）\Positive（生效）

- 是否修改

	- 分析xxxxProperties绑定了哪些键值对，参照文档修改配置项

		[配置列表]: https://docs.spring.io/spring-boot/docs/current/reference/html/application-properties.html#application-properties

	- 使用@Bean、@Component等自定义加入或者替换组件

	- 使用自定义器xxxCustomizer

## 开发小技巧

### Lombok

- 简化JavaBean开发

- pom.xml中导入依赖

	```xml
	<dependency>
	    <groupId>org.projectlombok</groupId>
	    <artifactId>lombok</artifactId>
	</dependency>
	```

- IDLE中下载Lombok插件

- JavaBean测试

	```java
	@NoArgsConstructor //无参构造器
	@AllArgsConstructor //全参构造器
	@Data //getter和setter
	@ToString //toString
	@EqualsAndHashCode //生成equals()和hashCode()方法
	public class User {
	
	    private String name;
	    private Integer age;
	
	    private Pet pet;
	
	    public User(String name,Integer age){
	        this.name = name;
	        this.age = age;
	    }
	}
	```

#### Slf4j

- 简化日志开发

- HelloController测试

	```java
	package com.SnHI.boot.controller;
	
	import lombok.extern.slf4j.Slf4j;
	import org.springframework.web.bind.annotation.RequestMapping;
	import org.springframework.web.bind.annotation.RestController;
	
	//简化日志开发
	@Slf4j
	@RestController
	public class HelloController {
	    @RequestMapping("/hello")
	    public String handle01() {
	        //日志方法
	        log.info("请求进来了！");
	        return "Hello SpringBoot!";
	    }
	}
	```


### Spring Initailizr

- 项目初始化向导，选择所需要的开发场景即会自动引入依赖，自动创建项目结构并自动编写好主配置类

# 核心技术

## YAML

- YAML 是 "YAML Ain't Markup Language"（YAML 不是一种标记语言）的递归缩写，非常适合做以数据为中心的配置文件

- 基本语法

	- k: v，kv之间有空格
	- 大小写敏感
	- 缩进的空格数不重要，只要相同层级的元素左对齐即可
	- “#”表示注释
	- 字符串无需引号

- 数据类型

	- 字面量：date、boolean、string、number、null等

		```yaml
		k: v
		```

	- 对象：map、hash、set、object等

		```yaml
		行内写法：  k: {k1: v1,k2: v2,k3: v3}
		#或
		k: 
		  k1: v1
		  k2: v2
		  k3: v3
		```

	- 数组：array，list，queue等

		```yaml
		行内写法：  k: [v1,v2,v3]
		#或者
		k:
		 - v1
		 - v2
		 - v3
		```

- 配置提示

	```xml
	<!-- 使自定义的类和yaml配置文件绑定，编码有提示 -->
	<dependency>
	    <groupId>org.springframework.boot</groupId>
	    <artifactId>spring-boot-configuration-processor</artifactId>
	    <optional>true</optional>
	</dependency>
	
	 <build>
	     <plugins>
	         <plugin>
	             <groupId>org.springframework.boot</groupId>
	             <artifactId>spring-boot-maven-plugin</artifactId>
	             <configuration>
	                 <excludes>
	                     <exclude>
	                         <groupId>org.springframework.boot</groupId>
	                         <artifactId>spring-boot-configuration-processor</artifactId>
	                     </exclude>
	                 </excludes>
	             </configuration>
	         </plugin>
	     </plugins>
	</build>
	```

## Web开发

[Web]: https://docs.spring.io/spring-boot/docs/current/reference/html/features.html#features.developing-web-applications

- SpringMVC自动配置概览
	- Spring Boot provides auto-configuration for Spring MVC that **works well with most applications.(大多场景我们都无需自定义配置)**

	- The auto-configuration adds the following features on top of Spring’s defaults:
	  - Inclusion of `ContentNegotiatingViewResolver` and `BeanNameViewResolver` beans：内容协商视图解析器和BeanName视图解析器
	  - 静态资源（包括webjars），covered [later in this document](https://docs.spring.io/spring-boot/docs/current/reference/html/spring-boot-features.html#boot-features-spring-mvc-static-content)
	  - 自动注册 `Converter，GenericConverter，Formatter `
	  - 支持 `HttpMessageConverters` （后来我们配合内容协商理解原理），covered [later in this document](https://docs.spring.io/spring-boot/docs/current/reference/html/spring-boot-features.html#boot-features-spring-mvc-message-converters)
	  - 自动注册 `MessageCodesResolver` （国际化用），covered [later in this document](https://docs.spring.io/spring-boot/docs/current/reference/html/spring-boot-features.html#boot-features-spring-message-codes)
	  - 静态index.html 页支持
	  - 自定义 `Favicon`，covered [later in this document](https://docs.spring.io/spring-boot/docs/current/reference/html/spring-boot-features.html#boot-features-spring-mvc-favicon)
	  - 自动使用 `ConfigurableWebBindingInitializer` （DataBinder负责将请求数据绑定到JavaBean上）covered [later in this document](https://docs.spring.io/spring-boot/docs/current/reference/html/spring-boot-features.html#boot-features-spring-mvc-web-binding-initializer).

	- If you want to keep those Spring Boot MVC customizations and make more [MVC customizations](https://docs.spring.io/spring/docs/5.2.9.RELEASE/spring-framework-reference/web.html#mvc) (interceptors, formatters, view controllers, and other features), you can add your own `@Configuration` class of type `WebMvcConfigurer` but **without**`@EnableWebMvc`.
	  - **不用@EnableWebMvc注解。使用** `**@Configuration**` **+** `**WebMvcConfigurer**` **自定义规则**

	- If you want to provide custom instances of `RequestMappingHandlerMapping`, `RequestMappingHandlerAdapter`, or `ExceptionHandlerExceptionResolver`, and still keep the Spring Boot MVC customizations, you can declare a bean of type `WebMvcRegistrations` and use it to provide custom instances of those components.
	  - **声明** `**WebMvcRegistrations**` **改变默认底层组件**

	- If you want to take complete control of Spring MVC, you can add your own `@Configuration` annotated with `@EnableWebMvc`, or alternatively add your own `@Configuration`-annotated `DelegatingWebMvcConfiguration` as described in the Javadoc of `@EnableWebMvc`.
	  - **使用** `**@EnableWebMvc+@Configuration+DelegatingWebMvcConfiguration 全面接管SpringMVC**`

### 静态资源

#### 存储及访问

- 静态资源存储在`/static` or `/public` or `/resources` or `/META-INF/resources`这四种目录中，以当前项目根路径/ + 静态资源名访问 

- 原理：请求进来先去找Controller看能不能处理，不能处理的所有请求又都交给静态资源处理器，静态资源也找不到则响应404页面

- 修改访问路径及访问前缀

	```yaml
	spring:
	  mvc:
	  	#改变静态资源访问前缀，默认无前缀
	    static-path-pattern: /res/**
	
	  resources:
	  	#改变默认的静态资源路径
	    static-locations: [classpath:/haha/]
	```

- webjar

	- [中央仓库]: https://www.webjars.org/

	- ```xml
		<dependency>
		    <groupId>org.webjars</groupId>
		    <artifactId>jquery</artifactId>
		    <version>3.5.1</version>
		</dependency>
		```

	- 访问地址：[http://localhost:8080/webjars/**jquery/3.5.1/jquery.js**](http://localhost:8080/webjars/jquery/3.5.1/jquery.js)，后面地址要按照依赖里面的包路径

#### 配置原理与底层分析

- SpringBoot启动默认加载xxxAutoConfiguration类（自动配置类）

- 核心类生效：SpringMVC功能的自动配置类WebMVCAutoConfiguration
	- ![image-20210819144944392](C:\Users\67090\Desktop\Typora\SpringBoot\WebMVCAutoConfiguration配置类.png)

		- 配置文件的相关属性和对应的class文件进行了绑定
			- WebMvcProperties——>spring.mvc
			- ResourceProperties——>spring.resources
			- WebProperties——>spring.web

	- ![image-20210819144133056](C:\Users\67090\Desktop\Typora\SpringBoot\静态资源配置原理底层代码1.png)

		- 配置类只有一个有参构造器，表示有参构造器中所有参数的值都会从容器中确定
			- ResourceProperties resourceProperties：获取和spring.resources绑定的所有的值的对象
			- WebMvcProperties mvcProperties：获取和spring.mvc绑定的所有的值的对象 
			- ListableBeanFactory beanFactory：Spring的beanFactory 
			- messageConvertersProvider：找到所有的HttpMessageConverters 
			- ResourceHandlerRegistrationCustomizer：找到资源处理器的自定义器
			- DispatcherServletPath  
			- ServletRegistrationBean：给应用注册Servlet、Filter....

	- ![image-20210819153157815](C:\Users\67090\Desktop\Typora\SpringBoot\静态资源配置原理底层代码2.png)

		- ```yaml
			spring:
			  resources:
			    #禁用所有静态资源规则
			    add-mappings: false
			```

		- webjars的路径规则

		- 静态资源路径规则

	- ![image-20210819162028875](C:\Users\67090\AppData\Roaming\Typora\typora-user-images\image-20210819162028875.png)

		- 欢迎页的处理规则
			- 要使用欢迎页，路径必须是/**，否则调用controller处理/index请求

#### 欢迎页支持

- 静态资源路径下建index.html

- controller处理/index请求

#### 自定义Favicon

- 将Favicon.ico放在静态资源目录下即可

### 请求参数处理

#### rest风格请求

- 在前端页面使用rest风格发送四种类型的请求

- 核心Filter：HiddenHttpMethodFilter

- 用法： 表单method=post，隐藏域 _method=put

	```html
	<form action="/user" method="get">
	    <input name="getUser" value="get" type="submit">
	</form>
	<form action="/user" method="post">
	    <input name="postUser" value="post" type="submit">
	</form>
	<form action="/user" method="post">
	    <input name="_method" type="hidden" value="DELETE">
	    <input name="deleteUser" value="delete" type="submit">
	</form>
	<form action="/user" method="post">
	    <input name="_method" type="hidden" value="PUT">
	    <input name="putUser" value="put" type="submit">
	</form>
	```

	- 底层代码

		![image-20210819165912961](C:\Users\67090\Desktop\Typora\SpringBoot\rest风格请求底层原理.png)

- application.yaml中需要手动开启

	```yaml
	spring:
	  mvc:
	    hiddenmethod:
	      filter:
	        enabled: true
	```

	- 底层代码

		![image-20210819170152547](C:\Users\67090\Desktop\Typora\SpringBoot\rest风格请求底层原理2.png)

- 底层步骤解析

	![image-20210819173618214](C:\Users\67090\Desktop\Typora\SpringBoot\rest风格请求的原理.png)

	- 表单提交会带上_method=PUT
	- 请求过来被HiddenHttpMethodFilter拦截
	- 请求是否正常，并且是POST
	- 获取到_method的值
	- 兼容以下请求：PUT，DELETE，PATCH
	- 原生request（post）利用包装模式requesWrapper重写了getMethod方法，返回的是传入的值
	- 过滤器链放行的时候用wrapper，以后的方法调用getMethod是调用requesWrapper的

- 底层原理——HandlerMapping

	![image-20210820151344838](C:\Users\67090\AppData\Roaming\Typora\typora-user-images\image-20210820151344838.png)
	- SpringMVC功能分析都从DispatcherServlet.doDispatch()中开始

		```java
		// 找到当前请求使用哪个Handler（Controller的方法）处理
		mappedHandler = getHandler(processedRequest);
		```

	![image-20210820152035527](C:\Users\67090\AppData\Roaming\Typora\typora-user-images\image-20210820152035527.png)

	- handlerMapping：处理器映射，不同请求由不同处理器处理，所有的请求映射都在handlerMapping中
	- RequestMappingHandlerMapping：保存了所有@RequestMapping 和handler的映射规则
	- SpringBoot自动配置欢迎页的WelcomePageHandlerMapping，访问 / 能访问到index.html
	- SpringBoot自动配置了默认的RequestMappingHandlerMapping

	- 请求进来，挨个尝试所有的HandlerMapping看是否有请求信息，如果有就找到这个请求对应的handler，如果没有就是下一个 HandlerMapping

	- 我们需要一些自定义的映射处理，我们也可以自己给容器中放HandlerMapping，自定义 HandlerMapping

#### 注解处理

- @PathVariable：用于绑定url中的占位符，例如：请求url中/delete/{id}， 这个{id}就是url占位符。url支持占位符是Spring3.0之后加入的，是SpringMVC支持restful风格的一个重要标志

- @RequestHeader：用于获取请求消息体

- @ModelAttribute：可以用于修饰方法和参数。出现在方法上表示当前方法会在控制器的方法执行之前先执行；出现在参数上表示获取指定的数据给参数赋值

- @RequestAttribute：用于跳转页面，获取request域属性

- @RequestParam：把请求中指定名称的参数给控制器中的形参赋值

- @RequestPart：这个注解用在multipart/form-data表单提交请求的方法上，支持的请求方法的方式为MultipartFile，属于Spring的MultipartResolver类，这个请求是通过http协议传输的。@RequestParam 也同样支持multipart/form-data请求（即两者都能用于后端接收文件）他们最大的不同是，当请求方法的请求参数类型不再是String类型的时候，@RequestParam 适用于name-valueString类型的请求域，@RequestPart适用于复杂的请求域（像JSON，XML）

- @CookieValue：用于把指定cookie名称的值传入控制器方法参数

- @RequestBody：用于获取请求体内容，直接使用得到的是key=value&key=value结构的数据，get请求方式不适用

- @ResponseBody：作用在方法上，表示将该方法的返回结果直接写入HTTP response body中，将java对象转为json格式的数据

- @SessionAttribute：用于多次执行控制器方法间的参数共享

- @MatrixVariable：矩阵变量

	- 需要在SpringBoot中手动开启（默认禁用）

	- 根据规范，矩阵变量应当绑定在路径变量中，矩阵变量必须有url路径才能被解析

	- 若是有多个矩阵变量，应当用英文符号‘；’进行分隔，若是一个矩阵变量有多个值，应当使用英文符号‘，’进行分隔或使之命名为多个重复的key

	- 默认禁用的底层原理

		![image-20210820190753511](C:\Users\67090\Desktop\Typora\SpringBoot\矩阵变量默认禁用底层原理.png)

	- 手动开启代码

		```java
		package com.SnHI.boot.config;
		
		import org.springframework.context.annotation.Configuration;
		import org.springframework.web.servlet.config.annotation.PathMatchConfigurer;
		import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
		import org.springframework.web.util.UrlPathHelper;
		
		//WebConfig定制化SpringMVC功能
		@Configuration(proxyBeanMethods = false)
		//重写configurePathMatch()
		public class WebConfig implements WebMvcConfigurer {
		    @Override
		    public void configurePathMatch(PathMatchConfigurer configurer) {
		        UrlPathHelper urlPathHelper = new UrlPathHelper();
		        urlPathHelper.setRemoveSemicolonContent(false);
		        configurer.setUrlPathHelper(urlPathHelper);
		    }
		}
		```

#### Servlet API

- WebRequest、ServletRequest、MultipartRequest、 HttpSession、javax.servlet.http.PushBuilder、Principal、InputStream、Reader、HttpMethod、Locale、TimeZone、ZoneId等类型的参数由**ServletRequestMethodArgumentResolver**进行解析

- 底层源码

	```java
	@Override
	  public boolean supportsParameter(MethodParameter parameter) {
	    Class<?> paramType = parameter.getParameterType();
	    return (WebRequest.class.isAssignableFrom(paramType) ||
	        ServletRequest.class.isAssignableFrom(paramType) ||
	        MultipartRequest.class.isAssignableFrom(paramType) ||
	        HttpSession.class.isAssignableFrom(paramType) ||
	        (pushBuilder != null && pushBuilder.isAssignableFrom(paramType)) ||
	        Principal.class.isAssignableFrom(paramType) ||
	        InputStream.class.isAssignableFrom(paramType) ||
	        Reader.class.isAssignableFrom(paramType) ||
	        HttpMethod.class == paramType ||
	        Locale.class == paramType ||
	        TimeZone.class == paramType ||
	        ZoneId.class == paramType);
	  }
	```

#### 复杂参数

- **Map**、**Model**（map、model里面的数据会被放在request的请求域 中，相当于request.setAttribute）、Errors/BindingResult、RedirectAttributes（ 重定向携带数据）、ServletResponse、SessionStatus、UriComponentsBuilder、ServletUriComponentsBuilder

#### 自定义对象参数

- 可以自动类型转换与格式化，也可以级联封装

- index.html

	```html
	<form action="/saveUser" method="post">
	    姓名：<input name="name" type="text">
	    年龄：<input name="age" type="text">
	    宠物姓名：<input name="pet.name" type="text">
	    宠物年龄：<input name="pet.age" type="text">
	    <input name="submit" value="提交" type="submit">
	</form>
	```

- ParamTestController.java

	```java
	@PostMapping("/saveUser")
	//自定义对象参数Person
	public Person saveUser(Person person) {
		return person;
	}
	```

- POJO封装过程底层源码解析——Converter

	- 由ServletModelAttributeMethodProcessor这个参数处理器支持

	- 判断是否为简单类型

		```java
		public static boolean isSimpleValueType(Class<?> type) {
		    return (Void.class != type && void.class != type &&
		    (ClassUtils.isPrimitiveOrWrapper(type) ||
		    Enum.class.isAssignableFrom(type) ||
		    CharSequence.class.isAssignableFrom(type) ||
		    Number.class.isAssignableFrom(type) ||
		    Date.class.isAssignableFrom(type) ||
		    Temporal.class.isAssignableFrom(type) ||
		    URI.class == type ||
		    URL.class == type ||
		    Locale.class == type ||
		    Class.class == type));
		}
		```

	- 核心代码

		```java
		@Override
		@Nullable
		public final Object resolveArgument(MethodParameter parameter, @Nullable ModelAndViewContainer mavContainer, NativeWebRequest webRequest, @Nullable WebDataBinderFactory binderFactory) throws Exception {
		
		    Assert.state(mavContainer != null, "ModelAttributeMethodProcessor requires ModelAndViewContainer");
		    Assert.state(binderFactory != null, "ModelAttributeMethodProcessor requires WebDataBinderFactory");
		
		    String name = ModelFactory.getNameForParameter(parameter);
		    ModelAttribute ann = parameter.getParameterAnnotation(ModelAttribute.class);
		    if (ann != null) {
		        mavContainer.setBinding(name, ann.binding());
		    }
		
		    Object attribute = null;
		    BindingResult bindingResult = null;
		
		    if (mavContainer.containsAttribute(name)) {
		        attribute = mavContainer.getModel().get(name);
		    }
		    else {
		        // Create attribute instance
		        try {
		            attribute = createAttribute(name, parameter, binderFactory, webRequest);
		        }
		        catch (BindException ex) {
		            if (isBindExceptionRequired(parameter)) {
		                // No BindingResult parameter -> fail with BindException
		                throw ex;
		            }
		            // Otherwise, expose null/empty value and associated BindingResult
		            if (parameter.getParameterType() == Optional.class) {
		                attribute = Optional.empty();
		            }
		            bindingResult = ex.getBindingResult();
		        }
		    }
		
		    if (bindingResult == null) {
		        // Bean property binding and validation;
		        // skipped in case of binding failure on construction.
		        //核心方法
		        WebDataBinder binder = binderFactory.createBinder(webRequest, attribute, name);
		        if (binder.getTarget() != null) {
		            if (!mavContainer.isBindingDisabled(name)) {
		                bindRequestParameters(binder, webRequest);
		            }
		            validateIfApplicable(binder, parameter);
		            if (binder.getBindingResult().hasErrors() && isBindExceptionRequired(binder, parameter)) {
		                throw new BindException(binder.getBindingResult());
		            }
		        }
		        // Value type adaptation, also covering java.util.Optional
		        if (!parameter.getParameterType().isInstance(attribute)) {
		            attribute = binder.convertIfNecessary(binder.getTarget(), parameter.getParameterType(), parameter);
		        }
		        bindingResult = binder.getBindingResult();
		    }
		
		    // Add resolved attribute and BindingResult at the end of the model
		    Map<String, Object> bindingResultModel = bindingResult.getModel();
		    mavContainer.removeAttributes(bindingResultModel);
		    mavContainer.addAllAttributes(bindingResultModel);
		
		    return attribute;
		}
		```

		- WebDataBinder：web数据绑定器，内部有ConversionService（类型转换服务），将请求参数的值绑定到指定的JavaBean里面
		- WebDataBinder利用它里面的 Converters 将请求数据转成指定的数据类型再次封装到JavaBean中
		- GenericConversionService：在设置每一个值的时候，找它里面的所有converter哪个可以将这个数据类型（request带来参数的字符串）转换到指定的类型

- 自定义Converter修改POJO封装规则

	- WebConfig.java

		```java
		//自定义Converter进行POJO封装,重写addFormatters()
		@Override
		public void addFormatters(FormatterRegistry registry) {
		    registry.addConverter(new Converter<String, Pet>() {
		        @Override
		        public Pet convert(String s) {
		            Pet pet = new Pet();
		            String[] split = s.split("，");
		            pet.setName(split[0]);
		            pet.setAge(Integer.parseInt(split[1]));
		            return pet;
		        }
		    });
		}
		```

	- index.html

		```html
		<!-- 自定义封装 -->
		<form action="/saveUser" method="post">
		    姓名：<input name="name" type="text">
		    年龄：<input name="age" type="text">
		    <!-- 宠物名字和年龄可用逗号分隔同时输入 -->
		    宠物：<input name="pet" type="text">
		    <input name="submit" value="提交" type="submit">
		</form>
		```


#### 请求参数处理底层源码解析

- HandlerMapping中找到能处理请求的Handler

	![image-20210820152035527](C:\Users\67090\AppData\Roaming\Typora\typora-user-images\image-20210820152035527.png)

- 为当前Handler找一个适配器HandlerAdapter

	![image-20210821161741373](C:\Users\67090\Desktop\Typora\SpringBoot\四种HandlerAdapter.png)

- 适配器执行目标方法并确定方法参数的每一个值（对于目标方法的真正执行都在RequestMappingHandlerAdapter.class中）

  - 参数解析器——HandlerMethodArgumentResolver，用于确定将要执行的目标方法的每一个参数的值是什么（SpringMVC目标方法能写多少种参数类型取决于参数解析器）

  	![image-20210821200405692](C:\Users\67090\Desktop\Typora\SpringBoot\参数解析器.png)

  - 参数解析器工作原理

  	- 当前解析器是否支持解析这种参数
  	- 是就调用resolveArgument解析参数

  	![image-20210821200616337](C:\Users\67090\Desktop\Typora\SpringBoot\参数解析器工作原理.png)

  - 返回值处理器——MethodReturnValueHandler，用于确定目标方法能写多少种返回值类型取决于返回值处理器

  	![image-20210821200432131](C:\Users\67090\Desktop\Typora\SpringBoot\返回值处理器.png)

- 目标方法执行完成后，将所有的数据都放在 **ModelAndViewContainer**中，包含要去的页面地址View和Model数据

- 处理派发结果：核心代码

	```java
	InternalResourceView：
	@Override
	    protected void renderMergedOutputModel(
	    Map<String, Object> model, HttpServletRequest request, HttpServletResponse response) throws Exception {
	
	    //把暴露模型作为请求域的属性
	    exposeModelAsRequestAttributes(model, request);
	
	    // Expose helpers as request attributes, if any.
	    exposeHelpers(request);
	
	    // Determine the path for the request dispatcher.
	    String dispatcherPath = prepareForRendering(request, response);
	
	    // Obtain a RequestDispatcher for the target resource (typically a JSP).
	    RequestDispatcher rd = getRequestDispatcher(request, dispatcherPath);
	    if (rd == null) {
	        throw new ServletException("Could not get RequestDispatcher for [" + getUrl() +
	                                   "]: Check that the corresponding file exists within your web application archive!");
	    }
	
	    // If already included or response already committed, perform include, else forward.
	    if (useInclude(request, response)) {
	        response.setContentType(getContentType());
	        if (logger.isDebugEnabled()) {
	            logger.debug("Including [" + getUrl() + "]");
	        }
	        rd.include(request, response);
	    }
	
	    else {
	        // Note: The forwarded resource is supposed to determine the content type itself.
	        if (logger.isDebugEnabled()) {
	            logger.debug("Forwarding to [" + getUrl() + "]");
	        }
	        rd.forward(request, response);
	    }
	}
	```

- model中的所有数据遍历后放在请求域中

	```java
	protected void exposeModelAsRequestAttributes(Map<String, Object> model,HttpServletRequest request) throws Exception {
	    model.forEach((name, value) -> {
	        if (value != null) {
	            request.setAttribute(name, value);
	        }
	        else {
	            request.removeAttribute(name);
	        }
	    });
	}
	```
	
- 底层解析总图

	![image-20210821203826515](C:\Users\67090\Desktop\Typora\SpringBoot\注解参数解析底层原理总图.png)
	
	- 确定方法参数值的核心代码——getMethodArgumentValues()
	
		```java
		protected Object[] getMethodArgumentValues(NativeWebRequest request, @Nullable ModelAndViewContainer mavContainer, Object... providedArgs) throws Exception {
		    //获取到所有方法参数上的详细信息
		    MethodParameter[] parameters = this.getMethodParameters();
		    if (ObjectUtils.isEmpty(parameters)) {
		        return EMPTY_ARGS;
		    } else {
		        Object[] args = new Object[parameters.length];
		        //遍历每个参数
		        for(int i = 0; i < parameters.length; ++i) {
		            MethodParameter parameter = parameters[i];
		            parameter.initParameterNameDiscovery(this.parameterNameDiscoverer);
		            args[i] = findProvidedArgument(parameter, providedArgs);
		            if (args[i] == null) {
		                //supportsParameter()判断当前解析器是否支持该参数类型，是则放入缓存，内部原理为遍历26个参数解析器返回true OR false
		                if (!this.resolvers.supportsParameter(parameter)) {
		                    throw new IllegalStateException(formatArgumentError(parameter, "No suitable resolver"));
		                }
		                //解析参数核心方法——resolveArgument()
		                try {
		                    args[i] = this.resolvers.resolveArgument(parameter, mavContainer, request, this.dataBinderFactory);
		                } catch (Exception var10) {
		                    if (logger.isDebugEnabled()) {
		                        String exMsg = var10.getMessage();
		                        if (exMsg != null && !exMsg.contains(parameter.getExecutable().toGenericString())) {
		                            logger.debug(formatArgumentError(parameter, exMsg));
		                        }
		                    }
		                    throw var10;
		                }
		            }
		        }
		        return args;
		    }
		}
		```

### 数据响应与内容协商

#### 响应Json数据

- spring-boot-starter-web场景自动引入了Json场景，在方法上标注@ResponseBody即可向前端返回Json数据

- 底层原理——返回值处理器MethodReturnValueHandler

	- 返回值处理器调用supportsReturnType()方法判断是否支持某种类型返回值
	- 支持则返回值处理器调用handleReturnValue()进行处理

	- handleReturnValue()方法内部通过循环遍历15种返回值处理器确定由RequestResponseBodyMethodProcessor来处理返回值标了@ResponseBody注解的方法

	- RequestResponseBodyMethodProcessor利用消息转换器writeWithMessageConverters()方法进行写出操作，将数据写为json

- 底层原理——消息转换器MessageConverter
	- 消息转换器内部涉及内容协商：浏览器默认会以请求头的方式告诉服务器他能接受什么样的内容类型，服务器最终根据自己自身的能力，决定服务器能生产出什么样类型的数据

	- HttpMessageConverter中利用canRead(Class<>, MediaType)和canWrite(Class<>, MediaType)看是否支持将此Class类型的对象，转为MediaType类型的数据

	- SpringMVC底层会遍历所有容器中的HttpMessageConverter

		![image-20210824114828570](C:\Users\67090\Desktop\Typora\SpringBoot\MessageConverter.png)

		- 得到MappingJackson2HttpMessageConverter可以将对象写为json
		- 利用MappingJackson2HttpMessageConverter将对象转为json再写出去

	- 最终 MappingJackson2HttpMessageConverter把对象转为JSON（利用底层的jackson的objectMapper转换）

#### 内容协商

- 根据客户端接受能力不同，返回不同媒体类型的数据

- 只需要改变请求头中Accept字段，就可以告诉服务器本客户端可以接收的数据类型

	![image-20210824110526867](C:\Users\67090\Desktop\Typora\SpringBoot\内容协商.png)

- 为了方便内容协商，开启基于请求参数的内容协商功能（开启前只有基于请求头的内容协商）

	```yaml
	spring:
	  mvc:
	    #开启请求参数内容协商模式
	    contentnegotiation:
	      favor-parameter: true
	```

	- 请求发送方式：localhost:8080/test/person?format=json或xml
	- 参数策略优先于请求头策略，如果设置了基于请求参数的内容协商功能，则会先在请求中获取format的值

- 底层步骤
	- 判断当前响应头中是否已经有确定的媒体类型MediaType
	- 获取客户端支持接收的内容类型，即获取客户端Accept请求头字段，其内部利用contentNegotiationManager内容协商管理器，默认使用基于Accept请求头的策略HeaderContentNegotiationStrategy
	- 遍历循环当前系统所有的MessageConverter，看谁支持操作需要返回的对象类型
	- 找到支持操作对象类型的converter，把converter支持的媒体类型统计出来
	- 通过双重循环遍历客户端支持接收的类型以及服务端可操作的类型，进行内容协商的最佳匹配
	- 调用该converter进行最终转换

- 引入xml依赖

	```xml
	<dependency>
	    <groupId>com.fasterxml.jackson.dataformat</groupId>
	    <artifactId>jackson-dataformat-xml</artifactId>
	</dependency>
	```

	- xml的converter会自动进入MessageConverter，底层会判断是否导入包

		![image-20210824171731127](C:\Users\67090\AppData\Roaming\Typora\typora-user-images\image-20210824171731127.png)

#### 自定义MessageConverter

- 自定义MessageConverter可实现多协议数据兼容SnHIMessageConverter

	- 浏览器发送请求返回xml数据：application/xml——jacksonXmlConverter
	- ajax请求返回json数据：application/json——jacksonJsonConverter
	- 自定义客户端返回自定义协议数据：application/SnHI——xxxxConverter
		- 数据格式：属性值1；属性值2

- SnHIMessageConverter.java

	```java
	package com.SnHI.boot.converter;
	
	//自定义MessageConverter使服务器返回自定义协议数据
	public class SnHIMessageConverter implements HttpMessageConverter<Person> {
	    @Override
	    public boolean canRead(Class<?> aClass, MediaType mediaType) {
	        return false;
	    }
	
	    @Override
	    public boolean canWrite(Class<?> aClass, MediaType mediaType) {
	        //判断aClass的值类型是否是Person类型
	        return aClass.isAssignableFrom(Person.class);
	    }
	
	    /**
	     * 服务器要统计所有的MessageConverter都能写出哪些内容类型
	     * 自定义要求能写出application/SnHI
	     * @return
	     */
	    @Override
	    public List<MediaType> getSupportedMediaTypes() {
	        //把字符串解析成媒体类型集合
	        return MediaType.parseMediaTypes("application/SnHI");
	    }
	
	    @Override
	    public Person read(Class<? extends Person> aClass, HttpInputMessage httpInputMessage) throws IOException, HttpMessageNotReadableException {
	        return null;
	    }
	
	    /**
	     * 自定义协议数据的写出
	     * 格式：属性值1；属性值2
	     * @param person
	     * @param mediaType
	     * @param httpOutputMessage
	     * @throws IOException
	     * @throws HttpMessageNotWritableException
	     */
	    @Override
	    public void write(Person person, MediaType mediaType, HttpOutputMessage httpOutputMessage) throws IOException, HttpMessageNotWritableException {
	        String data = person.getName() +";" + person.getAge() + ";" + person.getPet().getName() + ";" + person.getPet().getAge();
	        OutputStream body = httpOutputMessage.getBody();
	        body.write(data.getBytes());
	    }
	}
	```

- WebConfig.java

	```java
	//往容器中添加自定义MessageConverter
	@Override
	public void extendMessageConverters(List<HttpMessageConverter<?>> converters) {
	    converters.add(new SnHIMessageConverter());
	}
	```

- PostMan

	![image-20210825120026877](C:\Users\67090\Desktop\Typora\SpringBoot\自定义MessageConverter——PostMan.png)

#### 自定义contentNegotiationManager

- 自定义内容协商管理器使请求参数format支持自定义适配策略

- 方法①：配置WebConfig.java重写configureContentNegotiation

	```java
	//自定义内容协商策略
	@Override
	public void configureContentNegotiation(ContentNegotiationConfigurer configurer) {
	    //指定支持解析哪些参数对象的哪些媒体类型
	    Map<String, MediaType> mediaTypes = new HashMap<>();
	    mediaTypes.put("json", MediaType.APPLICATION_JSON);
	    mediaTypes.put("xml", MediaType.APPLICATION_XML);
	    mediaTypes.put("SnHI", MediaType.parseMediaType("application/SnHI"));
	    //创建参数策略，并传入自定义好的媒体类型
	    ParameterContentNegotiationStrategy parameterStrategy = new ParameterContentNegotiationStrategy(mediaTypes);
	    //修改参数键
	//     parameterStrategy.setParameterName("strategy");
	    //同时支持请求头策略
	    HeaderContentNegotiationStrategy headerStrategy = new HeaderContentNegotiationStrategy();
	    //以List的方式传入内容协商管理器
	    configurer.strategies(Arrays.asList(parameterStrategy, headerStrategy));
	}
	```

	- 可发送请求localhost:8080/responsePerson?format=SnHI进行访问

- 方法②：配置application.yaml

	```yaml
	spring:
	  mvc:
	    contentnegotiation:
	      #配置内容协商管理器，加入自定义的媒体协商内容
	      media-types.SnHI: application/SnHI
	```

### 视图解析与模板引擎

#### 视图解析

- 视图解析：SpringBoot处理完请求后想要跳转到某个页面的过程（转发或者重定向）
- 底层源码处理流程
	- 要跳转页面的目标方法处理过程中，所有数据都会被放在ModelAndView里面，包括数据和视图地址
	- 任何目标方法执行完成以后都会返回ModelAndView
	- 调用processDispatchResult方法处理派发结果，负责页面响应
	- 内部调用rend(mv, request, response)方法进行页面渲染逻辑
	- 底层获取目标url地址调用原始方法response.sendRedirect(encodedURL);

#### 模板引擎Thymeleaf

- Thymeleaf是现代化服务端Java模板引擎，也可以轻易的与Spring MVC等Web框架进行集成作为Web应用的模板引擎

##### 基本语法

| 表达式名字 | 语法   | 用途                               |
| ---------- | ------ | ---------------------------------- |
| 变量取值   | ${...} | 获取请求域、session域、对象等值    |
| 选择变量   | *{...} | 获取上下文对象值                   |
| 消息       | #{...} | 获取国际化等值                     |
| 链接       | @{...} | 生成链接                           |
| 片段表达式 | ~{...} | jsp:include 作用，引入公共页面片段 |

[所有html5兼容的标签写法]: https://www.thymeleaf.org/doc/tutorials/3.0/usingthymeleaf.html#setting-value-to-specific-attributes

##### 入门案例

- 引入starter场景

	```xml
	<dependency>
	    <groupId>org.springframework.boot</groupId>
	    <artifactId>spring-boot-starter-thymeleaf</artifactId>
	</dependency>
	```

	- 引入场景后SpringBoot会自动配置好SpringTemplateEngine和ThymeleafViewResolver

- 在/templates/路径下创建html文件

- 在html文件中写入thymeleaf名称空间

	```html
	<html lang="en" xmlns:th="http://www.thymeleaf.org">
	```

- 编写ViewTestController.java

	```java
	package com.SnHI.boot.controller;
	
	import org.springframework.stereotype.Controller;
	import org.springframework.ui.Model;
	import org.springframework.web.bind.annotation.GetMapping;
	
	//Thymeleaf模板引擎测试
	@Controller
	public class ViewTestController {
	
	    @GetMapping("/thy")
	    public String thy(Model model) {
	        model.addAttribute("msg", "你好SnHI");
	        model.addAttribute("link", "http://www.baidu.com");
	        //自动跳转到/templates/ThymeleafTest.html文件
	        return "ThymeleafTest";
	    }
	
	}
	```

- 编写ThymeleafTest.html

	```html
	<!DOCTYPE html>
	<html lang="en" xmlns:th="http://www.thymeleaf.org">
	<head>
	    <meta charset="UTF-8">
	    <title>Title</title>
	</head>
	<body>
	<!-- 改写文本内容用th:text -->
	<h1 th:text="${msg}">哈哈</h1>
	<!-- 改写某个属性，在th:后加上属性名 -->
	<h2><a th:href="${link}">百度</a></h2>
	</body>
	</html>
	```

##### 技术点

- 无标签显示内容

	```html
	<!-- [[${...}]]，该操作符用来取值，直接在页面中显示 -->
	[[${session.userFlag.userName}]]
	```

- 修改标签属性

	```html
	<!-- 改写文本内容用th:text -->
	<h1 th:text="${msg}">哈哈</h1>
	<!-- 改写某个属性，在th:后加上属性名 -->
	<h2><a th:href="${http://www.baidu.com}">百度</a></h2>
	```

- 提取公共内容

	- 标签方式

		```html
		<!-- th:fragment标记该标签中的内容为公共内容 -->
		<footer th:fragment="copy">
		  公共内容
		</footer>
		
		<!-- 引用公共内容的三种方式 -->
		<body>
		  <div th:insert="文件路径 :: copy"></div>
		  <div th:replace="文件路径 :: copy"></div>
		    <!-- th:include在Thymeleaf3.0版本之后不再推荐使用 -->
		  <div th:include="文件路径 :: copy"></div>
		</body>
		
		<!-- 三种引用方式的效果显示 -->
		<body>
		    <!-- th:insert -->
		  <div>
		    <footer>
		      公共内容
		    </footer>
		  </div>
		    <!-- th:replace -->
		  <footer>
		    公共内容
		  </footer>
		    <!-- th:include -->
		  <div>
		    公共内容
		  </div>
		</body>
		```

	- id选择器方式

		```html
		<footer id="copy">
		  公共内容
		</footer>
		
		<body>
		  <div th:insert="文件路径 :: #copy"></div>
		  <div th:replace="文件路径 :: #copy"></div>
		  <div th:include="文件路径 :: #copy"></div>
		</body>
		```

- 遍历

	```java
	@GetMapping("/dynamic_table")
	public String dynamic_table(Model model){
	    //为表格添加内容
	    List<User> users = Arrays.asList(new User("zhangsan", "123456"),
	                                     new User("lisi", "123444"),
	                                     new User("haha", "aaaaa"),
	                                     new User("hehe ", "aaddd"));
	    model.addAttribute("users",users);
	    return "table/dynamic_table";
	}
	```

	```html
	<!-- th:each=“遍历对象,遍历状态:${请求域中值对应的键}” -->
	<tr class="gradeX" th:each="user,stats:${users}">
	    <!-- stats.count：计数 -->
	    <td th:text="${stats.count}">Trident</td>
	    <td th:text="${user.userName}">Internet</td>
	    <td >[[${user.password}]]</td>
	</tr>
	```

### 拦截器

- 用于在目标方法执行前后或页面渲染之后完成额外需求
- Interceptor与filter区别
	- filter是servlet定义的原生组件，脱离spring也能使用
	- interceptor是spring定义的接口，可以使用spring中自动装配等功能
- 编写一个拦截器实现HandlerInterceptor接口
 * 拦截器注册到容器中，实现WebMvcConfigurer的addInterceptors()方法
 - 指定拦截规则（注意静态资源）
	- 添加拦截路径：addPathPatterns()
	- 放行拦截路径：excludePathPatterns()

- LoginInterceptor.java

	```java
	package com.SnHI.boot.interceptor;
	
	import org.springframework.web.servlet.HandlerInterceptor;
	import org.springframework.web.servlet.ModelAndView;
	import javax.servlet.http.HttpServletRequest;
	import javax.servlet.http.HttpServletResponse;
	import javax.servlet.http.HttpSession;
	
	/**
	 * 拦截器做登录检查
	 * 1、编写一个拦截器实现HandlerInterceptor接口
	 * 2、拦截器注册到容器中，实现WebMvcConfigurer的addInterceptors()方法
	 * 3、指定拦截规则（注意静态资源）
	 */
	public class LoginInterceptor implements HandlerInterceptor {
	
	    /**
	     * 目标方法执行之前
	     * @param request
	     * @param response
	     * @param handler
	     * @return
	     * @throws Exception
	     */
	    @Override
	    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
	        //登录检查逻辑
	        HttpSession session = request.getSession();
	        Object userFlag = session.getAttribute("userFlag");
	        //放行
	        if(userFlag != null) return true;
	        //拦截
	        else {
	            request.setAttribute("msg", "请重新登录");
	            //请求转发
	            request.getRequestDispatcher("/index").forward(request, response);
	            return false;
	        }
	    }
	
	    /**
	     * 目标方法执行完成之后
	     * @param request
	     * @param response
	     * @param handler
	     * @param modelAndView
	     * @throws Exception
	     */
	    @Override
	    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
	    }
	
	    /**
	     * 页面渲染之后
	     * @param request
	     * @param response
	     * @param handler
	     * @param ex
	     * @throws Exception
	     */
	    @Override
	    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
	    }
	}
	```

- WebConfig.java

	```java
	//WebConfig定制化SpringMVC功能
	@Configuration(proxyBeanMethods = false)
	public class WebConfig implements WebMvcConfigurer {
	    //往容器中加入拦截器
	    @Override
	    public void addInterceptors(InterceptorRegistry registry) {
	        registry.addInterceptor(new LoginInterceptor())
	                //拦截哪些路径
	                .addPathPatterns("/**")
	                //放行哪些路径
	                .excludePathPatterns("/index", "/login", "/static/**");
	    }
	}
	```

- 底层源码处理流程

	- 根据当前请求，找到HandlerExecutionChain（可以处理请求的handler以及handler的所有拦截器）

	- 顺序执行所有拦截器的preHandle方法

		- 如果当前拦截器preHandler返回为true，则执行下一个拦截器的preHandle

		- 如果当前拦截器返回为false，直接倒序执行所有已经执行了的拦截器的afterCompletion方法

	- 如果任何一个拦截器返回false，则直接跳出，不执行目标方法；所有拦截器都返回true才执行目标方法

	- 成功执行完目标方法后，倒序执行所有拦截器的postHandle方法

	- 前面的步骤有任何异常都会直接倒序触发afterCompletion

	- 页面成功渲染完成以后，也会倒序触发afterCompletion

	![image-20210827102232238](C:\Users\67090\AppData\Roaming\Typora\typora-user-images\image-20210827102232238.png)

### 文件上传

- SpringBoot对文件上传的自动配置全部封装在MultipartAutoConfiguration中

- 表单页面

	```html
	<!DOCTYPE html>
	<html lang="en" xmlns:th="http://www.thymeleaf.org">
	<head>
	    <meta charset="UTF-8">
	    <title>文件上传</title>
	</head>
	<body>
	<!-- 
		enctype这个属性管理的是表单的MIME（Multipurpose Internet Mail Extensions）编码,共有三个值可选：
		- application/x-www-form-urlencoded---默认值,作用是设置表单传输的编码,不能用于上传文件（form表单里是可以不写enctype=application/x-www-form-urlencoded,因为默认HTML表单就是这种传输编码类型）
		- multipart/form-data---制定传输数据的特殊类型，上传的非文本的内容，比如文件等
		- text/plain ---纯文本传输，不能用于上传文件
	-->
	    <form th:action="@{/upload}" th:method="post" enctype="multipart/form-data">
	        用户名：<input name="name" type="text">
	        邮箱：<input name="email" type="text"><br>
	        头像：<input name="headImg" type="file"><br>
	        <!-- multiple：多文件上传 -->
	        生活照：<input name="photos" type="file" multiple><br>
	        <input name="submit" type="submit" value="提交">
	    </form>
	</body>
	</html>
	```

- FileUpLoadTest.java

	```java
	package com.SnHI.boot.controller;
	
	import lombok.extern.slf4j.Slf4j;
	import org.springframework.stereotype.Controller;
	import org.springframework.web.bind.annotation.GetMapping;
	import org.springframework.web.bind.annotation.PostMapping;
	import org.springframework.web.bind.annotation.RequestParam;
	import org.springframework.web.bind.annotation.RequestPart;
	import org.springframework.web.multipart.MultipartFile;
	
	import java.io.File;
	import java.io.IOException;
	
	//文件上传
	@Slf4j
	@Controller
	public class FileUploadTest {
	
	    @GetMapping("/file")
	    public String fileUpload() {
	        return "FileUpload";
	    }
	
	    //MultipartFile：自动封装上传的文件
	    /*
	    @RequestPart：这个注解用在multipart/form-data表单提交请求的方法上，支持的请求方法的方式为MultipartFile，属于Spring的MultipartResolver类，这个请求是通过http协议传输的。@RequestParam 也同样支持multipart/form-data请求（即两者都能用于后端接收文件）他们最大的不同是，当请求方法的请求参数类型不再是String类型的时候，@RequestParam 适用于name-valueString类型的请求域，@RequestPart适用于复杂的请求域（像JSON，XML）
	     */
	    @PostMapping("/upload")
	    public String upload(@RequestParam("name") String name,
	                         @RequestParam("email") String email,
	                         @RequestPart("headImg") MultipartFile headImg,
	                         @RequestPart("photos") MultipartFile[] photos) throws IOException {
	        log.info("上传的信息：name:{}, email:{}, headImg:{}, photos:{}", name, email, headImg.getSize(), photos.length);
	        if(!headImg.isEmpty()) {
	            String originalFilename = headImg.getOriginalFilename();
	            //转移到新路径
	            headImg.transferTo(new File("C:\\Users\\67090\\Desktop\\Typora\\SpringBoot\\FileUpload\\" + originalFilename));
	        }
	        if(photos.length > 0) {
	            for (MultipartFile photo : photos) {
	                if(!photo.isEmpty()) {
	                    String originalFilename = photo.getOriginalFilename();
	                    photo.transferTo(new File("C:\\Users\\67090\\Desktop\\Typora\\SpringBoot\\FileUpload\\" + originalFilename));
	                }
	            }
	        }
	        return "main";
	    }
	}
	```

	- @RequestPart：这个注解用在multipart/form-data表单提交请求的方法上，支持的请求方法的方式为MultipartFile，属于Spring的MultipartResolver类，这个请求是通过http协议传输的。@RequestParam 也同样支持multipart/form-data请求（即两者都能用于后端接收文件）他们最大的不同是，当请求方法的请求参数类型不再是String类型的时候，@RequestParam 适用于name-valueString类型的请求域，@RequestPart适用于复杂的请求域（像JSON，XML）

- application.yaml

	```yaml
	spring:
	  servlet:
	    multipart:
	      #单个文件上传大小限制
	      max-file-size: 20MB
	      #请求上传大小限制
	      max-request-size: 100MB
	```

- 底层源码处理流程

	- 文件上传自动配置类封装在MultipartAutoConfiguration的MultipartProperties中
	- MultipartProperties自动配置好了StandardServletMultipartResolver（文件上传解析器）
	- 请求进来使用文件上传解析器判断（isMultipart）并封装（resolveMultipart），返回（MultipartHttpServletRequest）文件上传请求

- - 参数解析器来解析请求中的文件内容封装成MultipartFile

- - 将request中文件信息封装为一个Map：MultiValueMap<String, MultipartFile>

- - 最终使用FileCopyUtils实现文件流的拷贝

### 异常处理

#### 默认规则

- 默认情况下，SpringBoot提供`/error`处理所有错误的映射，即在/template/error/路径下放置处理错误页面的html文件
- 对于机器客户端，它将生成JSON响应，其中包含错误、HTTP状态和异常消息的详细信息；对于浏览器客户端，响应一个whitelabel错误视图，以HTML格式呈现相同的数据

#### 自定义错误处理逻辑

- 在/error路径下自定义错误页面，该路径下的4xx.html、5xx.html会被自动解析（有精确的错误状态码就精确匹配，没有则模糊匹配）

	```html
	<!DOCTYPE html>
	<html lang="en" xmlns:th="http://www.thymeleaf.org">
	<head>
	    <meta charset="UTF-8">
	    <title>404页面丢失</title>
	</head>
	<body>
	<p>页面不存在！</p>
	<!-- 显示异常状态码 -->
	<h1 th:text="${status}"></h1>
	<!-- 显示错误信息 -->
	<h1 th:text="${message}"></h1>
	<!-- 显示错误详细信息 -->
	<h1 th:text="${trace}"></h1>
	</body>
	</html>
	```

- @ControllerAdvice+@ExceptionHandler处理全局异常

	```java
	package com.SnHI.boot.exception;
	
	import lombok.extern.slf4j.Slf4j;
	import org.springframework.web.bind.annotation.ControllerAdvice;
	import org.springframework.web.bind.annotation.ExceptionHandler;
	
	/**
	 * 处理全局异常
	 */
	@Slf4j
	@ControllerAdvice
	public class GlobalExceptionHandler{
	
	    /**
	     * 可以处理数学运算异常和空指针异常
	     * @param e
	     * @return
	     */
	    @ExceptionHandler({ArithmeticException.class, NullPointerException.class})
	    public String handleArithException(Exception e) {
	        log.info("异常是{}" + e);
	        //返回视图地址
	        return "login";
	    }
	}
	```

- @ResponseStatus + 自定义异常

  ```java
  package com.SnHI.boot.exception;
  
  import org.springframework.http.HttpStatus;
  import org.springframework.web.bind.annotation.ResponseStatus;
  
  /**
   * 文件上传异常
   */
  //返回状态码
  @ResponseStatus(value = HttpStatus.FORBIDDEN, reason = "文件内存过大！")
  public class FileTooBigException extends RuntimeException{
      
      public FileTooBigException() {}
      
      public FileTooBigException(String message) {
          super(message);
      }
  }
  ```

  ```java
  @PostMapping("/upload")
  public String upload(@RequestParam("name") String name,
                       @RequestParam("email") String email,
                       @RequestPart("headImg") MultipartFile headImg,
                       @RequestPart("photos") MultipartFile[] photos) throws IOException {
          if(headImg.getSize() > 1) {
              //抛出自定义的异常FileUpLoadException——文件内存过大
              throw new FileTooBigException();
      }
  }
  ```

- DefaultHandlerExceptionResolver：处理框架底层的异常

	- 底层调用response.sendError(HttpServletResponse.SC_BAD_REQUEST, ex.getMessage())方法，调用sendError方法后跳出后续底层代码，转给Controller，转给哪个Controller由ErrorViewResolver来解析，如果没有异常解析器能够处理则跳转至tomcat默认的错误页

- 自定义异常解析器，实现HandlerExceptionResolver接口

	```java
	package com.SnHI.boot.exception;
	
	import org.springframework.core.Ordered;
	import org.springframework.core.annotation.Order;
	import org.springframework.stereotype.Component;
	import org.springframework.web.servlet.HandlerExceptionResolver;
	import org.springframework.web.servlet.ModelAndView;
	
	import javax.servlet.http.HttpServletRequest;
	import javax.servlet.http.HttpServletResponse;
	import java.io.IOException;
	
	/**
	 * 自定义异常处理解析器，实现HandlerExceptionResolver接口
	 */
	//设置最高优先级，可作为默认全局异常（数字越小，优先级越高）
	@Order(value = Ordered.HIGHEST_PRECEDENCE)
	@Component
	public class CustomerHandlerExceptionResolver implements HandlerExceptionResolver {
	
	    @Override
	    public ModelAndView resolveException(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o, Exception e) {
	        try {
	            httpServletResponse.sendError(511, "SnHI自定义异常");
	        } catch (IOException ioException) {
	            ioException.printStackTrace();
	        }
	        return new ModelAndView();
	    }
	}
	```

### Web原生组件注入

#### 注册原生组件

- @WebServlet(urlPatterns = "/webs")

	```java
	package com.SnHI.boot.servlet;
	
	import javax.servlet.ServletException;
	import javax.servlet.annotation.WebServlet;
	import javax.servlet.http.HttpServlet;
	import javax.servlet.http.HttpServletRequest;
	import javax.servlet.http.HttpServletResponse;
	import java.io.IOException;
	
	//访问路径
	@WebServlet(urlPatterns = "/webs")
	public class MyServlet extends HttpServlet {
	
	    @Override
	    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
	        resp.getWriter().write("6666");
	    }
	}
	```
	- /webs直接响应，不经过Spring的拦截器

	- 原因是容器中除了自定义MyServlet外，还有Spring的DispatcherServlet，DispatcherServlet同样也是用ServletRegistrationBean注册进容器，并且其默认路径为/。当请求路径为/webs时，此时两个Servlet都能处理到同一层路径，则会精确匹配MyServlet，最终由Tomcat直接处理，跳过DispatcherServlet也就跳过了Spring底层的拦截器，因此不会被拦截

		![image-20210828113019816](C:\Users\67090\Desktop\Typora\SpringBoot\自定义Servlet不会被拦截原理图.png)

- @WebFilter(urlPatterns = "/static/*")

	```java
	package com.SnHI.boot.servlet;
	
	import lombok.extern.slf4j.Slf4j;
	
	import javax.servlet.*;
	import javax.servlet.annotation.WebFilter;
	import java.io.IOException;
	
	@Slf4j
	//要过滤的路径
	@WebFilter(urlPatterns = "/static/*")
	public class MyFilter implements Filter {
	    @Override
	    public void init(FilterConfig filterConfig) throws ServletException {
	        log.info("过滤器初始化");
	    }
	
	    @Override
	    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
	        filterChain.doFilter(servletRequest, servletResponse);
	        log.info("过滤器开始工作");
	    }
	
	    @Override
	    public void destroy() {
	        log.info("过滤器销毁");
	    }
	}
	
	```

- @WebListener

	```java
	package com.SnHI.boot.servlet;
	
	import lombok.extern.slf4j.Slf4j;
	import javax.servlet.ServletContextEvent;
	import javax.servlet.ServletContextListener;
	import javax.servlet.annotation.WebListener;
	
	@Slf4j
	@WebListener
	public class MyListener implements ServletContextListener {
	    @Override
	    public void contextInitialized(ServletContextEvent sce) {
	        log.info("监听器初始化完成");
	    }
	
	    @Override
	    public void contextDestroyed(ServletContextEvent sce) {
	        log.info("监听器销毁");
	    }
	}
	```

#### 使用RegistrationBean注入

- ServletRegistrationBean

- FilterRegistrationBean

- ServletListenerRegistrationBean

	```java
	package com.SnHI.boot.servlet;
	
	import org.springframework.boot.web.servlet.FilterRegistrationBean;
	import org.springframework.boot.web.servlet.ServletListenerRegistrationBean;
	import org.springframework.boot.web.servlet.ServletRegistrationBean;
	import org.springframework.context.annotation.Bean;
	import org.springframework.context.annotation.Configuration;
	
	import java.util.Arrays;
	
	//不设置(proxyBeanMethods = false)是因为要保证依赖的组件始终是单实例的
	@Configuration
	public class MyRegistrationConfig {
	
	    @Bean
	    public ServletRegistrationBean myServlet() {
	        MyServlet myServlet = new MyServlet();
	        return new ServletRegistrationBean(myServlet, "/mys");
	    }
	
	    @Bean
	    public FilterRegistrationBean myFilter() {
	        MyFilter myFilter = new MyFilter();
	        FilterRegistrationBean filterRegistrationBean = new FilterRegistrationBean(myFilter);
	        filterRegistrationBean.setUrlPatterns(Arrays.asList("/myf"));
	        return filterRegistrationBean;
	    }
	
	    @Bean
	    public ServletListenerRegistrationBean myListener() {
	        MyListener myListener = new MyListener();
	        return new ServletListenerRegistrationBean(myListener);
	    }
	
	}
	```

#### 使用@ServletComponentScan注入

- 在主程序SpringBootWebApplication中配置注解@ServletComponentScan(basePackages = "com.SnHI.boot")，指定原生组件都放在哪里

	```java
	package com.SnHI.boot;
	
	@ServletComponentScan(basePackages = "com.SnHI.boot")
	@SpringBootApplication
	public class SpringbootWebApplication {
	
	    public static void main(String[] args) {
	        SpringApplication.run(SpringbootWebApplication.class, args);
	    }
	
	}
	```

### 嵌入式Servlet容器

- web项目不用打包成war包，不用放在自己安装的tomcat中运行，而是直接打包成jar包，直接用 java -jar 运行，SpringBoot引入web场景即自动引入了tomcat服务器，打包后项目内部已经存在相关容器并且在启动项目时启动容器。SpringBoot也支持替换其他服务器

#### 切换嵌入式Servlet容器

- 默认支持的WebServer

	- Tomcat
	- Jetty
	- Undertow

- 切换服务器方式

	```xml
	<dependency>
	    <groupId>org.springframework.boot</groupId>
	    <artifactId>spring-boot-starter-web</artifactId>
	    <!-- 除掉tomcat服务器 -->
	    <exclusions>
	        <exclusion>
	            <groupId>org.springframework.boot</groupId>
	            <artifactId>spring-boot-starter-tomcat</artifactId>
	        </exclusion>
	    </exclusions>
	</dependency>
	<!-- 引入undertow服务器 -->
	<dependency>
	    <groupId>org.springframework.boot</groupId>
	    <artifactId>spring-boot-starter-undertow</artifactId>
	</dependency>
	```

- 底层源码处理步骤

	- SpringBoot引入web场景，自动引入tomcat服务器，启动发现当前是web应用

	- web应用会创建一个web版的ioc容器ServletWebServerApplicationContext

	- ServletWebServerApplicationContext启动的时候寻找ServletWebServerFactory（Servlet的web服务器工厂，生产Servlet的web服务器）

	- SpringBoot底层默认有很多的WebServer工厂：TomcatServletWebServerFactory，JettyServletWebServerFactory，UndertowServletWebServerFactory

	- 底层直接会有一个自动配置类：ServletWebServerFactoryAutoConfiguration

	- ServletWebServerFactoryAutoConfiguration导入了ServletWebServerFactoryConfiguration（工厂配置类）

	- ServletWebServerFactoryConfiguration工厂配置类根据动态判断系统中到底导入了那个web服务器的包（默认是web-starter导入的tomcat包，容器中就有TomcatServletWebServerFactory）

	- TomcatServletWebServerFactory创建出Tomcat服务器并启动，TomcatWebServer的构造器拥有初始化方法initialize()——>this.tomcat.start()

	- 总结：内嵌服务器就是底层手动把启动服务器的代码调用

#### 定制Servlet容器

- 修改配置文件application.yaml——>server.xxx

	```yaml
	server:
	  port: 8888
	```

- 实现WebServerFactoryCustomizer<ConfigurableServletWebServerFactory>并重写customize方法

	```java
	package com.SnHI.boot.customizer;
	
	import org.springframework.boot.web.server.WebServerFactoryCustomizer;
	import org.springframework.boot.web.servlet.server.ConfigurableServletWebServerFactory;
	import org.springframework.stereotype.Component;
	
	/**
	 * 定制化器，定制嵌入式servlet容器
	 * 把配置文件的值和ServletWebServerFactory进行绑定
	 */
	@Component
	public class MyServerCustomizer implements WebServerFactoryCustomizer<ConfigurableServletWebServerFactory> {
	    @Override
	    public void customize(ConfigurableServletWebServerFactory factory) {
	        factory.setPort(8888);
	    }
	}
	```

### 定制化容器方法总结

- 容器各个组件功能运转底层源码处理流程总结
	- 引入starter场景——>xxxxAutoConfiguration——>导入组件——>绑定xxxxProperties配置文件

- 修改配置文件application.yaml / application.properties
- 编写Customizer定制化器并注入容器
- 编写Configuration配置类，用@Configuration + @Bean两个注解组合，替换或增加容器中默认组件
- 编写Configuration配置类，实现WebMvcConfigurer，重写相关功能方法或用@Bean扩展组件
- 编写Configuration配置类，加入@EnableWebMvc注解并实现WebMvcConfigurer，全面接管SpringMVC容器组件，所有规则需要重新定义和配置
	- WebMvcAutoConfiguration是默认的SpringMVC的自动配置功能类
	- 一旦使用@EnableWebMvc注解会触发@Import(DelegatingWebMvcConfiguration.class)

- - DelegatingWebMvcConfiguration继承WebMvcConfigurationSupport，只保证了SpringMVC最基本的组件功

- - WebMvcAutoConfiguration中有@ConditionalOnMissingBean(WebMvcConfigurationSupport.class)条件注解
	- 因此加入@EnableWebMvc注解后导致WebMvcConfigurationSupport生效，也表示WebMvcAutoConfiguration将失效

## 数据访问

### 配置数据源

- 导入jdbc场景

	```xml
	<!-- 内部自动导入Hikari数据源、事务支持等 -->
	<dependency>
	    <groupId>org.springframework.boot</groupId>
	    <artifactId>spring-boot-starter-data-jdbc</artifactId>
	</dependency>
	```

- 导入mysql驱动

	```xml
	<dependency>
	    <groupId>mysql</groupId>
	    <artifactId>mysql-connector-java</artifactId>
	    <scope>runtime</scope>
	</dependency>
	```

- application.yaml配置连接参数

	```yaml
	spring:
	  datasource:
	    url: jdbc:mysql://localhost:3306/hsms?serverTimezone=UTC
	    username: root
	    password: 13456191231sh
	    driver-class-name: com.mysql.cj.jdbc.Driver
	```

- 测试文件测试数据访问结果

	```java
	package com.SnHI.boot;
	
	import lombok.extern.slf4j.Slf4j;
	import org.junit.jupiter.api.Test;
	import org.springframework.beans.factory.annotation.Autowired;
	import org.springframework.boot.test.context.SpringBootTest;
	import org.springframework.jdbc.core.JdbcTemplate;
	
	@Slf4j
	@SpringBootTest
	class SpringbootDataApplicationTests {
	
	    @Autowired
	    JdbcTemplate jdbcTemplate;
	
	    @Test
	    void contextLoads() {
	        Long aLong = jdbcTemplate.queryForObject("select count(*) from dept", Long.class);
	        log.info("查询结果是{}", aLong);
	    }
	}
	```

- 底层自动配置类为：DataSourceAutoConfiguration
	- 修改数据源相关的配置：spring.datasource
	- DataSourceTransactionManagerAutoConfiguration：事务管理器的自动配置
	- JdbcTemplateAutoConfiguration：JdbcTemplate的自动配置，可以对数据库进行crud操作，可以修改配置项@ConfigurationProperties(prefix="spring.jdbc")来修改Template
	- JNDIDataSourceAutoConfiguration：JNDI的自动配置
	- XADataSourceAutoConfiguration：分布式事务的自动配置

### Druid

[官方Github]: https://github.com/alibaba/druid

#### 整合Druid

##### 自定义整合

- 引入数据源

	```xml
	<dependency>
	    <groupId>com.alibaba</groupId>
	    <artifactId>druid</artifactId>
	    <version>1.1.17</version>
	</dependency>
	```

- 在容器中创建自定义数据源

	```java
	package com.SnHI.boot.config;
	
	/**
	 * 自定义数据源
	 */
	@Configuration
	public class MyDataSourceConfig {
	
	    /**
	     * 替换了SpringBoot原本的数据源，并且拿到spring.datasource下的配置数据
	     * @return
	     */
	    @Bean
	    @ConfigurationProperties("spring.datasource")
	    public DataSource dataSource() {
	        DruidDataSource druidDataSource = new DruidDataSource();
	        return druidDataSource;
	    }
	}
	```

	```yaml
	spring:
	  datasource:
	    url: jdbc:mysql://localhost:3306/hsms?serverTimezone=UTC
	    username: root
	    password: 13456191231sh
	    driver-class-name: com.mysql.cj.jdbc.Driver
	```

- 测试数据源是否可用

	```java
	package com.SnHI.boot;
	
	@Slf4j
	@SpringBootTest
	class SpringbootDataApplicationTests {
	
	    @Autowired
	    DataSource dataSource;
	
	    @Test
	    void contextLoads() {
	        log.info("数据源为：{}", dataSource.getClass());
	    }
	
	}
	```

##### 引入starter场景

[^@Deprecated]: 弃用类

```xml
<dependency>
   <groupId>com.alibaba</groupId>
   <artifactId>druid-spring-boot-starter</artifactId>
   <version>1.1.17</version>
</dependency>
```

- 自动配置项

	- 扩展配置项：spring.datasource.druid
	- 监控SpringBean的配置项：spring.datasource.druid.aop-patterns
	- 监控页的配置项：spring.datasource.druid.stat-view-servlet（默认开启）
	- web的监控配置项：spring.datasource.druid.web-stat-filter（默认开启）
	- Filter配置项：spring.datasource.druid.filter.*

- 配置示例

	[druid配置列表]: https://github.com/alibaba/druid/tree/master/druid-spring-boot-starter

	```yaml
	spring:
	  datasource:
	    url: jdbc:mysql://localhost:3306/hsms?serverTimezone=UTC
	    username: root
	    password: 13456191231sh
	    driver-class-name: com.mysql.cj.jdbc.Driver
	
	    druid:
	      aop-patterns: com.atguigu.admin.*  #监控SpringBean
	      filters: stat,wall  #底层开启功能，stat（sql监控），wall（防火墙）
	  
	      stat-view-servlet:  #配置监控页功能
	        enabled: true
	        login-username: SnHI
	        login-password: 123456
	        resetEnable: false  #重置功能
	  
	      web-stat-filter:  #监控web
	        enabled: true
	        urlPattern: /*
	        exclusions: '*.js,*.gif,*.jpg,*.png,*.css,*.ico,/druid/*'
	  
	  
	      filter:
	        stat:  #对上面filters里面的stat的详细配置
	          slow-sql-millis: 1000
	          logSlowSql: true
	          enabled: true
	        wall:
	          enabled: true
	          config:
	            drop-table-allow: false
	```

#### 内置监控页面

##### SQL监控

- Druid内置提供了一个StatViewServlet用于展示Druid的统计信息
	- 提供监控信息展示的html页面
	- 提供监控信息的JSON API

- 在容器中配置监控页面

	```java
	package com.SnHI.boot.config;
	
	@Configuration
	public class MyDataSourceConfig {
	
	    /**
	     * 替换了SpringBoot原本的数据源
	     * @return
	     */
	    @Bean
	    @ConfigurationProperties("spring.datasource")
	    public DataSource dataSource() throws SQLException {
	        DruidDataSource druidDataSource = new DruidDataSource();
	        //加入监控功能
	        druidDataSource.setFilters("stat");
	        return druidDataSource;
	    }
	    
	    /**
	     * 配置druid的监控页面
	     * @return
	     */
	    @Bean
	    public ServletRegistrationBean statViewServlet() {
	        StatViewServlet statViewServlet = new StatViewServlet();
	        return new ServletRegistrationBean(statViewServlet, "/druid/*");
	    }
	
	}
	```
	- 要使用监控功能，必须在数据源中加入监控功能
	- 根据配置中的url-pattern来访问内置监控页面，即/druid/*

- 发送请求测试监控功能

	```java
	package com.SnHI.boot.controller;
	
	@Controller
	public class DruidTestController {
	
	    @Autowired
	    JdbcTemplate jdbcTemplate;
	
	    @ResponseBody
	    //发送/sql请求，监控页面访问地址为/druid/sql
	    @GetMapping("/sql")
	    public String DruidTest() {
	        Long aLong = jdbcTemplate.queryForObject("select count(*) from dept", Long.class);
	        return aLong.toString();
	    }
	}
	```

- 测试结果

	![image-20210830165014659](C:\Users\67090\Desktop\Typora\SpringBoot\Druid监控页面.png)

##### Web应用及URI监控

- WebStatFilter用于采集web-jdbc关联监控的数据

- 在容器中配置Web应用监控器

	```java
	package com.SnHI.boot.config;
	
	@Configuration
	public class MyDataSourceConfig {
	
	    /**
	     * WebStatFilter用于采集web-jdbc关联监控的数据
	     * @return
	     */
	    @Bean
	    public FilterRegistrationBean webStatFilter() {
	        WebStatFilter webStatFilter = new WebStatFilter();
	        FilterRegistrationBean filterRegistrationBean = new FilterRegistrationBean(webStatFilter);
	        //监控哪些servlet路径
	        filterRegistrationBean.setUrlPatterns(Arrays.asList("/*"));
	        //放行哪些路径及资源
	        filterRegistrationBean.addInitParameter("exclusions", "*.js,*.gif,*.jpg,*.png,*.css,*.ico,/druid/*");
	        return filterRegistrationBean;
	    }
	}
	```

- 测试结果

	![image-20210830170906500](C:\Users\67090\Desktop\Typora\SpringBoot\DruidWeb应用监控.png)

	![image-20210830171544943](C:\Users\67090\Desktop\Typora\SpringBoot\Druid URI监控.png)

##### 防火墙监控

- 在数据源中加入防火墙功能

	```java
	package com.SnHI.boot.config;
	
	/**
	 * 自定义数据源
	 */
	@Configuration
	public class MyDataSourceConfig {
	
	    /**
	     * 替换了SpringBoot原本的数据源
	     * @return
	     */
	    @Bean
	    @ConfigurationProperties("spring.datasource")
	    public DataSource dataSource() throws SQLException {
	        DruidDataSource druidDataSource = new DruidDataSource();
	        //加入防火墙功能
	        druidDataSource.setFilters("stat, wall");
	        return druidDataSource;
	    }
	}
	```

- 测试结果

	![image-20210830172202773](C:\Users\67090\Desktop\Typora\SpringBoot\Druid防火墙监控.png)

##### 配置访问密码

```java
package com.SnHI.boot.config;

@Configuration
public class MyDataSourceConfig {

    @Bean
    public ServletRegistrationBean statViewServlet() {
        StatViewServlet statViewServlet = new StatViewServlet();
        ServletRegistrationBean servletRegistrationBean = new ServletRegistrationBean(statViewServlet, "/druid/*");
        //设置登录用户密码和密码
        servletRegistrationBean.addInitParameter("loginUsername", "SnHI");
        servletRegistrationBean.addInitParameter("loginPassword", "123456");
        return servletRegistrationBean;
    }
}
```

### 整合Mybatis

[Mybatis官网]: http://www.mybatis.org/mybatis-3/

- 引入starter场景

	```xml
	<dependency>
	    <groupId>org.mybatis.spring.boot</groupId>
	    <artifactId>mybatis-spring-boot-starter</artifactId>
	    <version>2.1.4</version>
	</dependency>
	```

- 配置mybatis规则

	```yaml
	mybatis:
	  #mapper映射文件位置（用注解开发则不需要映射文件）
	  mapper-locations: classpath:mapper/*.xml
	  # config-location: classpath:mybatis/mybatis-config.xml  #全局配置文件位置
	  #全局配置，可代替全局配置文件
	  configuration:
	    #开启下划线转驼峰命名规则
	    map-underscore-to-camel-case: true
	```

- 编写mapper接口，在接口上标注@Mapper注解或在项目主程序位置标注@MapperScan("com.SnHI.boot.mapper")扫描映射文件

- 开发模式

	- 绑定xml

		```xml
		<?xml version="1.0" encoding="UTF-8" ?>
		<!DOCTYPE mapper
		        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
		        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
		<mapper namespace="com.SnHI.boot.mapper.DeptMapper">
		    <!-- id为方法名 -->
		    <select id="selectDeptById" resultType="com.SnHI.boot.bean.Dept">
		        select * from dept where did = #{did}
		    </select>
		<!--   useGeneratedKeys="true" keyProperty="did"：将自增属性同样封装到JavaBean中 -->
		    <insert id="" useGeneratedKeys="true" keyProperty="did"></insert>
		</mapper>
		```

	- 注解开发

		```java
		package com.SnHI.boot.mapper;
		
		@Mapper
		public interface DeptMapper {
		
		    @Select("select * from dept where dname = #{dname}")
		    //注解属性
		    @Options(useGeneratedKeys = true, keyProperty = "did")
		    Dept selectDeptByName(String dname);
		}
		```

### 整合MyBatis-Plus

- MyBatis-Plus是一个MyBatis的增强工具，增强但不改变Mybatis，为简化开发、提高效率而生

	[MyBatis-Plus官网]: https://baomidou.com/

- 下载MybatisX插件

- 导入starter场景

	```xml
	<!-- 整合mybatis-plus（内部包含mybatis场景和jdbc场景） -->
	<dependency>
	    <groupId>com.baomidou</groupId>
	    <artifactId>mybatis-plus-boot-starter</artifactId>
	    <version>3.4.3.2</version>
	</dependency>
	```

- 自动配置

	- 配置类：MybatisPlusAutoConfiguration；配置项绑定：MybatisPlusProperties
	- mybatis-plus：对mybatis-plus的定制配置
	- SqlSessionFactory自动配置，底层是容器中默认的数据源

	- mapperLocations自动配置，默认值为classpath:/mapper/\**/\*.xml
	- SqlSessionTemplate自动配置

- Mapper继承BaseMapper即可拥有crud能力

	```java
	package com.SnHI.boot.mapper;
	
	import com.SnHI.boot.bean.User;
	import com.baomidou.mybatisplus.core.mapper.BaseMapper;
	import org.apache.ibatis.annotations.Mapper;
	
	@Mapper
	public interface UserMapper extends BaseMapper<User> {
	}
	```

- 当表名不为类名时，使用@TableName注解指定表名

- 分页查询配置类

	```java
	package com.SnHI.dorm.config;
	
	import com.baomidou.mybatisplus.annotation.DbType;
	import com.baomidou.mybatisplus.extension.plugins.MybatisPlusInterceptor;
	import com.baomidou.mybatisplus.extension.plugins.inner.PaginationInnerInterceptor;
	import org.springframework.context.annotation.Bean;
	import org.springframework.context.annotation.Configuration;
	
	@Configuration
	public class MybatisPlusConfig {
	
	    @Bean
	    public MybatisPlusInterceptor mybatisPlusInterceptor() {
	        MybatisPlusInterceptor interceptor = new MybatisPlusInterceptor();
	        // 向Mybatis过滤器链中添加分页拦截器
	        interceptor.addInnerInterceptor(new PaginationInnerInterceptor(DbType.H2));
	        return interceptor;
	    }
	
	}
	
	```

- wrapper查询操作

	```java
	// 根据 ID 查询
	T selectById(Serializable id);
	// 根据 entity 条件，查询一条记录
	T selectOne(@Param(Constants.WRAPPER) Wrapper<T> queryWrapper);
	// 查询（根据ID 批量查询）
	List<T> selectBatchIds(@Param(Constants.COLLECTION) Collection<? extends Serializable> idList);
	// 根据 entity 条件，查询全部记录
	List<T> selectList(@Param(Constants.WRAPPER) Wrapper<T> queryWrapper);
	// 查询（根据 columnMap 条件）
	List<T> selectByMap(@Param(Constants.COLUMN_MAP) Map<String, Object> columnMap);
	// 根据 Wrapper 条件，查询全部记录
	List<Map<String, Object>> selectMaps(@Param(Constants.WRAPPER) Wrapper<T> queryWrapper);
	// 根据 Wrapper 条件，查询全部记录。注意： 只返回第一个字段的值
	List<Object> selectObjs(@Param(Constants.WRAPPER) Wrapper<T> queryWrapper);
	// 根据 entity 条件，查询全部记录（并翻页）
	IPage<T> selectPage(IPage<T> page, @Param(Constants.WRAPPER) Wrapper<T> queryWrapper);
	// 根据 Wrapper 条件，查询全部记录（并翻页）
	IPage<Map<String, Object>> selectMapsPage(IPage<T> page, @Param(Constants.WRAPPER) Wrapper<T> queryWrapper);
	// 根据 Wrapper 条件，查询总记录数
	Integer selectCount(@Param(Constants.WRAPPER) Wrapper<T> queryWrapper);
	```

- wrapper构造图

	![](C:\Users\67090\Desktop\Typora\SpringBoot\wrapper构造图.png)

### CRUD案例

- Emp员工表的查询及删除功能

	![image-20210901133011601](C:\Users\67090\Desktop\Typora\BootStrap\CRUD案例——emp表.png)

- Emp表对应JavaBean

	```java
	package com.SnHI.boot.bean;
	
	@Data
	public class Emp {
		//@TableId：设置当前属性为键
	    @TableId
	    private Integer eid;
	    private String ename;
	    private String sex;
	    private String email;
	    private Integer deptId;
	}
	```

- EmpMapper

	```java
	package com.SnHI.boot.mapper;
	
	import com.SnHI.boot.bean.Emp;
	import com.baomidou.mybatisplus.core.mapper.BaseMapper;
	
	//Mapper继承BaseMapper即可拥有crud能力
	public interface EmpMapper extends BaseMapper<Emp> {
	}
	```

- EmpService

	```java
	package com.SnHI.boot.service;
	
	import com.SnHI.boot.bean.Emp;
	import com.baomidou.mybatisplus.extension.service.IService;
	
	//IService：Service层总接口
	public interface EmpService extends IService<Emp> {
	}
	```

- EmpServiceImpl

	```java
	package com.SnHI.boot.service.Impl;
	
	import com.SnHI.boot.bean.Emp;
	import com.SnHI.boot.mapper.EmpMapper;
	import com.SnHI.boot.service.EmpService;
	import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
	import org.springframework.stereotype.Service;
	
	//ServiceImpl：Service层顶级实现类，继承ServiceImpl并实现EmpService后，可调用BaseMapper中的方法
	@Service
	public class EmpServiceImpl extends ServiceImpl<EmpMapper, Emp> implements EmpService {
	}
	```

- EmpController

	```java
	package com.SnHI.boot.controller;
	
	@Controller
	public class EmpController {
	
	    @Autowired
	    EmpService empService;
	
	    @GetMapping("/emp")
	    public String getAllEmp(@RequestParam("pn") Integer pn, Model model) {
	        //pn：起始页；5：每页显示记录数
	        Page<Emp> empPage = new Page<>(pn, 5);
	        Page<Emp> page = empService.page(empPage , null);
	        model.addAttribute("page", page);
	        return "table";
	    }
	
	    //RedirectAttributes：重定向参数
	    @GetMapping("/deleteById/{eid}")
	    public String deleteEmpById(@PathVariable("eid") Integer eid,
	                                @RequestParam("pn") Integer pn,
	                                RedirectAttributes ra) {
	        empService.removeById(eid);
	        ra.addAttribute("pn", pn);
	        return "redirect:/emp";
	    }
	}
	```

- table页面

	```html
	<!DOCTYPE html>
	<html lang="en" xmlns:th="http://www.thymeleaf.org">
	<head>
	    <meta charset="UTF-8">
	    <link rel="stylesheet" href="/webjars/bootstrap/3.3.5/css/bootstrap.min.css" />
	    <script src="/webjars/jquery/3.1.1/jquery.min.js"></script>
	    <script src="/webjars/bootstrap/3.3.5/js/bootstrap.min.js"></script>
	    <title>CRUD</title>
	</head>
	    <body>
	        <div class="container">
	            <div class="row">
	                <table id="empTable" class="table table-hover">
	                    <thead>
	                    <tr>
	                        <th>员工编号</th>
	                        <th>姓名</th>
	                        <th>性别</th>
	                        <th>邮箱</th>
	                        <th>部门编号</th>
	                        <th>删除</th>
	                    </tr>
	                    </thead>
	                    <tbody>
	                    <!-- 遍历 -->
	                    <tr th:each="emp,stat:${page.records}">
	                        <td th:text="${emp.eid}"></td>
	                        <td th:text="${emp.ename}"></td>
	                        <td th:text="${emp.sex}"></td>
	                        <td th:text="${emp.email}"></td>
	                        <td th:text="${emp.deptId}"></td>
	                        <td><a th:href="@{/deleteById/{eid}(eid=${emp.eid}, pn=${page.current})}" type="button" class="btn btn-danger">删除</a></td>
	                    </tr>
	                    </tbody>
	                </table>
	            </div>
	            <!-- 分页 -->
	            <div class="row">
	                <!-- 分页详情 -->
	                <div id="page-info" class="col-md-7">
	                    当前第[[${page.current}]]页，共[[${page.pages}]]页，共[[${page.total}]]条记录数
	                </div>
	                <!-- 分页栏 -->
	                <div id="page-nav" class="col-md-5">
	                    <nav>
	                        <ul class="pagination">
	                            <!-- 三元运算 -->
	                            <li th:class="${page.current == 1? 'disabled' : 'prev'}"><a th:href="@{/emp(pn=${page.current - 1})}">前一页</a></li>
	                            <!-- numbers.sequence(起始页，末页) -->
	                            <li th:class="${page.current == num? 'active' : ''}" th:each="num:${#numbers.sequence(1, page.pages)}"><a th:href="@{/emp(pn=${num})}">[[${num}]]</a></li>
	                            <li th:class="${page.current == page.pages? 'disabled' : 'next'}"><a th:href="@{/emp(pn=${page.current + 1})}">后一页</a></li>
	                        </ul>
	                    </nav>
	                </div>
	            </div>
	        </div>
	    </body>
	</html>
	```

### 整合Redis

- Redis 是一个开源（BSD许可）的内存中的数据结构存储系统，它可以用作数据库、缓存和消息中间件。 它支持多种类型的数据结构，如字符串（strings），散列（hashes），列表（lists），集合（sets），有序集合（sorted sets）与范围查询，bitmaps，hyperloglogs和地理空间（geospatial）索引半径查询。Redis 内置了 复制（replication），LUA脚本（Lua scripting），LRU驱动事件（LRU eviction），[事务（transactions）和不同级别的磁盘持久化（persistence），并通过Redis哨兵（Sentinel）和自动分区（Cluster）提供高可用性（high availability）

- 引入starter场景

	```xml
	<dependency>
	    <groupId>org.springframework.boot</groupId>
	    <artifactId>spring-boot-starter-data-redis</artifactId>
	</dependency>
	<!-- 导入jedis（有需要导入） -->
	<dependency>
	    <groupId>redis.clients</groupId>
	    <artifactId>jedis</artifactId>
	</dependency>
	```

- 自动配置

	- RedisAutoConfiguration自动配置类——>RedisProperties配置文件——>spring.redis.是对redis的配置
	- LettuceConnectionConfiguration、JedisConnectionConfiguration客户端自动配置

	- 自动注入了RedisTemplate<Object, Object>：key：value
	- 自动注入了StringRedisTemplate：k：v都是String

	- 底层只要我们使用StringRedisTemplate.RedisTemplate就可以操作redis

## 单元测试

- SpringBoot 2.2.0 版本开始引入JUnit 5作为单元测试默认库

- SpringBoot整合JUnit以后，编写测试方法用@Test标注，并且Junit类具有Spring的功能，比如 @Transactional注解标注测试方法，测试完成后自动回滚

- 作为最新版本的JUnit框架，JUnit5与之前版本的JUnit框架有很大的不同，由三个不同子项目的几个不同模块组成

	![image-20210901173002825](C:\Users\67090\Desktop\Typora\BootStrap\JUnit5模块.png)

	- JUnit Platform：Junit Platform是在JVM上启动测试框架的基础，不仅支持Junit自制的测试引擎，其他测试引擎也都可以接入

	- JUnit Jupiter：JUnit Jupiter提供了JUnit5的新的编程模型，是JUnit5新特性的核心。内部包含了一个测试引擎，用于在Junit Platform上运行

	- JUnit Vintage：由于JUint已经发展多年，为了照顾老的项目，JUnit Vintage提供了兼容JUnit4.x，Junit3.x的测试引擎。SpringBoot 2.4 以上版本移除了默认对Vintage的依赖，如果需要兼容junit4需要自行引入vintage

		```xml
		<dependency>
		    <groupId>org.junit.vintage</groupId>
		    <artifactId>junit-vintage-engine</artifactId>
		    <scope>test</scope>
		    <exclusions>
		        <exclusion>
		            <groupId>org.hamcrest</groupId>
		            <artifactId>hamcrest-core</artifactId>
		        </exclusion>
		    </exclusions>
		</dependency>
		```

### 常用注解

[JUnit注解]: https://junit.org/junit5/docs/current/user-guide/#writing-tests-annotations

- @Test :表示方法是测试方法，但是与JUnit4的@Test不同，他的职责非常单一不能声明任何属性，拓展的测试将会由Jupiter提供额外测试
- @ParameterizedTest：表示方法是参数化测试
- @RepeatedTest：表示方法可重复执行

- @DisplayName：为测试类或者测试方法设置展示名称

- @BeforeEach：表示在每个单元测试之前执行
- @AfterEach：表示在每个单元测试之后执行

- @BeforeAll：表示在所有单元测试之前执行
- @AfterAll：表示在所有单元测试之后执行

- @Tag：表示单元测试类别，类似于JUnit4中的@Categories
- @Disabled：表示测试类或测试方法不执行，类似于JUnit4中的@Ignore

- @Timeout：表示测试方法运行如果超过了指定时间将会返回错误
- @ExtendWith：为测试类或测试方法提供扩展类引用

```java
package com.SnHI.boot;

import org.junit.jupiter.api.*;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.concurrent.TimeUnit;

/**
 * JUnit5注解测试
 */
@DisplayName("测试JUnit5")
//@SpringBootTest内部包含@ExtendWith，加上该注解后可以使用Spring的相关功能
@SpringBootTest
public class JUnit5Test {

    @Test
    @DisplayName("测试DisplayName")
    public void testDisplayName() {
        System.out.println("DisplayName");
    }

    @Test
    @Disabled
    public void testDisabled() {
        System.out.println("Disabled");
    }

    @Test
    //unit = TimeUnit.MILLISECONDS：设置时间单位
    @Timeout(value = 500, unit = TimeUnit.MILLISECONDS)
    public void testTimeout() throws InterruptedException {
        Thread.sleep(600);
    }

    @Test
    @BeforeEach
    public void testBeforeEach() {
        System.out.println("BeforeEach");
    }

    @Test
    @AfterEach
    public void testAfterEach () {
        System.out.println("AfterEach ");
    }

    @Test
    @BeforeAll
    static public void testBeforeAll() {
        System.out.println("BeforeAll ");
    }

    @Test
    @AfterAll
    static public void testAfterAll() {
        System.out.println("AfterAll ");
    }

}
```

- 测试结果

	![image-20210901180151354](C:\Users\67090\Desktop\Typora\BootStrap\JUnit5注解测试结果.png)

### 断言

- 断言（assertions）是测试方法中的核心部分，用来对测试需要满足的条件进行验证，检查业务逻辑返回的数据是否合理，所有的测试运行结束以后，得益于断言机制会有一个详细的测试报告

- 这些断言方法都是 org.junit.jupiter.api.Assertions 的静态方法，使用时需import

  ```java
  import static org.junit.jupiter.api.Assertions.*;
  ```

- 简单断言：用来对单个值进行简单的验证

	| 方法            | 说明                                 |
	| --------------- | ------------------------------------ |
	| assertEquals    | 判断两个对象或两个原始类型是否相等   |
	| assertNotEquals | 判断两个对象或两个原始类型是否不相等 |
	| assertSame      | 判断两个对象引用是否指向同一个对象   |
	| assertNotSame   | 判断两个对象引用是否指向不同的对象   |
	| assertTrue      | 判断给定的布尔值是否为 true          |
	| assertFalse     | 判断给定的布尔值是否为 false         |
	| assertNull      | 判断给定的对象引用是否为 null        |
	| assertNotNull   | 判断给定的对象引用是否不为 null      |

	```java
	/**
	 * 当有断言失败时，后续的代码不再执行
	 */
	@Test
	@DisplayName("测试简单断言")
	public void testSimpleAssertions() {
	    int a = 1;
	    assertEquals(1, a, "值不同");
	    assertTrue(1 < 2);
	    assertNull(null);
	    assertSame(new Object(), new Object(), "对象不同");
	}
	```

- 数组断言：通过 assertArrayEquals 方法来判断两个对象或原始类型的数组是否相等

	```java
	@Test
	@DisplayName("测试数组断言")
	public void testArrayAssertions() {
	    assertArrayEquals(new int[]{1, 2}, new int[]{1, 2}, "数组不同");
	}
	```

- 组合断言：assertAll 方法接受多个 org.junit.jupiter.api.Executable 函数式接口的实例作为要验证的断言，可以通过 lambda 表达式很容易的提供这些断言

	```java
	/**
	 * 所有断言通过组合断言才会通过
	 */
	@Test
	@DisplayName("测试组合断言")
	public void testAllAssertions() {
	    assertAll("组合断言",
	            () -> assertEquals(1, 1),
	            () -> assertTrue(1 > 0),
	            () -> assertNull(new Object()));
	}
	```

- 异常断言：在JUnit4时期，想要测试方法的异常情况时，需要用@Rule注解的ExpectedException变量还是比较麻烦的，而JUnit5提供了一种新的断言方式Assertions.assertThrows()，配合函数式编程就可以进行使用

	```java
	@Test
	@DisplayName("测试异常断言")
	public void testExceptionAssertions() {
	    assertThrows(ArithmeticException.class, () -> System.out.println(1 / 0), "无数学异常");
	}
	```

- 超时断言：assertTimeout方法为测试方法设置了超时时间

	```java
	@Test
	@DisplayName("测试超时断言")
	public void testTimeoutAssertions() {
	    assertTimeout(Duration.ofMillis(1000), () -> Thread.sleep(1200), "请求超时");
	}
	```

- 快速失败：通过fail方法直接使得测试失败

	```java
	@Test
	@DisplayName("测试快速失败")
	public void shouldFail() {
	    fail("测试结束");
	}
	```

- 测试报告

	![image-20210902095828608](C:\Users\67090\Desktop\Typora\SpringBoot\断言测试报告.png)

### 前置条件

- JUnit 5 中的前置条件assumptions（假设）类似于断言，不同之处在于不满足的断言会使得测试方法失败，而不满足的前置条件只会使得测试方法的执行终止。前置条件可以看成是测试方法执行的前提，前提不满足时，就没有继续执行的必要

	```java
	@Test
	@DisplayName("测试前置条件")
	public void testAssumptions() {
	    //assumeTrue和assumeFalse确保给定的条件为true或false，不满足条件会使得测试执行终止
	    Assumptions.assumeTrue(true);
	    System.out.println("assumeTrue");
	    //assumingThat的参数是表示条件的布尔值和对应的Executable接口的实现对象。只有条件满足时，Executable对象才会被执行；当条件不满足时，测试执行并不会终止
	    Assumptions.assumingThat(false, () -> System.out.println("True"));
	    System.out.println("assumingThat");
	}
	```

### 嵌套测试

- JUnit 5 可以通过 Java 中的内部类和@Nested 注解实现嵌套测试，从而可以更好的把相关的测试方法组织在一起。在内部类中可以使用@BeforeEach 和@AfterEach 注解，而且嵌套的层次没有限制

	```java
	package com.SnHI.boot;
	
	import org.junit.jupiter.api.BeforeEach;
	import org.junit.jupiter.api.DisplayName;
	import org.junit.jupiter.api.Nested;
	import org.junit.jupiter.api.Test;
	
	import java.util.EmptyStackException;
	import java.util.Stack;
	
	import static org.junit.jupiter.api.Assertions.*;
	
	@DisplayName("A stack")
	public class TestingAStackDemo {
	
	    Stack<Object> stack;
	
	    @Test
	    @DisplayName("new Stack()")
	    void isInstantiatedWithNew() {
	        new Stack<>();
	    }
	
	    //嵌套测试情况下，外层的Test不能驱动内层的BeforeEach/All、AfterEach/All之类的方法，但内层Test可以驱动外层的方法
	    @Nested
	    @DisplayName("when new")
	    class WhenNew {
	
	        @BeforeEach
	        void createNewStack() {
	            stack = new Stack<>();
	        }
	
	        @Test
	        @DisplayName("is empty")
	        void isEmpty() {
	            assertTrue(stack.isEmpty());
	        }
	
	        @Test
	        @DisplayName("throws EmptyStackException when popped")
	        void throwsExceptionWhenPopped() {
	            assertThrows(EmptyStackException.class, stack::pop);
	        }
	
	        @Test
	        @DisplayName("throws EmptyStackException when peeked")
	        void throwsExceptionWhenPeeked() {
	            assertThrows(EmptyStackException.class, stack::peek);
	        }
	
	        @Nested
	        @DisplayName("after pushing an element")
	        class AfterPushing {
	
	            String anElement = "an element";
	
	            @BeforeEach
	            void pushAnElement() {
	                stack.push(anElement);
	            }
	
	            @Test
	            @DisplayName("it is no longer empty")
	            void isNotEmpty() {
	                assertFalse(stack.isEmpty());
	            }
	
	            @Test
	            @DisplayName("returns the element when popped and is empty")
	            void returnElementWhenPopped() {
	                assertEquals(anElement, stack.pop());
	                assertTrue(stack.isEmpty());
	            }
	
	            @Test
	            @DisplayName("returns the element when peeked but remains not empty")
	            void returnElementWhenPeeked() {
	                assertEquals(anElement, stack.peek());
	                assertFalse(stack.isEmpty());
	            }
	        }
	    }
	}
	```

### 参数化测试

- 参数化测试是JUnit5很重要的一个新特性，它使得用不同的参数多次运行测试成为了可能，也为我们的单元测试带来许多便利。利用@ValueSource等注解，指定入参，我们将可以使用不同的参数进行多次单元测试，而不需要每新增一个参数就新增一个单元测试，省去了很多冗余代码

	- @ValueSource：为参数化测试指定入参来源，支持八大基础类以及String类型，Class类型

	- @NullSource：表示为参数化测试提供一个NULL的入参

	- @EnumSource：表示为参数化测试提供一个枚举入参

	- @CsvFileSource：表示读取指定CSV文件内容作为参数化测试入参

	- @MethodSource：表示读取指定方法的返回值作为参数化测试入参(注意方法返回需要是一个流)

	```java
	@ParameterizedTest
	@DisplayName("参数化测试")
	@ValueSource(ints = {1, 2, 3})
	public void parameterizedTest1(int a) {
	    System.out.println(a);
	}
	
	@ParameterizedTest
	@DisplayName("方法参数测试")
	@MethodSource("method")
	public void testWithExplicitLocalMethodSource(String name) {
	    System.out.println(name);
	}
	
	//方法需要是一个流
	static Stream<String> method() {
	    return Stream.of("one", "two", "three");
	}
	```

- 当然如果参数化测试仅仅只能做到指定普通的入参还达不到让我觉得惊艳的地步，让我真正感到他的强大之处的地方在于他可以支持外部的各类入参。如：CSV，YML，JSON 文件甚至方法的返回值也可以作为入参。只需要去实现ArgumentsProvider接口，任何外部文件都可以作为它的入参

## 指标监控

### Actuator简介

- 未来每一个微服务在云上部署以后，我们都需要对其进行监控、追踪、审计、控制等。SpringBoot就抽取了Actuator场景，使得我们每个微服务快速引用即可获得生产级别的应用监控、审计等功能

	[SpringBoot Actuator]: https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/#actuator

- 1.x与2.x区别

	![image-20210902145021001](C:\Users\67090\Desktop\Typora\SpringBoot\actuator1和actuator2区别.png)

- 引入starter场景

	```xml
	<dependency>
	    <groupId>org.springframework.boot</groupId>
	    <artifactId>spring-boot-starter-actuator</artifactId>
	</dependency>
	```

- 以web方式暴露所有监控端点（web默认只暴露health和info端点；JMX默认暴露所有监控端点）

	```yaml
	#对指标监控的配置都在management下
	management:
	  #配置所有的监控端点
	  endpoints:
	    web:
	      exposure:
	        include: "*"  #以web方式暴露所有监控端点
	```

- 访问方式

	```
	http://localhost:8080/actuator/**（监控端点）
	```

### Endpoint监控端点

- 常用的监控端点

	| ID                 | 描述                                                         |
	| ------------------ | ------------------------------------------------------------ |
	| `auditevents`      | 暴露当前应用程序的审核事件信息。需要一个`AuditEventRepository组件` |
	| `beans`            | 显示应用程序中所有Spring Bean的完整列表                      |
	| `caches`           | 暴露可用的缓存                                               |
	| `conditions`       | 显示自动配置的所有条件信息，包括匹配或不匹配的原因           |
	| `configprops`      | 显示所有`@ConfigurationProperties`                           |
	| `env`              | 暴露Spring的属性`ConfigurableEnvironment`                    |
	| `flyway`           | 显示已应用的所有Flyway数据库迁移。 需要一个或多个`Flyway`组件 |
	| `health`           | 显示应用程序运行状况信息                                     |
	| `httptrace`        | 显示HTTP跟踪信息（默认情况下，最近100个HTTP请求-响应），需要一个`HttpTraceRepository`组件 |
	| `info`             | 显示应用程序信息                                             |
	| `integrationgraph` | 显示Spring `integrationgraph` 。需要依赖`spring-integration-core` |
	| `loggers`          | 显示和修改应用程序中日志的配置                               |
	| `liquibase`        | 显示已应用的所有Liquibase数据库迁移。需要一个或多个`Liquibase`组件 |
	| `metrics`          | 显示当前应用程序的“指标”信息                                 |
	| `mappings`         | 显示所有`@RequestMapping`路径列表                            |
	| `scheduledtasks`   | 显示应用程序中的计划任务                                     |
	| `sessions`         | 允许从Spring Session支持的会话存储中检索和删除用户会话。需要使用Spring Session的基于Servlet的Web应用程序 |
	| `shutdown`         | 使应用程序正常关闭。默认禁用                                 |
	| `startup`          | 显示由`ApplicationStartup`收集的启动步骤数据。需要使用`SpringApplication`进行配置`BufferingApplicationStartup` |
	| `threaddump`       | 执行线程转储                                                 |

- 如果应用程序是Web应用（SpringMVC，Spring WebFlux或Jersey），则可以使用以下附加端点

	| ID           | 描述                                                         |
	| ------------ | ------------------------------------------------------------ |
	| `heapdump`   | 返回`hprof`堆转储文件                                        |
	| `jolokia`    | 通过HTTP暴露JMX bean（需要引入Jolokia，不适用于WebFlux）。需要引入依赖`jolokia-core` |
	| `logfile`    | 返回日志文件的内容（如果已设置`logging.file.name`或`logging.file.path`属性）。支持使用HTTP`Range`标头来检索部分日志文件的内容 |
	| `prometheus` | 以Prometheus服务器可以抓取的格式公开指标。需要依赖`micrometer-registry-prometheus` |

#### Health Endpoint

- 健康检查端点，我们一般用于在云平台，平台会定时的检查应用的健康状况，我们就需要Health Endpoint可以为平台返回当前应用的一系列组件健康状况的集合

	- health endpoint返回的结果，应该是一系列健康检查后的一个汇总报告
	- 很多的健康检查默认已经自动配置好了，比如：数据库、redis等

	- 可以很容易的添加自定义的健康检查机制

	- 配置health以显示详细信息

		```yaml
		management:
		  #配置单个监控端点
		  endpoint:
		    health:
		      show-details: always  #显示详细信息
		```

#### Metrics Endpoint

- 提供详细的、层级的、空间指标信息，这些信息可以被pull（主动推送）或者push（被动获取）方式得到

	- 通过Metrics对接多种监控系统
	- 简化核心Metrics开发

	- 添加自定义Metrics或者扩展已有Metrics

### 扩展Endpoint

#### Health Endpoint

- 编写xxxHealthIndicator文件继承AbstractHealthIndicator

	```java
	package com.SnHI.boot.indicator;
	
	import org.springframework.boot.actuate.health.AbstractHealthIndicator;
	import org.springframework.boot.actuate.health.Status;
	import org.springframework.stereotype.Component;
	
	@Component
	public class MyHealthIndicator extends AbstractHealthIndicator {
	
	    @Override
	    protected void doHealthCheck(Health.Builder builder) throws Exception {
	        int errorCode = 200;
	        if(errorCode == 200) {
	            builder.status(Status.UP).withDetail("errorCode", errorCode).withDetail("error", "null");
	        } else {
	            builder.status(Status.OUT_OF_SERVICE).withDetail("errorCode", errorCode).withDetail("error", "OUT_OF_SERVICE");
	        }
	    }
	}
	```

- 编写xxxHealthIndicator文件实现HealthIndicator

	```java
	package com.SnHI.boot.indicator;
	
	import org.springframework.boot.actuate.health.Health;
	import org.springframework.boot.actuate.health.HealthIndicator;
	import org.springframework.stereotype.Component;
	
	@Component
	public class MyHealthIndicator implements HealthIndicator {
	    @Override
	    public Health health() {
	        int errorCode = check();
	        if(errorCode != 200) {
	            return Health.down().withDetail("errorCode", errorCode).build();
	        } else {
	            return Health.up().build();
	        }
	    }
	
	    private int check() {
	        return 200;
	    }
	}
	```

#### Info Endpoint

- 配置yaml文件

	```yaml
	#指标监控配置info信息
	info:
	  appName: boot-admin
	  version: 2.0.1
	  mavenProjectName: @project.artifactId@  #使用@@可以获取maven的pom文件值
	  mavenProjectVersion: @project.version@
	```

- 编写xxxInfoContributor文件实现InfoContributor

	```java
	package com.SnHI.boot.actuator.info;
	
	import org.springframework.boot.actuate.info.Info;
	import org.springframework.boot.actuate.info.InfoContributor;
	import org.springframework.stereotype.Component;
	
	@Component
	public class ExampleInfoContributor implements InfoContributor {
	    @Override
	    public void contribute(Info.Builder builder) {
	        builder.withDetail("msg", "你好").withDetail("code", "300");
	    }
	}
	```

#### Metrics Endpoint

- 给想要获取指标信息的类加上参数为MeterRegistry的构造方法

	```java
	package com.SnHI.boot.service;
	
	import com.SnHI.boot.bean.Dept;
	import com.SnHI.boot.mapper.DeptMapper;
	import io.micrometer.core.instrument.Counter;
	import io.micrometer.core.instrument.MeterRegistry;
	import org.springframework.beans.factory.annotation.Autowired;
	import org.springframework.stereotype.Service;
	
	@Service
	public class DeptServiceImpl implements DeptService{
	
	    @Autowired
	    DeptMapper deptMapper;
	
	    Counter counter;
	
	    public Dept selectDeptById(Integer did) {
	        Dept dept = deptMapper.selectDeptById(did);
	        //计数，每调用一次selectDeptById，counter加一
	        counter.increment();
	        return dept;
	    }
	
	    //增加定制名为DeptService.selectDeptById.count的监控指标信息
	    public DeptServiceImpl(MeterRegistry meterRegistry) {
	        counter = meterRegistry.counter("DeptService.selectDeptById.count");
	    }
	
	}
	```

### 自定义Endpoint

- 使用@Endpoint定制监控端点

	```java
	package com.SnHI.boot.actuator.endpoint;
	
	import org.springframework.boot.actuate.endpoint.annotation.Endpoint;
	import org.springframework.boot.actuate.endpoint.annotation.ReadOperation;
	import org.springframework.boot.actuate.endpoint.annotation.WriteOperation;
	import org.springframework.stereotype.Component;
	
	import java.util.Collections;
	import java.util.Map;
	
	/**
	 * 自定义Endpoint
	 */
	@Component
	@Endpoint(id = "myRequest") //Endpoint名称（必须以小写字母开头）
	public class MyRequestEndpoint {
	
	    @ReadOperation
	    public Map getDockerInfo(){
	        return Collections.singletonMap("info","docker started...");
	    }
	
	    @WriteOperation
	    private void restartDocker(){
	        System.out.println("docker restarted....");
	    }
	
	}
	```

### 可视化

- 开发中会有一个专门管理指标监控的微服务AdminServer来检测并管理其他所有微服务的指标监控信息

- 另建项目作为指标监控微服务并导入admin-server场景

	```xml
	<dependency>
	    <groupId>de.codecentric</groupId>
	    <artifactId>spring-boot-admin-starter-server</artifactId>
	    <version>2.5.0</version>
	</dependency>
	```

- 在主程序类上加上@EnableAdminServer注解开启监控功能

	```java
	package com.SnHI.boot;
	
	import de.codecentric.boot.admin.server.config.EnableAdminServer;
	import org.springframework.boot.SpringApplication;
	import org.springframework.boot.autoconfigure.SpringBootApplication;
	
	@EnableAdminServer
	@SpringBootApplication
	public class SpringbootAdminserverApplication {
	
	    public static void main(String[] args) {
	        SpringApplication.run(SpringbootAdminserverApplication.class, args);
	    }
	
	}
	```

- 修改端口号（8080已被项目服务占用）

	```properties
	server.port=8888
	```

- 在普通微服务项目中引入客户端场景

	```xml
	<dependency>
	    <groupId>de.codecentric</groupId>
	    <artifactId>spring-boot-admin-starter-client</artifactId>
	    <version>2.5.0</version>
	</dependency>
	```

- 配置AdminServer微服务的访问地址

	```yaml
	# 配置指标监控adminServer微服务的地址
	boot:
	  admin:
	    client:
	      url: http://localhost:8888
	```

- 可视化窗口

	![image-20210902173813995](C:\Users\67090\Desktop\Typora\SpringBoot\可视化窗口1.png)

	![image-20210902173846305](C:\Users\67090\Desktop\Typora\SpringBoot\可视化窗口2.png)

# Profile

- Profile是Spring对不同环境提供不同配置功能的支持，可以通过激活、制定参数等方式快速切换环境

- 默认的配置文件application.yaml任何时候都会加载，指定环境配置文件：application-{env}.yaml，默认配置与环境配置同时生效时，同名配置项profile配置优先

- 激活指定环境

- - 配置文件激活

		```yaml
		# 设置生效的配置文件
		spring: 
		  profiles:
		    active: env
		```

	- 命令行激活（项目打包后）

		```cmd
		java -jar xxx.jar --spring.profiles.active=env --person.name=haha（修改配置文件的任意值，命令行优先）
		```

- @Profile条件装配激活

	```java
	@Configuration(proxyBeanMethods = false)
	//给该类指定production环境的配置文件
	@Profile("production")
	public class ProductionConfiguration {
	    // ...
	}
	```

- Profile分组

	```properties
	# 使用spring.profiles.active=production激活，使production下的两个环境标识同时生效
	spring.profiles.group.production[0]=proddb
	spring.profiles.group.production[1]=prodmq
	```

# 外部化配置

- 常用配置方式：Java属性文件、YAML文件、环境变量、命令行参数
- 配置文件查找方式（后面的可以覆盖前面的同名配置项）
	- classpath根路径
	- classpath根路径下的config目录
	- jar包当前目录
	- jar包当前目录的config目录
	- jar包config子目录的直接子目录（Linux系统）

