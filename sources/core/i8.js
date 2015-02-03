kenzo.i8to2 = function(int8){
    var _ = int8.toString(2);
    while (_.length < 8){
        _ = '0' + _;
    }
    return _;
}

kenzo.i8ArrayTo2 = function(array){
    var _ = '';
    kk.each (array, function(item){
        _ += kenzo.i8to2(item);
    });
    return _;
}

kenzo.i8ArrayToString = function(array){
    var _ = '';
    kk.each (array, function(item){
        _ += String.fromCharCode(item);
    });
    return _;
}
