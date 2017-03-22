// Случайное целое число
kk.rand = function() {
    var args = arguments;
    var min;
    var max;

    // Если аргументов нет — выдавать случайно true/false
    if (!kk.is_n(args[0])) {
        return !Math.round(Math.random())
    }

    // Если аргумент только один — задаёт разряд случайного числа
    if (!kk.is_n(args[1])) {
        var depth = Math.floor(Math.abs(args[0]));

        if (depth < 16) {
            if (depth === 0)
                return 0;
            else if (depth === 1)
                min = 0;
            else
                min = Math.pow(10, depth - 1);

            return kk.rand(min, Math.pow(10, depth) - 1);

        } else {
            throw Error(kk.msg.ia);
        }
    }

    // Если два аргумента
    min = args[0];
    max = args[1] + 1;

    return Math.floor( Math.random() * (max - min) ) + min;

};
