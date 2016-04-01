QUnit.test('proxy', function(assert) {

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

    assert.notOk(kk.proxy(), 'Проверка аргументов 1');
    assert.notOk(kk.proxy(test), 'Проверка аргументов 2');
    assert.notOk(kk.proxy(test, 'WRONG'), 'Проверка аргументов 3');
    assert.notOk(kk.proxy(document.querySelectorAll('div'), callback),
        'Проверка аргументов 4');
    assert.notOk(kk.proxy([1, 2, 3], callback),
        'Проверка аргументов 5');

    assert.ok(kk.proxy(test, 'key', callback), 'Прокси создан');
    assert.ok('key' in test, 'Прокси создан 2');

    assert.notOk(kk.proxy(test, 'key', callback), 'Попытка повторного создания');
//    console.log('----------------------');

    assert.equal(test.a, 82, 'Проверка значения');

    test.a = 10;
    assert.equal(test.a, 10, 'Изменение значения');

    test.key = 15;
    assert.ok(kk.proxy(test, callback), 'Прокси создан для всех ключей, не изменяя их');
    assert.equal(test.a, 10, 'Прокси создан для всех ключей, не изменяя их');
    assert.equal(test.key, 15, 'Прокси создан для всех ключей, не изменяя их');

    assert.ok(kk.proxy(test2, callback), 'Прокси создан для всех ключей, не изменяя их');
    assert.equal(test2.a2, 0, 'Прокси создан для всех ключей, не изменяя их');
    assert.equal(test2.b2, 12, 'Прокси создан для всех ключей, не изменяя их');

    test2.a2 = 10;
    console.log(Object.keys(test2));

        // массив вторым аргументом

});
