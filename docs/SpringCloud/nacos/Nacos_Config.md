---
title: Nacos作为配置中心
date: 2021-08-24
sidebar: auto
publish: false
categories:
 - SpringCloud
tags:
 - 微服务
---

## Nacos作为配置中心💥代码实现

### 1、引入依赖💨

```xml
<dependencies>
    <!--nacos-config-->
    <dependency>
        <groupId>com.alibaba.cloud</groupId>
        <artifactId>spring-cloud-starter-alibaba-nacos-config</artifactId>
    </dependency>
    <!--nacos-discovery-->
    <dependency>
        <groupId>com.alibaba.cloud</groupId>
        <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
    </dependency>
    <!--web + actuator-->
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

::: tip YML的类别 💨
Nacos同springcloud-config一样，在项目初始化时，要保证先从配置中心进行配置拉取，拉取配置之后，才能保证项目的正常启动。

springboot中配置文件的加载是存在优先级顺序的，bootstrap优先级高于application

:::

### 2、配置Bootstrap.yml💨

```yaml
# nacos配置
server:
  port: 3377

spring:
  application:
    name: nacos-config-client
  cloud:
    nacos:
      discovery:
        server-addr: localhost:8848 #Nacos服务注册中心地址
      config:
        server-addr: localhost:8848 #Nacos作为配置中心地址
        file-extension: yaml #指定yaml格式的配置
        group: TEST_GROUP
        namespace: ea7be215-37d0-4175-958c-a8af3545f115
# ${spring.application.name}-${spring.profile.active}.${spring.cloud.nacos.config.file-extension}
# nacos-config-client-dev.yaml
# nacos-config-client-test.yaml   ----> config.info
```

**共享配置 & 多配置文件**💨

```yaml
spring:
  application:
    name: nacos-config-multi
  main:
    allow-bean-definition-overriding: true
  cloud:
    nacos:
      username: ${nacos.username}
      password: ${nacos.password}
      config:
        server-addr: ${nacos.server-addr}
        namespace: ${nacos.namespace}
        # 用于共享的配置文件
        shared-configs:
          - data-id: common-mysql.yaml
            group: SPRING_CLOUD_EXAMPLE_GROUP
            
          - data-id: common-redis.yaml
            group: SPRING_CLOUD_EXAMPLE_GROUP
            
          - data-id: common-base.yaml
            group: SPRING_CLOUD_EXAMPLE_GROUP

        # 常规配置文件
        # 优先级大于 shared-configs，在 shared-configs 之后加载
        extension-configs:
          - data-id: nacos-config-advanced.yaml
            group: SPRING_CLOUD_EXAMPLE_GROUP
            refresh: true

          - data-id: nacos-config-base.yaml
            group: SPRING_CLOUD_EXAMPLE_GROUP
            refresh: true
```

### 3、配置application.yml💨

```yaml
spring:
  profiles:
    active: dev # 表示开发环境
    #active: test # 表示测试环境
    #active: info
```

### 4、Controller测试接口💨

```java
/**
 * 配置客户端控制器
 *
 * @author LiJunYi
 * @date 2020/11/09
 * RefreshScope 支持Nacos的动态刷新功能
 */
@RestController
@RefreshScope
public class ConfigClientController
{
    @Value("${config.info}")
    private String configInfo;

    @GetMapping("/config/info")
    public String getConfigInfo() {
        return configInfo;
    }
}
```
## 在Nacos中添加配置信息（重点）❗
###  匹配规则-理论💢

   - **Nacos**中的 **Data Id** 的组成格式及与SpringBoot配置文件中的匹配规则
   - [官方文档](https://nacos.io/zh-cn/docs/quick-start-spring-cloud.html)
- **说明：之所以需要配置spring.application.name，是因为它是构成Nacos配置管理dataId字段的一部分。**
```markdown
#  在Nacos Spring Cloud 中,dataId的完整格式如下:
${prefix}-${spring.profile.active}.${file-extension}
  
1、prefix 默认为 spring.application.name 的值，也可以通过配置项spring.cloud.nacos.config.prefix来配置。

2、spring.profile.active即为当前环境对应的 profile。
  注意:当spring.profile.active为空时，对应的连接符 – 也将不存在
  datald的拼接格式变成${prefix}.${file-extension}

3、file-exetension 为配置内容的数据格式，
  可以通过配置项spring.cloud .nacos.config.file-extension来配置。
  目前只支持properties和yaml类型。

#  通过Spring Cloud 原生注解@RefreshScope实现配置自动更新:

# 最后公式:
$(spring.application.name}-$(spring.profiles.active}.$spring.cloud.nacos.config.file-extension}
```
### 配置新增💦

<p>
<img :src="$withBase('/SpringCloud/nacos_6.png')" alt="nacos_6" class="medium-zoom-image">
</p>

- **图解**💨

<p>
<img :src="$withBase('/SpringCloud/nacos_7.png')" alt="nacos_7" class="medium-zoom-image">
</p>


### 分类配置💢

- **Nacos的图形化管理界面-配置管理**💨

<p>
<img :src="$withBase('/SpringCloud/nacos_8.png')" alt="nacos_8" class="medium-zoom-image">
</p>

- **命名空间**💨

<p>
<img :src="$withBase('/SpringCloud/nacos_9.png')" alt="nacos_9" class="medium-zoom-image">
</p>

## Namespace+Group+ Data lD三者关系?为什么这么设计?❗
### 是什么💨
类似Java里面的package名和类名， **最外层的namespace是可以用于区分部署环境的，Group和DataID逻辑上区分两个目标对象。**

### 三者情况💨

<p>
<img :src="$withBase('/SpringCloud/nacos_10.png')" alt="nacos_10" class="medium-zoom-image">
</p>

```markdown
# 默认情况:
  Namespace=public，Group=DEFAULT_GROUP,默认Cluster是DEFAULT

# Nacos默认的命名空间是public，Namespace主要用来实现隔离。
比方说我们现在有三个环境:开发、测试、生产环境，我们就可以创建三个Namespace，不同的Namespace之间是隔离的。

# Group默认是DEFAULT_GROUP，Group可以把不同的微服务划分到同一个分组里面去

# Sevice就是微服务;一个Service可以包含多个Cluster(集群)，Nacos默认Cluster是DEFAULT，Cluster是对指定微服务的一个虚拟划分。
比方说为了容灾，将Service微服务分别部署在了杭州机房和广州机房，这时就可以给杭州机房的Service微服务起一个集群名称(Hz)，给广州机房的Service微服务起一个集群名称(GZ)，还可以尽量让同一个机房的微服务互相调用，以提升性能。

# 最后是Instance，就是微服务的实例。
```
## 实例-三种方案加载配置❗
### 1、dataID方案
**指定spring.profile.active和配置文件的DatalD来使不同环境下读取不同的配置**

**默认空间+默认分组+新建dev和test两个DatalD**

**通过spring.profile.active属性就能进行多环境下配置文件的读取**

- **新建两个不同的配置**💨

<p>
<img :src="$withBase('/SpringCloud/nacos_11.png')" alt="nacos_11" class="medium-zoom-image">
</p>

- **YML**💨

<p>
<img :src="$withBase('/SpringCloud/nacos_12.png')" alt="nacos_12" class="medium-zoom-image">
</p>

### 2、Group方案

- **Nacos配置详情**💨

<p>
<img :src="$withBase('/SpringCloud/nacos_13.png')" alt="nacos_13" class="medium-zoom-image">
</p>

- **YML**💨

<p>
<img :src="$withBase('/SpringCloud/nacos_14.png')" alt="nacos_14" class="medium-zoom-image">
<p>

### 3、Namespace方案

<p>
<img :src="$withBase('/SpringCloud/nacos_15.png')" alt="nacos_15" class="medium-zoom-image">
</p>


- **Nacos新增命名空间**💨

<p>
<img :src="$withBase('/SpringCloud/nacos_16.png')" alt="nacos_16" class="medium-zoom-image">
</p>

<p>
<img :src="$withBase('/SpringCloud/nacos_17.png')" alt="nacos_17" class="medium-zoom-image">
</p>

- **bootstrao.yml**💨
```yaml
# nacos配置
server:
  port: 3377

spring:
  application:
    name: nacos-config-client
  cloud:
    nacos:
      discovery:
        server-addr: localhost:8848 #Nacos服务注册中心地址
      config:
        server-addr: localhost:8848 #Nacos作为配置中心地址
        file-extension: yaml #指定yaml格式的配置
        group: TEST_GROUP
        namespace: ea7be215-37d0-4175-958c-a8af3545f115
```
## Nacos集群和持久化配置(重点)❗❗

### 官方架构图💨

<p>
<img :src="$withBase('/SpringCloud/nacos_18.png')" alt="nacos_18" class="medium-zoom-image">
</p>


### 说明💨

::: tip

**默认Nacos使用嵌入式数据库实现数据的存储。所以，如果启动多个默认配置下的Nacos节点，数据存储是存在一致性问题的。为了解决这个问题，Nacos采用了集中式存储的方式来支持集群化部署，目前只支持MySQL的存储。**

:::

### Nacos支持三种部署模式🕳

- 单机模式-用于测试和单机试用。
- 集群模式–用于生产环境，确保高可用。
- 多集群模式-用于多数据中心场景。

## 单机模式支持mysql
```
在0.7版本之前，在单机模式时nacos使用嵌入式数据库实现数据的存储，不方便观察数据存储的基本情况。0.7版本增加了支持mysql数据源能力，具体的操作步骤:
    
1.安装数据库，版本要求:5.6.5+
2.初始化mysql数据库，数据库初始化文件: nacos-mysql.sql
3.修改conf/application.properties文件，增加支持mysql数据源配置(目前只支持mysql)，添加mysql数据源的url、用户名和密码。
```
```yaml
spring.datasource.platform=mysql

db.num=1
db.ur1.0=jdbc:mysql://11.162.196.16:3306/nacos_devtest?characterEncoding=utf8&connectTimeout=1006
db.user=nacos_devtest
db.password=youdontknow
```
再以单机模式启动nacos，nacos所有写嵌入式数据库的数据都写到了mysql


## 集群模式

- **Nacos持久化配置解释**
   - **Nacos默认自带的是嵌入式数据库derby**
   - **derby到mysql切换配置步骤**
      - **1、nacos-server-1.1.4\nacos\conf录下找到sql脚本 -> nacos-mysql.sql 执行脚本**
      - **2、nacos-server-1.1.4\nacos\conf录下找到application.properties**
   - **启动Nacos，可以看到是个全新的空记录界面，以前是记录进derby**



## Linux版本Nacos+Mysql生产环境配置（集群）❗❗

### 1、前期准备

[nacos-linux上配置.zip](https://www.yuque.com/attachments/yuque/0/2021/zip/1108138/1628843053288-3410a865-3795-408b-a385-c156bc697d9d.zip?_lake_card=%7B%22src%22%3A%22https%3A%2F%2Fwww.yuque.com%2Fattachments%2Fyuque%2F0%2F2021%2Fzip%2F1108138%2F1628843053288-3410a865-3795-408b-a385-c156bc697d9d.zip%22%2C%22name%22%3A%22nacos-linux%E4%B8%8A%E9%85%8D%E7%BD%AE.zip%22%2C%22size%22%3A53033045%2C%22type%22%3A%22%22%2C%22ext%22%3A%22zip%22%2C%22status%22%3A%22done%22%2C%22source%22%3A%22transfer%22%2C%22id%22%3A%22XFJw4%22%2C%22card%22%3A%22file%22%7D)

1个Nginx + 3个Nacos（linux版本） + 1个Mysql（mysql5.7）

### 2、linux上的mysql建库，导入脚本

```
G:\java\SpringCloud2020\nacos\nacos\conf\nacos-mysql.sql
```

### 3、修改application.properties

<p>
<img :src="$withBase('/SpringCloud/nacos_19.png')" alt="nacos_19" class="medium-zoom-image">
</p>


### 4、Linux服务器上nacos的集群配置cluster.conf

<p>
<img :src="$withBase('/SpringCloud/nacos_20.png')" alt="nacos_20" class="medium-zoom-image">
<p>
<p>
<img :src="$withBase('/SpringCloud/nacos_21.png')" alt="nacos_21" class="medium-zoom-image">
</p>

<p>
<img :src="$withBase('/SpringCloud/nacos_22.png')" alt="nacos_22" class="medium-zoom-image">
</p>


### 5、编辑Nacos的启动脚本startup.sh，使他能接收不同的启动端口

<p>
<img :src="$withBase('/SpringCloud/nacos_23.png')" alt="nacos_23" class="medium-zoom-image">
</p>
<p>
<img :src="$withBase('/SpringCloud/nacos_24.png')" alt="nacos_24" class="medium-zoom-image">
</p>


**（清晰图-修改后的startup.sh）**

<p>
<img :src="$withBase('/SpringCloud/nacos_25.png')" alt="nacos_25" class="medium-zoom-image">
</p>
<p>
<img :src="$withBase('/SpringCloud/nacos_26.png')" alt="nacos_26" class="medium-zoom-image">
</p>


### 6、Nginx的配置，由它作负载均衡[nginx-linux上配置.zip](https://www.yuque.com/attachments/yuque/0/2021/zip/1108138/1628843053385-05193a95-b088-44bf-b599-08328e2c0366.zip?_lake_card=%7B%22src%22%3A%22https%3A%2F%2Fwww.yuque.com%2Fattachments%2Fyuque%2F0%2F2021%2Fzip%2F1108138%2F1628843053385-05193a95-b088-44bf-b599-08328e2c0366.zip%22%2C%22name%22%3A%22nginx-linux%E4%B8%8A%E9%85%8D%E7%BD%AE.zip%22%2C%22size%22%3A1491917%2C%22type%22%3A%22%22%2C%22ext%22%3A%22zip%22%2C%22status%22%3A%22done%22%2C%22source%22%3A%22transfer%22%2C%22id%22%3A%22jBjen%22%2C%22card%22%3A%22file%22%7D)

<p>
<img :src="$withBase('/SpringCloud/nacos_27.png')" alt="nacos_27" class="medium-zoom-image">
</p>

## 集群搭建完成💫
### 启动nacos 💨
```shell
./startup.sh -p 3333
./startup.sh -p 4444
./startup.sh -p 5555
```
### 查看nacos启动的个数：💨
```shell
ps -ef|grep nacos|grep -v grep |wc -l

```
### 通过nginx访问nacos：💨
```
http://192.168.111.144:1111/nacos/#/login
```
## yml修改配置(示例用9002)：💨

<p>
<img :src="$withBase('/SpringCloud/nacos_28.png')" alt="nacos_28" class="medium-zoom-image">
</p>

## 高可用小总结⭕

<p>
<img :src="$withBase('/SpringCloud/nacos_29.png')" alt="nacos_29" class="medium-zoom-image">
</p>
