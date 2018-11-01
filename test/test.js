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

        it('option', function() {
            var a = stringify({ a: '1', b: '2', c: '3'}, {sep: '+', eq: ':'});
            expect(a).to.eql('a:1+b:2+c:3');
        });

        it('option.encode', function() {
            var a = stringify({ a: '='})
            expect(a).to.eql('a=%3D');

            var a = stringify({ a: '='}, { encode: function (x) {return x} })
            expect(a).to.eql('a==');
        })
    });
});
