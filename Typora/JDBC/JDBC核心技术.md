## 技术体系

![](C:\Users\67090\Desktop\Typora\JDBC\技术体系.png)

## 第1章：JDBC概述

#### 1.1 数据的持久化

- 持久化（persistence）：把数据保存到可掉电式存储设备中以供之使用，数据持久化意味着将内存中的数据保存到硬盘上加以“固化”，而持久化的实现过程大多通过各种关系数据库来完成
- 持久化的主要应用是将内存中的数据存储在关系数据库中，当然也可以存储在磁盘文件、XML数据文件中

#### 1.2 Java中的数据存储技术

- 在Java中，数据库存储技术可分为如下几类：
	- JDBC直接访问数据库
	- JDO（Java Data Object）技术
	- 第三方O/R工具，如Hibernate、Mybatis等
- JDBC是Java访问数据库的基石，JDO、Hibernate、MyBatis只是更好的封装了JDBC

#### 1.3 JDBC介绍

- JDBC（Java Database Connectivity）是一个独立于特定数据库管理系统、通用的SQL数据库存取和操作的公共接口（一组API），定义了用来访问数据库的标准Java类库
- JDBC为访问不同的数据库提供了一种统一的途径，可以连接任何提供了JDBC驱动程序的数据库系统

![](C:\Users\67090\Desktop\Typora\JDBC\JDBC驱动.png)

#### 1.4 JDBC程序编写步骤

![](C:\Users\67090\Desktop\Typora\JDBC\JDBC编写步骤.png)

## 第2章：获取数据库连接

#### 2.1 要素一：Driver接口实现类

##### 2.1.1 Driver接口介绍

- java.sql.Driver接口是所有JDBC驱动程序需要实现的接口，这个接口是提供给数据库厂商使用的，不同数据库厂商提供不同的实现方式
- 在程序中不需要直接去访问实现了Driver接口的类，而是由驱动程序管理器类（java.sql.DriverManager）去调用这些Driver实现
	- Oracle的驱动：oracle.jdbc.driver.OracleDriver
	- mysql的驱动：com.mysql.jdbc.Driver

##### 2.1.2 加载与注册JDBC驱动

- 加载mysql驱动中的Driver类：Driver driver = new com.mysql.cj.jdbc.Driver();
- 通过反射：Class.forName("com.mysql.cj.jdbc.Driver");

#### 2.2 要素二：URL

- 要访问的mysql数据库地址
	- jdbc:mysql://localhost/<数据库名>?user=<用户名>&password=<密码>&serverTimezone=UTC

#### 2.3 要素三：用户名和密码

- user，password可以用“属性名=属性值”的方式告诉数据库
- 可以调用DriverManager类的getConnection()方法建立到数据库的连接

#### 2.4 数据库连接方式

##### 2.4.1 连接方式一

```
jdbc.properties配置文件

url=jdbc:mysql://localhost/jxgl1?user=root&password=13456191231sh&serverTimezone=UTC
driverClass=com.mysql.cj.jdbc.Driver
```



```java
	@Test//利用配置文件读取基本信息获取连接，实现数据与代码分离（解耦）
	public void getConnection1() throws Exception {
		
	//读取配置文件中的4个基本信息
	InputStream is = JDBCText.class.getClassLoader().getResourceAsStream("jdbc.properties");
	Properties pros = new Properties();
	pros.load(is);
	String url = pros.getProperty("url");
	String driverClass = pros.getProperty("driverClass");
	
	//加载驱动
	Class.forName(driverClass);
	
	//获取连接
	Connection conn = DriverManager.getConnection(url);
	System.out.println(conn);
        
}
```
##### 2.4.2 连接方式二

```java
	@Test
	public void getConnection2() throws Exception{
        
	//加载mysql驱动中的Driver类（反射方法）
	Class.forName("com.mysql.cj.jdbc.Driver");//Driver driver = new com.mysql.cj.jdbc.Driver();
        
	//特定数据库的字符串（mysql）
	String url = "jdbc:mysql://localhost/jxgl1?user=root&password=13456191231sh&serverTimezone=UTC";
        
	//通过manager建立连接
	Connection conn = DriverManager.getConnection(url);
	System.out.println(conn);

}
```
## 	第3章：使用PreparedStatement实现CRUD操作

#### 3.1 操作和访问数据库

- 数据库连接被用于向数据库服务器发送命令和SQL语句，并接受数据库服务器返回的结果。其实一个数据库连接就是一个Socket连接
- 在java.sql包中有3个接口分别定义了对数据库的调用的不同方式
	- Statement：用于执行静态SQL语句并返回它所生成结果的对象
	- PreparedStatement：SQL语句被预编译并存储在此对象中，可以使用此对象多次高校的执行该语句
	- CallableStatement：用于执行SQL存储过程

#### 3.2 使用Statement操作数据表的弊端

- 通过调用Connection 对象的createStatement()方法创建该对象，该对象用于执行静态的SQL语句，并且返回执行结果

- Statement接口中定义了下列方法用于执行SQL语句

- ```java
	- int excuteUpdate(String sql)：执行更新操作INSERT、UPDATE、DELETE
	- ResultSet executeQuery(String sql)：执行查询操作SELECT
	```

- 使用Statement操作数据表存在弊端：

	- 问题一：存在拼串操作，繁琐
	- 问题二：存在SQL注入问题

- SQL注入：利用某些系统没有对用户输入的数据进行充分的检查，而在用户输入数据中注入非法的SQL语句段或命令（如：SELECT user, password FROM user_table WHERE user = 'a' OR 1 = ' AND password = 'OR'1' = '1'），从而利用系统的SQL引擎完成恶意行为的做法

- 对于Java而言，要防范SQL注入，只要用PreparedStatement取代Statement就可以了

#### 3.3 PreparedStatement的使用

##### 3.3.1 PreparedStatement介绍

- 可以通过调用Connection对象的preparedStatement(String sql)方法获取PreparedStatement对象
- preparedStatement接口是statement的子接口，它表示一条与编译过的SQL语句
- preparedStatement对象所代表的SQL语句中的参数用问号来表示，调用preparedStatement对象的setXxx()方法来设置这些参数，setXxx()方法有两个参数，第一个参数是要设置的SQL语句中的参数的索引（从1开始），第二个是设置的SQL语句中的参数的值

##### 3.3.2 Java与SQL对应数据类型转换表

![](C:\Users\67090\Desktop\Typora\JDBC\Java&sql数据类型转换表.png)

##### 3.3.3 PreparedStatement vs Statement

- 代码的可读性和可维护性
- PreparedStatement能最大可能提高性能
	- DBServer会对预编译语句提供性能优化。因为预编译语句有可能被重复调用，所以语句在被DBServer的编译器编译后的执行代码被缓存下来，那么下次调用时只要是相同的预编译语句就不需要编译，只要将参数直接传入编译过的语句执行代码中就会得到执行
	- statement语句中，即使是相同的操作但因为数据内容不一样，所以整个语句本身不能匹配，没有缓存语句的意义，事实是没有数据库会对普通语句编译后的执行代码缓存，这样每执行一次都要对传入的语句编译一次（语法检查，语义检查，翻译成二进制命令，缓存）

##### 3.3.4 PreparedStatement相对于statement的好处

- 解决了Statement的拼串和SQL注入问题
- 可以操作Blob数据
- 可以实现更高效的批量处理

#### 3.4 ResultSet与ResultSetMetaData

- ResultSet：获取结果集，可以获取列值
- ResultSetMetaData：获取结果集的元数据，可以获取列名

#### 3.6 JDBC API小结

- 两种思想
	- 面向接口编程的思想
	- ORM思想（object relational mapping）
		- 一个数据表对应一个Java类
		- 表中的一条记录对应Java类的一个对象
		- 表中的一个字段对应Java类的一个属性

<!--sql是需要结合列名和表的属性名来写，注意写别名-->

- 两种技术

	- JDBC结果集的元数据：ResultSetMetaData
		- 获取列数：getColumnCount()
		- 获取列的别名：getColumnLabel()
	- 通过反射，创建指定类的对象，获取指定的属性并赋值

## 第4章 操作BLOB类型字段

#### 4.1 MySQL BLOB类型

- MySQL中，BLOB是一个二进制大型对象，是一个可以存储大量数据的容器，它能容纳不同大小的数据
- 插入BLOB类型的数据必须使用PreparedStatement，因为BLOB类型的数据无法使用字符串拼接
- MySQL的四种BLOB类型

![](C:\Users\67090\Desktop\Typora\JDBC\BLOB四种类型.png)

- 需要注意的是：如果存储的文件过大，数据库的性能会下降
- 如果在指定了相关的BLOB类型以后，还报错：XXX too large，那么在mysql的安装目录下，找my.ini文件加上如下的配置参数：max_allowed_packet=16M，同时注意：修改了my.ini文件之后，需要重新启动mysql服务

## 第5章 数据库事务

#### 5.1 数据库事务介绍

- 事务：一组逻辑操作单元，使数据从一种状态变换到另一种状态
- 事务处理：保证所有事务都作为一个工作单元来执行，即使出现了故障，都不能改变这种执行方式，当一个事务中执行多个操作时，要么所有的事务都被提交（commit），那么这些修改就被用久的保存下来；要么数据库管理系统将放弃所做的所有修改，整个事务回滚（rollback）到最初状态

#### 5.2 JDBC事务处理

- 数据一旦提交，就不可回滚
- 数据的提交
	- 当一个连接对象被创建时，默认情况下是自动提交事务：每次执行一个SQL语句时，如果执行成功，就会向数据库自动提交，而不能回滚
	- 关闭数据库连接，数据就会自动提交。如果多个操作每个操作使用的是自己单独的连接，则无法保证事务。即同一个事务的多个操作必须在同一连接下
- JDBC程序中为了让多个SQL语句作为一个事务执行
	- 调用Connection对象的setAutoCommit(false);以取消自动提交事务
	- 在所有的SQL语句都成功执行后，调用commit();方法提交事务
	- 在出现异常时，调用rollback()；方法回滚事务
	- 若此时Connection没有被关闭，则可能被重复利用，主需要恢复其自动提交状态，尤其是在使用数据库连接池技术时，执行close()方法前，建议恢复其自动提交状态

#### 5.3 事务的ACID属性

- 原子性（Atomicity）
	原子性是指事务是一个不可分割的工作单位，事务中的操作要么都发生，要么都不发生

- 一致性（Consistency）
	事务必须使数据库从一个一致性状态变化到另一个一致性状态

- 隔离性（Isolation）
	事务的隔离性是指一个事务的执行不能被其他事务干扰，即一个事务内部的操作及使用的数据对并发的其他事务是隔离的，并发执行的各个事务之间不能互相干扰

- 持久性（Durability）
	持久性是指一个事务一旦被提交，它对数据库中数据的改变就是永久性的，接下来的其他操作和数据库故障不应该对其有任何影响

#### 5.4 数据库的并发问题

- 对于同时运行的多个事务，当这些事务访问数据库中相同的数据时，如果没有采取必要的隔离机制，就会导致各种并发问题：
	- 脏读：对于两个事务T1,T2，T1读取了已经被T2更新但还没有被提交的字段，若T2回滚，T1读取的内容就是临时且无效的
	- 不可重复读：对于两个事务T1,T2，T1读取了一个字段，然后T2更新了该字段，T1再读取同一个字段，值就不同了
	- 幻读：对于两个事务T1,T2，T1从一个表中读取了一个字段，然后T2在该表中插入了一些新的行，如果T1再次读取同一个表，就会多出几行
- 一个事务其他事务隔离的程度称为隔离级别：隔离级别越高，数据库一致性越好，但并发性越弱

#### 5.5 四种隔离级别

- 数据库提供的4种事务隔离级别：
	- READ UNCOMMITTED（读取未提交数据）：允许事务读取未被其他事务提交的变更，脏读、不可重复读、幻读都不能解决
	- READ COMMITED(读取已提交数据)：可以避免脏读，但不可重复读和幻读都不能避免
	- REPEATABLE READ（可重复读）：可以避免脏读和可重复度，但幻读不能避免
	- SERIALIZABLE（串行化）：所有并发问题都可以避免，但性能十分低下
- Oracle支持的两种事务隔离级别：READ COMMITED，SERIALIZABLE。默认隔离级别为READ COMMITED
- MySQL支持四种事务隔离级别。默认隔离级别为REPEATABLE READ

#### 5.6 在MySQL中设置隔离级别

- 每启动一个mysql程序就会获得一个单独的数据库连接，每个数据库连接都有一个全局变量@@tx_isolation，表示当前事务的隔离级别

- 查看当前事务的隔离级别

	```mysql
	SELECT @@tx_isolation;
	```

- 设置当前MySQL连接的隔离级别

	```mysql
	SET transaction isolation level read committed;
	```

- 设置数据库系统的全局的隔离级别

	```mysql
	- SET global transaction isolation level read commited;
	```

## 第6章 DAO及相关实现类

- DAO：Data Access Object 访问数据信息的类和接口，包括了对数据的CRUD，而不包含任何业务相关的信息
- 作用：为了实现功能的模块化，更有利于代码的维护和升级
- 以JXGL数据库student表为例：
	- baseDAO.java 实现通用的增删改查操作
	- S_TableDAO.java 为具体表的接口，声明业务逻辑中需要用到的方法
	- S_TableDAOImpl.java 继承baseDAO类并实现S_TableDAO接口，编写具体的方法逻辑
	- S_TableDAOImplTest.java 实现具体的业务逻辑

## 第7章 数据库连接池

#### 7.1 JDBC数据库连接池的必要性

- 在使用开发基于数据库的web程序时，传统的模式基本是按以下步骤：
	- 在主程序（servlet、beans）中建立数据库连接
	- 进行sql操作
	- 断开数据库连接
- 这种模式开发存在的问题：
	- 普通的JDBC数据库连接使用DriverManager来获取，每次向数据库建立连接的时候都要将Connection加载到内存中，再验证用户名和密码（得花费0.05s~1s的时间），需要数据库连接的时候就想数据库要求一个，执行完成后再断开，这样的方式会消耗大量的时间和资源。数据库的连接资源并没有得到很好的重复利用。若同时有几百或几千人在线，频繁的进行数据库连接操作将占用很多的系统资源，严重的甚至会造成服务器的崩溃
	- 对于每一次数据库连接，使用完后都得断开连接，否则如果程序出现异常而未能关闭，将会导致数据库系统中的内存泄漏，最终导致重启数据库
	- 这种开发不能控制被创建的连接对象数，系统资源会被毫无顾忌的分配出去，如连接过多，也可能导致内存泄漏，服务器崩溃

#### 7.2 数据库连接池技术

- 未解决传统开发中的数据库连接问题，可以采用数据库连接池技术

- 数据库连接池的基本思想：就是为数据库连接建立一个缓冲池，预先在缓冲池中放入一定数量的连接，当需要连接数据库时，从缓冲池中取出一个，使用完毕之后再放回去

- 数据库连接池负责分配、管理和释放数据库连接，它允许应用程序重复使用一个现有的数据库连接，而不是重新建立一个

- 数据库连接池在初始化时将创建一定数量的数据库连接放到连接池中，这些数据库连接的数量是由最小数据库连接数来设定的，无论这些数据库连接是否被使用，连接池都将一直保证至少拥有那么多的连接数量。连接池的最大数据库连接数量限定了这个连接池能占有的最大连接数，当应用程序向连接池请求的连接数超过最大连接数量时，这些请求将被加入到等待队列中

- 工作原理

	![](C:\Users\67090\Desktop\Typora\JDBC\数据库连接池工作原理.png)

- 数据库连接池技术的优点

	1.资源重用

	由于数据库连接得以重用，避免了频繁创建，释放连接引起的大量性能开销，在减少系统消耗的基础上，另一方面也增加了系统运行的平稳性

	2.更快的系统反应速度

	数据库连接池在初始化过程中，往往已经创建了若干数据库连接至于连接池中备用，此时连接的初始化工作均已完成，对于业务请求处理而言，直接利用现有可用连接，避免了数据库连接初始化和释放过程的时间开销，从而减少了系统的相应时间

	3.新的资源分配手段

	对于多应用共享同一数据库的系统而言，可在应用层通过数据库连接的配置，实现某一应用最大可用数据库连接数的限制，避免某一应用独占所有的数据库资源

	4.统一的连接管理，避免数据库连接泄露

	在较为完善的数据库连接池实现中，可根据预先的占用超时设定，强制回收被占用的连接，从而避免了常规数据库连接操作中可能出现的资源泄露问题

#### 7.3 多种开源的数据库连接池

- JDBC的数据库连接池使用 javax.sql.DataSource 来表示，DataSource只是一个接口，该接口通常由服务器（Weblogic,WebSphere,Tomcat）提供实现，也有一些开源组织提供实现：
	- DBCP 是Apache提供的数据库连接池。tomcat服务器自带dbcp数据库连接池。速度相对c3p0较快，但因自身存在BUG，Hibernate已不再提供支持
	- C3P0 是一个开源组织提供的一个数据库连接池，速度相对较慢，稳定性还可以。Hibernate官方推荐使用
	- Proxool 是sourceforge下的一个开源项目数据库连接池，有监控连接池状态的功能，稳定性较c3p0差一点
	- BoneCP 是一个开源组织提供的数据库连接池，速度快
	- Druid 是阿里提供的数据库连接池，据说是集DBCP、C3P0、Proxool优点于一身的数据库连接池，但是速度不确定是否有BoneCP快
- Hibernate 是一个开放源代码的对象关系映射框架，它对JDBC进行了非常轻量级的对象封装，它将POJO与数据库表建立映射关系，是一个全自动的orm框架
- DataSource通常被称为数据源，它包含连接池和连接池管理两个部分，习惯上也经常把DataSource称为连接池，用来取代DriverManager来获取Connection，获取速度快，同时可以大幅度提高数据库访问速度

## 第8章 Apache-DBUtils实现CRUD操作

#### 8.1 Apache-DBUtils简介

- commons-dbutils是Apache组织提供的一个开源JDBC工具库类，它是对JDBC的简单封装，学习成本极低，并且使用dbutils能极大简化jdbc编码的工作量，同时也不会影响程序的性能