(window.webpackJsonp=window.webpackJsonp||[]).push([[30],{568:function(s,a,t){"use strict";t.r(a);var n=t(4),e=Object(n.a)({},(function(){var s=this,a=s.$createElement,t=s._self._c||a;return t("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[t("h2",{attrs:{id:"概述✨"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#概述✨"}},[s._v("#")]),s._v(" 概述✨")]),s._v(" "),t("p",[t("strong",[s._v("MyBatis的底层操作封装了JDBC的API，MyBatis的工作原理以及核心流程与JDBC的使用步骤一脉相承，MyBatis的核心对象（SqlSession，Executor）与JDBC的核心对象(Connection，Statement）相互对应。从JDBC入手并立足于JDBC，才能深入的理解MyBatis的工作原理以及核心流程。")])]),s._v(" "),t("h2",{attrs:{id:"核心对象✔"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#核心对象✔"}},[s._v("#")]),s._v(" 核心对象✔")]),s._v(" "),t("h3",{attrs:{id:"jdbc有四个核心对象👀"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#jdbc有四个核心对象👀"}},[s._v("#")]),s._v(" JDBC有四个核心对象👀")]),s._v(" "),t("div",{staticClass:"language-markdown line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-markdown"}},[t("code",[s._v("（1）DriverManager，用于注册数据库连接\n（2）Connection，与数据库连接对象\n（3）Statement/PrepareStatement，操作数据库SQL语句的对象\n（4）ResultSet，结果集或一张虚拟表\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br")])]),t("h3",{attrs:{id:"mybatis也有四大核心对象👀"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#mybatis也有四大核心对象👀"}},[s._v("#")]),s._v(" MyBatis也有四大核心对象👀")]),s._v(" "),t("div",{staticClass:"language-markdown line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-markdown"}},[t("code",[s._v("（1）SqlSession对象，该对象中包含了执行SQL语句的所有方法【1】。类似于JDBC里面的Connection 【2】。\n（2）Executor接口，它将根据SqlSession传递的参数动态地生成需要执行的SQL语句，同时负责查询缓存的维护。类似于JDBC里面的Statement/PrepareStatement。\n（3）MappedStatement对象，该对象是对映射SQL的封装，用于存储要映射的SQL语句的id、参数等信息。\n（4）ResultHandler对象，用于对返回的结果进行处理，最终得到自己想要的数据格式或类型。可以自定义返回类型。\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br")])]),t("div",{staticClass:"custom-block tip"},[t("p",{staticClass:"title"},[s._v("备注【1】和备注【1】的说明如下")]),t("div",{staticClass:"language-markdown line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-markdown"}},[t("code",[s._v("在JDBC中，Connection不直接执行SQL方法，而是利用Statement或者PrepareStatement来执行方法。\n\n在使用JDBC建立了连接之后，可以使用 Connection接口的 createStatement() 方法来获取 Statement 对象，也可以调用\n\nprepareStatement() 方法获得 PrepareStatement 对象，通过 executeUpdate() 方法来执行SQL语句。\n\n而在 MyBatis 中，SqlSession对象包含了执行SQL语句的所有方法。但是它是委托 Executor 执行的。 \n从某种意义上来看，MyBatis里面的 SqlSession 类似于JDBC中的 Connection，他们都是委托给其他类去执行。 \n\n最后说一点，虽然SqlSession对象包含了执行SQL语句的所有方法，但是它同样包括了：\n"),t("span",{pre:!0,attrs:{class:"token tag"}},[t("span",{pre:!0,attrs:{class:"token tag"}},[t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("<")]),s._v("T")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(">")])]),s._v(" getMapper(Class"),t("span",{pre:!0,attrs:{class:"token tag"}},[t("span",{pre:!0,attrs:{class:"token tag"}},[t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("<")]),s._v("T")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(">")])]),s._v(" type);\n\n所以SqlSession也可以委托给映射器来执行数据的增删改查操作。如下代码所示：\n获得mapper接口的代理对象:PersonMapper pm = session.getMapper(PersonMapper.class);\n直接调用接口的方法，查询id为1的Peson数据:Person p2 = pm.selectPersonById(1)\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br"),t("span",{staticClass:"line-number"},[s._v("9")]),t("br"),t("span",{staticClass:"line-number"},[s._v("10")]),t("br"),t("span",{staticClass:"line-number"},[s._v("11")]),t("br"),t("span",{staticClass:"line-number"},[s._v("12")]),t("br"),t("span",{staticClass:"line-number"},[s._v("13")]),t("br"),t("span",{staticClass:"line-number"},[s._v("14")]),t("br"),t("span",{staticClass:"line-number"},[s._v("15")]),t("br")])])]),t("h2",{attrs:{id:"mybatis的工作原理以及核心流程详解"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#mybatis的工作原理以及核心流程详解"}},[s._v("#")]),s._v(" MyBatis的工作原理以及核心流程详解")]),s._v(" "),t("h3",{attrs:{id:"mybatis的工作原理如下图所示💦"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#mybatis的工作原理如下图所示💦"}},[s._v("#")]),s._v(" MyBatis的工作原理如下图所示💦")]),s._v(" "),t("p",[t("img",{staticClass:"medium-zoom-image",attrs:{src:s.$withBase("/mybatis/mybatis082201_1.png"),alt:"mybatis082201_1"}})]),s._v(" "),t("h2",{attrs:{id:"详细说明⏬"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#详细说明⏬"}},[s._v("#")]),s._v(" 详细说明⏬")]),s._v(" "),t("div",{staticClass:"language-markdown line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-markdown"}},[t("code",[s._v("（1）读取MyBatis的配置文件。mybatis-config.xml为MyBatis的全局配置文件，用于配置数据库连接信息。\n\n（2）加载映射文件。映射文件即SQL映射文件，该文件中配置了操作数据库的SQL语句，需要在MyBatis配置文件mybatis-config.xml中加载。mybatis-config.xml 文件可以加载多个映射文件，每个文件对应数据库中的一张表。\n\n（3）构造会话工厂。通过MyBatis的环境配置信息构建会话工厂SqlSessionFactory。\n\n（4）创建会话对象。由会话工厂创建SqlSession对象，该对象中包含了执行SQL语句的所有方法。\n\n（5）Executor执行器。MyBatis底层定义了一个Executor接口来操作数据库，它将根据SqlSession传递的参数动态地生成需要执行的SQL语句，同时负责查询缓存的维护。\n\n（6）MappedStatement对象。在Executor接口的执行方法中有一个MappedStatement类型的参数，该参数是对映射信息的封装，用于存储要映射的SQL语句的id、参数等信息。\n\n（7）输入参数映射。输入参数类型可以是Map、List等集合类型，也可以是基本数据类型和POJO类型。输入参数映射过程类似于JDBC对preparedStatement对象设置参数的过程。\n\n（8）输出结果映射。输出结果类型可以是Map、List等集合类型，也可以是基本数据类型和POJO类型。输出结果映射过程类似于JDBC对结果集的解析过程。\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br"),t("span",{staticClass:"line-number"},[s._v("9")]),t("br"),t("span",{staticClass:"line-number"},[s._v("10")]),t("br"),t("span",{staticClass:"line-number"},[s._v("11")]),t("br"),t("span",{staticClass:"line-number"},[s._v("12")]),t("br"),t("span",{staticClass:"line-number"},[s._v("13")]),t("br"),t("span",{staticClass:"line-number"},[s._v("14")]),t("br"),t("span",{staticClass:"line-number"},[s._v("15")]),t("br")])]),t("h2",{attrs:{id:"总结✅"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#总结✅"}},[s._v("#")]),s._v(" 总结✅")]),s._v(" "),t("blockquote",[t("p",[t("strong",[s._v("mybatis应用程序通过SqlSessionFactoryBuilder从mybatis-config.xml配置文件中构建出SqlSessionFactory，然后，SqlSessionFactory的实例直接开启一个SqlSession，再通过SqlSession实例获得Mapper对象并运行Mapper映射的SQL语句，完成对数据库的CRUD和事务提交，之后关闭SqlSession。")])])]),s._v(" "),t("h2",{attrs:{id:"图示💨"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#图示💨"}},[s._v("#")]),s._v(" 图示💨")]),s._v(" "),t("p",[t("img",{staticClass:"medium-zoom-image",attrs:{src:s.$withBase("/mybatis/mybatis082201_2.png"),alt:"mybatis082201_2"}})])])}),[],!1,null,null,null);a.default=e.exports}}]);