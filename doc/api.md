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
- param {function} [option.decode=(x, isKey)] 对参数进行解码的函数
- param {function} [option.filter=(v, k) => true] 对数据进行过滤
- param {function} [option.convert=(v, k)] 对数据进行转换
- param {function} [option.reduce=(prev, v, k)] 自定义数据处理流程
- return {object} 键值对象

举个例子

```js
parse('a=1&b=2') // { a: '1', b: '2' }
```

filter默认不过滤任何数据，但有时候想把空数据过滤的话，会非常有用

```js
parse('a=&b') // { a: '', b: undefined }
parse('a=&b', {filter: v => v !== '' && v !== undefined }) // {}
```

convert用来对数据转换

```js
// 将 '1' 转换为 1
parse('a=1&b=2') // { a: '1', b: '2' }
parse('a=1&b=2', {convert: v => isNaN(+v) ? v : +v }) // { a: 1, b: 2 }

// 将 'null' 转换为 null
parse('a=null') // { a: 'null' }
parse('a=null', {convert: v => v === 'null' ? null : v }) // { a: null }

// 将复杂数据json化
parse('a="{"b":1}"') // { a: '"{"a":1}"' }
parse('a="{"b":1}"', {convert: v => JSON.parse(v) }) // { a: { 'b': 1 } }
```

如果传入了reduce，可以自定义数据处理流程，比如支持数组参数

注意：reduce内的数据将不再执行`option.convert`转换

```js
parse('a=1&a=2&a=3&b=1') // { a: '3', b: '1' }
parse('a=1&a=2&a=3', {
    reduce: (prev, v, k) => {
        prev[k] = k in prev ？[].concat(prev[k], v) : v;

        return prev;
    }
}) // { a: ['1', '2', '3'], b: '1' }
```

## stringify
将数据序列化为url参数，接受对象，返回字符串

函数参数和返回值

- param {object} obj 待序列化的数据
- param {object} [option] 可选参数
- param {string} [option.sep='&'] 参数分隔符
- param {string} [option.eq='='] 参数赋值符
- param {boolean} [option.addQueryPrefix=false] 是否在前面添加?
- param {function} [option.encode=(x, isKey)] 对参数进行编码的函数
- param {function} [option.filter=(v, k) => true] 对数据进行过滤
- param {function} [option.convert=(v, k) => /*undefined null -> ''*/] 对数据进行转换
- param {function} [option.reduce=(prev, v, k)] 自定义数据处理流程
- return {string} 序列化字符串

举个例子（要包含代码用例）

```js
stringify({ a: 1, b: 2 }) // 'a=1&b=2'
```

filter默认不过滤任何数据，但有时候想把空字符串过滤的话，会非常有用

```js
stringify({ a: null}) // 'a='
stringify({ a: null}, {filter: v => v !== null }) // ''
```

convert用来对数据转换，默认行为是将undefined和null转换为空字符

```js
// 自定义null转换
stringify({ a: null}) // 'a='
stringify({ a: null}, {convert: v => v }) // 'a=null'

// 将复杂数据json化
stringify({ a: { b: 1 } }) // 'a=[object Object]'
stringify({ a: { b: 1 } }, {convert: v => JSON.stringify(v) }) // 'a="{"b":1}"'
```

如果传入了reduce，可以自定义数据处理流程，比如支持数组参数

注意：reduce内的数据将不再执行`option.convert`转换

```js
parse({ a: ['1', '2', '3'], b: '1' }) // 'a=3&b=1'
parse({ a: ['1', '2', '3'], b: '1' }, {
    reduce: (prev, v, k) => {
        if (Array.isArray(v)) {
            prev.concat(v.map(item => ({ k, v: item })))
        } else {
            prev.push({ k, v });
        }

        return prev;
    }
}) // 'a=1&a=2&a=3&b=1'
```
