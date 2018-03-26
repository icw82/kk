kk.format.number = input => {
    if (kk.is_n(input))
        input = String(input);

    if (!kk.is_s(input) || input === '')
        throw kk.err.ia;

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
