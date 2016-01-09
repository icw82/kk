// Перебор массива
// Если обратная функция возвращает true, перебор прерывается.
// Если третий аргумент функция — то она выполяется после перебора массива,
//     если обратная функция ниразу не возвращала true
// Если последний элемент === true, перебор производится в обратном порядке.
kk.each = function(array, callback) {
    var kenzo = kk,
        args = arguments,
        reverse,
        def,
        nothing = true,
        index;

//    console.log('**', array instanceof MutationRecord);
    if (typeof array === kenzo._s && kenzo.d)
        array = document.querySelectorAll(array);
    else if (typeof array === kenzo._n)
        array = Array(Math.floor(array))
    else if (ArrayBuffer.isView(array) && (array.length > 0)) {
        array = Array.prototype.slice.call(array);
    }


    if (typeof args[2] == kenzo._f) {
        def = args[2];
        if (args[3] === true)
            reverse = true;
    } else if (args[2] === true) {
        reverse = true;
    }

    if (
        (
            (array instanceof kenzo._A) ||
            (array instanceof kenzo._NL) ||
            (array instanceof kenzo._C)
        ) &&
        typeof callback == kenzo._f
    ) {
        if (reverse) {
            for (index = array.length - 1; index >= 0; index--) {
                if (callback(array[index], index) === true) {
                    nothing = false;
                    break;
                }
            }
        } else {
            for (index = 0; index < array.length; index++) {
                if (callback(array[index], index) === true) {
                    nothing = false;
                    break;
                }
            }
        }

        if (nothing && typeof def == kenzo._f) {
            def();
        }
    } else if (typeof def == kenzo._f) {
        def();
    }
};

if (typeof kk.r.each === kenzo._u)
    kk.r.each = kk.each;
