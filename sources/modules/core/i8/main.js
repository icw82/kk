kk.i8to2 = function(int8) {
    var output = int8.toString(2);

    while (output.length < 8) {
        output = '0' + output;
    }

    return output;
}

kk.i8ArrayTo2 = function(array) {
    var output = '';

    array.forEach(function(item) {
        output += kk.i8to2(item);
    });

    return output;
}

kk.i8ArrayToString = function(array) {
    var output = '';

    array.forEach(function(item) {
        output += String.fromCharCode(item);
    });

    return output;
}
