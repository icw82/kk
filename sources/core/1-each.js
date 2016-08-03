// Перебор массива
//
// Перебор прерывается, eсли обратная функция возвращает значение, отличное от undefined и false.
// Если третий аргумент функция — то она выполяется после перебора массива,
//     если обратная функция ниразу не возвращала true
// Если последний элемент === true, перебор производится в обратном порядке.

// TODO: MutationRecord;

kk.each = function() {
    var kenzo = kk;
    var args = arguments;
    var array = [];
    var first = args[0];
    var callback = args[1];

    if (!kenzo.is_f(callback))
        throw kk.msg.cb;

    var def = kenzo.is_f(args[2]) ? args[2] : false;
    var last = args[args.length - 1];
    var reverse = kenzo.is_b(last) ? last : false;
    var index;
    var result;

    if (kenzo.is_s(first) && kenzo.d) {
        array = kenzo.d.querySelectorAll(first);
    } else if (kenzo.is_n(first)) {
        array = kenzo._A(Math.floor(Math.max(0, first)));
    } else if (ArrayBuffer.isView(first) && (first.length > 0)) {
        array = kenzo._A.prototype.slice.call(first);
    } else if (kenzo.is_A(first) || kenzo.is_NL(first) || kenzo.is_C(first)) {
        array = first;
    }

    if (array.length > 0) {
        if (reverse) {
            for (index = array.length - 1; index >= 0; index--) {
                result = callback(array[index], index, array);
                if (!kenzo.is_u(result))
                    return result;
            }
        } else {
            for (index = 0; index < array.length; index++) {
                result = callback(array[index], index, array);
                if (!kenzo.is_u(result))
                    return result;
            }
        }
    }

    if (def) {
        return def();
    }
};

if (typeof kk.r.each === kenzo._u)
    kk.r.each = kk.each;
