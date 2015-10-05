kk.i8to2 = function(int8) {
    var _ = int8.toString(2);
    while (_.length < 8) {
        _ = '0' + _;
    }
    return _;
}

kk.i8ArrayTo2 = function(array) {
    var _ = '';
    kk.each (array, function(item) {
        _ += kk.i8to2(item);
    });
    return _;
}

kk.i8ArrayToString = function(array) {
    var _ = '';
    kk.each (array, function(item) {
        _ += String.fromCharCode(item);
    });
    return _;
}
