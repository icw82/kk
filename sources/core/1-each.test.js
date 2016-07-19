QUnit.test("each", function(assert) {
    // TODO: не проверяется индекс при обратном переборе

    var each = kk.each,
        array = [5, null, 'a', 584, ['b', 12], {'t': 1, 'a': 2}, 0, 'a', 1],
        un = false,
        key = false,
        def = false;

    each (array, function(item, i) {
        if (item === 11)
            un = true;

        if (item === 'a') {
            key = i;
            return true;
        }
    }, function() {
        def = true;
    });
    assert.ok(!un, 'Несуществующий элемент массива');
    assert.equal(key, 2, 'Нахождение ключа элемента в массиве с остановкой');
    assert.ok(!def, 'Невыполнение дополнительной функции по окнчанию перебора');

    key = def = false;
    each (array, function(item, i) {
        if (item === 'a') {
            key = i;
        }
    }, function() {
        def = true;
    }, true);
    assert.ok(key == 2, 'Нахождение ключа элемента в массиве при обратном переборе');
    assert.ok(def, 'Выполенние дополнительной функции по окончании перебора');

    key = false;
    each (array, function(item, i) {
        if (item === 'a') {
            key = i;
            return true;
        }
    }, true);
    assert.ok(key == 7, 'Нахождение ключа элемента в массиве с остановкой при обратном переборе');

    un = key = false;
    each (4.9, function(item, i) {
        un = item;
        key = i;
    });
    assert.ok(typeof un == 'undefined' && key == 3, 'Не целое число (окр. в меньшую сторону)');

    un = key = false;
    each (42, function(item, i) {
        un = item;
        key = i;
    });
    assert.ok(typeof un == 'undefined' && key == 41, 'Псевдоперебор 42-х элементов');

    def = key = false;
    each ({length: 42}, function(item, i) {
        un = item;
        key = i;
    }, function() {
        def = true;
    });
    assert.ok(key === false && def === true, 'Объект со свойством Length');

    def = key = false;
    each (null, function(item, i) {
        key = i;
    }, function() {
        def = true;
    });
    assert.ok(key === false && def === true, 'Null');


    // TODO: ArrayBuffer
    var typedArray = new Uint8Array([75, 76, 77])
    def = key = false;
    var string = '';
    each (typedArray, function(item, i) {
        key = i;
        string += item;
    });
    assert.ok(string === '757677' && key === 2, 'ArrayBuffer');

    assert.equal(each (2, function() {return false}), false,
        'Возрващает результат итерации, если он есть (False)');
    assert.equal(each (['first', 'seccond'], function(item) {return item}), 'first',
        'Возрващает результат итерации, если он есть ("first")');
    assert.equal(each (2, function() {}), undefined,
        'Ничего не возвращает, если ни одна итерация ничего не возвратила или возрватила false');

    assert.equal(each (1, function() {}, function() {return 'default'}), 'default',
        'Возрващает результат функции по умолчанию, если он есть ("default")');
    assert.equal(each (1, function() {}, function() {}), undefined,
        'Ничего не возвращает, если функция по умолчанию ничего не возвращает');


    if (!kk.d) return false; // если нет DOM


    var counter = 0;
    each ('.test-each', function(item) {
        if (item instanceof Node)
            counter++;
    });
    assert.ok(counter == 7, 'Перебор элементов DOM');

    var counter = 0;
    each (document.querySelector('#dom-tests').children, function(item) {
        if (item instanceof Node)
            counter++;
    });
    assert.ok(counter == 7, 'Перебор HTML Коллекции');


});
