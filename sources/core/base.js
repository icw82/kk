(function(){
// start ——————————————————————————————————————————————————————————————————————————————————— 100 ——|
'use strict';

var root,
    cons = console,
    kenzo = {
        v: '3.0.0',
        w: false, // window (global if not)
        d: false, // root.document
        _o: 'object',
        _f: 'function',
        _u: 'undefined',
        _s: 'string',
        _n: 'number',
        _A: Array,
        __a: function(){cons.error('Некорректные аргументы')},
        __d: function(){cons.warn('Depricated')}
    };

if (typeof window == kenzo._o && typeof Window == kenzo._f && (window instanceof Window)){
    root = window;
    kenzo.w = true;
} else if (typeof global == kenzo._o){
    root = global;
}

if (typeof root.document == kenzo._o)
    kenzo.d = true;

if (typeof Element == kenzo._f)
    kenzo._E = Element;

if (typeof Node == kenzo._f)
    kenzo._N = Node;

if (typeof NodeList == kenzo._f)
    kenzo._NL = NodeList;

root.kenzo = root.kk = kenzo;

if (typeof module == kenzo._o && typeof module.exports == kenzo._o){
    // FUTURE: запилить для ноды
    module.exports = kenzo;
}

kenzo.r = root;

// end ————————————————————————————————————————————————————————————————————————————————————— 100 ——|
}());
