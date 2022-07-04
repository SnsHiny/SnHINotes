# 抽象类		

- 用abstract关键词来修饰一个类时，这个类叫做抽象类
- 用abstract来修饰一个方法时，这个方法叫做抽象方法
- 含有抽象方法的类必须被声明为抽象类，抽象类必须被继承，抽象方法必须被重写
- 抽象类不能被实例化
- 抽象方法只需声明，而不需实现

# 接口

- 接口(interface)是抽象方法和常量值的定义的集合
- 从本质上讲，接口是一种特殊的抽象类，这种抽象类中只包含常量和方法的定义，而没有变量和方法的实现

- 接口中声明的属性默认为public static final，也只能是public static final


- 接口中只能定义抽象方法，而且这些方法默认为public ,也只能是public


- 接口可以继承其他的接口，并添加新的属性和抽象方法


- 
	多个无关的类可以实现同一个接口


- 一个类可以实现多个无关的接口


- 与继承关系类似，接口与实现类之间存在多态性

# 接口和抽象类的区别

- 抽象类可以有构造方法，接口中不能有构造方法

- 抽象类中可以有普通成员变量，接口中没有普通成员变量

- 一个类可以实现多个接口，但只能继承一个抽象类

- 1.8版本之后，抽象类和接口都可以定义静态方法

- 接口不能被实例化但是可以声明，必须引用一个实现该接口的对象

- 抽象类可以有构造方法但是不能被直接通过new进行实例化，可以通过子类继承，实例化子类的时候抽象类也

	会被实例化

- 从设计层面上来说，抽象类是对类的抽象，是一种模板设计，接口是行为的抽象，是一种行为的规范

# 多态

- 三个必要条件

	- 要有继承
	- 要有重写
	- 父类引用子类对象

# 内部类

- 匿名内部类的创建格式为：
	 new 父类构造器（参数列表）|实现接口（）{ 
	                                             //匿名内部类的类体实现 
	                                        }
- 使用匿名内部类时，必须继承一个类或实现一个接口 
- 匿名内部类由于没有名字，因此不能定义构造函数 
- 匿名内部类中不能含有静态成员变量和静态方法 
- 匿名内部类为局部内部类，所以局部内部类的所有限制同样对匿名内部类生效
-  匿名内部类不能是抽象的，它必须要实现继承的类或者实现的接口的所有抽象方法

# Java对象初始化顺序

- 父类静态代码块，父类静态成员变量
- 子类静态代码块，子类静态成员变量
- 父类普通代码块，父类普通成员变量
- 父类构造方法
- 子类普通代码块，子类普通成员变量
- 子类构造方法

# 容器

### Collection接口

- Collection接口定义了存取一组对象的方法，其子接口Set和List分别定义了存储方式，Map接口定义了存储“键（key）-值（value）映射对”的方法
	- Collection：Set：HashSet，不能重复没有顺序，至多只能由一个空值
		                                	List：LinkedList，ArrayList，可以重复有顺序，可以有多个空值
	- Map（键，值）：HashMap
- 线程安全的集合对象：Vector，HashTable，StringBuffer
- 非线程安全的集合对象：ArrayList，LinkedList，HashMap，HashSet，TreeMap，TreeSet，StringBuilder，ConcurrentHashMap（键不能重复，值可以重复）

### Iterator迭代器接口

- 所有实现了Collection接口的容器类都有一个iterator方法用以返回一个实现了Iterator接口的对象

- Iterator对象称作迭代器，用以方便的实现对容器内元素的遍历操作
	- boolean hasNext()，判断游标右边是否有元素
	- Object next()，返回游标右边的元素并将游标移动到下一个位置
	- Void remove()，删除游标左边的元素，在执行完next之后该操作只能执行一次

### 增强的for循环

- 增强的for循环对于遍历array或Collection的时候相当简便
- 缺陷：
	- 不能方便的访问数组下标
	- 与Iterator相比，不能方便的删除集合中的内容
- 除了简单的遍历并读出其中的内容外，不建议使用增强for循环

### Set接口

- Set接口是Collection的子接口类，Set接口没有提供额外的方法，但实现Set接口的容器类中的元素是没有顺序的，而且不能重复
- Set容器可以与数学中“集合”的概念相对应
- HashSet
	- 作为Set接口的主要实现类，线程不安全，可以存储null值，
	- 存储的过程中，先通过散列函数计算要添加元素的哈希值的散列码，根据散列码确定在数组中的下标，相同散列码的元素再比较哈希值是否相等，相等则再比较equals，不相等则以链表方式存储，相等则添加失败
	- 初始容量16，一次扩容为2倍
- LinkedHashSet：作为HashSet的子类，遍历其内部数据时，按照添加的顺序遍历，对于频繁的遍历操作，LinkedHashSet效率更高
- TreeSet：
	- 可以按照添加对象的指定属性进行排序，不能添加不同类的对象，底部由红黑树实现
	- 两种排序方式：自然排序（实现Comparable接口）和定制排序（Comparator），比较两个对象是否相同的标准为compareTo()返回0

### List接口（ArrayList，LinkedList）

- ArrayList读快改慢，LinkedList读慢改快，Hash位于两者之间
- List接口是Collection 的子接口，实现List接口的容器类中的元素是有顺序的，而且可以重复
- List容器中的元素都对应一个整数型的序号记载其在容器中的位置，可以根据序号中存取容器中的元素
- 初始容量10，一次扩容为1.5倍

### Collections工具类

- 类java.util.Collections提供了一些静态方法实现了基于List容器的一些常用算法
	- Collections.shuffle(list)//随机排序
	- Collections.reverse(list)//逆序
	- Collections.sort(list)//排序,默认从小到大
	- Collections.sort(list,Comparator)//根据指定的Comparator产生的顺序进行排序
	- Collections.swap(list,int,int)//交换两个int的位置
	- Object max(Collection)，Object min(Collection)//返回最大值，最小值
	- int frequency(Collection,Object)//返回指定集合中指定元素的出现次数

### Comparable接口

- 所有可以“排序”的类都实现了java.lang.Comparable接口，Comparable接口中只有一个方法
- public int CompareTo（Object obj）
	- 返回0表示this==obj
	- 返回正数表示this>obj
	- 返回负数表示this<obj
- 实现了Comparable接口的类通过实现compareTo方法从而确定该类对象的排序方式

### Map接口

- 实现Map接口的类用来存储键-值（对象） 对
- Map接口的实现类有HashMap和TreeMap等
- Map类中存储的键-值对通过键来标识，所以键值不能重复
- 比较大小的时候比较HashCode
- HashMap：
	- Map的主要实现类，线程不安全，效率高，可以存储null的key或value
	- 底层1.7以前数组+链表，1.8之后数组+链表+红黑树
	- 1.8中当数组的某一个索引位置上的元素以链表形式存在的数据个数>8且当前数组长度<64时，此时次此索引上的所有数据改为用红黑树存储
	- 初始容量16，加载因子0.75，临界值12，一次扩容为2倍
- LinkedHashMap：保证在遍历map元素时，可以按照添加的顺序实现遍历，因为在原有的HashMap底层结构基础上，添加了一堆指针，指向前一个和后一个，对于频繁的遍历操作，LinkedHashMap效率更高
- TreeMap：保证按照添加的key-value对进行排序，底层使用红黑树
- Hashtable：线程安全，效率低，不能存储null的key或value
- Properties：常用来处理配置文件，key和value都是String类型

### 自动打包/解包（Auto-Boxing/unBoxing）

- 在合适的时机自动打包、解包
	- 打包：自动将基础类型转换为对象
	- 解包：自动将对象转换为基础类型

### 泛型

- JDK1.4以前类型不明确：
  - 装入集合的类型被当做Object对待，从而失去自己的实际类型
  - 从集合中取出时往往需要转型，效率低，容易产生错误
- 所以引入泛型用以在定义集合的时候同时定义集合中对象的类型，增强程序的可读性和稳定性
- 可以有多个值
- 通配符 ?，不能向其内部添加数据，除了null以外

# 异常的捕获和处理

- Java异常是Java提供的用于处理程序中错误的一种机制

	- 所谓错误是指在程序运行的过程中发生的一些异常事件（如:除0溢出，数组下标越界，所要读取的文件不存在）

	- 设计良好的程序应该在异常发生时提供处理这些错误的方法，使得程序不会因为异常的发生而阻断或产生不可预见的结果

	- Java程序的执行过程中如出现异常事件，可以生成一个异常类对象，该异常对象封装了异常事件的信息并将被提交给Java运行时系统，这个过程称为抛出（throw）异常

	- 当Java运行时系统接收到异常对象时，会寻找能处理这一异常的代码并把当前异常对象交给其处理，这一过程称为捕获（catch）异常

	- public void someMethod() throws SomeExpection{
		               if(someCondition()){
		               throw new SomeException("错误原因");
		          }
		}

		try{
		//可能抛出异常的语句或方法
		}catch(SomeException1 e)
		{
		    ... ... ...
		}catch(SomeExpection2 e)
		{
		    ... ... ...
		}finally{
		    ... ... ...
		}

### try语句

- try代码段包含可能产生例外的代码，这段代码就是一次捕获并处理例外的范围
	在执行过程中，这段代码可能会产生并抛出一种或几种类型的异常对象，它后面的catch语句要分别对这些异常做相应的处理，如果没有例外产生，所有的catch代码段都被略过不执行

- try代码段后跟有一个或多个catch代码段
	每个catch代码段声明其能处理的一种特定类型的异常并提供处理的方法
	当异常发生时，程序会终止当前的流程，根据获取异常的类型去执行相应的catch代码段
	finally段的代码无论是否发生异常都有执行 

	try{
	语句1；
	语句2；
	}catch(SomeException1 e)
	{
	    ... ... ...
	}catch(SomeExpection2 e)
	{
	    ... ... ...
	}finally{
	    ... ... ...
	}

- 当语句1发生SomeExpection2 e错误时，跳过语句2和SomeException1 e代码段，直接执行SomeException2 e代码段和finally语句，语句2不再执行

### catch语句

- 在catch语句块中是对异常进行处理的代码，每个try语句块可以伴随一个或多个catch语句，用于处理可能产生的不同类型的异常处理对象
- 在catch中声明的异常对象（catch(SomeException e)）封装了异常事件发生的信息，在catch语句块中可以使用这个对象的一些方法获取这些信息，如：
	- getMessage()方法，用来得到有关异常事件的信息
	- printStackTrace()方法，用来跟踪异常事件发生时执行堆栈的内容

### finally语句

- finally语句为异常处理提供一个统一的出口，使得在控制流程转到程序的其他部分以前，能够对程序的状态做统一的管理
- 无论try所指定的程序块中是否抛出例外，finally多指定的代码都要被执行
- 通常在finally语句中可以进行资源的清除工作，如：
	- 关闭打开的文件
	- 删除临时文件

### 异常的分类

- Throwable
	- Error：称为错误，由Java虚拟机生成并抛出，包括动态链接失败、虚拟机错误等。程序对其不做处理
	- Exception：所有异常类的父类，其子类对应了各种各样可能出现的异常事件，一般需要用户显式的声明或捕获
	- Runtime Exception：一类特殊的异常，如被0除、数组下标超范围等，其产生比较频繁，处理麻烦，如果显式的声明或捕获将会对程序可读性和运行效率影响很大。因此由系统自动检测并将他们交给缺省的异常处理程序（用户可不必对其处理）

# IO流

![](C:\Users\67090\Desktop\Typora\JavaSE\IO流体系.png)

- 输入/输出流
	- 常见的节点流：InputStream/OutputStream/Reader/Wtriter
	- 常见的处理流：文件流/缓冲流/数据流/Print流/Object流

### 常见的节点流

- java.io包中定义了多个流类型（类或抽象类）来实现输入/输出功能，可以从不同的角度对其进行分类：
	- 按数据流的方向不同可以分为输入流和输出流（从程序的角度）
	- 按处理数据单位不同可以分为字节流（以字节为单位）和字符流（以字符为单位）
	- 按照功能不同可以分为节点流和处理流

- JDK所提供的所有流类型位于包java.io内都分别继承自以下四种抽象流类型：
	                                                                             字节流                         字符流
	输入流        InputStream                 Reader

	输出流        OutputStream               Writer

#### Reader/InputStream

- int read（）throws IOException，读取一个字节并以整数的形式返回（0~255），如果返回-1已到输入流的末尾
- int read（byte[] buffer，int offset，int length） throws IOException，读取length个字节，并储存到字节数组buffer，从length位置开始返回实际读取的字节数，如果读取前已到输入流的末尾返回-1
- void close（）throws IOException，关闭流释放内存资源

#### Writer/OutputStream

- void write（int b） throws IOException，想输出流中写入一个字节数据，该字节数据为参数b的低8位
- void write（byte[] b，int off，int len） throws IOException，将一个字节类型的数组中的从指定位置off开始的len个字节写入输出流
- void close（） throws IOException，关闭流释放内存资源
- void flush（） throws IOException，将输出流中缓存的数据全部写出到目的地

### 常见的处理流

#### 缓冲流

- 缓冲流要“套接”在相应的节点流之上，对读写的数据提供了缓冲的功能，提高了读写的效率，同时增加了一些新的方法
- 缓冲输入流支持其父类的mark方法和reset方法
- BufferedReader提供了readLine方法用于读取一行字符串
- BufferedWriter提供了newLine用于写入一个行分隔符
- 对于输出的缓冲流，写出的数据会现在内存中缓存，使用flush方法将会使内存中的数据立刻写出

#### 转换流

- InputStreamReader和OutputStreamWriter用与字节数据到字符数据之间的转换
- InputStreamReader需要和InputStream“套接”
- OutputStreamWriter需要和OutputStream“套接”
- 转换流在构造时可以指定其编码集合，例如：
	- InputStream isr=new InputStreamReader(System.in,"ISO8859_1")

#### 数据流

- DataInputStream和DataOutputStream分别继承自InputStream和OutputStream，它属于处理流，需要分别“套接”在InputStream和OutputStream类型的节点流上
- DataInputStream和OutputStream提供了可以存取与机器无关的Java原始类型数据（如int，double）的方法

#### Print流

- PrintWriter和PrintStream都属于输出流，分别针对与字符和字节
- PrintWriter和PrintStream提供了重载的print
- Println方法用于多种数据类型的输出
- PrintWriter和PrintStream有自动的flush功能（输出缓冲区的内容）

#### Object流

- 直接将Object写入或读出
- transient关键字（透明的，用于修饰变量，不参与序列化）
- serializable接口（序列化）
- externalizable接口（自己控制序列化）
- 要实现序列化对象必须要实现 Serializable 接口

# 线程

### 线程的基本概念

- 线程是一个程序内部的顺序控制流

- 线程和进程的区别

	- 每个进程都有独立的代码和数据空间（进程上下文），进程间的切换会有较大的开销

	- 线程可以看成是轻量级的进程，同一类线程共享代码和数据空间，每个线程有独立的运行栈和程序计数

		器（PC），线程切换的开销小

	- 多进程：在操作系统中能同时运行多个任务（程序）

	- 多线程：在同一应用程序中有多个顺序流同时执行

- Java的线程是通过java.lang.Thread类来实现的
- VM启动时会有一个由主方法（public static void main(){}）所定义的线程
- 可以通过创建Thread的实例来创建新的线程
- 每个线程都是通过某个特定Thread对象所对应的方法run()来完成其操作的，方法run()成为线程体
- 通过调用Thread类的start()方法来启动一个线程

### 线程的创建和启动

![](C:\Users\67090\Desktop\Typora\JavaSE\线程生命周期.png)

- 定义线程类实现Runnable接口

	- Thread myThread=new Thread（target）//target为Runnable接口类型
	- Runnable中只有一个方法：public void run()，用以定义线程运行体
	- 在使用Runnable接口可以为多个线程提供共享的数据
	- 在实现Runnable接口的类的run方法定义中可以使用Thread的静态方法：public static Thread currentThread()获取当前线程的引用

- 定义一个Thread的子类并重写其run方法

	- class MyThread extends Thread{
		         public void run(){

		​		}
		}

	- 然后生成该类的对象：MyThread myThread=new MyThread()
	
- 实现Callable接口

	- 创建一个实现Callable接口的实现类
	- 实现call方法，将此线程需要执行的操作声明在call()中
	- 创建Callable接口实现类的对象
	- 将此Callable接口实现类的对象作为参数传递到FutureTask构造其中，创建FutureTask的对象
	- 将FutureTask的对象作为参数传递到Thread类的构造器中，创建Thread对象，并调用start()方法
	- 用get()方法获取Callable中call方法的返回值

- Callable强于Runnable的原因

	- call()可以有返回值
	- call()可以抛异常，被外面的操作捕获，获取异常的信息
	- Callable支持泛型

### 线程的启动和休眠

- start，使之从新建状态转入就绪状态

- sleep，让线程睡眠一段时间，在此期间线程不消耗CPU资源

- suspend，使线程挂起，暂停执行，如果想回复线程，必须由其他线程调用resume方法

### 线程的优先级

- Java提供一个线程调度器来监控程序中启动后会进入就绪状态的所有线程
- 线程调度器按照线程的优先级决定应调度哪个线程来执行
- 线程的优先级用数字表示，范围1~10，一个线程的缺省优先级是5
	- Thread.MIN_PRIORITY=1
	- Thread.MAX_PRIORITY=10
	- Thread.NORM_PRIORITY=5
	- int getPriority()获得线程的优先级数值
	- void setPriority(int new Priorty)设置线程的优先级数值

### 线程的控制状态

- isAlive()，判断线程是否还“活”着，即线程是否还未终止
- Thread.sleep()，将当前线程睡眠指定毫秒数
	- 可以调用Thread的静态方法：public static void sleep(long millis) throws InterruptedExcption
		使得当前线程休眠，sleep可以由类名直接调用
- join()，调用某线程的该方法，将当前线程与该线程“合并”，即等待该线程结束，再回复当前线程的运行
- yield()，让出CPU，当前线程进入就绪队列等待调度
- wait()，当前线程进入对象的wait pool（可实现交替打印）
- notify()/notifyAll()，唤醒对象的wait pool中的一个/所有等待线程
- currentThread()，拿到当前线程

### 线程同步和死锁

- 线程同步
	- 在Java语言中，引入了对象互斥锁的概念（保证一个时间段里只有一个线程进入该方法），保证共享数据操作的完整性。每个对象都对应于一个可称为“互斥锁”的标记，这个标记保证在任一时刻，只能有一个线程访问该对象
	- 关键字synchronized来与对象的互斥锁联系，当某个对象synchronized修饰时，表明该对象在任一时刻只能由一个线程访问，但不限制其他线程访问其他未锁住的方法
	- 为保证前后访问一致，要考虑到所有访问该资源的所有方法，每个方法都要考虑要不要加锁
	- 改的时候加锁，读的时候不用加锁
- 线程死锁
  - 解决线程同步的时候容易出现线程死锁
  - 不同的线程分别占用对方需要的同步资源不放弃，都在等待对方放弃自己需要的同步资源，就形成了线程死锁
  - 出现死锁后，不会出现异常不会出现提示，只是所有的线程都处于阻塞状态，无法继续
  - 解决办法
    - 专门的算法、原则
    - 尽量减少同步资源的定义
    - 尽量避免嵌套同步

### 线程安全

- 线程安全的集合对象：Vector，HashTable，StringBuffer
- 非线程安全的集合对象：ArrayList，LinkedList，HashMap，HashSet，TreeMap，TreeSet，StringBuilder，ConcurrentHashMap（键不能重复，值可以重复）
- 面试题：Wait和Sleep区别
	- Object()类中调用wait()，wait()必须使用在同步代码块或同步方法中，wait时别的线程可以访问锁定对象，调用wait方法的时候必须锁定该对象，wait()住的时候，锁不再归当前对象所有
	- Thread类中声明sleep()，Sleep时别的线程也不可以访问锁定对象
- 面试题：synchronized和lock的异同
	- 相同：二者都可以解决线程安全问题
	- 不同：synchronized机制在执行完相应的同步代码后，自动的释放同步监视器，是隐式锁；lock需要手动的启动同步（lock()），同时结束同步也需要手动结束（unlock()），是显式锁

### 线程池

- 背景：经常创建和销毁、使用量特别大的资源，比如并发情况下的线程，对性能影响很大
- 思路：提前创建好多个线程，放入线程池中，使用时直接获取，使用完放回池中，可以避免频繁创建销毁、实现重复利用
- 好处：
	- 降低资源消耗（重复利用线程池中线程，不需要每次都创建）
	- 提高响应速度（减少创建新线程的时间）
	- 便于线程管理
		- corePollSize：核心池的大小
		- maximumPoolSize：最大线程数
		- keepAliveTim：线程没有任务时最多保持多长时间后会终止
- 过程：
	- 提供指定线程数量的线程池，主要接口：ExecutorService，Executors
	- 执行指定的线程的操作，需要提供Runnable或Callable实现类的对象
		- execute()方法适合Runnable
		- submit()方法适合Callable
	- 关闭线程池shutdown()

# 网络

### TCP/IP协议

​                               第5层协议
第5层←   ←   ←   ←  ←   →   →   →   →   →第5层
   ↓                          第4层协议                             ↑
第4层←   ←   ←   ←  ←   →   →   →   →   →第4层
   ↓                          第3层协议                             ↑
第3层←   ←   ←   ←  ←   →   →   →   →   →第3层
   ↓                          第2层协议                             ↑
第2层←   ←   ←   ←  ←   →   →   →   →   →第2层
   ↓                          第1层协议                             ↑
第1层←   ←   ←   ←  ←   →   →   →   →   →第1层
   ↓                                                                         ↑
​                              物理介质



OSI参考模型                   TCP/IP参考模型

   应用层

   表示层                                应用层

   会话层

----

   传输层                                传输层

   网络层                                网络层

---

数据链路层 

   物理层						 物理+数据链路层

### IP地址

- A类         0NetWork  Host  Host  Host

     Range（1-126）

- B类         10NetWork  NetWork  Host  Host
	           Range（128-191）
	
- C类         110NetWork  NetWork  NetWork  Host
	           Range（192-223）

### Socket通信：TCP/UDP

- TCP（transmission control protocol）

	是专门设计用于不可靠的因特网上提供可靠的，端到端的字节流通信的协议，它是一种面向连接的协议。TCP连接是字节流而非报文流

- UDP（user data protocol）
	UDP向应用程序提供了一种发送封装的原始IP数据包的方式，并且发送时无需建立连接。是一种不可靠的连接

- Socket
	- 两个Java应用程序可通过一个双向的网络通信连接实现数据交换，这个双向链路的一端称为一个Socket
		Socket通常用来实现client-server连接
	- java.net包中定义的两个Socket和ServerSocket，分别用来实现双向连接的client和server端
	- 建立连接时所需要的的寻址信息为远程计算机的IP地址和端口号（Port number）
	- 端口号用来区分同一台机器上的不同应用程序，自己写应用程序的时候占1024以上的端口号
	- 端口号分为TCP端口和UDP端口，每一个有65536个端口



# GUI

### AWT

- AWT（Abstract Window Toolkit）包括了很多类和接口，用于Java Application的GUI（Graphics User Interface 图形用户界面）编程
- GUI的各种元素（窗口，按钮，文本框等）由Java类来实现
- 使用AWT所涉及的类一般在java.awt包及其子包中
- Container和Component是AWT中的两个核心类

### 组件和容器

#### Component&Container

- Java的图形用户界面的最基本组成部分是Component，Component类及其子类的对象用来描述以图形化的方式显示在屏幕上并能与用户进行交互的GUI元素，例如，一个按钮，一个标签等
- 一般的Component对象不能独立地显示出来，必须将“放在”某一个Container对象中才可以显示出来
- Container是Component子类，Container子类对象可以“容纳”别的Component对象
- Container对象可使用方法add()向其中添加其他Component对象
- Container是Component的子类，因此Container对象也可以被当做Component对象添加到其他Container对象中
- 有两种常用的Container：
	- Window：其对象表示自由停泊的顶级窗口
	- Panel：其对象可作为容纳其它Component对象，但不能独立存在，必须被添加到其他Container中（如Window或Applet）

#### Frame

- Frame是Window的子类，由Frame或其子类创建的对象为一个窗体
- Frame的常用构造方法：Frame（），Frame（String s）创建标题栏为字符串s的窗口
- setBounds(int x.,int y,int width,int height)设置窗体位置和大小，x，y是左上角坐标
- setSize(int width,int height)设置窗体的大小
- setLocation(int x,int y)设置窗体的位置
- setBackgroud(Color c)设置背景颜色，参数为Color对象
- setVisible(boolean b)设置是否可见，默认false
- setTitle(String name)设置标题
- setResizable(boolean b)设置是否可以调整大小

### 布局管理器

- Java语言中，提供了布局管理器类的对象可以管理
- 管理Component在Container中的布局，不必直接设置Component位置和大小
- 每个Container都有一个布局管理器对象，当容器需要对某个组件进行定位或判断其大小尺寸时，就会调用其对应的布局管理器，调用Container的setLayout方法改变其布局管理器对象
- AWT提供了5种布局管理器：FLowLayout,BorderLayout,GridLayout,CardLayout,GridBagLayout

#### FlowLayout布局管理器

- 是Panel类的默认布局管理器
- FlowLayout布局管理器对组件逐行定位，行内从左到右，一行排满后换行
- 不改变组件的大小，按组件原有尺寸显示组件，可设置不同的组件间距，行距以及对齐方式
- FlowLayout布局管理器默认的对齐方式是居中

#### BorderLayout布局管理器

- BorderLayout是Frame类的默认布局管理器
- BorderLayout将整个容器的布局划分为东，南，西，北，中五个区域，组件只能被添加到指定的区域
- 如不指定组件的加入部位，则默认加入到CENTER区
- 每个区域只能加入一个组件，如加入多个，则先前加入的会被覆盖

#### GridLayout布局管理器

- GridLayout布局管理器将空间划分成规则的矩形网络，每个单元格区域大小相等，组件被添加到每个单元格中，先从左到右填满一行后换行，再从上到下
- 在GridLayout构造方法中指定分割的行数和列数

#### 布局管理器总结

- Frame是一个顶级窗口，Frame的缺省布局管理器为BorderLayout
- Panel无法单独显示，必须添加到某个容器中，Panel的缺省布局管理器为FlowLayout
- 当把Panel作为一个组件添加到某个容器中后，该Panel仍然可以有自己的布局管理器
- 使用布局管理器时，布局管理器负责各个组件的大小和位置，因此用户无法在这种情况下设置组件的大小和位置属性，如果试图使用Java语言提供的setLoction(),setSize(),setBounds()等方法，则都会被布局管理器覆盖
	如果用户确实需要亲自设置组件代销或位置，则应取消该容器的布局管理器，方法为：setLayout（null）



### 事件处理

- TextField对象可能发生Action（光标在文本框内敲回车）事件，与该事件对应的事件类是java.awt.event.ActionEvent
- 用来处理ActionEvent事件是实现了java.awt.event.ActionListener接口的类的对象，ActionListener接口定义方法有：public void actionPerformed(ActionEvent e)
- 实现该接口的类要在该方法中添加处理该事件的（Action）的语句
- 使用addActionListener(ActionListener I)方法为TextField对象注册一个ActionListener对象，当TextField对象发生Action事件时，会生成一个ActionEvent对象，该对象作为参数传递给ActionListener对象的actionPerformed方法，在方法中可以获取该对象的信息，并做相应的处理

- 内部类
	- 可以方便的访问包装类的成员
	- 可以更清楚的组织逻辑关系，防止不应该被其他类访问的类进行访问
	- 该类不允许或不需要其他类进行访问时使用内部类



### Java图形

- Graphics
	- 每个Component都有一个paint（Graphics g）用于实现绘图目的，每次重画该Component时都自动调用paint方法
	- Graphics类中提供了许多绘图方法，如：drawRect(int x,int y,int width,int height)/fillRoundRect(int x,int y,int width,int height,int arcWidth,int arcHeight)等

- 鼠标事件适配器
- 抽象类java.awt.event.MouseAdapter实现了MouseListener接口，可以使用其子类作为MouseEvent的监听器，只要重写其相应的方法即可
- 对于其它监听器，也有对应的适配器
- 使用适配器可以避免监听器类定义没有必要的空方法
- repaint()-update()-paint()，重画，repaint先调用了update方法然后调用paint方法，不然看不见画的东西



### Window事件

- Window事件所对应的事件类为WindowEvent，所对应的事件监听接口为WindowListener
- 与WindowListener对应的适配器为：WindowAdapter

### Swing

- Swing是在AWT的基础上构建的一套新的图形界面系统，它提供了AWT所能提供的所有功能，并且用纯粹的Java代码对AWT的功能大幅度的扩充
- AWT是基于本地方法的C/C++程序，其运行速度比较快；Swing是基于AWT的Java程序，使用单线程模式，其运行速度比较慢
- AWT的控件在不同的平台可能表现不同，而Swing在所有平台的表现一致
- 在实际应用中，应该使用AWT还是Swing取决于应用程序所部署的平台类型，如：
	- 对于一个嵌入式应用，目标平台的硬件资源往往非常有限，而应用程序的运行速度又是项目中至关重要的因素。在这种矛盾的情况下，简单而高效的AWT当然成了嵌入式Java的第一选择
	- 在普通的基于PC或者是工作站的标准Java应用中，硬件资源对应用程序所造成的限制往往不是项目中的关键因素，所以在标准版的Java中则提倡使用Swing，也就是通过牺牲速度来实现应用程序的功能

# 反射

- Reflection（反射）是使Java被视为动态语言（在运行时代码可以根据某些条件改变自身结构）的关键，反射机制允许程序在执行期间借助于Reflection API 取的任何类的内部信息，并能直接操作任意对象的内部属性及方法

# Servlet生命周期

- Servlet的生命周期分为5个阶段：加载、创建、初始化、处理客户请求、卸载
	- 加载：容器通过类加载器使用servlet类对应的文件加载servlet
	- 创建：通过调用servlet构造函数创建一个servlet对象
	- 初始化：调用init方法初始化
	- 处理客户请求：每当有一个客户请求，容器会创建一个线程来处理客户请求
	- 卸载：调用destroy方法让servlet自己释放其占用的资源

# GC垃圾回收

- 垃圾：没有任何引用指向的一个对象或者多个对象（循环引用）

- 定位垃圾
  - 引用计数（references count）：记录每个对象上有多少个引用指向它，计数为0时成为垃圾，不能解决循环引用的问题，会导致内存泄露
  - 根可达算法（Root Searching）：根对象指向的一些对象和这些对象里成员变量指向的其他对象都不是垃圾；根对象：JVM栈（JVM Stack）、本地方法栈（native method stack）、常量池（run-time constant pool）、静态变量（static references in method area）、多个class（clazz）

- 常见的垃圾回收算法（GC Algorithms）

  - Mark-Sweep（标记清除）：标记位置不连续，产生碎片
  - Copying（拷贝）：没有碎片，但浪费空间
  - Mark-Compact（标记压缩）：每次压缩需要线程同步，效率偏低

- 常见的垃圾回收器

  ![](C:\Users\67090\Desktop\Typora\JavaSE\常见的垃圾回收器.png)

  - serial：年轻代，串行回收
  - Parallel Scavenge：年轻代，并行回收
  - ParNew：年轻代，配合CMS的并行回收
  - SerialOld：老年代，串行回收
  - ParallelOld：老年代，并行回收
  - CMS：并发的，垃圾回收和应用程序可以同时运行，其他的垃圾回收器都不可以
  - 1.8默认的垃圾回收器：PS+PO

- JVM内存分代模型（用于分代垃圾回收算法）

  - 新生代（new-young）：存活对象少，使用copy算法，效率高
  - 老年代（old）：垃圾少，一般使用mark compact
  - 永久代(1.7)/元数据区(1.8)（metaspace）
    - 共同点都用来存class
    - 永久代必须指定大小限制
    - 元数据区可以设置也可以不设置，上限受限于物理内存
    - 字符串常量1.7在永久代，1.8在堆内存；方法区（逻辑概念）1.7理解为永久代，1.8理解为元数据区

- 堆内存逻辑分区

  - eden内存不足后执行YGC回收，大多数的对象会被回收，活着的对象进入s0
  - 再次YGC后，eden+s0中活着的对象进入s1
  - 再次YGC，eden+s1中活着的对象进入s0
  - 每次回收年龄增加1，年龄足够或s区装不下，进入老年代
  - 年龄足够指超过最大维持阈值（Max Tenuring Threshold）指定的次数
    - Parallel Scavenge：15
    - CMS：6
    - G1：15
  - 老年代满了执行FGC
  - <img src="C:\Users\67090\Desktop\Typora\JavaSE\GC堆内存逻辑分区.png"/>

- GC调优（GC Tuning）

	- 尽量减少FGC（Mark Compact效率低）

# 注解

- 注解Annotation是代码里的特殊标记，这些标记可以在编译，类加载，运行时被读取，并执行相应的处理。通过使用Annotation，程序员可以在不改变原有逻辑的情况下，在源文件中嵌入一些补充信息。代码分析工具、开发工具和部署工具可以通过这些补充信息进行验证或者进行部署
- Annotation可以向修饰符一样被使用，可以用于修饰包、类、构造器、方法、成员变量、参数、局部变量，这些信息被保存在Annotation的“name=value”对中
- 在JavaEE中，可以用来代替繁冗的XML配置代码
- 使用示例
	- 生成文档相关的注解
	- 在编译时进行格式检查（JDK内置的三个基本注解）
		- @Override：限定重现方法，该注解只能用于方法
		- @Deprecated：用于表示所修饰的元素（类，方法等）已过时，通常是因为所修饰的结构危险或存在更好的选择
		- @SuppressWarnings：抑制编译器警告，多个值用大括号括起来，用逗号隔开
	- 跟踪代码依赖性，实现替代配置文件功能
- 自定义注解
	- 注解声明为@interface
	- 内部定义成员，通常使用value表示
	- 可以指定成员的默认值，使用default定义
	- 如果自定义注解没有成员，表明是一个标识作用
	- 如果注解有成员，在使用注解时，需要指明成员的值
	- 自定义注解必须配上注解的信息处理流程（使用反射）才有意义
- 元注解
	- 对现有的注解进行解释说明的注解
	- @Retention：指定所修饰的Annotation的生命周期：SOURCE/CLASS（默认值）/RUNTIME，只有声明为RUNTIME生命周期的注解，才能通过反射获取
	- @Target：用于指定被修饰的Annotation能用于修饰哪些程序元素
	- @Documented
	- @Inherited

