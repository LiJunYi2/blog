---
title: Nacos作为注册中心
date: 2021-08-24
sidebar: auto
sidebarDepth: 1
publish: false
categories:
 - SpringCloud
tags:
 - 微服务
---

## Nacos作为注册中心💥

```markdown
前四个字母分别为Naming和Configuration的前两个字母，最后的s为Service.

一个更易于构建云原生应用的动态服务发现、配置管理和服务管理平台。
Nacos: Dynamic Naming and Configuration Service

Nacos就是注册中心＋配置中心的组合 --> 等价于 Nacos = Eureka+Config +Bus
```
## 基于Nacos服务提供者💫
### 1、引入依赖💨

```xml
<dependencies>
    <!--SpringCloud ailibaba nacos -->
    <dependency>
        <groupId>com.alibaba.cloud</groupId>
        <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
    </dependency>
    <!-- SpringBoot整合Web组件 -->
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

### 2、YML配置💨

```yaml
server:
  port: 9001

spring:
  application:
    name: nacos-payment-provider
  cloud:
    nacos:
      discovery:
        server-addr: localhost:8848 #配置Nacos地址
        # 换成nginx的1111端口，做集群
        #server-addr: 192.168.111.144:1111

management:
  endpoints:
    web:
      exposure:
        include: '*'
```

### 3、主启动类开启注解💨

```java
/**
 * @version 1.0.0
 * @ClassName: PaymentMain9001
 * @Description: 主启动
 * @author: LiJunYi
 * @create: 2020/11/9 10:18
 */
@EnableDiscoveryClient
@SpringBootApplication
public class PaymentMain9001
{
    public static void main(String[] args) {
        SpringApplication.run(PaymentMain9001.class, args);
    }
}
```

### 4、Controller测试接口💨

```java
/**
 * @version 1.0.0
 * @ClassName: PaymentController
 * @Description:
 * @author: LiJunYi
 * @create: 2020/11/9 10:19
 */
@RestController
public class PaymentController
{
    @Value("${server.port}")
    private String serverPort;

    @GetMapping(value = "/payment/nacos/{id}")
    public String getPayment(@PathVariable("id") Integer id)
    {
        return "nacos registry, serverPort: "+ serverPort+"\t id"+id;
    }
}
```

## Nacos管理界面🎱

<p>
<img :src="$withBase('/SpringCloud/nacos_2.png')" alt="nacos_2" class="medium-zoom-image">
</p>

## 基于Nacos服务消费者💫

### 1、引入依赖💨

```xml
<dependencies>
    <!--SpringCloud ailibaba nacos -->
    <dependency>
        <groupId>com.alibaba.cloud</groupId>
        <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
    </dependency>
    <!-- SpringBoot整合Web组件 -->
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

**Nacos自带负载均衡：集成了Ribbon💨**

<p>
<img :src="$withBase('/SpringCloud/nacos_3.png')" alt="nacos_3" class="medium-zoom-image">
</p>

### 2、YML配置💨

```yaml
server:
  port: 83
spring:
  application:
    name: nacos-order-consumer
  cloud:
    nacos:
      discovery:
        server-addr: localhost:8848
#消费者将要去访问的微服务名称(注册成功进nacos的微服务提供者)
service-url:
  nacos-user-service: http://nacos-payment-provider
```

### 3、主启动类开启注解💨

```java
/**
 * @version 1.0.0
 * @ClassName: OrderNacosMain83
 * @Description:
 * @author: LiJunYi
 * @create: 2020/11/9 10:37
 */
@EnableDiscoveryClient
@SpringBootApplication
public class OrderNacosMain83
{
    public static void main(String[] args)
    {
        SpringApplication.run(OrderNacosMain83.class,args);
    }
}

```

### 4、Ribbon的有关配置💨

```java
/**
 * @author: LiJunYi
 * @create: 2020/11/9 10:19
 */
@Configuration
public class ApplicationContextConfig
{
    @Bean
    @LoadBalanced
    public RestTemplate getRestTemplate()
    {
        return new RestTemplate();
    }
}
```

### 5、Controller测试接口💨

```java
/**
 * @author: LiJunYi
 * @create: 2020/11/9 10:19
 */
@RestController
@Slf4j
public class OrderNacosController
{
    @Resource
    private RestTemplate restTemplate;

    @Value("${service-url.nacos-user-service}")
    private String serverURL;

    @GetMapping(value = "/consumer/payment/nacos/{id}")
    public String paymentInfo(@PathVariable("id") Long id)
    {
        return restTemplate.getForObject(serverURL+"/payment/nacos/"+id,String.class);
    }

}

```
## 服务注册中心对比💢

### Nacos支持AP和CP💨

<p>
<img :src="$withBase('/SpringCloud/nacos_4.png')" alt="nacos_4" class="medium-zoom-image">
</p>
<p>
<img :src="$withBase('/SpringCloud/nacos_5.png')" alt="nacos_5" class="medium-zoom-image">
</p>

### Nacos支持AP和CP切换💢

::: tip 
    C是所有节点在同一时间看到的数据是一致的
    而A的定义是所有的请求都会收到响应。
:::

::: warning 何时选择使用何种模式？
**一般来说**

一、
    如果不需要存储服务级别的信息且服务实例是通过nacos-chient主册，并能够保持心跳上报，那么就可以选择AP模式。
    当前主流的服务如Spring cloud 和 Dubbo 服务，都适用于AP模式。
    AP模式为了服务的可能性而减弱了一致性，因此AP模式下只支持注册临时实例。

二、
    如果需要在服务级别偏辑或者存储配置信息，那么CP是必须。K8S服务和DNS服务则适用于CP模式。
    CP模式下则支持注册持久化实例，此时则是以 Raft协议为集群运行模式，该模式下注册实例之前必须先注册服务，如果服务不存在，则会返回错识.
:::

```shell
curl -X PUT "$NACOs_SERVERA8848/nacos/1/ns/operator/switches?entrymserverMode&calue=CP
```

