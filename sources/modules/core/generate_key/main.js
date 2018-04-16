kk.generate_key = length => {
    if (!kk.is.n(length) || length < 1)
        length = 1;

    return Array(length).fill('').reduce((prev, item) =>
        prev + String.fromCharCode(kk.rand(19968, 40869))
    , '');
};
