kk.hslToRgb = function() {
    if (typeof arguments[0] === 'object') {
        var h = arguments[0].h;
        var s = arguments[0].s;
        var l = arguments[0].l;
    } else {
        var h = arguments[0];
        var s = arguments[1];
        var l = arguments[2];
    }

    h /= 360;
    s /= 100;
    l /= 100;

    var r, g, b;

    if (s == 0) {
        r = g = b = l;
    } else {
        var hue2rgb = function hue2rgb(p, q, t) {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        }

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }

    return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255)
    };
}


//
//setInterval(update, 100);
//var current_time = 0;
//
//function update() {
//    current_time++;
//    var colors = number_to_color(current_time);
//    document.body.style.backgroundColor =
//        'rgb(' + colors.join(',') + ')';
//}
//
//function number_to_color(num) {
//    num %= 16777216;
//    var hex = num.toString(16);
//    while (hex.length < 6) {
//        hex = '0' + hex;
//    }
//    console.log(num, hex);
//    return [
//        parseInt(hex.slice(0,2), 16),
//        parseInt(hex.slice(2,4), 16),
//        parseInt(hex.slice(4,6), 16)
//    ];
//}
