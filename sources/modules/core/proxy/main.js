kk.proxy = (function(kk) {

    kk.ProxyStorage = function() {}

    var proxy_storage_name = '__proxy__';

    return function(/*object, [property(-ies),] callback*/) {
        var proxy_storage;
        var args = arguments;
        var object = args[0];

        // TODO: Добавить больше исключений
        if (
            typeof object !== kk._o ||
            object instanceof kk._A ||
            object instanceof kk._NL
        ) {
            kk.__a();
            return;
        }

        // Проверка существовоания хранилища переменных
        if (object[proxy_storage_name] instanceof kk.ProxyStorage) {
            proxy_storage = object[proxy_storage_name];
        }

        // Функция вторым аргументом
        if (typeof args[1] === kk._f) {
            var callback = args[1];
            // Прокси для каждого ключа
            return kk.proxy(object, Object.keys(object), callback);

        // Функция третьим аргументом
        } else if (typeof args[2] === kk._f) {
            var callback = args[2];

            // Массив вторым аргументом
            if (args[1] instanceof kk._A) {
                kk.each(args[1], create);
                // TODO: Не возвращает False
            } else {
                if (create(args[1]) === false)
                    return false;
            }
        } else {
            kk.__a();
            return;
        }

        function create(property) {
            // Имя свойства указано
            if (typeof property === kk._s) {
                if (!proxy_storage) {
                    Object.defineProperty(object, proxy_storage_name, {
                        enumerable: false,
                        writable: true
                    });

                    proxy_storage = object[proxy_storage_name] = new kk.ProxyStorage;
                }

                // Проверка существования прокси
                if (property in proxy_storage) {
                    kk.__ae();
                    return false;
                }

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
                    set: function(new_value) {
                        proxy_storage[property] = new_value;
                        callback(object, property);
                    }
                });

            } else {
                kk.__a();
                return;
            }
        }

        return true;

    }

})(kk);
