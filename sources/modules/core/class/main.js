kk.class = function(element, classes, mask) {
    if (!kk.is_E(element))
        throw kk.err.ia;

    if (kk.is_s(classes))
        classes = [classes];

    if (!kk.is_A(classes))
        throw kk.err.ia;

    if (!kk.is_A(mask))
        mask = [];

    mask.forEach(function(item) {
        if (!kk.is_s(item))
            throw kk.err.ia;
    });

    classes.forEach(function(item) {
        if (!kk.is_s(item))
            throw kk.err.ia;
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
