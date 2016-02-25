//kk.proxy = function(/*object, [property(-ies),] callback*/) {
//    var kenzo = kk;
//    var args = arguments;
//
//    if (typeof args[0] !== kenzo._o) {
//        kenzo.__a();
//        return;
//    }
//
//    var object = args[0];
//
//    // Функция вторым аргументом
//    if (typeof args[1] === kenzo._f) {
//        var callback = args[1];
//
//    // Функция третьим аргументом
//    } else if (typeof args[2] !== kenzo._f) {
//        var callback = args[2];
//
//        // Массив вторым аргументом
//        if (args[1] instanceof kenzo._A) {
//            kenzo.each(args[1], create);
//
//        } else {
//            create(args[1]);
//        }
//    } else {
//        kenzo.__a();
//        return;
//    }
//
//    function create(property) {
//        // Имя свойства указано
//        if (typeof property === kenzo._s) {
//
//
//        } else {
//            kenzo.__a();
//            return;
//        }
//    }
//
//    return true;
//
////    if (typeof property !== 'string') return;
////
////    var proxy_property = '_' + property;
////
////    object[proxy_property] = void(0);
////
////    Object.defineProperty(object, property, {
////        get: function() {return object[proxy_property]},
////        set: function(new_value) {
////            object[proxy_property] = new_value;
////            callback(object, property);
////        }
////    });
//}
