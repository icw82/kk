// Случайное целое число
kk.rand = (first, second) => {
    let min;
    let max;

    // Если первым аргументом передан массив
    if (kk.is.A(first))
        return first[ kk.rand(0, first.length - 1) ];

    // Если аргументов нет — выдавать случайно true/false
    if (!kk.is.n(first))
        return !Math.round(Math.random())

    // Если аргумент только один — задаёт разряд случайного числа
    if (!kk.is.n(second)) {
        var depth = Math.floor(Math.abs(first));

        if (depth >= 16)
            throw new Error(`Нельзя задать число более чем в 16 знаков`);

        if (depth === 0)
            return 0;

        if (depth === 1)
            min = 0;
        else
            min = Math.pow(10, depth - 1);

        return kk.rand(min, Math.pow(10, depth) - 1);

    }

    // Если два аргумента
    min = first;
    max = second + 1;

    return Math.floor( Math.random() * (max - min) ) + min;

};
