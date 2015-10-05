// Локальное хранилище
kk.ls = (function() {
    var kenzo = kk,
        ls = localStorage,
        ls_get = ls.getItem,
        ls_set = ls.setItem,
        _ = {};

    _.create = function() {
        kk.each (arguments, function(item) {
            if ((typeof item == kenzo._s) && (!ls_get(item))) {
                ls_set(item, JSON.stringify([]));
                ls_set('@' + item, kenzo.ts());
            }
        })
    }

    _.get = function(address) {
        return JSON.parse(ls_get(address));
    }

    _.ts = function(address) {
        return ls_get('@' + address);
    }

    _.update = function(address, data) {
        ls_set(address, JSON.stringify(data));
        ls_set('@' + address, kenzo.ts());

        return true;
    }

    return _;

})();
