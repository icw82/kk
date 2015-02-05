kk.format = function(){
    var kenzo = kk,
        _ = {};

    // Российские номера
    _.phone = function(){
        if (arguments.length === 0) return false;
        if (typeof arguments[0] !== 'string') return false;

        var
            string = arguments[0],
            number = string
                .replace(/[^\d\+]/g, '')
                .match(/^(?:\+7|8)([\d]{10})/);

        if (number === null) return false;
        number = number[1];

        return '+7 ('
            + number.slice(0, 3) + ') '
            + number.slice(3, 6) + '-'
            + number.slice(6, 8) + '-'
            + number.slice(8, 10);
    }


}

//kenzo.num_to_ru = function(n){
//    if (typeof n == 'number')
//        return n.toString().replace(/\./,',');
//    if (typeof n == 'string')
//        return n.replace(/\./,',');
//}

//// Старое
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
