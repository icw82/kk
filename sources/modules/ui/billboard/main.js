class Billboard {
    constructor (list) {
        const self = this;

        this.limit = 100;

        this.source = list;

        this.width = 0;
        this.heigth = 0;

        this.list = [];

    }

    set_size(width, heigth) {
        if (kk.is.s(width))
            width = parseInt(width);

        if (kk.is.s(heigth))
            heigth = parseInt(heigth);

        if (kk.is.n(width) && kk.is.n(heigth)) {
            if (!isNaN(width) && !isNaN(heigth)) {
                // TODO: проверка
                this.width = width;
                this.heigth = heigth;

                this.limit = (width * heigth) ** 2;

                this.update();

                return;
            }
        }

        console.error(width, heigth);
        throw new Error('Размеры не заданы');
    }

    static convert(list) {
        return list.map(item => {
            if (kk.is.o(item))
                return item

            if (kk.is.n(item))
                return {value: item}

            throw Error('Неверный формат элемента ряда');
        });
    }

    static left(state) {
        let count = 0;

        let list = state.list.slice(0, state.cursor);

        list.forEach(item => {
            count += item.value;
        });

        return state.limit - (count % state.limit);
    }

    static process(state) {
        const offsets = [
            [0, 0], // 0
            [1, 0], // 1
            [0, 1], // 2
            [1, 1], // 3
            [0, 2], // 4
            [1, 2], // 5
            [2, 0], // 6
            [2, 1], // 7
            [2, 2], // 8
            [0, 3], // 9
            [1, 3], // 10
            [2, 3], // 11
            [3, 0], // 12
            [3, 1], // 13
            [3, 2], // 14
            [3, 3], // 15
            [0, 4], // 16
        ];

        for (let i in offsets) {
            const a = offsets[i][0];
            const b = offsets[i][1];

//            console.log('i', i);
//            console.log('cursor', state.cursor);
//            console.log('a', a);
//            console.log('b', b);

            const left = Billboard.left({
                list: state.list,
                cursor: state.cursor - b,
                limit: state.limit
            });

            const temp = state.list[state.cursor + a];

            if (!kk.is.o(temp)) {
//                console.log('Список закончен');
                state.cursor = state.cursor - b + 1;
                return state;
            }

            if (state.list[state.cursor + a].value <= left) {
                state.list[state.cursor + a] =
                    state.list[state.cursor - b];
                state.list[state.cursor - b] = temp;

                state.cursor = state.cursor - b + 1;

//                console.log('state', state.list.map(i => i.value));
                break;
            }
        }

        return state;
    }

    update() {
        const self = this;
        let source = [];

        // Игнорировать элементы, больше максимального значения
        this.source.forEach(item => {
            if (!('width' in item))
                throw new Error('Ширина элемента не задана');

            if (item.width <= this.width)
                source.push(item);
        });

        let state = {
            list: source,
            cursor: 0,
            limit: self.width
        }

        while (state.cursor < state.list.length) {
            this.limit--;
            if (this.limit < 0) {
                console.warn('Признаки зацикленности');
                break;
//                throw new Error('Признаки зацикленности');
            }

            state = Billboard.process(state);

        }

        this.list = state.list;
    }
}

kk.ui.Billboard = Billboard;
