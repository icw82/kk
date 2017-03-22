kk.class = function(element, classes, mask) {
    var each = kk.each;
    var error = Error(kk.msg.ia);
    var abort;

    if (!kenzo.is_E(element))
        throw error;

    if (kk.is_s(classes))
        classes = [classes];

    if (!kk.is_A(classes))
        throw error;

    classes.forEach(function(item) {
        if (!kk.is_s(item))
            throw error;
    });

    if (typeof mask == kenzo._u)
        mask = [];

    if (mask instanceof kenzo._A) {
        each (mask, function(c) {
            if (typeof c != kenzo._s) {
                abort = true;
                return true;
            }
        });

        if (!abort) {
            each (mask, function(c) {
                if (classes.indexOf(c) < 0) {
                    element.classList.remove(c);
                }
            });

            each (classes, function(c) {
                element.classList.add(c);
            });

            return true; // ничего не возвращать
        } else
            kenzo.__a();
    } else
        kenzo.__a();


}
