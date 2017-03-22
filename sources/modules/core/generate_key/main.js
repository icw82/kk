kk.generate_key = function(length) {
    if (typeof length !== 'number') {
        length = 1;
        console.warn('generate_key 1');
    }

    if (length < 1) {
        length = 1;
        console.warn('generate_key 2');
    }

    var key = '';

    each (length, function() {
        key += String.fromCharCode(kk.rand(19968, 40869));
    });

    return key;
};
