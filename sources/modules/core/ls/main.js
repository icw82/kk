// Локальное хранилище
kk.ls = (function(kk, localStorage) {
    var _ = {};

    _.create = function() {
        kk.each (arguments, function(item) {
            if ((kk.is.s(item)) && (!localStorage.getItem(item))) {
                localStorage.setItem(item, JSON.stringify([]));
                localStorage.setItem('@' + item, kk.ts());
            }
        })
    }

    _.get = function(address) {
        return JSON.parse(localStorage.getItem(address));
    }

    _.ts = function(address) {
        return localStorage.getItem('@' + address);
    }

    _.update = function(address, data) {
        localStorage.setItem(address, JSON.stringify(data));
        localStorage.setItem('@' + address, kk.ts());

        return true;
    }

    return _;

})(kk, localStorage);
