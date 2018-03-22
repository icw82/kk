kk.Event = class kkEvent{
    constructor(key) {
        this.listeners = [];
        this.state = {
            last: undefined,
            completed: false
        }

        Object.defineProperty(this, 'key', {
            get: () => key
        });

    }

    hasListener(listener) {
        return this.listeners.find(item => item === listener);
    }

    addListener(listener) {
        if (!kk.is_f(listener) || this.hasListener(listener))
            return;

        if (this.state.completed)
            listener(...this.state.last);
        else
            this.listeners.push(listener);

    }

    removeListener(listener) {
        if (!kk.is_f(listener))
            return;

        this.listeners = this.listeners.filter(item => item !== listener);
    }

    // Если ключ задан, то он передаётся первым аргументом.
    dispatch(...data) {
        let key;

        if (this.state.completed)
            return;

        if (this.key !== undefined) {
            key = data.shift();
            if (key !== this.key)
                return false;
        }

        this.state.last = data;

        this.listeners.forEach(listener => listener(...data));
    }

    complete() {
        if (this.state.completed)
            return;

        this.dispatch.apply(this, arguments);
        this.state.completed = true;
    }

}
