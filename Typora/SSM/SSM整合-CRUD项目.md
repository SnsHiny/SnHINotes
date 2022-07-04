# EIMS-SSM整合项目

## 文件结构

- java
	- com.SnHI
		- bean
			- Department
			- Employee
			- Msg
		- controller
			- DepartmentController
			- EmployeeController
		- dao
			- DepartmentMapper
			- EmployeeMapper
		- service
			- DepartmentService
			- EmployeeService
		- test
			- DeptTest
			- EmpTest
			- GeneratorTest
			- MVCTest
		- utils
- resources
	- com.SnHI.dao
		- DepartmentMapper.xml
		- EmployeeMapper.xml
	- applicationContext.xml
	- generatorConfig.xml
	- JDBCConfig.properties
	- mybatis-config.xml
	- springMVC.xml
- webapp
	- bootstrap
		- css
		- fonts
		- js
	- js
		- jquery-3.4.1.min.js
	- META-INF
	- WEB-INF
		- view
			- Show.jsp
		- web.xml
	- index.jsp
	- Show_Json.jsp

## 配置文件

### pom.xml配置

```xml
<dependencies>
  <!-- Spring提供在基础IoC功能上的扩展服务，此外还提供许多企业级服务的支持，如邮件服务、任务调度、JNDI定位、EJB集成、远程访问、缓存以及各种视图层框架的封装等 -->
  <dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-context</artifactId>
    <version>5.0.2.RELEASE</version>
  </dependency>

  <!-- 为JDBC、Hibernate、JDO、JPA等提供的一致的声明式和编程式事务管理 -->
  <dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-tx</artifactId>
    <version>5.0.2.RELEASE</version>
  </dependency>

  <!-- JDBC支持包，包括数据源设置和JDBC访问支持 -->
  <dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-jdbc</artifactId>
    <version>5.0.2.RELEASE</version>
  </dependency>

  <!-- SpringMVC支持WEB端应用部署架构 -->
  <dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-web</artifactId>
    <version>5.0.2.RELEASE</version>
  </dependency>

  <!-- REST Web服务和Web应用的视图控制器的实现 -->
  <dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-webmvc</artifactId>
    <version>5.0.2.RELEASE</version>
  </dependency>

  <!-- Spring的面向切面编程,提供AOP(面向切面编程)实现 -->
  <dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-aop</artifactId>
    <version>5.0.2.RELEASE</version>
  </dependency>

  <!-- 对于单元测试和集成测试的简单封装 -->
  <dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-test</artifactId>
    <version>5.0.2.RELEASE</version>
  </dependency>

  <!-- MyBatis整合Spring中间jar包 -->
  <dependency>
    <groupId>org.singledog</groupId>
    <artifactId>mybatis-spring</artifactId>
    <version>1.3.3</version>
  </dependency>

  <!-- 日志文件 -->
  <dependency>
    <groupId>log4j</groupId>
    <artifactId>log4j</artifactId>
    <version>1.2.12</version>
  </dependency>

  <!-- c3p0连接池 -->
  <dependency>
    <groupId>c3p0</groupId>
    <artifactId>c3p0</artifactId>
    <version>0.9.1.2</version>
  </dependency>

  <!-- mysql数据库 -->
  <dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <version>8.0.16</version>
  </dependency>

  <!-- mybatis包 -->
  <dependency>
    <groupId>org.mybatis</groupId>
    <artifactId>mybatis</artifactId>
    <version>3.4.5</version>
  </dependency>

  <!-- servlet包 -->
  <dependency>
    <groupId>javax.servlet</groupId>
    <artifactId>javax.servlet-api</artifactId>
    <version>4.0.1</version>
  </dependency>

  <!-- jsp包 -->
  <dependency>
    <groupId>javax.servlet.jsp</groupId>
    <artifactId>jsp-api</artifactId>
    <version>2.1</version>
  </dependency>

  <!-- 用于在Spring中集成AspectJ LTW织入器 -->
  <dependency>
    <groupId>org.aspectj</groupId>
    <artifactId>aspectjweaver</artifactId>
    <version>1.8.2</version>
  </dependency>

  <!-- 单元测试 -->
  <dependency>
    <groupId>junit</groupId>
    <artifactId>junit</artifactId>
    <version>4.13</version>
    <scope>compile</scope>
  </dependency>

  <!-- JSTL标签类 -->
  <dependency>
    <groupId>javax.servlet</groupId>
    <artifactId>jstl</artifactId>
    <version>1.2</version>
  </dependency>

  <!-- 逆向工程 -->
  <dependency>
    <groupId>org.mybatis.generator</groupId>
    <artifactId>mybatis-generator-core</artifactId>
    <version>1.3.7</version>
  </dependency>

  <!-- 分页插件 -->
  <dependency>
    <groupId>com.github.pagehelper</groupId>
    <artifactId>pagehelper</artifactId>
    <version>5.2.0</version>
  </dependency>

  <!-- 返回json字符串的支持 -->
  <dependency>
    <groupId>com.fasterxml.jackson.core</groupId>
    <artifactId>jackson-databind</artifactId>
    <version>2.9.8</version>
  </dependency>

  <!-- JSR303数据校验 -->
  <dependency>
    <groupId>org.hibernate</groupId>
    <artifactId>hibernate-validator</artifactId>
    <version>5.4.1.Final</version>
  </dependency>
</dependencies>
```

### web.xml配置

```xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app id="WebApp_9" version="3.0" xmlns="http://java.sun.com/xml/ns/javaee"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://java.sun.com/xml/ns/javaee
  http://java.sun.com/xml/ns/javaee/web-app_3_0.xsd">
  <display-name>Archetype Created Web Application</display-name>

  <!-- 配置SpringMVC前端控制器 -->
  <servlet>
    <servlet-name>dispatcherServlet</servlet-name>
    <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
    <init-param>
      <param-name>contextConfigLocation</param-name>
      <param-value>classpath:springMVC.xml</param-value>
    </init-param>
    <load-on-startup>1</load-on-startup>
  </servlet>
  <servlet-mapping>
    <servlet-name>dispatcherServlet</servlet-name>
    <url-pattern>/</url-pattern>
  </servlet-mapping>

  <!-- 配置Spring监听器，启动Spring容器 -->
  <listener>
    <listener-class>org.springframework.web.context.ContextLoaderListener</listener-class>
  </listener>
  <context-param>
    <param-name>contextConfigLocation</param-name>
    <param-value>classpath:applicationContext.xml</param-value>
  </context-param>

  <!-- 配置字符编码过滤器，有多个过滤器时字符编码的过滤器要放在最前面 -->
  <filter>
    <filter-name>characterEncodingFilter</filter-name>
    <filter-class>org.springframework.web.filter.CharacterEncodingFilter</filter-class>
    <init-param>
      <param-name>encoding</param-name>
      <param-value>UTF-8</param-value>
    </init-param>
    <init-param>
      <param-name>forceRequestEncoding</param-name>
      <param-value>true</param-value>
    </init-param>
    <init-param>
      <param-name>forceResponseEncoding</param-name>
      <param-value>true</param-value>
    </init-param>
  </filter>
  <filter-mapping>
    <filter-name>characterEncodingFilter</filter-name>
    <url-pattern>/*</url-pattern>
  </filter-mapping>

  <!-- 使用Rest风格的URI，将页面普通的post请求转为指定的put请求或者delete请求 -->
  <filter>
    <filter-name>hiddenHttpMethodFilter</filter-name>
    <filter-class>org.springframework.web.filter.HiddenHttpMethodFilter</filter-class>
  </filter>
  <filter-mapping>
    <filter-name>hiddenHttpMethodFilter</filter-name>
    <url-pattern>/*</url-pattern>
  </filter-mapping>

  <!-- 将PUT等请求体中的数据解析包装成一个map，使PUT请求在tomcat中可用 -->
  <filter>
    <filter-name>httpPutFormContentFilter</filter-name>
    <filter-class>org.springframework.web.filter.HttpPutFormContentFilter</filter-class>
  </filter>
  <filter-mapping>
    <filter-name>httpPutFormContentFilter</filter-name>
    <url-pattern>/*</url-pattern>
  </filter-mapping>
</web-app>
```

### Spring配置文件-applicationContext.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:aop="http://www.springframework.org/schema/aop"
       xmlns:tx="http://www.springframework.org/schema/tx"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
        http://www.springframework.org/schema/beans/spring-beans.xsd
        http://www.springframework.org/schema/context
        http://www.springframework.org/schema/context/spring-context.xsd
        http://www.springframework.org/schema/tx
        http://www.springframework.org/schema/tx/spring-tx.xsd
        http://www.springframework.org/schema/aop
        http://www.springframework.org/schema/aop/spring-aop.xsd">

    <context:component-scan base-package="com.SnHI">
        <context:exclude-filter type="annotation" expression="org.springframework.stereotype.Controller"/>
    </context:component-scan>

    <!-- 配置数据源 -->
    <!-- 读取配置文件 -->
    <context:property-placeholder location="classpath:JDBCConfig.properties"></context:property-placeholder>
    <bean id="dataSource" class="com.mchange.v2.c3p0.ComboPooledDataSource">
        <property name="driverClass" value="${jdbc.Driver}"></property>
        <property name="jdbcUrl" value="${jdbc.url}"></property>
        <property name="user" value="${jdbc.username}"></property>
        <property name="password" value="${jdbc.password}"></property>
    </bean>

    <!-- 整合mybatis -->
    <!-- 配置SqlSessionFactory工厂 -->
    <bean id="sqlSessionFactory" class="org.mybatis.spring.SqlSessionFactoryBean">
        <!-- 指定mybatis全局配置文件的位置 -->
        <property name="configLocation" value="classpath:mybatis-config.xml"></property>
        <property name="dataSource" ref="dataSource"></property>
    </bean>
    <!-- 配置扫描器，将mybatis接口的实现加入到ioc容器中 -->
    <bean id="mapperScanner" class="org.mybatis.spring.mapper.MapperScannerConfigurer">
        <property name="basePackage" value="com.SnHI.dao"></property>
    </bean>

    <!-- 配置声明式事务 -->
    <!-- 配置事务管理器 -->
    <bean id="transactionManager" class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
        <!-- 控制住数据源 -->
        <property name="dataSource" ref="dataSource"></property>
    </bean>
    <aop:config>
        <aop:pointcut id="pt" expression="execution(* com.SnHI.service.*.*(..))"/>
        <!-- 建立事务通知和切入点表达式的对应关系 -->
        <aop:advisor advice-ref="txAdvice" pointcut-ref="pt"></aop:advisor>
    </aop:config>
    <!-- 配置事务通知 -->
    <tx:advice id="txAdvice" transaction-manager="transactionManager">
        <tx:attributes>
            <tx:method name="*" propagation="REQUIRED" read-only="false"/>
            <tx:method name="select*" propagation="SUPPORTS" read-only="true"></tx:method>
        </tx:attributes>
    </tx:advice>

    <!-- 配置一个可以批量执行的SqlSession -->
    <bean id="sqlSession" class="org.mybatis.spring.SqlSessionTemplate">
        <constructor-arg name="sqlSessionFactory" ref="sqlSessionFactory"></constructor-arg>
        <!-- 执行器类型设置为批量执行 -->
        <constructor-arg name="executorType" value="BATCH"></constructor-arg>
    </bean>
</beans>
```

### JDBC数据源配置文件-JDBCConfig.xml

```properties
jdbc.Driver=com.mysql.cj.jdbc.Driver
jdbc.url=jdbc:mysql://localhost:3306/ssm_eims?serverTimezone=UTC
jdbc.username=root
jdbc.password=13456191231sh
```

### Mybatis配置文件-mybatis-config.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE configuration
        PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-config.dtd">

<configuration>
    <settings>
        <!-- 开启驼峰命名规则 -->
        <setting name="mapUnderscoreToCamelCase" value="true"/>
    </settings>
    <!-- 给指定包下所有类起别名 -->
    <typeAliases>
        <package name="com.SnHI.bean"/>
    </typeAliases>
    <!-- 配置分页查询 -->
    <plugins>
        <plugin interceptor="com.github.pagehelper.PageInterceptor">
            <!-- 配置分页合理化，页数小于1时查询第一页，页数大于最高页码时查询最后一页 -->
            <property name="reasonable" value="true"/>
        </plugin>
    </plugins>
</configuration>
```

### SpringMVC配置文件-springMVC.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:mvc="http://www.springframework.org/schema/mvc"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="
        http://www.springframework.org/schema/beans
        http://www.springframework.org/schema/beans/spring-beans.xsd
        http://www.springframework.org/schema/mvc
        http://www.springframework.org/schema/mvc/spring-mvc.xsd
        http://www.springframework.org/schema/context
        http://www.springframework.org/schema/context/spring-context.xsd">
    
    <context:component-scan base-package="com.SnHI">
        <!-- 只扫描Controller注解 -->
        <context:include-filter type="annotation" expression="org.springframework.stereotype.Controller"/>
    </context:component-scan>
	<!-- 配置视图解析器 -->
    <bean id="internalResourceViewResolver" class="org.springframework.web.servlet.view.InternalResourceViewResolver">
        <property name="prefix" value="/WEB-INF/view/"></property>
        <property name="suffix" value=".jsp"></property>
    </bean>
	<!-- 让Spring不处理静态资源 -->
    <mvc:default-servlet-handler></mvc:default-servlet-handler>
    <!-- 开启SpringMVC框架注解的支持 -->
    <mvc:annotation-driven></mvc:annotation-driven>
</beans>
```

### 逆向工程配置文件-generatorConfig.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE generatorConfiguration
        PUBLIC "-//mybatis.org//DTD MyBatis Generator Configuration 1.0//EN"
        "http://mybatis.org/dtd/mybatis-generator-config_1_0.dtd">
<generatorConfiguration>
    <!--加载数据库连接资源文件-->
    <properties resource="JDBCConfig.properties"></properties>
    <context id="testTables" targetRuntime="MyBatis3">
        <!--是否去除自动生成的注释 true是；false 否-->
        <commentGenerator>
            <property name="suppressAllComments" value="true"/>
        </commentGenerator>

        <!--配置数据库连接-->
        <jdbcConnection driverClass="${jdbc.Driver}" connectionURL="${jdbc.url}" userId="${jdbc.username}" password="${jdbc.password}"></jdbcConnection>
        <!-- 默认false，把JDBC DECIMAL 和 NUMERIC 类型解析为 Integer，为 true时把JDBC DECIMAL和NUMERIC类型解析为java.math.BigDecimal -->
        <javaTypeResolver>
            <property name="forceBigDecimals" value="false"/>
        </javaTypeResolver>

        <!--生成javaBean的位置-->
        <javaModelGenerator targetPackage="com.SnHI.bean" targetProject="./src/main/java">
            <!--enableSubPackages,是否让schema作为包的后缀-->
            <property name="enableSubPackages" value="false"/>
            <!--从数据库返回的值被清除前后空格-->
            <property name="trimStrings" value="true"/>
        </javaModelGenerator>

        <!--dao映射文件生成的位置-->
        <sqlMapGenerator targetPackage="com.SnHI.dao" targetProject="./src/main/resources">
            <property name="enableSubPackages" value="false"></property>
        </sqlMapGenerator>

        <!--dao接口生成的位置-->
        <javaClientGenerator type="XMLMAPPER" targetPackage="com.SnHI.dao" targetProject="./src/main/java">
            <property name="enableSubPackages" value="false"/>
        </javaClientGenerator>

        <!--指定数据库表的生成策略，要和数据库中进行对应，否则将会出错-->
        <table tableName="emp"  domainObjectName="Employee"
               enableCountByExample="false" enableUpdateByExample="false"
               enableDeleteByExample="false" enableSelectByExample="false"
               selectByExampleQueryId="false"></table>
        <table tableName="dept"  domainObjectName="Department"
               enableCountByExample="false" enableUpdateByExample="false"
               enableDeleteByExample="false" enableSelectByExample="false"
               selectByExampleQueryId="false"></table>
    </context>
</generatorConfiguration>
```

## 技术点

### jsp引入jar包-bootstrap/Jquery插件

```jsp
<!-- 引入Jquery -->
<script type="text/javascript" src="js/jquery-3.4.1.min.js"></script>
<!-- 引入bootstrap -->
<script src="bootstrap/js/bootstrap.min.js"></script>
<link rel="stylesheet" href="bootstrap/css/bootstrap.min.css">
```

### 后台校验-hibernate-validator插件

- pom.xml

	```xml
	<!-- JSR303数据校验 -->
	<dependency>
	  <groupId>org.hibernate</groupId>
	  <artifactId>hibernate-validator</artifactId>
	  <version>5.4.1.Final</version>
	</dependency>
	```

- Employee.java

	```java
	private Integer eid;
	//@Pattern：自定义校验规则
	@Pattern(regexp = "(^[a-zA-Z0-9_-]{6,16}$)|(^[\\u2E80-\\u9FFF]{2,5})", message = "用户名可以是2-5位的中文或6-16位的英文数字")
	private String ename;
	private String sex;
	@Pattern(regexp = "^([a-zA-Z0-9_\\.-]+)@([\\da-z\\.-]+)\\.([a-z\\.]{2,6})$", message = "邮箱格式不正确")
	private String email;
	private Integer deptId;
	private Department department;
	```

- EmployeeController.java

	```java
	/**
	 * 插入员工数据并进行后台校验
	 * @param employee
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/saveEmpInfo", method = RequestMethod.POST)
	//@Valid：代表封装数据以后要进行数据校验；BindingResult：校验结果
	public Msg saveEmpInfo(@Valid Employee employee, BindingResult result) {
	    Map<String, Object> errorMap = new HashMap<>();
	    if (result.hasErrors()) {
	        //result.getFieldErrors()：获取所有错误
	        List<FieldError> fieldErrors = result.getFieldErrors();
	        for (FieldError fieldError: fieldErrors) {
	            //fieldError.getField()：获取错误字段名；fieldError.getDefaultMessage()：获取错误信息
	            errorMap.put(fieldError.getField(), fieldError.getDefaultMessage());
	        }
	        return Msg.failure().add("errorFields", errorMap);
	    } else {
	        employeeService.saveEmpInfo(employee);
	        return Msg.success();
	    }
	}
	```

### 分页查询-PageHelper分页插件

- pom.xml

	```xml
	<!-- 分页插件 -->
	<dependency>
	  <groupId>com.github.pagehelper</groupId>
	  <artifactId>pagehelper</artifactId>
	  <version>5.2.0</version>
	</dependency>
	```

- EmployeeController.java

	```java
		/**
	     * 查询员工数据（分页查询）
	     */
	    @RequestMapping("/selectAllEmp")
	    public String selectAllEmp(@RequestParam(value = "pn", defaultValue = "1") Integer pn, Model model) {
	        //引入PageHelper分页插件
	        //在查询之前调用下面的方法即可，参数：从第pn页开始查询，每页显示5行数据
	        PageHelper.startPage(pn, 5);
	        //startPage后面紧跟的查询就是一个分页查询
	        List<Employee> employees = employeeService.selectAllEmp();
	        //用PageInfo对查询结果进行包装，封装了详细的分页信息，第二个参数：连续显示的页数
	        PageInfo pageInfo = new PageInfo(employees, 5);
	        model.addAttribute("pageLists", pageInfo);
	        return "Show";
	    }
	```

- mybatis-config.xml

	```xml
	<!-- 配置分页查询 -->
	<plugins>
	    <plugin interceptor="com.github.pagehelper.PageInterceptor">
	        <!-- 配置分页合理化，页数小于1时查询第一页，页数大于最高页码时查询最后一页 -->
	        <property name="reasonable" value="true"/>
	    </plugin>
	</plugins>
	```

### Json数据传输-jackson-databind插件

- pom.xml

	```xml
	<!-- 返回json字符串的支持 -->
	<dependency>
	  <groupId>com.fasterxml.jackson.core</groupId>
	  <artifactId>jackson-databind</artifactId>
	  <version>2.9.8</version>
	</dependency>
	```

- EmployeeController.java

	```java
	/**
	 * 查询员工数据（分页查询），返回json数据
	 */
	//为了让不同的操作系统可以方便解析数据，将java对象转成json格式的数据
	@ResponseBody
	@RequestMapping("/selectAllEmpWithJson")
	public Msg selectAllEmpWithJson(@RequestParam(value = "pn", defaultValue = "1") Integer pn) {
	    //引入PageHelper分页插件
	    //在查询之前调用下面的方法即可，参数：从第pn页开始查询，每页显示5行数据
	    PageHelper.startPage(pn, 5);
	    //startPage后面紧跟的查询就是一个分页查询
	    List<Employee> employees = employeeService.selectAllEmp();
	    //用PageInfo对查询结果进行包装，封装了详细的分页信息，第二个参数：连续显示的页数
	    PageInfo pageInfo = new PageInfo(employees, 5);
	    //返回带有状态码和状态信息的json数据
	    return Msg.success().add("pageLists", pageInfo);
	}
	```

### 批量插入数据-SqlSessionTemplate

- applicationContext.xml

	```xml
	<!-- 配置一个可以批量执行的SqlSession -->
	<bean id="sqlSession" class="org.mybatis.spring.SqlSessionTemplate">
	    <constructor-arg name="sqlSessionFactory" ref="sqlSessionFactory"></constructor-arg>
	    <!-- 执行器类型设置为批量执行 -->
	    <constructor-arg name="executorType" value="BATCH"></constructor-arg>
	</bean>
	```

- EmpTest.java

	```java
	/**
	 * 执行批量插入
	 */
	@Test
	public void Test03_batchInsert() {
	    EmployeeMapper employeeMapper = sqlSession.getMapper(EmployeeMapper.class);
	    for (int i = 0;i < 1000;i++) {
	        String uuid = UUID.randomUUID().toString().substring(0, 5) + i;
	        Employee emp = new Employee(null, uuid, "男", uuid + "@qq.com", 1);
	        employeeMapper.insert(emp);
	    }
	}
	```

### 逆向工程-mybatis-generator-core插件

- pom.xml

	```xml
	<!-- 逆向工程 -->
	<dependency>
	  <groupId>org.mybatis.generator</groupId>
	  <artifactId>mybatis-generator-core</artifactId>
	  <version>1.3.7</version>
	</dependency>
	```

- GeneratorTest.java

	```java
	/**
	 * 通过逆向工程生成javabean、dao、dao配置文件
	 */
	public class GeneratorTest {
	
	    public static void generatorTest() throws IOException, XMLParserException, InvalidConfigurationException, SQLException, InterruptedException {
	        List<String> warnings = new ArrayList<String>();
	        boolean overwrite = true;
	        File configFile = new File("C:\\Users\\67090\\IdeaProjects\\SnHI_SSM_CRUD\\src\\main\\resources\\generatorConfig.xml");
	        ConfigurationParser cp = new ConfigurationParser(warnings);
	        Configuration config = cp.parseConfiguration(configFile);
	        DefaultShellCallback callback = new DefaultShellCallback(overwrite);
	        MyBatisGenerator myBatisGenerator = new MyBatisGenerator(config, callback, warnings);
	        myBatisGenerator.generate(null);
	    }
	
	    public static void main(String[] args) throws InterruptedException, SQLException, InvalidConfigurationException, XMLParserException, IOException {
	        GeneratorTest.generatorTest();
	    }
	}
	```

### Spring测试模块-MockMVC

- MVCTest.java

	```java
	/**
	 * 使用Spring测试模块提供的测试请求功能，测试CRUD是否正确
	 */
	@RunWith(SpringJUnit4ClassRunner.class)
	@ContextConfiguration(locations = {"classpath:applicationContext.xml", "classpath:springMVC.xml"})
	@WebAppConfiguration
	public class MVCTest {
	
	    //虚拟MVC请求，获取到处理结果
	    MockMvc mockMvc;
	    //传入SpringMVC的ioc
	    @Autowired
	    WebApplicationContext context;
	
	    @Before
	    //初始化方法
	    public void initMockMVC() {
	        //初始化MockMVC
	        mockMvc = MockMvcBuilders.webAppContextSetup(context).build();
	    }
	
	    @Test
	    public void testPage() throws Exception {
	        //perform方法：模拟发出请求；get方法：发出get请求；param方法：传入参数；andReturn方法：拿到返回值
	        MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders.get("/employee/selectAllEmp").param("pn", "1")).andReturn();
	        //请求成功后，请求域中会有pageInfo，可以取出pageInfo进行验证
	        MockHttpServletRequest request = mvcResult.getRequest();
	        PageInfo pageInfo = (PageInfo) request.getAttribute("pageLists");
	        System.out.println("当前页码：" + pageInfo.getPageNum());
	        System.out.println("总页码：" + pageInfo.getPages());
	        System.out.println("总记录数：" +pageInfo.getTotal());
	        System.out.println("在页面需要连续显示的页码");
	        int[] nums = pageInfo.getNavigatepageNums();
	        for (int i: nums) {
	            System.out.print(i + " ");
	        }
	        System.out.println();
	        //获取员工数据
	        List<Employee> list = pageInfo.getList();
	        for (Employee employee: list) {
	            System.out.println("ID:" + employee.getEid() + " NAME:" + employee.getEname());
	        }
	    }
	}
	```

### 批量删除-集合条件

- EmployeeMapper.xml

	``` xml
	<delete id="deleteBatch" parameterType="java.util.ArrayList">
	  delete from emp
	  <where>
	    emp.eid in (<foreach collection="list" index="index" item="eid" separator=",">
	    #{eid}
	  </foreach>)
	  </where>
	</delete>
	```