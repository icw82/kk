kk.format.number = input => {
    if (kk.is.n(input))
        input = String(input);

    if (!kk.is.s(input) || input === '')
        throw new TypeError();

    var output = '';
    var delimiter = ' ';

    kk.each (input.split(''), function(item, index) {
        output = item + output;

        if (index !== 0 && (input.length - index) % 3 === 0) {
            output = delimiter + output;
        }

    }, true);

    return output;
}
