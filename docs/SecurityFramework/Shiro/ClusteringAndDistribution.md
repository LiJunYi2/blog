---
title: 分布式缓存和集群会话
date: 2022-02-23
sidebar: auto
publish: false
categories:
 - SecurityFramework
tags:
 - 安全框架
---

## 前述🚨

以《在单体应用中使用》中的代码基础上更新，shiro使用Redis作为会话缓存层，从而实现项目负载均衡等功能。

在集群环境中，我们需要集群中的多台服务器能够共享缓存和会话，目前流行的方案是使用Redis数据库来作为缓存服务器。Shiro 官方没有提供对 Redis 做缓存的集成支持，在官方提供的第三方扩展库中有对 Redis的支持。

[Shiro-Redis](https://github.com/alexxiyang/shiro-redis/tree/master/docs)

## 实现过程🔎

### 1、修改POM依赖

1.1、去除项目中所有 shiro-ehcache 依赖，包括 pom.xml、ehcache.xml、ShiroConfig.java 中有关内容

1.2、引入shiro-redis 依赖

```xml
<!-- shiro整合redis -->
<dependency>
  <groupId>org.crazycake</groupId>
  <artifactId>shiro-redis</artifactId>
  <version>3.3.1</version>
</dependency>
<!-- springboot整合redis -->
 <dependency>
   <groupId>org.springframework.boot</groupId>
   <artifactId>spring-boot-starter-data-redis</artifactId>
</dependency>
```

### 2、Yml中新增Redis有关配置

```yaml
spring:
  redis:
    database: 0
    host: 127.0.0.1
    port: 6379
    password:
    timeout: 6000ms
    lettuce:
      pool:
        max-active: 1000
        max-wait: -1ms
        max-idle: 10
        min-idle: 5
```

### 3、Redis序列化配置

```java
/**
 * @version 1.0.0
 * @className: FastJson2JsonRedisSerializer
 * @description: Redis使用FastJson序列化
 * @author: LiJunYi
 * @create: 2022-02-23
 */
public class FastJson2JsonRedisSerializer implements RedisSerializer<T> {
    @SuppressWarnings("unused")
    private ObjectMapper objectMapper = new ObjectMapper();

    public static final Charset DEFAULT_CHARSET = Charset.forName("UTF-8");

    private Class<Object> clazz;

    static {
        ParserConfig.getGlobalInstance().setAutoTypeSupport(true);
    }

    public FastJson2JsonRedisSerializer(Class<Object> clazz) {
        super();
        this.clazz = clazz;
    }

    @Override
    public byte[] serialize(T t) throws SerializationException {
        if (t == null) {
            return new byte[0];
        }
        return JSON.toJSONString(t, SerializerFeature.WriteClassName).getBytes(DEFAULT_CHARSET);
    }

    @Override
    public T deserialize(byte[] bytes) throws SerializationException {
        if (bytes == null || bytes.length <= 0) {
            return null;
        }
        String str = new String(bytes, DEFAULT_CHARSET);

        return JSON.parseObject(str, (Type) clazz);
    }

    public void setObjectMapper(ObjectMapper objectMapper) {
        Assert.notNull(objectMapper, "'objectMapper' must not be null");
        this.objectMapper = objectMapper;
    }

    protected JavaType getJavaType(Class<?> clazz) {
        return TypeFactory.defaultInstance().constructType(clazz);
    }
}

```

```java
/**
 * @version 1.0.0
 * @className: RedisConfig
 * @description: redis序列化配置
 * @author: LiJunYi
 * @create: 2022-02-23
 */
@Configuration
@EnableCaching
public class RedisConfig extends CachingConfigurerSupport
{
    @Bean
    @ConditionalOnMissingBean(name = "redisTemplate")
    public RedisTemplate<Object, Object> redisTemplate(RedisConnectionFactory connectionFactory)
    {
        RedisTemplate<Object, Object> template = new RedisTemplate<>();
        template.setConnectionFactory(connectionFactory);

        FastJson2JsonRedisSerializer serializer = new FastJson2JsonRedisSerializer(Object.class);

        ObjectMapper mapper = new ObjectMapper();
        mapper.setVisibility(PropertyAccessor.ALL, JsonAutoDetect.Visibility.ANY);
        mapper.activateDefaultTyping(LaissezFaireSubTypeValidator.instance, ObjectMapper.DefaultTyping.NON_FINAL, JsonTypeInfo.As.PROPERTY);
        serializer.setObjectMapper(mapper);

        template.setValueSerializer(serializer);
        // 使用StringRedisSerializer来序列化和反序列化redis的key值
        template.setKeySerializer(new StringRedisSerializer());
        template.afterPropertiesSet();
        return template;
    }
}
```



### 4、Shiro配置类修改

```java

/**
 * 功能描述:  shiro配置
 * @author: LiJunYi
 * @date: 2022-02-23
 * @version: v1.0.0
 */
@Configuration
public class ShiroConfig {

    /**
     * redis缓存地址
     */
    @Value("${spring.redis.port}")
    private String redisPort;

    /**
     * redis缓存端口
     */
    @Value("${spring.redis.host}")
    private String redisHost;

    /**
     * redis数据库索引
     */
    @Value("${spring.redis.database}")
    private int database;

    /**
     * redis密码
     */
    @Value("${spring.redis.password}")
    private String password;

    /**
     * Cache Manager (shiro-redis)
     */
    @Bean
    public RedisCacheManager redisCacheManager()
    {
        RedisCacheManager redisCacheManager = new RedisCacheManager();
        redisCacheManager.setRedisManager(redisManager());
        //userId 是User 类中用户id属性的名称。给配置用来针对不同的主体(用户) 生成唯一的缓存key。
        redisCacheManager.setPrincipalIdFieldName("userId");
        return redisCacheManager;
    }

    /**
     * RedisManager (shiro-redis)
     */
    @Bean
    public RedisManager redisManager()
    {
        RedisManager redisManager = new RedisManager();
        redisManager.setHost(redisHost + ":" + redisPort);
        redisManager.setDatabase(database);
        if (StrUtil.isNotEmpty(password))
        {
            redisManager.setPassword(password);
        }
        redisManager.setTimeout(30 * 60);
        return redisManager;
    }

    /**
     *  自定义Realm
     */
    @Bean
    public MyShiroRealm myShiroRealm() {
        return new MyShiroRealm();
    }

    /**
     * 自定义无密码登录
     *
     * @return {@link UserNameRealm}
     */
    @Bean
    public UserNameRealm userNameRealm()
    {
        UserNameRealm userNameRealm = new  UserNameRealm();
        userNameRealm.setCacheManager(redisCacheManager());
        return userNameRealm;
    }

    /**
     * 退出过滤器
     */
    public LogoutFilter logoutFilter(){
        LogoutFilter logoutFilter = new LogoutFilter();
        logoutFilter.setLoginUrl("/page/main");
        logoutFilter.setCacheManager(redisCacheManager());
        return logoutFilter;
    }

    /**
     * RedisSessionDAO (shiro-redis)
     */
    @Bean
    public RedisSessionDAO redisSessionDAO()
    {
        RedisSessionDAO redisSessionDAO = new RedisSessionDAO();
        redisSessionDAO.setRedisManager(redisManager());
        redisSessionDAO.setExpire(30 * 60);
        return redisSessionDAO;
    }

    /**
     * 会话管理器
     */
    @Bean
    public SessionManager sessionManager(){
        DefaultWebSessionManager sessionManager = new DefaultWebSessionManager();
        // 加入缓存管理器
        sessionManager.setCacheManager(redisCacheManager());
        // 去掉JSESSIONID
        sessionManager.setSessionIdUrlRewritingEnabled(false);
        // 自定义SessionDao
        sessionManager.setSessionDAO(redisSessionDAO());
        return sessionManager;
    }

    /**
     *  安全管理器  securityManager
     */
    @Bean
    public SecurityManager securityManager() {
        DefaultWebSecurityManager securityManager = new DefaultWebSecurityManager();
        // 注入自定义的realm;
        // 设置realms
        List<Realm> realms = new ArrayList<>();
        realms.add(myShiroRealm());
        realms.add(userNameRealm());
        securityManager.setRealms(realms);
        // 注入缓存管理器
        securityManager.setCacheManager(redisCacheManager());
        //注入记住我管理器
        securityManager.setRememberMeManager(rememberMeManager());
        // 注入session管理
        securityManager.setSessionManager(sessionManager());
        // 认证器
        securityManager.setAuthenticator(abstractAuthenticator());
        return securityManager;
    }


    /**
     * Shiro过滤器配置
     * */
    @Bean
    public ShiroFilterFactoryBean shiroFilter(){
        ShiroFilterFactoryBean shiroFilterFactoryBean = new ShiroFilterFactoryBean();
        ......
        return shiroFilterFactoryBean;
    }

    /**
     * 认证器
     * */
    @Bean
    public AbstractAuthenticator abstractAuthenticator(){
        // 自定义模块化认证器，用于解决多realm抛出异常问题
        CustomModularRealmAuthenticator authenticator = new CustomModularRealmAuthenticator();
        // 认证策略：AtLeastOneSuccessfulStrategy(默认)，AllSuccessfulStrategy，FirstSuccessfulStrategy
        authenticator.setAuthenticationStrategy(new AtLeastOneSuccessfulStrategy());
        // 加入realms
        List<Realm> realms = new ArrayList<>();
        realms.add(myShiroRealm());
        realms.add(userNameRealm());
        authenticator.setRealms(realms);
        return authenticator;
    }


    /**
     * cookie 属性设置
     */
    private SimpleCookie rememberMeCookie(){
        //这个参数是cookie的名称，对应前端的checkbox的name = rememberMe
        SimpleCookie simpleCookie = new SimpleCookie("rememberMe");
        //如果httyOnly设置为true，则客户端不会暴露给客户端脚本代码
        simpleCookie.setHttpOnly(true);
        // simpleCookie.setSecure(true);
        simpleCookie.setMaxAge(-1);
        simpleCookie.setPath("/");
        return simpleCookie;
    }

    /** rememberMeManager管理器
     * rememberMeManager()方法是生成rememberMe管理器，而且要将这个rememberMe管理器设置到securityManager中
     */
    private CookieRememberMeManager rememberMeManager(){
        CookieRememberMeManager cookieRememberMeManager = new CookieRememberMeManager();
        //rememberMe cookie加密的密钥 默认AES算法 密钥长度(128 256 512 位)
        cookieRememberMeManager.setCipherKey(Base64.decode("......"));
        cookieRememberMeManager.setCookie(rememberMeCookie());
        return cookieRememberMeManager;
    }


    /**
     * 会话调度器
     */
    @Bean
    public ExecutorServiceSessionValidationScheduler scheduler(){
        ExecutorServiceSessionValidationScheduler scheduler = new ExecutorServiceSessionValidationScheduler();
        scheduler.setInterval(12 * 60 * 60 * 1000);
        return scheduler;
    }
    @Bean
    public EnterpriseCacheSessionDAO sessionDAO(){
        EnterpriseCacheSessionDAO sessionDAO = new EnterpriseCacheSessionDAO();
        sessionDAO.setActiveSessionsCacheName("shiro-activeSessionCache");
        return sessionDAO;
    }
    /**
     * 同一个用户多设备登录限制
     */
    public KickoutSessionControlFilter kickoutSessionControlFilter(){
        KickoutSessionControlFilter kickoutSessionControlFilter = new KickoutSessionControlFilter();
        kickoutSessionControlFilter.setCacheManager(redisCacheManager());
        kickoutSessionControlFilter.setSessionManager(sessionManager());
        // 同一个用户最大的会话数，默认-1无限制；比如2的意思是同一个用户允许最多同时两个人登录
        kickoutSessionControlFilter.setMaxSession(1);
        // 是否踢出后来登录的，默认是false；即后者登录的用户踢出前者登录的用户；踢出顺序
        kickoutSessionControlFilter.setKickoutAfter(false);
        kickoutSessionControlFilter.setKickoutUrl("/page/main?kickout=1");
        return kickoutSessionControlFilter;
    }

    /**
     * 在thymeleaf 使用shiro页面标签
     * */
    @Bean
    public ShiroDialect shiroDialect(){
        return new ShiroDialect();
    }

    /**
     * 开启Shiro注解通知器
     */
    @Bean
    public AuthorizationAttributeSourceAdvisor authorizationAttributeSourceAdvisor() {
        AuthorizationAttributeSourceAdvisor authorizationAttributeSourceAdvisor = new AuthorizationAttributeSourceAdvisor();
        authorizationAttributeSourceAdvisor.setSecurityManager(securityManager());
        return authorizationAttributeSourceAdvisor;
    }

    /**
     * DefaultAdvisorAutoProxyCreator，Spring的一个bean，由Advisor决定对哪些类的方法进行AOP代理。
     */
    @Bean
    @ConditionalOnMissingBean
    public static DefaultAdvisorAutoProxyCreator defaultAdvisorAutoProxyCreator() {
        DefaultAdvisorAutoProxyCreator defaultApp = new DefaultAdvisorAutoProxyCreator();
        defaultApp.setProxyTargetClass(true);
        return defaultApp;
    }
}

```

