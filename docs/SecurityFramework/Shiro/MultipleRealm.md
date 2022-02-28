---
title: 自定义Realm
date: 2022-02-23
sidebar: auto
publish: false
categories:
 - SecurityFramework
tags:
 - 安全框架
---

## 前述🚨

以《在单体应用中使用》中的代码基础上更新，shiro多Realm情况下的使用，一般情况下试用于：短信登录，无密码登录等。

## 实现过程🔎

### 1、MyShiroRealm

```java
/**
 * 功能描述:这是一个空的Realm，不做任何事
 * @author: LiJunYi
 * @date: 2022-02-23
 * @version: v1.0.0
 */
public class MyShiroRealm extends AuthorizingRealm {

    /**
    * 实现授权
    * */
    @Override
    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principals) {
        return null;
    }
    /**
    * 实现登录验证
    * */
    @Override
    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken token) throws AuthenticationException {
        return null;
    }
}

```

### 2、UserNameRealm

```java
/**
 * 
 * @author LiJunYi
 * @version 1.0.0
 * @ClassName: UserNameRealm
 * @Description: 自定义realm
 * @author: LiJunYi
 * @create: 2022-02-23
 */
public class UserNameRealm  extends AuthorizingRealm {

    @Autowired
    IRoleInfoService roleService;
    @Autowired
    LoginService loginService;

    /**
     * 实现授权
     * */
    @Override
    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principals) {
//        Object principal = principals.getPrimaryPrincipal();

        List<RoleInfoModel> roleList = roleService.queryByUserName(ShiroUtils.userLoginName());

        Set<String> roles = new HashSet<>();
        for (RoleInfoModel role : roleList)
        {
            roles.add(role.getRoleName());
        }
        return new SimpleAuthorizationInfo(roles);
    }


    /**
     * 实现登录验证
     * */
    @Override
    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken authenticationToken) throws AuthenticationException {
        IgnorePassWordToken token = (IgnorePassWordToken) authenticationToken;
        String userKey = (String) token.getPrincipal();
        UserInfoModel user = null;
        try {
            // login方法中可以实现：校验短信code，校验用户密钥等不需要校验用户密码情况下的逻辑代码
            user = loginService.login(userKey);
        }catch (UserNotExistsException e){
            throw new UnknownAccountException("用户不存在,请将Key正确插入!");
        }catch (UserPasswordNotMatchException e){
            throw new IncorrectCredentialsException("密码错误");
        }catch (UserPasswordRetryLimitExceedException e){
            throw new LockedAccountException("账户被锁定,联系系统管理员解锁!");
        }catch (UserDeleteException e){
            throw new DisabledAccountException("账户已失效");
        }catch (UserDisableException e){
            throw new UserInvalidException("该用户状态不是有效状态!");
        }catch (RoleFailureException e){
            throw new UserRoleFailureException("该用户角色未生效，请联系系统管理员激活角色!");
        }catch (MenuDisableException e){
            throw new UserMenuNullException("该用户菜单未生效，请联系安全管理员进行激活菜单!");
        }catch (MenuNullException e){
            throw new UserMenuNullException("该用户未分配菜单，请联系系统管理员进行分配菜单!");
        }
        catch (Exception e){
            throw new AuthenticationException("登录异常");
        }
        return new SimpleAuthenticationInfo(user,userKey,getName());
    }

    @Override
    public boolean supports(AuthenticationToken var1){
        return var1 instanceof IgnorePassWordToken;
    }
}

```

### 3、自定义Token

```java
/**
 * @version 1.0.0
 * @ClassName: IgnorePassWordToken
 * @Description: shiro自定义忽略密码token验证
 * @author: LiJunYi
 * @create: 2022-02-23
 */
public class IgnorePassWordToken extends AuthenticationException implements HostAuthenticationToken, RememberMeAuthenticationToken, Serializable {

    private static final long serialVersionUID = -67491242749657872L;
    /**
     * 用户名
     */
    private String userName;
    /**
     * 记得我
     */
    private boolean rememberMe;
    /**
     * 主机
     */
    private String host;

    @Override
    public Object getPrincipal() {
        return userName;
    }

    @Override
    public Object getCredentials() {
        return userName;
    }

    public IgnorePassWordToken() {
        this.rememberMe = false;
    }

    public IgnorePassWordToken(String userName, boolean rememberMe, String host) {
        this.userName = userName;
        this.rememberMe = rememberMe;
        this.host = host;
    }

    public IgnorePassWordToken(String userName)
    {
        this(userName,false,null);
    }

    public IgnorePassWordToken(String userName,boolean rememberMe)
    {
        this(userName,rememberMe,null);
    }

    public String getUserName()
    {
        return userName;
    }

    public void setUserName(String userName)
    {
        this.userName = userName;
    }

    @Override
    public String getHost() {
        return host;
    }

    @Override
    public boolean isRememberMe() {
        return rememberMe;
    }

}

```

### 4、重写doMultiRealmAuthentication方法

```java
/**
 * @version 1.0.0
 * @ClassName: CustomModularRealmAuthenticator
 * @Description: shiro模块认证器
 * @author: LiJunYi
 * @create: 2022-02-23
 */
public class CustomModularRealmAuthenticator extends ModularRealmAuthenticator {

    /**
     * 重写doMultiRealmAuthentication，抛出异常，便于自定义ExceptionHandler捕获
     */
    @Override
    public AuthenticationInfo doMultiRealmAuthentication(Collection<Realm> realms, AuthenticationToken token) throws AuthenticationException {

        AuthenticationStrategy strategy = this.getAuthenticationStrategy();
        AuthenticationInfo aggregate = strategy.beforeAllAttempts(realms, token);

        Iterator var5 = realms.iterator();

        while(var5.hasNext()) {
            Realm realm = (Realm)var5.next();
            aggregate = strategy.beforeAttempt(realm, token, aggregate);
            if (realm.supports(token)) {

                AuthenticationInfo info = null;
                Throwable t = null;

                info = realm.getAuthenticationInfo(token);

                aggregate = strategy.afterAttempt(realm, token, info, aggregate, t);
            }
        }
        aggregate = strategy.afterAllAttempts(token, aggregate);
        return aggregate;
    }
}


```

### 5、修改Shiro的配置代码

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
        userNameRealm.setCacheManager(ehCacheManager());
        return userNameRealm;
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
     *  配置安全管理器  securityManager
     */
    @Bean
    public DefaultWebSecurityManager securityManager() {
        DefaultWebSecurityManager securityManager = new DefaultWebSecurityManager();
        // 注入自定义的realm;
        // 设置realms
        List<Realm> realms = new ArrayList<>();
        realms.add(myShiroRealm());
        realms.add(userNameRealm());
        securityManager.setRealms(realms);
        ......
        return securityManager;
    }
}
```

### 6、登录方法的改造

```java
// 获取当前登录用户
 Subject subject = SecurityUtils.getSubject();
// 用户名密码封装
IgnorePassWordToken token = new IgnorePassWordToken(userKey);
try {
    // 执行登录
    subject.login(token);
    ......
}
```

