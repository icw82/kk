// Российские номера
// TODO: не только российские
function phone(input) {
    if (kk.is_n(input))
        input = String(input);

    if (!kk.is_s(input) || input === '')
        throw kk.err.ia;

    var output = '';
    var number = input
        .replace(/[^\d]/g, '')
        .match(/^(?:7|8)([\d]{10})/);

    if (number === null)
        return;

    number = number[1];

    output = '+7 ('
        + number.slice(0, 3) + ') '
        + number.slice(3, 6) + '-'
        + number.slice(6, 8) + '-'
        + number.slice(8, 10);

    return output;
}
