var expect = require('expect.js');

var parse = require('../dist/index.js').parse;
var stringify = require('../dist/index.js').stringify;

describe('单元测试', function() {
    this.timeout(1000);

    describe('parse', function() {
        it('param check', function() {
            expect(function () { parse({}) }).to.throwException('parse: first param must is string');
        })

        it('基本测试', function() {
            var a = parse('a=1');
            expect(a).to.eql({ a: '1'});

            var a = parse('a=1&b=2&c=3&d=4');
            expect(a).to.eql({ a: '1', b: '2', c: '3', d: '4'});
        });

        it('option', function() {
            var a = parse('a:1+b:2+c:3', {sep: '+', eq: ':'});
            expect(a).to.eql({ a: '1', b: '2', c: '3'});
        });

        it('option.ignoreQueryPrefix', function() {
            var a = parse('?a=1', { ignoreQueryPrefix: false });
            expect(a).to.eql({ a: '1'});

            var a = parse('?a=1', { ignoreQueryPrefix: true });
            expect(a).to.eql({ '?a': '1'});
        });

        it('option.decode', function() {
            var a = parse('a=%3D')
            expect(a).to.eql({ a: '=' });

            var a = parse('a=%3D', { decode: function (x) {return x} })
            expect(a).to.eql({ a: '%3D'});

            var a = parse('a=%3D', { decode: function (x, isKey) {return isKey ? 1 : 2} })
            expect(a).to.eql({ 1: 2 });
        })

        it('option.filter', function() {
            var a = parse('a=null')
            expect(a).to.eql({ a: 'null'});

            var a = parse('a=null', { filter: function (x) {return x !== 'null'} })
            expect(a).to.eql({ });
        })

        it('option.convert', function() {
            var a = parse('a=1&b=2')
            expect(a).to.eql({ a: 1, b: 2 });

            var a = parse('a=1&b=2', { convert: function (x) {return +x + 1} })
            expect(a).to.eql({ a: 2, b: 3 });
        })

        it('option.reduce', function() {
            var a = parse('a=1&a=2')
            expect(a).to.eql({ a: 2 });

            var a = parse('a=1&a=2', { reduce: function (prev, v, k) {
                prev[k] = k in prev ? [].concat(prev[k], v) : v;
                return prev;
            } })
            expect(a).to.eql({ a: [1, 2] });
        })
    });

    describe('stringify', function() {
        it('param check', function() {
            expect(function () { stringify('') }).to.throwException('stringify: first param must is object');
        })

        it('基本测试', function() {
            var a = stringify({ a: '1'});
            expect(a).to.eql('a=1');

            var a = stringify({ a: '1', b: '2', c: '3', d: '4'});
            expect(a).to.eql('a=1&b=2&c=3&d=4');
        });

        it('addQueryPrefix', function() {
            var a = stringify({ a: '1'});
            expect(a).to.eql('a=1');

            var a = stringify({ a: '1'}, { addQueryPrefix: true });
            expect(a).to.eql('?a=1');
        });

        it('option', function() {
            var a = stringify({ a: '1', b: '2', c: '3'}, {sep: '+', eq: ':'});
            expect(a).to.eql('a:1+b:2+c:3');
        });

        it('option.encode', function() {
            var a = stringify({ a: '='})
            expect(a).to.eql('a=%3D');

            var a = stringify({ a: '='}, { encode: function (x) {return x} })
            expect(a).to.eql('a==');

            var a = stringify({ a: '='}, { encode: function (x, isKey) {return isKey ? 1 : 2} })
            expect(a).to.eql('1=2');
        })

        it('option.filter', function() {
            var a = stringify({ a: null})
            expect(a).to.eql('a=');

            var a = stringify({ a: null}, { filter: function (x) {return x !== null} })
            expect(a).to.eql('');
        })

        it('option.convert', function() {
            var a = stringify({ a: null})
            expect(a).to.eql('a=');

            var a = stringify({ a: null}, { convert: function (x) {return x} })
            expect(a).to.eql('a=null');
        })

        it('option.reduce', function() {
            var a = stringify({ a: [1, 2] })
            expect(a).to.eql('a=1%2C2');

            var a = stringify({ a: [1, 2] }, { reduce: function (prev, v, k) {
                for (var i = 0; i < v.length; i++) {
                    prev.push({ k: k, v: v[i] })
                }
                return prev;
            } })
            expect(a).to.eql('a=1&a=2');
        })
    });
});
