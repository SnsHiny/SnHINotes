# Docker

[官网]: https://docs.docker.com/

## 概述

### 基本介绍

- Docker是一个开源的应用容器引擎，基于Go语言并遵从Apache2.0协议开源
- Docker开源让开发者打包他们的应用以及依赖包到一个轻量级、可移植的容器中，然后发布到任何流行的Linux机器上，也可以实现虚拟化
- 容器是完全使用沙箱机制，互相之间不会有任何接口，更重要的是容器性能开销极低

### 应用场景

- Web应用的自动化打包和发布
- 自动化测试和持续集成、发布
- 在服务型环境中部署和调整数据库或其他的后台应用
- 从头编译或者扩展现有的 OpenShift 或 Cloud Foundry 平台来搭建自己的 PaaS 环境

### 优势

- 快速，一致地交付应用程序

	- Docker允许开发人员使用自己提供的应用程序或服务的本地容器在标准化环境中工作，从而简化了开发的生命周期，容器非常适合持续集成和持续交付

		[^示例方案]: 您的开发人员在本地编写代码，并使用 Docker 容器与同事共享他们的工作。 他们使用 Docker 将其应用程序推送到测试环境中，并执行自动或手动测试。 当开发人员发现错误时，他们可以在开发环境中对其进行修复，然后将其重新部署到测试环境中，以进行测试和验证。 测试完成后，将修补程序推送给生产环境，就像将更新的镜像推送到生产环境一样简单

- 响应式部署和扩展
	
	- Docker是基于容器的平台，允许高度可移植的工作负载。Docker容器可以在开发人员的本机上，数据中心的物理或虚拟机上，云服务上或混合环境中运行。Docker的可移植性和轻量级的特性还可以使程序员轻松的完成动态管理的工作负担，并根据业务需求指示，实时扩展或拆除应用程序和服务
- 在同一硬件上运行更多工作负载
	
	- Docker轻巧快速，它为基于虚拟机管理程序的虚拟机提供了可行、经济、高效的替代方案，因此可以利用更多的计算能力来实现业务目标。Docker非常适合于高密度环境以及中小型部署，可以让程序员用更少的资源做更多的事情

### 基本组成

![](C:\Users\67090\Desktop\Typora\Docker\图片\Docker基本组成.png)

- 镜像（image）

	- Docker镜像就好比是一个模板，可以通过这个模板来创建多个容器服务

- 容器（container）

	- Docker利用容器技术，独立运行一个或者一组应用，通过镜像来创建
	- 最终服务运行或者项目运行就是在容器中

- 仓库（repository）

	- 存放镜像的地方
- 分为共有仓库和私有仓库

## 虚拟化技术和容器化技术

### 虚拟化技术

- 资源占用多
- 冗余步骤多
- 启动慢

### 容器化技术

- 容器化技术不是模拟一个完成的操作系统
- 应用更快速的交付和部署
	- 传统方式：通过大量帮助文档安装程序
	- Docker：打包、镜像、发布、测试，一键运行
- 更便捷的升级和扩缩容
	- 使用Docker之后，部署应用就像搭积木一样
- 更简单的系统运维
	- 容器化之后，开发环境和测试环境都是高度一致的
- 更高效的计算资源利用
	- Docker是内核级别的虚拟化，可以在一个物理机上运行很多的容器实例，服务器的性能可以被压榨到极致

### 比较

- 传统虚拟机，虚拟出硬件，运行一个完整的操作系统，然后在这个系统上安装和运行软件
- Docker容器内的应用直接运行在宿主机的内容中，容器是没有自己的内核的，也没有虚拟硬件，每个容器都是相互隔离的，每个容器都有属于自己的文件系统，互不影响

## 安装与卸载

- 以管理员身份启动CentOS虚拟机

	- 用户名：root
	- 密码：13456191231sh

- 启动Xshell并连接linux地址

	[连接异常解决方法汇总]: https://blog.csdn.net/weixin_44080445/article/details/110714332

- 查看系统内核

	```shell
	[root@snhi ~]# uname -r
	3.10.0-1127.el7.x86_64
	```

- 查看系统配置

	```shell
	[root@snhi ~]# cat /etc/os-release
	NAME="CentOS Linux"
	VERSION="7 (Core)"
	ID="centos"
	ID_LIKE="rhel fedora"
	VERSION_ID="7"
	PRETTY_NAME="CentOS Linux 7 (Core)"
	ANSI_COLOR="0;31"
	CPE_NAME="cpe:/o:centos:centos:7"
	HOME_URL="https://www.centos.org/"
	BUG_REPORT_URL="https://bugs.centos.org/"
	
	CENTOS_MANTISBT_PROJECT="CentOS-7"
	CENTOS_MANTISBT_PROJECT_VERSION="7"
	REDHAT_SUPPORT_PRODUCT="centos"
	REDHAT_SUPPORT_PRODUCT_VERSION="7"
	```

- 卸载旧版本

	```shell
	yum remove docker \
	                  docker-client \
	                  docker-client-latest \
	                  docker-common \
	                  docker-latest \
	                  docker-latest-logrotate \
	                  docker-logrotate \
	                  docker-engine
	```

- 用yum安装包时若提示 Another app is currently holding the yum lock，强制关掉yum进程

	```shell
	rm -f /var/run/yum.pid
	```

- 需要的安装包

	```shell
	yum install -y yum-utils
	```

- 设置镜像仓库

	```shell
	# 国外的地址
	yum-config-manager \
	    --add-repo \
	    https://download.docker.com/linux/centos/docker-ce.repo  
	    
	# 设置阿里云的Docker镜像仓库
	yum-config-manager \
	    --add-repo \
	    https://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
	```

- 更新yum软件包索引

	```shell
	yum makecache fast
	```

- 安装docker相关的配置

	```shell
	# docker-ce：社区版；docker-ee：企业版
	yum install docker-ce docker-ce-cli containerd.io
	```

- 启动docker

	```shell
	systemctl start docker
	```

- 查看当前版本号，是否启动成功

	```shell
	[root@snhi ~]# docker version
	Client: Docker Engine - Community
	 Version:           20.10.13
	 API version:       1.41
	 Go version:        go1.16.15
	 Git commit:        a224086
	 Built:             Thu Mar 10 14:09:51 2022
	 OS/Arch:           linux/amd64
	 Context:           default
	 Experimental:      true
	
	Server: Docker Engine - Community
	 Engine:
	  Version:          20.10.13
	  API version:      1.41 (minimum version 1.12)
	  Go version:       go1.16.15
	  Git commit:       906f57f
	  Built:            Thu Mar 10 14:08:16 2022
	  OS/Arch:          linux/amd64
	  Experimental:     false
	 containerd:
	  Version:          1.5.10
	  GitCommit:        2a1d4dbdb2a1030dc5b01e96fb110a9d9f150ecc
	 runc:
	  Version:          1.0.3
	  GitCommit:        v1.0.3-0-gf46b6ba
	 docker-init:
	  Version:          0.19.0
	  GitCommit:        de40ad0
	```

- 设置开机自启动

	```shell
	systemctl enable docker
	```

- 下载hello-world镜像进行测试

	```shell
	docker run hello-world
	```

- 查看镜像

	```shell
	[root@snhi ~]# docker images
	REPOSITORY    TAG       IMAGE ID       CREATED        SIZE
	hello-world   latest    feb5d9fea6a5   5 months ago   13.3kB
	```

- 卸载依赖

	```shell
	yum remove docker-ce docker-ce-cli containerd.io
	```

- 删除资源（  . /var/lib/docker是docker的默认工作路径）

	```shell
	rm -rf /var/lib/docker
	```

### 阿里云镜像加速

- 进入阿里云官网，搜索容器镜像服务

	[容器镜像服务]: https://cr.console.aliyun.com/cn-hangzhou/instances/mirrors

- 配置镜像加速器

	```sheel
	sudo mkdir -p /etc/docker
	sudo tee /etc/docker/daemon.json <<-'EOF'
	{
	  "registry-mirrors": ["https://eoal6ghx.mirror.aliyuncs.com"]
	}
	EOF
	sudo systemctl daemon-reload
	sudo systemctl restart docker
	```

### 底层

### 运行流程

![image-20220316145345497](C:\Users\67090\Desktop\Typora\Docker\图片\Docker运行流程.png)

### 工作原理

- Docker是一个Client-Server结构的系统，Docker的守护进程运行在主机上，通过Socker从客户端访问。Docker Server接收到Docker Client的指令，就会执行这个指令

	![image-20220316150120365](C:\Users\67090\Desktop\Typora\Docker\图片\Docker工作原理.png)

### 与VM Ware比较

- Docker比虚拟机有更少的抽象层

- Docker利用宿主机的内核，VM需要的是Guest OS

	![image-20220316150259761](C:\Users\67090\Desktop\Typora\Docker\图片\Docker比较VM.png)

- Docker新建一个容器的时候，不需要像虚拟机一样重新加载一个操作系统内核，直接利用宿主机的操作系统，而虚拟机是需要加载Guest OS

	![image-20220316150411054](C:\Users\67090\Desktop\Typora\Docker\图片\Docker比较VM表格.png)

## Docker命令

[帮助文档]: https://docs.docker.com/engine/reference/commandline/docker/

### 基础命令

```shell
docker version            # 查看docker的版本信息
docker info               # 查看docker的系统信息，包括镜像和容器的数量
docker [命令] --help       # 帮助命令(可查看可选的参数)
```

### 镜像命令

- docker images：查看本地主机的所有镜像

	```shell
	[root@iZwz99sm8v95sckz8bd2c4Z ~]# docker images
	REPOSITORY    TAG       IMAGE ID       CREATED         SIZE
	hello-world   latest    bf756fb1ae65   11 months ago   13.3kB
	# 解释:
	# REPOSITORY  镜像的仓库源
	# TAG  镜像的标签
	# IMAGE ID 镜像的id
	# CREATED 镜像的创建时间
	# SIZE 镜像的大小
	
	
	# 可选参数
	-a/--all 列出所有镜像
	-q/--quiet 只显示镜像的id
	```

- docker search：搜索镜像

	```shell
	[root@iZwz99sm8v95sckz8bd2c4Z ~]# docker search mysql
	
	#可选参数
	Search the Docker Hub for images
	Options:
	  -f, --filter filter   Filter output based on conditions provided
	      --format string   Pretty-print search using a Go template
	      --limit int       Max number of search results (default 25)
	      --no-trunc        Don't truncate output
	      
	#搜索收藏数大于3000的镜像
	[root@iZwz99sm8v95sckz8bd2c4Z ~]# docker search mysql --filter=STARS=3000
	```

- docker pull 镜像名[:tag]：下载镜像

	```shell
	[root@iZwz99sm8v95sckz8bd2c4Z ~]# docker pull mysql
	Using default tag: latest        #如果不写tag默认就是latest
	latest: Pulling from library/mysql
	6ec7b7d162b2: Pull complete      #分层下载,docker image的核心-联合文件系统
	fedd960d3481: Pull complete
	7ab947313861: Pull complete
	64f92f19e638: Pull complete
	3e80b17bff96: Pull complete
	014e976799f9: Pull complete
	59ae84fee1b3: Pull complete
	ffe10de703ea: Pull complete
	657af6d90c83: Pull complete
	98bfb480322c: Pull complete
	6aa3859c4789: Pull complete
	1ed875d851ef: Pull complete
	Digest: sha256:78800e6d3f1b230e35275145e657b82c3fb02a27b2d8e76aac2f5e90c1c30873 #签名
	Status: Downloaded newer image for mysql:latest
	#下载来源的真实地址  
	docker.io/library/mysql:latest  
	#docker pull mysql 等价于 docker pull docker.io/library/mysql:latest
	```

	```shell
	# 指定版本下载
	[root@iZwz99sm8v95sckz8bd2c4Z ~]# docker pull mysql:5.7
	```

- docker rmi：删除镜像

	```shell
	# 删除指定的镜像id
	[root@iZwz99sm8v95sckz8bd2c4Z ~]# docker rmi -f  镜像id
	# 删除多个镜像id
	[root@iZwz99sm8v95sckz8bd2c4Z ~]# docker rmi -f  镜像id 镜像id 镜像id
	# 删除全部的镜像id
	[root@iZwz99sm8v95sckz8bd2c4Z ~]# docker rmi -f  $(docker images -aq)
	```

### 容器命令

- 运行容器

	```shell
	docker run [可选参数] image
	#参数说明
	--name="名字" # 指定容器名字
	-d           # 后台方式运行
	-it          # 使用交互方式运行,进入容器查看内容
	-p           # 指定容器的端口
	(
	    -p ip:主机端口:容器端口  # 配置主机端口映射到容器端口
	    -p 主机端口:容器端口
	    -p 容器端口
	)
	-P           # 随机指定端口(大写的P)
	```

- 运行并进入容器

	```shell
	docker run -it [镜像名] /bin/bash
	```

- 进入容器

	```shell
	docker exec -it [容器ID] /bin/bash
	```
	
- 退出容器

	```shell
	#exit 停止并退出容器（后台方式运行则仅退出）
	#Ctrl+P+Q  不停止容器退出
	[root@bd1b8900c547 /]# exit
	```

- 列出运行过的容器

	```shell
	docker ps  # 列出当前正在运行的容器
	-a         # 列出所有容器的运行记录
	-n=?       # 显示最近创建的n个容器
	-q         # 只显示容器的编号
	```

- 删除容器

	```shell
	docker rm 容器id       #删除指定的容器,不能删除正在运行的容器,强制删除使用 rm -f
	docker rm -f $(docker ps -aq)    #删除所有的容器
	docker ps -a -q|xargs docker rm  #删除所有的容器
	```

- 启动和停止容器

	```shell
	docker start 容器id          #启动容器
	docker restart 容器id        #重启容器
	docker stop 容器id           #停止当前运行的容器
	docker kill 容器id           #强制停止当前容器
	```

### 其他命令
