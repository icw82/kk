kk.format = (function() {
    var each = kk.each,
        _ = {};

    _.number = function(string) {
        var _ = '',
            delimiter = ' ';

        if (string && string != '') {
            var numbers = String(string);
            numbers = numbers.split('');

            each (numbers.length, function(item, i) {
                _ = numbers[i] + _;

                if (i !== 0 && (numbers.length - i) % 3 === 0) {
                    _ = delimiter + _;
                }

            }, true);
        }

        return _;
    }

    // Российские номера
    // TODO: не только российские
    _.phone = function() {
        if (arguments.length === 0)
            return false;

        if (typeof arguments[0] !== 'string')
            return false;

        var string = arguments[0],
            number = string
                .replace(/[^\d]/g, '')
                .match(/^(?:7|8)([\d]{10})/);

        if (number === null)
            return false;

        number = number[1];

        return '+7 ('
            + number.slice(0, 3) + ') '
            + number.slice(3, 6) + '-'
            + number.slice(6, 8) + '-'
            + number.slice(8, 10);
    }

    return _;
})();

//kenzo.num_to_ru = function(n) {
//    if (typeof n == 'number')
//        return n.toString().replace(/\./,',');
//    if (typeof n == 'string')
//        return n.replace(/\./,',');
//}
