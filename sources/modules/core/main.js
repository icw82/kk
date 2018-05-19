const kk = {
    v: '::version::',
//    r: root // window or global
    w: null, // window (global if not)
    d: null, // root.document
//    _b: 'boolean',
//    _u: 'undefined',
//    _o: 'object',
//    _f: 'function',
//    _s: 'string',
//    _n: 'number',
//    _A: Array,
//    _D: Date,
//    _E: Element,
//    _N: Node,
//    _NL: NodeList,
//    _C: HTMLCollection,
};

kk.msg = {
    cb: 'Обратный вызов не определён или не является функцией',
    ae: 'Уже существует'
};

kk.err = {}; // errors

Object.keys(kk.msg).forEach(key => {
    kk.err[key] = Error(kk.msg[key]);
});

kk.__d = () => console.warn('Depricated');


if (
    (typeof Window === 'function' || Window instanceof Function) &&
    (window instanceof Window)
) {
    kk.w = window;
    kk.global = kk.r = kk.w;

} else {
    console.warn(Window, Window instanceof Function, Function);
    console.warn(window, window instanceof Window, Window);
    throw Error(`Неизвестно что`)
}

Object.defineProperty(kk, 'd', { get: () => kk.r.document });

kk.ts = () => Date.now();

kk.r.kk = kk.r.kenzo = kk;
