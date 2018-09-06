// Локальное хранилище
kk.ls = (function(kk, localStorage) {
    const _ = {};

    _.on_change = new kk.Event();

    _.create = (key, value = null) => {
        if (kk.is.s(key) && !localStorage.getItem(key)) {
            _.set(key, value, true);
        }
    }

    _.get = (address, default_value) => {
        const data = localStorage.getItem(address);

        if (!data && kk.is.o(default_value))
            return _.set(address, default_value);

        return JSON.parse(data);
    }

    _.ts = address => localStorage.getItem(`@` + address);

    _.set = (address, data, mute) => {
        localStorage.setItem(address, JSON.stringify(data));
        localStorage.setItem(`@` + address, Date.now());

        mute || _.on_change.dispatch();

        return data;
    }

    _.remove = (address) => {
        localStorage.removeItem(address)
        localStorage.removeItem(`@` + address)

        _.on_change.dispatch(`remove`);
    }

    return _;

})(kk, localStorage);
