(window.webpackJsonp=window.webpackJsonp||[]).push([[21],{544:function(s,a,n){"use strict";n.r(a);var t=n(4),e=Object(t.a)({},(function(){var s=this,a=s.$createElement,n=s._self._c||a;return n("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[n("h2",{attrs:{id:"建造者模式定义与特点✨"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#建造者模式定义与特点✨"}},[s._v("#")]),s._v(" 建造者模式定义与特点✨")]),s._v(" "),n("p",[s._v("​\t\t建造者（Builder）模式的定义：指将一个复杂对象的构造与它的表示分离，使同样的构建过程可以创建不同的表示，这样的设计模式被称为建造者模式。它是将一个复杂的对象分解为多个简单的对象，然后一步一步构建而成。它将变与不变相分离，即产品的组成部分是不变的，但每一部分是可以灵活选择的。")]),s._v(" "),n("h2",{attrs:{id:"建造者模式的优点🧨"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#建造者模式的优点🧨"}},[s._v("#")]),s._v(" 建造者模式的优点🧨")]),s._v(" "),n("ol",[n("li",[s._v("​\t封装性好，构建和表示分离。")]),s._v(" "),n("li",[s._v("扩展性好，各个具体的建造者相互独立，有利于系统的解耦。")]),s._v(" "),n("li",[s._v("客户端不必知道产品内部组成的细节，建造者可以对创建过程逐步细化，而不对其它模块产生任何影响，便于控制细节风险。")])]),s._v(" "),n("h2",{attrs:{id:"建造者模式的缺点🎋"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#建造者模式的缺点🎋"}},[s._v("#")]),s._v(" 建造者模式的缺点🎋")]),s._v(" "),n("ol",[n("li",[s._v("产品的组成部分必须相同，这限制了其使用范围。")]),s._v(" "),n("li",[s._v("如果产品的内部变化复杂，如果产品内部发生变化，则建造者也要同步修改，后期维护成本较大。")])]),s._v(" "),n("p",[n("strong",[s._v("建造者（Builder）模式和工厂模式的关注点不同：建造者模式注重零部件的组装过程，而工厂方法模式更注重零部件的创建过程，但两者可以结合使用。")])]),s._v(" "),n("h2",{attrs:{id:"模式的结构与实现🎋"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#模式的结构与实现🎋"}},[s._v("#")]),s._v(" 模式的结构与实现🎋")]),s._v(" "),n("p",[n("strong",[s._v("建造者（Builder）模式由产品、抽象建造者、具体建造者、指挥者等 4 个要素构成")]),s._v(" "),n("strong",[s._v("建造者（Builder）模式的主要角色如下。")])]),s._v(" "),n("ol",[n("li",[s._v("产品角色（Product）：它是包含多个组成部件的复杂对象，由具体建造者来创建其各个零部件。")]),s._v(" "),n("li",[s._v("抽象建造者（Builder）：它是一个包含创建产品各个子部件的抽象方法的接口，通常还包含一个返回复杂产品的方法 getResult()。")]),s._v(" "),n("li",[s._v("具体建造者(Concrete Builder）：实现 Builder 接口，完成复杂产品的各个部件的具体创建方法。")]),s._v(" "),n("li",[s._v("指挥者（Director）：它调用建造者对象中的部件构造与装配方法完成复杂对象的创建，在指挥者中不涉及具体产品的信息。")])]),s._v(" "),n("h2",{attrs:{id:"代码实现🎟"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#代码实现🎟"}},[s._v("#")]),s._v(" "),n("strong",[s._v("代码实现🎟")])]),s._v(" "),n("h3",{attrs:{id:"_1、产品角色"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#_1、产品角色"}},[s._v("#")]),s._v(" 1、产品角色")]),s._v(" "),n("div",{staticClass:"language-java line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-java"}},[n("code",[n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("/**\n * @version 1.0.0\n * @className: Computer\n * @description: 产品\n * @author: LiJunYi\n * @create: 2021/5/28 8:59\n */")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[s._v("@Data")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("public")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("class")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("Computer")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("/**\n     * cpu\n     */")]),s._v("\n    "),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("private")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("String")]),s._v(" cpu"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n\n    "),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("/**\n     * 主板\n     */")]),s._v("\n    "),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("private")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("String")]),s._v(" mainBoard"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br"),n("span",{staticClass:"line-number"},[s._v("7")]),n("br"),n("span",{staticClass:"line-number"},[s._v("8")]),n("br"),n("span",{staticClass:"line-number"},[s._v("9")]),n("br"),n("span",{staticClass:"line-number"},[s._v("10")]),n("br"),n("span",{staticClass:"line-number"},[s._v("11")]),n("br"),n("span",{staticClass:"line-number"},[s._v("12")]),n("br"),n("span",{staticClass:"line-number"},[s._v("13")]),n("br"),n("span",{staticClass:"line-number"},[s._v("14")]),n("br"),n("span",{staticClass:"line-number"},[s._v("15")]),n("br"),n("span",{staticClass:"line-number"},[s._v("16")]),n("br"),n("span",{staticClass:"line-number"},[s._v("17")]),n("br"),n("span",{staticClass:"line-number"},[s._v("18")]),n("br"),n("span",{staticClass:"line-number"},[s._v("19")]),n("br"),n("span",{staticClass:"line-number"},[s._v("20")]),n("br"),n("span",{staticClass:"line-number"},[s._v("21")]),n("br")])]),n("h3",{attrs:{id:"_2、抽象建造者"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#_2、抽象建造者"}},[s._v("#")]),s._v(" 2、抽象建造者")]),s._v(" "),n("div",{staticClass:"language-java line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-java"}},[n("code",[n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("/**\n * @version 1.0.0\n * @className: Builder\n * @description: 抽象建造者\n * @author: LiJunYi\n * @create: 2021/5/28 9:01\n */")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("public")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("abstract")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("class")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("Builder")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("/**\n     * 构建cpu\n     *\n     * @param cpu cpu\n     */")]),s._v("\n    "),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("abstract")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("void")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[s._v("buildCpu")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),n("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("String")]),s._v(" cpu"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n\n    "),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("/**\n     * 构建主板\n     *\n     * @param mainBoard 主板\n     */")]),s._v("\n    "),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("abstract")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("void")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[s._v("buildMainBoard")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),n("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("String")]),s._v(" mainBoard"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n\n\n    "),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("/**\n     * 创建产品对象\n     */")]),s._v("\n    "),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("protected")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("Computer")]),s._v(" computer "),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("new")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("Computer")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n\n    "),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("/**\n     * 返回产品对象\n     *\n     * @return {@link Computer}\n     */")]),s._v("\n    "),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("public")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("Computer")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[s._v("getResult")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n    "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n        "),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("return")]),s._v(" computer"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n    "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br"),n("span",{staticClass:"line-number"},[s._v("7")]),n("br"),n("span",{staticClass:"line-number"},[s._v("8")]),n("br"),n("span",{staticClass:"line-number"},[s._v("9")]),n("br"),n("span",{staticClass:"line-number"},[s._v("10")]),n("br"),n("span",{staticClass:"line-number"},[s._v("11")]),n("br"),n("span",{staticClass:"line-number"},[s._v("12")]),n("br"),n("span",{staticClass:"line-number"},[s._v("13")]),n("br"),n("span",{staticClass:"line-number"},[s._v("14")]),n("br"),n("span",{staticClass:"line-number"},[s._v("15")]),n("br"),n("span",{staticClass:"line-number"},[s._v("16")]),n("br"),n("span",{staticClass:"line-number"},[s._v("17")]),n("br"),n("span",{staticClass:"line-number"},[s._v("18")]),n("br"),n("span",{staticClass:"line-number"},[s._v("19")]),n("br"),n("span",{staticClass:"line-number"},[s._v("20")]),n("br"),n("span",{staticClass:"line-number"},[s._v("21")]),n("br"),n("span",{staticClass:"line-number"},[s._v("22")]),n("br"),n("span",{staticClass:"line-number"},[s._v("23")]),n("br"),n("span",{staticClass:"line-number"},[s._v("24")]),n("br"),n("span",{staticClass:"line-number"},[s._v("25")]),n("br"),n("span",{staticClass:"line-number"},[s._v("26")]),n("br"),n("span",{staticClass:"line-number"},[s._v("27")]),n("br"),n("span",{staticClass:"line-number"},[s._v("28")]),n("br"),n("span",{staticClass:"line-number"},[s._v("29")]),n("br"),n("span",{staticClass:"line-number"},[s._v("30")]),n("br"),n("span",{staticClass:"line-number"},[s._v("31")]),n("br"),n("span",{staticClass:"line-number"},[s._v("32")]),n("br"),n("span",{staticClass:"line-number"},[s._v("33")]),n("br"),n("span",{staticClass:"line-number"},[s._v("34")]),n("br"),n("span",{staticClass:"line-number"},[s._v("35")]),n("br"),n("span",{staticClass:"line-number"},[s._v("36")]),n("br"),n("span",{staticClass:"line-number"},[s._v("37")]),n("br"),n("span",{staticClass:"line-number"},[s._v("38")]),n("br"),n("span",{staticClass:"line-number"},[s._v("39")]),n("br"),n("span",{staticClass:"line-number"},[s._v("40")]),n("br")])]),n("h3",{attrs:{id:"_3、具体建造者"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#_3、具体建造者"}},[s._v("#")]),s._v(" 3、具体建造者")]),s._v(" "),n("div",{staticClass:"language-java line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-java"}},[n("code",[n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("/**\n * @version 1.0.0\n * @className: XiaoMiBuilder\n * @description: 具体建造者\n * @author: LiJunYi\n * @create: 2021/5/28 9:01\n */")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("public")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("class")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("XiaoMiBuilder")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("extends")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("Builder")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n\n    "),n("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[s._v("@Override")]),s._v("\n    "),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("void")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[s._v("buildCpu")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),n("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("String")]),s._v(" cpu"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n    "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n        computer"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[s._v("setCpu")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("cpu"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n    "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n\n    "),n("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[s._v("@Override")]),s._v("\n    "),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("void")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[s._v("buildMainBoard")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),n("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("String")]),s._v(" mainBoard"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n    "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n        computer"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[s._v("setMainBoard")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("mainBoard"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n    "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br"),n("span",{staticClass:"line-number"},[s._v("7")]),n("br"),n("span",{staticClass:"line-number"},[s._v("8")]),n("br"),n("span",{staticClass:"line-number"},[s._v("9")]),n("br"),n("span",{staticClass:"line-number"},[s._v("10")]),n("br"),n("span",{staticClass:"line-number"},[s._v("11")]),n("br"),n("span",{staticClass:"line-number"},[s._v("12")]),n("br"),n("span",{staticClass:"line-number"},[s._v("13")]),n("br"),n("span",{staticClass:"line-number"},[s._v("14")]),n("br"),n("span",{staticClass:"line-number"},[s._v("15")]),n("br"),n("span",{staticClass:"line-number"},[s._v("16")]),n("br"),n("span",{staticClass:"line-number"},[s._v("17")]),n("br"),n("span",{staticClass:"line-number"},[s._v("18")]),n("br"),n("span",{staticClass:"line-number"},[s._v("19")]),n("br"),n("span",{staticClass:"line-number"},[s._v("20")]),n("br"),n("span",{staticClass:"line-number"},[s._v("21")]),n("br"),n("span",{staticClass:"line-number"},[s._v("22")]),n("br"),n("span",{staticClass:"line-number"},[s._v("23")]),n("br")])]),n("h2",{attrs:{id:"_4、指挥者"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#_4、指挥者"}},[s._v("#")]),s._v(" 4、指挥者")]),s._v(" "),n("div",{staticClass:"language-java line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-java"}},[n("code",[n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("/**\n * @version 1.0.0\n * @className: Director\n * @description: 指挥者：调用建造者中的方法完成复杂对象的创建。\n * @author: LiJunYi\n * @create: 2021/5/28 9:03\n */")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("public")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("class")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("Director")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("private")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("Builder")]),s._v(" builder"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n\n    "),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("public")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("Director")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),n("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("Builder")]),s._v(" builder"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n    "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n        "),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("this")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("builder "),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" builder"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n    "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n\n    "),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("/**\n     * 构建电脑\n     *\n     * @return {@link Computer}\n     */")]),s._v("\n    "),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("public")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("Computer")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[s._v("computer")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),n("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("String")]),s._v(" cpu"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),n("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("String")]),s._v(" mainBoard"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n    "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n        builder"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[s._v("buildCpu")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("cpu"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n        builder"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[s._v("buildMainBoard")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("mainBoard"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n        "),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("return")]),s._v(" builder"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[s._v("getResult")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n    "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br"),n("span",{staticClass:"line-number"},[s._v("7")]),n("br"),n("span",{staticClass:"line-number"},[s._v("8")]),n("br"),n("span",{staticClass:"line-number"},[s._v("9")]),n("br"),n("span",{staticClass:"line-number"},[s._v("10")]),n("br"),n("span",{staticClass:"line-number"},[s._v("11")]),n("br"),n("span",{staticClass:"line-number"},[s._v("12")]),n("br"),n("span",{staticClass:"line-number"},[s._v("13")]),n("br"),n("span",{staticClass:"line-number"},[s._v("14")]),n("br"),n("span",{staticClass:"line-number"},[s._v("15")]),n("br"),n("span",{staticClass:"line-number"},[s._v("16")]),n("br"),n("span",{staticClass:"line-number"},[s._v("17")]),n("br"),n("span",{staticClass:"line-number"},[s._v("18")]),n("br"),n("span",{staticClass:"line-number"},[s._v("19")]),n("br"),n("span",{staticClass:"line-number"},[s._v("20")]),n("br"),n("span",{staticClass:"line-number"},[s._v("21")]),n("br"),n("span",{staticClass:"line-number"},[s._v("22")]),n("br"),n("span",{staticClass:"line-number"},[s._v("23")]),n("br"),n("span",{staticClass:"line-number"},[s._v("24")]),n("br"),n("span",{staticClass:"line-number"},[s._v("25")]),n("br"),n("span",{staticClass:"line-number"},[s._v("26")]),n("br"),n("span",{staticClass:"line-number"},[s._v("27")]),n("br"),n("span",{staticClass:"line-number"},[s._v("28")]),n("br"),n("span",{staticClass:"line-number"},[s._v("29")]),n("br")])]),n("h2",{attrs:{id:"_5、测试类"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#_5、测试类"}},[s._v("#")]),s._v(" 5、测试类")]),s._v(" "),n("div",{staticClass:"language-java line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-java"}},[n("code",[n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("/**\n * @version 1.0.0\n * @className: Client\n * @description:\n * @author: LiJunYi\n * @create: 2021/5/28 9:06\n */")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("public")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("class")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("Client")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("public")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("static")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("void")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[s._v("main")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),n("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("String")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v(" args"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n    "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n        "),n("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("Builder")]),s._v(" builder "),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("new")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("XiaoMiBuilder")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n        "),n("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("Director")]),s._v(" director "),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("new")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("Director")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("builder"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n        "),n("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("Computer")]),s._v(" computer "),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" director"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[s._v("computer")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),n("span",{pre:!0,attrs:{class:"token string"}},[s._v('"Inter"')]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),n("span",{pre:!0,attrs:{class:"token string"}},[s._v('"华为"')]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n        "),n("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("System")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("out"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[s._v("println")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("computer"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n    "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br"),n("span",{staticClass:"line-number"},[s._v("7")]),n("br"),n("span",{staticClass:"line-number"},[s._v("8")]),n("br"),n("span",{staticClass:"line-number"},[s._v("9")]),n("br"),n("span",{staticClass:"line-number"},[s._v("10")]),n("br"),n("span",{staticClass:"line-number"},[s._v("11")]),n("br"),n("span",{staticClass:"line-number"},[s._v("12")]),n("br"),n("span",{staticClass:"line-number"},[s._v("13")]),n("br"),n("span",{staticClass:"line-number"},[s._v("14")]),n("br"),n("span",{staticClass:"line-number"},[s._v("15")]),n("br"),n("span",{staticClass:"line-number"},[s._v("16")]),n("br"),n("span",{staticClass:"line-number"},[s._v("17")]),n("br")])])])}),[],!1,null,null,null);a.default=e.exports}}]);