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

    if (!kk.is.f(callback))
        throw kk.err.cb;

    var def = kk.is.f(args[2]) ? args[2] : false;
    var last = args[args.length - 1];
    var reverse = kk.is.b(last) ? last : false;
    var index;
    var result;
    var pseudo = false;

    if (kk.is.u(first))
        return void 0;

    if (kk.is.s(first) && kk.d) {
        array = kk.d.querySelectorAll(first);
    } else if (kk.is.n(first)) {
        array = Array(Math.floor(Math.max(0, first)));
        pseudo = true;
    } else if (ArrayBuffer.isView(first) && (first.length > 0)) {
        array = Array.prototype.slice.call(first);
        //var args = (arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments));
    } else if (kk.is.A(first) || kk.is.NL(first) || kk.is.C(first)) {
        array = first;
    }


    if (array.length > 0) {
        if (reverse) {
            for (index = array.length - 1; index >= 0; index--) {
                result = callback(pseudo ? index : array[index], index, array);
                if (!kk.is.u(result))
                    return result;
            }
        } else {
            for (index = 0; index < array.length; index++) {
                result = callback(pseudo ? index : array[index], index, array);
                if (!kk.is.u(result))
                    return result;
            }
        }
    }

    if (def) {
        return def();
    }
};

if (kk.r.each === void 0)
    kk.r.each = kk.each;
