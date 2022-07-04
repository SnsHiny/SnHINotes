# Maven作用

- 管理依赖
	- jar包的管理，下载，版本更新
- 构建项目
	- 完成项目代码的编译，测试，打包和部署
- 管理项目信息

# Maven工程约定的目录结构

- 每个Maven工程都是一个文件夹
- 目录结构
	- |---src		#源代码
	- |---|---main        #主程序
	- |---|---|---java        #主程序的java源码
	- |---|---|---resources        #主程序的配置文件
	- |---|---test        #测试
	- |---|---|---java        #测试的java源码
	- |---|---|---resources        #测试的配置文件
	- |---pom.xml        #maven的核心文件

# pom文件

- 即Project Object Model项目对象模型，Maven把一个项目的结构和内容抽象成一个模型，在xml文件中进行声明，以方便进行构建和描述，pom.xml是Maven的灵魂
- 基本信息
	- modelVersion：Maven模型的版本，对于Maven2和Maven3来说，它只能是4.0.0
	- groupId：组织id，一般是公司域名倒写
	- artifactId：项目名称，也是模块名称，对应groupId中项目中的子项目
	- version：项目的版本号。如果项目还在开发中，是不稳定版本，通常在版本后带-SNAPSHOT
	- packaging：项目打包的类型，可以是jar、war、rar、ear、pom，默认是jar
	- dependencies和dependency：Maven的一个重要作用就是管理jar包，为了一个项目可以构件或运行，项目中不可避免的，会依赖很多其他的jar包，在Maven中，这些jar就被称为依赖，使用dependency来配置。而这种依赖的配置正是通过坐标来定位的
	- properties：用来定义一些配置属性，例如project.build.sourceEncoding（项目构件源码编码方式），可以设置为UTF-8，防止中文乱码，也可定义相关构建版本号，便于日后统一升级
	- build：表示与构建相关的配置，例如设置编译插件的jdk版本
	- parent：在Maven中，如果多个模块都需要声明相同的配置，例如groupId、version、有相同的依赖或者相同的组件配置等，也有类似Java的继承机制，parent声明要继承的父工程的pom配置
	- modules：在Maven的多模块开发中，为了统一构建整个项目的所有模块，可以提供一个额外的模块，该模块打包方式为pom，并且在其中使用modules聚合的其他模块，这样通过本模块就可以一键自动识别模块间的依赖关系来构建所有模块，叫Maven的聚合
- groupId、artifactId、version三个元素生成了一个Maven项目的基本坐标，在众多的maven项目中可以唯一定位到某一个项目。坐标也决定着将来项目在仓库中的路径及名称
- 搜索使用的中央仓库：https://mvnrepository.com/

# 依赖的范围

- 依赖的范围：compile、test、provided，默认采用compile

	|                    | compile | test | provided |
	| ------------------ | :------ | ---- | -------- |
	| 对主程序是否有效   | 是      | 否   | 是       |
	| 对测试程序是否有效 | 是      | 是   | 是       |
	| 是否参与打包       | 是      | 否   | 否       |
	| 是否参与部署       | 是      | 否   | 否       |

	

# 常用指令

- Maven提供一个项目构建的模型，把编译、测试、打包、部署等都对应成一个个的生命周期阶段，并对每一个阶段提供相应的命令，程序员只需要掌握一小堆命令，就可以完成项目的构建过程
- mvn clean
	- 清理，会删除原来编译和测试的目录，即target目录，但是已经install到仓库里的包不会删除

- mvn compile
	- 编译src/main目录下的所有java程序
	- 初次编译会从中央仓库（https://repo.maven.apache.org）中下载大量maven工具执行操作中需要用到的插件（jar包），下载的内容放入本机仓库（C:\Users\67090\.m2\repository）中
		- 修改本机仓库位置的方法
			- 备份conf/settings.xml
			- 修改settings.xml中的<localRepository>，指定更改后的目录
	- 结果是在项目的根目录下生成target目录（结果目录），maven编译的java程序，最后的class文件都放在target目录中

- mvn test-compile
	- 编译测试程序，会在当前目录下生成一个target，里边存放编译测试程序之后生成的字节码文件
- mvn test
	- 测试，会生成一个surefire-reports目录，保存测试结果
- mvn package
	- 打包主程序，会编译、编译测试、测试、并且按照pom.xml配置把主程序打包生成jar包或者war包
- mvn install
	- 安装主程序，会把本工程打包，并且按照本工程的坐标保存到本地仓库中
- mvn deploy
	- 部署主程序，会把本工程打包，按照本工程的坐标保存到本地仓库中，并且还会保存到私服仓库中，还会自动把项目部署到web容器中
- 执行以上命令必须在命令行进入pom.xml所在目录

# 常用操作

- maven的属性设置

	- <properties>中设置maven的常用属性

- maven的全局变量

	- 在<properties>中通过自定义标签声明变量（标签名就是变量名）
	- 在pom.xml文件中的其他位置，使用${标签名}使用变量的值

- 自定义全局变量一般是定义依赖的版本号，当你的项目中要使用多个相同的版本号时，先使用全局变量定义，再使用${变量名}

- 指定资源位置

	- src/main/java和src/test/java这两个目录中的所有*.java文件会分别在compile和test-compile阶段被编译，编译结果分别放到了target/classes和target/test-classes目录目录中，但是这两个目录中的其他文件都会被忽略掉，如果需要把src目录下的文件包放到target/classes目录，作为输出的jar的一部分，需要指定资源文件位置。以下内容放到<build>标签中

		```xml
		<resources>
		  <resource>
		    <directory>src/main/java</directory><!-- 所在的目录 -->
		    <includes><!-- 包括目录下的.properties .xml文件都会扫描到 -->
		      <include>**/*.properties</include>
		      <include>**/*.xml</include>
		    </includes>
		    <!-- filtering选项false不启用过滤器，*.property已经起到过滤的作用-->
		    <filtering>false</filtering>
		  </resource>
		</resources>
		```