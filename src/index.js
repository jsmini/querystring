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
        filter: (v, k) => true,
        convert: (v, k) => v,
        reduce: false, // (prev, v, k) => prev
    }, option);

    // 处理?，?a=b
    if (!opt.ignoreQueryPrefix) {
        const arr = str.split('?');
        str = arr.length === 2 ? arr[1] : arr[0];
    }

    let res = {};

    const arr = str.split(opt.sep);

    const isDecode = type(opt.decode) === 'function';

    for (let i = 0; i < arr.length; i++) {
        const arr2 = arr[i].split(opt.eq);
        const k = isDecode ? opt.decode(arr2[0]) : arr2[0];
        const v = isDecode ? opt.decode(arr2[1]) : arr2[1];

        if (opt.filter(v, k)) {
            if (type(opt.reduce) === 'function') {
                res = opt.reduce(res, v, k);
            } else {
                res[k] = opt.convert(v, k);
            }
        }
    }

    return res;
}

function hasOwnProp(obj, prop) {
    return Object.prototype.hasOwnProperty.call(obj, prop);
}

export function stringify(obj, option = {}) {
    if (type(obj) !== 'object') {
        throw new TypeError('stringify: first param must is object');
    }

    const opt = extend({
        sep: '&',
        eq: '=',
        encode: encodeURIComponent,
        filter: (v, k) => true,
        // undefined or null > ''
        convert: (v, k) => typeof v === 'undefined' || v === null ? '' : v,
        reduce: false, // (prev, v, k) => prev
    }, option);

    let res = [];

    const isEncode = type(opt.encode) === 'function';

    for (let key in obj) {
        if (hasOwnProp(obj, key) && opt.filter(obj[key], key)) {
            if (type(opt.reduce) === 'function') {
                res = opt.reduce(res, obj[key], key);
            } else {                
                res.push({ k: key, v: String(opt.convert(obj[key], key)) });
            }
        }
    }

    let str = '';
    for (let i = 0; i < res.length; i++) {
        const k = isEncode ? opt.encode(res[i].k) : res[i].k;
        const v = isEncode ? opt.encode(res[i].v) : res[i].v;
        str = str + (str === '' ? '' : opt.sep) + k + opt.eq + v;
    }
    return str;
}
