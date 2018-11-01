# 文档
url参数处理库

## parse
解析url参数，接受字符串，返回参数map

函数参数和返回值

- param {string} str 要解析的参数
- param {object} [option] 可选参数
- param {string} [option.sep='&'] 参数分隔符
- param {string} [option.eq='='] 参数赋值符
- param {boolean} [option.ignoreQueryPrefix=false] 忽略参数中的`?`
- param {function} [option.decode=decodeURIComponent] 对参数进行解码的函数
- return {object} 键值对象

举个例子

```js
parse('a=1&b=2') // { a: 1, b: 2 }
```

## stringify
将数据序列化为url参数，接受对象，返回字符串

函数参数和返回值

- param {object} obj 待序列化的数据
- param {object} [option] 可选参数
- param {string} [option.sep='&'] 参数分隔符
- param {string} [option.eq='='] 参数赋值符
- param {function} [option.encode=encodeURIComponent] 对参数进行编码的函数
- return {string} 序列化字符串

举个例子（要包含代码用例）

```js
stringify({ a: 1, b: 2 }) // 'a=1&b=2'
```
