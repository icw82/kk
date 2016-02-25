//QUnit.test("Kenzo.proxy", function(assert) {
//
//    var test = {
//        a: 82
//    }
//
//    var callback = function() {
////        assert.ok(object, 'object');
////        assert.ok(property, 'property ');
////
////        console.log('object', object);
////        console.log('property', property);
//
//    }
//
//    assert.ok(!kk.proxy(), 'Проверка аргументов');
//    assert.ok(!kk.proxy(test), 'Проверка аргументов');
//    assert.ok(!kk.proxy(test, 'WRONG'), 'Проверка аргументов');
//    assert.ok(kk.proxy(test, 'key', callback), 'Прокси создан');
//
//    kk.proxy(test, 'a', callback);
//    assert.ok(test.a === 82, 'Значение изменено');
//
//    test.a = 10;
//    assert.ok(test.a !== 82, 'Значение не изменено');
//    assert.ok(test.a === 10, 'Значение изменено на неверное');
//
//
//    test.key = 15;
//    assert.ok(kk.proxy(test, callback), 'Прокси создан для всех ключей, не изменяя их');
//    assert.ok(test.a === 10, 'Прокси создан для всех ключей, не изменяя их');
//    assert.ok(test.key === 15, 'Прокси создан для всех ключей, не изменяя их');
//
//
//        // массив вторым аргументом
//
//});
