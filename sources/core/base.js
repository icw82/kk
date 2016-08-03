(function() {
'use strict';

var root;
var cons = console;
var kenzo = {
    v: '0.2.0',
//    r: root // window or global
    w: false, // window (global if not)
    d: false, // root.document
//    _b: 'boolean',
//    _u: 'undefined',
//    _o: 'object',
//    _f: 'function',
//    _s: 'string',
//    _n: 'number',
//    _A: Array,
//    _E: Element,
//    _N: Node,
//    _NL: NodeList,
//    _C: HTMLCollection,
    __a: function() {cons.error('Некорректные аргументы')},
    __d: function() {cons.warn('Depricated')},
    __ae: function() {cons.warn('Уже существует')}
};

kenzo.msg = {
    cb: 'Обратный вызов не определён или не является функцией'
};

['undefined', 'boolean', 'number', 'string', 'object', 'function'].forEach(function(s) {
    kenzo['_' + s[0]] = s;
    kenzo['is_' + s[0]] = function(a) {return typeof a === s}
});

if (
    kenzo.is_o(window) &&
    (kenzo.is_f(Window) || kenzo.is_o(Window)) &&
    (window instanceof Window)
) {
    root = window;
    kenzo.w = window;
} else if (kenzo.is_o(global)) {
    root = global;
}

if (kenzo.is_o(root.document))
    kenzo.d = root.document;

[
    [Array, 'A'],
    [Element, 'E'],
    [Node, 'N'],
    [NodeList, 'NL'],
    [HTMLCollection, 'C']
].forEach(function(p) {
    if (typeof p[0] !== kenzo._u && ( kenzo.is_f(p[0]) || kenzo.is_o(p[0]) ) ) {
        kenzo['_' + p[1]] = p[0];
        kenzo['is_' + p[1]] = function(a) {return a instanceof p[0]}
    }
});

root.kenzo = root.kk = kenzo;

kenzo.ts = function() {
    var time = new Date();
    return time.getTime();
}

if (typeof module !== kenzo._u && kenzo.is_o(module) && kenzo.is_o(module.exports)) {
    // FUTURE: запилить для ноды
    module.exports = kenzo;
}

kenzo.r = root;

}());
