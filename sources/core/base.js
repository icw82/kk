(function(){
// start ——————————————————————————————————————————————————————————————————————————————————— 100 ——|
'use strict';

var root,
    cons = console,
    kenzo = {
        v: '3.0.0',
        w: false, // window (global if not)
        d: false, // root.document
        _o: 'object',
        _f: 'function',
        _u: 'undefined',
        _s: 'string',
        _n: 'number',
        _A: Array,
        __a: function(){cons.error('Некорректные аргументы')},
        __d: function(){cons.warn('Depricated')}
    };

if (typeof window == kenzo._o && typeof Window == kenzo._f && (window instanceof Window)){
    root = window;
    kenzo.w = true;
} else if (typeof global == kenzo._o){
    root = global;
}

if (typeof root.document == kenzo._o)
    kenzo.d = true;

if (typeof Element == kenzo._f)
    kenzo._E = Element;

if (typeof Node == kenzo._f)
    kenzo._N = Node;

if (typeof NodeList == kenzo._f)
    kenzo._NL = NodeList;

root.kenzo = root.kk = kenzo;

if (typeof module == kenzo._o && typeof module.exports == kenzo._o){
    // FUTURE: запилить для ноды
    module.exports = kenzo;
}

kenzo.r = root;

// end ————————————————————————————————————————————————————————————————————————————————————— 100 ——|
}());

//  – — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — —|

//kenzo.num_to_ru = function(n){
//    if (typeof n == 'number')
//        return n.toString().replace(/\./,',');
//    if (typeof n == 'string')
//        return n.replace(/\./,',');
//}
//
//// Вызов событий
//kenzo.generate = (function(){
//    var resize = function(delay){
//        if (typeof document.createEvent == 'function'){
//            var event = document.createEvent('Event');
//            event.initEvent('resize', true, true);
//            window.dispatchEvent(event);
//        }
//    }
//
//    return {
//        'resize': resize
//    }
//})();
//
//kenzo.is_nodes = function(){
//    if ((typeof StaticNodeList == 'object') && (arguments[0] instanceof StaticNodeList))
//        if (arguments[0].length > 0)
//            return true;
//        else
//            return false;
//
//    if (arguments[0] instanceof NodeList)
//        if (arguments[0].length > 0)
//            return true;
//        else
//            return false;
//}
//

//
//kenzo.browser = (function(){
//    if ('transform' in document.body.style)
//        return 'normal';
//    else if ('webkitTransform' in document.body.style)
//        return 'webkit';
//    else
//        return 'old';
//})();
//
//
//kenzo.format = {}
//// Российские номера
//kenzo.format.phone = function(){
//    if (arguments.length === 0) return false;
//    if (typeof arguments[0] !== 'string') return false;
//
//    var
//        string = arguments[0],
//        number = string
//            .replace(/[^\d\+]/g, '')
//            .match(/^(?:\+7|8)([\d]{10})/);
//
//    if (number === null) return false;
//    number = number[1];
//
//    return '+7 ('
//        + number.slice(0, 3) + ') '
//        + number.slice(3, 6) + '-'
//        + number.slice(6, 8) + '-'
//        + number.slice(8, 10);
//}
//
//// Локальное хранилище
//kenzo.ls = {
//    'create': function(){
//        each (arguments, function(item){
//            if ((typeof item == 'string') && (!localStorage.getItem(item))){
//                localStorage.setItem(item, JSON.stringify([]));
//                localStorage.setItem('@' + item, getTimestump());
//            }
//        })
//    },
//    'get': function(address){
//        return JSON.parse(localStorage.getItem(address));
//    },
//    'ts': function(address){
//        return localStorage.getItem('@' + address);
//    },
//    'update': function(address, data){
//        localStorage.setItem(address, JSON.stringify(data));
//        localStorage.setItem('@' + address, getTimestump());
//        return true;
//    }
//}

//// Старое

//function getTimestump(){
//    var time = new Date();
//    return time.getTime();
//}
//
//// Разделение чисел на разряды
//function numderTypo(input){
//    var output = '';
//
//    if(input && input != ''){
//        var numbers = String(input);
//        numbers = numbers.split('');
//
//        for(n = numbers.length - 1; n >= 0; n--){
//            output = numbers[n] + output;
//            if((numbers.length - n) % 3 == 0)
//                output = ' ' + output;
//        }
//    }
//
//    return output;
//}
//
//function timeTypo(input){
//    var
//        hours = Math.floor(input/60),
//        minutes = input - hours*60,
//        output = '';
//
//    if(hours)
//        output += plural_ru(hours, 'час', 'часа', 'часов') + (minutes ? ' ' : '');
//
//    if(minutes)
//        output += plural_ru(minutes, 'минута', 'минуты', 'минут');
//
//    return output;
//}
//
//
//function getWindowParams(){
//    var sizes = {};
//    sizes.x = (window.pageXOffset !== undefined) ? window.pageXOffset :
//        (document.documentElement || document.body.parentNode || document.body).scrollLeft;
//    sizes.y = (window.pageYOffset !== undefined) ? window.pageYOffset :
//        (document.documentElement || document.body.parentNode || document.body).scrollTop;
//    sizes.w = ('innerWidth' in window) ? window.innerWidth :
//        document.documentElement.clientWidth
//    sizes.h = ('innerWidth' in window) ? window.innerHeight :
//        document.documentElement.clientHeight;
//    return sizes;
//}
//
//Element.prototype.getOffset = function(){
//    var boundingClientRect = this.getBoundingClientRect();
//
//    // NOTE: Для ie8 может понадобиться полифилл (лучше отдельным файлом)
//    return {
//        top: boundingClientRect.top + window.pageYOffset,
//        left: boundingClientRect.left + window.pageXOffset,
//        width: boundingClientRect.width,
//        height: boundingClientRect.height
//    }
//};
