---
title: Gateway服务网关
date: 2021-08-23
sidebar: auto
publish: false
categories:
 - SpringCloud
tags:
 - 微服务
---

# Spring Cloud Gateway服务网关💥

## 简介💦

Gateway是在Spring生态系统之上构建的API网关服务，基于Spring 5，Spring Boot 2和Project Reactor等技术。Gateway旨在提供一种简单而有效的方式来对API进行路由，以及提供一些强大的过滤器功能，例如:熔断、限流、重试等。

[Spring Cloud Gateway](https://cloud.spring.io/spring-cloud-static/Hoxton.SR1/reference/htmlsingle/#spring-cloud-gateway)

## 是什么？❗

<p>
<img :src="$withBase('/SpringCloud/gateway1.png')" alt="gateway1" class="medium-zoom-image">
</p>

::: tip

**Spring Cloud Gateway是Spring Cloud的一个全新项目，基于Spring 5.0+Spring Boot 2.0和 Project Reactor等技术开发的网关，它旨在为微服务架构提供─种简单有效的统一的API路由管理方式。**

**SpringCloud Gateway作为 Spring Cloud 生态系统中的网关，目标是替代Zuul，在Spring Cloud 2.0以上版本中，没有对新版本的Zuul 2.0以上最新高性能版本进行集成，仍然还是使用的Zuul 1.x非Reactor模式的老版本。而为了提升网关的性能，SpringCloud Gateway是基于WebFlux框架实现的，而WebFlux框架底层则使用了高性能的Reactor模式通信框架Netty。**

**Spring Cloud Gateway的目标提供统一的路由方式且基于Filter链的方式提供了网关基本的功能，例如:安全，监控/指标，和限流。**

**SpringCloud Gateway使用的Webflux中的reactor-netty响应式编程组件，底层使用了Netty通讯框架。**

::: 

<p>
<img :src="$withBase('/SpringCloud/gateway3.png')" alt="gateway3" class="medium-zoom-image">
</p>

## 网关在微服务中的架构位置💫

<p>
<img :src="$withBase('/SpringCloud/gateway4.png')" alt="gateway4" class="medium-zoom-image">
</p>


::: warning    Spring Cloud Gateway具有如下特性‼

- **基于SpringlFramework 5, Project Reactor和Spring Boot 2.0进行构建**
- **动态路由:能够匹配任何请求属性**
- **可以对路由指定Predicate (断言）和Filter (过滤器)**
- **集成Hystrix的断路器功能**
- **集成Spring Cloud 服务发现功能**
- **易于编写的Predicate (断言）和Filter (过滤器)**
- **请求限流功能**
- **支持路径重写**

:::

::: danger  zuul1.x模型❕❕

**Springcloud中所集成的Zuul版本，采用的是Tomcat容器，使用的是传统的Servlet IO处理模型。**

**servlet由servlet container进行生命周期管理。container启动时构造servlet对象并调用servlet init()进行初始化;**

**container运行时接受请求，并为每个请求分配一个线程（一般从线程池中获取空闲线程）然后调用service()。**

**container关闭时调用servlet destory()销毁servlet;**

:::

## 核心概念❗❗❗

::: danger  Route(路由)

**路由是构建网关的基本模块，它由ID，目标URI，一系列的断言和过滤器组成，如果断言为true则匹配该路由**

:::

::: danger  redicate(断言)

**参考的是Java8的java.util.function.Predicate**
**开发人员可以匹配HTTP请求中的所有内容(例如请求头或请求参数)，如果请求与断言相匹配则进行路由**

:::

::: danger   Filter(过滤)

**指的是Spring框架中GatewayFilter的实例，使用过滤器，可以在请求被路由前或者之后对请求进行修改。**

:::

## 总体💫

<p>
<img :src="$withBase('/SpringCloud/gateway5.png')" alt="gateway5" class="medium-zoom-image">
</p>
web请求，通过一些匹配条件。定位到真正的服务节点。并在这个转发过程的前后，进行一些精细化控制。

predicate就是我们的匹配条件

而fiter，就可以理解为一个无所不能的拦截器。

有了这两个元素，再加上目标url、就可以实现一个具体的路由了

## 工作流程❗❗❗

<p>
<img :src="$withBase('/SpringCloud/gateway6.png')" alt="gateway6" class="medium-zoom-image">
</p>


**客户端向Spring Cloud Gateway发出请求。然后在Gateway Handler Mapping 中找到与请求相匹配的路由，将其发送到GatewayWeb Handler.**

**Handler再通过指定的过滤器链来将请求发送到我们实际的服务执行业务逻辑，然后返回。**
**过滤器之间用虚线分开是因为过滤器可能会在发送代理请求之前(“pre”)或之后(“post”)执行业务逻辑。**

**Filter在“pre”类型的过滤器可以做参数校验、权限校验、流量监控、日志输出、协议转换等**
**在“post”类型的过滤器中可以做响应内容、响应头的修改，日志的输出，流量监控等有着非常重要的作用。**

## 网关的两种配置🔰

### 1、YML💨

```yaml
server:
  port: 9527

spring:
  main:
    allow-bean-definition-overriding: true
  application:
    name: cloud-gateway
  cloud:
    sentinel:
      # 取消控制台懒加载
      eager: true
      transport:
        dashboard: localhost:8080 # 配置Sentinel dashboard 地址
        port: 8719
      filter:
        enabled: false # 排除将网关限流
      datasource:
        ds1:
          nacos:
            server-addr: localhost:8848
            dataId: cloudalibaba-sentinel-gateway
            groupId: DEFAULT_GROUP
            data-type: json
            rule-type: flow
    nacos:
      discovery:
        server-addr: localhost:8848
    gateway:
      discovery:
        locator:
          enabled: true #开启从注册中心动态创建路由的功能，利用微服务名进行路由
          lower-case-service-id: true #是否将服务名称转小写
      routes:
        - id: payment-service                  #路由的ID，没有固定规则但要求唯一，建议配合服务名
          uri: lb://cloud-payment-service      #匹配后提供服务的路由地址
          predicates:
            - Path=/payment/**              # 断言，路径相匹配的进行路由
            #- After=2020-02-21T15:51:37.485+08:00[Asia/Shanghai] 在该时间点之后有效
            #- Cookie=username,zzyy
            #- Header=X-Request-Id, \d+        # 请求头要有X-Request-Id属性并且值为整数的正则表达式
        - id: order-consumer
          uri: lb://nacos-order-consumer
          predicates:
            - Path=/consumer/**
```

### 2、代码中注入 RouteLocator的Bean💨

[**官方示例**](https://cloud.spring.io/spring-cloud-static/Hoxton.SR1/reference/htmlsingle/#the-weight-route-predicate-factory)

```java
RemoteAddressResolver resolver = XForwardedRemoteAddressResolver
    .maxTrustedIndex(1);

...

.route("direct-route",
    r -> r.remoteAddr("10.1.1.1", "10.10.1.1/24")
        .uri("https://downstream1")
.route("proxied-route",
    r -> r.remoteAddr(resolver, "10.10.1.1", "10.10.1.1/24")
        .uri("https://downstream2")
)
```

### 自定义🧨

```java
/**
 * @version 1.0.0
 * @ClassName: GateWayConfig
 * @Description:
 * @author: LiJunYi
 * @create: 2020/8/13 16:00
 */
@Configuration
public class GateWayConfig {

    @Bean
    public RouteLocator customRouteLocator(RouteLocatorBuilder routeLocatorBuilder)
    {
        RouteLocatorBuilder.Builder routes = routeLocatorBuilder.routes();

        routes.route("path_route_atguigu",
                r -> r.path("/guonei")
                        .uri("http://news.baidu.com/guonei")).build();

        return routes.build();
    }
}
```

## Predicate的使用💨

[官方示例](https://cloud.spring.io/spring-cloud-static/Hoxton.SR1/reference/htmlsingle/#gateway-request-predicates-factories)

<p>
<img :src="$withBase('/SpringCloud/gateway7.png')" alt="gateway7" class="medium-zoom-image">
</p>

```yaml
   gateway:
      discovery:
        locator:
          enabled: true #开启从注册中心动态创建路由的功能，利用微服务名进行路由
          lower-case-service-id: true #是否将服务名称转小写
      routes:
        - id: payment-service                  #路由的ID，没有固定规则但要求唯一，建议配合服务名
          uri: lb://cloud-payment-service      #匹配后提供服务的路由地址
          predicates:
            - Path=/payment/**              # 断言，路径相匹配的进行路由
            #- After=2020-02-21T15:51:37.485+08:00[Asia/Shanghai] 在该时间点之后有效
            #- Cookie=username,zzyy
            #- Header=X-Request-Id, \d+        # 请求头要有X-Request-Id属性并且值为整数的正则表达式
```

**Raute Predicate Facnories这个是什么?**

Spring Cloud Gateway将路由匹配作为Spring WebFlux HandlerMapping基础架构的一部分。
Spring Cloud Gateway包括许多内置的Route Predicate工厂。所有这些Predicate都与HTTP请求的不同属性匹配。多个RoutePredicate工厂可以进行组合

Spring Cloud Gateway创建Route对象时，使用RoutePredicateFactory 创建 Predicate对象，Predicate 对象可以赋值给Route。Spring Cloud Gateway包含许多内置的Route Predicate Factories。

所有这些谓词都匹配HTTP请求的不同属性。多种谓词工厂可以组合，并通过逻辑and。

## Filter的使用💨

[官网示例](https://cloud.spring.io/spring-cloud-static/Hoxton.SR1/reference/htmlsingle/#global-filters)

```java
/**
 * @version 1.0.0
 * @ClassName: MyLogGateWayFilter
 * @Description: 自定义网关过滤器 简单的身份认证过程
 * @author: LiJunYi
 * @create: 2020/10/12 17:21
 */
@Component
@Slf4j
public class MyLogGateWayFilter implements GatewayFilter, Ordered {

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        log.info("***********come in MyLogGateWayFilter:  "+new Date());

        // 获取请求参数
        String token = exchange.getRequest().getQueryParams().getFirst("token");
        // 业务逻辑处理
        if (null == token)
        {
            log.warn("token is null ...");
            return setUnauthorizedResponse(exchange,"非法用户");
        }
        return chain.filter(exchange);
    }

    private Mono<Void> setUnauthorizedResponse(ServerWebExchange exchange, String msg)
    {
        ServerHttpResponse response = exchange.getResponse();
        /*响应类型*/
        response.getHeaders().setContentType(MediaType.APPLICATION_JSON);
        /*响应状态码*/
        response.setStatusCode(HttpStatus.OK);

        log.error("[鉴权异常处理]请求路径:{}", exchange.getRequest().getPath());

        return response.writeWith(Mono.fromSupplier(() -> {
            DataBufferFactory bufferFactory = response.bufferFactory();
            return bufferFactory.wrap(JSON.toJSONBytes(AjaxResult.error(msg)));
        }));
    }

    /**
     * 过滤器执行顺序，数值越小，优先级越高
     *
     * @return int
     */
    @Override
    public int getOrder() {
        return 0;
    }
}

/*=======================================================================================================*/
/**
 * @version 1.0.0
 * @ClassName: GatewayRoutesConfiguration
 * @Description: 网关路由配置类,将自定义网关过滤器进行注册
 * @author: LiJunYi
 * @create: 2020/8/13 16:00
 */
@Configuration
public class GatewayRoutesConfiguration {

    @Bean
    public RouteLocator customRouteLocator(RouteLocatorBuilder builder) {
        return builder.routes().route(r -> r
                // 断言(判断条件)
                .path("/consumer/**")
                // 模板uri,路由到微服务地址
                .uri("lb://nacos-order-consumer")
                // 注册自定义网关过滤器
                .filter(new MyLogGateWayFilter())
                // 路由ID
                .id("order-consumer"))
                .build();
    }
}
```

