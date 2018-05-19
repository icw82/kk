kk.Event = class kkEvent{
    constructor(key) {
        this.listeners = [];
        this.queue = [];
        this.state = {
            last: void 0,
            processed: false,
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
        if (!kk.is.f(listener))
            throw TypeError();

        if (this.hasListener(listener))
            return;

        if (this.state.completed)
            listener(...this.state.last);
        else
            this.listeners.push(listener);

        // Новые слушатели, появившиеся в процессе обхода существующих
        // попадают также в очередь выполнения
        if (this.state.processed)
            this.queue.push(listener);
    }

    removeListener(listener) {
        if (!kk.is.f(listener))
            return;

        this.listeners = this.listeners.filter(item => item !== listener);
    }

    // Если ключ задан, то он передаётся первым аргументом.
    dispatch(...data) {
        let key;

        if (this.state.completed)
            return;

        this.state.processed = true;

        if (this.key !== undefined) {
            key = data.shift();
            if (key !== this.key)
                return false;
        }

        this.state.last = data;

        this.listeners.forEach(listener => {
            listener(...data);
        });

        while (this.queue.length > 0) {
            const listener = this.queue.shift();
            listener(...data);
        }

        this.state.processed = false;
    }

    complete() {
        if (this.state.completed)
            return;

        this.dispatch.apply(this, arguments);

        this.state.completed = true;
    }
}
