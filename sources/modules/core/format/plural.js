kk.format.plural = (subject, ...forms) => {
    // TODO: Для других языков.

    const amount = kk.is.n(subject) ? Math.abs(subject) :
        kk.is.A(subject) ? subject.length :
        kk.is.S(subject) ? subject.size : null;

    if (amount === null)
        throw TypeError();

    if (kk.is.A(forms[0]))
        forms = forms[0];

    if (forms.length !== 3)
        throw Error(`Формы должно быть три`);

    if (kk.is.s(forms))
        throw TypeError();

    const [ singular, paucal, plural ] = forms;

    // Если есть дробная часть
    const fraction = amount.toString().match(/(\.\d+)/);

    if (fraction !== null)
        return plural;

    // (amount *= Math.pow(10, last[0].length - 1));
    if ((amount % 10 == 1) && (amount % 100 != 11))
        return singular;

    if ((amount % 10 >= 2) && (amount % 10 <= 4) &&
        ((amount % 100 < 10) || (amount % 100 >= 20)))
        return paucal;

    return plural;
}
