kk.generate_key = function(length) {
    var output = '';

    if (!kk.is_n(length) || length < 1)
        length = 1;

    kk.each (length, function() {
        output += String.fromCharCode(kk.rand(19968, 40869));
    });

    return output;
};
