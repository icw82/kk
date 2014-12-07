/**
 * [[Description]]
 * param {Number} Минимальное значение или длина диапазона от нуля
 * param {Number} Максимальное значение
 * @returns {Number} Случайное число из заданного диапазона
 */
kenzo.rand = function(){
    var kenzo = kk,
        args = arguments,
        depth,
        min,
        max;

    if (typeof args[0] == kenzo._n){
        if (typeof args[1] == kenzo._n){
            min = args[0];
            max = args[1] + 1;

            return Math.floor( Math.random() * (max - min) ) + min;
        } else {
            depth = args[0];

            if (depth < 0)
                depth = -depth;

            depth = Math.floor(depth);

            if (depth === 0)
                return 0;
            else if (depth === 1)
                min = 0;
            else
                min = Math.pow(10, depth - 1);

            return kenzo.rand(min, Math.pow(10, depth) - 1);
        }
    } else
        console.warn(kenzo.__arg);
};
