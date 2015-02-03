QUnit.test("Kenzo.toggle_class", function(assert){
    if (!kk.d) return false; // если нет DOM

    var testarea = document.querySelector('#dom-tests');

    assert.ok(!kk.toggle_class(false), 'Проверка на элемент DOM');


    function test(current, classes, mask, result, comment){
        var element = document.createElement('div');

        if (!comment)
            comment = '';

        if (current){
            if (typeof current === 'string')
                current = [current];

            each (current, function(cls){
                if (typeof cls !== 'string'){
                    console.warn('!!')
                    return false;
                }

                element.classList.add(cls);
            });
        }

        if (mask)
            var test_result = kk.toggle_class(element, classes, mask, false);
        else
            var test_result = kk.toggle_class(element, classes);

        if (result instanceof Array){
            if (element.classList.length === result.length){
                if (result.length === 0){
                    assert.ok(true, comment);
                } else {
                    each (result, function(cls){
                        if (!element.classList.contains(cls)){
                            assert.ok(false, comment + ' (несовпадение слассов)');
                            return true;
                        }
                    }, function(){
                        assert.ok(true, comment);
                    });
                }

            } else {
                assert.ok(false, comment + ' (несовпадение длины)');

                console.log(current, classes, mask, result);
                console.log(element);
            }

        } else {
            assert.ok(!test_result, comment);
        };
    }

    test (null, 'a', false, ['a'],
        'второй аргумент может быть строкой');

    test (null, ['a'], false, ['a'],
        'второй аргумент может быть массивом из строк');

    test (null, {0: 'a'}, false, false,
        'второй аргумент может быть только массивом из строк');

    test (null, 12, false, false,
        'второй аргумент может быть только массивом из строк');

    test (null, [12], false, false,
        'второй аргумент может быть только массивом из строк');

    (function(){
        var element = document.createElement('div');
        testarea.appendChild(element);
        element.classList.add('c1');
        kk.toggle_class(element, 'c1');

        assert.ok(element.classList.length === 0 && !element.classList.contains('c1'),
            'существующий класс убирается');
    })();

    (function(){
        var element = document.createElement('div');
        testarea.appendChild(element);
        kk.toggle_class(element, 'c1', 'c1');

        assert.ok(!kk.toggle_class(element, 'c1', 'c1'),
            '(null, c1, c1, null) список (возможных классов) не массив');
    })();

    (function(){
        var element = document.createElement('div');
        testarea.appendChild(element);
        kk.toggle_class(element, ['c1'], ['c1']);

        assert.ok(element.classList.length === 1 && element.classList.contains('c1'),
            '(null, [c1], [c1], null) список — массив');
    })();

    (function(){
        var element = document.createElement('div');
        element.classList.add('c1');
        element.classList.add('c2');
        element.classList.add('c3');
        testarea.appendChild(element);
        kk.toggle_class(element, ['c1'], ['c1', 'c2']);

        assert.ok(element.classList.length === 1 && element.classList.contains('c3'),
            '([c1, c2, c3], [c1], [c1, c2], null) → c3 — переключать имеющиеся классы');
    })();

    (function(){
        var element = document.createElement('div');
        element.classList.add('c2');
        element.classList.add('c3');
        testarea.appendChild(element);
        kk.toggle_class(element, ['c1'], ['c1', 'c2']);

        assert.ok(
            element.classList.length === 2 &&
            element.classList.contains('c1') &&
            element.classList.contains('c3'),
            '([c2, c3], [c1], [c1, c2], null) →  c1 + c3 — переключать имеющиеся классы');
    })();


    test (['a', 'b', 'c'], ['a'], ['a', 'b'], ['a', 'c'],
        'не переключать имеющиеся классы');

    test (['b', 'c'], ['a'], ['a', 'b'], ['a', 'c'],
        'не переключать имеющиеся классы');

});
