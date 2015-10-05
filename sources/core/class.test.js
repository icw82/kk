QUnit.test("Kenzo.class", function(assert) {
    if (!kk.d) return false; // если нет DOM

    var testarea = document.querySelector('#dom-tests');

    function test(current, classes, mask, result, comment) {
        var element = document.createElement('div');

        if (!comment)
            comment = '';

        if (current) {
            if (typeof current === 'string')
                current = [current];

            each (current, function(cls) {
                if (typeof cls !== 'string') {
                    console.warn('!!')
                    return false;
                }

                element.classList.add(cls);
            });
        }

        if (mask) {
            var test_result = kk.class(element, classes, mask);
        } else {
            var test_result = kk.class(element, classes);
        }

        if (result instanceof Array) {
            if (!test_result) {
                assert.ok(false, comment + ' (функция не выполнена)');
            } else if (element.classList.length === result.length) {
                if (result.length === 0) {
                    assert.ok(true, comment);
                } else {
                    each (result, function(cls) {
                        if (!element.classList.contains(cls)) {
                            assert.ok(false, comment + ' (несовпадение слассов)');
                            return true;
                        }
                    }, function() {
                        assert.ok(true, comment);
                    });
                }

            } else {
                assert.ok(false, comment + ' (несовпадение длины)');
            }

        } else {
            assert.ok(!test_result, comment);
        };
    }

    assert.ok(!kk.class(), 'Проверка на элемент DOM');

    test (null, {0: 'a'}, false, false,
        'второй аргумент может быть только массивом строк');

    test (null, 12, false, false,
        'второй аргумент может быть только массивом строк (не число)');

    test (null, [12], false, false,
        'второй аргумент может быть только массивом строк');

    test (
        ['a', 'c'],
        'a',
        ['a', 'b'],
        ['a', 'c'],
        'второй аргумент может быть строкой');

    test (
        ['a'],
        ['a'],
        ['a', 'b'],
        ['a'],
        'маска больше');

    test (
        ['a', 'b', 'c', 'd'],
        ['a', 'c', 'f'],
        ['a', 'b', 'e'],
        ['a', 'c', 'd', 'f'],
        'возможные варианты');

});
