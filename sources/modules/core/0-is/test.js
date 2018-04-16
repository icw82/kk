QUnit.test('is', assert => {

    const is = kk.is;

    const test = {
        one: true
    }

    assert.ok(
        is.u(),
        'Нет аргументов'
    );

    assert.ok(
        is.u(void 0),
        'Один аргумент'
    );

    assert.ok(
        is.u(void 0, void 0, void 0),
        'Несколько аругментов'
    );

    assert.ok(
        is.u(void 0, undefined, test.two),
        'Несколько аругментов 2'
    );

    assert.notOk(
        is.u(void 0, test.one),
        'Провал'
    );

    assert.ok(
        is.s(''),
        'Строка'
    );

    assert.ok(
        is.s('', '', ''),
        'Строки'
    );


    assert.throws(() => kk.is.addTest('s', 'string'),
        'Тест с таким названием уже существует');

});
