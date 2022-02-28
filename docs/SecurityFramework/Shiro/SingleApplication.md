---
title: 在单体应用中使用
date: 2022-01-07
sidebar: auto
publish: false
categories:
 - SecurityFramework
tags:
 - 安全框架
---

## 前述🚨

这是Shiro + Ehcache + 单Realm 的笔记

### 1、引入shiro依赖🎇

这里使用 ehcache 作为shiro的缓存使用，后续会有使用 Redis 作为缓存使用

```xml
		<!--shiro依赖开始-->
        <dependency>
            <groupId>org.apache.shiro</groupId>
            <artifactId>shiro-spring</artifactId>
            <version>${shiro.version}</version>
        </dependency>
        <dependency>
            <groupId>org.apache.shiro</groupId>
            <artifactId>shiro-ehcache</artifactId>
            <version>${shiro.version}</version>
        </dependency>
        <!--在thymeleaf 使用shiro页面标签版本要对应-->
        <dependency>
            <groupId>com.github.theborakompanioni</groupId>
            <artifactId>thymeleaf-extras-shiro</artifactId>
           <version>${shiro.version}</version>
        </dependency>
        <!--shiro依赖结束-->
```

### 2、配置 **ShiroConfig** 🎇

```java
@Configuration
public class ShiroConfig {

    /**
     *  shiroFilter相关配置
     */
    @Bean
    public ShiroFilterFactoryBean shiroFilter(){
        ShiroFilterFactoryBean shiroFilterFactoryBean = new ShiroFilterFactoryBean();
        // 必须设置 SecurityManager
        shiroFilterFactoryBean.setSecurityManager(securityManager());
        // 拦截器
        Map<String, String> filterChainDefinitionMap = new LinkedHashMap<>();
        // 设置login URL
        shiroFilterFactoryBean.setLoginUrl("/page/login");
        // 登录成功后要跳转的链接
        shiroFilterFactoryBean.setSuccessUrl("/page/index");
        // 未授权的页面
        shiroFilterFactoryBean.setUnauthorizedUrl("/page/nopermission");
        // 静态资源
        filterChainDefinitionMap.put("/static/**/**","anon");
        //  登录
        filterChainDefinitionMap.put("/login","anon");
        // 注册
        filterChainDefinitionMap.put("/reg_user","anon");
        // 注册页面
        filterChainDefinitionMap.put("/page/registered","anon");
        filterChainDefinitionMap.put("/druid/**","anon");
       /* 退出系统*/
        filterChainDefinitionMap.put("/logout","logout");
        /*现有资源的角色*/
        filterChainDefinitionMap.put("/**","kickout,authc");
        // 限制登录
        Map<String, Filter> filters = new LinkedHashMap<>();
        filters.put("kickout",kickoutSessionControlFilter());
        shiroFilterFactoryBean.setFilters(filters);
        shiroFilterFactoryBean.setFilterChainDefinitionMap(filterChainDefinitionMap);

        return shiroFilterFactoryBean;
    }

    /**
     *  自定义Realm
     */
    @Bean
    public MyShiroRealm myShiroRealm() {
        /*自定义realm*/
        MyShiroRealm myShiroRealm = new MyShiroRealm();
        myShiroRealm.setCredentialsMatcher(hashedCredentialsMatcher());
        myShiroRealm.setCacheManager(ehCacheManager());
        return myShiroRealm;
    }

    /**
	 * 凭证匹配器 （由于我们的密码校验交给Shiro的SimpleAuthenticationInfo进行处理了
	 * 所以我们需要修改下doGetAuthenticationInfo中的代码; )
	 */
    @Bean
    public HashedCredentialsMatcher hashedCredentialsMatcher() {
        HashedCredentialsMatcher hashedCredentialsMatcher = new HashedCredentialsMatcher();
        // 散列算法:这里使用MD5算法;
        hashedCredentialsMatcher.setHashAlgorithmName("md5");
        // 散列的次数，比如散列两次，相当于md5(md5(""));
        hashedCredentialsMatcher.setHashIterations(1024);
        return hashedCredentialsMatcher;
    }

    /**
     *  配置安全管理器  securityManager
     */
    @Bean
    public DefaultWebSecurityManager securityManager() {
        DefaultWebSecurityManager securityManager = new DefaultWebSecurityManager();
        // 注入自定义的realm;
        securityManager.setRealm(myShiroRealm());
        // 注入缓存管理器
        securityManager.setCacheManager(ehCacheManager());
        //注入记住我管理器
        securityManager.setRememberMeManager(rememberMeManager());
        // 注入session管理
        securityManager.setSessionManager(sessionManager());
        return securityManager;
    }

    /**
    *  shiro缓存管理器
    */
    @Bean
    public EhCacheManager ehCacheManager() {
        EhCacheManager cacheManager = new EhCacheManager();
        cacheManager.setCacheManagerConfigFile("classpath:ehcache/ehcache.xml");
        return cacheManager;
    }

    /**
     * cookie 属性设置
     */
    private SimpleCookie rememberMeCookie(){
        //这个参数是cookie的名称，对应前端的checkbox的name = rememberMe
        SimpleCookie simpleCookie = new SimpleCookie("rememberMe");
        //如果httyOnly设置为true，则客户端不会暴露给客户端脚本代码，
        // 使用HttpOnly cookie有助于减少某些类型的跨站点脚本攻击；
        simpleCookie.setHttpOnly(true);
        //<!-- 记住我cookie生效时间30天 ,单位秒;-->
        simpleCookie.setMaxAge(259200);
        return simpleCookie;
    }

    /** rememberMeManager管理器
     * rememberMeManager()方法是生成rememberMe管理器，而且要将这个rememberMe管理器设置到securityManager中
     */
    private CookieRememberMeManager rememberMeManager(){
        CookieRememberMeManager cookieRememberMeManager = new CookieRememberMeManager();
        //rememberMe cookie加密的密钥 建议每个项目都不一样 默认AES算法 密钥长度(128 256 512 位)
        // 仅为测试使用，实际项目可更改为自定义生成，官方也是这么建议的(不记得在哪看到的)
        cookieRememberMeManager.setCipherKey(Base64.decode("d3V0b25nAAAAAAAAAAAAAA=="));
        cookieRememberMeManager.setCookie(rememberMeCookie());
        return cookieRememberMeManager;
    }


    /**
     * 会话管理器
     */
    @Bean
    public DefaultWebSessionManager sessionManager(){
        DefaultWebSessionManager sessionManager = new DefaultWebSessionManager();
        // 加入缓存管理器
        sessionManager.setCacheManager(ehCacheManager());
        // 删除过期的session
        sessionManager.setDeleteInvalidSessions(true);
        // 设置全局session超时时间
        sessionManager.setGlobalSessionTimeout(1800000);
        // 去掉JSESSIONID
        sessionManager.setSessionIdUrlRewritingEnabled(false);
        // 定义要使用的无效的Session定时调度器
        sessionManager.setSessionValidationScheduler(scheduler());
        // 是否定时检查session
        sessionManager.setSessionValidationSchedulerEnabled(true);
        sessionManager.setSessionDAO(sessionDAO());
        return sessionManager;
    }

    /**
     * 会话调度器
     */
    @Bean
    public ExecutorServiceSessionValidationScheduler scheduler(){
        ExecutorServiceSessionValidationScheduler scheduler = new ExecutorServiceSessionValidationScheduler();
        scheduler.setInterval(1800000);
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
        kickoutSessionControlFilter.setCacheManager(ehCacheManager());
        kickoutSessionControlFilter.setSessionManager(sessionManager());
        // 同一个用户最大的会话数，默认-1无限制；比如2的意思是同一个用户允许最多同时两个人登录
        kickoutSessionControlFilter.setMaxSession(1);
        // 是否踢出后来登录的，默认是false；即后者登录的用户踢出前者登录的用户；踢出顺序
        kickoutSessionControlFilter.setKickoutAfter(false);
        // 设置踢出后的地址，跳到登录界面
        kickoutSessionControlFilter.setKickoutUrl("/page/login?kickout=1");
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
     * 开启shiro aop注解支持 使用代理方式;所以需要开启代码支持;
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
    public DefaultAdvisorAutoProxyCreator defaultAdvisorAutoProxyCreator() {
        DefaultAdvisorAutoProxyCreator defaultAAP = new DefaultAdvisorAutoProxyCreator();
        defaultAAP.setProxyTargetClass(true);
        return defaultAAP;
    }
}
```

### 3、自定义Realm🎇

```java
/**
 * @Author: LiJunYi
 * @ClassName: MyShiroRealm
 * @Description TODO:登录验证及授权实现
 * @Version 1.0
 */
public class MyShiroRealm extends AuthorizingRealm {

    @Autowired
    private IUserService userService;
    /**
    * 实现授权
    * */
    @Override
    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principals) {
        //1. 从 PrincipalCollection 中来获取登录用户的信息
        Object principal = principals.getPrimaryPrincipal();
        //2. 利用登录的用户的信息来查询当前用户的角色或权限列表
        List<Role> roleList = userService.getRoles(principal.toString());
        Set<String> roles = new HashSet<>();
        Set<String> permissions = new HashSet<>();

        for (Role role : roleList) {
            roles.add(role.getRoleSymbol());
            // 仅为测试，实际应该是数据库配置的信息
            if ("admin".equals(role.getRoleSymbol())){
                permissions.add("user:assign");
                permissions.add("user:list");
            }else{
                permissions.add("user:list");
            }
        }
        //3. 创建 SimpleAuthorizationInfo, 并设置其 reles 属性.
        SimpleAuthorizationInfo info = new SimpleAuthorizationInfo(roles);
        info.setStringPermissions(permissions);
        //4. 返回 SimpleAuthorizationInfo 对象.
        return info;
    }


    /**
    * 实现登录验证
    * */
    @Override
    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken token) throws AuthenticationException {
        // 1.把AuthenticationToken 转换为UsernamePasswordToken
        UsernamePasswordToken upToken = (UsernamePasswordToken) token;
        // 2.从UsernamePasswordToken获取username
        String username = upToken.getUsername();
        // 3.调用数据库方法，从数据库获取username对应的用户记录
        User user = userService.queryByUserName(username);
        //  不存在该用户
        if (null == user) {
            throw new UnknownAccountException("无该用户");
        }else if(1 !=user.getUserType()){
            throw new LockedAccountException("账户被锁定");
        }
        //6. 根据用户的情况, 来构建 AuthenticationInfo 对象并返回. 通常使用的实现类为: SimpleAuthenticationInfo
        //以下信息是从数据库中获取的.
        //1). principal: 认证的实体信息. 可以是 username, 也可以是数据表对应的用户的实体类对象.
        Object principal = username;
        //2). credentials: 密码.
        Object credentials = user.getUserPassword();
        //3). realmName: 当前 realm 对象的 name. 调用父类的 getName() 方法即可
        String realmName = getName();
        //4). 盐值.
        ByteSource credentialsSalt = ByteSource.Util.bytes(username);
        SimpleAuthenticationInfo info = new SimpleAuthenticationInfo(principal, credentials, credentialsSalt, realmName);
        return info;
    }
}
```

### 4、单用户登录控制器🎇

```java
/**
 * @version 1.0.0
 * @ClassName: KickoutSessionControlFilter
 * @Description: 单用户登录控制(踢出前者)
 * @author: LiJunYi
 */
public class KickoutSessionControlFilter extends AccessControlFilter {

    /**
     * 踢出后到的地址
     */
    private String kickoutUrl;
    /**
     * 踢出之前登录的/之后登录的用户 默认踢出之前登录的用户
     */
    private boolean kickoutAfter;
    /**
     * 同一个帐号最大会话数 默认1
     */
    private int maxSession;
    private SessionManager sessionManager;
    private Cache<String, Deque<Serializable>> cache;

    public void setKickoutUrl(String kickoutUrl) {
        this.kickoutUrl = kickoutUrl;
    }

    public void setKickoutAfter(boolean kickoutAfter) {
        this.kickoutAfter = kickoutAfter;
    }

    public void setMaxSession(int maxSession) {
        this.maxSession = maxSession;
    }

    public void setSessionManager(SessionManager sessionManager) {
        this.sessionManager = sessionManager;
    }

    public void setCache(Cache<String, Deque<Serializable>> cache) {
        this.cache = cache;
    }

    public void setCacheManager(CacheManager cacheManager) {
        this.cache = cacheManager.getCache("shiro-activeSessionCache");
    }

    /**
     * 是否允许访问
     */
    @Override
    protected boolean isAccessAllowed(ServletRequest request, ServletResponse response, Object mappedValue) throws Exception {
        return false;
    }

    /**
     * 表示访问拒绝时是否自己处理，如果返回true表示自己不处理且继续拦截器链执行，返回false表示自己已经处理了（比如重定向到另一个页面）。
     */
    @Override
    protected boolean onAccessDenied(ServletRequest request, ServletResponse response) throws Exception {
        Subject subject = getSubject(request, response);
        if (!subject.isAuthenticated() && !subject.isRemembered()) {
            return true;
        }

        Session session = subject.getSession();
        String userKey = ShiroUtils.getSysUser().getUserKey();
        Serializable sessionId = session.getId();
        //  初始化用户的队列放入缓存
        Deque<Serializable> deque = cache.get(userKey);
        if (deque == null) {
            // 初始化队列
            deque = new LinkedList<>();
        }

        //  如果队列没有此sessionID,且用户没有被踢出 放入队列
        String kicKoutKey = "kickout";
        if (!deque.contains(sessionId) && session.getAttribute(kicKoutKey) == null) {
            // 将sessionId存入队列
            deque.push(sessionId);
            // 将用户的sessionId队列缓存
            cache.put(userKey, deque);
        }

        //如果队列里的sessionId数超出最大会话数，开始踢人
        while (deque.size() > maxSession) {
            // 是否踢出后来登录的，默认是false；即后者登录的用户踢出前者登录的用户；
            Serializable kickoutSessionId = kickoutAfter ? deque.removeFirst() : deque.removeLast();
            // 踢出后再更新下缓存队列
            cache.put(userKey, deque);

            try {
                // 获取被踢出的sessionId的session对象
                Session kickoutSession = sessionManager.getSession(new DefaultSessionKey(kickoutSessionId));
                if (null != kickoutSession) {
                    //设置会话的kickout属性表示踢出了
                    kickoutSession.setAttribute(kicKoutKey, true);
                }
            } catch (Exception e) {
               // 面对异常，我们选择忽略
            }
        }
        //如果被踢出了，直接退出，重定向到踢出后的地址
        if (session.getAttribute(kicKoutKey) != null && (boolean) session.getAttribute(kicKoutKey)){
            // 会话被踢出
            subject.logout();
            saveRequest(request);
            return isAjaxResponse(request,response);
        }
        return true;
    }

    private boolean isAjaxResponse(ServletRequest request, ServletResponse response) throws IOException {
        HttpServletRequest req = (HttpServletRequest) request;
        HttpServletResponse res = (HttpServletResponse) response;
        if(WebUtilsPro.isAjaxRequest(req)){
            // 输出JSON
            Map<String,Object> map = new HashMap<>(8);
            map.put("code", "501");
            map.put("msg","系统提示：您已在别处登录,若不是您本人操作,请重新登录!");
            WebUtilsPro.writeJson(map, res);
        }else{
            WebUtils.issueRedirect(request,response,kickoutUrl);
        }
        return false;
    }
}
```

### 5、登录方法🎇

```java
@Controller
public class LoginController {

    @Autowired
    private IUserService userService;
    @Autowired
    private IPermissionService  permissionService;
    @Autowired
    HttpSession session;

    /**
    * 登录方法
    */
    @RequestMapping("login")
    @ResponseBody
    public String login(User user, Boolean rememberMe){
        // 处理结果
        String reMsg = "";
        // 获取当前登录用户
        Subject currentUser = SecurityUtils.getSubject();
        // 验证是否登录
        if(!currentUser.isAuthenticated()){
            // 用户名密码封装
            UsernamePasswordToken token = new UsernamePasswordToken(user.getUserName(),user.getUserPassword());
            // 配置记住我
            if(null == rememberMe){
                rememberMe = false;
            }
            token.setRememberMe(rememberMe);
            try {
                //  执行登录
                currentUser.login(token);
                reMsg="登录成功";
                // 进行菜单处理
                User user1 = userService.queryByUserName(user.getUserName());
                Permission root = permissionService.queryPermissionByUser(user1.getId());
                session.setAttribute("rootPermission", root);
                session.setAttribute("LoginUser", user1);
                return reMsg;
            }catch (IncorrectCredentialsException e){
                System.out.println("密码错误"+e.getMessage());
                reMsg="密码错误";
            }catch (LockedAccountException e){
                System.out.println("账号已被锁定");
                reMsg="账号已被锁定";
            }catch (DisabledAccountException e){
                System.out.println("账号被禁用");
                reMsg="账号被禁用";
            }catch (UnknownAccountException e){
                System.out.println("账号不存在");
                reMsg="账号不存在";
            }catch (UnauthorizedException e) {
                System.out.println("没有权限进入");
                reMsg="没有权限进入";
            }catch (AuthenticationException ae){
                System.out.println("用户名或密码错误");
                reMsg = "用户名或密码错误";
            }
            return reMsg;
        }
        return reMsg;
    }
}
```



## 个人看法😎

​		shiro作为一个老牌的安全框架，学习成本相对Security来讲还是容易的多。而且shiro在单体应用中，并且如果只需要一个Realm的话，依照笔记步骤来还是非常容易实现项目里安全认证及权限控制的。



​		实际项目上，可能会有多个Realm情况，比如只需要短信+用户名验证、验证码+用户名验证这些，像这些情况我们就需要写多个Realm去实现对应的逻辑代码。还有像可能在部署项目的时候，需要实现负载均衡功能，那就不能使用EhCache缓存，需要换成像Redis这种来实现session的共享，从而来实现负载均衡的效果。

上面提及的各种情况，博主后续会继续整理更新出来，如果有描述不对或者错误的地方，希望指正，共同进步!😁😁😁















