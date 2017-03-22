// Перебор массива
//
// Перебор прерывается, eсли обратная функция возвращает значение, отличное
// от undefined и false.
// Если третий аргумент функция — то она выполяется после перебора массива,
//     если обратная функция ниразу не возвращала true
// Если последний элемент === true, перебор производится в обратном порядке.

// TODO: MutationRecord;

kk.each = function() {
    var args = arguments;
    var array = [];
    var first = args[0];
    var callback = args[1];

    if (!kk.is_f(callback))
        throw kk.msg.cb;

    var def = kk.is_f(args[2]) ? args[2] : false;
    var last = args[args.length - 1];
    var reverse = kk.is_b(last) ? last : false;
    var index;
    var result;
    var pseudo = false;

    if (kk.is_s(first) && kk.d) {
        array = kk.d.querySelectorAll(first);
    } else if (kk.is_n(first)) {
        array = kk._A(Math.floor(Math.max(0, first)));
        pseudo = true;
    } else if (ArrayBuffer.isView(first) && (first.length > 0)) {
        array = kk._A.prototype.slice.call(first);
    } else if (kk.is_A(first) || kk.is_NL(first) || kk.is_C(first)) {
        array = first;
    }

    if (array.length > 0) {
        if (reverse) {
            for (index = array.length - 1; index >= 0; index--) {
                result = callback(pseudo ? index : array[index], index, array);
                if (!kk.is_u(result))
                    return result;
            }
        } else {
            for (index = 0; index < array.length; index++) {
                result = callback(pseudo ? index : array[index], index, array);
                if (!kk.is_u(result))
                    return result;
            }
        }
    }

    if (def) {
        return def();
    }
};

if (typeof kk.r.each === kk._u)
    kk.r.each = kk.each;
