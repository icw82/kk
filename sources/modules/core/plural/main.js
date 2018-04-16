kk.plural = function() {
    // TODO: Для других языков.

    var lang = 'ru';
    var langs = ['ru'];
    var args = arguments;
    var first = args[0];
    var second = args[1];
    var amount, singular, paucal, plural, fr;

    if (kk.is.s(first)) {
        if (langs.indexOf(first) > -1) {
            lang = first;
            return true;
        } else
            return false;
    }

    if (kk.is.n(first)) {
        amount = first;
    } else if (kk.is.A(first)) {
        amount = first.length;
    } else if (kk.is.o(first)) {
        // NOTE: Может убрать к херам?
        amount = 0;
        for (var j in first)
            amount++;
    } else
        return false;

    if (amount < 0)
        amount = -amount;

    if (
        kk.is.A(second) &&
        kk.is.s(second[0]) &&
        kk.is.s(second[1]) &&
        kk.is.s(second[2])
    ) {
        singular = second[0];
        paucal = second[1];
        plural = second[2];

    } else if (
        kk.is.s(args[1]) &&
        kk.is.s(args[2]) &&
        kk.is.s(args[3])
    ) {
//        kk.__d();
        return kk.plural(amount, [args[1], args[2], args[3]]);
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
