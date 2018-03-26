kk.format = {};

const split = string => {
    if (!kk.is_s(string))
        throw new TypeError('Expected a string');

    let output = string;

    output = output.replace(/([\s-–—_]+)/g, `-`);
    output = output.replace(/([a-z])([A-Z])/g, `$1-$2`);
    output = output.toLowerCase();

    return output.split('-');
}

//kenzo.num_to_ru = function(n) {
//    if (typeof n == 'number')
//        return n.toString().replace(/\./,',');
//    if (typeof n == 'string')
//        return n.replace(/\./,',');
//}
