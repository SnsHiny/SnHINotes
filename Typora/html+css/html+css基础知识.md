

# 网页基础

##  字符实体

- &nbsp;空格，&lt;小于号，&gt;大于号，&quot;双引号，&amp;符号 


##  常见的浏览器内核

- Trident（三叉戟）：IE，百度，360，UC，搜狗

- Gecko（壁虎）：火狐

- Presto（急板乐曲）：Opera

- Webkit：Safari，Andriod，IOS

- Blink：Google Chrome


##  URL

- 基本格式：protocol://hostname/path=协议://主机地址/路径
	- 协议：不同的协议代表不同的资源查找方式，资源传输方式
		- http：超文本传输协议，访问的是远程的网络资源
		- https：http协议的安全版
		- file：访问的是本地计算机上的资源
		- mailto：访问的是电子邮件地址
		- ftp：访问的是共享主机的文件资源
	- 主机地址：存放资源的主机的IP地址（域名）
	- 路径：资源在主机中的具体位置
- 具体格式：protocol://hostname[:port]/path/[;parameters][?query]#fragment
	- port（端口号）：一台拥有IP地址的主机可以提供许多服务，主机通过"IP地址+端口号"来区分不同的服务，类似于营业厅的窗口，范围0-65525，HTTP默认端口号是80，FTP默认端口号是21
	- query：请求参数，提交给服务器的数据
	- fragment：锚点位置

##  SEO搜索引擎优化

- 定义：利用搜索引擎的规则提高网站在有关搜索引擎内的自然排名

- 分类
	- 白帽：改良网站设计规范，使网站对搜索引擎和用户更加友好
	- 黑帽：利用搜索引擎缺陷和搜索算法来获取更多用户访问量
- 原理
	- 页面抓取：搜索引擎向服务器请求页面获取页面内容，深度抓取，广度抓取
	- 分析过滤：在SEO优化原理中，内容质量低，用户体验不好的网页将被过滤，保留高质量的网页然后存入索引库
	- 检索排序：当用户检索关键词时，从收录的页面中按照一定的规则进行排序，并返回给用户结果，高质量的页面放入重要的索引库中被优先展示，低质量的网页只能存放在普通库中
- 优化方式
	- 整体优化
		- 每个页面抓取几个关键字（一般不超过5个）进行核心优化，不能一个页面做完所有关键字
		- 页面代码结构
			- 提高页面加载速度
			- css，html，js分离，有利于搜索引擎抓取有用的内容
			- 让重要内容优先加载，搜索引擎抓取页面从上到下，从左到右
			- 面包屑导航
		- 四处一词（关键词）
			- title：注意不要堆砌关键字
			- description和keywords：150字以内，介绍关键字相关内容
			- 当前页面第一次出现的时候加粗：h1标签
			- 其他页面的锚文本里：用于传递权重，帮助搜索引擎抓取重要的页面，占整个页面的1%左右
	- 标签优化
		- h1标签：重要程度仅次于title，一个页面只有一个h1标签，其次是h2，h3
		- strong标签：表示强调
		- img标签：关键的图片添加alt属性告诉浏览器图片内容，因为搜索引擎不识别图片
		- a标签：如果链接的页面跟内容没什么关系，添加rel="nofollow"，让搜索引擎不再追踪
		- table标签：不要嵌套过多层，第三层往后，搜索引擎不再读取里面的内容
		- iframe标签：搜索引擎不抓取里面的内容
		- 页面内容不要做成flash，视频，搜索引擎不识别这些
		- 做好404页面

## 前端渲染

- 定义：指浏览器将从后端得到的信息组织排列形成最终可读的HTML字符串并进行显示，渲染工作由浏览器完成
- 优点
	- 服务器只提供接口数据服务，前后分离
	- 不占用服务端资源（解析模板）
	- 方便改版
-  缺点
	- 前端渲染页面内容不能被爬虫识别，除了谷歌搜索引擎
	- 首屏渲染慢，前端模板解析对手机端的负担

## 服务器渲染SSR

- 定义：浏览器直接接收经过服务器计算之后的HTML字符串并呈现给用户，浏览器只进行HTML解析和显示，渲染工作由服务器完成

- 优点
	- 首屏渲染快
	- 利于SEO
	- 可以生成缓存片段，生成静态化文件
	- 节能
- 缺点
	- 不容易维护
	- 无论是运行还是开发，服务器承受的都比较大

## 选择器

- 定义：按照一定的规则选出符合条件的元素，为之添加css样式

- 分类
	- 通用选择器（universal selectors）：用""表示匹配所有元素做一些通用性的设置
	- 元素选择器（type selectors）：匹配该元素类型的每一个实例
	- 类选择器（class selectors）：用"."+类名表示匹配该类名的每一个实例，一个元素可以有多个class，用空格隔开
	- id选择器（id selectors）：用"#"+id名表示匹配该id的每一个实例，id值不能重复
	- 属性选择器（attribute selectors）：用"[title="title名"]"表示匹配该title名的每一个实例，[title="title名"]表示包含该title名
	- 组合（combinators）
		- 后代选择器：A B，匹配后代的所有子元素B（包括直接间接子元素）
		- 子代选择器：A > B，匹配直接子元素B（不包括间接子元素）
		- 毗邻选择器：A + B，匹配紧挨在A后面的兄弟元素B
		- 全兄弟选择器：A ~ B，匹配A后面的所有兄弟元素B
		- 交集选择器：AB，匹配同时符合AB条件的元素
		- 并集选择器：A，B，匹配符合AB条件其中之一的元素
	- 补充
		- p标签内不能包含div标签
		- 行内元素不能设置width和height
- 伪类（pseudo-classes）：向某些选择器添加特殊的效果
	- 动态伪类（dynamic pseudo-classes）
		- :link——未访问的链接
		- :visited——已访问的链接
		- :hover——鼠标挪动到链接上
		- :active——激活的链接（鼠标在链接上长按住未松开）
		- :focus——拥有输入焦点的元素
		- 补充：书写格式建议为:link—→:visited—→:focus—→:hover—→:active
		- 如果要去除a元素的焦点状态，可以给a元素设置tabindex属性等于-1
	- 目标伪类（target pseudo-classes）
		- :target——选中目标锚点连接
	- 语言伪类（language pseudo-classes）
		- :lang()
	- 元素状态伪类（UI elements states pseudo-classes）
		- :enabled——选中可用状态的元素
		- :disabled——选中不可用状态的元素
		- :checked——选中可被选择的元素
	- 结构伪类（structural pseudo-classes）
		- :nth-child(n)——匹配第n个子元素，填n表示匹配所有子元素
		- :nth-last-child(n)——匹配倒数第n个子元素
		- E:nth-of-type(n)——匹配E元素类型的第n个子元素，填n表示匹配所有E元素类型的子元素
		- E:nth-of-last-type(n)——匹配E元素类型的倒数第n个子元素
		- :first-child——等同于:nth-child(1)
		- :last-child——等同于:nth-last-child(1)
		- E:first-of-type——等同于E:nth-of-type(1)
		- E:last-of-type——等同于E:nth-of-last-type(1)
		- :root——根元素，即HTML元素
		- :only-child——匹配父元素中的唯一子元素
		- E:only-of-type——匹配E元素类型的唯一类型子元素
		- :empty——匹配元素内容为空的元素（空格也不行）
	- 否定伪类（negation pseudo-classes）
		- :not(E)——匹配除了E元素以外的元素
- 伪元素（pseudo-elements）：向某些选择器设置特殊效果
	- ::first-line——匹配第一行
	- ::first-letter——匹配第一个单词
	- ::before——在一个元素的内容之前插入其他内容（可以是文字、图片）
	- ::last——在一个元素的内容之后插入其他内容（可以是文字、图片）
	- 补充：后两个伪元素必须设置content属性，用来填写内容

## 表单提交方式

- 服务器渲染（传统的表单提交）
	- 将所有的内容包裹到一个form中
	- form设置action（服务器地址）
	- 设置submit按钮
	- 点击submit按钮，自动将所有的数据提交给服务器
	- 弊端一：会进行页面的跳转，意味着服务器必须提前将一个页面写好，并且将写好的页面返回给前端，前端直接展示这个页面
	- 弊端二：不方便进行表单数据的验证
- 前端渲染（前后端分离）：
	- 通过JavaScript获取到所有表单的内容
	- 通过正则表达式进行表单的验证
	- 发送ajax请求，将数据传递给服务器
	- 验证成功后，服务器返回结果，需要前端解析这个数据，并且决定显示什么内容

## HTML5语义化元素

- header：头部元素
- nav：导航元素
- section：定义文档某个区域的元素
- artical：内容元素
- aside：侧边栏元素
- footer：尾部元素

## rem适配

- 单位rem：相对于根元素（html）的字体大小

- 移动端开发中经常使用rem来进行适配，实现在不同的手机屏幕上进行不同程度的缩放

- 第一步动态设置html的font-size

	- 媒体查询：匹配最小宽度为n的手机型号设置html字体大小为m

		```html
		@media screen and （min-width：npx）{
		    html{
		    	font-size：mpx
		    }
		}
		```

	- 通过js动态计算

- 第二步动态计算rem值

	- 利用vscode插件px to rem快速转化
	- 利用postcss-pxtorem
	- 利用less、sass、stylus的计算能力（css预处理器，对css进行了扩展）

## head头部

- 用来设置元数据（metadata），对网页进行一些基本设置

- meta
	- charset：设置字符编码
	-  name：描述网页
		- keywords：告诉搜索引擎网页的关键字
		- description：告诉搜索引擎网站的主要内容
		- viewport：移动端的窗口
			- content="width=device-width（设备的宽度）,initial-scale=1（缩放倍数）"
		- robots：定义搜索引擎爬虫的索引方式
		- author：标注网页作者
	- content：对应name的描述内容
- title：设置网页标题

- link：导入外部元素
	- rel：声明
		- stylesheet：导入外部css
		- icon：导入网页图标
	- href：导入路径
	- type：类型
- style：设置css样式

- base：整合html内a链接的公共内容


#  css

## 文本属性

- 设置文本装饰线：text-decoration
	- none：无任何装饰线，可以去除a元素默认的下划线
	- underline：下划线
	- overline：上划线
	- line-through：删除线

- 设置字母间距：letter-spacing
- 设置单词间距：word-spacing
- 设置文字大小写转换：text-transform
	- capitalize：将每个单词的首字符变为大写
	- uppercase：将每个单词的所有字符变为大写
	- lowercase：将每个单词的所有字符变为小写
	- none：没有任何影响
- 设置首行缩进：text-indent
	- 设置em为单位，表示相对于当前元素的字体大小
- 设置元素内容在元素中的水平对齐方式：text-align
	- left：居左
	- right：居右
	- center：居中
	- justify：两端对齐
- 设置换行：word-break
	- break-all：全部自动换行
- 设置阴影：text-shadow
	- text-shadow：<shadow>=<length>{2,3}&&<color>?（具体见box-shadow）
- 设置溢出文本：text-overflow
	- white-space用于设置空白处理和换行规则
		- normal：合并所有连续的空白，允许单词超屏时自动换行
		- nowrap：合并所有连续的空白，不允许单词超屏时自动换行
	- text-overflow通常用来设置文字溢出时的行为（处理不可见的内容）
		- clip：溢出的内容直接裁剪掉（字符可能会显示不完整）
		- ellipsis：溢出那行的结尾处用省略号表示
		- 生效的前提是overflow部位visible

- 设置上下标：
	- sub：下标
	- sup：上标

## 字体属性

- 设置字体大小：font-size
	- 设置em或%为单位时，表示相对于父元素的字体大小
	- 设置为rem时，相对于根元素的字体大小
- 设置字体类型：font-family
	- 可以设置一个或多个字体名称，从左往右找，找到可用的字体为止
	- 一般将英文字体写在前面，中文字体写在后面
- 设置文字的粗细：font-weight
	- 设置大小范围100-900，每一个整百数表示一个重量级
	- normal为400，bold为700
- 设置文字的斜体显示：font-style
	- normal：常规显示
	- italic：用文字的斜体显示
	- oblique：文本斜体显示
- 设置小写字母的显示形式：font-varient
	- normal：常规显示
	- small-caps将小写字母替换为缩小过的大写字母
- 设置文本的最小行高：line-height
	- 行高的严格定义是：两行文字基线之间的距离（基线是与小写字母x最底部对齐的线）
	- height是元素的整体高度，line-height是元素中每一行文字所占据的高度，如果要让一行文本在元素中
	- 垂直居中，设置该元素的height等于line-height
- 缩写属性：font
	- font:font-style font-varient font-weight font-size/line-height font-family
	- 前三个可以随意调换顺序也可以省略
	- line-height可以省略，如果写必须写在font-size后面，"/"不能省略
	- font-size font-family不可以调换顺序，不可以省略
- 透明度：rgba
	- rgba(R,G,B,n)
	- n取0-1,0表示完全透明，1表示完全不透明
	- transparent：透明

## 网络字体

- @font-face可以让网页支持网络字体，不再局限于系统自带的字体
- font-family：字体名称
- src：url（网络字体地址）
- 字体下载：https://fonts.google.com/

## 设置元素显示类型

- display
	- block：设置为块级元素
	- inline：设置为行内元素
	- inline-block：行内块元素，同时具备行内和块级元素的特点
	- none：隐藏元素，不占据空间，原来的框会被移除

## 设置隐藏

- visibility：能控制元素的可见性
	- visible：显示元素
	- hidden：隐藏元素，虽然元素看不见，但元素的框依旧还留着，会占据空间
- display：none

- opacity：0（支持动画）


## 设置溢出

- overflow：用于控制内容溢出时的行为
	- visible：溢出时的内容照样可见
	- hidden：溢出的内容直接裁剪
	- scroll：溢出的内容被裁剪，但可以通过滚动机制查看
	- auto：自动根据内容是否溢出来决定是否提供滚动机制

## 设置背景

- background-image：用于设置元素的背景图片
	- URL("..."),URL("..."),URL("...")
	- 会盖在background-color上面（不是覆盖）
	- 如果设置多张图片，多个URL用逗号隔开，设置的第一张图片最上面，其他图片按顺序层叠在下面
	- 注意：如果设置了背景图片后，元素没有具体的高度，背景图片不会显示出来
- background-repeat:设置背景图片是否要平铺
	- repeat：平铺
	- no-repeat：不平铺
	- repeat-x：只在水平方向平铺
	- repeat-y：只在垂直方向平铺
- background-size：设置背景图片的大小
	- auto：以背景图片本身大小显示
	- cover：缩放背景图，以完全覆盖铺满元素
	- contain：缩放背景图，宽度或者高度铺满元素，但是图片保持宽高比
	- <percentage>：百分比，相对于背景区，分别设置宽和高
	- length：具体的大小，分别设置宽和高
- background-position：设置背景图片在水平垂直方向上的具体位置
	- 水平方向可设置：left、center、right
	- 垂直方向可设置：top、center、bottom
	- 如果只设置了一个方向，另一个方向默认是center
- background：linear-gradient(deg,color1,color2)：设置渐变色，在deg角度上从color1渐变为color2

- filter：blur（npx）：高斯模糊


## 盒子模型

- HTML中每一个元素都可以看做是一个盒子

- 内容（content）：盒子里面装的东西
	- 相关属性
		- width：宽度
		- min-width：最小宽度，常用于页面缩小到最小宽度后，显示水平滚动条
		- max-width：最大宽度，常用于内容超过最大宽度后实现换行
		- height：高度
		- min-height：最小高度，当内容大于最小高度时，高度会被内容撑开；页面缩小到最小高度后，显示垂直滚动条
		- max-height：最大高度，但内容大于最大高度时，内容溢出
		- 补充：单位设置为em时，如果自己有设置font-size，则相对于自己的font-size，否则相对于父元素的font-size；设置为%时，相对于父元素的宽度
- 内边距（padding）：盒子边缘和里面装的东西之间的间距
	- 缩写属性padding：padding-top padding-right padding-buttom padding-left
- 边框（border）：盒子的边框，边缘部分
	- 相关属性
		- 边框宽度：border-width（上右下左）
		- 边框颜色：border-color（上右下左）
		- 边框样式：border-style（上右下左）
			- none：没有边框
			- dashed：虚线
			- solid：实线
			- 不常用：dotted、double、groove、ridge、inset、outset
	- 缩写属性：border：border-width border-style border-color
	- 边框妙用：实现矩形、梯形、三角形
	- 设置圆角：border - * - * - radius：npx npx
		- 两个 * 分别表示某个角的具体位置，第一个npx设置水平半径，第二个npx设置垂直半径
		- 可设置百分比，参考当前元素的border+padding+width，border-radius取50%时为一个圆形
- 外间距（margin）：盒子和其他盒子之间的间距
	- 相关属性
		- 缩写属性margin：margin-top margin-right margin-buttom margin-left
		- margin-top单位为%时，相对于父元素的宽度
	- 上下margin传递
		- margin-top传递：如果块级元素的顶部线和父元素的顶部线重叠，那么这个块级元素的margin-top
		- 值会传递给父元素
		- margin-bottom传递：如果块级元素的底部线和父元素的底部线重叠，并且父元素的高度是auto，
		- 那么这个块级元素的margin-bottom值会传递给父元素（不常用）
	- 防止传递方法
		- 给父元素设置padding-top/padding-bottom
		- 给父元素设置border
		- 触发BFC（block format content），设置overflow为auto/hidden
	- 上下margin折叠
		- 垂直方向上相邻的2个margin有可能会合并成1个margin，这种现象叫做collapse（折叠）
		- 水平方向上的margin永远不会collapse
		- 折叠后最终值的计算规则：两个值进行比较，取较大的值
		- 只设置其中一个元素的margin可以防止collapse
- 外轮廓：outline
	- 相关属性和border一样
	- 不占用空间，默认显示在border外面
	- 应用实例：去除a元素、input元素的focus轮廓效果
- 阴影：box-shadow
	- <shadow>=inset?&&<length>{2,4}&&<color>?（可设置多个，用逗号隔开，?表示可写可不写）
		- 第一个length：水平方向的偏移，正数往右偏移
		- 第二个length：垂直方向的偏移，正数往下偏移
		- 第三个length：模糊半径（blur radius）
		- 第四个length：延伸距离
		- color：阴影的颜色
		- inset：外框阴影变成内框阴影
- 尺寸：box-sizing
	- 用来设置盒子模型中宽高的行为
		- content-box：设置宽高时只是指定内容的宽高
		- border-box：设置宽高时是内容+内边距+边框的宽高
	- 补充
		- margin一般用来设置兄弟元素之间的间距
		- padding一般用来设置父子元素之间的间距
		- margin-top、margin-bottom对行内非替换元素不起作用
		- padding-top、padding-bottom：上下方向的border对行内非替换元素比较特殊，不占据空间

## 设置垂直对齐

- vertical-align：设置垂直对齐方式
	- baseline（默认值）：基线对齐
	- top：把行内级盒子的顶部跟line boxes顶部对齐
	- middle：行内级盒子的中心点与父盒基线加上x-height一半的线对齐
	- bottom：把行内级盒子的底部跟line boxes底部对齐
	- <percentage>：把行内级盒子提升或下降一段距离（距离相对于line-height计算、元素高度）
	- <length>：把行内级盒子提升或下降一段距离
- 垂直居中对齐
	- 用middle不能使元素完全垂直居中对齐，最好的办法对元素设置相对定位，设置top:50%，transform: translate(0,-50%)

## 设置光标

- cursor：设置鼠标指针（光标）在元素上面时的显示样式
	- auto：浏览器根据上下文决定指针的显示样式，比如根据文本和非文本切换指针显示样式
	- default：由操作系统决定，一般是一个小箭头
	- pointer：一只小手
	- text：一条竖线
	- none：没有任何指针显示

## 设置形变

- transform：设置旋转、缩放、倾斜、平移给给定元素

- 常见的transform函数
	- 平移：translate（x，y），设置x轴和y轴上的位移，可设置百分比，百分比参照元素本身
	- 缩放：scale（x，y），设置x轴和y轴上的缩放，值取n表示缩放n倍
	- 旋转：rotate（deg），deg为旋转的角度，正数为顺时针，负数为逆时针
	- 倾斜：skew（deg，deg），设置x轴和y轴上的倾斜角度，正数为顺时针，负数为逆时针
	- 多个形变之间用空格分隔
- transform-origin：设置变形原点
	- 取值
		- 一个值设置x轴的原点，两个值设置x轴和y轴的原点
		- left、center、right、top、bottom关键字
		- length：从左上角开始计算
		- 百分比：参考元素本身大小

## 过渡动画

- transition：transition-property     transition-duration     transition-timing-function     transition-delay
	- transition-property：指定应用过渡属性的名称，可以写all表示所有可动画的属性
	- transition-duration：指定过渡动画所需的时间，单位可以是s或ms
	- transition-timing-function：指定动画的变化曲线，取值ease、ease-in、ease-out、linear（匀速）
	- transition-delay：指定过渡动画执行之前的等待时间

## 关键帧动画

- 使用@keyframes来定义多个变化状态，并且使用animation-name来声明匹配
	- 使用@keyframes创建一个规则
	- @keyframes中使用百分比定义各个阶段的样式，也可以用from相当于0%，to相当于100%
	- 通过animation将动画添加到属性上
- animation属性：
	- animation-name：指定执行那个一个关键帧动画
	- animation-duration：指定动画的持续时间
	- animation-timing-function：指定动画的变化曲线
	- animation-delay：指定延迟执行的时间
	- animation-iteration-count：指定动画执行的次数，执行infinite表示无限动画
	- animation-direction：指定方向，常用值normal和reverse
	- animation-fill-mode：执行动画最后保留哪一个值
		- none：回到没有执行动画的位置
		- forwards：动画最后一帧的位置
		- backwards：动画第一帧的位置
	- animation-play-state：指定动画运行或者暂停（在JavaScript中使用，用于暂停动画）

## 3D动画

- 开启3D动画：transform-style：preserve-3d

- 设置视距：perspective

- JS实现3D的库：three.js


## 定位

- position：对元素进行定位
	- static：静态定位
		- 默认值，按照normal flow布局
	- relative：相对定位
		- 元素按照normal flow布局
		- 可以通过left、right、top、bottom进行定位，定位参照对象是元素自己原来的位置，定位到距离该
		- 方向npx的位置，应用在不影响其他元素位置的前提下，对当前元素位置进行微调
		- 应用：网页缩放时，使图片中心始终显示在网页中心，可设置图片为相对定位，先左移img的宽度的一半，再右移父元素d的宽度的一半
	- absolute：绝对定位
		- 可以通过left、right、top、bottom进行定位，定位参照对象最是邻近的定位祖先元素，如果找不到这样的父元素，参照对象是视口
	- fixed：固定定位
		- 元素脱离normal flow，相当于不占据空间，当画布滚动时，固定不动
		- 可以通过left、right、top、bottom进行定位，定位参照对象是视口（viewport）
- 子绝父相：在绝大多数情况下，子元素的绝对定位都是相对于父元素进行定位，如果希望子元素相对于父元素进行定位，又不希望父元素脱标，常用的解决方案是父元素position设置relative，子元素设置为absolute，简称子绝父相
- 绝对定位技巧
	- 绝对定位元素：position值为absolute或者fixed的元素
	- 公式：定位参照对象的宽度（父元素）=left + right + margin-left + margin-right + 绝对定位元素的实际占用宽度
	- 如果希望绝对定位元素的宽高和定位查找对象一样，可以给绝对定位元素设置以下属性：
		- left:0、right:0、top:0、bottom:0、margin:0
	- 如果希望绝对定位元素在定位参照对象中居中显示，可以给绝对定位元素设置以下属性：
		- left:0、right:0、top:0、bottom:0、margin:auto

![](C:\Users\67090\Desktop\Typora\html+css\图片\position总结.png)

## 脱标元素

- 定义：脱离标准流的元素

- 特点
	- 可以随意设置宽高
	- 宽高默认由内容决定（块内元素不再占据整行）
	- 不再受标准流的约束
	- 不再给父元素汇报宽高数据
- 包括：position:fixed（固定定位）/absolute（绝对定位），float

- 和display的关系：当元素设置成固定定位或绝对定位或左右浮动时，相当于display是block，但不占据整行


## 浮动float

- 可以通过float属性让元素产生浮动效果


- 取值
	- none：不浮动，默认值
	- left：向左浮动
	- right：向右浮动
- 规则一
	- 元素一旦浮动后，脱离标准流，朝着向左或向右方向移动，直到自己的边界紧贴着包含块（一般是父元素）或者其他浮动元素的边界为止
	- 定位元素层叠在浮动元素上面，浮动元素层叠在标准元素上面
- 规则二
	- 浮动元素不能与行内级内容层叠，行内级内容将会被浮动元素推出，比如行内级元素、inline-block元素、块级元素的文字内容
	- 利用此特性，可以实现文字环绕功能
- 规则三
	- 行内级元素、inline-block元素浮动后，其顶部将与其所在行的顶部对齐
- 规则四
	- 如果元素是向左（右）浮动，浮动元素的做（右）边界不能超出包含块的左（右）边界
- 规则五
	- 浮动元素之间不能层叠，如果一个元素浮动，另一个元素已经在那个位置了，后浮动的元素将紧贴着前一个浮动元素（左浮找左浮，右浮找右浮）
	- 如果水平方向剩余的空间不够显示浮动元素，浮动元素将向下移动，直到有充足的空间为止
- 规则六
	- 浮动元素的顶端不能超过包含块的顶端，也不能超过之前所有浮动元素的顶端
- 应用
	- 解决行内级元素、inline-block元素的水平间隙问题
	- 布局
- 问题应用
	- 在进行布局时，同一行多个元素摆放后，设置margin-right或left让他们之间产生间距，那么最后一个元素设置的margin总是多余的
		- 解决办法一：每一行最后一个元素总是加一个class，通过类选择器去除这个margin
		- 解决办法二：通过伪类选择器（有兼容性问题）
		- 解决办法三：最外层包含块固定宽度>中间层+负margin>多个浮动块
- 浮动存在的问题（清除浮动）
	- 由于浮动元素脱离了标准流，变成了脱标元素，所以不再向父元素汇报高度，父元素计算总高度时，就不会计算浮动子元素的高度，导致了高度坍塌的问题，解决父元素高度坍塌的问题的过程，一般叫做清浮动（清除浮动）
- 清浮动的常见方法
	- 给父元素设置固定高度（扩展性不好）
	- 在父元素最后增加一个空的块级子元素，并且设置clear:both（会增加很多无意义的标签，维护麻烦，违反了结构与样式分离的原则）
	- 在父元素最后增加一个br标签<br clear="all">（会增加很多无意义的标签，维护麻烦，违反了结构与样式分离的原则）
	- 给父元素增加::after伪元素，设置content:""，display:block，clear:both，height:0，visibility:hidden

## clear

- 一般用在非浮动元素上，可以让非浮动元素与浮动元素不层叠
- 常用取值
	- left：要求元素的顶部低于之前生成的所有左浮动元素的底部
	- right：要求元素的顶部低于之前生成的所有右浮动元素的底部
	- both：要求元素的顶部低于之前生产的所有浮动元素的底部
	- none：默认值，无特殊要求

## 定位方案

- 在css中，有三种常用的方法对元素进行定位、布局

	- normal flow：标准流、常规流、文档流
		- 默认情况下，元素都是按照normal flow进行排布
		- 从左到右，从上到下按顺序排布
		- 默认情况下，元素互相之间不存在层叠
	- absolute pasitioning：绝对定位
	- float：浮动

	![](C:\Users\67090\Desktop\Typora\html+css\图片\定位方案对比.png)

- 绝对定位、浮动都会让元素脱离标准流，以达到灵活布局的效果

## flex布局

- 概念

	- 是目前Web开发中使用最多的布局方案（Flexible布局/弹性布局）
	- flex container：开启flex布局的元素
	- flex items：flex container里面的直接子元素
	- 设置display属性为flex或者inline-flex可以成为flex container

	![](C:\Users\67090\Desktop\Typora\html+css\图片\flex布局模型.png)

- flex container相关属性

	- Flex-direction：决定了flex items在main axis上的布局方向
		- flex items默认都是沿着main axis（主轴）从main start 开始往main end方向排布
		- row：默认值，从左往右
		- row-reverse：从右往左
		- column：从上往下
		- column-reverse：从下往上
	- Justify-content：决定flex items在main axis上的对齐方式
		- flex-start：与main start对齐（默认值）
		- flex-end：与main end对齐
		- center：居中对齐
		- space-between：flex items之间的距离相等，与main start、main end两端对齐
		- space-evenly：flex items之间的距离相等，与main start、main end的距离等于flexs items之间的距离
		- space-around：flex items 之间的距离相等，与main start、main end的距离是flex items之间距离一半
	- align-items：决定flex items在cross axis上的对齐方式
		- normal：在弹性布局中，效果和stretch一样
		- stretch：当flex items在cross axis方向的size为auto时，会自动拉伸至填充flex container
		- flex-start：与cross start对齐
		- flex-end：与cross end对齐
		- center：居中对齐
		- baseline：与第一行基准线对齐
	- align-content：决定多行flex items在cross axis上的对齐方式
		- stretch：与align-items的stretch类似（默认值）
		- flex-start：与cross start对齐
		- flex-end：与cross end对齐
		- center：居中对齐
		- space-between：flex items之间的距离相等，与cross start、cross end两端对齐
		- space-evenly：flex items之间的距离相等，与cross start、cross end的距离等于flexs items之间的距离
		- space-around：flex items 之间的距离相等，与cross start、cross end的距离是flex items之间距离一半
	- flex-wrap：决定flex container是单行还是多行
		- nowrap：单行（默认）
		- wrap：多行
		- wrap-reverse：多行（对比wrap，cross start与cross end相反）
	- flex-flow
		- 缩写属性：flex-direction||flex-wrap的简写，可以省略，顺序任意

- flex items相关属性

	- order：决定了flex items的排布顺序
		- 可以设置任意整数，值越小就排在越前面，默认值0
	- align-self：覆盖flex container设置的align-items
		- auto：遵从flex container设置的align-items（默认值）
		- stretch、flex-start、flex-end、center、baseline，效果跟align-items一致
	- flex-grow：决定了flex items如何扩展
		- 可以设置任意非负数字，默认值0
		- 当flex container在main axis方向上有剩余size时，flex-grow属性才会有效
		- 如果所有flex items的flex-grow总和sum超过1，每个flex items扩展的size为flex container的剩余size * flex-grow / sum
		- 如果所有flex items的flex-grow总和不超过1，每个flex items扩展的size为flex container的剩余size * flex-grow
		- flex items扩展后的最终size不能超过max-width/max-height
	- flex-shrink：决定了flex items如何收缩
		- 可以设置任意非负数字，默认值1
		- 当flex items在main axis方向上超过了flex container的size，flex-shrink属性才会有效
		- 如果所有flex items的flex-shrink总和超过1，每个flex items收缩的size为flex items超出flex container的size * 收缩比例 / 所有flex items的收缩比例之和
		- 如果所有flex items的flex-shrink总和sum不超过1，每个flex items收缩的size为flex items超出flex container的size * sum * 收缩比例 / 所有flex items的收缩比例之和
		- 收缩比例=flex-shrink * flex items的base size
		- base size就是flex items 放入flex container之前的size
		- flex items收缩后的最终size不能小于min-width/min-height
	- flex-basis：设置flex items在main axis方向上的base size
		- auto：默认值
		- npx：具体的宽度数值
		- 决定flex items最终base size的因素，优先级从高到低：
			- max-width/max-height/min-width/min-height
			- flex-basis
			- width/height
			- 内容本身的size
	- flex
		- 缩写属性：flex-grow||flex-shrink||flex-basis的简写，flex属性可以指定任意个

## CSS Sprite

- 解释：一种图像合成技术，将各种小图片合并到一张图片上，然后利用CSS的背景定位来显示对应的图片部分

- 好处
	- 减少网页的http请求，加快网页相应速度，减轻服务器压力
	- 减小图片总大小
	- 解决了图片命名的困扰，只需针对一张集合的图片命名

## 继承

- 一个元素如果没有设置属性值，则会跟随其父元素的值

- 不能继承的属性可以用inherit强制继承

- css属性继承的是计算值，不是编写属性时的指定值


## 层叠和权重

- css允许多个相同名字的css属性层叠在同一个元素上

- 相同选择器下，将生效最后一个css属性

- 不同选择器下，根据属性的权重优先生效
	- !important > 内联样式 > id选择器 > 类选择器/属性选择器/伪类 > 元素选择器/伪元素 > 通配符
	- 从权重最大的开始比较每一种权值的数量多少，数量多的优先级高，以此类推
	- 数量相同则采取就近原则
- z-index
	- z-index属性用来设置定位元素的层叠顺序（仅对定位元素有效），取值可以是正整数、负整数、0，默认值是auto
- 比较原则
	- 如果是兄弟关系，z-index越大，层叠在越上面，z-index相等，写在后面的那个元素层叠在上面
	- 如果不是兄弟关系，各自从元素自己以及祖先元素中，找出最邻近的2个定位元素进行比较，而且这两个定位元素必须有设置z-index的具体数值

![](C:\Users\67090\Desktop\Typora\html+css\图片\层叠规律.png)

# HTML

## 	图片img

- src
	- 网络图片路径
	- 本地图片路径
		- 绝对路径
		- 相对路径：".."表示上一层目录，"."表示当前目录
- alt：当图片路径失效时显示文本


## 	超链接a

- 一般链接
	- href
		- 外部链接路径
		- 本地链接路径
	- target：指定页面打开超链接
		- _self：默认值，在当前页面打开
		- _black：在空白页面打开
		- _parent：在父页面打开
		- _top：在顶部页面打开
		- name：网页嵌套时使用，在特定的name网页中打开
- 伪链接：href中写入JavaScript等实现具体指令

- 锚点链接：href中加入选择器实现跳转到网页中的具体位置


##     网页嵌套iframe

- src：要嵌套的网页路径

- frameborder：网页边框宽度

- name：特定的属性名，用来被选中


##     列表ul/ol

- 有序列表（ordered list）：ol，li，直接元素只能是li

- 无序列表（unordered list）：ul，li，直接元素只能是li

- 定义列表（definition list）：dl，dt，dd，直接子元素只能是dt，dd

- 常见css属性：
	- list-style-type：设置li元素前面标记的样式
		- disc（实心圆）、circle（空心圆）、square（实心方块）
		- deciaml（阿拉伯数字）、lower-roman（小写罗马数字）、upper-roman（大写罗马数字）
		- lower-alpha（小写英文字母）、upper-alpha（大写英文字母）
		- none（什么都没有）
	- list-style-image：设置某张图片为li元素前面的标记，会覆盖list-style-type的设置
	- list-style-position：设置li元素前面的位置
	- outside：将前面的标记设置在内容之外
	- indise：将前面的标记设置在内容之内
	- list-style：是list-style-type、list-style-image、list-style-position的缩写属性

##     表格table

- 元素
	- tbody：表格主体
	- caption：表格标题
	-  thead：表格表头
	- tfoot：表格页脚
- css样式
	- 表格边框样式：border：npx solid/dashed color
	- 表格边框合并：border-collapse：collapse
	- 表格居中显示：margin：auto
	- 单元格合并
		- colspan：跨列合并
		- rowspan：跨行合并
	- 单元格内外边距
		- padding：px px px px，内边距上右下左
		- margin：px px px px，外边距上右下左
	- 单元格之间的水平、垂直间距：border-spacing：px px，水平垂直间距

##     表单form

- 属性
	- action：表单提交服务器地址
	- method：请求方式，提交表单数据时，浏览器发送的是http请求，默认为get请求
		- get：在请求URL后面以?的形式跟上发给服务器的参数，多个参数之间用&隔开，由于浏览器和服务器对URL长度有限制，因此在URL后面附带的参数是有限的，通常不能超过1kb
		- post：发给服务器的参数全部放在请求体内，理论上，post传递的数据量没有限制（具体看服务器的处理能力）
	- target：在指定页面打开表单提交完后服务器返回的页面，具体参数见超链接a
	- accept-charset：规定表单提交时使用的字符编码（默认值UNKNOWN，和文档相同的编码）
	- enctype：multipart/form-data，文件上传时必须为这个值，并且method必须是POST
- 元素
	- input控件
		- type
			- text：单行文本输入框
			- password：密码框，密文输入
			- radio：单选框
			- checkbox：复选框
			- button：按钮
			- reset：重置
			- submit：提交表单数据给服务器
			- file：文件上传
			- html5中扩展：date、time、number、tel、color、email
		- maxlength：允许输入的最大字数
		- placeholder：占位字符（没有输入时显示的内容）
		- readonly：只读，不能输入内容
		- disabled：禁用
		- checked：默认被选中
		- autofocus：当页面加载时，自动聚焦
		- name：名字，表单提交数据给服务器时的键值，具体名字要与服务器沟通
		- value：取值，提交给服务器的值
	- textarea：多行文本框
		- rows：显示行数
		- cols：显示列数
		- resize：缩放样式
			- none：禁止缩放
			- horizonntal：水平缩放
			- vertical：垂直缩放
			- both：水平垂直缩放，默认值
	- select、option：下拉选择框
		- selected：默认被选中
		- multiple：显示可多选的
		- size：显示多少项
	- button：按钮
		- type值默认为submit
	- label：表单元素的标题
		- 点击标题可使目标input变成聚焦状态，经常与input一起使用
		- for：对应input的id名
	- fieldset：表单元素组（表单外层边框）
	- legend：fieldset的标题，一般放在fieldset的第一行

## 元素分类

![](C:\Users\67090\Desktop\Typora\html+css\图片\css元素分类.png)

## 媒体元素video

- （HTML5之前通过flash或者其他插件实现）
- audio：音频；video：视频
	- src：媒体的来源
	- controls：增加控制工具栏
	- autoplay：自动播放，但是存在兼容问题
	- muted：静音，增加后不静音并且自动播放会生效
	- loop：循环播放
- source：
	- 如果存在兼容性问题，可以将多个视频格式的数据源放到source元素中
	- src：通过src指定数据的来源

