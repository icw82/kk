QUnit.test("Kenzo.each", function(assert){
    var each = kk.each,
        array = [5, null, 'a', 584, ['b', 12], {'t': 1, 'a': 2}, 0, 'a', 1],
        un = false,
        key = false,
        def = false;

    each (array, function(item, i){
        if (item === 11)
            un = true;

        if (item === 'a'){
            key = i;
            return true;
        }
    }, function(){
        def = true;
    });
    assert.ok(!un, 'Несуществующий элемент массива');
    assert.ok(key == 2, 'Нахождение ключа элемента в массиве с остановкой');
    assert.ok(!def, 'Невыполнение дополнительной функции по окнчанию перебора');

    key = def = false;
    each (array, function(item, i){
        if (item === 'a'){
            key = i;
        }
    }, function(){
        def = true;
    }, true);
    assert.ok(key == 2, 'Нахождение ключа элемента в массиве при обратном переборе');
    assert.ok(def, 'Выполенние дополнительной функции по окончании перебора');

    key = false;
    each (array, function(item, i){
        if (item === 'a'){
            key = i;
            return true;
        }
    }, true);
    assert.ok(key == 7, 'Нахождение ключа элемента в массиве с остановкой при обратном переборе');


    if (!kk.d) return false; // если нет DOM

    var counter = 0;
    each ('.test-each', function(item){
        if (item instanceof Node)
            counter++;
    });
    assert.ok(counter == 7, 'Перебор элементов DOM');

    un = key = false;
    each ({length: 42}, function(item, i){
        un = item;
        key = i;
    });
    assert.ok(typeof un == 'undefined' && key == 41, 'Псевдоперебор объекта со свойством Length');


    un = key = false;
    each (42, function(item, i){
        un = item;
        key = i;
    });
    assert.ok(typeof un == 'undefined' && key == 41, 'Псевдоперебор 42-х элементов');

});
