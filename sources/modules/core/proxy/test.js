QUnit.test('proxy', assert => {

    var test = {
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

    var callback = function(object, property) {
        console.log('object', object);
        console.log('property', property);
    }

    assert.throws(() => kk.proxy(),
        'Проверка аргументов 1');
    assert.throws(() => kk.proxy(test),
        'Проверка аргументов 2');
    assert.throws(() => kk.proxy(test, 'WRONG'),
        'Проверка аргументов 3');
    assert.throws(() => kk.proxy(document.querySelectorAll('div'), callback),
        'Проверка аргументов 4');
    assert.throws(() => kk.proxy([1, 2, 3], callback),
        'Проверка аргументов 5');

    kk.proxy(test, 'key', callback);
    assert.ok('key' in test, 'Прокси создан');

//    assert.notOk(
//        kk.proxy(test, 'key', callback),
//        'Попытка повторного создания'
//    );

    assert.equal(test.a, 82,
        'Проверка значения');

    test.a = 10;
    assert.equal(test.a, 10,
        'Изменение значения');

    test.key = 15;

    kk.proxy(test, callback);
    assert.equal(test.a, 10,
        'Прокси создан для всех ключей, не изменяя их 1');
    assert.equal(test.key, 15,
        'Прокси создан для всех ключей, не изменяя их 2');

    kk.proxy(test2, callback);
    assert.equal(test2.a2, 0,
        'Прокси создан для всех ключей, не изменяя их 3');
    assert.equal(test2.b2, 12,
        'Прокси создан для всех ключей, не изменяя их 4');

    test2.a2 = 10;

    // массив вторым аргументом

});
