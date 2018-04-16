kk.is = (() => {
    const is = {
        u: 'undefined',
        b: 'boolean',
        n: 'number',
        s: 'string',
//        sy: 'symbol',
        o: 'object',
        f: 'function',
        c: 'function', // class
    };

    Object.keys(is).forEach(key => {
        const type = is[key];

        is[key] = (...args) =>
            !(args.filter(item => typeof item !== type).length > 0);
    });

    //Boolean
    //Number
    //String
    //Symbol

    is.addTest = (name, type) => {
        if (is.hasOwnProperty(name))
            throw new kk.err.ae();

        if (!is.c(type))
            throw new TypeError();

        is[name] = (...args) =>
            !(args.filter(item => !(item instanceof type)).length > 0)
    }

    [
        ['A', Array],
        ['AB', ArrayBuffer],
        ['D', Date],
        ['E', Element],
        ['N', Node],
        ['NL', NodeList],
        ['C', HTMLCollection]
    ].forEach(args => {
        is.addTest(...args);
    });

    return is;

})();
