kk.class = function(element, classes, mask) {
    if (!kk.is.E(element))
        throw new TypeError();

    if (kk.is.s(classes))
        classes = [classes];

    if (!kk.is.A(classes))
        throw new TypeError();

    if (!kk.is.A(mask))
        mask = [];

    mask.forEach(function(item) {
        if (!kk.is.s(item))
            throw new TypeError();
    });

    classes.forEach(function(item) {
        if (!kk.is.s(item))
            throw new TypeError();
    });

    mask.forEach(function(item) {
        if (classes.indexOf(item) < 0) {
            element.classList.remove(item);
        }
    });

    classes.forEach(function(item) {
        element.classList.add(item);
    });
}
