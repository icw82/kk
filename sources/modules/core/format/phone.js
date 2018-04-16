// Российские номера
// TODO: не только российские
kk.format.phone = input => {
    if (kk.is.n(input))
        input = String(input);

    if (!kk.is.s(input) || input === '')
        throw new TypeError();

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
