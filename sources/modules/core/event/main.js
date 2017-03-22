kk.Event = function(key) {
    var kenzo = kk;
    var listeners = [];
    var is_completed = false;
    var last_data;

    Object.defineProperty(this, 'key', {
        get: function() {return key}
    });

    this.hasListener = function(listener) {
        return kenzo.each (listeners, function(item) {
            return item === listener;
        });
    }

    this.addListener = function(listener) {
        if (!kenzo.is_f(listener) || this.hasListener(listener))
            return;

        if (this.is_completed) {
            listener(last_data);
        } else {
            listeners.push(listener);
        }
    }

    this.removeListener = function(listener) {
        if (!kenzo.is_f(listener))
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

        if (kenzo.is_u(this.key)) {
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


// TODO: переработать
kk.event = (function() {
    var _ = {},
        create_event = document.createEvent;

    _.resize = function(delay) {
        if (typeof create_event == kk._f) {
            var event = create_event('Event');
            event.initEvent('resize', true, true);
            window.dispatchEvent(event);
        }
    }

    _.stop = function(event) {
        event = event || window.event;

        if (!event)
            return false;

        while (event.originalEvent) {
            event = event.originalEvent
        }

        if (event.preventDefault)
            event.preventDefault();
        if (event.stopPropagation)
            event.stopPropagation();

        event.cancelBubble = true;

        return false;
    }

    return _;

})();
