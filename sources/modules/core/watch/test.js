QUnit.test('watch', assert => {
    let test_count = 0;

    const test = {
        a: 82
    }

    var test2 = {
        a2: 0,
        b2: 12,
        c2: 23,
        d2: 34,
        e2: 45
    }

    var test3 = {
        a3: 828282
    }

    const callback = (prev_value, new_value) =>
        console.log('prev_value, new_value:', prev_value, new_value);

    assert.throws(() => kk.watch(),
        'Проверка аргументов 1');

    assert.throws(() => kk.watch(test),
        'Проверка аргументов 2');

    assert.throws(() => kk.watch(test, 'WRONG'),
        'Проверка аргументов 3');

    assert.throws(() => kk.watch(null, callback),
        'Проверка аргументов 4');

    assert.throws(() => kk.watch(test, null, callback),
        'Проверка аргументов 5');

    assert.throws(() => kk.watch(test, test, callback),
        'Проверка аргументов 6');

    kk.watch(test, 'key', callback);
    assert.ok(
        'key' in test,
        'Прокси создан'
    );

    kk.watch(test, 'one', 'two', callback);
    assert.ok(
        'one' in test && 'two' in test,
        'Прокси создан: несколько ключей'
    );

    {
        let check = false;
        const test = {a: 82};

        const callback = () => check = true;

        kk.watch(test, 'a', callback);

        assert.equal(test.a, 82, 'Проверка исходного значения');

        test.a = 82;

        assert.notOk(
            check,
            `Не срабатывает, если присвоение значения есть, но оно не меняется`
        );

        test.a = 42;

        assert.ok(
            check,
            `Cрабатывает, если значение меняется`
        );

    }

//    assert.notOk(
//        kk.watch(test, 'key', callback),
//        'Попытка повторного создания'
//    );

    test.a = 10;
    test.key = 15;

    kk.watch(test, callback);

    assert.equal(test.a, 10,
        'Прокси создан для всех ключей, не изменяя их 1');

    assert.equal(test.key, 15,
        'Прокси создан для всех ключей, не изменяя их 2');

    kk.watch(test2, callback);
    assert.equal(test2.a2, 0,
        'Прокси создан для всех ключей, не изменяя их 3');
    assert.equal(test2.b2, 12,
        'Прокси создан для всех ключей, не изменяя их 4');

    test2.a2 = 10;

    {
        const done = assert.async();

        const test = {a: 1};
        const event = new kk.Event();

        kk.watch(test, 'a', event);

        event.addListener((o, n) => {
            assert.equal(n, 5, 'Вызов события по изменению');
            done();
        });

        test.a = 5;

    }


//    assert.throws(() => kk.watch(document.querySelectorAll('div'), callback),
//        'Проверка аргументов 4');
//
//    assert.throws(() => kk.watch([1, 2, 3], callback),
//        'Проверка аргументов 5');

});
