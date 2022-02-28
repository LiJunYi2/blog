---
title: sentinel-微服务限流框架
date: 2021-08-23
sidebar: auto
publish: false
categories:
 - SpringCloud
tags:
 - 微服务
---

## Sentinel 介绍🚨

随着微服务的流行，服务和服务之间的稳定性变得越来越重要。Sentinel 以流量为切入点，从流量控制、熔断降级、系统负载保护等多个维度保护服务的稳定性。

### Sentinel 具有以下特征:🔎

- **丰富的应用场景**：Sentinel 承接了阿里巴巴近 10 年的双十一大促流量的核心场景，例如秒杀（即突发流量控制在系统容量可以承受的范围）、消息削峰填谷、集群流量控制、实时熔断下游不可用应用等。
- **完备的实时监控**：Sentinel 同时提供实时的监控功能。您可以在控制台中看到接入应用的单台机器秒级数据，甚至 500 台以下规模的集群的汇总运行情况。
- **广泛的开源生态**：Sentinel 提供开箱即用的与其它开源框架/库的整合模块，例如与 Spring Cloud、Apache Dubbo、gRPC、Quarkus 的整合。您只需要引入相应的依赖并进行简单的配置即可快速地接入 Sentinel。同时 Sentinel 提供 Java/Go/C++ 等多语言的原生实现。
- **完善的 SPI 扩展机制**：Sentinel 提供简单易用、完善的 SPI 扩展接口。您可以通过实现扩展接口来快速地定制逻辑。例如定制规则管理、适配动态数据源等。

### Sentinel 的主要特性：🎇

<p>
<img :src="$withBase('/SpringCloud/sentinel-1.png')" alt="sentinel-1" class="medium-zoom-image">
</p>

### Sentinel 分为两个部分:🧐

- **核心库（Java 客户端）** 不依赖任何框架/库，能够运行于所有 Java 运行时环境，同时对 Dubbo / Spring Cloud 等框架也有较好的支持。
- **控制台（Dashboard）** 基于 Spring Boot 开发，打包后可以直接运行，不需要额外的 Tomcat 等应用容器。

[官方Github](https://github.com/alibaba/Sentinel/wiki/%E4%BB%8B%E7%BB%8D)

[官方文档地址](https://sentinelguard.io/zh-cn/index.html)

## 项目实例🛻

### 0、前期准备🍳

**本笔记sentinel-dashboard版本为：V1.8.0**

**Nacos版本为：1.4.1**

```shell
# 指定端口号启动
java -Dserver.port=8718 -Dcsp.sentinel.dashboard.server=localhost:8718 -Dproject.name=sentinel-dashboard -jar sentinel-dashboard-1.8.0.jar
```



### 1、引入依赖

```xml
<dependencies>
        <!--SpringCloud ailibaba nacos -->
        <dependency>
            <groupId>com.alibaba.cloud</groupId>
            <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
        </dependency>
        <!--SpringCloud ailibaba sentinel-datasource-nacos 后续做持久化用到-->
        <dependency>
            <groupId>com.alibaba.csp</groupId>
            <artifactId>sentinel-datasource-nacos</artifactId>
        </dependency>
        <!--SpringCloud ailibaba sentinel -->
        <dependency>
            <groupId>com.alibaba.cloud</groupId>
            <artifactId>spring-cloud-starter-alibaba-sentinel</artifactId>
        </dependency>
        <!--openfeign-->
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-openfeign</artifactId>
        </dependency>
        <!-- SpringBoot整合Web组件+actuator -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-actuator</artifactId>
        </dependency>
    </dependencies>
```

### 2、yaml配置

```yaml
server:
  port: 8401

spring:
  application:
    name: cloudalibaba-sentinel-service
  cloud:
    nacos:
      discovery:
        server-addr: localhost:8848 #Nacos服务注册中心地址
    sentinel:
      transport:
        dashboard: localhost:8080 #配置Sentinel dashboard地址
        port: 8719
      datasource:
        ds1:
          nacos:
            server-addr: localhost:8848
            dataId: cloudalibaba-sentinel-service
            groupId: DEFAULT_GROUP
            data-type: json
            rule-type: flow

management:
  endpoints:
    web:
      exposure:
        include: '*'

#feign:
  #sentinel:
    #enabled: true # 激活Sentinel对Feign的支持
```

### 3、主启动类

```java
/**
 * @Description: 主启动
 * @author: LiJunYi
 */
@EnableDiscoveryClient
@SpringBootApplication
public class MainApp8401
{
    public static void main(String[] args) {
        SpringApplication.run(MainApp8401.class, args);
    }
}
```

### 4、controller限流测试接口

```java
/**
 * 流量限制控制器
 * @author LiJunYi
 */
@RestController
@Slf4j
public class FlowLimitController
{
    @GetMapping("/testA")
    public String testA()
    {
        return "------testA";
    }

    @GetMapping("/testB")
    public String testB()
    {
        log.info(Thread.currentThread().getName()+"\t"+"...testB");
        return "------testB";
    }


    @GetMapping("/testD")
    public String testD()
    {
       /* try { TimeUnit.SECONDS.sleep(1); } catch (InterruptedException e) { e.printStackTrace(); }
        log.info("testD 测试RT");*/

        log.info("testD 异常比例");
        // int age = 10/0;
        return "------testD";
    }

    @GetMapping("/testE")
    public String testE()
    {
        log.info("testE 测试异常数");
        int age = 10/0;
        return "------testE 测试异常数";
    }

    @GetMapping("/testHotKey")
    @SentinelResource(value = "testHotKey",blockHandler = "dealTestHotKey")
    public String testHotKey(@RequestParam(value = "p1",required = false) String p1,
                             @RequestParam(value = "p2",required = false) String p2)
    {
        //int age = 10/0;
        return "------testHotKey";
    }

    /**
     * 兜底方法
     *
     * @param p1        p1
     * @param p2        p2
     * @param exception 异常
     * @return {@link String}
     */
    public String dealTestHotKey(String p1, String p2, BlockException exception)
    {
        //sentinel系统默认的提示：Blocked by Sentinel (flow limiting)
        return "------dealTestHotKey,o(╥﹏╥)o";
    }

}

```

### 5、Sentinel控制台

启动程序去调用 testA与testB接口，然后在Sentinel控制台中我们便可以看见下图情况：

<p>
<img :src="$withBase('/SpringCloud/sentinel-2.png')" alt="sentinel-2" class="medium-zoom-image">
</p>

<p>
<img :src="$withBase('/SpringCloud/sentinel-3.png')" alt="sentinel-3" class="medium-zoom-image">
</p>

## 流控规则🌋

<p>
<img :src="$withBase('/SpringCloud/sentinel-4.png')" alt="sentinel-4" class="medium-zoom-image">
</p>

::: tip 解释

```markdown
1、资源名:唯一名称，默认请求路径

2、针对来源: Sentinel可以针对调用者进行限流，填写微服务名，默认default(不区分来源)

3、阈值类型/单机阈值:

	QPS(每秒钟的请求数量)︰当调用该api的QPS达到阈值的时候，进行限流
	
	线程数:当调用该api的线程数达到阈值的时候，进行限流

4、是否集群:不需要集群

5、流控模式:

	直接: api达到限流条件时，直接限流

	关联:当关联的资源达到阈值时，就限流自己

	链路:只记录指定链路上的流量（指定资源从入口资源进来的流量，如果达到阈值，就进行限流)【api级别的针对来源】

6、流控效果:

	快速失败:直接失败，抛异常

	Warm Up:根据codeFactor (冷加载因子，默认3)的值，从阈值/codeFactor，经过预热时长，才达到设置的QPS阈值

	排队等待:匀速排队，让请求以匀速的速度通过，阈值类型必须设置为QPS，否则无效
```

:::

## 流控模式（直接 关联 链路）😎

### 直接  -> 快速失败(系统默认)

<p>
<img :src="$withBase('/SpringCloud/sentinel-5.png')" alt="sentinel-5" class="medium-zoom-image">
</p>

<p>
<img :src="$withBase('/SpringCloud/sentinel-6.png')" alt="sentinel-6" class="medium-zoom-image">
</p>

### 关联：当关联的资源达到阈值，就限流自己

<p>
<img :src="$withBase('/SpringCloud/sentinel-7.png')" alt="sentinel-7" class="medium-zoom-image">
</p>

### 链路：多个请求调用同一个微服务



## 流控效果🙌

### 快速失败

<p>
<img :src="$withBase('/SpringCloud/sentinel-8.png')" alt="sentinel-8" class="medium-zoom-image">
</p>

### Warm up 预热 冷启动

[官方说明](https://github.com/alibaba/Sentinel/wiki/%E9%99%90%E6%B5%81---%E5%86%B7%E5%90%AF%E5%8A%A8)

- 公式表示为：阈值除以coldFactor(默认值为3),经过预热时长后才会达到阈值
- 默认coldFactor为3，即请求QPS 从 threshold / 3开始，经预热时长逐渐升至设定的QPS阈值

### 源码解析

```java
public class WarmUpController implements TrafficShapingController {

    protected double count;
    private int coldFactor;
    protected int warningToken = 0;
    private int maxToken;
    protected double slope;

    protected AtomicLong storedTokens = new AtomicLong(0);
    protected AtomicLong lastFilledTime = new AtomicLong(0);

    public WarmUpController(double count, int warmUpPeriodInSec, int coldFactor) {
        construct(count, warmUpPeriodInSec, coldFactor);
    }

    public WarmUpController(double count, int warmUpPeriodInSec) {
        construct(count, warmUpPeriodInSec, 3);// <--->这里
    }

    private void construct(double count, int warmUpPeriodInSec, int coldFactor) {

        if (coldFactor <= 1) {
            throw new IllegalArgumentException("Cold factor should be larger than 1");
        }

        this.count = count;

        this.coldFactor = coldFactor;

        // thresholdPermits = 0.5 * warmupPeriod / stableInterval.
        // warningToken = 100;
        warningToken = (int)(warmUpPeriodInSec * count) / (coldFactor - 1);
        // / maxPermits = thresholdPermits + 2 * warmupPeriod /
        // (stableInterval + coldInterval)
        // maxToken = 200
        maxToken = warningToken + (int)(2 * warmUpPeriodInSec * count / (1.0 + coldFactor));

        // slope
        // slope = (coldIntervalMicros - stableIntervalMicros) / (maxPermits
        // - thresholdPermits);
        slope = (coldFactor - 1.0) / count / (maxToken - warningToken);

    }

    @Override
    public boolean canPass(Node node, int acquireCount) {
        return canPass(node, acquireCount, false);
    }

    @Override
    public boolean canPass(Node node, int acquireCount, boolean prioritized) {
        long passQps = (long) node.passQps();

        long previousQps = (long) node.previousPassQps();
        syncToken(previousQps);

        // 开始计算它的斜率
        // 如果进入了警戒线，开始调整他的qps
        long restToken = storedTokens.get();
        if (restToken >= warningToken) {
            long aboveToken = restToken - warningToken;
            // 消耗的速度要比warning快，但是要比慢
            // current interval = restToken*slope+1/count
            double warningQps = Math.nextUp(1.0 / (aboveToken * slope + 1.0 / count));
            if (passQps + acquireCount <= warningQps) {
                return true;
            }
        } else {
            if (passQps + acquireCount <= count) {
                return true;
            }
        }

        return false;
    }

    protected void syncToken(long passQps) {
        long currentTime = TimeUtil.currentTimeMillis();
        currentTime = currentTime - currentTime % 1000;
        long oldLastFillTime = lastFilledTime.get();
        if (currentTime <= oldLastFillTime) {
            return;
        }

        long oldValue = storedTokens.get();
        long newValue = coolDownTokens(currentTime, passQps);

        if (storedTokens.compareAndSet(oldValue, newValue)) {
            long currentValue = storedTokens.addAndGet(0 - passQps);
            if (currentValue < 0) {
                storedTokens.set(0L);
            }
            lastFilledTime.set(currentTime);
        }

    }

    private long coolDownTokens(long currentTime, long passQps) {
        long oldValue = storedTokens.get();
        long newValue = oldValue;

        // 添加令牌的判断前提条件:
        // 当令牌的消耗程度远远低于警戒线的时候
        if (oldValue < warningToken) {
            newValue = (long)(oldValue + (currentTime - lastFilledTime.get()) * count / 1000);
        } else if (oldValue > warningToken) {
            if (passQps < (int)count / coldFactor) {
                newValue = (long)(oldValue + (currentTime - lastFilledTime.get()) * count / 1000);
            }
        }
        return Math.min(newValue, maxToken);
    }

}

```

### 排队等待

**应用场景：秒杀系统**

匀速排队，让请求以均匀的速度通过，阀值类型必须设成QPS，否则无效。

设置含义:/testA每秒1次请求，超过的话就排队等待，等待的超时时间为20000毫秒

<p>
<img :src="$withBase('/SpringCloud/sentinel-9.png')" alt="sentinel-9" class="medium-zoom-image">
</p>

<p>
<img :src="$withBase('/SpringCloud/sentinel-10.png')" alt="sentinel-10" class="medium-zoom-image">
</p>

# 降级规则

[官方熔断降级说明](https://github.com/alibaba/Sentinel/wiki/%E7%86%94%E6%96%AD%E9%99%8D%E7%BA%A7)

## Sentinel 提供以下几种熔断策略🔎

**RT（慢调用比例）**

   平均响应时间超出阈值且在时间窗口内通过的请求>=5，两个条件同时满足后触发降级窗口期过后关闭断路器

   RT最大4900(更大的需要通过-Dcsp.sentinel.statistic.max.rt=XXXX才能生效)

**异常比列(秒级)**

​     QPS >= 5且异常比例（秒级统计）超过阈值时，触发降级;时间窗口结束后，关闭降级

**异常数(分钟级)**

​      异常数（分钟统计）超过阈值时，触发降级;时间窗口结束后，关闭降级

<p>
<img :src="$withBase('/SpringCloud/sentinel-11.png')" alt="sentinel-11" class="medium-zoom-image">
</p>

### 进一步说明🎗️

 **Sentinel熔断降级会在调用链路中某个资源出现不稳定状态时（例如调用超时或异常比例升高)，对这个资源的调用进行限制，让请求快速失败，避免影响到其它的资源而导致级联错误。**

**当资源被降级后，在接下来的降级时间窗口之内，对该资源的调用都自动熔断(默认行为是抛出 DegradeException)**

### Sentinel的断路器是没有半开状态的！！！

**半开的状态系统自动去检测是否请求有异常，没有异常就关闭断路器恢复使用，有异常型继续打开断路器不可用。具体可以参考Hystrix。**

### RT（慢调用比例）

<p>
<img :src="$withBase('/SpringCloud/sentinel-12.png')" alt="sentinel-12" class="medium-zoom-image">
</p>

### 异常比例->异常数

**异常数( DEGRADE_GRADE_EXCEPTION_COUNT ):**

当资源近1分钟的异常数目超过阈值之后会进行熔断。注意由于统计时间窗口是分钟级别的，若timewindow 小于60s，则结束熔断状态后仍可能再进入熔断状态。

注意：**时间窗口一定要大于等于60秒。**

<p>
<img :src="$withBase('/SpringCloud/sentinel-13.png')" alt="sentinel-13" class="medium-zoom-image">
</p>

**代码示例**

```java
@GetMapping("/testE")
public String testE()
{
    log.info("testE 测试异常数");
    int age = 10/0;
    return "------testE 测试异常数";
}
```

**sentinel配置**

<p>
<img :src="$withBase('/SpringCloud/sentinel-14.png')" alt="sentinel-14" class="medium-zoom-image">
</p>

**访问，异常数超过5次就会提示**

<p>
<img :src="$withBase('/SpringCloud/sentinel-15.png')" alt="sentinel-15" class="medium-zoom-image">
</p>

# 热点规则⛑️

[热点参数限流规则](https://github.com/alibaba/Sentinel/wiki/%E7%83%AD%E7%82%B9%E5%8F%82%E6%95%B0%E9%99%90%E6%B5%81)

**兜底方法**

分为系统默认和客户自定义

之前的示例中，限流出问题后，都是用sentinel系统默认的提示: Blocked by Sentinel (flow limiting)；

sentinel提供了 **@sehtinelResource** 注解实现兜底降级方法

```Java
/**
 * 流量限制控制器
 * @author LiJunYi
 */
@RestController
@Slf4j
public class FlowLimitController
{
    @GetMapping("/testHotKey")
    @SentinelResource(value = "testHotKey",blockHandler = "dealTestHotKey")
    public String testHotKey(@RequestParam(value = "p1",required = false) String p1,
                             @RequestParam(value = "p2",required = false) String p2)
    {
        //int age = 10/0;
        return "------testHotKey";
    }

    /**
     * 兜底方法
     *
     * @param p1        p1
     * @param p2        p2
     * @param exception 异常
     * @return {@link String}
     */
    public String dealTestHotKey(String p1, String p2, BlockException exception)
    {
        //sentinel系统默认的提示：Blocked by Sentinel (flow limiting)
        return "------dealTestHotKey,o(╥﹏╥)o";
    }

}

```

**sentinel配置**

<p>
<img :src="$withBase('/SpringCloud/sentinel-16.png')" alt="sentinel-16" class="medium-zoom-image">
</p>

**测试效果**

<p>
<img :src="$withBase('/SpringCloud/sentinel-17.png')" alt="sentinel-17" class="medium-zoom-image">
</p>

如果不配置 **blockHandler** ，页面则会直接显示error。

## 参数例外项🎇

上述案例演示了第一个参数p1，当QPS超过1秒1次点击后马上被限流

**一般情况：**

​	超过1秒钟一个后，达到阈值1后马上被限流

**特别情况：**

​	我们期望p1参数当它是某个特殊值时，它的限流值和平时不一样

​	假如当p1的值等于5时，它的阈值可以达到200

**sentinel配置**

<p>
<img :src="$withBase('/SpringCloud/sentinel-18.png')" alt="sentinel-18" class="medium-zoom-image">
</p>

**！！！ 前提条件：热点参数的注意点，参数必须是基本类型或者String**

## 其他情况👓

<p>
<img :src="$withBase('/SpringCloud/sentinel-19.png')" alt="sentinel-19" class="medium-zoom-image">
</p>

**@sentinelResource**

处理的是sentinel控制台配置的违规情况，有blockHandler方法配置的兜底处理;

**RuntimeException**

int age = 10/0,这个是java运行时报出的运行时异常RunTimeException，@SentinelResource不管

**总结**

**@sentinelResource主管配置出错，运行出错该走异常走异常**

# 系统规则🎱

[系统自适应限流](https://github.com/alibaba/Sentinel/wiki/%E7%B3%BB%E7%BB%9F%E8%87%AA%E9%80%82%E5%BA%94%E9%99%90%E6%B5%81)

