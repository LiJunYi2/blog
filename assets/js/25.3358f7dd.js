(window.webpackJsonp=window.webpackJsonp||[]).push([[25],{547:function(s,t,a){"use strict";a.r(t);var n=a(4),e=Object(n.a)({},(function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[a("h2",{attrs:{id:"stampedlock-读写锁简单介绍✨"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#stampedlock-读写锁简单介绍✨"}},[s._v("#")]),s._v(" StampedLock 读写锁简单介绍✨")]),s._v(" "),a("p",[a("strong",[s._v("ReadWriteLock")]),s._v(" （读写锁）可以解决多线程同时读，但只有一个线程能写的问题。")]),s._v(" "),a("p",[a("strong",[s._v("但是，它有个潜在的问题：如果有线程正在读，写线程需要等待读线程释放锁后才能获取写锁，即读的过程中不允许写，这是一种悲观的读锁。")])]),s._v(" "),a("p",[s._v("于是在Java8 中，新引入了一种读写锁叫做: "),a("strong",[s._v("StampedLock")]),s._v("🧨")]),s._v(" "),a("p",[a("strong",[s._v("StampedLock")]),s._v(" 和 "),a("strong",[s._v("ReadWriteLock")]),s._v("相比，改进之处在于：读的过程中也允许获取写锁后写入！这样一来，我们读的数据就可能不一致，所以，需要一点额外的代码来判断读的过程中是否有写入，这种读锁是一种乐观锁。")]),s._v(" "),a("p",[a("strong",[s._v("乐观锁的意思就是乐观地估计读的过程中大概率不会有写入，因此被称为乐观锁。")])]),s._v(" "),a("p",[a("strong",[s._v("悲观锁则是读的过程中拒绝有写入，也就是写入必须等待。")])]),s._v(" "),a("p",[s._v("显然乐观锁的并发效率更高，但一旦有小概率的写入导致读取的数据不一致，需要能检测出来，再读一遍就行。")]),s._v(" "),a("h2",{attrs:{id:"stampedlock-锁🎐"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#stampedlock-锁🎐"}},[s._v("#")]),s._v(" StampedLock 锁🎐")]),s._v(" "),a("div",{staticClass:"language-java line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-java"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("public")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("class")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("Point")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("private")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("final")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("StampedLock")]),s._v(" stampedLock "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("new")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("StampedLock")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("private")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("double")]),s._v(" x"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("private")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("double")]),s._v(" y"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("public")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("void")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("move")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("double")]),s._v(" deltaX"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("double")]),s._v(" deltaY"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("long")]),s._v(" stamp "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" stampedLock"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("writeLock")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 获取写锁")]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("try")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n            x "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("+=")]),s._v(" deltaX"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n            y "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("+=")]),s._v(" deltaY"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("finally")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n            stampedLock"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("unlockWrite")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("stamp"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 释放写锁")]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("public")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("double")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("distanceFromOrigin")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("long")]),s._v(" stamp "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" stampedLock"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("tryOptimisticRead")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 获得一个乐观读锁")]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 注意下面两行代码不是原子操作")]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 假设x,y = (100,200)")]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("double")]),s._v(" currentX "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" x"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 此处已读取到x=100，但x,y可能被写线程修改为(300,400)")]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("double")]),s._v(" currentY "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" y"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 此处已读取到y，如果没有写入，读取是正确的(100,200)")]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 如果有写入，读取是错误的(100,400)")]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("if")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("!")]),s._v("stampedLock"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("validate")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("stamp"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 检查乐观读锁后是否有其他写锁发生")]),s._v("\n            stamp "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" stampedLock"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("readLock")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 获取一个悲观读锁")]),s._v("\n            "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("try")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n                currentX "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" x"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n                currentY "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" y"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n            "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("finally")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n                stampedLock"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("unlockRead")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("stamp"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 释放悲观读锁")]),s._v("\n            "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("return")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("Math")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("sqrt")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("currentX "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("*")]),s._v(" currentX "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("+")]),s._v(" currentY "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("*")]),s._v(" currentY"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br"),a("span",{staticClass:"line-number"},[s._v("14")]),a("br"),a("span",{staticClass:"line-number"},[s._v("15")]),a("br"),a("span",{staticClass:"line-number"},[s._v("16")]),a("br"),a("span",{staticClass:"line-number"},[s._v("17")]),a("br"),a("span",{staticClass:"line-number"},[s._v("18")]),a("br"),a("span",{staticClass:"line-number"},[s._v("19")]),a("br"),a("span",{staticClass:"line-number"},[s._v("20")]),a("br"),a("span",{staticClass:"line-number"},[s._v("21")]),a("br"),a("span",{staticClass:"line-number"},[s._v("22")]),a("br"),a("span",{staticClass:"line-number"},[s._v("23")]),a("br"),a("span",{staticClass:"line-number"},[s._v("24")]),a("br"),a("span",{staticClass:"line-number"},[s._v("25")]),a("br"),a("span",{staticClass:"line-number"},[s._v("26")]),a("br"),a("span",{staticClass:"line-number"},[s._v("27")]),a("br"),a("span",{staticClass:"line-number"},[s._v("28")]),a("br"),a("span",{staticClass:"line-number"},[s._v("29")]),a("br"),a("span",{staticClass:"line-number"},[s._v("30")]),a("br"),a("span",{staticClass:"line-number"},[s._v("31")]),a("br"),a("span",{staticClass:"line-number"},[s._v("32")]),a("br"),a("span",{staticClass:"line-number"},[s._v("33")]),a("br"),a("span",{staticClass:"line-number"},[s._v("34")]),a("br"),a("span",{staticClass:"line-number"},[s._v("35")]),a("br"),a("span",{staticClass:"line-number"},[s._v("36")]),a("br"),a("span",{staticClass:"line-number"},[s._v("37")]),a("br")])]),a("p",[s._v("和"),a("strong",[s._v("ReadWriteLock")]),s._v("相比，写入的加锁是完全一样的，不同的是读取。")]),s._v(" "),a("p",[s._v("注意到首先我们通过  "),a("strong",[s._v("tryOptimisticRead")]),s._v("()  获取一个乐观读锁，并返回版本号。接着进行读取，读取完成后，我们通过  "),a("strong",[s._v("validate()")]),s._v("  去验证版本号；")]),s._v(" "),a("p",[s._v("如果在读取过程中没有写入，版本号不变，验证成功，我们就可以放心地继续后续操作。")]),s._v(" "),a("p",[s._v("如果在读取过程中有写入，版本号会发生变化，验证将失败。在失败的时候，我们再通过获取悲观读锁再次读取。由于写入的概率不高，程序在绝大部分情况下可以通过乐观读锁获取数据，极少数情况下使用悲观读锁获取数据。")]),s._v(" "),a("p",[s._v("可见，"),a("strong",[s._v("StampedLock")]),s._v("把读锁细分为乐观读和悲观读，能进一步提升并发效率。但这也是有代价的：一是代码更加复杂，二是"),a("strong",[s._v("StampedLock")]),s._v("是不可重入锁，不能在一个线程中反复获取同一个锁。")]),s._v(" "),a("p",[a("strong",[s._v("StampedLock")]),s._v("还提供了更复杂的将悲观读锁升级为写锁的功能，它主要使用在if-then-update的场景：即先读，如果读的数据满足条件，就返回，如果读的数据不满足条件，再尝试写。")]),s._v(" "),a("h2",{attrs:{id:"小结⭕"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#小结⭕"}},[s._v("#")]),s._v(" "),a("strong",[s._v("小结⭕")])]),s._v(" "),a("p",[a("strong",[s._v("StampedLock")]),s._v("提供了乐观读锁，可取代"),a("strong",[s._v("ReadWriteLock")]),s._v("以进一步提升并发性能；")]),s._v(" "),a("p",[a("strong",[s._v("StampedLock")]),s._v("是不可重入锁。")])])}),[],!1,null,null,null);t.default=e.exports}}]);