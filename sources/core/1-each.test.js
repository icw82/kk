QUnit.test('each', function(assert) {
    // TODO: не проверяется индекс при обратном переборе
    const each = kk.each;

    let callback_nothing = () => {};
    let callback_true = () => true;
    let callback_false = () => false;
    let callback_42 = () => 42;

    {
        let test
        try {
            each([]);
            test = true;
        } catch (e) {
            test = false;
        }
        assert.notOk(test, 'Функция обратного вызова не определена');
    }

    {
        let test
        try {
            each([], []);
            test = true;
        } catch (e) {
            test = false;
        }
        assert.notOk(test, 'Функция обратного вызова не является функцией');
    }

    {
        let a = {}
        let test = each(a.un, callback_nothing);
        assert.equal(typeof test, kk._u,
            'Игнорирование обратного вызова,' +
            'если тип переданного объекта не определён');
    }

    {
        let test = each(null, callback_nothing);
        assert.equal(typeof test, kk._u,
            'Игнорирование обратного вызова,' +
            'если тип переданного объекта не определён: null');
    }

    {
        let test = each({length: 42}, callback_nothing);
        assert.equal(typeof test, kk._u,
            'Игнорирование обратного вызова,' +
            'если тип переданного объекта не определён: {length: 42}');
    }

    {
        let test = each([], callback_nothing, callback_42);
        assert.equal(test, callback_42(),
            'Функция по умолчанию возвращает значание');
    }

    {
        let test = each([], callback_nothing, callback_nothing);
        assert.equal(typeof test, kk._u,
            'Функция по умолчанию возвращает «undefined»');
    }

    {
        let counter = 0;
        let object = [1, 2, 3];
        let last_index;
        let test = each(object, function(item, i) {
            counter++;
            last_index = i;
        });
        assert.equal(counter, object.length,
            'Простой перебор без возвращаемых значений: Выполнение функции');
        assert.equal(typeof test, kk._u,
            'Простой перебор без возвращаемых значений: Возвращает «undefined»');
        assert.equal(last_index, object.length - 1,
            'Передача в функцию обратного вызова порядковый номер элемента массива');
    }

    {
        let counter = 0;
        let object = [{a: 1}, 2, {c: 3}, 4, {e: 5}];
        let goal_index = 2;
        let goal = object[goal_index];
        let test_index;
        let test_link;
        let test = each(object, function(item, i, link) {
            counter++;
            test_index = i;
            if (item === goal) {
                test_link = link;
                return item;
            }
        }, function() {
            assert.ok(false, 'Перебор c остановкой: Функция не должна выполняться');
        });
        assert.equal(counter, goal_index + 1,
            'Перебор c остановкой: Выполнение функции и остановка');
        assert.equal(test, goal,
            'Перебор c остановкой: Возвращение значения функции обратного вызова');
        assert.equal(object, test_link,
            'Передача в функцию обратного вызова ссылку на исходный объект');
    }

    {
        let counter = 0;
        let object = 42;
        let match = false;
        let test = each(object, function(item) {
            if (item === 20)
                match = true;
            counter++;
        });
        assert.equal(counter, object,
            'Псевдоперебор 42-х элементов');
        assert.ok(match,
            'Псевдоперебор: в первый аргумент функции обратного вызова' +
            'возвращает порядковый номер псевдоэлемента');
    }

    {
        let counter = 0;
        let object = -42;
        let test = each(object, function(item) {
            counter++;
        });
        assert.equal(counter, 0,
            'Псевдоперебор: Отрицательные числа конвертируются в ноль');
    }

    {
        let counter = 0;
        let object = 4.99;
        let test = each(object, function(item) {
            counter++;
        });
        assert.equal(counter, 4,
            'Псевдоперебор: Округление дробного числа к меньшему целому');
    }

    {
        let counter = 0;
        let object = [1, {b: 2}, 3, {d: 4}, 5];
        let goal_index = 1;
        let goal = object[goal_index]
        let test = each(object, function(item) {
            counter++;
            if (item === goal)
                return item;
        }, true);
        assert.equal(counter, object.length - goal_index,
            'Обратный перебор c остановкой: Выполнение функции и остановка');

    }

    {
        let object = new Uint8Array([12, 42, 82]);
        let goal = 42;
        let test = each (object, function(item, i) {
            if (item === goal)
                return item;
        });
        assert.equal(test, goal, 'Тип переданного объекта — TypedArray');
    }

    if (!kk.d) return; // если нет DOM

    {
        let counter = 0;
        let test = each('.test-each', function(item) {
            if (kk.is_N) {
                counter++;
            }
        });
        assert.equal(counter, 7,
            'Перебор элементов DOM по запросу в форме строки');
    }

    {
        let counter = 0;
        let test = each(document.querySelector('#dom-tests').children, function(item) {
            if (kk.is_N) {
                counter++;
            }
        });
        assert.equal(counter, 7,
            'Перебор элементов DOM по запросу в форме HTML Коллекции');
    }
});
