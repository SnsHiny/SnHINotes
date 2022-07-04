# Vue

[vue官网]: https://cn.vuejs.org/

## 特点

- 采用组件化模式，提高代码复用率，且让代码更好维护

- 声明式编码，让编码人员无需直接操作DOM，提高开发效率

- 使用虚拟DOM+优秀的Diff算法，尽量复用DOM结点

	![image-20211117083557559](C:\Users\67090\Desktop\Typora\Vue\图库\Diff算法.png)

## 搭建开发环境

- 下载开发版本Vue

- 安装调试工具vue-devtools

	- 下载node.js 

		[node.js]: https://nodejs.org/en/download/	"LTS长期稳定版"

	- 输入 **node-v** 和 **npm-v** 确认node和npm的版本号

	- 输入以下指令安装国内镜像文件：

		```
		npm install -g cnpm --registry=https://registry.npm.taobao.org
		```

	- 输入 **cnpm -v** 检查版本

	- 输入 **cnpm install** 安装依赖包

	- 输入 **npm run build**（如果报错，则创建一个空文件夹，进入这个文件夹按住 shift + 右键 选择进入powershell ，就可以进入这个文件的终端。输入 **npm install vue-devtools** 完成后，进入该文件下的node_modules 文件，找到 vue-devtools 文件，进入其中，将vender 文件拖至谷歌浏览器的扩展程序中即可）

	- 将D:\java\Vue\vue-devtools-master\shells\chrome文件夹拖入Chrome扩展管理界面

		![image-20211117152629839](C:\Users\67090\Desktop\Typora\Vue\图库\vue_devtools.png)

- 引入Vue.js

	```html
	<!-- 引入Vue -->
	<script type="text/javascript" src="../Js/vue.js"></script>
	```

- VSCode下载 Vue 2 Snippets 插件用于代码提示

## 入门案例

```html
<body>
    <!--
        初识Vue：
            1.想让Vue工作，就必须创建一个Vue实例，且要传入一个配置对象el
            2.root容器里的代码依然符合HTML规范，只不过混入了一些特殊的Vue语法
            3.root容器里的代码被称为Vue模板
			4.Vue实例和容器是一一对应的
            5.真实开发中只有一个Vue实例，并且会配合着组件一起使用
            6.{{xxx}}中的xxx要写js表达式，且xxx可以自动读取到data中的所有属性
            7.一旦data中的数据发生改变，那么页面中用到该数据的地方也会自动更新
    -->

    <!--准备好一个模板-->
    <div id="root">
        <h1>HelloWorld! {{name}}</h1>
    </div>

    <script type="text/javascript">
        // 阻止vue在启动时生成生产提示
        Vue.config.productionTip = false
        //创建Vue实例
        new Vue({
            //el用于指定当前Vue实例为哪个容器服务，值通常为css选择器字符串
            el: '#root',
            //data中用于存储数据，数据供el所指定的容器去使用，值暂时先写成一个对象
            data: {
                name: 'SnHI'
            }
        }) 
    </script>
</body>
```

## 特性

### 模板语法

- 插值语法

	- 功能：用于解析标签体内容
	- 写法：{{xxx}}，xxx是js表达式，且可以直接读取到data中的所有属性

- 指令语法

	- 功能：用于解析标签（包括：标签属性、标签体内容、绑定事件...）
	- 举例：v-bind:href="xxx" 可以简写为 :href="xxx"，xxx同样要写js表达式，且可以直接读取到data中的所有属性
	- 备注：Vue中有很多指令，且格式都是v-xxx

	```html
	<body>
	    <div id="root">
	        <h1>插值语法</h1>
	        <h3>你好，{{name}}，我是{{school.name}}{{school.major}}专业的学生</h3>
	        <hr>
	        <h1>指令语法</h1>
	        <a v-bind:href="url.toUpperCase()">去百度</a>
	        <a :href="url">去百度</a>
	    </div>
	    
	    <script>
	        Vue.config.devtools = false;
	
	        new Vue({
	            el: '#root',
	            data: {
	                name: 'Rose',
	                url: 'http://www.baidu.com',
	                school: {
	                    name: '湖北师范大学',
	                    major: '计算机科学与技术'
	                }
	            }
	        })
	    </script>
	</body>
	```

### 数据绑定

- 单向绑定：v-bind，数据只能从data流向页面

- 双向绑定：v-model，数据不仅能从data流向页面，还能从页面流向data

	- 双向绑定一般都应用在表单类元素上（如input、select等）
	- v-model:value 可以简写为v-model，因为v-model默认收集的就是value的值

	```html
	<body>
	    <div id="root">
	        <h1>数据绑定</h1>
	        单向数据绑定：<input name="t1" type="text" :value="name"><br>
	        双向数据绑定：<input name="t2" type="text" v-model="name">
	    </div>
	
	    <!-- 如下代码是错误的，因为v-model只能用于表单元素（输入类元素）上 -->
	    <h2 v-model:x="name">你好啊</h2>
	
	    <script>
	        new Vue({
	            el: '#root',
	            data: {
	                name: 'SnHI'
	            }
	        })
	    </script>
	</body>
	```
	
- el和data的两种写法

	```javascript
	//el的两种写法
	const v = new Vue({
	    //    new Vue实例的时候设定
	    el: '#root',
	    data: {
	        name: 'SnHI'
	    }
	})
	//    先创建Vue实例，随后使用v.$mount()指定el的值
	v.$mount('#root');
	
	//data的两种写法
	new Vue({
	    el: '#root',
	    // 对象式
	    data: {
	        name: 'SnHI'
	    },
	    // 函数式
	    data: function(){
	        return {
	            name: 'SnHI'
	        }
	    }
	    // data() {
	    //     return {
    //         name: 'SnHI'
	    //     }
	    // }
	})
	```

### MVVM模型

![image-20211117191446425](C:\Users\67090\Desktop\Typora\Vue\图库\MVVM模型.png)

- M：模型（Model）：对应data中的数据
- V：视图（View）：对应页面
- VM：视图模型（ViewModel）：对应Vue实例

### 数据代理

- 通过vm对象来代理data对象中属性的操作，更加方便的操作data中的数据
- 原理
	- 通过Object.defineProperty()把data对象中所有的属性添加到vm上
	- 为每一个添加到vm上的属性，都指定一个getter/setter
	- 在getter/setter内部去操作data中对应的属性

![image-20211117203145742](C:\Users\67090\AppData\Roaming\Typora\typora-user-images\image-20211117203145742.png)

- 数据代理基本原理

	```html
	<!DOCTYPE html>
	<html lang="en">
	<head>
	    <meta charset="UTF-8">
	    <meta name="viewport" content="width=device-width, initial-scale=1.0">
	    <title>Document</title>
	    <script type="text/javascript" src="../js/vue.js"></script>
	</head>
	<body>
	    <!--数据代理：通过一个对象管理另一个对象的内部属性-->
	    <script type="text/javascript">
	        let obj1 = {x: 100}
	        let obj2 = {y: 200}
	
	        //Object.defineProperty()：obj2的x1属性进行操作，没有则新增该属性
	        Object.defineProperty(obj2, 'x1', {
	            get() {
	                return obj1.x
	            },
	            set(value) {
	                obj1.x = value
	            }
	        })
	    </script>
	</body>
	</html>
	```

### 事件处理

- 使用 v-on:xxx 或 @xxx 绑定事件，其中xxx是事件名

- 事件的回调需要配置在methods对象中，最终会在vue实例上

- methods中配置的函数，不要用箭头函数！否则this就不是vue实例了

- methods中配置的函数，都是被Vue所管理的函数，this的指向是vm或组件实例对象

- @click="demo" 和 @click="demo($event)" 效果一样，但后者可以传参

	```html
	<body>
	    <div id="root">
	        <h1>欢迎来到{{name}}学习</h1>
	        <!-- 点击事件 -->
	        <button v-on:click="showInfo1">点我出现提示1</button>
	        <button @click="showInfo1">点我出现提示2</button>
	        <button @click="showInfo2($event, 66)">点我出现提示3</button>
	    </div>
	         
	    <script type="text/javascript">
	        Vue.config.devtools = false;
	                                   
	        new Vue({
	            el: '#root',
	            data: {
	                name: '百度'
	            },
	            //事件处理
	            methods: {
	                showInfo1() {
	                    alert("同学你好")
	                },
	                showInfo2(event, number) {
	                    alert(number)
	                    console.log(event)
	                }
	            }
	        })
	    </script>
	</body>
	```

#### 事件修饰符

- prevent：阻止默认事件（常用）

- stop：组织事件冒泡（常用）

- once：事件只触发一次（常用）

- capture：使用事件的捕获模式（父元素向子元素的传递过程）

- self：只有event.target是当前操作的元素时才触发事件

- passive：事件的默认行为立即执行，无需等待事件回调执行完毕

- 修饰符可以连续写，例@click.prevent.once

	```html
	<body>
	    <div id="root">
	        <h1>学习{{name}}</h1>
	        <!-- prevent：阻止默认事件（常用） -->
	        <a :href="url" @click.prevent="showInfo1">点我触发事件但不跳转链接</a><br>
	        <!-- once：事件只触发一次（常用） -->
	        <button @click.once="showInfo2">按钮只触发一次</button>
	    </div>
	         
	    <script type="text/javascript">
	        Vue.config.devtools = false;
	                                   
	        new Vue({
	            el: '#root',
	            data: {
	                name: "事件修饰符",
	                url: "http://www.baidu.com"
	            },
	            methods: {
	                showInfo1() {
	                    alert("prevent")              
	                },
	                showInfo2() {
	                    alert("once")
	                }
	            }
	        })
	    </script>
	</body>
	```

#### 键盘事件

- @keyup或@keydown

- 回车：enter；删除：delete（捕获“删除”和“退格”键）；退出：esc；空格：space；换行：tab（特殊，必须配合keydown去使用）；上：up；下：down；左：left；右：right

- Vue未提供别名的按键，可以使用按键原始的key值去绑定，但注意要转为短横线命名

- 系统修饰键（用户特殊）：ctrl、alt、shift、meta

	- 配合keyup使用：按下修饰键的同时，再按下其他键，随后释放其他键，事件才被触发
	- 配合keydown使用：正常触发事件

- 可以使用keyCode去指定具体的按键（不推荐）

- Vue.config.keyCodes.自定义键名 = 键码（自定义按键别名）

	```html
	<body>
	    <div id="root">
	        <h1>学习{{name}}</h1>
	        <input type="text" placeholder="点击回车触发事件" @keyup.enter="showInfo">
	        <input type="text" placeholder="点击Caps键触发事件" @keyup.caps-lock="showInfo">
	        <input type="text" placeholder="点击自定义回车触发事件" @keyup.huiche="showInfo">
	    </div>
	         
	    <script type="text/javascript">
	        Vue.config.productionTip = false
	
	        Vue.config.keyCodes.huiche = 13
	                                   
	        new Vue({
	            el: '#root',
	            data: {
	                name: "键盘事件"
	            },
	            methods: {
	                  showInfo(e) {
	                    //   console.log(e.key, e.keyCode)
	                      console.log(e.target.value)
	                  }    
	            }
	        })
	    </script>
	</body>
	```

### 计算属性

- 定义：要用的属性不存在，要通过已有属性计算得来，computed表示

- 原理：底层借助了Object.defineproperty方法提供的getter和setter方法

- get函数在初次读取和依赖的数据发生改变时会被调用

- 与methods相比，计算属性内部有缓存机制，效率更高，调试方便

- 计算属性最终会出现在vm上，直接读取使用即可

- 如果计算属性要被修改，那必须写set函数去响应修改，且set中要引起计算时依赖的数据发生改变

	```html
	<body>
	    <div id="root">
	        姓：<input type="text" v-model="firstName"><br><br>
	        名：<input type="text" v-model="lastName"><br><br>
	        全名：<span>{{fullName}}</span>
	        <!-- 全名：<span>{{firstName}}-{{lastName}}</span> -->
	        <!-- 全名：<span>{{showName()}}</span> -->
	    </div>
	         
	    <script type="text/javascript">
	        Vue.config.productionTip = false
	                                   
	        const vm = new Vue({
	            el: '#root',
	            data: {
	                firstName: "张",
	                lastName: "三"
	            },
	            // methods: {
	            //     showName() {
	            //         return this.firstName + "-" + this.lastName
	            //     }   
	            // }
	            //计算属性
	            computed: {
	                fullName: {
	                    //当初次读取fullName值和所依赖的数据发生改变时，get就会被调用，且返回值就是fullName的值
	                    get() {
	                        //这里的this是vue实例
	                        return this.firstName + "-" + this.lastName
	                    },
	                    set(value) {
	                        fullName = value
	                        const arr = value.split("-")
	                        this.firstName = arr[0]
	                        this.lastName = arr[1]
	                    }
	                }
	                //计算属性简写方式（只有get的情况下）
	                // fullName() {
	                //     return this.firstName + "-" + this.lastName
	                // }
	            }
	        })
	    </script>
	</body>
	```

### 监视属性

- 当被监视的属性变化时，回调函数handler自动调用

- 监视的属性必须存在才能进行监视

- 两种写法：watch配置和$watch监视

- 深度监视

	- Vue中的watch默认不检测对象内部值的改变
	- 配置deep:true可以检测对象内部值的改变

	```html
	<body>
	    <div id="root">
	        <h1>今天天气很{{info}}</h1>
	        <button @click="changeWeather">点我切换天气</button>
	        <button @click="a++">点我增加数字</button>
	        <!-- 方法名的位置可以写一些简单的语句 -->
	        <!-- <button @click="isHot = !isHot">点我切换天气</button> -->
	    </div>
	         
	    <script type="text/javascript">
	        Vue.config.productionTip = false
	             
	        const vm = new Vue({
	            el: '#root',
	            data: {
	                isHot: true,
	                a: 1,
	                numbers: {
	                    b: 1,
	                    c: 2
	                } 
	            },
	            methods: {
	                changeWeather() {
	                    this.isHot = !this.isHot
	                }
	            },
	            computed: {
	                info() {
	                    return this.isHot ? "炎热": "凉爽"
	                }
	            },
	            //监视方法一
	            watch: {
	                isHot: {
	                    // immediate: true：初始化时调用handler
	                    // immediate: true,
	                    handler(newValue, oldValue) {
	                        console.log("isHot被修改了", newValue, oldValue);
	                    }
	                },
	                info: {
	                    handler(newValue, oldValue) {
	                        console.log("info被修改了", newValue, oldValue);
	                    }
	                },
	                numbers: {
	                    //开启深度监视，可以监视多级结构中的所有属性变化
	                    deep: true,
	                    handler() {
	                        console.log("numbers被改变了");
	                    }
	                },
	                //简写(当只需要handler方法时)
	                numbers(newValue, oldValue) {
	                    console.log("numbers被修改了", newValue, oldValue);
	                }
	            }
	        })
	         //监视方法二
	         vm.$watch("isHot", {
	             handler(newValue, oldValue) {
	                 console.log("isHot被修改了", newValue, oldValue);
	             }
	         })
	         // 监视方法二（简写）
	         vm.$watch("isHot", function(newValue, oldValue) {
	             console.log("numbers被修改了", newValue, oldValue);
	         })
	    </script>
	</body>
	```

------

[^计算属性computed和监视属性watch之间的区别]: computed能完成的功能，watch都能完成；watch能完成的功能，computed不一定能完成，例如：watch可以进行异步操作
[^函数使用原则]: 所被Vue管理的函数，最好写成普通函数，这样this的指向才是vue实例对象或组件实例对象；所有不被Vue所管理的函数（定时器的回调函数、ajax的回调函数、Promise的回调函数等），最好写成箭头函数，这样this的指向才是vue实例对象或组件实例对象

### 绑定样式

- 绑定class样式
	- 字符串写法：适用于样式类名不确定需要动态指定的场景
	- 数组写法：适用于样式类名和个数都不确定的场景
	- 对象写法：适用于样式类名和个确定但需要动态指定用不用的场景
- 绑定style样式

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script type="text/javascript" src="../js/vue.js"></script>

    <style>
        .basic {
            width: 200px;
            height: 200px;
            border: 1px solid #000;
        }

        .normal {
            background-color: aqua;
        }

        .happy {
            background-color: brown;
        }

        .sad {
            background-color: gray;
        }
    </style>
</head>
<body>
    <div id="root">
        <!-- 绑定class样式——字符串写法，适用于样式类名不确定需要动态指定的场景 -->
        <div class="basic" :class="type" @click="colorChange">{{name}}</div>
        <!-- 绑定class样式——数组写法，适用于样式类名和个数都不确定的场景 -->
        <div class="basic" :class="classArr[0]">{{name}}</div>
        <!-- 绑定class样式——对象写法，适用于样式类名和个数确定但需要动态指定用不用的场景 -->
        <div class="basic" :class="classObj">{{name}}</div>
        <!-- 绑定style样式 -->
        <div class="basic" :style="styleObj" :class="classObj">{{name}}</div>
    </div>
         
    <script type="text/javascript">
        Vue.config.productionTip = false
                                   
        new Vue({
            el: '#root',
            data: {
                name: "点击变换颜色",
                type: "",
                //数组写法
                classArr: ["normal", "happy", "sad"],
                //对象写法
                classObj: {
                    normal: false,
                    happy: true,
                    sad: false
                },
                 styleObj: {
                    fontSize: '30px'
                }
            },
            //字符串写法
            methods: {
                colorChange() {
                    const arr = ["normal", "happy", "sad"]
                    this.type = arr[Math.floor(Math.random() * 3)]
                }  
            }
        })
    </script>
</body>
```

### 条件渲染

- v-if / v-else-if / v-else

	- 适用于切换频率较低的场景
	- 特点：不展示的DOM元素直接被移除
	- v-if和v-else-if和v-else一起使用，但要求结构不能被打断

- v-show

	- 适用于切换频率较高的场景
	- 特点：不展示的DOM元素未被移除，仅仅是使用样式隐藏掉

- 使用v-if时，元素可能无法获取到，而使用v-show则一定可以获取到

	```html
	<body>
	    <div id="root">
	        <!-- 使用v-show进行条件渲染 -->
	        <div v-show="false">你好，{{name}}</div>
	        <!-- 使用v-if进行条件渲染 -->
	        <button @click="n++">点我n+1</button>
	        <div v-if="n == 1">你好，{{n}}</div>
	        <div v-else-if="n == 2">你好，{{n}}</div>
	        <div v-else-if="n == 3">你好，{{n}}</div>
	        <div v-else>你好，{{n}}</div>
	
	        <!-- v-if和template的配合使用（template模板，不影响结构） -->
	        <template v-if="n == 1">
	            <h2>1</h2>
	            <h2>2</h2>
	            <h2>3</h2>
	        </template>
	    </div>
	         
	    <script type="text/javascript">
	        Vue.config.productionTip = false
	                                   
	        new Vue({
	            el: '#root',
	            data: {
	               name: "SnHI",
	               n: 0 
	            },
	            methods: {
	                      
	            }
	        })
	    </script>
	</body>
	```

### 列表渲染

- v-for指令

	- 用于展示列表数据
	- 可遍历数组、对象、字符串、指定次数

	```html
	<body>
	    <div id="root">
	        <!-- 遍历数组 -->
	        <h1>遍历数组</h1>
	        <ul>
	            <li v-for="(person, index) in persons" :key="person.id">
	                {{person.name}} - {{person.age}}- {{index}}
	            </li>
	        </ul>
	        <!-- 遍历对象 -->
	        <h1>遍历对象</h1>
	        <ul>
	            <li v-for="(value, key) in dog">
	                {{key}} - {{value}}
	            </li>
	        </ul>
	        <!-- 遍历字符串（少用） -->
	        <h1>遍历字符串</h1>
	        <ul>
	            <li v-for="(s, index) in str">
	                {{s}} - {{index}}
	            </li>
	        </ul>
	        <!-- 遍历指定次数（少用） -->
	        <h1>遍历指定次数</h1>
	        <ul>
	            <li v-for="(n, index) in 5">
	                {{n}} - {{index}}
	            </li>
	        </ul>
	    </div>
	         
	    <script type="text/javascript">
	        Vue.config.productionTip = false
	                                   
	        new Vue({
	            el: '#root',
	            data: {
	                persons: [
	                    {id: "001", name: "张三", age: 18},
	                    {id: "002", name: "李四", age: 19},
	                    {id: "003", name: "王五", age: 20}
	                ],
	                dog: {
	                    name: "wangwang",
	                    age: 2,
	                    color: "white"
	                },
	                str: "hello"
	            },
	            methods: {
	                      
	            }
	        })
	    </script>
	</body>
	```

#### 列表中key的作用

- 虚拟DOM中key的作用：key是虚拟DOM对象的标识，当数据发生变化时，Vue会根据新数据生成新的虚拟DOM，随后Vue进行新虚拟DOM与旧虚拟DOM的差异比较（diff对比算法），算法规则如下：

	- 旧虚拟DOM中找到了与新虚拟DOM相同的key
		- 若虚拟DOM中内容没变，直接使用之前的真实DOM
		- 若虚拟DOM中内容变了，则生成新的真实DOM，随后替换掉页面中之前的真实DOM
	- 旧虚拟DOM中未找到与新虚拟DOM相同的key
		- 创建新的真实DOM，随后渲染到页面

- 用index作为key可能会引发的问题

	- 若对数据进行逆序添加、逆序删除等破坏顺序的操作，会产生没有必要的真实DOM更新，导致界面效果没问题但是效率变低
	- 如果结构中还包含输入类的DOM，会产生错误DOM更新，导致界面出现问题

- 开发中如何选择key

	- 最好使用每条数据的唯一标识作为key，比如id、手机号、身份证号、学号等唯一标识
	- 如果不存在对数据的逆序添加、逆序删除等破坏顺序的操作，仅用于渲染列表用于展示，使用index作为key是没有问题的

	![image-20211118203219442](C:\Users\67090\Desktop\Typora\Vue\图库\遍历列表时index作为key.png)

	![image-20211118203337793](C:\Users\67090\Desktop\Typora\Vue\图库\遍历列表时id作为key.png)

### 数据监测

- Vue会监视data中所有层次的数据

- 对象监测方式：通过setter实现检测，且要在new Vue时就要传入要检测的数据，对象后追加的属性，Vue默认不做响应式处理，如需给后添加的属性做响应式，使用如下API：

	- Vue.set(target, propertyName/index, value)
	- vm.$set(target, propertyName/index, value)

	[^注意]: Vue.set() 和 vm.$set不能给 vm 或 vm 中的根数据对象添加属性

- 数组监测方式：通过包裹数组更新元素的方法实现，首先调用原生对应的方法对数组进行更新，然后重新解析模板，进而更新页面

	- 使用API：push()、pop()、shift()、unshift()、splice()、sort()、reverse()
	- Vue.set() 或 vm.$set()

	```html
	<body>
	    <div id="root">
	        <h1>添加属性</h1>
	        <button @click="addAttr">添加一个年龄属性</button>
	        <button @click.once="addFriend">添加一个朋友</button>
	        <h2>学生信息</h2>
	        <h3>姓名：{{student.name}}</h3>
	        <h3>性别：{{student.sex}}</h3>
	        <h3 v-if="student.age">年龄：{{student.age}}</h3>
	        <h3>朋友</h3>
	        <ul>
	            <li v-for="(f, index) in student.friends" :key="index">
	                {{f.name}}-{{f.sex}}-{{f.age}}
	            </li>
	        </ul>
	    </div>
	         
	    <script type="text/javascript">
	        Vue.config.productionTip = false
	                                   
	        const vm = new Vue({
	            el: '#root',
	            data: {
	                student: {
	                    name: "jack",
	                    sex: "男",
	                    friends: [
	                        {name: "tom", sex: "男", age: 20},
	                        {name: "jerry", sex: "女", age: 22},
	                    ]
	                }
	            },
	            methods: {
	                addAttr() {
	                    // Vue.set(this.student, "age", 18)
	                    vm.$set(this.student, "age", 18)
	                },
	                addFriend() {
	                    this.student.friends.unshift({name: "lisa", sex: "女", age: 20})
	                }  
	            }
	        })
	    </script>
	</body>
	```

### 收集表单数据

- text类型标签：v-model收集的是value值，用户输入的就是value值

- radio类型标签：v-model收集的是value值，且要给标签配置value值

- checkbox类型标签

	- 没有配置input的value属性，那么收集到的是checked（勾选或未勾选，布尔值）
	- 配置了input的value属性
		- v-model的初始值是非数组，那么收集到的是checked
		- v-model的初始值是数组，那么收集到的就是value组成的数组

- v-model的三个修饰符

	- lazy：失去焦点再收集数据
	- number：输入字符转为有效的数字
	- trim：输入首位空格过滤

	```html
	<body>
	    <div id="root">
	        <form @submit.prevent="submit">
	            <span>账号：</span><input type="text" v-model.trim="accout"><br><br>
	            <span>密码：</span><input type="text" v-model="password"><br><br>
	            <span>性别：</span>
	            男：<input type="radio" name="sex" v-model="sex" value="男">
	            女：<input type="radio" name="sex" v-model="sex" value="女"><br><br>
	            <!-- v-model.number：保证vue.data中该属性为整数型 -->
	            年龄：<input type="number" v-model.number="age"><br><br>
	            <span>爱好：</span>
	            <!-- checkbox多选类型标签在vue.data中需要用数组接收 -->
	            跳舞<input type="checkbox" v-model="hobby" value="跳舞">
	            跑步<input type="checkbox" v-model="hobby" value="跑步">
	            唱歌<input type="checkbox" v-model="hobby" value="唱歌"><br><br>
	            <span>所属校区：</span>
	            <select v-model="school">
	                <option value="">请选择校区</option>
	                <option value="beijing">北京</option>
	                <option value="shanghai">上海</option>
	                <option value="shenzhen">深圳</option>
	                <option value="hangzhou">杭州</option>
	            </select><br><br>
	            <span>其他信息：</span>
	            <!-- v-model.lazy：使标签失去焦点时再更新vue.data -->
	            <textarea cols="30" rows="10" v-model.lazy="other"></textarea><br><br>
	            <input type="checkbox" v-model="agree"><span>阅读并接受</span><a href="#">用户协议</a><br><br>
	        <input type="submit">
	        </form>
	    </div>
	         
	    <script type="text/javascript">
	        Vue.config.productionTip = false
	                                   
	        new Vue({
	            el: '#root',
	            data: {
	                accout: "",
	                password: "",
	                sex: "",
	                hobby: [],
	                school: "",
	                other: "",
	                agree: "",
	                age: ""
	            },
	            methods: {
	                submit() {
	                    // 将data中所有数据以JSON格式输出
	                    console.log(JSON.stringify(this._data));
	                }
	            },
	        })
	    </script>
	</body>
	```

### 过滤器

- 对要显示的数据进行特定格式化后再显示（适用于一些简单逻辑的处理）

- 注册过滤器

	- 全局过滤器：Vue.filter(name, callback)
	- 局部过滤器：new Vue(filters:{})

- 过滤器也可以接收额外参数、多个过滤器也可以串联

- 过滤器不改变原本的数据，是产生新的对应的数据

	```html
	<body>
	    <!--
	        - 对要显示的数据进行特定格式化后再显示（适用于一些简单逻辑的处理）
	        - 注册过滤器
	            - 全局过滤器：Vue.filter(name, callback)
	            - 局部过滤器：new Vue(filters:{})
	        - 过滤器也可以接收额外参数、多个过滤器也可以串联
	        - 过滤器不改变原本的数据，是产生新的对应的数据
	    -->
	    <div id="root">
	        <h1>格式化时间</h1>
	        <!-- 计算属性实现 -->
	        <h3>现在时间是{{time}}</h3>
	        <!-- methods实现 -->
	        <h3>现在时间是{{timeFormat()}}</h3>
	        <!-- 过滤器实现 -->
	        <!-- |：管道过滤器，前面可写参数，将参数带入管道过滤器后的过滤器方法，过滤器的返回值代替整个插值 -->
	        <h3>现在时间是{{| timeFormatFilter}}</h3>
	        <!-- 过滤器实现（传参） -->
	        <h3>现在时间是{{'' | timeFormatFilter('YYYY-MM-DD')}}</h3>
	        <!-- 过滤器实现（多层过滤） -->
	        <!-- 后一层过滤器过滤前一层的返回值，第一个参数不传给第二层往后的过滤器 -->
	        <h3>现在时间是{{'' | timeFormatFilter('YYYY-MM-DD') | mySlice}}</h3>
	    </div>
	         
	    <script type="text/javascript">
	        Vue.config.productionTip = false
	        //全局过滤器
	        Vue.filter("mySlice", function(value) {
	            return value.slice(0, 4)
	        })
	                                   
	        new Vue({
	            el: '#root',
	            data: {
	                
	            },
	            methods: {
	                timeFormat() {
	                    return dayjs().format('YYYY年MM月DD日 HH:mm:ss')
	                }   
	            },
	            computed: {
	                time() {
	                    return dayjs().format('YYYY年MM月DD日 HH:mm:ss')
	                }
	            },
	            //局部过滤器
	            filters: {
	                //value接受|管道过滤器前的参数，str接收过滤器传参的参数
	                //str='YYYY年MM月DD日 HH:mm:ss'表示当str有形参时，用形参；没有形参时，用str后的默认值
	                //return作为过滤器的返回值
	                timeFormatFilter(value, str='YYYY年MM月DD日 HH:mm:ss') {
	                    return dayjs().format(str)
	                },
	                // mySlice(value) {
	                //     //截取0到4位
	                //     return value.slice(0, 4)
	                // }
	            }
	        })
	    </script>
	</body>
	```

### 内置指令

| 指令    | 作用                                             |
| ------- | ------------------------------------------------ |
| v-bind  | 单向绑定解析表达式，可简写为:xxx                 |
| v-model | 双向数据绑定                                     |
| v-for   | 遍历数组/对象/字符串                             |
| v-on    | 绑定事件监听，可简写为@xxx                       |
| v-if    | 条件渲染（动态控制节点是否存在）                 |
| v-else  | 条件渲染（动态控制节点是否存在）                 |
| v-show  | 条件渲染（动态控制节点是否展示）                 |
| v-text  | 向指定节点渲染并替换文本内容                     |
| v-html  | 向指定节点渲染包含html结构的内容                 |
| v-cloak | 配合css使用可以解决网速慢时页面出现{{xxx}}的问题 |
| v-once  | 其所在的节点在初次动态更新后，就视为静态数据了   |
| v-pre   | 跳过其所在节点的编译过程                         |

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script type="text/javascript" src="../js/vue.js"></script>
    <style>
        [v-cloak] {
            display: none;
        }
    </style>
</head>
<body>
    <div id="root">
        <!-- v-text：向其所在的节点渲染文本内容。与插值语法的区别：v-text会替换节点中的所有内容，{{xxx}}不会 -->
        <div v-text="name1"></div>
        <!-- v-html：与v-text功能一样，但其可以解析html结构（有xss攻击等安全性问题） -->
        <div v-html="name2"></div>
        <!-- v-cloak（没有值）:本质是一个特殊属性，Vue实例创建并接管容器后，会删除v-cloak，配合css（display:none）使用可以解决网速慢时页面出现{{xxx}}的问题 -->
        <div v-cloak>{{name3}}</div>
        <!-- v-once（没有值）：其所在的节点在初次动态更新后，就视为静态数据了，以后数据的改变就不会影响v-once所在节点的值，可用于优化性能 -->
        <div v-once>n初始值：{{n}}</div>
        <div >n现值：{{n}}</div>
        <button @click="n++">点我n+1</button>
        <!-- v-pre（没有值）：跳过其所在节点的编译过程。可跳过没有使用指令语法、插值语法的节点，加快编译 -->
        <div v-pre>SnHI</div>
    </div>
         
    <script type="text/javascript">
        Vue.config.productionTip = false
                                   
        new Vue({
            el: '#root',
            data: {
                name1: "<h2>SnHI</h2>",
                name2: "<h1>dsa</h1>",
                name3: "SnHI",
                n: 1
            }
        })
    </script>
</body>
```

### 自定义指令

- 局部指令

	- new Vue({ directives:{ 指令名: 配置对象 } })
	- new Vue({ directives:{ 指令名(element, binding) { 回调函数 } } })

- 全局指令

	- Vue.directive(指令名, 配置对象)
	- Vue.directive(指令名, function(element, binding) { 回调函数 })

- 配置对象中常用的三个回调

	- bind()：指令与元素成功绑定时调用
	- inserted()：指令所在元素被插入页面时调用
	- update()：指令所在模板结构被重新解析时调用

- 指令定义时不加v-，使用时要加v-

- 指令名如果是多个单词，要使用kebab-case命名方式，不要用camelCase命名方式

	```html
	<body>
	    <div id="root">
	        <h2>当前n值：<span>{{n}}</span></h2>
	        <!-- 自定义指令v-big：将值放大十倍 -->
	        <h2>放大十倍后n值：<span v-big="n"></span></h2>
	        <button @click="n++">点我n+1</button>
	        <!-- 自定义函数v-fbind：使指令所在的input框获取焦点 -->
	        <input type="text" v-fbind:value="n">
	    </div>
	         
	    <script type="text/javascript">
	        Vue.config.productionTip = false
	        //全局指令
	        Vue.directive("big", function(element, binding){
	                    // console.log(this); //此处的this是window
	                    element.innerText = binding.value * 10
	                })
	                                   
	        new Vue({
	            el: '#root',
	            data: {
	                n: 1
	            },
	            //自定义指令（局部指令）
	            directives: {
	                //big在指令与函数成功绑定和指令所在的模板被重新解析时会被调用
	                //element：该指令所在的标签；binding：指令与函数绑定后的相关属性
	                //简写形式包括了bind方法和update方法
	                big(element, binding) {
	                    // console.log(this); //此处的this是window
	                    element.innerText = binding.value * 10
	                },
	                fbind: {
	                    //指令与函数成功绑定时执行
	                    bind(element, binding) {
	                        element.value = binding.value * 10
	                    },
	                    //指令所在元素被插入页面时（Vue解析模板之后）执行
	                    inserted(element, binding) {
	                        element.focus()
	                    },
	                    //指令所在的模板被重新解析时执行
	                    update(element, binding) {
	                        element.value = binding.value * 10
	                    }
	                }
	            }
	        })
	    </script>
	</body>
	```

### 生命周期

- 是Vue在关键时刻帮我们调用的一些特殊名称的函数，又名生命周期回调函数、生命周期函数、生命周期钩子
- 生命周期函数的名字不可更改，但函数的具体内容是程序员根据需求编写的
- 生命周期函数中的this指向是vm或组件实例对象

![](C:\Users\67090\Desktop\Typora\Vue\图库\lifecycle.png)

- 常用的生命周期钩子

	- mounted：发送ajax请求、启动定时器、绑定自定义事件、订阅消息等【初始化操作】
	- beforeDestroy：清除定时器、解绑自定义事件、取消订阅消息等【收尾工作】

- 关于销毁Vue实例

	- 销毁后借助Vue开发工具看不到任何信息
	- 销毁后自定义事件会失效，但原生DOM事件依然有效
	- 一般不会在beforeDestroy操作数据，因为即便操作了数据也不会再触发更新流程了

	```html
	<body>
	    <div id="root">
	        <!-- opacity：设置元素的不透明度 -->
	        <h1 :style="{opacity}">学习Vue</h1>
	        <button @click="stop">点我停止变换</button>
	    </div>
	         
	    <script type="text/javascript">
	        Vue.config.productionTip = false
	                                   
	        new Vue({
	            el: '#root',
	            data: {
	                opacity: 1
	            },
	            methods: {
	                stop() {
	                    //销毁Vue实例
	                    this.$destroy()
	                }
	            },
	            //八大生命周期
	            beforeCreate() {
	                console.log("beforeCreate")
	            },
	            created() {
	                console.log("created")
	            },
	            beforeMount() {
	                console.log("beforeMount")
	            },
	            //常用（初始化操作），Vue完成模板的解析并把初始的真实DOM元素放入页面后（挂载完毕）调用mounted
	            mounted() {
	                console.log("mounted")
	                //定时器，实现文字渐变
	                this.timer = setInterval(()=> {
	                    this.opacity -= 0.01
	                    if(this.opacity <= 0) this.opacity = 1
	                }, 16)
	            },
	            beforeUpdate() {
	                console.log("beforeUpdate")
	            },
	            updated() {
	                console.log("updated")
	            },
	            //常用（收尾操作）
	            beforeDestroy() {
	                //清除定时器
	                console.log("beforeDestroy")
	                clearInterval(this.timer)
	            },
	            destroyed() {
	                console.log("destroyed")
	            },
	        })
	    </script>
	</body>
	```

## 组件

### 定义

![image-20211120205826341](C:\Users\67090\Desktop\Typora\Vue\图库\组件基本原理.png)

- 模块：向外提供特定功能的js程序，便于复用js，简化js的编写，提高js的运行效率
- 组件：用来实现局部（特定）功能效果的代码集合，便于复用编码、简化项目编码、提高运行效率
- 模块化：当应用中的js都以模块来编写，那这个应用就是一个模块化的应用
- 组件化：当应用中的功能都是多组件的方式来编写，那这个应用就是一个组件化的应用

### 使用规范

- 步骤
	- 定义组件
	- 注册组件
	- 使用组件
- 定义方式
	- 使用Vue.extend(options)创建，其中需要注意options配置项中不能有el，因为最终所有的组件都要经过一个Vue实例的管理，由Vue实例来决定服务哪个容器；data必须写成函数式，以避免组件被复用时，数据存在引用关系
	- 简写：const school = options
- 注册方式
	- 局部注册：new Vue时传入components配置项
	- 全局变量：Vue.component('组件名', 组件)
- 使用方式
	
	- <组件名></组件名>
	
- 使用template可以配置组件结构

- 组件名

	- 单个单词首字母大小写皆可
	- 多个单词组成时使用kebab-case命名方式或CamelCase命名方式（需要Vue脚手架支持）

	- 使用name配置项指定组件在开发者工具中呈现的名字
	- 组件尽可能回避html中已有的元素名称

- 组件标签

	- <组件名></组件名>或<组件名/>（需要Vue脚手架支持）

	```html
	<body>
	    <div id="root">
	        <!-- 使用组件 -->
	        <School></School>
	        <hr>
	        <Student></Student>
	    </div>
	         
	    <script type="text/javascript">
	        Vue.config.productionTip = false
	
	        // 定义组件
	        const School = Vue.extend({
	            template:
	            `
	                <div>
	                    <h2>{{school}}</h2>
	                    <h2>{{address}}</h2>        
	                </div>
	            `,
	            // el: "#root", //在组件中不要写el配置项，因为最终所有的组件都要被Vue实例所管理，由Vue实例来决定服务哪个容器
	            data() {
	                return {
	                    school: "湖北师范大学",
	                    address: "黄石"
	                }
	            }
	        })
	        const Student = Vue.extend({
	            template:
	            `
	                <div>
	                    <h2>{{name}}</h2>
	                    <h2>{{age}}</h2>        
	                </div>
	            `,
	            data() {
	                return {
	                    name: "SnHI",
	                    age: 18
	                }
	            }
	        })
	                
	        // 全局注册组件
	        Vue.component("School", School)
	        
	        new Vue({
	            el: '#root',
	            // 注册组件（局部注册）
	            components: {
	                // School,
	                Student
	            }
	        })
	    </script>
	</body>
	```

### VueComponent

- 组件本质是一个名为VueComponent的构造函数，且不是程序员定义的，是Vue.extend生成的
- 在使用<组件名></组件名>时，Vue解析会帮我们创建组件的实例对象
- 每次调用Vue.extend，返回的都是一个全新的VueComponent
- 组件中的this指向均是VueComponent实例对象

### 单文件组件

#### 结构

- index.html

	```html
	<!DOCTYPE html>
	<html lang="en">
	<head>
	    <meta charset="UTF-8">
	    <meta http-equiv="X-UA-Compatible" content="IE=edge">
	    <meta name="viewport" content="width=device-width, initial-scale=1.0">
	    <title>Document</title>
	</head>
	<body>
	    <div id="root"></div>
	</body>
	</html>
	```
	
- main.js

  ```js
  // 需要在脚手架中使用才能被浏览器识别，才能运行成功
  import Vue from 'vue'
  // 引入App组件，是所有组件的父组件，需要Vue实例来管理app组件
  import App from './App.vue'
  
  new Vue({
      el: "#app",
      // 将App组件放入容器中
    	render: h => h(App),
  })
  ```

- App.vue

	```vue
	<!-- 管理所有组件 -->
	<template>
	    <div>
	        <school></school>
	        <student></student>
	    </div>
	</template>
	
	<script>
	    import School from "./School.vue"
	    import Student from "./Student.vue"
	
	    export default {
	        name: "App",
	        components: {
	            School,
	            Student
	        }
	    }
	</script>
	```

- School.vue

	```vue
	<template>
	    <!-- 结构 -->
	     <div id="root">
	        学校名称：{{name}}
	        学校地址：{{address}}
	        <button @click="showInfo">点我弹框</button>
	    </div>
	</template>
	
	<script>
	    // 交互
	    // 默认导出
	    export default {
	        name: "School",
	        data() {
	            return {
	                name: "湖北师范大学",
	                address: "黄石"
	            }
	        },
	        methods: {
	            showInfo() {
	                console.log(this.name);
	            }
	        },
	    }
	</script>
	
	<style>
	    /* 样式 */
	    #root {
	        height: 200px;
	        width: 200px;
	        background-color: aquamarine;
	    }
	</style>
	```

- student.vue

	```vue
	<template>
	     <div id="root">
	        学生姓名：{{name}}
	        学生年龄：{{age}}
	        <button @click="showInfo">点我弹框</button>
	    </div>
	</template>
	
	<script>
	    export default {
	        name: "Student",
	        data() {
	            return {
	                name: "SnHI",
	                age: 18
	            }
	        },
	        methods: {
	            showInfo() {
	                console.log(this.name);
	            }
	        },
	    }
	</script>
	
	<style>
	    #root {
	        height: 200px;
	        width: 200px;
	        background-color: bisque;
	    }
	</style>
	```

- 开发中需要创建App.vue来管理其他所有的组件

- 在main.js中创建Vue实例来管理App.vue（需要脚手架支持），main.js是整个项目的入口文件

- main.js中通过

  ```js
  render: h => h(App)
  ```

  将App组件注入容器中

  - 在main.js中引入Vue时引入的是vue.runtime.xxx.js，它是运行版的Vue，其中只包含核心功能但不包含模板解析器（只有vue.js两者都包含），所以不能使用template配置项，需要使用render函数接收到的createElement（可缩写为h）函数去指定具体内容

- 再在容器中引用vue.js和main.js实现最终效果

#### ref属性

- 被用来给元素或子组件注册引用信息（id的替代者）

- 应用在html标签上获取的是真实DOM元素，应用在组件标签上是组件实例对象（vc）

	```vue
	<template>
	    <div>
	        <h1 v-text="msg" ref="title"></h1>
	        <Person ref="per"></Person>
	        <Person id="per"></Person>
	        <button @click="showDom">点我获取元素</button>
	    </div>
	</template>
	
	<script>
	    import Person from './components/Person'
	
	    export default {
	        name: 'App',
	        components: {
	            Person
	        },
	        data() {
	            return {
	               msg: '欢迎学习Vue' 
	            }
	        },
	        methods: {
	            showDom() {
	                console.log(this.$refs.title); //真实DOM元素
	                console.log(this.$refs.per); //组件实例对象
	                console.log(document.getElementById('per')); //真实DOM元素
	            }
	        },
	    }
	</script>
	```

- 结果

	![](C:\Users\67090\Desktop\Typora\Vue\图库\ref属性结果.png)

#### props配置

- 让组件接收外部传过来的数据

- props是只读的，Vue底层会检测对props的修改，如果进行了修改，将会发出警告，若业务需求确实需要修改，请复制props的内容到data属性中，然后修改data属性的数据

- 传递方式

	```vue
	<template>
	    <div>
	        <h1 v-text="msg" ref="title"></h1>
	        <Person name = '张三' :age = '18' :weight = '50' :height = '180'></Person>
	        <Person name = '李四' :age = '19' :weight = '60' :height = '170'></Person>
	    </div>
	</template>
	```
	- 属性如果不使用v-bind动态绑定，将默认为字符串类型

- 接收方式

	- 简单接收

		```js
		props: ['name', 'age', 'weight', 'height'],
		```

	- 接收的同时对类型进行限制

		```js
		props: {
		    name: String,
		    age: Number,
		    weight: Number,
		    height: Number
		},
		```

	- 接收的同时设置类型、是否必需、默认值

		```js
		props: {
		    name: {
		        type: String,
		        required: true
		    },
		    age: {
		        type: Number,
		        default: 30
		    },
		    weight: {
		        type: Number,
		        required: false
		    },
		    height: {
		        type: Number,
		        required: false
		    }
		}
		```

#### mixin混入

- 可以把多个组件共用的配置提取成一个混入对象

- 在一个单独的js文件中定义共用的配置（mixin.js）

	```js
	export const show = {
	    data() {
	        return {
	            x: 10,
	            y: 20
	        }
	    },
	    methods: {
	        showName() {
	            alert(this.name)
	        }
	    },
	}
	```

	- 混入的数据与组件原有的数据进行合并，若有重复属性以组件原有属性数据为准

- 使用混入对象

	- 局部混入（组件中）

		```js
		<script>
		    // 引入混入
		    import {show} from '../mixin'
		
		    export default {
		        name: 'Person',
		        data() {
		            return {
		                name: '张三',
		                age: 18,
		                weight: 50,
		                height: 180
		            }
		        },
		        // 使用混入
		        mixins: [show]
		    }
		</script>
		```

	- 全局混入（main.js中）

		```js
		import {show} from './mixin'
		Vue.mixin(show)
		```

#### 插件

- 增强vue

- 包含install方法的一个对象，install方法的第一个参数是Vue（vm的构造函数），第二个以后的参数是插件使用者传递的数据

- 定义插件（plugins.js）

	```js
	// 定义插件
	export default {
	    install(Vue) {
	        // 全局过滤器
	        Vue.filter("mySlice", function(value) {
	            return value.slice(0, 4)
	        })
	        // 全局指令
	        Vue.directive("big", function(element, binding){
	            element.innerText = binding.value * 10
	        })
	        // 全局混入
	        Vue.mixin({
	            data() {
	                return {
	                    x: 10,
	                    y: 20
	                }
	            },
	        })
	    }
	}
	```

- 使用插件（main.js）

	```js
	// 引入插件
	import Plugin from './plugins'
	// 使用插件
	Vue.use(Plugin)
	```

#### scoped样式

- 多个组件的style样式最终会汇总到一个文件中，因此可能出现类名或id名冲突的问题，scoped样式让样式在局部生效，防止冲突

	```vue
	<template>
	    <div id="school">
	        <h1>名称：{{name}}</h1>
	        <h1>地址：{{address}}</h1>
	    </div>
	</template>
	
	<script>
	    export default {
	        name: 'School',
	        data() {
	            return {
	                name: '浙江大学',
	                address: '浙江',
	            }
	        },
	    }
	</script>
	
	<style scoped>
	    #school {
	        background-color: aqua;
	    }
	</style>
	```

### 备忘录案例

- 总结
	- 组件化编码流程
		- 拆分静态组件：组件要按功能点拆分，命名不要与html元素冲突
		- 实现动态组件：考虑好数据的存放位置，数据是一个组件在用则放在组件自身即可；数据是多个组件在用则放在这些组件共同的父组件上（状态提升）
		- 实现交互：从绑定事件开始，组件之间的数据交互要注意兄弟组件之间无法直接传递数据，需要通过共同的父组件来传递，其中一个子组件调用父组件传来的添加方法，通知父亲向另一个子组件更新数据
	- props适用于父组件向子组件通信，如果子组件要向父组件传递数据要求父组件先给子组件一个函数
	- 使用v-model时要切记v-model绑定的值不能是props传过来的值，因为props是只读的
	- 引入bootstrap等外部插件时，可以在app.vue中通过import引入，其所有子组件都可以使用
	- splice(index,len,[item])方法用来替换/删除/添加数组内某一个或者几个值（该方法会改变原始数组）
		- index：数组开始下标    
		- len：替换/删除的长度    
		- item：替换的值，删除操作的话 item为空
	- 随机序列nanoid
		- 通过在终端使用命令 install i nanoid 载入随机序列
		- 使用 import {nanoid} from 'nanoid' 在组件中引入nanoid
		- 使用方式： nanoid()
	- 复选框动态改变
		- :checked = "true/false"
	- reduce条件统计
		- reduce有两个参数，第一个为(pre, current) => {}函数，遍历几次函数便执行几次；第二个是统计的初始值；pre是上一次调用该函数的返回值；current为当前值
	- $nextTick
			- 在下一次DOM更新结束后执行指定的回调
		- 一般用在回调函数中的操作需要在DOM更新后执行这类情况
	
- main.js

  ```js
  import Vue from 'vue'
  import App from './App.vue'
  // 引入bootstrap
  import 'bootstrap'
  
  Vue.config.productionTip = false
  new Vue({
      el: '#app',
      render: h => h(App),
      // 安装全局事件总线
      beforeCreate() {
          Vue.prototype.$bus = this
      },
  })
  ```

- App.vue

  ```vue
  <template>
      <div style="width: 600px" class="panel panel-success">
          <div class="panel-heading">
              <h3 class="panel-title">备忘录</h3>
          </div>
          <div class="panel-body">
              <!-- 兄弟组件之间无法直接传递数据，因此通过共同的父组件来传递，其中一个子组件调用父组件传来的添加方法，通知父亲向另一个子组件更新数据 -->
              <DutyHeader :submitDuty="submitDuty"></DutyHeader>
              <DutyContext :dutys="dutys"></DutyContext>
              <DutyFooter :dutys="dutys" :checkAll="checkAll" :clearAll="clearAll"></DutyFooter>
          </div>
      </div>
  </template>
  
  <script>
      // 引入bootstrap，其所有子组件都可以使用
      import './assets/bootstrap/css/bootstrap.min.css'
      import DutyHeader from './components/DutyHeader'
      import DutyContext from './components/DutyContext'
      import DutyFooter from './components/DutyFooter'
  
      export default {
          name: 'App',
          components: {
              DutyHeader,
              DutyContext,
              DutyFooter
          },
          data() {
              return {
                  // 初始数据，本地存储中没有数据时取空数组
                  dutys: JSON.parse(localStorage.getItem("dutys")) || []
              }
          },
          methods: {
              // 添加duty
              submitDuty(dutyObj) {
                  this.dutys.unshift(dutyObj)
              },
              // 更新选中状态
              updateCompleted(id) {
                  this.dutys.forEach((duty) => {
                      if(duty.id === id) duty.completed = !duty.completed
                  });
              },
              // 删除Duty
              deleteDuty(id) {
                  this.dutys.forEach((duty, index) => {
                      if(duty.id === id) this.dutys.splice(index, 1)
                  });
              },
              // 编辑Duty
              updateDuty(id, title) {
                  this.dutys.forEach((duty) => {
                      if(duty.id === id) duty.dutyName = title
                  });
              },
              // 全选或取消全选
              checkAll(checked) {
                  this.dutys.forEach((duty) => {
                      duty.completed = checked
                  });
              },
              // 删除所有勾选Duty
              clearAll() {
                  // 过滤器不影响原数组，因此需要重新赋值
                  this.dutys = this.dutys.filter((duty) => {
                      return !duty.completed
                  }
              )}
          },
          // 监测dutys的变化，一旦变化将新的dutys存入本地存储
          watch: {
              dutys: {
                  deep: true,
                  handler(value) {
                      localStorage.setItem("dutys", JSON.stringify(value))
                  }
              }
          },
          // 使用全局事件总线使app组件和item组件之间直接传递数据，而无需通过context组件逐层传递
          mounted() {
              this.$bus.$on("updateCompleted", this.updateCompleted);
              this.$bus.$on("deleteDuty", this.deleteDuty);
              this.$bus.$on("updateDuty", this.updateDuty);
          },
          beforeDestroy() {
              this.$bus.$off(["updateCompleted", "deleteDuty", "updateDuty"]);
          }
      }
  </script>
  ```

- DutyHeader.vue

	```vue
	<template>
	  <div id="DutyHeader">
	        <div class="form-horizontal">
	            <div class="form-group">
	                <div class="col-sm-12">
	                    <input type="text" class="form-control" v-model="title" placeholder="输入今天要完成的任务" @keyup.enter="addDuty">
	                </div>
	            </div>
	        </div>
	    </div>
	</template>
	
	<script>
	    //引入随机序列 （install i nanoid）
	    import {nanoid} from 'nanoid'
	
	    export default {
	        name: 'DutyHeader',
	        // 拿到app组件传来的添加duty方法
	        props: ['submitDuty'],
	        data() {
	            return {
	                title: '',
	            }
	        },
	        methods: {
	            addDuty() {
	                // 判断是否为空值
	                if(!this.title) return alert('输入不能为空！')
	                // 包装对象
	                const dutyObj = {id: nanoid(), dutyName: this.title, completed: false}
	                // 通知app组件去添加一个duty对象
	                this.submitDuty(dutyObj)
	                // 清空输入框
	                this.title = ''
	            }
	        },
	    }
	</script>
	```

- DutyContext.vue

  ```vue
  <template>
      <div id="DutyContext">
          <ul class="list-group">
              <DutyItem v-for="duty in dutys" :key="duty.id" :duty="duty"></DutyItem>
          </ul>
      </div>
  </template>
  
  <script>
      import DutyItem from './DutyItem'
  
      export default {
          name: 'DutyContext',
          components: {
              DutyItem
          },
          props: ['dutys']
      }
  </script>
  
  <style>
  
  </style>
  
  ```

- DutyItem.vue

  ```vue
  <template>
      <li class="list-group-item">
          <label>
              <!-- :checked：控制复选框是否选中 -->
              <input type="checkbox" :checked="duty.completed" @change="checkCompleted(duty.id)">
              <span v-show="!duty.isEdit" style="margin-left: 10px; font-size: 16px">{{duty.dutyName}}</span>
              <input ref="inputTitle" v-show="duty.isEdit" style="margin-left: 10px" type="text" :value="duty.dutyName" @blur="handleBlur(duty, $event)">
          </label>
          <button style="float: right" type="button" class="btn btn-danger btn-sm" @click="handleDuty(duty.id)">删除</button>
          <button v-show="!duty.isEdit" style="float: right" type="button" class="btn btn-info btn-sm" @click="EditDuty(duty)">编辑</button>
      </li>
  </template>
  
  <script>
      export default {
          name: 'DutyItem',
          props: ['duty'],
          methods: {
              // 更新选中状态
              checkCompleted(id) {
                  // this.updateCompleted(id);
                  this.$bus.$emit("updateCompleted", id);
              },
              // 删除Duty
              handleDuty(id) {
                  if(confirm('确认删除吗？')) {
                      // this.deleteDuty(id)
                      this.$bus.$emit("deleteDuty", id);
                  }
              },
              // 编辑Duty
              EditDuty(duty) {
                  if("isEdit" in duty) {
                      duty.isEdit = true;
                  } else {
                      this.$set(duty, "isEdit", true);
                  }
                  // $nextTick：在下一次DOM更新结束后执行指定的回调
                  this.$nextTick(function() {
                      this.$refs.inputTitle.focus();
                  })
              },
              // 编辑框失去焦点并触发修改事件
              handleBlur(duty, e) {
                  duty.isEdit = false;
                  if(!e.target.value.trim()) return alert("输入不能为空");
                  this.$bus.$emit("updateDuty", duty.id, e.target.value);
              }
          },
      }
  </script>
  
  <style>
      li:hover {
          background-color: azure;
      }
  </style>
  
  ```

- DutyFooter.vue

	```vue
	<template>
	    <div id="DutyFooter" v-show="dutys.length">
	        <input type="checkbox" :checked="completedNum === dutys.length && dutys.length > 0" @click="choseAll">
	        <span style="margin-left: 10px">已完成{{completedNum}}
	            <span> / 全部{{dutys.length}}</span>
	        </span>
	        <button style="float: right" type="button" class="btn btn-danger btn-sm" @click="deleteAll">删除已完成任务</button>
	    </div>
	</template>
	
	<script>
	    export default {
	        name: 'DutyFooter',
	        props: ['dutys', 'checkAll', 'clearAll'],
	        computed: {
	            // 已勾选的数量，通过reduce条件统计实现
	            completedNum() {
	                return this.dutys.reduce((pre, current) => {
	                    return pre + (current.completed ? 1: 0)
	                }, 0)
	            }
	        },
	        methods: {
	            // 全选或取消全选
	            choseAll(e) {
	                this.checkAll(e.target.checked)
	            },
	            // 删除所有已勾选的Duty
	            deleteAll() {
	                if(confirm('确认删除已勾选的任务？')) {
	                    this.clearAll()
	                }
	            }
	        },
	    }
	</script>
	```

- 效果图

	![image-20220216144930483](C:\Users\67090\Desktop\Typora\Vue\图库\DutyList案例效果图.png)

### webStorage

- 分为本地存储localStorage和会话存储sessionStorage，存储内容大小一般支持5MB（不同浏览器不一样）

- 浏览器端通过Window.sessionStorage 和 Window.localStorage属性来实现本地存储机制

- 相关API

	- setItem(key, value)：该方法接收一个键和值作为参数，会把键值对添加到存储中，如果键名存在，则更新其对应的值
	- getItem(key)：该方法接收一个键名作为参数，返回键名对应的值
	- removeItem(key)：该方法接收一个键名作为参数，并把该键名从存储中删除
	- clear()：该方法会清空存储中的所有数据

- sessionStorage存储的内容会随着浏览器的关闭而消失，localStorage存储的内容需要手动清除才会消失

- getItem获取不到值是返回null

- 存储或获取对象时需要使用JSON解析

	![image-20220214151254171](C:\Users\67090\Desktop\Typora\Vue\图库\webStorage.png)

### 自定义事件

- 一种组件间通信的方式，适用于子组件向父组件传递数据

- 通过 v-on 或 @ 使父组件给子组件绑定一个自定义事件，在子组件中通过 $emit 来触发子组件实例身上的自定义事件，实现子给父传递数据

- 当组件实例对象vc被销毁时，所有自定义事件同样将被销毁

	- 父组件App.vue

		```vue
		<template>
		    <div>
		        <h1 v-text="msg"></h1>
		        <!-- 通过父组件给子组件绑定一个自定义事件实现子给父传递数据；如需给子组件绑定DOM原生事件，需加上.native，否则默认为自定义事件 -->
		        <Person v-on:SnHI="getPersonName" @click.native="show"></Person>
		    </div>
		</template>
		
		<script>
		    import Person from './components/Person'
		
		    export default {
		        name: 'App',
		        components: {
		            Person,
		        },
		        data() {
		            return {
		               msg: '组件自定义事件' 
		            }
		        },
		        methods: {
		            getPersonName(name) {
		                console.log("App获取到学生姓名", name);
		            }
		        },
		    }
		</script>
		```

	- 子组件Person.vue

		```vue
		<template>
		    <div>
		        <button @click="sendPersonName">点我获取学生姓名</button>
		    </div>
		</template>
		
		<script>
		    export default {
		        name: 'Person',
		        data() {
		            return {
		                name: '张三abc',
		            }
		        },
		        methods: {
		            sendPersonName() {
		                // .$emit：触发Person组件实例身上的SnHI事件
		                this.$emit("SnHI", this.name);
		            }
		        },
		    }
		</script>
		```

- 通过 $off 解绑自定义事件

	```vue
	<template>
	    <div>
	        <button @click="sendPersonName">点我获取学生姓名</button>
	        <button @click="unbind">点我解绑SnHI事件</button>
	    </div>
	</template>
	
	<script>
	    export default {
	        name: 'Person',
	        data() {
	            return {
	                name: '张三abc',
	            }
	        },
	        methods: {
	            sendPersonName() {
	                // .$emit：触发Person组件实例身上的SnHI事件
	                this.$emit("SnHI", this.name);
	            },
	            unbind() {
	                // 解绑一个自定义事件
	                this.$off("SnHI")
	                // 解绑多个自定义事件
	                this.$off(["SnHI"])
	                // 解绑所有自定义事件
	                this.$off()
	            }
	        },
	    }
	</script>
	```

### 全局事件总线

- 一种组件之间的通信方式，适用于任意组件间通信

- 安装全局事件总线

	```js
	import Vue from 'vue'
	import App from './App.vue'
	
	Vue.config.productionTip = false
	
	new Vue({
	    el: '#app',
	    render: h => h(App),
	    // 安装全局事件总线，$bus就是当前应用的vm
	    beforeCreate() {
	        Vue.prototype.$bus = this
	    },
	})
	```

- 使用事件总线

	- 接收数据

		```vue
		<script>
		    export default {
		        name: 'School',
		        methods: {
		            // 回调留在接收数据的组件自身中
		            sendName(data) {
		                console.log("School组件接收到学生姓名：", data);
		            }
		        },
		        mounted() {
		            // 绑定自定义事件
		            this.$bus.$on("sendName", this.sendName);
		        },
		        beforeDestroy() {
		            this.$bus.$off("sendName");
		        }
		    }
		</script>
		```

	- 传递数据

		```vue
		<script>
		    export default {
		        name: 'Person',
		        data() {
		            return {
		                name: '张三abc',
		            }
		        },
		        methods: {
		            sendStudentName() {
		                // 触发自定义事件并传递数据
		                this.$bus.$emit("sendName", this.name);
		            }
		        },
		    }
		</script>
		```

- 最好在beforeDestroy钩子中，用$off去解绑当前组件所用到的事件 

### 消息订阅与发布

- 一种组件之间的通信方式，适用于任意组件间通信
- 安装pubsub：终端输入命令 npm i pubsub-js 引入消息订阅插件

- 引入pubsub

	```js
	import pubsub from "pubsub-js"
	```

- 发布消息

	```js
	pubsub.publish("sendName", this.name)
	```

- 订阅/取消订阅消息

	```js
	mounted() {
	    // 订阅消息
	    this.pubId = pubsub.subscribe("sendName", this.sendName);
	},
	beforeDestroy() {
	    // 取消订阅，传入订阅消息的id
	    pubsub.unsubscribe(this.pubId);
	}
	```

### 动画效果

![image-20220216160952014](C:\Users\67090\Desktop\Typora\Vue\图库\动画效果.png)

- 将要展示动画的元素包裹在<transirion>标签中，apper表示开场时同样显示动画，<transirion>标签可设置name属性，设置后 .v-enter-active 和 .v-leave-active 中的 v 要对应name属性值

- 多个元素展示动画时包裹在<transirion-group>标签中，并为每个元素设置key值

	```vue
	<template>
	    <div id="demo">
	        <button @click="isShow = !isShow">显示/隐藏动画</button>
	        <transition appear>
	            <h1 v-show="isShow">SnHI</h1>
	        </transition>
	        
	        <!-- 多个元素同时展示动画 -->
	        <transition-group appear>
	            <h1 v-show="isShow" key="1">SnHI</h1>
	            <h1 v-show="isShow" key="2">SnHI</h1>
	        </transition-group>
	    </div>
	</template>
	
	<script>
	    export default {
	        name: 'Cartoon',
	        data() {
	            return {
	                isShow: true
	            }
	        },
	    }
	</script>
	
	<style scoped>
	    h1 {
	        background-color: aqua;
	    }
	    
		/* 进入时要激活的动画 */
	    .v-enter-active {
	        animation: SnHI 1s;
	    }
	    
		/* 离开时要激活的动画 */
	    .v-leave-active {
	        animation: SnHI 1s reverse;
	    }
	    
		/* 动画效果 */
	    @keyframes SnHI {
	        from {
	            transform: translateX(-100%);
	        }
	        to {
	            transform: translateX(0px);
	        }
	    }
	</style>
	```

#### animate.css

[animate官网]: https://animate.style/

- 终端执行命令：npm install animate.css 安装 animate.css 库

- 引入animate：import 'animate.css';

- <transition>标签配置name属性为animate_animated animate_bounce

- enter-active-class设置进入动画效果；leave-active-class设置离开动画效果

	```vue
	<template>
	    <div id="demo">
	        <button @click="isShow = !isShow">显示/隐藏动画</button>
	        <transition
	         appear
	         name="animate__animated animate__bounce"
	         enter-active-class="animate__wobble"
	         leave-active-class="animate__backOutUp">
	            <h1 v-show="isShow">SnHI3</h1>
	        </transition>
	    </div>
	</template>
	
	<script>
	    import 'animate.css'
	
	    export default {
	        name: 'myAnimate',
	        data() {
	            return {
	                isShow: true
	            }
	        },
	    }
	</script>
	
	<style scoped>
	    h1 {
	        background-color: aqua;
	    }
	</style>
	```

### slot插槽

- 可以让父组件向子组件指定位置插入html结构，也是一种组件间通信的方式

- 默认插槽：<slot>标签写在子组件中，其所在的位置表明要插入html结构的位置；html结构包裹在引用的组件中

- 具名插槽：通过对<slot>标签设置name属性，对要插入的html结构设置slot属性或v-slot，使插槽有了具体的id和对应的html结构

- 作用域插槽：数据在组件的自身，但根据数据生成的结构需要组件的使用者来决定，在<slot>标签处将数据传递出去，父组件中需要将要插入的html结构用<template>标签包裹起来并在标签中用scope属性接收传递过来的数据（接收变量名可以和传递的变量名不一致）

- App.vue

	```vue
	<template>
	    <div>
	        <h1 v-text="msg"></h1>
	        <Category title="美食">
	            <ul slot="slot1">
	                <li v-for="(item, index) in foods" :key="index">{{item}}</li>
	            </ul>
	        </Category>
	
	        <Category title="电影">
	            <template v-slot:slot1>
	                <ol slot="slot1">
	                    <li v-for="(item, index) in movies" :key="index">{{item}}</li>
	                </ol>
	            </template>
	        </Category>
	
	        <Category title="游戏">
	            <template slot="slot1" scope="data">
	                <h4 v-for="(game, index) in data.games" :key="index">{{game}}</h4>
	            </template>
	        </Category>
	    </div>
	</template>
	
	<script>
	    import Category from "./components/Category"
	
	    export default {
	        name: 'App',
	        components: {
	            Category,
	        },
	        data() {
	            return {
	               msg: 'slot插槽',
	               foods: ["宫保鸡丁", "鱼香肉丝", "锅包肉"],
	               movies: ["钢琴家", "绿皮书", "美丽人生"],
	            }
	        },
	    }
	</script>
	```

- Category.vue

	```vue
	<template>
	    <div id="demo">
	        <h2>{{title}}</h2>
	        <!-- 插槽，组件被使用时动态填充 -->
	        <slot :games="games" name="slot1">默认值</slot>
	    </div>
	</template>
	           
	<script>
	    export default {
	        name: 'Category',
	        props : ["title"],
	        data() {
	            return {
	                games: ["马里奥", "我的世界", "明日之后"]
	            }
	        },
	    }
	</script>
	```

## 脚手架

### 安装并使用

[vue脚手架官网]: https://cli.vuejs.org/zh/

- vue脚手架是vue提供的标准化开发工具

- 操作步骤

	- 配置npm淘宝镜像：npm config set registry https://registry.npm.taobao.org

	- cmd全局安装@vue/cli：npm install -g @vue/cli（管理员身份运行）

	- 切换到要创建项目的目录，使用cmd命令创建项目：Vue create vue_cli_test （项目名）

	- 运行npm run serve

	- 访问http://localhost:8080/

		![image-20211124155538474](C:\Users\67090\Desktop\Typora\Vue\图库\脚手架安装成功图.png)
		
	- Ctrl + C：停止终端

### 文件结构

![image-20220106154234777](C:\Users\67090\Desktop\Typora\Vue\图库\脚手架文件结构.png)

### 默认配置

- 在终端中使用vue inspect > output.js可以查看到Vue脚手架的默认配置

- 使用vue.config.js可以对脚手架进行个性化定制

	[配置参考]: https://cli.vuejs.org/zh/config/

	```js
	// 可选的配置文件
	module.exports = {
	    pages: {
	      index: {
	        // page 的入口
	        entry: 'src/index/main.js',
	        // 模板来源
	        template: 'public/index.html',
	        // 在 dist/index.html 的输出
	        filename: 'index.html',
	        // 当使用 title 选项时，
	        // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
	        title: 'Index Page',
	        // 在这个页面中包含的块，默认情况下会包含
	        // 提取出来的通用 chunk 和 vendor chunk。
	        chunks: ['chunk-vendors', 'chunk-common', 'index']
	      },
	      // 当使用只有入口的字符串格式时，
	      // 模板会被推导为 `public/subpage.html`
	      // 并且如果找不到的话，就回退到 `public/index.html`。
	      // 输出文件名会被推导为 `subpage.html`。
	      subpage: 'src/subpage/main.js'
	    }
	  }
	```

## 配置代理

[配置代理官网参考]: https://cli.vuejs.org/zh/config/#devserver-proxy

- 配置代理意在解决请求跨域问题，在 vue 脚手架配置文件中设置一个代理服务器并用 Axios 向后台发送请求以实现跨域请求

- 跨域问题：浏览器从一个域名的网页去请求另一个域名的资源时，域名、端口、协议任一不同

- Axios 是一个基于 promise 的 HTTP 库，可以用在浏览器和 node.js 中，用于向后台发起请求

- 终端执行命令 npm i axios 安装 axios

- 引入axios：import axios from "axios";

- App.vue

  ```vue
  <template>
      <div>
          <h1 v-text="msg"></h1>
          <button @click="getChatRoom()">获取聊天室登录页面源码</button>
          <button @click="getDormitory()">获取宿舍管理系统登录页面源码</button>
      </div>
  </template>
  
  <script>
      // 引入axios
      import axios from "axios";
      export default {
          name: 'App',
          components: {
          },
          data() {
              return {
                 msg: '配置代理' 
              }
          },
          methods: {
              getChatRoom() {
                  // 通过axios向后台发送get请求
                  axios.get("http://localhost:8080/SnHI1/Login").then(
                      // 访问成功的回调函数
                      response => {
                          console.log("请求成功了", response.data);
                      },
                      // 访问失败的回调函数
                      error => {
                          console.log("请求失败了", error.message);
                      }
                  )
              },
              getDormitory() {
                  axios.get("http://localhost:8080/SnHI2/Login").then(
                      // 访问成功的回调函数
                      response => {
                          console.log("请求成功了", response.data);
                      },
                      // 访问失败的回调函数
                      error => {
                          console.log("请求失败了", error.message);
                      }
                  )
              },
          },
      }
  </script>
  ```

  - axios带参数请求

  	```js
  axios.get("http://localhost:8081/login", {params: this.LoginInfo})
  	```

- vue.config.js（脚手架配置文件）

	- 方法一

		```js
		module.exports = {
		    // 开启代理服务器（方法一）
		    devServer: {
		        proxy: 'http://localhost:5000'
		    },
		}
		```

		- 优点：配置简单，请求资源时直接发给前端（8080）即可
		- 缺点：不能配置多个代理，不能灵活控制请求是否走代理
		- 工作方式：若按照上述配置代理，当请求了前端不存在的资源时，那么该请求会转发给服务器（优先匹配前端资源）

	- 方法二

		```js
		module.exports = {
		    // 开启代理服务器（方法二）
		    devServer: {
		        proxy: {
		          // 匹配所有以“SnHI”开头的请求路径
		          '/SnHI1': {
		            // 代理目标的基础路径
		            target: 'http://localhost:5000',
		            // 匹配所有路径中的/SnHI1转换为空
		            pathRewrite: {"^/SnHI1" : ""},
		            ws: true,
		            changeOrigin: true
		          },
		          '/SnHI2': {
		            target: 'http://localhost:5001',
		            pathRewrite: {"^/SnHI2" : ""},
		            ws: true,
		            changeOrigin: true
		          },
		        }
		    }
		}
		```

		- 优点：可以配置多个代理，且可以灵活的控制请求是否走代理
		- 缺点：配置略微繁琐，请求资源时必须加上前缀
		- pathRewrite：重写路径
		- ws：支持webSocket（默认为true）
		- changeOrigin：用于控制请求头中的host值，为true则代理服务器的host值为目标路径的host值；为false则为请求路径的host值（默认为true）

## Vuex

### 原理

[Github地址]: https://github.com/vuejs/vuex

- 专门在Vue中实现集中式状态（数据）管理的一个Vue插件，对vue应用中多个组件的共享状态进行集中式的管理（读/写），也是一种组件间通信的方式，且适用于任意组件间通信

- 当多个组件依赖于统一状态，来自不同组件的行为需要变更统一状态时使用Vuex

	![image-20220219101941118](C:\Users\67090\Desktop\Typora\Vue\图库\vuex原理.png)

- 原理示意图

	![vuex](C:\Users\67090\Desktop\Typora\Vue\图库\Vuex原理示意图.png)

### 环境搭建

- 终端执行命令：npm i vuex@3，下载vuex插件并指定版本

- 使用vuex

	```js
	Vue.use(Vuex)
	```

- store是Vuex中最为核心的部分，用于管理Actions，Mutations，State三个对象

- 在store文件夹下创建index.js，该文件用于创建Vuex中最为核心的store

	```js
	// 引入Vue
	import Vue from "vue"
	// 引入Vuex
	import Vuex from "vuex"
	// 准备actions，用于响应组件中的动作
	const actions = {}
	// 准备mutations，用于操作数据
	const mutations = {}
	// 准备state，用于存储数据
	const state = {}
	
	// 使用Vuex插件
	Vue.use(Vuex)
	// 创建并暴露store
	export default new Vuex.Store({
	    actions,
	    mutations,
	    state,
	})
	```

- main.js

	```js
	import Vue from 'vue'
	import App from './App.vue'
	// 引入store
	import store from "./store/index"
	
	Vue.config.productionTip = false
	
	new Vue({
	    el: '#app',
	    render: h => h(App),
	    store,
	    beforeCreate() {
	        Vue.prototype.$bus = this
	    },
	})
	```

- 创建store并搭建完成后，vm以及vc组件中将会出现$store

	![image-20220219154329062](C:\Users\67090\Desktop\Typora\Vue\图库\Vuex-store.png)

### 基本使用

- Count.vue

	```vue
	<template>
	    <div>
	        <h1>当前求和为：{{$store.state.sum}}</h1>
	        <h1>放大十倍后是：{{$store.getters.bigSum}}</h1>
	        <select v-model.number="number">
	            <option value="1">1</option>
	            <option value="2">2</option>
	            <option value="3">3</option>
	        </select>
	        <button @click="add()">+</button>
	        <button @click="subtract()">-</button>
	        <button @click="addOdd()">当前求和为奇数再加</button>
	        <button @click="addWait()">等一等再加</button>
	    </div>
	</template>
	           
	<script>
	    export default {
	        name: 'Count',
	        data() {
	            return {
	                number: 1
	            }
	        },
	        methods: {
	            add() {
	                // 没有逻辑判断可直接跳过dispatch执行commit操作数据
	                this.$store.commit("ADD", this.number);
	            },
	            subtract() {
	                this.$store.commit("SUBTRACT", this.number);
	            },
	            addOdd() {
	                this.$store.dispatch("addOdd", this.number);
	            },
	            addWait() {
	                this.$store.dispatch("addWait", this.number);
	            },
	        },  
	        mounted() {
	            console.log(this);
	        },
	    }
	</script>
	         
	<style>
	    button {
	        margin-left: 5px;
	    }
	</style>
	```

- index.js

	```js
	// 该文件用于创建Vuex中最为核心的store
	
	// 引入Vue
	import Vue from "vue"
	// 引入Vuex
	import Vuex from "vuex"
	// 准备actions，用于响应组件中的动作
	const actions = {
	    addOdd(context, value) {
	        if(context.state.sum % 2) {
	            context.commit("ADD", value);
	        }
	    },
	    addWait(context, value) {
	        setTimeout(() => {
	            context.commit("ADD", value);
	        }, 500)
	    },
	    
	}
	// 准备mutations，用于操作数据，mutations中的方法一般大写
	const mutations = {
	    ADD(state, value) {
	        state.sum += value;
	    },
	    SUBTRACT(state, value) {
	        state.sum -= value;
	    },
	}
	// 准备state，用于存储数据
	const state = {
	    sum: 0,
	}
	// 准备getters，用于将state中的数据进行加工
	const getters = {
	    bigSum(state) {
	        return state.sum * 10;
	    }
	}
	
	// 使用Vuex插件
	Vue.use(Vuex)
	// 创建并暴露store
	export default new Vuex.Store({
	    actions,
	    mutations,
	    state,
	    getters,
	})
	```

### map方法使用

- 从vuex中引入mapState, mapGetters, mapMutations, mapActions

- mapState方法：用于帮助我们映射state中的数据为计算属性

- mapGetters方法：用于帮助我们映射getters中的数据为计算属性

- mapActions方法：用于帮助我们生成与actions对话的方法，即包含dispatch方法

- mapMutations方法：用于帮助我们生成与actions对话的方法，即包含commit方法

	```vue
	<template>
	    <div>
	        <h1>当前求和为：{{sum}}</h1>
	        <h1>放大十倍后是：{{bigSum}}</h1>
	        <select v-model.number="number">
	            <option value="1">1</option>
	            <option value="2">2</option>
	            <option value="3">3</option>
	        </select>
	        <button @click="ADD(number)">+</button>
	        <button @click="SUBTRACT(number)">-</button>
	        <button @click="addOdd(number)">当前求和为奇数再加</button>
	        <button @click="addWait(number)">等一等再加</button>
	    </div>
	</template>
	           
	<script>
	    import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
	    export default {
	        name: 'Count',
	        data() {
	            return {
	                number: 1
	            }
	        },
	        computed: {
	            // 借助mapState生成计算属性，从State中获取数据
	            ...mapState(['sum']),
	            ...mapGetters(['bigSum'])
	        },
	        methods: {
	            // add() {
	            //     // 没有逻辑判断可直接跳过dispatch执行commit操作数据
	            //     this.$store.commit("ADD", this.number);
	            // },
	            // subtract() {
	            //     this.$store.commit("SUBTRACT", this.number);
	            // },
	            // 借助mapMutations生成对应的方法，方法中会调用commit去联系mutations，要传入的参数在模板中绑定事件时传入
	            ...mapMutations(['ADD', 'SUBTRACT']),
	
	            // addOdd() {
	                //     this.$store.dispatch("addOdd", this.number);
	            // },
	            // addWait() {
	                //     this.$store.dispatch("addWait", this.number);
	            // },
	            // 借助mapActions生成对应的方法，方法中会调用dispatch去联系actions，要传入的参数在模板中绑定事件时传入
	            ...mapActions(["addOdd", "addWait"])
	        },  
	        mounted() {
	            console.log(this);
	        },
	    }
	</script>
	         
	<style>
	    button {
	        margin-left: 5px;
	    }
	</style>
	```


### 组件模块化

- 让代码更好维护，让多种数据分类更加明确

- 使用组件模块化后，利用map映射生成state、getters、actions、mutations时，要标识出属于哪个模块

- 根模块index.js

	```js
	// 该文件用于创建Vuex中最为核心的store
	
	// 引入Vue
	import Vue from "vue"
	// 引入Vuex
	import Vuex from "vuex"
	// 引入Count模块组件
	import countOptions from "./Count"
	// 引入Person模块组件
	import personOptions from "./Person"
	
	// 使用Vuex插件
	Vue.use(Vuex)
	// 创建并暴露store
	export default new Vuex.Store({
	    modules: {
	        countOptions,
	        personOptions
	    }
	})
	```

- 人员模块组件Person.js

	```js
	import axios from 'axios'
	import { nanoid } from 'nanoid';
	
	// 人员模块组件
	export default {
	    // 开启命名空间
	    namespaced: true,
	    actions: {
	        addPersonFromServer(context) {
	            // 该请求用于返回一段随机文字
	            axios.get('https://api.uixsj.cn/hitokoto/get?type=social').then(
	                response => {
	                    context.commit("ADD_PERSON", {id: nanoid(), name: response.data})
	                },
	                error => {
	                    console.log(error.message);
	                }
	            )
	        }
	    },
	    mutations: {
	        ADD_PERSON(state, value) {
	            state.personList.unshift(value);
	        }
	    },
	    state: {
	        personList: [
	            // {id: "001", name: "张三"}
	        ]
	    },
	    getters: {}
	}
	```

- 求和模块组件Count.js

	```js
	//求和模块组件
	export default {
	    namespaced: true,
	    actions: {
	        addOdd(context, value) {
	            if(context.state.sum % 2) {
	                context.commit("ADD", value);
	            }
	        },
	        addWait(context, value) {
	            setTimeout(() => {
	                context.commit("ADD", value);
	            }, 500)
	        },
	    },
	    mutations: {
	        ADD(state, value) {
	            state.sum += value;
	        },
	        SUBTRACT(state, value) {
	            state.sum -= value;
	        },
	    },
	    state: {
	        sum: 0,
	    },
	    getters: {
	        bigSum(state) {
	            return state.sum * 10;
	        }
	    }
	}
	```

- Person.vue

	```vue
	<template>
	    <div>
	        <h1 v-text='msg'></h1>
	        <h3>Count组件求和为：{{sum}}</h3>
	        <input type="text" placeholder="请输入人员..." v-model="name">
	        <button @click="addPerson()">提交</button>
	        <button @click="addPersonFromServer()">随机产生一个人名</button>
	        <ul>
	            <li v-for="person in personList" :key="person.id">{{person.name}}</li>
	        </ul>
	    </div>
	</template>
	           
	<script>
	    import {mapState} from "vuex"
	    import {nanoid} from 'nanoid'
	    export default {
	        name: 'Person',
	        components: {
	                     
	        },
	        data() {
	            return {
	                msg: '人员列表' ,
	                name: ''
	            }
	        },
	        computed: {
	            // 使用组件模块化后，要标识属于哪个模块
	            ...mapState('countOptions', ['sum']),
	            ...mapState('personOptions', ['personList'])
	        },
	        methods: {
	            addPerson() {
	                const person = {id: nanoid(), name: this.name}
	                // 当不使用map生成getters/mutations/actions时，注意方法前缀要加上命名空间
	                this.$store.commit("personOptions/ADD_PERSON", person)
	                this.name = ''
	            },
	            addPersonFromServer() {
	                this.$store.dispatch("personOptions/addPersonFromServer")
	                this.name = ''
	            }
	        },
	    }
	</script>
	         
	<style>
	       
	</style>
	```

- Count.vue

	```vue
	<template>
	    <div>
	        <h1>当前求和为：{{sum}}</h1>
	        <h1>放大十倍后是：{{bigSum}}</h1>
	        <h3>Person组件人员人数为：{{personList.length}}</h3>
	        <select v-model.number="number">
	            <option value="1">1</option>
	            <option value="2">2</option>
	            <option value="3">3</option>
	        </select>
	        <button @click="ADD(number)">+</button>
	        <button @click="SUBTRACT(number)">-</button>
	        <button @click="addOdd(number)">当前求和为奇数再加</button>
	        <button @click="addWait(number)">等一等再加</button>
	    </div>
	</template>
	           
	<script>
	    import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
	    export default {
	        name: 'Count',
	        data() {
	            return {
	                number: 1
	            }
	        },
	        computed: {
	            ...mapState('countOptions', ['sum']),
	            ...mapState('personOptions', ['personList']),
	            ...mapGetters('countOptions', ['bigSum'])
	        },
	        methods: {
	            ...mapMutations('countOptions', ['ADD', 'SUBTRACT']),
	            ...mapActions('countOptions', ["addOdd", "addWait"])
	        },  
	        mounted() {
	            console.log(this);
	        },
	    }
	</script>
	```

## 路由

### 原理

- 一个路由就是一组映射关系（key - value），key为路径，value可能是function 或 component，多个路由需要由路由器管理

- 路由分类

	- 后端路由
		- value是function，用于处理客户端提交的请求
		- 工作过程：服务器接收到一个请求时，根据请求路径找到匹配的函数来处理请求，返回响应数据
	- 前端路由
		- value是component，用于展示页面内容
		- 工作过程：当浏览器的路径改变时，对应的组件就会显示

	![image-20220221112407041](C:\Users\67090\Desktop\Typora\Vue\图库\路由.png)

- SPA（single page web application）：单页Web应用，整个应用只有一个完整的页面，点击页面中的导航链接不会刷新页面，只会做页面的局部更新，数据需要通过ajax请求获取

- vue-router：vue的一个插件库，专门用来实现SPA应用

### 环境搭建

- 终端执行命令：npm i vue-router@3，下载vue-router插件并指定版本

- 使用VueRouter

	```js
	Vue.use(vueRouter)
	```

- 在router文件夹下创建index.js文件， 该文件专门用于创建整个应用的路由器

	```js
	// 该文件专门用于创建整个应用的路由器
	import VueRouter from 'vue-router'
	import About from '../components/About'
	import Home from '../components/Home'
	
	// 创建并暴露一个路由器
	export default new VueRouter({
	    routes: [
	        // 一组映射
	        {
	            path: '/About',
	            component: About
	        },
	        {
	            path: '/Home',
	            component: Home
	        },
	    ]
	})
	```

- main.js

	```js
	import Vue from 'vue'
	import App from './App.vue'
	// 引入vue-router
	import vueRouter from 'vue-router'
	// 引入路由器
	import router from './router/index'
	
	Vue.use(vueRouter)
	Vue.config.productionTip = false
	
	new Vue({
	    el: '#app',
	    router,
	    render: h => h(App),
	})
	```

### 基本使用

- App.vue

	```vue
	<template>
	    <div>
	        <div class=" col-md-6 panel panel-default">
	            <div class="panel-heading">
	                <h3 class="panel-title" v-text="msg"></h3>
	            </div>
	            <div class="panel-body">
	                <div class="col-md-3 list-group">
	                    <!-- vue中借助router-link实现路由的切换；active-class用于控制高亮样式 -->
	                    <router-link class="list-group-item" active-class="active" to="/About">About</router-link>
	                    <router-link class="list-group-item" active-class="active" to="/Home">Home</router-link>
	                </div>
	                <!-- 指定组件的呈现位置 -->
	                <router-view></router-view>
	            </div>
	        </div>
	    </div>
	</template>
	
	<script>
	    import './assets/bootstrap/css/bootstrap.min.css'
	    export default {
	        name: 'App',
	        components: {
	        },
	        data() {
	            return {
	               msg: '路由',
	            }
	        },
	    }
	</script>
	```

	- <router-link>标签用于实现路由的切换

		- replace属性：控制路由跳转时操作浏览器历史记录的模式，replace是替换当前记录、

			[^浏览器历史记录写入方式]: 浏览器的历史记录写入方式有两种，分别为 push 和 replace，push是追加历史记录，replace是替换当前记录，默认为push

	- <router-view>标签用于指定组件的呈现位置

- 注意点
	- 路由组件通常存放在pages文件夹中，一般组件通常存放在components文件夹中
	- 通过切换，隐藏了的路由组件默认是被销毁的，需要的时候再去挂载
	- 每个组件都有自己的$route属性，里面存储的是自己的路由信息
	- 整个应用只有一个router，可以通过组件的$router属性获取到

### 嵌套路由

- index.js

	```js
	// 该文件专门用于创建整个应用的路由器
	import VueRouter from 'vue-router'
	import About from '../pages/About'
	import Home from '../pages/Home'
	import News from '../pages/News'
	import Messages from '../pages/Messages'
	
	// 创建并暴露一个路由器
	export default new VueRouter({
	    routes: [
	        {
	            path: '/About',
	            component: About
	        },
	        {
	            path: '/Home',
	            component: Home,
	            // 嵌套路由
	            children: [
	                {
	                    // 二级路由不要写斜杠
	                    path: 'News',
	                    component: News,
	                },
	                {
	                    path: 'Messages',
	                    component: Messages
	                }
	            ]
	        },
	    ]
	})
	```

- Home.vue

	```vue
	<template>
	    <div>
	        <h2>我是Home的内容</h2>
	        <div>
	            <ul class="nav nav-tabs">
	                <li>
	                    <!-- 多级路由要写完整路径 -->
	                    <router-link class="list-group-item" active-class="active" to="/Home/News">News</router-link>
	                </li>
	                <li>
	                    <router-link class="list-group-item" active-class="active" to="/Home/Messages">Messages</router-link>
	                </li>
	            </ul>
	            <router-view></router-view>
	        </div>
	    </div>
	</template>
	           
	<script>
	    export default {
	        name: 'Home',
	    }
	</script>
	```

### query参数

- 参数接收方式：$route.query.xxx

- Messages.vue

	```vue
	<template>
	    <div>
	        <ul>
	            <li v-for="message in messageList" :key="message.id">
	                <!-- 跳转并携带query参数 -->
	                <router-link :to="{
	                    path: '/Home/Messages/Detail',
	                    query: {
	                        id: message.id,
	                        title: message.title
	                    }
	                }">{{message.title}}</router-link>
	            </li>
	        </ul>
	        <router-view></router-view>
	    </div>
	</template>
	           
	<script>
	    export default {
	        name: 'Messages',
	        data() {
	            return {
	                messageList: [
	                    {id: '001', title: '消息001'},
	                    {id: '002', title: '消息002'},
	                    {id: '003', title: '消息003'},
	                ]
	            }
	        },
	    }
	</script>
	```

- Detail.vue

	```vue
	<template>
	    <div>
	        <ul>
	            <!-- 接收参数 -->
	            <li>消息编号：{{$route.query.id}}</li>
	            <li>消息标题：{{$route.query.title}}</li>
	        </ul>
	    </div>
	</template>
	           
	<script>
	    export default {
	        name: 'Detail',
	    }
	</script>
	```

[^params参数]: 路由携带params参数时，需要给index.js路由配置文件中的path路径使用占位符声明接收params参数，如：“detail/:id/:title”；<router-link>标签中的to如果采用对象写法，则不能使用path配置项，必须使用name配置；接收参数时用$route.params.xxx

### props配置

- 让路由组件更方便的接收参数

- Detail.vue

	```vue
	<template>
	    <div>
	        <ul>
	            <!-- 接收参数 -->
	            <li>消息编号：{{id}}</li>
	            <li>消息标题：{{title}}</li>
	        </ul>
	    </div>
	</template>
	           
	<script>
	    export default {
	        name: 'Detail',
	        // 路由的props配置
	        props: ['id', 'title']
	    }
	</script>
	```

- 第一种写法：props值为对象，该对象中所有的key-value的组合最终都会通过props传给Detail组件

	```js
	props: {a: 900}
	```

- 第二种写法：props值为布尔值，布尔值为true，则把路由收到的所有params参数通过props传给Detail组件

	```js
	props: true
	```

- 第三种写法：props值为函数，该函数返回的对象中每一组key-value最终都会通过props传给Detail组件

	```js
	props($route) {
	    return {
	        id: $route.query.id,
	        title: $route.query.title
	    }
	}
	```

### 编程式路由导航

- 不借助<router-link>实现路由跳转，使路由跳转更加灵活

- 调用$router的 push / replace / back / forward / go 方法实现浏览时追加历史记录/浏览时不追加历史记录/后退一步/前进一步/前进或后退指定步数

- Messages.vue

	```vue
	<template>
	    <div>
	        <ul>
	            <li v-for="message in messageList" :key="message.id">
	                <!-- 跳转并携带query参数 -->
	                <router-link :to="{
	                    // path: '/Home/Messages/Detail',
	                    // 命名路由，可以简化路由
	                    name: 'detail',
	                    query: {
	                        id: message.id,
	                        title: message.title
	                    }
	                }">{{message.title}}</router-link>
	                <button @click="pushShow(message)">push查看</button>
	                <button @click="replaceShow(message)">replace查看</button>
	            </li>
	        </ul>
	        <router-view></router-view>
	    </div>
	</template>
	           
	<script>
	    export default {
	        name: 'Messages',
	        data() {
	            return {
	                messageList: [
	                    {id: '001', title: '消息001'},
	                    {id: '002', title: '消息002'},
	                    {id: '003', title: '消息003'},
	                ]
	            }
	        },
	        methods: {
	            pushShow(message) {
	                // push查看，追加历史记录
	                this.$router.push({
	                    name: 'detail',
	                    query: {
	                        id: message.id,
	                        title: message.title
	                    }
	                })
	            },
	            // replace查看，不追加历史记录
	            replaceShow(message) {
	                this.$router.replace({
	                    name: 'detail',
	                    query: {
	                        id: message.id,
	                        title: message.title
	                    }
	                })
	            }
	        },
	    }
	</script>
	```

- banner.vue

	```vue
	<template>
	    <div>
	        <h3 class="panel-title" v-text="msg"></h3>
	        <button @click="back()">后退</button>
	        <button @click="forward()">前进</button>
	        <button @click="go()">go</button>
	    </div>
	</template>
	           
	<script>
	    export default {
	        name: 'banner',
	        data() {
	            return {
	                msg: '路由'
	            }
	        },
	        methods: {
	            // 后退一步历史记录
	            back() {
	                this.$router.back()
	            },
	            // 前进一步历史记录
	            forward() {
	                this.$router.forward()
	            },
	            // 前进或后退指定步数
	            go() {
	                this.$router.go(2);
	            }
	        },  
	    }
	</script>
	```

### 缓存路由组件

- 让不展示的路由组件保持挂载，不被销毁，将<keep-alive>标签包裹在要展示的组件外面，include：只包含部分组件，值是组件名

	```vue
	<keep-alive include="News">
	    <router-view></router-view>
	</keep-alive>
	```

- 多个组件需要保持挂载，使用数组写法

	```vue
	<keep-alive :include="['News', 'Messages']">
	    <router-view></router-view>
	</keep-alive>
	```

### 路由生命周期钩子

- 路由组件所独有的两个生命周期钩子，用于捕获路由组件的激活状态
	- activated：路由组件被激活时触发
	- deactivated：路由组件失活时触发

### 路由守卫

- 对路由进行权限控制

- 全局守卫

	- 前置路由守卫

		```js
		// 全局前置路由守卫，在初始化和组件切换之前被调用；to：前往哪个组件；from：从哪个组件来；next：放行
		router.beforeEach((to, from ,next) => {
		    // if(to.path === '/Home/News' || to.path === '/Home/Messages') {
		    if(to.meta.isAuth) {
		        if(localStorage.getItem("school") === "湖北师范大学") {
		            next()
		        } else {
		            alert("学校名称不对，无法查阅")
		        }
		    } else {
		        next()
		    }
		})
		```

	- 后置路由守卫

		```js
		// 全局后置路由守卫，在初始化和组件切换之后被调用
		router.afterEach((to)=> {
		    document.title = to.meta.title || 'vue_cli_test'
		})
		```

- 独享守卫

	- 写在某一个路由组件下，用beforeEnter表示，独享守卫没有后置

	```js
	// 独享路由守卫
	beforeEnter: (to, from, next) => {
	    if(to.meta.isAuth) {
	        if(localStorage.getItem("school") === "湖北师范大学") {
	            next()
	        } else {
	            alert("学校名称不对，无法查阅")
	        }
	    } else {
	        next()
	    }
	},
	```

- 组件内守卫

	- beforeRouteEnter：进入守卫，通过路由规则进入该组件时被调用
	- beforeRouteLeave：离开守卫，通过路由规则离开该组件时被调用

	```vue
	<template>
	    <div>
	        <h2>我是About的内容</h2>
	    </div>
	</template>
	           
	<script>
	    export default {
	        name: 'About',
	        // 组件内守卫：进入守卫，通过路由规则进入该组件时被调用
	        beforeRouteEnter (to, from, next) {
	            console.log(to, from ,next);
	        },
	        // 组件内守卫：离开守卫，通过路由规则离开该组件时被调用
	        beforeRouteLeave (to, from, next) {
	            console.log(to, from ,next);
	        },
	    }
	</script>
	```

### 路由器工作模式

- hash模式

	- url中#及其后面的内容就是hash值，hash值不会包含在HTTP请求中，即hash值不会带给服务器
	- 地址中永远带着#号，不美观
	- 若以后将地址通过第三方手机app分享，若app校验严格，则地址会被标记为不合法
	- 兼容性较好
	- 页面刷新不会出现404的问题

- history模式

	- 地址干净，美观

	- 兼容性和hash模式相比略差
	- 应用部署上线时需要后端人员支持，解决刷新页面服务器404的问题

## UI组件库

- 移动端

	- [Vant]: https://youzan.github.io/vant

	- [Cube UI]: https://didi.github.io/cube-ui

	- [Mint UI]: https://mint-ui.github.io

- PC端

	- [Element UI]: https://element.eleme.cn

	- [IView UI]: https://www.iviewui.com

		

	

