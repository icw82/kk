var proxy_storage_name = '__proxy__';

kk.ProxyStorage = function() {}

function process(input) {
    var output = [];

    var check_and_push = function(item) {
        if (!~output.indexOf(item))
            output.push(item);
    };

    input.forEach(function(item) {
        if (kk.is_s(item)) {
            check_and_push(item);
        } else if (kk.is_A(item)) {
            process(item).forEach(check_and_push);
        }
    });

    return output;
}

/* object, [property(-ies),] callback */
kk.proxy = function() {
    var properties = [].slice.call(arguments);
    var object = properties.shift();
    var callback = properties.pop();
    var proxy_storage;

    // TODO: Добавить больше исключений
    if (
        !kk.is_o(object) ||
        kk.is_A(object) ||
        kk.is_NL(object) ||
        !kk.is_f(callback)
    )
        throw kk.err.ia;

    // Проверка существовоания хранилища переменных
    if (object[proxy_storage_name] instanceof kk.ProxyStorage) {
        proxy_storage = object[proxy_storage_name];
    } else {
        Object.defineProperty(object, proxy_storage_name, {
            enumerable: false,
            writable: true
        });

        proxy_storage = object[proxy_storage_name] = new kk.ProxyStorage;
    }

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
        Object.defineProperty(object, property, {
            enumerable: true,
            get: function() {return proxy_storage[property]},
            set: function(value) {
                proxy_storage[property] = value;
                callback(object, property);
            }
        });
    });
}
