(function() {
'use strict';

var root;
var cons = console;
var kenzo = {
        v: '0.1.0',
        w: false, // window (global if not)
        d: false, // root.document
        _b: 'boolean',
        _o: 'object',
        _f: 'function',
        _u: 'undefined',
        _s: 'string',
        _n: 'number',
        _A: Array, // TODO: is instance
        __a: function() {cons.error('Некорректные аргументы')},
        __d: function() {cons.warn('Depricated')},
        __ae: function() {cons.warn('Уже существует')}
    };

if (typeof window == kenzo._o &&
    (typeof Window == kenzo._f || typeof Window == kenzo._o) && (window instanceof Window)) {
    root = window;
    kenzo.w = true;
} else if (typeof global == kenzo._o) {
    root = global;
}

if (typeof root.document == kenzo._o)
    kenzo.d = true;

if (typeof Element == kenzo._f || typeof Element == kenzo._o)
    kenzo._E = Element;

if (typeof Node == kenzo._f || typeof Node == kenzo._o)
    kenzo._N = Node;

if (typeof NodeList == kenzo._f || typeof NodeList == kenzo._o)
    kenzo._NL = NodeList;

if (typeof HTMLCollection == kenzo._f || typeof HTMLCollection == kenzo._o)
    kenzo._C = HTMLCollection;

root.kenzo = root.kk = kenzo;

kenzo.ts = function() {
    var time = new Date();
    return time.getTime();
}

if (typeof module == kenzo._o && typeof module.exports == kenzo._o) {
    // FUTURE: запилить для ноды
    module.exports = kenzo;
}

kenzo.r = root;

}());
