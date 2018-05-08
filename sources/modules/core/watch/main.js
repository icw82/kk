const PROXI_STORAGE_NAME = '__proxy__';

kk.ProxyStorage = class ProxyStorage {
    constructor() {}
}

function process(input) {
    var output = [];

    var check_and_push = function(item) {
        if (!~output.indexOf(item))
            output.push(item);
    };

    input.forEach(function(item) {
        if (kk.is.s(item)) {
            check_and_push(item);
        } else if (kk.is.A(item)) {
            process(item).forEach(check_and_push);
        }
    });

    return output;
}

kk.watch = (object, ...properties) => {
    const callback = properties.pop();

    if (
        (!kk.is.o(object) || object === null) ||
        (!kk.is.f(callback) && !(callback instanceof kk.Event)) ||
        (properties.length > 0 && !kk.is.s(...properties))
    )
        throw new TypeError();

    if (!object.hasOwnProperty(PROXI_STORAGE_NAME)) {
        Object.defineProperty(object, PROXI_STORAGE_NAME, {
            enumerable: false,
            writable: true
        });
    }

    if (!(object[PROXI_STORAGE_NAME] instanceof kk.ProxyStorage)) {
        object[PROXI_STORAGE_NAME] = new kk.ProxyStorage();
    }

    const proxy_storage = object[PROXI_STORAGE_NAME];

    // Имена свойств не заданы, прокси для каждого ключа
    if (properties.length === 0) {
        properties = Object.keys(object);
    } else {
        properties = process(properties);
    }

    properties.forEach(function(property) {
        // Проверка существования прокси
        if (property in proxy_storage)
            return;

        // Cуществует ли уже такое свойство
        if (property in object) {
            proxy_storage[property] = object[property];
            delete object[property];
        } else {
            proxy_storage[property] = void(0);
        }

        // Создание прокси
        // FIXME: привести в соответствие с Proxy
        Object.defineProperty(object, property, {
            enumerable: true,
            get: () => proxy_storage[property],
            set: (new_value) => {
                const prev_value = proxy_storage[property];
                proxy_storage[property] = new_value;

                if (new_value !== prev_value) {
                    if (callback instanceof kk.Event)
                        callback.dispatch(prev_value, new_value);
                    else
                        callback(prev_value, new_value);
                }
            }
        });
    });
}
