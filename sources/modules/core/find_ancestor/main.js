kk.find_ancestor = function(descendant, keys, distance) {
    if (!kk.is_n(distance))
        distance = false;

    if (kk.is_s(keys))
        keys = [keys];

    if (kk.is_A(keys)) {
        return kk.each (keys, function(key) {
            if (kk.is_s(key))
                return type(descendant, key, distance);
        });
    }
}

function type(descendant, key, distance) {
    if (key[0] === '#')
        return find(descendant, key.substring(1), distance, true);
    if (key[0] === '.')
        return find(descendant, key.substring(1), distance, false);

    return find(descendant, key, distance, false);
}

function find(descendant, key, distance, type) {
    if (distance !== false && --distance < 0)
        return;

    if (
        kk.is_E(descendant) &&
        ('parentNode' in descendant) &&
        kk.is_E(descendant.parentNode)
    ) {
        var parent = descendant.parentNode;

        if (type) {
            if (parent.getAttribute('id') === key)
                return parent;
        } else {
            if (parent.classList.contains(key))
                return parent;
        }

        return find(parent, key, distance, type);
    }
}
