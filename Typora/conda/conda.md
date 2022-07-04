# conda

## 安装

- 在Linux环境下下载

	[^命令]: wget -c https://repo.continuum.io/miniconda/Miniconda3-latest-Linux-x86_64.sh

- 赋予执行权限

	```shell
	chmod 777 Miniconda3-latest-Linux-x86_64.sh
	```

- 运行

	```shell
	sh Miniconda3-latest-Linux-x86_64.sh
	```

- 使bashrc文件生效

	```shell
	source ~/.bashrc
	```

- 安装成功

	![image-20220404155407091](C:\Users\67090\Desktop\Typora\conda\图片\conda安装成功示例.png)

## 使用

- 创建环境

	```shell
	conda create -n 环境名 python=版本号
	```

	![image-20220404163004111](C:\Users\67090\Desktop\Typora\conda\图片\conda环境创建成功示例.png)

- 查看已有环境

	```shell
	conda env list
	```

- 进入环境

	```shell
	conda activate node14env
	```

- 退出环境

	```shell
	conda deactivate
	```

	