# 响应式开发

## 原理

- 使用媒体查询针对不同宽度的设备进行布局和样式的设置，从而适配不同设备的目的

	| 设备划分                 | 尺寸区间             |
	| ------------------------ | -------------------- |
	| 超小屏幕（手机）         | < 768px              |
	| 小屏设备（平板）         | >= 768px ~ < 992px   |
	| 中等屏幕（桌面显示器）   | >= 992px ~  < 1200px |
	| 宽屏设备（大桌面显示器） | >= 1200px            |

## 响应式布局容器

- 响应式需要一个父级作为布局容器，来配合子级元素来实现变化效果
- 原理就是在不同屏幕下，通过媒体查询来改变这个布局容器的大小，再改变里面子元素的排列方式和大小，从而实现不同屏幕下，看到不同的页面布局和样式变化
- 响应式尺寸划分
	- 超小屏幕（手机，小于768px）：设置宽度为100%
	- 小屏幕（平板，大于等于768px）：设置宽度为750px
	- 中等屏幕（桌面显示器，大于等于992px）：宽度设置为970px
	- 大屏幕（大桌面显示器，大于等于1200px）：宽度设置为1170px

### 代码演示

```html
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>响应式布局原理</title>
    <style>
        .container {
            height: 150px;
            background-color: pink;
            margin: 0 auto;
        }
        /* 媒体查询 */
        /*  - 超小屏幕（手机，小于768px）：设置宽度为100%  */
        @media screen and (max-width: width 767px) {
            .container {
                width: 100%;
            }
        }
        /*  - 小屏幕（平板，大于等于768px）：设置宽度为750px  */
        @media screen and (min-width: 768px) {
            .container {
                width: 750px;
            }
        }
        /*  - 中等屏幕（桌面显示器，大于等于992px）：宽度设置为970px  */
        @media screen and (min-width: 992px) {
            .container {
                width: 970px;
            }
        }
        /*  - 大屏幕（大桌面显示器，大于等于1200px）：宽度设置为1170px  */
        @media screen and (min-width: 1200px) {
            .container {
                width: 1170px;
            }
        }
    </style>
</head>
<body>
    <!-- 响应式开发里面首先需要一个布局容器 -->
    <div class="container"></div>
</body>
```

## 案例分析

- 当屏幕大于等于768像素，给布局容器container宽度为750px

- container里面包含9个小li盒子，每个盒子的宽度定位83.33px（750/9），高度为30px，浮动一行显示

- 当屏幕缩放，宽度小于768像素时，container盒子宽度修改为100%宽度

- 此时里面的9个li，宽度修改为33.33%，这样一行就只能显示3个li，剩余下行显示

	```html
	<head>
	    <meta charset="UTF-8">
	    <meta name="viewport" content="width=device-width, initial-scale=1.0">
	    <title>案例演示</title>
	    <style>
	        * {
	            padding: 0;
	            margin: 0;
	        }
	
	        li {
	            list-style: none;
	        }
	
	        .container {
	            width: 750px;
	            margin: 0 auto;
	        }
	
	        .container ul li {
	            float: left;
	            width: 83.33px;
	            height: 30px;
	            background-color: green;
	            color: white;
	        }
	
	        @media screen and (max-width: 767px) {
	            .container {
	                width: 100%;
	            }
	            .container ul li {
	                width: 33.33%;
	            }
	        }
	    </style>
	</head>
	<body>
	    <div class="container">
	        <ul>
	            <li>导航栏</li>
	            <li>导航栏</li>
	            <li>导航栏</li>
	            <li>导航栏</li>
	            <li>导航栏</li>
	            <li>导航栏</li>
	            <li>导航栏</li>
	            <li>导航栏</li>
	            <li>导航栏</li>
	        </ul>
	    </div>
	</body>
	```

# BootStrap

- BootStrap来自Twitter，是目前最受欢迎的前端框架，其基于HTML，CSS，JS，简洁灵活，使得Web开发更加快捷，偏向于响应式布局，移动设备优先的WEB项目
- 中文官网：https://bootstrap.css88.com/
- 优点
	- 标准化的html+css编码规范
	- 提供了一套简介、直观、强悍的组件
	- 有自己的生态圈，不断的更新迭代
	- 让开发更简单，提高了开发的效率

- html文件编写基础代码

	```html
	<!DOCTYPE html>
	<html lang="en">
	<head>
	    <meta charset="UTF-8">
	    <!-- 要求当前网页用使用IE浏览器最高版本的内核来渲染 -->
	    <meta http-equiv="X-UA-Compatible" content="IE=edge">
	    <!-- 视口的设置：视口的宽度和设备一致，默认的缩放比例和PC端一致，用户不能自行缩放 -->
	    <meta name="viewport" content="width=device-width, initial-scale=1">
	    <title>Bootstrap_01</title>
	    <!-- 引入bootstrap的样式文件 -->
	    <link rel="stylesheet" href="bootstrap/css/bootstrap.min.css">
	</head>
	<body>
	    123
	</body>
	</html>
	```


## 布局容器

- BootStrap需要为页面内容和栅格系统报过一个.container容器，BootStrap预先定义好了这个类叫.container，它提供了两个作此用处的类
	- container类
		- 响应式布局的容器，固定宽度
		- 超小屏幕（手机，小于768px）：设置宽度为100%
		- 小屏幕（平板，大于等于768px）：设置宽度为750px
		- 中等屏幕（桌面显示器，大于等于992px）：宽度设置为970px
		- 大屏幕（大桌面显示器，大于等于1200px）：宽度设置为1170px
	- container-fluid类
		- 流式布局容器，百分百宽度
		- 占据全部视口（viewport）的容器
		- 适用于单独做移动端开发

## 栅格系统

- 栅格系统（grid  systems），是指将页面布局划分为等宽的列，然后通过列数的定义来模块化页面布局
- Bootstrap提供了一套响应式、移动设备优先的流式栅格系统，随着屏幕或视口尺寸的增加，系统会自动分为最多12列
- Bootstrap里面container宽度是固定的，但是不同屏幕下，container的宽度不同，我们再把container划分为12等份

### 选项参数

- 栅格系统用于通过一系列的行和列的组合来创建页面布局，内容放入这些创建好的布局中

	|                    | < 768px      | >=768px  | >=992px  | >=1120px |
	| ------------------ | ------------ | -------- | -------- | -------- |
	| .container最大宽度 | 自动（100%） | 750px    | 970px    | 1170px   |
	| 类前缀             | .col-xs-     | .col-sm- | .col-md- | .col-lg- |
	| 列数               | 12           | 12       | 12       | 12       |

- 行必须放到container布局容器里面

- 实现列的平均划分需要给列添加类前缀

- xs-extra small：超小；sm-small：小；md-medium：中等；lg-large：大

- 列大于12，多余的列所在的元素将被作为一个整体另起一行排列

- 每一列默认有左右15像素的padding

- 可以同时为一列指定多个设备的类名，以便划分不同份数

	```html
	<div class="container">
	    <div class="box col-lg-3 col-md-4 col-sm-6 col-xs-12"></div>
	    <div class="box col-lg-3 col-md-4 col-sm-6 col-xs-12"></div>
	    <div class="box col-lg-3 col-md-4 col-sm-6 col-xs-12"></div>
	    <div class="box col-lg-3 col-md-4 col-sm-6 col-xs-12"></div>
	</div>
	```

### 列嵌套

- 栅格系统内置的栅格系统将内容再次嵌套。就是一个列内再分成若干份小列，可以添加一个新的.row元素和一系列.col-sm-元素到已经存在的.col-sm-元素内

- 列嵌套最好加一行row，这样可以取消父元素的padding值，而且高度和父级一样高

	```html
	<div class="box col-lg-3 col-md-4 col-sm-6 col-xs-12">
	    <div class="row">
	        <div class="box1 col-sm-6"></div>
	        <div class="box1 col-sm-6"></div>
	    </div>
	</div>
	```

### 列偏移

- 只用.col-md-offset-类可以将列向右侧偏移，这些类实际是使用选择器为当前元素增加了左侧的外边距

	```html
	<div class="container">
	    <div class="box col-md-4"></div>
	    <div class="box col-md-4 col-md-offset-4"></div>
	</div>
	```

### 列排序

- 使用.col-md-push-和.col-md-pull-类改变类的顺序

	```HTML
	<div class="container">
	    <div class="box col-md-4 col-md-push-8"></div>
	    <div class="box col-md-8 col-md-pull-4"></div>
	</div>
	```

### 响应式工具

- 为了加快对移动设备友好的页面开发工作，利用媒体查询功能，并使用这些工具类可以方便的针对不同设备展示或隐藏页面内容

	| 类名       | 超小屏 | 小屏 | 中屏 | 大屏 |
	| ---------- | ------ | ---- | ---- | ---- |
	| .hidden-xs | 隐藏   | 可见 | 可见 | 可见 |
	| .hidden-sm | 可见   | 隐藏 | 可见 | 可见 |
	| .hidden-md | 可见   | 可见 | 隐藏 | 可见 |
	| .hidden-lg | 可见   | 可见 | 可见 | 隐藏 |

- 与之相反的是visible-xs、visible-sm、visible-md、visible-lg是显示某个页面内容