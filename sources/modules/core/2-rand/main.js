// Случайное целое число
kk.rand = function() {
    var args = arguments;
    var min;
    var max;

    // Если аргументов нет — выдавать случайно true/false
    if (!kk.is.n(args[0]))
        return !Math.round(Math.random())

    // Если аргумент только один — задаёт разряд случайного числа
    if (!kk.is.n(args[1])) {
        var depth = Math.floor(Math.abs(args[0]));

        if (depth >= 16)
            throw new TypeError();

        if (depth === 0)
            return 0;

        if (depth === 1)
            min = 0;
        else
            min = Math.pow(10, depth - 1);

        return kk.rand(min, Math.pow(10, depth) - 1);

    }

    // Если два аргумента
    min = args[0];
    max = args[1] + 1;

    return Math.floor( Math.random() * (max - min) ) + min;

};
