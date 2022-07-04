

 ![](C:\Users\67090\Desktop\Typora\SSM\三层架构.png)

# Mybatis

## 入门案例

### 步骤

- 创建maven工程并导入坐标

	```xml
	<dependency>
	  <groupId>junit</groupId>
	  <artifactId>junit</artifactId>
	  <version>4.11</version>
	  <scope>test</scope>
	</dependency>
	
	<!-- https://mvnrepository.com/artifact/org.mybatis/mybatis -->
	<dependency>
	  <groupId>org.mybatis</groupId>
	  <artifactId>mybatis</artifactId>
	  <version>3.4.5</version>
	</dependency>
	
	<!-- https://mvnrepository.com/artifact/mysql/mysql-connector-java -->
	<dependency>
	  <groupId>mysql</groupId>
	  <artifactId>mysql-connector-java</artifactId>
	  <version>8.0.16</version>
	</dependency>
	
	<dependency>
	  <groupId>log4j</groupId>
	  <artifactId>log4j</artifactId>
	  <version>1.2.12</version>
	</dependency>
	```

- 根据数据库数据表创建实体类和dao接口

- 创建Mybatis的主配置文件SqlMapConfig.xml

	```xml
	<?xml version="1.0" encoding="UTF-8"?>
	<!DOCTYPE configuration
	        PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
	        "http://mybatis.org/dtd/mybatis-3-config.dtd">
	<!-- mybatis的主配置文件 -->
	<configuration>
	    <!-- 配置环境 -->
	    <environments default="mysql">
	        <!-- 配置mysql的环境 -->
	        <environment id="mysql">
	            <!-- 配置事务的类型 -->
	            <transactionManager type="JDBC"></transactionManager>
	            <!-- 配置数据源（连接池） -->
	            <dataSource type="POOLED">
	                <!-- 配置连接数据库的4个基本信息 -->
	                <property name="driver" value="com.mysql.jdbc.Driver"/>
	                <property name="url" value="jdbc:mysql://localhost:3306/tims?serverTimezone=UTC"/>
	                <property name="username" value="root"/>
	                <property name="password" value="13456191231sh"/>
	            </dataSource>
	        </environment>
	    </environments>
	
	    <!-- 指定映射配置文件的位置，映射配置文件指的是每个dao独立的配置文件 -->
	    <mappers>
	        <mapper resource="com/SnHI/dao/UserDAO.xml"/>
	    </mappers>
	</configuration>
	```

- 创建映射配置文件UserDAO.xml

	- select标签中需加一个resultType属性，值为查询结果要封装的实体类目录结构
	
	```xml
	<?xml version="1.0" encoding="UTF-8" ?>
	<!DOCTYPE mapper
	        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
	        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
	<mapper namespace="com.SnHI.dao.UserDAO">
	    <!-- id必须为方法名 -->
	    <!-- resultType为查询结果所要封装的实体类目录结构 -->
	    <select id="selectAll" resultType="com.SnHI.main.User">
	        SELECT * FROM user
	    </select>
	    <!-- 添加用户 -->
	    <!-- parameterType为查询语句中的参数所在的实体类目录结构 -->
	    <insert id="insertUser" parameterType="com.SnHI.main.User">
	        INSERT INTO user VALUES(#{name}, #{password}, #{type})
	    </insert>
	</mapper>
	```

- 在test/java下创建测试代码MybatisTest.java

  ```java
  public class MybatisTest {
  
      private InputStream in;
      private SqlSession session;
      private UserDAO userDAO;
  
      @Before //在测试方法之前执行
      public void init() {
          try {
              //读取配置文件
              in = Resources.getResourceAsStream("SqlMapConfig.xml");
          } catch(IOException e) {
              e.printStackTrace();
          }
          //创建SqlSessionFactory工厂
          SqlSessionFactory factory = new SqlSessionFactoryBuilder().build(in);
          //使用工厂生产SqlSession对象
          session = factory.openSession();
          //session = factory.openSession(true);  将事务手动提交改为自动提交
          //使用SQLSession创建DAO接口的代理对象
          userDAO = session.getMapper(UserDAO.class);
      }
      @After //在测试方法之后执行
      public void destroy() {
          //提交事务
          session.commit();
          try {
              if (session != null) session.close();
              if (in != null) in.close();
          } catch(IOException e) {
              e.printStackTrace();
          }
      }
      /**
       * 测试查询操作
       * @throws IOException
       */
      @Test
      public void Test01_select() {
          List<User> users = userDAO.selectAll();
          for(User user: users) {
              System.out.println(user);
          }
      }
  	/**
       * 测试插入操作
       * @throws IOException
       */
      @Test
      public void Test02_insert() {
          User user = new User();
          user.setName("张程");
          user.setPassword("000000");
          user.setType("教师");
          userDAO.insertUser(user);
      }
  ```

  - 分析
    - 第一步：读取配置文件，两种方法：一是使用类加载器，它只能读取类路径的配置文件；二是使用ServletContext对象的getRealPath()方法
    - 第二步：创建工厂，使用了构建器模式，作用是把对象的创建细节隐藏，使使用者直接调用方法即可拿到对象
    - 第三步：工厂生产对象，使用了工厂模式，作用是解耦，降低类之间的依赖关系
    - 第四步：创建代理对象，使用了代理模式，作用是不修改源码的基础上对已有方法增强


### 注意事项

- 在Mybatis中把持久层的操作接口名称和映射文件也叫作Mapper，所以UserDAO和UserMapper是一样的
- Mybatis的映射配置文件位置必须和dao接口的包结构相同
- 映射配置文件的mapper标签namespace属性的取值必须是dao接口的全限定类名
- 映射配置文件的操作配置，id属性的取值必须是dao接口的方法名
- MySQL8.0以上版本号，需要设置serverTimezone等参数

## 基于注解

### 步骤

- 把UserDAO.xml移除，在dao接口的方法上使用注解，并且指定SQL语句，属性值表达式为：#{实体类属性名}

	```java
	@Select("SELECT * FROM user")
	List<User> selectAll();
	
	@Insert("INSERT INTO user VALUES(#{name}, #{password}, #{type})")
	void insertUser(User user);
	
	@Update("UPDATE user SET name = #{name}, password = #{password}, type = #{type} WHERE name = #{name}")
	void updateUser(User user);
	
	@Delete("DELETE FROM user WHERE name = #{name}")
	void deleteUserByName(String name);
	```

- 在SqlMapConfig.xml中的mapper配置中，使用class属性指定dao接口的全限定类名

	```xml
	<!-- 指定映射配置文件的位置，映射配置文件指的是每个dao独立的配置文件
	         如果是用注解来配置的话，此处应该使用class属性来指定被注解的dao全限定类名-->
	    <mappers>
	<!--        <mapper class="com.SnHI.dao.UserDAO"/>-->
	        <package name="com.SnHI.dao"/>
	    </mappers>
	```

### 常用注解

- @Results/@Result

	```java
	//使用Results和Result注解实现实体类属性和表中属性列的匹配，id为唯一引用
	@Results(id = "UserMap", value={
	        @Result(id = true, property = "name", column = "name"),
	        @Result(property = "password", column = "password"),
	        @Result(property = "type", column = "type"),
	})
	```

- @ResultMap

	```java
	//使用ResultMap注解实现Results配置的引用
	@ResultMap("UserMap")
	@Insert("INSERT INTO user VALUES(#{name}, #{password}, #{type})")
	void insertUser(User user);
	```

- @one：多对一查询

	```java
	/**
	 * 查询所有邮箱及其所属用户
	 * @return
	 */
	@Results(id = "MailUserMap", value = {
	        @Result(property = "user", column = "username", one = @One(select = "com.SnHI.dao.UserDAO.selectUserByName", fetchType = FetchType.EAGER))
	})
	@Select("SELECT * FROM mail")
	List<Mail> selectAllMailAndUser();
	```

- @more：一对多查询

	```java
	/**
	 * 查询所有用户及其邮箱
	 * @return
	 */
	@Results(id = "UserMailMap", value = {
	        @Result(property = "mails", column = "name", many = @Many(select = "com.SnHI.dao.MailDAO.selectMailByName", fetchType = FetchType.LAZY))
	})
	@Select("SELECT * FROM user")
	List<User> selectAllUserAndMail();
	```

## 配置文件

- JDBCConfig.properties

	```properties
	driver=com.mysql.cj.jdbc.Driver
	url=jdbc:mysql://localhost:3306/tims?serverTimezone=UTC
	username=root
	password=13456191231sh
	```

- SqlMapConfig.xml

	- <properties>：指定配置文件的位置

		```xml
		<!-- resource属性用于指定配置文件的位置，按照类路径的写法来写，并且必须存在于类路径下 -->
		<properties resource="JDBCConfig.properties"></properties>
		```

	- <typeAliases>：配置别名

		```xml
		<!-- 使用typeAliases配置别名，只能配置main目录下的类别名 -->
		<typeAliases>
		    <!-- typeAlias用于配置别名，type属性指定实体类全限定类名，alias属性指定别名，指定别名后不再区分大小写 -->
		    <typeAlias type="com.SnHI.main.User" alias="user"></typeAlias>
		    <!-- package用于指定要配置别名的包，该包下的类都会注册别名，且类名就是别名，不再区分大小写 -->
		    <package name="com.SnHI.main"/>
		</typeAliases>
		```

	- <dataSource>：配置数据源

		```xml
		<dataSource type="POOLED">
		    <property name="driver" value="${driver}"/>
		    <property name="url" value="${url}"/>
		    <property name="username" value="${username}"/>
		    <property name="password" value="${password}"/>
		</dataSource>
		```

## 多表查询

### 多对一（一对一）

- 从表实体要包含主表实体的一个引用对象

	```java
	public class Stu_Class implements Serializable {
	    private String sno;
	    private String cno;
	    private float grade;
	    //一对一：从表实体包含一个主表实体的引用对象
	    private Student student;
	}
	```

- xxxDAO.xml

	```xml
	<!-- 定义封装Student和Stu_Class的ResultMap -->
	<resultMap id="GradeStudentMap" type="Stu_Class">
	    <id property="sno" column="stu_no"></id>
	    <result property="cno" column="cno"></result>
	    <result property="grade" column="grade"></result>
	    <!-- 一对一关系映射，配置Stu_Class中Student对象的映射，column：外键，javaType：主表实体的全限定类名 -->
	    <association property="student" column="sno" javaType="Student">
	        <!-- id：主键 -->
	        <id property="sno" column="sno"></id>
	        <result property="sname" column="sname"></result>
	        <result property="age" column="age"></result>
	        <result property="sex" column="sex"></result>
	        <result property="sdept" column="sdept"></result>
	    </association>
	</resultMap>
	
	<!-- 查找成绩在指定分数以上的学生信息 -->
	    <select id="selectStudentByGrade" resultMap="GradeStudentMap" parameterType="float">
	        SELECT * FROM student, stu_class WHERE student.sno = stu_class.sno AND stu_class.grade = #{grade}
	    </select>
	```

### 一对多

- 主表实体要包含从表实体的集合引用

	```java
	public class Student implements Serializable {
	    private String sno;
	    private String sname;
	    private int age;
	    private String sex;
	    private String sdept;
	    //一对多关系映射，主表实体应该包含从表实体的集合引用
	    private List<Stu_Class> stu_classes;
	}
	```

- xxxDAO.xml

	```xml
	<!-- 定义封装Student和Stu_Class的ResultMap -->
	<resultMap id="NameGradeMap" type="Student">
	    <id property="sno" column="sno"></id>
	    <result property="sname" column="sname"></result>
	    <result property="age" column="age"></result>
	    <result property="sex" column="sex"></result>
	    <result property="sdept" column="sdept"></result>
	    <!-- 一对多关系映射，配置Student对象中Stu_Class集合的映射，column：外键，ofType：集合中元素的全限定类名 -->
	    <collection property="stu_classes" ofType="Stu_Class">
	        <id property="sno" column="stu_no"></id>
	        <result property="cno" column="cno"></result>
	        <result property="grade" column="grade"></result>
	    </collection>
	</resultMap>
	
	<select id="selectGradeByName" resultMap="NameGradeMap" parameterType="String">
	        SELECT s.*, sc.sno, sc.cno, sc.grade FROM student AS s, stu_class AS sc WHERE s.sno = sc.sno AND s.sname = #{sname}
	    </select>
	```

### 多对多

- 主表实体要包含从表实体的集合引用

	```java
	public class Course implements Serializable {
	    private String cno;
	    private String cname;
	    private float credit;
	    private String pcno;
	    private String des_cribe;
	    //多对多关系映射
	    private List<Student> students;
	}
	```

- xxxDAO.xml

	```xml
	<!-- 多对多配置映射 -->
	<resultMap id="NameCourseMap" type="Student">
	    <id property="sno" column="sno"></id>
	    <result property="sname" column="sname"></result>
	    <result property="age" column="age"></result>
	    <result property="sex" column="sex"></result>
	    <result property="sdept" column="sdept"></result>
	    <!-- 一对多关系映射，配置Student对象中Course集合的映射，column：外键，ofType：集合中元素的全限定类名 -->
	    <collection property="courses" ofType="Course">
	        <id property="cno" column="cno"></id>
	        <result property="cname" column="cname"></result>
	        <result property="credit" column="credit"></result>
	        <result property="pcno" column="pcno"></result>
	        <result property="des_cribe" column="des_cribe"></result>
	    </collection>
	</resultMap>
	
	<select id="selectCourseByName" resultMap="NameCourseMap" parameterType="String">
	        SELECT * FROM student, course, stu_class WHERE student.sno = stu_class.sno AND stu_class.cno = course.cno AND student.sname = #{sname};
	    </select>
	```

### 条件对象查询

- 将查询条件封装为一个对象

	```java
	public class QueryVo {
	
	    private User user;
	    private List<String> nameList;
	   
	}
	```

- 根据条件对象查询

	```java
	<!-- 根据条件对象查询 -->
	<select id="selectByQueryVo" parameterType="QueryVo" resultType="user">
	    SELECT * FROM user WHERE name LIKE #{user.name}
	</select>
	```

### 条件查询

- 根据条件语句查询

	```xml
	<select id="selectByCondition" parameterType="user" resultType="user">
	    SELECT * FROM user
	    <where>
	        <if test="name != null">
	            AND name = #{name}
	        </if>
	        <if test="type != null">
	            AND type = #{type}
	        </if>
	    </where>
	</select>
	```

- 根据name集合条件对象查询

	```xml
	<!-- 根据name集合条件对象查询 -->
	<select id="selectByNameLists" parameterType="QueryVo" resultType="user">
	    SELECT * FROM user
	    <where>
	        <if test="nameList != null and nameList.size() > 0">
	            <!-- 遍历 -->
	            <!-- collection：要遍历的集合；item：遍历的每个元素；separator：分隔符 -->
	            <foreach collection="nameList" open="AND name in (" close=")" item="names" separator=",">
	                #{names}
	            </foreach>
	        </if>
	    </where>
	</select>
	```

## 连接池

- 配置的位置
	
	- 主配置文件SqlMapConfig.xml中的DataSource标签，type属性表示采用何种连接池方式
	
		```xml
		<!-- 配置数据源（连接池） -->
		<dataSource type="POOLED">
		    <!-- 配置连接数据库的4个基本信息 -->
		    <property name="driver" value="com.mysql.cj.jdbc.Driver"/>
		    <property name="url" value="jdbc:mysql://localhost:3306/tims?serverTimezone=UTC"/>
		    <property name="username" value="root"/>
		    <property name="password" value="13456191231sh"/>
		</dataSource>
		```
- type属性的取值
	- POOLED：采用传统的Javax.sql.DataSource规范中的连接池，mybatis中有针对规范的实现。规范：容器是一个集合对象，该集合必须是线程安全的，不能两个线程拿到同一个连接，该集合还必须实现队列的特性，先进先出
	- UNPOOLED：采用传统的获取连接的方式，虽然也实现Javax.sql.DataSource接口，但是并没有用到池的思想
	- JNDI：采用服务器提供的JNDI技术实现，来获取DataSource对象，不同的服务器所能拿到DataSource是不一样的。如果不是web或者maven的war工程，是不能使用的，使用tomcat服务器采用的是dbcp连接池

## 延迟加载

- 延迟加载：在真正使用数据时才发起查询，不用的时候不查询。按需加载（懒加载）
	- 一对多，多对多，通常使用延迟加载
	- 多对一，一对一，通常使用立即加载
	
- 立即加载：不管用不用，只要一调用，马上发起查询

- 配置

	- ×××DAO.xml配置

	  ```xml
	  <resultMap id="GradeStudentDelayMap" type="Stu_Class">
	          <id property="sno" column="sno"></id>
	          <result property="cno" column="cno"></result>
	          <result property="grade" column="grade"></result>
	          <!-- 延迟加载配置
	               select属性：查询用户的唯一标识
	               column属性：用户根据姓名查询时，所需要的参数值
	           -->
	          <association property="student" column="sno" javaType="Student" select="com.SnHI.dao.StudentDAO.selectStudentBySno"></association>
	      </resultMap>
	  ```

	- SqlMapConfig.xml配置

	  ```xml
	  <!-- 延迟加载配置 -->
	  <settings>
	          <!-- 延迟加载的全局开关。当开启时，所有关联对象都会延迟加载 -->
	          <setting name="lazyLoadingEnabled" value="true"/>
	          <!-- 开启时，任一方法的调用都会加载该对象的所有延迟加载属性。 否则，每个延迟加载属性会按需加载 -->
	          <setting name="aggressiveLazyLoading" value="false"/>
	      </settings>
	  ```

	- 方法注解配置

		- 多对一查询：立即加载

			```java
			/**
			 * 查询所有邮箱及其所属用户
			 * @return
			 */
			//fetchType = FetchType.EAGER：立即加载
			@Results(id = "MailUserMap", value = {
			        @Result(property = "user", column = "username", one = @One(select = "com.SnHI.dao.UserDAO.selectUserByName", fetchType = FetchType.EAGER))
			})
			@Select("SELECT * FROM mail")
			List<Mail> selectAllMailAndUser();
			```

		- 一对多查询：延迟加载

			```java
			/**
			 * 查询所有用户及其邮箱
			 * @return
			 */
			//fetchType = FetchType.LAZY：延迟加载
			@Results(id = "UserMailMap", value = {
			        @Result(property = "mails", column = "name", many = @Many(select = "com.SnHI.dao.MailDAO.selectMailByName", fetchType = FetchType.LAZY))
			})
			@Select("SELECT * FROM user")
			List<User> selectAllUserAndMail();
			```

## 缓存

- 缓存是存在于内存中的数据，可以减少访问数据库的次数，提高执行效率
- 适用于缓存的数据
	- 经常查询并且不经常改变的
	- 数据的正确与否对最终结果影响不大的

### 一级缓存

- 指的是mybatis中SqlSession对象的缓存
- 当我们执行查询之后，查询的结果会同时存入到SqlSession为我们提供的一块区域中，该区域的结构是一个Map。当我们再次查询同样的数据，mybatis会先去SQLSession中查询是否有，有的话直接拿出来使用
- 当SQLSession对象消失时，mybatis的一级缓存也就消失了
- 当调用SqlSession的修改，增加，删除，commit()，clear()，clearCache()等方法时，都会清空一级缓存

### 二级缓存

- 它指的是mybatis中SqlSessionFactory对象的缓存，由同一个SQLSessionFactory对象创建的SqlSession共享其缓存

- 配置

  - SqlMapConfig.xml配置：让Mybatis框架支持二级缓存

  	```xml
  	<!-- 全局性地开启或关闭所有映射器配置文件中已配置的任何缓存。 -->
  	<setting name="cacheEnabled" value="true"/>
  	```

  - ×××DAO.xml配置：让当前的映射文件支持二级缓存

  	```xml
  	<cache/>
  	```

  - 方法标签配置：让当前的操作支持二级缓存

    ```xml
    <select id="selectAll" resultType="user" useCache="true">
        SELECT * FROM user
    </select>
    ```

## JNDI

- JNDI是 Java 命名与目录接口（Java Naming and Directory Interface）
- 没有JNDI的问题
	- 数据库服务器名称MyDBServer 、用户名和口令都可能需要改变，由此引发JDBC URL需要修改
	- 数据库可能改用别的产品，如改用DB2或者Oracle，引发JDBC驱动程序包和类名需要修改
	- 随着实际使用终端的增加，原配置的连接池参数可能需要调整
- 在J2EE容器中配置JNDI参数，定义一个数据源，也就是JDBC引用参数，给这个数据源设置一个名称，然后在程序中，通过数据源名称引用数据源从而访问后台数据库

- 在webapp路径下创建META-INF目录，创建context.xml配置文件，配置数据源

	```xml
	<?xml version="1.0" encoding="UTF-8"?>
	<Context>
	    <!--
	    <Resource
	    name="jdbc/mybats_jndi"                       数据源的名称
	    type="javax.sql.DataSource"                   数据源类型
	    auth="Container"                        数据源提供者
	    maxTotal="20"                          最大活动数
	    maxWaitMillis="10000"                    最大等待时间
	    maxIdle="5"                               最大空闲数
	    username="root"                            数据库用户名
	    password="123456"                       数据库密码
	    driverClassName="com.mysql.jdbc.Driver"          数据库驱动类
	    url="jdbc:mysql://localhost:3306/test?useSSL=true&amp;useUnicode=true&amp;characterEncoding=utf8"  数据库连接url字符串
	    />
	     -->
	    <Resource
	            name="jdbc/SnHI_Mybatis"
	            type="javax.sql.DataSource"
	            auth="Container"
	            maxTotal="20"
	            maxWaitMillis="10000"
	            maxIdle="5"
	            username="root"
	            password="13456191231sh"
	            driverClassName="com.mysql.jdbc.Driver"
	            url="jdbc:mysql://localhost:3306/tims?serverTimezone=UTC"
	    />
	</Context>
	```

- pom.xml导入servlet和jsp依赖

	```xml
	<dependency>
	  <groupId>javax.servlet</groupId>
	  <artifactId>javax.servlet-api</artifactId>
	  <version>4.0.1</version>
	  <scope>provided</scope>
	</dependency>
	
	<dependency>
	  <groupId>javax.servlet.jsp</groupId>
	  <artifactId>jsp-api</artifactId>
	  <version>2.1</version>
	  <scope>provided</scope>
	</dependency>
	```

- SqlMapConfig.xml主配置文件，将dataSource标签中的type属性设置为JNDI

	```xml
	<configuration>
	    <environments default="mysql">
	        <environment id="mysql">
	            <transactionManager type="JDBC"></transactionManager>
	            <dataSource type="JNDI">
	                <!-- value属性值为context.xml中Resource标签下的name属性值 -->
	                <property name="data_source" value="java:comp/env/jdbc/SnHI_Mybatis"></property>
	            </dataSource>
	        </environment>
	    </environments>
	```

- index.jsp

	```jsp
	<%@ page contentType="text/html;charset=UTF-8" language="java" %>
	
	<%@ page import="java.io.InputStream" %>
	<%@ page import="org.apache.ibatis.io.Resources" %>
	<%@ page import="org.apache.ibatis.session.SqlSessionFactoryBuilder" %>
	<%@ page import="org.apache.ibatis.session.SqlSessionFactory" %>
	<%@ page import="org.apache.ibatis.session.SqlSession" %>
	<%@ page import="com.SnHI.dao.UserDAO" %>
	<%@ page import="java.util.List" %>
	<%@ page import="com.SnHI.domain.User" %>
	<html>
	<body>
	<%
	    //读取配置文件
	    InputStream in = Resources.getResourceAsStream("SqlMapConfig.xml");
	    //创建SqlSessionFactory工厂
	    SqlSessionFactoryBuilder builder = new SqlSessionFactoryBuilder();
	    SqlSessionFactory factory = builder.build(in);
	    //使用工厂生产SqlSession对象
	    SqlSession sqlSession = factory.openSession();
	    //使用SQLSession创建DAO接口的代理对象
	    UserDAO userDAO = sqlSession.getMapper(UserDAO.class);
	    //使用代理对象执行方法
	    List<User> users = userDAO.selectAll();
	    for(User user : users) {
	        System.out.println(user);
	    }
	    //关闭资源
	    sqlSession.close();
	    in.close();
	%>
	</body>
	</html>
	```

# Spring

- Spring是分层的Java SE/EE应用full-stack轻量级开源框架，以IOC（Inverse Of Control：反转控制）和AOP（Aspect Oriented Programming：面向切面编程）为内核，提供了展现层Spring MVC和持久层Spring JDBC以及业务层事务管理等众多的企业级应用架构，还能成和开源世界众多著名的第三方框架和类库，逐渐成为使用最多的Java EE 企业应用开源项目。

## 优势

- 方便解耦，简化开发
	- 通过Spring提供的IOC容器，可以将对象间的依赖关系交由Spring进行控制，避免硬编码所造成的过度程序耦合。用户也不必再为单例模式类、属性文件解析等这些很底层的需求编写代码，可以更专注于上层的应用
- AOP编程的支持
	- 通过Spring的AOP功能，方便进行面向切面的编程，许多不容易用传统OOP实现的功能可以通过AOP轻松应付
- 声明式事务的支持
	- 可以将我们从单调烦闷的事务管理代码中解脱出来，通过声明式方式灵活的进行事务的管理，提高开发效率和质量
- 方便程序的测试
	- 可以用非容器依赖的编程方式进行几乎所有的测试工作，测试不再是昂贵的操作，而是随手可做的事情
- 方便集成各种优秀框架
	- Spring可以降低各种框架的使用难度，提供了对各种优秀框架（Struts、Hibernate、Hessian、Quartz等等）的直接支持
- 降低Java EE API的使用难度
	- Spring对JavaEE API（如JDBC、JavaMail、远程调用等）进行了薄薄的封装层，使这些API的使用难度大为降低
- Java源码是经典学习范例
	- Spring的源代码设计精妙、结构清晰、匠心独用，处处体现着大师对Java设计模式灵活运用以及对Java技术的高深造诣，它的源代码无疑是JAva技术的最佳实践的范例

## 体系结构

![](C:\Users\67090\Desktop\Typora\SSM\Spring FrameWork Runtime.png)

## 程序的耦合

- 耦合：程序间的依赖关系，包括类之间的耦合和方法间的耦合
- 解耦：降低程序间的依赖关系
- 实际开发中应该做到编译器不依赖，运行时才依赖
- 解耦的思路
	- 第一步，使用反射来创建对象，避免使用new关键字
	- 第二步，通过读取配置文件来获取要创建的对象全限定类名

## IOC

![](C:\Users\67090\Desktop\Typora\SSM\IOC.png)

- 控制反转，把创建对象的权利交给框架，利用工厂被动接受资源
- 作用：削减计算机程序的耦合，解除代码中的依赖关系

### 用Spring实现IOC

- maven加载Spring依赖

	```xml
	<dependencies>
	  <!-- https://mvnrepository.com/artifact/org.springframework/spring-context -->
	  <dependency>
	    <groupId>org.springframework</groupId>
	    <artifactId>spring-context</artifactId>
	    <version>5.0.2.RELEASE</version>
	  </dependency>
	```

- java/resources下创建bean.xml

	```xml
	<?xml version="1.0" encoding="UTF-8"?>
	<beans xmlns="http://www.springframework.org/schema/beans"
	       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	       xsi:schemaLocation="http://www.springframework.org/schema/beans
	        http://www.springframework.org/schema/beans/spring-beans.xsd">
	    <!-- 把对象交给Spring来管理 -->
	    <bean id="accountService" class="com.SnHI.service.impl.AccountServiceImpl"></bean>
	    <bean id="accountDAO" class="com.SnHI.dao.impl.AccountDAOImpl"></bean>
	</beans>
	```

- 测试方法实现功能

	```java
	//获取核心容器对象
	ApplicationContext ac = new ClassPathXmlApplicationContext("bean.xml");
	//根据id获取bean对象方法一
	AccountService accountService = (AccountService) ac.getBean("accountService");
	//根据id获取bean对象方法二
	AccountDAO accountDAO = ac.getBean("accountDAO", AccountDAO.class);
	```

	- ApplicationContext的三个常用实现类
		- ClassPathXmlApplicationContext：它可以加载类路径下的配置文件，要求配置文件必须在类路径下
		- FileSystemXMLApplicationContext：它可以加载磁盘任意路径下的配置文件（必须有访问权限）
		- AnnotationConfigApplicationContext：它是用于读取注解创建容器的
	- 核心容器的两个接口
		- ApplicationContext：它在构建核心容器时，创建对象采取的策略是采用立即加载的方式，也就是说，只要一读取完配置文件马上就创建配置文件中配置的对象，单例对象适用
		- BeanFactory：它在构建核心容器时，创建对象采取的策略是采用延迟加载的方式，也就是说，什么时候根据id获取对象什么时候才真正的创建对象，多例对象适用

### Spring对bean的管理细节

#### 创建bean的三种方式

- 使用默认构造函数创建：在Spring的配置文件中使用bean标签，配置id和class属性后，且没有其他的属性和标签时，采用的是默认构造函数创建bean对象，此时如果类中没有默认构造函数，则对象无法创建

	```xml
	<bean id="accountService" class="com.SnHI.service.impl.AccountServiceImpl"></bean>
	```

- 使用普通工厂中的方法创建对象（使用某个类中的方法创建对象，并存入Spring容器中）

	```xml
	<bean id="instanceFactory" class="com.SnHI.factory.InstanceFactory"></bean>
	<bean id="accountService" factory-bean="instanceFactory" factory-method="getAccountService"></bean>
	```

- 使用工厂中的静态方法创建对象（使用某个类中的静态方法创建对象，并存入Spring容器中）

	```xml
	<bean id="accountService" class="com.SnHI.factory.StaticInstanceFactory" factory-method="getAccountService"></bean>
	```

#### bean的作用范围调整

- bean的标签的scope属性，用于指定bean的作用范围
- 取值
	- singleton：单例的
	- prototype：多例的
	- request：作用于web应用的请求范围
	- session：作用于web应用的会话范围
	- global-session：作用于集群环境的会话范围（全局会话范围），但不是集群环境时，它就是session

#### bean对象的生命周期

- 单例对象
	- 当容器创建时对象产生
	- 只要容器还在，对象就一直存活
	- 容器销毁，对象消亡
- 多例对象
	- 当使用对象时Spring框架为我们创建
	- 对象只要是在使用过程中就一直存活
	- 当对象长时间不用，且没有别的对象引用时，由Java的垃圾回收器回收

### Spring中的依赖注入

- 依赖注入（Dependence Injection）：在当前类需要用到其他类的对象，类之间或方法之间依赖关系的管理由Spring为我们维护，我们只需要在配置文件中说明依赖关系的维护就称之为依赖注入

#### 能注入的数据

- 基本类型和String

	```xml
	<bean id="accountService4" class="com.SnHI.service.impl.AccountServiceImpl1" scope="singleton">
	    <constructor-arg name="name" value="张三"></constructor-arg>
	    <constructor-arg name="age" value="18"></constructor-arg>
	</bean>
	```

- 其他bean类型（在配置文件中或者注解配置过的bean）

	```xml
	<bean id="accountService4" class="com.SnHI.service.impl.AccountServiceImpl1" scope="singleton">
	    <constructor-arg name="birthday" ref="now"></constructor-arg>
	</bean>
	<!-- 配置一个日期对象 -->
	<bean id="now" class="java.util.Date"></bean>
	```

- 复杂类型/集合类型

	- 用于给List结构集合注入的标签：list、array、set
	- 用于给Map结构集合注入的标签：map、props
	- 结构相同标签可以互换

	```xml
	<bean id="accountService6" class="com.SnHI.service.impl.AccountServiceImpl3" scope="singleton">
	    <property name="myStr">
	        <array>
	            <value>aaa</value>
	            <value>bbb</value>
	            <value>ccc</value>
	        </array>
	    </property>
	    <property name="myList">
	        <list>
	            <value>aaa</value>
	            <value>bbb</value>
	            <value>ccc</value>
	        </list>
	    </property>
	    <property name="mySet">
	        <set>
	            <value>aaa</value>
	            <value>bbb</value>
	            <value>ccc</value>
	        </set>
	    </property>
	    <property name="myMap">
	        <map>
	            <entry key="t1" value="test1"></entry>
	            <entry key="t2" value="test2"></entry>
	            <entry key="t3" value="test3"></entry>
	        </map>
	    </property>
	    <property name="myProps">
	        <props>
	            <prop key="t4">test4</prop>
	            <prop key="t5">test5</prop>
	        </props>
	    </property>
	</bean>
	```

#### 注入的方式

- 使用构造函数提供

	- 使用的标签：constructor-arg
	- 标签出现的位置：bean标签的内部
	- 标签中的属性
		- type：用于指定要注入的数据的数据类型，该数据类型也是构造函数中某个或某些参数的类型
		- index：用于指定要注入的数据给构造函数中指定索引位置的参数赋值，索引下标从0开始
		- name：用于指定给构造函数中指定名称的参数赋值（最常用）
		- value：用于提供基本类型和String类型的数据
		- ref：用于指定其他的bean类型数据，它指的是Spring的IOC核心容器中出现过的bean对象
	- 优势：在获取bean对象时，注入数据是必须的操作，否则对象无法创建成功
	- 弊端：改变了bean对象的实例化方法，使我们在创建对象时，如果用不到这些数据，也必须提供

- 使用set方法提供（更常用）

	- 使用的标签：property
	- 出现的位置：bean标签的内部
	- 标签的属性
		- name：用于指定注入时所调用的set方法名称
		- value：用于提供基本类型和String类型的数据
		- ref：用于指定其他的bean类型数据，它指的是Spring的IOC核心容器中出现过的bean对象
	- 优势：创建对象时没有明确的限制，可以直接使用默认构造函数
	- 弊端：如果有某个成员必须有值，则获取对象是有可能set方法没有执行

- 使用注解提供（set方法不再必须）

  - 配置bean.xml

  ```xml
  <?xml version="1.0" encoding="UTF-8"?>
  <beans xmlns="http://www.springframework.org/schema/beans"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xmlns:context="http://www.springframework.org/schema/context"
         xsi:schemaLocation="http://www.springframework.org/schema/beans
          http://www.springframework.org/schema/beans/spring-beans.xsd
          http://www.springframework.org/schema/context
          http://www.springframework.org/schema/context/spring-context.xsd">
  
      <!-- 告知Spring在创建容器时要扫描的包，配置所需要的标签不是在beans目录中，而是在context名称空间和约束中 -->
      <context:component-scan base-package="com.SnHI"></context:component-scan>
  
  </beans>
  ```

  - @Component
  	- 作用：用于把当前类对象存入Spring容器中，其作用与XML配置文件中编写一个<bean>标签实现的功能一样
  		- value：用于指定bean的id。不写时，它的默认值是当前类名，且首字母改小写

  ------

  - @Controller：一般用于表现层

  - @Service：一般用于业务层
  - @Repository：一般用于持久层

  [^以上三个注解功能与属性和Component相同，是Spring框架为我们提供明确的三层使用的注解，使我们的三层对象更加清晰]: 

  ------

  - @Autowired：自动按照类型注入，只要容器中有唯一的一个bean对象类型和要注入的变量类型匹配，就可以注入成功；当IOC容器中有多个类型匹配时，查找bean的id值与变量名是否一致，一致则可以注入成功；当没有类型匹配时则报错。其作用与XML配置文件中<property>标签实现的功能一样。可以用在变量上也可以用在方法上

  - @Qualifier：在按照类中注入的基础之上再按照名称注入，它在给类成员注入时不能单独使用，要和@Autowired一起使用，但是在给方法参数注入时可以单独使用
  	- value：用于指定注入bean的id
  - @Resource：直接按照bean的id注入，可以单独使用
  	- name：用于指定bean的id

  [^以上三个都只能注入其他bean类型的数据，而基本类型和String类型无法使用上述注解实现，另外，集合类型的注入只能通过XML来实现]: 

  ------

  - @Value：用于注入基本类型和String类型的数据
  	- value：用于指定数据的值，它可以使用Spring的SPEL，${表达式}（Spring的EL表达式）
  - @Scope：用于指定bean的作用范围
  	- value：指定范围的取值，常用取值：singleton、prototype
  - @PostConstruct：用于指定初始化方法
  - @PreDestroy：用于指定销毁方法

  ------

  ```java
  /**
   * dataSource的配置类
   */
  @Configuration
  @ComponentScan("com.SnHI")
  @PropertySource("classpath:jdbcConfig.properties")
  public class SpringConfiguration {
  
      @Value("${jdbc_driver}")
      private String driver;
      @Value("${jdbc_url}")
      private String url;
      @Value("${jdbc_userName}")
      private String userName;
      @Value("${jdbc_password}")
      private String password;
  
      @Bean(name="runner")
      @Scope("prototype")
      public QueryRunner createQueryRunner(DataSource datasource) {
          return new QueryRunner(datasource);
      }
      
      /**
      	@Bean(name="jdbcTemplate")
      	@Scope("prototype")
      	public JdbcTemplate createJdbcTemplate(DataSource datasource) {
      	    return new JdbcTemplate(datasource);
      	}
      */
  
      @Bean(name="datasource")
      public DataSource createDataSource() {
          try {
              ComboPooledDataSource cd = new ComboPooledDataSource();
              cd.setDriverClass(driver);
              cd.setJdbcUrl(url);
              cd.setUser(userName);
              cd.setPassword(password);
              return cd;
          } catch (Exception e) {
              e.printStackTrace();
          }
          return null;
      }
  ```

  - @Configuration：指定当前类是一个配置类

  - @ComponentScan：用于通过注解指定Spring在创建容器时要扫描的包

  	- value：它和basePackages的作用是一样的，都是用于指定创建容器时要扫描的包，使用此注解等同于在XML中配置了

  		```xml
  		<context:component-scan base-package="com.SnHI"></context:component-scan>
  		```

  - @Bean：用于把当前方法的返回值作为bean对象存入Spring的IOC容器中

  	- name：用于指定bean的id，默认值是当前方法的名称

  	- 当我们使用注解配置方法时，如果方法有参数，Spring框架会去容器中查找有没有可用的bean对象，查找的方式和Autowired注解一样

  - @Import：用于导入其他的配置类

  	- value：用于指定其他配置类的字节码

  	- 当使用Import注解之后，有Import注解的类就是父配置类，而导入的都是自配置类

  - @PropertySource：用于指定properties文件的位置

  	- value：指定文件的名称和路径（classpath：表示类路径下）

## Spring整合Junit

- 导入Spring整合Junit的jar包（坐标）

	```xml
	<dependency>
	  <groupId>org.springframework</groupId>
	  <artifactId>spring-test</artifactId>
	  <version>5.0.2.RELEASE</version>
	  <scope>test</scope>
	</dependency>
	```

- 使用Junit提供的一个注解把原有的main方法替换掉，替换成Spring提供的

	- @RunWith

		```java
		@RunWith(SpringJUnit4ClassRunner.class)
		```

- 告知Spring的运行器，Spring的IOC创建时基于XML的还是基于注解的，并且说明位置

	- @ContextConfiguration

		- locations：指定xml文件的位置，加上classpath关键字表示在类路径下

			```java
			@ContextConfiguration(locations = "classpath:bean1.xml")
			```

		- classes：指定注解类所在的位置

			```java
			@ContextConfiguration(classes = SpringConfiguration.class)
			```

- 使用@Autowired注解自动注入想要的mapper

- 当我们使用Spring 5.x版本时，要求Junit的jar必须是4.12及以上

- Spring-context的版本必须大于等于Spring-test的版本

## AOP

- Aspect Oriented Programming，面向切面编程
- 通过预编译方式和运行期动态代理实现程序功能的统一维护的一种技术。AOP是OOP的延续，是函数式编程的一种衍生范型。利用AOP可以对业务逻辑的各个部分进行隔离，从而使得业务逻辑各部分之间的耦合度降低，提高程序的可重用性。同时提高了开发的效率
- 简单的说它就是把程序中重复的代码抽取出来，在需要执行的时候，使用动态代理的技术在不修改源码的基础上，对我们的已有方法进增强

### 作用及优势

- 作用：在程序运行期间，不修改源码对已有方法进行增强
- 优势
	- 减少重复代码
	- 提高开发效率
	- 维护方便

### 专业术语

- Joinpoint（连接点）：是指那些被拦截到的点，在Spring中，这些点指的是方法，因为Spring只支持方法类型的连接点
- Pointcut（切入点）：是指我们要对哪些Joinpoint进行拦截的定义
- Advice（通知/增强）：所谓通知是指拦截到Joinpoint之后所要做的事情
	- 类型：前置通知、后置通知、异常通知、最终通知、环绕通知
- Introduction（引介）：是一种特殊的通知，在不修改类代码的前提下，Introduction可以在运行期为类动态的添加一些方法或Field
- Target（目标对象）：代理的目标对象，即被代理对象
- Weaving（织入）：是指把增强应用到目标对象来创建新的代理对象的过程，Spring采用动态代理织入，而AspectJ采用编译器织入和类装载期织入
- Proxy（代理）：一个类被AOP织入增强后就产生一个结果代理类
- Aspect（切面）：是切入点和通知（引介）的结合

### 动态代理

- 特点：字节码随用随创建，随用随加载
- 作用：不修改源码的基础上对方法加强
- 分类
	- 基于接口的动态代理
	- 基于子类的动态代理

#### 基于接口的动态代理

- 涉及的类：Proxy

- 提供者：java官方

- 使用Proxy类中的newProxyInstance方法创建代理对象，要求：被代理类最少实现一个接口，没有则不能被代理

- newProxyInstance方法的参数

	- ClassLoader：类加载器，它是用来加载代理对象字节码的，和被代理对象使用相同的类加载器，代理谁就写谁的.getClass().getClassLoader()
	- Class[]：字节码数组，它是用于让代理对象和被代理对象拥有相同的方法，实现同一个接口就可以有相同的方法，代理谁就写谁的.getClass().getInterfaces()
	- InvocationHandler：用于提供增强的代码，它是让我们写如何代理，通常写一个该接口的实现类，一般为匿名内部类。此接口的实现类是谁用谁写

- 匿名内部类访问外部变量时，外部变量要用final修饰

	```java
	final Producer producer = new Producer();
	IProducer proxyProducer = (IProducer) Proxy.newProxyInstance(producer.getClass().getClassLoader(), producer.getClass().getInterfaces(), new InvocationHandler() {
	    /**
	     * invoke方法作用：执行被代理对象的任何接口方法时都会经过该方法
	     * 方法参数的含义
	     * @param proxy    代理对象的引用
	     * @param method    当前执行的方法
	     * @param args    当前执行方法的参数
	     * @return    和被代理对象方法有相同的返回值
	     * @throws Throwable
	     */
	    @Override
	    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
	        //要增强的代码
	        Object returnValue = null;
	        float money = (float) args[0];
	        if("saleProduction".equals(method.getName())) {
	            returnValue = method.invoke(producer, money * 0.8f);
	        }
	        return returnValue;
	    }
	});
	proxyProducer.saleProduction(10000);
	```

#### 基于子类的动态代理

- 导入基于子类动态代理的jar包

	```xml
	<dependency>
	  <groupId>cglib</groupId>
	  <artifactId>cglib</artifactId>
	  <version>2.2.2</version>
	</dependency>
	```

- 涉及的类：Enhancer

- 提供者：第三方cglib库

- 使用Enhancer类中的create方法创建代理对象，要求：被代理类不能是最终类

- create方法的参数

	- Class：字节码，它是用来指定被代理对象的字节码，要想代理谁就写谁的.getClass()
	- Callback：用于提供增强的代码，它是让我们写如何代理，通常写一个该接口的实现类，一般为匿名内部类。此接口的实现类是谁用谁写。我们一般写的都是该接口的子接口实现类：MethodInterceptor（方法拦截）

	```java
	final Producer producer = new Producer();
	Producer cglibProducer = (Producer) Enhancer.create(producer.getClass(), new MethodInterceptor() {
	    /**
	     * 执行被代理对象的任何方法都会经过该方法
	     * @param o    代理对象的引用
	     * @param method    当前执行的方法
	     * @param objects   当前执行方法的参数
	     * @param methodProxy    当前执行方法的代理对象
	     * @return    和被代理对象方法有相同的返回值
	     * @throws Throwable
	     */
	    @Override
	    public Object intercept(Object o, Method method, Object[] objects, MethodProxy methodProxy) throws Throwable {
	        Object returnValue = null;
	        float money = (float) objects[0];
	        if("saleProduction".equals(method.getName())) {
	            returnValue = method.invoke(producer, money * 0.8f);
	        }
	        return returnValue;
	    }
	});
	cglibProducer.saleProduction(10000);
	```

### 配置

- pom.xml配置

	```xml
	<dependency>
	  <groupId>org.aspectj</groupId>
	  <artifactId>aspectjweaver</artifactId>
	  <version>1.8.2</version>
	  <scope>runtime</scope>
	</dependency>
	```

#### 基于XML的AOP配置

- bean.xml配置

	```xml
	<?xml version="1.0" encoding="UTF-8"?>
	<beans xmlns="http://www.springframework.org/schema/beans"
	       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	       xmlns:aop="http://www.springframework.org/schema/aop"
	       xsi:schemaLocation="http://www.springframework.org/schema/beans
	        http://www.springframework.org/schema/beans/spring-beans.xsd
	        http://www.springframework.org/schema/aop
	        http://www.springframework.org/schema/aop/spring-aop.xsd">
	```

- 把通知bean也交给Spring来管理

	```xml
	<bean id="logger" class="com.SnHI.utils.Logger"></bean>
	```

- 使用aop:config标签表明开始AOP的配置

- 使用aop:aspect标签表明配置切面

	- id属性：是给切面提供一个唯一标识
	- ref属性：是指定通知类bean的Id

- 在aop:aspect标签的内部使用对应标签来配置通知的类型

	- aop:before：表示配置前置通知，在切入点方法执行之前执行

		```xml
		<aop:before method="printLog" pointcut="execution(public void com.SnHI.service.Impl.AccountServiceImpl.saveAccount())"></aop:before>
		```

		- method属性：用于指定哪个方法是前置通知

		- pointcut属性：用于指定切入点表达式，该表达式的含义指的是对业务层中哪些方法增强

		- 切入点表达式的写法

			- 关键字：execution（表达式）

			- 表达式：访问修饰符  返回值  包名.包名...类名.方法名(参数列表)

			- 全通配写法：

				```
				* *..*.*(..)
				```

			- 实际开发中切入点表达式的通常写法：切到业务层实现类下的所有方法

				```
				* com.SnHI.service.Impl.*.*(..)
				```

	- aop:after-returning：表示配置后置通知，在切入点方法正常执行后执行

	- aop:after-throwing：表示配置异常通知，在切入点方法产生异常后执行

	- aop:after：表示配置最终通知，无论切入点方法是否正常执行它后会在其后面执行

	- aop:around：表示配置环绕通知

		- 当我们配置环绕通知之后，需要明确调用业务层方法（切入点）

		- Spring框架为我们提供了一个接口：ProceedingJoinPoint，该接口有一个方法proceed()，此方法就相当于明确调用切入点方法。该接口可以作为环绕通知的方法参数，在程序执行时，Spring框架会为我们提供该接口的实现类供我们使用

		- 它是Spring框架为我们提供的一种可以在代码中手动控制增强方法何时执行的方式

		- 要导入的jar包

			```
			com.springsource.org.aspectj.weaver-1.6.8.RELEASE.jar
			```

	- aop:pointcut：配置切入点表达式

		- id属性：用于指定表达式的唯一标识
		- expression属性：用于指定表达式内容
		- 此标签写在aop:aspect标签内部只能当前切面使用，写在aop:aspect标签前面，可以所有切面使用

#### 基于注解的AOP配置

- bean.xml配置

	```xml
	<?xml version="1.0" encoding="UTF-8"?>
	<beans xmlns="http://www.springframework.org/schema/beans"
	       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	       xmlns:context="http://www.springframework.org/schema/context"
	       xmlns:aop="http://www.springframework.org/schema/aop"
	       xsi:schemaLocation="http://www.springframework.org/schema/beans
	        http://www.springframework.org/schema/beans/spring-beans.xsd
	        http://www.springframework.org/schema/context
	        http://www.springframework.org/schema/context/spring-context.xsd
	        http://www.springframework.org/schema/aop
	        http://www.springframework.org/schema/aop/spring-aop.xsd">
	```

- 配置Spring创建容器时要扫描的包

	```xml
	<context:component-scan base-package="com.SnHI"></context:component-scan>
	```

- 配置Spring开启注解AOP的支持

	```xml
	<aop:aspectj-autoproxy></aop:aspectj-autoproxy>
	```

- @Aspect：表示当前类是一个切面类

- @Pointcut：配置切入点表达式

	```java
	@Pointcut("execution(* com.SnHI.service.Impl.*.*(..))")
	private void pt1() {}
	```

- @Before("pt1()")：配置前置通知

- @AfterReturning("pt1()")：配置后置通知

- @AfterThrowing("pt1()")：配置异常通知

- @After("pt1()")：配置最终通知

- @Around("pt1()")：配置环绕通知

	```java
	@Around("pt1()")
	public Object aroundAdvice(ProceedingJoinPoint pjp) {
	    Object resultValue;
	    try {
	        //获取参数
	        Object[] args = pjp.getArgs();
	        //开启事务
	        this.begin();
	        //执行方法
	        resultValue = pjp.proceed(args);
	        //提交事务
	        this.commit();
	        //返回结果
	        return resultValue;
	    } catch (Throwable t) {
	        //回滚事务
	        this.rollback();
	        throw new RuntimeException(t);
	    } finally {
	        //关闭事务
	        this.release();
	    }
	}
	```

	[^Spring在基于注解实现AOP的配置时，后置通知和最终通知在执行上会有顺序错乱的现象，建议使用环绕通知手动控制增强方法的执行时间]: 

## JdbcTemplate

- 持久层总图

	![](C:\Users\67090\Desktop\Typora\SSM\持久层总图.png)

- 作用：和数据库交互，实现对表的CRUD操作

### 配置

- pom.xml配置

	```xml
	<dependency>
	  <groupId>org.springframework</groupId>
	  <artifactId>spring-jdbc</artifactId>
	  <version>5.0.2.RELEASE</version>
	</dependency>
	
	<dependency>
	      <groupId>org.springframework</groupId>
	      <artifactId>spring-tx</artifactId>
	      <version>5.0.2.RELEASE</version>
	</dependency>
	```

- 使用IOC配置bean.xml文件

	```xml
	<bean id="JdbcTemplate" class="org.springframework.jdbc.core.JdbcTemplate">
	    <property name="dataSource" ref="dataSource"></property>
	</bean>
	
	<bean id="dataSource" class="org.springframework.jdbc.datasource.DriverManagerDataSource">
	    <property name="driverClassName" value="com.mysql.cj.jdbc.Driver"></property>
	    <property name="url" value="jdbc:mysql://localhost:3306/tims?serverTimezone=UTC"></property>
	    <property name="username" value="root"></property>
	    <property name="password" value="13456191231sh"></property>
	</bean>
	```

### 注意事项

- JdbcTemplate的query方法需要new BeanPropertyRowMapper<T>(T.class)作为参数来封装结果集
- 当有多个DAO类时，创建JdbcTemplate的代码需要作为公共代码抽取出来，这时可以通过继承Spring提供的JdbcDaoSupport类调用getJdbcTemplate方法自动创建JdbcTemplate对象

## 声明式事务控制

- Java EE体系进行分层开发，事务处理位于业务层，Spring提供了分层设计业务层的事务处理解决方案，是一组事务控制的接口，需要先导入jar包

	```xml
	<dependency>
	  <groupId>org.springframework</groupId>
	  <artifactId>spring-tx</artifactId>
	  <version>5.0.2.RELEASE</version>
	</dependency>
	```

- Spring的事务控制都是基于AOP的，它既可以使用编程的方式，也可以使用配置的方式实现

### PlatformTransactionManager

- 此接口是Spring的事务管理器，它里面提供了我们常用的操作事务的方法
	- 获取事务状态信息：TransactionStatus getTransaction(TransactionDefinition definition)
	- 提交事务：void commit(TransactionStatus status)
	- 回滚事务：void rollback(TransactionStatus status)
- 我们在开发中都是使用它的实现类，即真正管理事务的对象
	- org.spring.jdbc.datasource.DataSourceTransactionManager：使用Spring  JDBC或IBatis进行持久化数据时使用
	- org.springframework.orm.hibernate5.HibernateTransactionManager：使用Hibernate版本进行持久化数据时使用

### TransactionDefinition

- 它是事务的定义信息对象
	- 获取事务对象名称：String  getName()
	- 获取事务隔离级别：int  getIsolationLevel()
	- 获取事务传播行为：int  getPropagationBehavior()
	- 获取事务超时时间：int  getTimeout()
	- 获取事务是否只读：boolean  isReadOnly()

#### 事务的隔离级别

- 事务隔离级别反映事务提交并发访问时的处理态度
	- ISOLATION_DEFAULT：默认级别，归属下列一种，由数据库自身的隔离级别决定
	- ISOLATION_READ_UNCOMMITTED：可以读取未提交数据
	- ISOLATION_READ_COMMITTED：只能读取已提交事务，解决脏读问题（Oracle默认级别）
	- ISOLATION_REPEATABLE_READ：是否读取其他事务提交修改后的数据，解决不可重复读问题（MYSQL默认级别）
	- ISOLATION_SERIALIZABLE：是否读取其他事务提交添加后的数据，解决幻读问题

#### 事务的传播行为

- REQUIRED：如果当前没有事务，就新建一个事务，如果已经存在一个事务，就加入到这个事务中，默认值（增删改）
- SUPPORTS：支持当前事务，如果当前没有事务，就以非事务方式执行（查询）
- MANDATORY：使用当前的事务，如果当前没有事务，就抛出异常
- REQUERS_NEW：新建事务，如果当前在事务中，把当前事务挂起
- NOT_SUPPORTED：以非事务方式执行操作，如果当前存在事务，就把当前事务挂起
- NEVER：以非事务方式运行，如果当前存在事务，抛出异常
- NESTED：如果当前存在事务，则在嵌套事务内执行，如果当前没有事务，则执行REQUIRED类似的操作

#### 超时时间

- 默认值是-1，没有超市时间；如果有，以秒为单位进行设置

#### 只读事务

- 建议查询时设置为只读

### TransactionStatus

- 此接口提供的是事务具体的运行状态
	- 刷新事务：void flush()
	- 获取事务是否存在存储点：boolean hasSavepoint()
	- 获取事务是否完成：boolean isCompleted
	- 获取事务是否为新的事务：boolean isNewTransaction()
	- 获取事务是否回滚：boolean isRollbackOnly()
	- 设置事务回滚：void setRollbackOnly()

### 基于XML的配置步骤

- 配置bean.xml

	```xml
	<?xml version="1.0" encoding="UTF-8"?>
	<beans xmlns="http://www.springframework.org/schema/beans"
	       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	       xmlns:aop="http://www.springframework.org/schema/aop"
	       xmlns:tx="http://www.springframework.org/schema/tx"
	       xsi:schemaLocation="
	        http://www.springframework.org/schema/beans
	        http://www.springframework.org/schema/beans/spring-beans.xsd
	        http://www.springframework.org/schema/tx
	        http://www.springframework.org/schema/tx/spring-tx.xsd
	        http://www.springframework.org/schema/aop
	        http://www.springframework.org/schema/aop/spring-aop.xsd">
	```

- 配置事务管理器

  ```xml
  <bean id="transactionManager" class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
      <!-- 控制住数据源 -->
      <property name="dataSource" ref="dataSource"></property>
  </bean>
  ```

- 配置事务的通知
	
	```xml
	<tx:advice id="txAdvice" transaction-manager="transactionManager"></tx:advice>
	```
	
	- 导入事务的约束
	- 使用tx:advice标签配置事务通知
		- id属性：给事务通知起一个唯一标识
		- transaction-manager：给事务通知提供一个事务管理器引用
	
- 配置AOP中的通用切入点表达式

	```xml
	<aop:pointcut id="pt1" expression="execution(* com.SnHI.service.impl.*.*(..))"/>
	```

- 建立事务通知和切入点表达式的对应关系

	```xml
	<aop:advisor advice-ref="txAdvice" pointcut-ref="pt1"></aop:advisor>
	```

- 配置事务的属性
	
	```xml
	<tx:attributes>
	            <tx:method name="transfer" propagation="REQUIRED" read-only="false"/>
	<!--增删改           <tx:method name="*" propagation="REQUIRED" read-only="false"/>-->
	<!--查询            <tx:method name="select*" propagation="SUPPORTS" read-only="true"/>-->
	        </tx:attributes>
	```
	
	- 是在事务的通知tx:advice标签内部
	- isolation：用于指定事务的隔离级别。默认值时DEFAULT，表示使用数据库的默认隔离级别
	- propagation：用于指定事务的传播行为。默认值是REQUIRED，表示一定会有事务（增删改的选择）；查询方法可以选择SUPPORTS
	- read-only：用于指定事务是否只读，只有查询方法才能设置为true，默认值是false，表示读写
	- timeout：用于指定事务的超时时间，默认值是-1，表示永不超时。如果指定了数值，以秒为单位
	- rollback-for：用于指定一个异常，当产生该异常时，事务回滚，产生其他异常时，事务不回滚。没有默认值，表示任何异常都回滚
	- no-rollback-for：用于指定一个异常，当产生该异常时，事务不回滚，产生其他异常时，事务回滚。没有默认值，表示任何异常都回滚

### 基于注解的配置步骤

- 配置bean.xml

	```xml
	<?xml version="1.0" encoding="UTF-8"?>
	<beans xmlns="http://www.springframework.org/schema/beans"
	       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	       xmlns:context="http://www.springframework.org/schema/context"
	       xmlns:tx="http://www.springframework.org/schema/tx"
	       xsi:schemaLocation="
	        http://www.springframework.org/schema/beans
	        http://www.springframework.org/schema/beans/spring-beans.xsd
	        http://www.springframework.org/schema/tx
	        http://www.springframework.org/schema/tx/spring-tx.xsd
	        http://www.springframework.org/schema/context
	        http://www.springframework.org/schema/context/spring-context.xsd">
	```

- 配置事务管理器

	```xml
	<bean id="transactionManager" class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
	    <property name="dataSource" ref="dataSource"></property>
	</bean>
	```

- 开启Spring对注解事务的支持

	```xml
	<tx:annotation-driven transaction-manager="transactionManager"></tx:annotation-driven>
	```

	- 注解方式

		```java
		@EnableTransactionManagement
		```

- 在需要事务支持的地方使用@Transactional注解

	```java
	@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
	```

# SpringMVC

- SpringMVC是一种基于 Java 的实现 MVC 设计模型的请求驱动类型的轻量级 Web 框架，属于 Spring  FrameWork 的后续产品，已经融合在 Spring  Web  Flow 里面。Spring框架提供了构建Web 应用程序的全功能 MVC 模块。使用 Spring 可插入的 MVC 架构，从而在使用 Spring 进行 Web 开发时，可以选择 Spring  MVC 框架或集成其他 MVC 开发框架，如 Struts2 等。它通过一套注解，让一个简单的 Java 类成为处理请求的控制器，而无需实现任何接口，同时它还支持 RESTful 编程风格的请求

	![](C:\Users\67090\Desktop\Typora\SSM\SpringMVC.png)

## 三层架构

- 表现层
	- 也就是web层，它负责接收客户端请求，向客户端响应结果，通常客户端使用http协议请求web层，web需要接收http请求，完成http响应
	- 表现层包括展示层和控制层：控制层负责接收请求，展示层负责结果的展示
	- 表现层依赖业务层，接收到客户端请求一般会调用业务层进行业务处理，并将处理结果响应给客户端
	- 表现层的设计一般都使用MVC模型（MVC是表现层的设计模型，和其它层没有关系）
- 业务层
	- 也就是service层，它负责业务逻辑处理，和我们开发项目的需求息息相关。web层依赖业务层，但业务层不依赖web层
	- 业务层在业务处理时可能会依赖持久层，如果要对数据持久化需要保证事务一致性（也就是我们说的，事务应该放到业务层来控制）
- 持久层
	- 也就是dao层，负责数据持久化，包括数据层即数据库和数据访问层，数据库是对数据进行持久化的载体，数据访问层是业务层和持久层交互的接口，业务层需要通过数据访问层将数据持久化到数据库中。通俗的讲，持久层就是和数据库交互的，对数据库表进行增删改查

## MVC模型

- 全称是Model  View  Controller，是模型（model）—  视图（view）—  控制器（controller）的缩写，是一种用于设计创建Web应用程序表现层的模式，MVC中每个部分各司其职
	- Model（模型）：通常指的就是数据模型，一般情况下用于封装数据
	- View（视图）：通常指的就是JSP或者html，一般用于展示数据。通常视图是依据模型数据创建的
	- Controller（控制器）：是应用程序中处理用户交互的部分，一般用于处理程序逻辑

## 优势

- 清晰的角色划分
	- 前端控制器（DispatcherServlet）
	- 请求到处理器映射（HandlerMapping）
	- 处理器适配器（HandlerAdapter）
	- 视图解析器（ViewResolver）
	- 处理器或页面控制器（Controller）
	- 验证器（Validator）
	- 命令对象（Command ）：请求参数绑定到的对象就叫命令对象
	- 表单对象（Form Object）：提供给表单展示和提交到的对象就叫表单对象
- 分工明确，而且扩展点相当灵活，可以很容易扩展，虽然几乎不需要
- 由于命令对象就是一个POJO（简单JavaBean），无需继承框架特定API，可以使用命令对象直接作为业务对象
- 和Spring其他框架无缝集成，是其他Web框架所不具备的
- 可适配，通过HandlerAdapter可以支持任意的类作为处理器
- 可定制性，HandlerMapping、ViewResolver等能够非常简单的定制
- 功能强大的数据验证、格式化、绑定机制
- 利用Spring提供的Mock对象能够非常简单的进行Web层单元测试
- 本地化、主体的解析的支持，使我们更容易进行国际化和主体的切换
- 强大的JSP标签库，使JSP编写更容易
- RESTful风格的支持
- 简单的文件上传
- 约定大于配置的契约式编程支持
- 基于注解的零配置支持

## 和Struts2的优劣分析

- 共同点
	- 它们都是表现层框架，都是基于MVC模型编写的
	- 它们的底层都离不开原始ServletAPI
	- 它们处理请求的机制都是一个核心控制器
- 区别
	- Spring MVC的入口是Servlet，而Struts的入口是Filter
	- Spring MVC是基于方法设计的，而Struts2是基于类，Struts2每次执行都会创建一个动作类，所以Spring MVC会稍微比Struts2快些
	- Spring MVC使用更加简洁，同时还支持JSR303，处理ajax的请求更方便（JSR303是一套JavaBean参数校验的标准，它定义了很多常用的校验注解，我们可以直接将这些注解加在JavaBean的属性上面，就可以在需要检验的时候进行校验了）
	- Struts2的OGNL表达式使页面的开发效率相比Spring MVC更高些，但执行效率没有比JSTL提升，尤其是Struts2的表单标签，远没有html执行效率高

## 入门案例

- pom.xml配置

	```xml
	<dependencies>
	  <dependency>
	    <groupId>org.springframework</groupId>
	    <artifactId>spring-context</artifactId>
	    <version>5.0.2.RELEASE</version>
	  </dependency>
	
	  <dependency>
	    <groupId>org.springframework</groupId>
	    <artifactId>spring-web</artifactId>
	    <version>5.0.2.RELEASE</version>
	  </dependency>
	
	  <dependency>
	    <groupId>org.springframework</groupId>
	    <artifactId>spring-webmvc</artifactId>
	    <version>5.0.2.RELEASE</version>
	  </dependency>
	
	  <dependency>
	    <groupId>javax.servlet</groupId>
	    <artifactId>servlet-api</artifactId>
	    <version>2.5</version>
	  </dependency>
	
	  <dependency>
	    <groupId>javax.servlet.jsp</groupId>
	    <artifactId>jsp-api</artifactId>
	    <version>2.1</version>
	  </dependency>
	</dependencies>
	```

- web.xml配置前端控制器

  - 前端控制器（DispatcherServlet）：用户请求到达前端控制器，它就相当于mvc模式中的controller，它是整个流程控制的中心，由它调用其他组件处理用户的请求，DispatcherServlet的存在降低了组件之间的耦合

  ```xml
  <?xml version="1.0" encoding="UTF-8"?>
  <web-app id="WebApp_9" version="3.0" xmlns="http://java.sun.com/xml/ns/javaee"
           xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
           xsi:schemaLocation="http://java.sun.com/xml/ns/javaee
    http://java.sun.com/xml/ns/javaee/web-app_3_0.xsd">
      
  <!-- 配置DispatcherServlet：是SpringMVC的核心（请求分发器，前端控制器） -->
    <servlet>
      <servlet-name>dispatcherServlet</servlet-name>
      <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
      <!-- DispatcherServlet要绑定SpringMVC的配置文件 -->
      <init-param>
        <param-name>contextConfigLocation</param-name>
        <param-value>classpath:springmvc.xml</param-value>
      </init-param>
      <!-- 启动级别：1（和服务器一起启动） -->
      <load-on-startup>1</load-on-startup>
    </servlet>
  
      <!-- /：只匹配所有的请求，不会去匹配jsp页面
           /*：会匹配所有的请求，包括jsp页面
       -->
    <servlet-mapping>
      <servlet-name>dispatcherServlet</servlet-name>
      <url-pattern>/</url-pattern>
    </servlet-mapping>
      
      <!-- 配置解决中文乱码的过滤器 -->
    <filter>
      <filter-name>characterEncodingFilter</filter-name>
      <filter-class>org.springframework.web.filter.CharacterEncodingFilter</filter-class>
        <!-- 设置过滤器中的属性 -->
      <init-param>
        <param-name>encoding</param-name>
        <param-value>UTF-8</param-value>
      </init-param>
    </filter>
      <!-- 过滤所有请求 -->
    <filter-mapping>
      <filter-name>characterEncodingFilter</filter-name>
      <url-pattern>/*</url-pattern>
    </filter-mapping>
  </web-app>
  ```

- SpringMVC.xml配置

  - ```xml
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
    ```
    
  - 配置处理器映射器（不需要）

    - 处理器映射器（HandlerMapping）：HandlerMapping负责根据用户请求找到Handler即处理器，SpringMVC提供了不同的映射器实现不同的映射方式，例如：配置文件方式，实现接口方式，注解方式

    - 处理器（Handler）：它就是我们开发中要编写的具体业务控制器，由DispatcherServlet把用户请求转发到Handler，由Handler对具体的用户请求进行处理

    	```xml
    	<bean class="org.springframework.web.servlet.handler.BeanNameUrlHandlerMapping"></bean>
    	```

  - 配置处理器适配器（不需要）

    - 处理器适配器（HandlerAdapter）：通过HandlerAdapter对处理器进行执行，这是适配器模式的应用，通过扩展适配器可以对更多类型的处理器进行执行

    	```xml
    	<bean class="org.springframework.web.servlet.mvc.SimpleControllerHandlerAdapter"></bean>
    	```

  - 开启注解扫描（必要）

    ```xml
    <context:component-scan base-package="com.SnHI"></context:component-scan>
    ```

  - 开启SpringMVC框架注解的支持（必要）

    - 在SpringMVC的各个组件中，处理器映射器、处理器适配器、视图解析器称为SpringMVC的三大组件

    - 使用mvc:annotate-driven自动加载处理映射器和梳理适配器，可用在SpringMVC.xml配置文件中替代注解处理器和适配器的配置

    	```xml
    	<mvc:annotation-driven></mvc:annotation-driven>
    	```

  - 配置视图解析器（必要）

    - 视图解析器（ViewResolver）：ViewResolver负责将处理结果生成View视图，ViewResolver首先根据逻辑视图名解析成物理视图名，即具体的页面地址，再生成View视图对象，最后对View进行渲染将处理结果通过页面展示给用户

    	```xml
    	<bean id="internalResourceViewResolver" class="org.springframework.web.servlet.view.InternalResourceViewResolver">
    	    <!-- 前缀 -->
    	    <property name="prefix" value="/WEB-INF/jsp/"></property>
    	    <!-- 后缀 -->
    	    <property name="suffix" value=".jsp"></property>
    	</bean>
    	```

  - 让Spring不处理静态资源（需要）

    ```xml
    <mvc:default-servlet-handler></mvc:default-servlet-handler>
    ```

- Controller.java

	```java
	/**
	 * 控制器类
	 */
	//@Controller注解的类会自动添加到Spring上下文中
	@Controller
	public class HelloController {
	    //映射访问地址
	    @RequestMapping("/Result")
	    public String Hello(Model model) {
	        //向模型中添加属性与值，可以在JSP页面中取出并渲染
	        model.addAttribute("msg", "HelloSpringMVC");
	        //return的内容会被视图解析器处理，返回视图位置
	        return "Result";
	    }
	}
	```
	- @Controller：用于声明Spring类的实例是一个控制器，这个类会被Spring接管；被这个注解的类中的所有方法，如果返回值是String，并且有具体页面可以跳转，那么就会被视图解析器解析

	- @RequestMapping：用于建立请求URL和处理请求方法之间的对应关系，可用于类或方法上，用于类上表示类中的所有响应请求的方法都是以该地址为父路径

		- value属性：用于指定请求的URL，它和path属性的作用是一样的
		- method属性：用于约束请求的类型，可以收窄请求范围，指定请求谓词的类型如GET，POST，HEAD，OPTIONS，PUT，PATCH，DELETE，TRACE等

		- params：用于指定限制请求参数的条件，它支持简单的表达式，要求请求参数的key和value必须配置的一模一样
		- headers：用于指定限制请求消息头的条件

	- 组合注解：相当于method = RequestMethod.XXX

		- @GetMapping
		- @PostMapping
		- @PutMapping
		- @DeleteMapping
		- @PatchMapping

## 请求参数的绑定

- 绑定机制

	- 表单提交的数据都是key-value格式的
	- SpringMVC的参数绑定过程是把表单提交的请求参数作为控制器中方法的参数进行绑定的
	- 提交表单的name和参数的名称是相同的

- 支持的数据类型

	- 基本数据类型和字符串类型

		- 提交表单的name和参数的名称是相同的
		- 区分大小写

	- 实体类型（JavaBean）

		- 提交表单的name和JavaBean中的属性名称需要一致
		- 如果一个JavaBean类中包含其他引用类型，那么表单的name属性需要编写成：对象.属性

	- 集合数据类型（List、Map集合等）

		- JSP页面编写方式

			```jsp
			<input name="list[0].uname">
			<input name="list[0].age">
			<input name="map['oneName'].uname">
			<input name="map['oneAge'].age">
			```

## 自定义类型转换器

- 定义一个包含转换方式的类，实现Converter接口，该接口有两个泛型<S, T>，S表示接收的类型，T表示目标类型，重写convert方法

	```java
	/**
	 * 字符串转日期的类型转换器
	 */
	public class StringToDateConverter implements Converter<String, Date> {
	
	    @Override
	    public Date convert(String s) {
	        DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
	        try {
	            Date date = df.parse(s);
	            return date;
	        } catch (ParseException e) {
	            throw new RuntimeException(e);
	        }
	    }
	}
	```

- 在Spring配置文件中配置类型转换器，其机制是将自定义的转换器注册到类型转换服务中去

	```xml
	<!-- 配置类型转换器工厂 -->
	<bean id="conversionService" class="org.springframework.context.support.ConversionServiceFactoryBean">
	    <!-- 给工厂注入一个新的类型转换器 -->
	    <property name="converters">
	        <set>
	            <!-- 配置自定义类型转换器 -->
	            <bean id="myConverter" class="com.SnHI.utils.StringToDateConverter"></bean>
	        </set>
	    </property>
	</bean>
	```

- 在annotation-driven标签中引用配置的类型转换服务

	```xml
	<mvc:annotation-driven conversion-service="conversionService"></mvc:annotation-driven>
	```

## RESTful风格

- RESTful是一个资源定位及资源操作的风格。不是标准也不是协议，基于这个风格设计的软件可以更简洁，更有层次，更易于实现缓存等机制

- 功能：使用POST、DELETE、PUT、GET四种不同方法对资源进行添加、删除、修改、查询操作

- 优点

  - 结构清晰、符合标准、易于理解、扩展方便
  - 获得参数更加方便，框架会自动进行类型转换
  - 通过路径变量的类型可以约束访问参数，如果类型不一样，则访问不到对应的请求方法，而不会是参数转换失败

- web.xml

	```xml
	<!-- 使用Rest风格的URI，将页面普通的post请求转为指定的put请求或者delete请求 -->
	<filter>
	  <filter-name>hiddenHttpMethodFilter</filter-name>
	  <filter-class>org.springframework.web.filter.HiddenHttpMethodFilter</filter-class>
	</filter>
	<filter-mapping>
	  <filter-name>hiddenHttpMethodFilter</filter-name>
	  <url-pattern>/*</url-pattern>
	</filter-mapping>
	```

- RestfulController.java

	```java
	/**
	 * restful风格
	 */
	@Controller
	public class RestfulController {
	    //@RequestMapping(value = "/Result1/{a}/{b}", method = RequestMethod.GET)
	    @GetMapping("/Result1/{a}/{b}")
	    public String add(@PathVariable int a, @PathVariable int b, Model model) {
	        int res = a + b;
	        model.addAttribute("msg", a + "+" + b + "的结果为" + res);
	        //转发
	        return "Result";
	        //重定向
	        return "redirect:/Result.jsp"
	    }
	}
	```
	- @PathVaribale：让方法参数的值对应绑定到一个URL模板变量上

## 常用注解

- @RequestParam：把请求中指定名称的参数给控制器中的形参赋值
	- value：请求参数中的名称
	- required：请求参数中是否必须提供此参数。默认值：true，表示必须提供，如果不提供将报错
- @RequestBody：用于获取请求体内容，直接使用得到的是key=value&key=value结构的数据，get请求方式不适用
	- required：是否必须有请求体。默认值：true，表示get请求方式会报错；如果取值为false，get请求得到的是null
-  @ResponseBody：作用在方法上，表示将该方法的返回结果直接写入HTTP response body中，将java对象转为json格式的数据
- @PathVariable：用于绑定url中的占位符，例如：请求url中/delete/{id}， 这个{id}就是url占位符。url支持占位符是Spring3.0之后加入的，是SpringMVC支持restful风格的一个重要标志
	- value：用于指定url中占位符的名称
	- required：是否必须提供占位符
- @RequestHeader：用于获取请求消息头
	- value：提供消息头名称
	- required：是否必须有此消息头
- @CookieValue：用于把指定cookie名称的值传入控制器方法参数
	- value：指定cookie的名称
	- required：是否必须有此cookie

- @ModelAttribute：可以用于修饰方法和参数。出现在方法上表示当前方法会在控制器的方法执行之前先执行；出现在参数上表示获取指定的数据给参数赋值
	- value：用于获取数据的key，key可以是POJO的属性名称也可以是map结构的key
	- 应用场景：当表单提交数据不是完整的实体类数据时，保证没有提交数据的字段使用数据库对象原来的数据
- @SessionAttribute：用于多次执行控制器方法间的参数共享
	- value：用于指定存入的属性名称
	- type：用于指定存入的数据类型

## 响应数据和结果视图

### 返回值分类

- 字符串：controller方法返回字符串可以指定逻辑视图名，通过视图解析器解析为物理视图地址

	```java
	    @RequestMapping("/Result")
	    public String Hello(Model model) {
	        model.addAttribute("msg", "HelloSpringMVC");
	        //return的内容会被视图解析器处理
	        return "Result";
	    }
	```
	- forward请求转发

		```java
		/**
		 * 返回值是String，请求转发
		 */
		@RequestMapping(value="/RequestString")
		public String getUser3(HttpServletRequest request, HttpServletResponse response) {
		    return "forward:/WEB-INF/jsp/Result.jsp";
		}
		```

	- redirect重定向

		```java
		/**
		 * 返回值是String，重定向
		 */
		@RequestMapping(value="/ResponseString")
		public String getUser4(HttpServletRequest request, HttpServletResponse response) {
		    return "redirect:/index.jsp";
		}
		```

- void：在controller方法形参上可以定义request和response，使用request或response指定响应结果

	- request请求转发

		```java
		/**
		 * 返回值是void，请求转发
		 */
		@RequestMapping(value="/Request")
		public void getUser1(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
		    //请求转发不能使用视图解析器，所以需要全限定路径
		    request.getRequestDispatcher("/WEB-INF/jsp/Result.jsp").forward(request, response);
		}
		```

	- response重定向

		```java
		/**
		 * 返回值是void，重定向
		 */
		@RequestMapping(value="/Response")
		public void getUser2(HttpServletRequest request, HttpServletResponse response) throws IOException {
		    //重定向不能访问WEB-INF路径下的jsp文件
		    response.sendRedirect(request.getContextPath() + "/index.jsp");
		}
		```

- ModelAndView对象

	- ModelAndView对象是Spring提供的一个对象，可以用来调整具体的JSP视图

		```java
		/**
		 * 返回值是ModelAndView
		 */
		@RequestMapping(value="/ModelAndView")
		public ModelAndView getUser4(ModelAndView mv, User user) {
		    mv.addObject("msg", user);
		    mv.setViewName("Result");
		    return mv;
		}
		```

### ResponseBody响应json数据

- 在webapp路劲下新建js文件夹，导入jquery-3.4.1.min.js，并配置springMVC.xml

	```xml
	<!-- 告诉前端控制器，哪些资源不拦截 -->
	<mvc:resources location="/js/" mapping="/js/**"></mvc:resources>
	```

- 在jsp文件中导入jquery并编写发送ajax请求的代码

	```jsp
	<script src="/js/jquery-3.4.1.min.js"></script>
	    <script>
	        $(function () {
	            $("#bt").click(function () {
	                //发送ajax请求
	                $.ajax({
	                    //编写json格式，设置属性和值
	                    url:"user/ajax",
	                    contentType:"application/json;charset=UTF-8",
	                    data:'{"name":"孙辉", "sex":"男", "age":20, "date":"2020-12-12"}',
	                    dataType:"json",
	                    type:"post",
	                    //回调函数
	                    success:function(data) {
	                        alert(data.name);
	                        alert(data.sex);
	                        alert(data.age);
	                        alert(data.date);
	                    }
	                })
	            })
	        })
	    </script>
	```

- 将json数据转换为JavaBean对象时，SpringMVC默认用MappingJacksonHttpMessageConverter对json数据进行转换，需要导入jackson的包，在pom.xml中加入依赖

	```xml
	<!-- https://mvnrepository.com/artifact/com.fasterxml.jackson.core/jackson-databind -->
	<dependency>
	  <groupId>com.fasterxml.jackson.core</groupId>
	  <artifactId>jackson-databind</artifactId>
	  <version>2.10.3</version>
	</dependency>
	
	<!-- https://mvnrepository.com/artifact/com.fasterxml.jackson.core/jackson-core -->
	<dependency>
	  <groupId>com.fasterxml.jackson.core</groupId>
	  <artifactId>jackson-core</artifactId>
	  <version>2.10.3</version>
	</dependency>
	
	<!-- https://mvnrepository.com/artifact/com.fasterxml.jackson.core/jackson-annotations -->
	<dependency>
	  <groupId>com.fasterxml.jackson.core</groupId>
	  <artifactId>jackson-annotations</artifactId>
	  <version>2.10.3</version>
	</dependency>
	```

- Converter.java

	```java
	/**
	 * 模拟异步请求响应
	 * 客户端发送ajax请求，传输的是json数据，后端将json数据封装到user对象中
	 */
	@RequestMapping(value="/ajax")
	//@ResponseBody注解将要相应的数据转换为json格式
	public @ResponseBody User getUser5(@RequestBody User user) {
	    System.out.println(user);
	    //模拟查询数据库
	    user.setName("sunhui");
	    user.setSex("女");
	    user.setAge(21);
	    user.setDate(new Date());
	    System.out.println(user);
	    //做响应
	    return user;
	}
	```
	- @ResponseBody：将要响应的数据转换为json格式

## 文件上传

### 传统方式

- form表单的enctype（表单请求正文的类型）取值必须是multipart/form-data（默认值是application/x-www-form-urlencoded）
	
- 当form表单的enctype取值不是默认值后，request.getParameter()将失效；取值为multipart/form-data时，请求正文内容会变成MIME类型描述的正文，包括分界符、协议头、协议的正文、协议的类型（MIME类型）
	
- method属性取值必须是POST

- 提供一个文件选择域<input type="file" />

- 使用Commons-fileupload组件实现文件上传，需要导入该组件相应的支撑jar包

	```xml
	<!-- https://mvnrepository.com/artifact/commons-fileupload/commons-fileupload -->
	<dependency>
	  <groupId>commons-fileupload</groupId>
	  <artifactId>commons-fileupload</artifactId>
	  <version>1.3.1</version>
	</dependency>
	
	<!-- https://mvnrepository.com/artifact/commons-io/commons-io -->
	<dependency>
	  <groupId>commons-io</groupId>
	  <artifactId>commons-io</artifactId>
	  <version>2.4</version>
	</dependency>
	```

- FileUpLoad.java代码

	```java
	/**
	 * 传统方式文件上传
	 * @param request
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("/FileUpLoad1")
	public String FileUpLoad1(HttpServletRequest request) throws Exception {
	    //使用fileuplpad组件完成文件上传
	    //指定上传位置
	    String path = request.getSession().getServletContext().getRealPath("/upload");
	    File file = new File(path);
	    //判断上传路径是否存在
	    if (!file.exists()) {
	        //不存在则创建该路径
	        file.mkdirs();
	    }
	    //获取上传文件项
	    //创建磁盘文件项工厂
	    DiskFileItemFactory factory = new DiskFileItemFactory();
	    ServletFileUpload upload = new ServletFileUpload(factory);
	    //解析request
	    List<FileItem> items = upload.parseRequest(request);
	    for (FileItem item: items) {
	        //判断item对象是否是上传文件项
	        if (item.isFormField()) {
	            //是普通表单项
	        } else {
	            //是文件上传项
	            //获取上传文件的名称
	            String itemName = item.getName();
	            //把文件的名称设成唯一值
	            String uuid = UUID.randomUUID().toString().replace("-", " ");
	            itemName = itemName + "_" + uuid;
	            //完成文件上传，往path路径下上传itemName文件
	            item.write(new File(path, itemName));
	            //删除临时文件
	            item.delete();
	        }
	    }
	    return "Result";
	}
	```

### SpringMVC方式

- 配置文件解析器对象

	```xml
	<!-- 配置文件解析器对象 -->
	<bean id="multipartResolver" class="org.springframework.web.multipart.commons.CommonsMultipartResolver">
	    <!-- 上传文件最大10M -->
	    <property name="maxUploadSize" value="2097152"></property>
	</bean>
	```
	- id值必须为multipartResolver

- FileUpLoad.java代码

	```java
	/**
	 * SpringMVC文件上传
	 * @param request
	 * @param file
	 * @return
	 */
	@RequestMapping("/FileUpLoad2")
	public String FileUpLoad2(HttpServletRequest request, MultipartFile file) throws IOException {
	    String path = request.getSession().getServletContext().getRealPath("/upload");
	    File filepath = new File(path);
	    if (!filepath.exists()) {
	        filepath.mkdirs();
	    }
	    //获取上传文件的名称
	    String fileName = file.getOriginalFilename();
	    String uuid = UUID.randomUUID().toString().replace("-", " ");
	    fileName = fileName + "_" + uuid;
	    //上传文件
	    file.transferTo(new File(filepath, fileName));
	    return "Result";
	}
	```
	- MultipartFile类的对象名必须为前端form表单中用于上传文件的input控件中的name属性值

### 跨服务器方式

- 配置2个服务器

- 导入需要的jar包

	```xml
	<!-- https://mvnrepository.com/artifact/com.sun.jersey/jersey-core -->
	<dependency>
	  <groupId>com.sun.jersey</groupId>
	  <artifactId>jersey-core</artifactId>
	  <version>1.18.1</version>
	</dependency>
	
	<!-- https://mvnrepository.com/artifact/com.sun.jersey/jersey-client -->
	<dependency>
	  <groupId>com.sun.jersey</groupId>
	  <artifactId>jersey-client</artifactId>
	  <version>1.18.1</version>
	</dependency>
	```

- FileUpLoad.java

	```java
	/**
	 * 跨服务器文件上传
	 * @param file
	 * @return
	 * @throws IOException
	 */
	@RequestMapping("/FileUpLoad3")
	public String FileUpLoad3(MultipartFile file) throws IOException {
	    //定义上传文件服务器路径
	    String path = "http://localhost:8080/SnHI_01SpringMVC_Rudiment_war_exploded/upload";
	    //将文件进行URL编码
	    String encodeFileName = URLEncoder.encode(fileName,"UTF-8");
	    String uuid = UUID.randomUUID().toString().replace("_", " ");
	    encodeFileName = encodeFileName + "_" + uuid;
	    //创建客户端的对象
	    Client client = Client.create();
	    //和另一个服务器进行连接
	    WebResource resource = client.resource(path + "/" + encodeFileName);
	    //上传文件
	    resource.put(file.getBytes());
	    return "Result";
	}
	```

#### 常见报错

- 403/405

	- 因为Servlet默认是只读的，也就是写不进去（文件上传不过来），所以要在文件服务器的 web.xml 对 Servlet 进行配置，在安装路径下的/conf/web.xml中修改默认只读配置，添加readonly并设置为false

		```xml
		<init-param>
		    <param-name>readonly</param-name>
		    <param-value>false</param-value>
		</init-param>
		```

- 404

	- 因为服务器会默认找这个相关映射去解决，但是上传过来的图片请求没有相关映射，如果没有作映射，就交给 WEB 应用服务器默认的 Servlet 处理，从而找到对应的静态资源，只有再找不到资源时才会报错，在Springmvc.xml中加入注解

		```xml
		<mvc:default-servlet-handler></mvc:default-servlet-handler>
		```

	- 作为文件服务器的路径和控制层不一致，需加上/SnHI_01SpringMVC_Rudiment_war_exploded

- 400

	- 路径中出现了中文，导入URLEncoder包对文件名进行URL编码

		```java
		URLEncoder.encode(fileName,"UTF-8");
		```

- 409
	- 没有创建文件上传对应的文件夹，服务器找不到目录，根据以下两种情况将uploads文件夹加在合适的位置
		- /xxx:war：上传的文件会存放在 Tomcat 所在的目录下
		- /xxx:war exploded：上传的文件会存放在当前目录下

## 异常处理

![](C:\Users\67090\Desktop\Typora\SSM\SpringMVC异常处理.png)

- 编写自定义异常类

	```java
	/**
	 * 自定义异常类：做提示信息
	 */
	public class SysException extends Exception {
	
	    private String message;
	
	    public SysException(String message) {
	        this.message = message;
	    }
	
	    public String getMessage() {
	        return message;
	    }
	
	    public void setMessage(String message) {
	        this.message = message;
	    }
	}
	```

- 编写异常处理器类

	- 必须实现HandlerExceptionResolver接口

	```java
	/**
	 * 异常处理器
	 */
	public class SysExceptionResolver implements HandlerExceptionResolver {
	
	    @Override
	    public ModelAndView resolveException(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o, Exception e) {
	        SysException se = null;
	        if (e instanceof SysException) {
	            se = (SysException) e;
	        } else {
	            se = new SysException("系统正在维护");
	        }
	        ModelAndView mv = new ModelAndView();
	        mv.addObject("errorMsg", se.getMessage());
	        mv.setViewName("Result");
	        return mv;
	    }
	}
	```

- 配置异常处理器

	```xml
	<!-- 配置异常处理器 -->
	<bean id="sysExceptionResolver" class="com.SnHI.exception.SysExceptionResolver"></bean>
	```

## 拦截器

### 概念

- SpringMVC的拦截器类似于Servlet开发中的过滤器Filter，用于对处理器进行预处理和后处理
- 用户可以自定义一下拦截器来实现特定的功能
- 拦截器链：是将拦截器按一定的顺序连接成一条链，在访问被拦截的方法或字段时，拦截器链中的拦截器就会按其之前定义的顺序被调用
- 和过滤器的区别
	- 过滤器是servlet规范中的一部分，任何java web工程都可以使用，在url-pattern中配置了/*之后，可以对所有要访问的资源拦截
	- 拦截器是SpringMVC框架自己的，只有使用了SpringMVC框架的工程才能用，它只会拦截访问的控制器方法，如果访问的是jsp，html，css，image，js等都不会进行拦截

### 步骤

- 编写拦截器类

	- 必须实现HandlerInterceptor接口

	```java
	/**
	 * 拦截器类
	 */
	public class MyInterceptor1 implements HandlerInterceptor {
	    /**
	     * 预处理方法，在控制器执行之前执行
	     * @param request
	     * @param response
	     * @param handler
	     * @return
	     * @throws Exception
	     */
	    @Override
	    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
	        System.out.println("拦截器预处理方法执行");
	//        request.getRequestDispatcher("/WEB-INF/jsp/exception.jsp").forward(request, response);
	        //return true即放行，执行下一个拦截器，没有则执行Controller中的方法
	        return true;
	    }
	
	    /**
	     * 后处理方法，如果放行，在控制器执行之后执行
	     * @param request
	     * @param response
	     * @param handler
	     * @param modelAndView
	     * @throws Exception
	     */
	    @Override
	    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
	        System.out.println("拦截器后处理方法执行");
	//        request.getRequestDispatcher("/WEB-INF/jsp/exception.jsp").forward(request, response);
	    }
	
	    /**
	     * interceptor.jsp页面后执行
	     * @param request
	     * @param response
	     * @param handler
	     * @param ex
	     * @throws Exception
	     */
	    @Override
	    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
	        System.out.println("拦截器末处理方法执行");
	    }
	}
	```
	- 执行顺序
		- 拦截器预处理方法执行
		- 控制器方法执行
		- 拦截器后处理方法执行
		- interceptor.jsp执行
		- 拦截器末处理方法执行

- 配置拦截器

	```xml
	<!-- 配置拦截器 -->
	<mvc:interceptors>
	    <!-- 配置第一个拦截器 -->
	    <mvc:interceptor>
	        <!-- 要拦截的Controller所在路径 -->
	        <mvc:mapping path="/user/*"/>
	        <bean class="com.SnHI.interceptor.MyInterceptor1"></bean>
	    </mvc:interceptor>
	</mvc:interceptors>
	```

### 拦截器链

- 配置多个拦截器

	```xml
	<!-- 配置拦截器 -->
	<mvc:interceptors>
	    <!-- 配置第一个拦截器 -->
	    <mvc:interceptor>
	        <!-- 要拦截的Controller所在路径 -->
	        <mvc:mapping path="/user/*"/>
	        <bean class="com.SnHI.interceptor.MyInterceptor1"></bean>
	    </mvc:interceptor>
	    <!-- 配置第二个拦截器 -->
	    <mvc:interceptor>
	        <mvc:mapping path="/user/*"/>
	        <bean class="com.SnHI.interceptor.MyInterceptor2"></bean>
	    </mvc:interceptor>
	</mvc:interceptors>
	```

- 执行顺序
	- 拦截器预处理方法1执行
	- 拦截器预处理方法2执行
	- 控制器方法执行
	- 拦截器后处理方法2执行
	- 拦截器后处理方法1执行
	- interceptor.jsp执行
	- 拦截器末处理方法2执行
	- 拦截器末处理方法1执行

# SSM整合

## Spring整合SpringMVC

- 在web.xml文件中配置监听器使得在tomcat服务器启动时就开启对Spring的xml文件的解析

	```xml
	<!-- 配置Spring的监听器，在tomcat服务器启动时就加载ApplicationContext.xml。默认只加载WEB-INF路径下的applicationContext.xml路径 -->
	<listener>
	  <listener-class>org.springframework.web.context.ContextLoaderListener</listener-class>
	</listener>
	<!-- 设置配置文件的路径 -->
	<context-param>
	  <param-name>contextConfigLocation</param-name>
	  <param-value>classpath:ApplicationContext.xml</param-value>
	</context-param>
	```

## Spring整合Mybatis

- 配置Spring文件

	```xml
	<!-- Spring整合Mybatis -->
	<!-- 配置连接池 -->
	<bean id="dataSource" class="com.mchange.v2.c3p0.ComboPooledDataSource">
	    <property name="driverClass" value="com.mysql.cj.jdbc.Driver"></property>
	    <property name="jdbcUrl" value="jdbc:mysql://localhost:3306/tims?serverTimezone=UTC"></property>
	    <property name="user" value="root"></property>
	    <property name="password" value="13456191231sh"></property>
	</bean>
	
	<!-- 配置SqlSessionFactory工厂 -->
	<bean id="sqlSessionFactory" class="org.mybatis.spring.SqlSessionFactoryBean">
	    <property name="dataSource" ref="dataSource"></property>
	</bean>
	
	<!-- 配置扫描器，将mybatis接口的实现加入到ioc容器中 -->
	<bean id="mapperScanner" class="org.mybatis.spring.mapper.MapperScannerConfigurer">
	    <property name="basePackage" value="com.SnHI.dao"></property>
	</bean>
	```

