QUnit.test("Kenzo.plural", function(assert){

    var forms = ['1', '2', '3'];

    assert.equal(kk.plural(0, forms), '3');
    assert.equal(kk.plural(1, forms), '1');
    assert.equal(kk.plural(2, forms), '2');
    assert.equal(kk.plural(3, forms), '2');
    assert.equal(kk.plural(4, forms), '2');
    assert.equal(kk.plural(5, forms), '3');
    assert.equal(kk.plural(6, forms), '3');
    assert.equal(kk.plural(7, forms), '3');
    assert.equal(kk.plural(8, forms), '3');
    assert.equal(kk.plural(9, forms), '3');
    assert.equal(kk.plural(10, forms), '3');
    assert.equal(kk.plural(11, forms), '3');
    assert.equal(kk.plural(21, forms), '1');
    assert.equal(kk.plural(32, forms), '2');
    assert.equal(kk.plural(55, forms), '3');


    assert.ok(kk.plural(0.1, forms) === '3', 'Дробные 1');
    assert.ok(kk.plural(0.2, forms) === '3', 'Дробные 2');
    assert.ok(kk.plural(0.5, forms) === '3', 'Дробные 3');

    assert.ok(kk.plural([0,0,0], forms) === '2', 'массив в качестве первого аргумента');
    assert.ok(kk.plural({one:1, two:2}, forms) === '2', 'объект в качестве первого аргумента');

    assert.ok(kk.plural('ru'), 'Успешный выбор языка');

    // Старый способ
    assert.equal(kk.plural(0, '1', '2', '3'), '3');
    assert.equal(kk.plural(1, '1', '2', '3'), '1');
    assert.equal(kk.plural(2, '1', '2', '3'), '2');
    assert.equal(kk.plural(3, '1', '2', '3'), '2');
    assert.equal(kk.plural(4, '1', '2', '3'), '2');
    assert.equal(kk.plural(5, '1', '2', '3'), '3');
    assert.equal(kk.plural(6, '1', '2', '3'), '3');
    assert.equal(kk.plural(7, '1', '2', '3'), '3');
    assert.equal(kk.plural(8, '1', '2', '3'), '3');
    assert.equal(kk.plural(9, '1', '2', '3'), '3');
    assert.equal(kk.plural(10, '1', '2', '3'), '3');
    assert.equal(kk.plural(11, '1', '2', '3'), '3');
    assert.equal(kk.plural(21, '1', '2', '3'), '1');
    assert.equal(kk.plural(32, '1', '2', '3'), '2');
    assert.equal(kk.plural(55, '1', '2', '3'), '3');

});
