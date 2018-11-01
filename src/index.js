import { type } from '@jsmini/type';
import { extend } from '@jsmini/extend';


export function parse(str, option = {}) {
    if (type(str) !== 'string') {
        throw new TypeError('parse: first param must is string');
    }

    const opt = extend({
        sep: '&',
        eq: '=',
        ignoreQueryPrefix: false,
        decode: decodeURIComponent,
    }, option);

    // 处理?，?a=b
    if (!opt.ignoreQueryPrefix) {
        const arr = str.split('?');
        str = arr.length === 2 ? arr[1] : arr[0];
    }

    const res = {};

    const arr = str.split(opt.sep);

    const isDecode = type(opt.decode) === 'function';

    for (let i = 0; i < arr.length; i++) {
        const arr2 = arr[i].split(opt.eq);

        const k = isDecode ? opt.decode(arr2[0]) : arr2[0];
        const v = isDecode ? opt.decode(arr2[1]) : arr2[1];

        res[k] = v;
    }

    return res;
}

function toString(x) {
    return Object.prototype.toString.call(x);

}
function hasOwnProp(obj, prop) {
    return Object.prototype.hasOwnProperty.call(obj, prop);
}

function isPrimitive(x) {
    const t = type(x);
    return (
        t === 'undefined' ||
        t === 'null' ||
        t === 'number' ||
        t === 'string' ||
        t === 'boolean' ||
        t === 'symbol'
    );
}

export function stringify(obj, option = {}) {
    if (type(obj) !== 'object') {
        throw new TypeError('stringify: first param must is object');
    }

    const opt = extend({
        sep: '&',
        eq: '=',
        encode: encodeURIComponent,
    }, option);

    let res = '';

    const isEncode = type(opt.encode) === 'function';

    for (let key in obj) {
        if (hasOwnProp(obj, key)) {
            const str = isPrimitive(obj[key]) ? String(obj[key]) : toString(obj[key]);
            
            const k = isEncode ? opt.encode(key) : key;
            const v = isEncode ? opt.encode(str) : str;

            res = res + (res === '' ? '' : opt.sep) + k + opt.eq + v;
        }
    }

    return res;
}
