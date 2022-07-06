(window.webpackJsonp=window.webpackJsonp||[]).push([[55],{580:function(s,a,t){"use strict";t.r(a);var n=t(2),e=Object(n.a)({},(function(){var s=this,a=s.$createElement,t=s._self._c||a;return t("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[t("h2",{attrs:{id:"spring-cloud-gateway集成nacos"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#spring-cloud-gateway集成nacos"}},[s._v("#")]),s._v(" Spring Cloud Gateway集成Nacos")]),s._v(" "),t("p",[t("strong",[s._v("前述")])]),s._v(" "),t("p",[s._v("在上一篇笔记中，你会发现"),t("code",[s._v("yaml")]),s._v("里配置了Nacos注册中心，这样做的好处就是不用关心服务的IP地址，使得网关能够从注册中心自动获取uri（负载均衡）")]),s._v(" "),t("div",{staticClass:"language-yaml line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-yaml"}},[t("code",[s._v("    "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("gateway")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n      "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("discovery")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n        "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("locator")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n          "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("enabled")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token boolean important"}},[s._v("true")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#开启从注册中心动态创建路由的功能，利用微服务名进行路由")]),s._v("\n          "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("lower-case-service-id")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token boolean important"}},[s._v("true")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#是否将服务名称转小写")]),s._v("\n      "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("routes")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n        "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("id")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" payment"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v("service                  "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#路由的ID，没有固定规则但要求唯一，建议配合服务名")]),s._v("\n          "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("uri")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" lb"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("//cloud"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v("payment"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v("service      "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#匹配后提供服务的路由地址")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br")])]),t("h2",{attrs:{id:"集成nacos"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#集成nacos"}},[s._v("#")]),s._v(" 集成Nacos")]),s._v(" "),t("h3",{attrs:{id:"pom文件引入nacos依赖"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#pom文件引入nacos依赖"}},[s._v("#")]),s._v(" pom文件引入Nacos依赖")]),s._v(" "),t("div",{staticClass:"language-xml line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-xml"}},[t("code",[t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("\x3c!--nacos注册中心--\x3e")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token tag"}},[t("span",{pre:!0,attrs:{class:"token tag"}},[t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("<")]),s._v("dependency")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(">")])]),s._v("\n      "),t("span",{pre:!0,attrs:{class:"token tag"}},[t("span",{pre:!0,attrs:{class:"token tag"}},[t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("<")]),s._v("groupId")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(">")])]),s._v("com.alibaba.cloud"),t("span",{pre:!0,attrs:{class:"token tag"}},[t("span",{pre:!0,attrs:{class:"token tag"}},[t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("</")]),s._v("groupId")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(">")])]),s._v("\n      "),t("span",{pre:!0,attrs:{class:"token tag"}},[t("span",{pre:!0,attrs:{class:"token tag"}},[t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("<")]),s._v("artifactId")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(">")])]),s._v("spring-cloud-starter-alibaba-nacos-discovery"),t("span",{pre:!0,attrs:{class:"token tag"}},[t("span",{pre:!0,attrs:{class:"token tag"}},[t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("</")]),s._v("artifactId")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(">")])]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token tag"}},[t("span",{pre:!0,attrs:{class:"token tag"}},[t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("</")]),s._v("dependency")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(">")])]),s._v("\n\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br")])]),t("h3",{attrs:{id:"主启动类开启注册中心功能"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#主启动类开启注册中心功能"}},[s._v("#")]),s._v(" 主启动类开启注册中心功能")]),s._v(" "),t("div",{staticClass:"language-java line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-java"}},[t("code",[t("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[s._v("@SpringBootApplication")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[s._v("@EnableDiscoveryClient")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("public")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("class")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("GateWayMain9527")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n\n    "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("public")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("static")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("void")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("main")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("String")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v(" args"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n        "),t("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("SpringApplication")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("run")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("GateWayMain9527")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("class")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("args"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br")])]),t("h3",{attrs:{id:"配置文件指定nacos注册中心的地址"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#配置文件指定nacos注册中心的地址"}},[s._v("#")]),s._v(" 配置文件指定Nacos注册中心的地址")]),s._v(" "),t("p",[s._v("其中：")]),s._v(" "),t("ul",[t("li",[t("code",[s._v("lb")]),s._v("：固定格式，指的是从nacos中按照名称获取微服务,并遵循负载均衡策略")]),s._v(" "),t("li",[t("code",[s._v("service-name")]),s._v("：nacos注册中心的服务名称，这里并不是IP地址形式的")])]),s._v(" "),t("div",{staticClass:"language-yaml line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-yaml"}},[t("code",[t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("spring")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("main")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("allow-bean-definition-overriding")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token boolean important"}},[s._v("true")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("application")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("name")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" cloud"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v("gateway\n  "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("cloud")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("nacos")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n      "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("discovery")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n        "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("server-addr")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" localhost"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("8848")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("gateway")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n      "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("discovery")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n        "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("locator")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n          "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("enabled")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token boolean important"}},[s._v("true")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#开启从注册中心动态创建路由的功能，利用微服务名进行路由")]),s._v("\n          "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("lower-case-service-id")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token boolean important"}},[s._v("true")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#是否将服务名称转小写")]),s._v("\n      "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("routes")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n        "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("id")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" payment"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v("service                  "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#路由的ID，没有固定规则但要求唯一，建议配合服务名")]),s._v("\n          "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("uri")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" lb"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("//cloud"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v("payment"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v("service      "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#匹配后提供服务的路由地址")]),s._v("\n          "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("predicates")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n            "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v(" Path=/payment/"),t("span",{pre:!0,attrs:{class:"token important"}},[s._v("**")]),s._v("              "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 断言，路径相匹配的进行路由")]),s._v("\n            "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#- After=2020-02-21T15:51:37.485+08:00[Asia/Shanghai] 在该时间点之后有效")]),s._v("\n            "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#- Cookie=username,zzyy")]),s._v("\n            "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#- Header=X-Request-Id, \\d+        # 请求头要有X-Request-Id属性并且值为整数的正则表达式")]),s._v("\n        "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("id")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" order"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v("consumer\n          "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("uri")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" lb"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("//nacos"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v("order"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v("consumer\n          "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("predicates")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n            "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v(" Path=/consumer/"),t("span",{pre:!0,attrs:{class:"token important"}},[s._v("**")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br"),t("span",{staticClass:"line-number"},[s._v("9")]),t("br"),t("span",{staticClass:"line-number"},[s._v("10")]),t("br"),t("span",{staticClass:"line-number"},[s._v("11")]),t("br"),t("span",{staticClass:"line-number"},[s._v("12")]),t("br"),t("span",{staticClass:"line-number"},[s._v("13")]),t("br"),t("span",{staticClass:"line-number"},[s._v("14")]),t("br"),t("span",{staticClass:"line-number"},[s._v("15")]),t("br"),t("span",{staticClass:"line-number"},[s._v("16")]),t("br"),t("span",{staticClass:"line-number"},[s._v("17")]),t("br"),t("span",{staticClass:"line-number"},[s._v("18")]),t("br"),t("span",{staticClass:"line-number"},[s._v("19")]),t("br"),t("span",{staticClass:"line-number"},[s._v("20")]),t("br"),t("span",{staticClass:"line-number"},[s._v("21")]),t("br"),t("span",{staticClass:"line-number"},[s._v("22")]),t("br"),t("span",{staticClass:"line-number"},[s._v("23")]),t("br"),t("span",{staticClass:"line-number"},[s._v("24")]),t("br"),t("span",{staticClass:"line-number"},[s._v("25")]),t("br"),t("span",{staticClass:"line-number"},[s._v("26")]),t("br")])]),t("h2",{attrs:{id:"实现动态路由"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#实现动态路由"}},[s._v("#")]),s._v(" 实现动态路由")]),s._v(" "),t("p",[s._v("上述例子中，我们将网关的一些配置写到项目的配置文件中，一旦出现路由发生变更必须要重新打包发布项目，这样维护成本很高也很耗时。")]),s._v(" "),t("p",[s._v("我们既然用了Nacos作为注册中心，同样的，我们也可以把Nacos作为网关的配置中心，这样由配置中心统一管理，一旦路由发生改变，只需要在配置中心修改发布，这样便能达到"),t("strong",[s._v("一处修改，多出生效")]),s._v("的目的。")]),s._v(" "),t("h3",{attrs:{id:"_1、引入nacos配置中心依赖"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_1、引入nacos配置中心依赖"}},[s._v("#")]),s._v(" 1、引入"),t("code",[s._v("nacos")]),s._v("配置中心依赖")]),s._v(" "),t("div",{staticClass:"language-xml line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-xml"}},[t("code",[t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("\x3c!--    nacos配置中心的依赖--\x3e")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token tag"}},[t("span",{pre:!0,attrs:{class:"token tag"}},[t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("<")]),s._v("dependency")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(">")])]),s._v("\n      "),t("span",{pre:!0,attrs:{class:"token tag"}},[t("span",{pre:!0,attrs:{class:"token tag"}},[t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("<")]),s._v("groupId")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(">")])]),s._v("com.alibaba.cloud"),t("span",{pre:!0,attrs:{class:"token tag"}},[t("span",{pre:!0,attrs:{class:"token tag"}},[t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("</")]),s._v("groupId")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(">")])]),s._v("\n      "),t("span",{pre:!0,attrs:{class:"token tag"}},[t("span",{pre:!0,attrs:{class:"token tag"}},[t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("<")]),s._v("artifactId")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(">")])]),s._v("spring-cloud-starter-alibaba-nacos-config"),t("span",{pre:!0,attrs:{class:"token tag"}},[t("span",{pre:!0,attrs:{class:"token tag"}},[t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("</")]),s._v("artifactId")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(">")])]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token tag"}},[t("span",{pre:!0,attrs:{class:"token tag"}},[t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("</")]),s._v("dependency")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(">")])]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br")])]),t("h3",{attrs:{id:"_2、在bootstrap-yml文件中指定nacos作为配置中心"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_2、在bootstrap-yml文件中指定nacos作为配置中心"}},[s._v("#")]),s._v(" 2、在"),t("code",[s._v("bootstrap.yml")]),s._v("文件中指定Nacos作为配置中心")]),s._v(" "),t("div",{staticClass:"language-yaml line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-yaml"}},[t("code",[t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("spring")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("application")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("## 指定服务名称，在nacos中的名字")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("name")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" cloud"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v("gateway\n  "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("cloud")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("nacos")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n      "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("## todo 此处作为演示，仅仅配置了后缀，其他分组，命名空间根据需要自己配置")]),s._v("\n      "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("config")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n        "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("server-addr")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" 127.0.0.1"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("8848")]),s._v("\n        "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("## 指定文件后缀未yaml")]),s._v("\n        "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("file-extension")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" yaml\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br"),t("span",{staticClass:"line-number"},[s._v("9")]),t("br"),t("span",{staticClass:"line-number"},[s._v("10")]),t("br"),t("span",{staticClass:"line-number"},[s._v("11")]),t("br")])]),t("h3",{attrs:{id:"_3、在nacos中创建dataid为cloud-gateway-yaml的配置"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_3、在nacos中创建dataid为cloud-gateway-yaml的配置"}},[s._v("#")]),s._v(" 3、在Nacos中创建"),t("code",[s._v("dataId")]),s._v("为"),t("code",[s._v("cloud-gateway.yaml")]),s._v("的配置")]),s._v(" "),t("p",[t("img",{staticClass:"medium-zoom-image",attrs:{src:s.$withBase("/SpringCloud/gateway8.png"),alt:"gateway8"}})])])}),[],!1,null,null,null);a.default=e.exports}}]);