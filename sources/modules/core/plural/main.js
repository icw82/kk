kk.plural = function() {
    // TODO: Для других языков.

    var kenzo = kk,
        lang = 'ru',
        langs = ['ru'],
        args = arguments,
        first = args[0],
        second = args[1],
        amount, singular, paucal, plural, fr;

    if (typeof first == kenzo._s) {
        if (langs.indexOf(first) > -1) {
            lang = first;
            return true;
        } else
            return false;
    }

    if (typeof first == kenzo._n) {
        amount = first;
    } else if (first instanceof kenzo._A) {
        amount = first.length;
    } else if (typeof first == kenzo._o) {
        // NOTE: Может убрать к херам?
        amount = 0;
        for (var j in first)
            amount++;
    } else
        return false;

    if (amount < 0)
        amount = -amount;

    if (
        (second instanceof kenzo._A) &&
        (typeof second[0] == kenzo._s) &&
        (typeof second[1] == kenzo._s) &&
        (typeof second[2] == kenzo._s)
    ) {
        singular = second[0];
        paucal = second[1];
        plural = second[2];

    } else if (
        (typeof args[1] == kenzo._s) &&
        (typeof args[2] == kenzo._s) &&
        (typeof args[3] == kenzo._s)
    ) {
        kenzo.__d();
        return kenzo.plural(amount, [args[1], args[2], args[3]]);
    } else
        return false;

    (fr = amount.toString().match(/(\.\d+)/)) &&
        (amount *= Math.pow(10, fr[0].length - 1));

    if (fr !== null)
        return plural;
    if ((amount % 10 == 1) && (amount % 100 != 11))
        return singular;
    else
        if ((amount % 10 >= 2) && (amount % 10 <= 4) &&
            ((amount % 100 < 10) || (amount % 100 >= 20)))
            return paucal;
        else
            return plural;
}
