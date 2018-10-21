var pkg = require('../package.json');

// 兼容 querystring 和 @jsmini/querystring，@jsmini/querystring 替换为 jsmini_querystring
var name = pkg.name.replace('@', '').replace(/\//g, '_');
var version = pkg.version;

var banner = 
`/*!
 * querystring ${version} (https://github.com/jsmini/querystring)
 * API https://github.com/jsmini/querystring/blob/master/doc/api.md
 * Copyright 2017-${(new Date).getFullYear()} jsmini. All Rights Reserved
 * Licensed under MIT (https://github.com/jsmini/querystring/blob/master/LICENSE)
 */
`;

exports.name = name;
exports.banner = banner;
