# RabbitMQ

[^RabbitMQ官网]: https://www.rabbitmq.com/#getstarted

## 消息队列Message Quene

### 介绍

- MQ（Message Quene）：消息队列，通过典型的生产者和消费者模型，生产者不断向消息队列中生产消息，消费者不断从队列中获取消息。因为消息的生产和消费都是异步的，而且只关心消息的发送和接收，没有业务逻辑的侵入，轻松的实现系统间解耦。又名消息中间件，通过利用高效可靠的消息传递机制进行平台无关的数据交流，并基于数据通信来进行分布式系统的集成

### 分类

- ActiveMQ：ActiveMQ 是Apache出品，最流行的，能力强劲的开源消息总线。它是一个完全支持JMS（Java消息服务）规范的的消息中间件。丰富的API，多种集群架构模式让ActiveMQ在业界成为老牌的消息中间件，在中小型企业颇受欢迎
- Kafka：Kafka 是 LinkedIn 开源的分布式发布-订阅消息系统，目前归属于Apache顶级项目。Kafka主要特点是基于 Pull 的模式来处理消息消费，追求高吞吐量，一开始的目的就是用于日志收集和传输。0.8版本开始支持复制，不支持事务，对消息的重复、丢失、错误没有严格要求，适合产生大量数据的互联网服务的数据收集业务
- RocketMQ：RocketMQ是阿里开源的消息中间件，它是纯Java开发，具有高吞吐量、高可用性、适合大规模分布式系统应用的特点。RocketMQ思路起源于Kafka，但并不是Kafka的一个Copy，它对消息的可靠传输及事务性做了优化，目前在阿里集团被广泛应用于交易、充值、流计算、消息推送、日志流式处理、binglog分发等场景
- RabbitMQ：RabbitMQ是使用Erlang语言开发的开源消息队列系统，基于AMQP协议来实现。AMQP的主要特征是面向消息、队列、路由（包括点对点和发布/订阅）、可靠性、安全。AMQP协议更多用在企业系统内对数据一致性、稳定性和可靠性要求很高的场景，对性能和吞吐量的要求还在其次。RabbitMQ比Kafka可靠，Kafka更适合IO高吞吐的处理，一般应用在大数据日志处理或对实时性（少量延迟），可靠性（少量丢数据）要求稍低的场景使用，比如ELK日志收集

### AMQP协议

- AMQP（advanced message queuing protocol）在2003年时被提出，最早用于解决金融领域不同平台之间的消息传递交互问题。顾名思义，AMQP是一种协议，更准确的说是一种binary wire-level protocol（链接协议）。这是其和JMS的本质差别，AMQP不从API层进行限定，而是直接定义网络交换的数据格式。这使得实现了AMQP的provider天然性就是跨平台的。以下是AMQP协议模型

	![](C:\Users\67090\Desktop\Typora\RabbitMQ\图片\AMQP协议模型.png)

	- 为了让各个用户可以互不干扰的工作，RabbitMQ添加了虚拟主机（Virtual Hosts）的概念。其实就是一个独立的访问路径，不同用户使用不同路径，各自有自己的队列、交换机，互相不会影响。相当于关系型中的数据库
	- 生产者登录用户名密码连接指定的虚拟主机，将消息发送至交换机中（也可以直接发送给消息队列），交换机再将消息转发至消息队列中；消费者也需要登录对应虚拟主机的用户名密码才能获取消息队列中的消息，并且无需在意生产者是否运行，只要消息队列中有消息即可

### 消息模型

![image-20220316205737271](C:\Users\67090\Desktop\Typora\RabbitMQ\图片\消息模型1.png)

![image-20220316205825891](C:\Users\67090\Desktop\Typora\RabbitMQ\图片\消息模型2.png)

#### 直连模型

![image-20220317211039787](C:\Users\67090\Desktop\Typora\RabbitMQ\图片\直连模型.png)

- P：生产者，也就是要发送消息的程序
- C：消费者：消息的接受者，会一直等待消息到来
- queue：消息队列，图中红色部分，类似一个邮箱，可以缓存消息。生产者向其中投递消息，消费者从其中取出消息

#### 任务模型

![image-20220317211019210](C:\Users\67090\Desktop\Typora\RabbitMQ\图片\任务模型.png)

- Work queues，也被称为Task queues。 当消息处理比较耗时的时候，可能生产消息的速度会远远大于消息的消费速度。长此以往，消息就会堆积越来越多，无法及时处理。此时就可以使用work 模型。让多个消费者绑定到一个队列，共同消费队列中的消息。队列中的消息一旦消费，就会消失，因此任务是不会被重复执行的

- 缺点：默认情况下，RabbitMQ会按顺序将每个消息发送给下一个使用者。平均而言，每个消费者都会收到相同数量的消息。这种分发消息的方式称为循环。但如果有处理消息慢的线程，这也会导致整体运行效率降低

	[^消息自动确认机制]: 完成一项任务可能需要几秒钟，如果其中一个消费者开始了一项长期任务，但只完成了一部分就死了，会发生什么情况。在我们当前的代码中，一旦RabbitMQ将消息传递给使用者，它就会立即将其标记为删除。在这种情况下，如果杀死一个生产者，我们将丢失它刚刚处理的消息。我们还将丢失发送给该特定工作进程但尚未处理的所有消息。 但我们不想失去任何任务。如果一个生产者死了，我们希望把任务交给另一个生产者

- 解决方法

	- 设置通道一次只能消费一个消息

		```java
		channel.basicQos(1);
		```

	- 关闭消息的自动确认

		```java
		channel.basicConsume("work1", false, new DefaultConsumer(channel) {...})
		```

	- 开启手动确认

		```java
		//手动确认消息标识 参数一：对哪个消息通道进行设置；参数二：是否一次交付多个任务
		channel.basicAck(envelope.getDeliveryTag(), false);
		```

#### 广播/fanout模式

![image-20220317210958110](C:\Users\67090\Desktop\Typora\RabbitMQ\图片\广播模型.png)

- 可以有多个消费者，每个消费者都有自己的队列，每个队列都要绑定到Exchange（交换机）中。生产者发送的消息只能发送到交换机，由交换机来决定要发哪个队列，生产者无法决定。交换机把消息发送给绑定过的所有队列，队列的消费者都能拿到消息，实现一条消息被多个消费者消费

- 代码流程

	- 生产者中为通道声明指定交换机

		```java
		// 参数一：交换机名称；参数二：交换机类型（fanout：广播类型）
		channel.exchangeDeclare("logs", "fanout");
		```

	- 消费者中同样先声明交换机（与生产者中的一致）

	- 创建临时队列

		```java
		String queue = channel.queueDeclare().getQueue();
		```

	- 绑定交换机和临时队列

		```java
		// 参数三：路由
		channel.queueBind(queue, "logs", "");
		```

#### 路由-Direct模式

![image-20220317210924914](C:\Users\67090\Desktop\Typora\RabbitMQ\图片\路由-direct模型.png)

- 在Fanout模式中，一条消息会被所有订阅的队列都消费。但是在某些场景下，我们希望不同的消息被不同的队列消费，这时就要用到Direct类型的exchange
- 在Direct模式下，队列与交换机的绑定不再是任意绑定，而是要指定一个RoutingKey。消息的发送方在向Exchange发送消息时，也必须指定消息的RoutingKey
- Exchange不再把消息交给每一个绑定的队列，而是根据消息的RoutingKey进行判断，只有队列的RoutingKey与消息的RoutingKey完全一致，才会接收到消息

#### 路由-Topic模式

![image-20220317210842819](C:\Users\67090\Desktop\Typora\RabbitMQ\图片\路由-topic模型.png)

- Topic类型的Exchange与Direct相比，都是可以根据RoutingKey把消息路由到不同的队列。只不过Topic类型Exchange可以让队列在绑定Routing key的时候使用通配符。这种模型下的Routingkey一般都是由一个或多个单词组成，多个单词之间以”.”分割， 例如：item.insert
- 统配符 	
	- *：star，只能匹配一个词 
	- #：hash，可以匹配零个、一个或多个词

## 安装

- 使用docker安装

	```shell
	[root@snhi ~]# docker pull rabbitmq
	```

- 启动RabbitMQ

  ```shell
  docker run -d --hostname my-rabbit --name rabbit -p 15672:15672 -p 5672:5672 rabbitmq
  ```

  - --hostname：指定容器主机名称
  - --name：指定容器名称
  - -p：将mq端口号映射到本地

- 进入容器

  ```shell
  docker exec -it 容器ID /bin/bash
  ```

  [^RabbitMQ容器ID]: 676369a22221

- 安装插件

	```shell
	rabbitmq-plugins enable rabbitmq_management
	```

- 退出容器

	```
	Ctrl+p+q
	```

[访问RabbitMQ地址]: http://192.168.44.3:15672	"用户名：guest；密码guest"

## 管理命令行

- 服务启动相关

	```shell
	systemctl start|restart|stop|status rabbitmq-server
	```

- 管理命令行：用来在不使用web管理界面情况下命令操作RabbitMQ

	```shell
	rabbitmqctl help # 可以查看更多命令
	```

- 插件管理命令行

	```shell
	rabbitmq-plugins enable|list|disable 
	```

## 管理界面

![image-20220316203804921](C:\Users\67090\Desktop\Typora\RabbitMQ\图片\RabbitMQWeb管理界面概览.png)

- connections：无论生产者还是消费者，都需要与RabbitMQ建立连接后才可以完成消息的生产和消费，在这里可以查看连接情况
- channels：通道，建立连接后，会形成通道，消息的投递获取依赖通道
- Exchanges：交换机，用来实现消息的路由
- Queues：队列，即消息队列，消息存放在队列中，等待消费， 消费后被移除队列

## 入门案例

- 引入依赖

	```xml
	<dependency>
	    <groupId>com.rabbitmq</groupId>
	    <artifactId>amqp-client</artifactId>
	    <version>5.7.2</version>
	</dependency>
	```

- 生产者Provider

	```java
	/**
	 * 直连模型：生产者
	 */
	public class Provider {
	
	    /**
	     * 生产消息
	     * @throws IOException
	     * @throws TimeoutException
	     */
	    @Test
	    public void testSendMessage() throws IOException, TimeoutException {
	        // 创建连接mq的连接工厂对象
	        ConnectionFactory connectionFactory = new ConnectionFactory();
	        // 设置连接rabbitmq主机
	        connectionFactory.setHost("192.168.44.3");
	        // 设置端口号
	        connectionFactory.setPort(5672);
	        // 设置连接哪个虚拟主机
	        connectionFactory.setVirtualHost("/ems");
	        // 设置访问虚拟主机的用户名和密码
	        connectionFactory.setUsername("ems");
	        connectionFactory.setPassword("123");
	        // 获取连接对象
	        Connection connection = connectionFactory.newConnection();
	        // 获取连接中通道
	        Channel channel = connection.createChannel();
	
	        /**
	         * 参数一：队列名称，如果队列不存在则自动创建
	         * 参数二：用来定义队列特性是否要持久化，如为false，则会在rabbitmq重启后关闭消息队列
	         * 参数三：是否为独立队列
	         * 参数四：是否在消费完成后自动删除队列
	         * 参数五：额外附加参数
	         */
	        // 通道绑定对应消息队列
	        channel.queueDeclare("hello1", true, false, true, null);
	        /**
	         * 参数一：交换机名称
	         * 参数二：队列名称
	         * 参数三：传递消息额外设置（PERSISTENT_TEXT_PLAIN：持久化队列中的消息）
	         * 参数四：消息的具体内容
	         */
	        // 发布消息
	        channel.basicPublish("", "hello1", MessageProperties.PERSISTENT_TEXT_PLAIN, "HelloWorld".getBytes());
	        // 关闭通道
	        channel.close();
	        // 关闭连接
	        connection.close();
	    }
	
	    @Test
	    public void testSendMessageByUtils() throws IOException {
	        Connection connection = RabbitMQUtils.getConnection();
	        Channel channel = connection.createChannel();
	        channel.queueDeclare("hello", false, false, false, null);
	        channel.basicPublish("", "hello", null, "HelloRabbitMQ".getBytes());
	        RabbitMQUtils.closeConnectionAndChanel(channel, connection);
	    }
	}
	```

- 消费者Consumer

	```java
	/**
	 * 直连模型：消费者
	 */
	public class Consumer {
	
	    public static void main(String[] args) throws IOException {
	        Connection connection = RabbitMQUtils.getConnection();
	        Channel channel = connection.createChannel();
	        // 要和生产者绑定的消息队列相同
	        channel.queueDeclare("hello1", true, false, true, null);
	        /**
	         * 参数一：要消费消息的队列名称
	         * 参数二：开始消息的自动确认机制
	         * 参数三：消费时的回调函数
	         */
	        channel.basicConsume("hello1", true, new DefaultConsumer(channel) {
	            @Override
	            public void handleDelivery(String consumerTag, Envelope envelope, AMQP.BasicProperties properties, byte[] body) throws IOException {
	                System.out.println(new String(body));
	            }
	        });
	    }
	}
	```

- 工具类RabbitMQUtils

	```java
	/**
	 * RabbitMQ工具类
	 */
	public class RabbitMQUtils {
	
	    private static ConnectionFactory connectionFactory;
	    private static Properties properties;
	    // 类加载只执行一次
	    static {
	        connectionFactory = new ConnectionFactory();
	        connectionFactory.setHost("192.168.44.3");
	        connectionFactory.setPort(5672);
	        connectionFactory.setVirtualHost("/ems");
	        connectionFactory.setUsername("ems");
	        connectionFactory.setPassword("123");
	    }
	
	    /**
	     * 获取连接对象
	     * @return
	     */
	    public static Connection getConnection() {
	        try {
	            return connectionFactory.newConnection();
	        } catch (Exception e) {
	            e.printStackTrace();
	        }
	        return null;
	    }
	
	    /**
	     * 关闭通道和连接
	     * @param channel
	     * @param connection
	     */
	    public static void closeConnectionAndChanel(Channel channel, Connection connection) {
	        try {
	            if (channel != null) channel.close();
	            if (connection != null) connection.close();
	        } catch (Exception e) {
	            e.printStackTrace();
	        }
	    }
	}
	```

## SpringBoot整合RabbitMQ

- 引入依赖

	```xml
	<dependency>
	    <groupId>org.springframework.boot</groupId>
	    <artifactId>spring-boot-starter-amqp</artifactId>
	</dependency>
	```

- 配置文件

	```yml
	spring:
	  application:
	    name: SpringBoot_RabbitMQ
	
	  rabbitmq:
	    host: 192.168.44.3
	    port: 5672
	    username: ems
	    password: 123
	    virtual-host: /ems
	```

- 生产者ProviderController

	```java
	package com.SnHI.rabbitmq.controller;
	
	import org.springframework.amqp.rabbit.core.RabbitTemplate;
	import org.springframework.beans.factory.annotation.Autowired;
	import org.springframework.web.bind.annotation.GetMapping;
	import org.springframework.web.bind.annotation.RestController;
	
	/**
	 * 生产者
	 */
	@RestController
	public class ProviderController {
	
	    @Autowired
	    private RabbitTemplate rabbitTemplate;
	
	    /**
	     * 直连模型
	     * @return
	     */
	    @GetMapping("/helloWorld")
	    public String helloWorld() {
	        rabbitTemplate.convertAndSend("hello", "HelloWorld");
	        return "发送成功！";
	    }
	
	    /**
	     * 工作模型
	     * @return
	     */
	    @GetMapping("/work")
	    public String Work() {
	        for (int i = 0; i < 10; i++) {
	            rabbitTemplate.convertAndSend("work", "Work");
	        }
	        return "发送成功！";
	    }
	
	    /**
	     * 广播模型
	     * @return
	     */
	    @GetMapping("/fanout")
	    public String Fanout() {
	        rabbitTemplate.convertAndSend("exchange_fanout", "", "fanoutMessage");
	        return "发送成功！";
	    }
	
	    /**
	     * 路由-direct模型
	     * @return
	     */
	    @GetMapping("/direct")
	    public String Direct() {
	        rabbitTemplate.convertAndSend("exchange_direct", "info", "directMessage");
	        return "发送成功！";
	    }
	
	    /**
	     * 路由-topic模型
	     * @return
	     */
	    @GetMapping("/topic")
	    public String Topic() {
	        rabbitTemplate.convertAndSend("exchange_topic", "user.save.id", "TopicMessage");
	        return "发送成功！";
	    }
	
	}
	```

- 消费者——直连模型

	```java
	package com.SnHI.rabbitmq.helloworld;
	
	import org.springframework.amqp.rabbit.annotation.Queue;
	import org.springframework.amqp.rabbit.annotation.RabbitListener;
	import org.springframework.stereotype.Component;
	
	/**
	 * 直连模型：消费者
	 */
	@Component
	public class HelloConsumer {
	
	    // 指定消息队列
	    @RabbitListener(queuesToDeclare = @Queue("hello"))
	    public void receive(String message) {
	        System.out.println("message：" + message);
	    }
	
	}
	```

- 消费者——路由topic模型

	```java
	package com.SnHI.rabbitmq.topic;
	
	import org.springframework.amqp.rabbit.annotation.Exchange;
	import org.springframework.amqp.rabbit.annotation.Queue;
	import org.springframework.amqp.rabbit.annotation.QueueBinding;
	import org.springframework.amqp.rabbit.annotation.RabbitListener;
	import org.springframework.stereotype.Component;
	
	/**
	 * 路由-topic模型：消费者
	 */
	@Component
	public class TopicConsumer {
	
	    // 绑定消息队列和交换机，指定路由key
	    @RabbitListener(bindings = @QueueBinding(
	        	// 临时队列
	            value = @Queue,
	        	// 指定交换机
	            exchange = @Exchange(name = "exchange_topic", type = "topic"),
	        	// 路由key
	            key = {"user.*"}
	    ))
	    public void receive1(String message) {
	        System.out.println("message1：" + message);
	    }
	
	    @RabbitListener(bindings = @QueueBinding(
	            value = @Queue,
	            exchange = @Exchange(name = "exchange_topic", type = "topic"),
	            key = {"user.#"}
	    ))
	    public void receive2(String message) {
	        System.out.println("message2：" + message);
	    }
	
	}
	```

## 应用场景

### 异步处理

- 场景说明：用户注册后，需要发送注册邮件和注册短信，传统的做法有两种

	- 串行方式：将注册信息写入数据库后，发送注册邮件，再发送注册短信,，以上三个任务全部完成后才返回给客户端。 这有一个问题是邮件，短信并不是必须的，它只是一个通知，而这种做法让客户端等待没有必要等待的东西

		![image-20220318133534622](C:\Users\67090\Desktop\Typora\RabbitMQ\图片\异步处理-串行方式.png)

	- 并行方式：将注册信息写入数据库后，发送邮件的同时，发送短信，以上三个任务完成后，返回给客户端，并行的方式能提高处理的时间

		![image-20220318133625224](C:\Users\67090\Desktop\Typora\RabbitMQ\图片\异步处理-并行方式.png)

- 引入消息队列：假设三个业务节点分别使用50ms，串行方式使用时间150ms，并行使用时间100ms。虽然并行已经提高的处理时间，但是前面说过，邮件和短信对正常的使用网站没有任何影响，客户端没有必要等着其发送完成才显示注册成功，应该是写入数据库后就返回。引入消息队列后，把发送邮件、短信不是必须的业务逻辑异步处理

	![image-20220318133744212](C:\Users\67090\Desktop\Typora\RabbitMQ\图片\异步处理-消息队列.png) 
	
	- 由此可以看出，引入消息队列后，用户的响应时间就等于写入数据库的时间+写入消息队列的时间（可以忽略不计），引入消息队列处理后，响应时间是串行的3倍，是并行的2倍

### 应用解耦

- 场景：双11是购物狂节，用户下单后，订单系统需要通知库存系统，传统的做法就是订单系统调用库存系统的接口，这种做法有一个缺点，当库存系统出现故障时，订单就会失败。订单系统和库存系统高耦合

	![image-20220318133858723](C:\Users\67090\Desktop\Typora\RabbitMQ\图片\应用解耦-传统做法.png)

- 引入消息队列

	- 订单系统：用户下单后订单系统完成持久化处理，将消息写入消息队列，返回用户订单下单成功
	- 库存系统：订阅下单的消息，获取下单消息，进行库操作。就算库存系统出现故障，消息队列也能保证消息的可靠投递，不会导致消息丢失

	![image-20220318134046848](C:\Users\67090\Desktop\Typora\RabbitMQ\图片\应用解耦-消息队列.png)

### 流量削峰

- 场景：秒杀活动，一般会因为流量过大，导致应用挂掉

- 引入消息队列：可以控制活动人数，超过此一定阀值的订单直接丢弃；可以缓解短时间的高流量压垮应用（应用程序按自己的最大处理能力获取订单）

	![image-20220318134229641](C:\Users\67090\Desktop\Typora\RabbitMQ\图片\流量削峰-消息队列.png)
	
	- 用户的请求，服务器收到之后，首先写入消息队列，加入消息队列长度超过最大值，则直接抛弃用户请求或跳转到错误页面；秒杀业务根据消息队列中的请求信息，再做后续处理

## 集群架构