kk.Event = function(key) {
    var listeners = [];
    var is_completed = false;
    var last_data;

    Object.defineProperty(this, 'key', {
        get: function() {return key}
    });

    this.hasListener = function(listener) {
        return kk.each (listeners, function(item) {
            return item === listener;
        });
    }

    this.addListener = function(listener) {
        if (!kk.is_f(listener) || this.hasListener(listener))
            return;

        if (this.is_completed) {
            listener(last_data);
        } else {
            listeners.push(listener);
        }
    }

    this.removeListener = function(listener) {
        if (!kk.is_f(listener))
            return;

        listeners = listeners.filter(function(item) {
           return item !== listener;
        });
    }

    // Если ключ задан, то он передаётся первым аргументом.
    this.dispatch = function() {
        if (this.is_completed)
            return;

        var args = arguments;
        var data;

        if (kk.is_u(this.key)) {
            data = args[0];
        } else {
            if (this.key === args[0]) {
                data = args[1];
            } else {
                return;
            }
        }

        last_data = data;

        kk.each (listeners, function(listener) {
            listener(data);
        });

        return true;
    }

    this.complete = function() {
        if (this.is_completed)
            return;

        if (this.dispatch.apply(this, arguments)) {
            this.is_completed = true;
        }
    }
};
