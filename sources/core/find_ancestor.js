kk.find_ancestor = function(descendant, keys, distance) {
    var kenzo = kk;
    if (!kenzo.is_n(distance))
        distance = false;

    if (kenzo.is_s(keys))
        return type(keys);

    if (kenzo.is_A(keys)) {
        return kenzo.each (keys, function(key) {
            if (kenzo.is_s(key))
                return type(key);
        });
    }

    function type(key) {
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
            kenzo.is_E(descendant) &&
            ('parentNode' in descendant) &&
            kenzo.is_E(descendant.parentNode)
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
}
