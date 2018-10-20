QUnit.test('format.number', assert => {
    assert.ok(kk.format.number(111222333) == '111 222 333');
    assert.ok(kk.format.number('111222333') == '111 222 333');
    assert.ok(kk.format.number('1222333') == '1 222 333');
    assert.ok(kk.format.number('1333') == '1 333');

});

QUnit.test('format.phone', assert => {
    assert.ok(kk.format.phone('+70000000000') == '+7 (000) 000-00-00');
    assert.ok(kk.format.phone('80000000000') == '+7 (000) 000-00-00');
    assert.ok(kk.format.phone('8     0000000000') == '+7 (000) 000-00-00');
    assert.ok(kk.format.phone('80zz000000000') == '+7 (000) 000-00-00');
    assert.ok(kk.format.phone('+7++0000000000') == '+7 (000) 000-00-00');
    assert.ok(kk.format.phone('+7(0000)000000') == '+7 (000) 000-00-00');

});

QUnit.test('format.camelize', assert => {
    assert.equal(
        kk.format.camelize('oneTwo-three_four –Five--six___Seven—Eight8'),
        'OneTwoThreeFourFiveSixSevenEight8'
    );

    assert.equal(
        kk.format.camelize('oneTwo-three_four –Five--six___Seven—Eight8', true),
        'oneTwoThreeFourFiveSixSevenEight8'
    );

    assert.equal(
        kk.format.camelize('-one-Two'),
        'OneTwo'
    );

});

QUnit.test('format.decamelize', assert => {
    assert.equal(
        kk.format.decamelize('oneTwo-three_four –Five--six___Seven—Eight8'),
        'one-two-three-four-five-six-seven-eight8'
    );
});

QUnit.test('format.capitalize', assert => {
    assert.equal(
        kk.format.capitalize('one Two three'),
        'One Two three'
    );
});

QUnit.test("plural", function(assert) {

    var forms = ['1', '2', '3'];

    assert.equal(kk.format.plural(0, forms), '3');
    assert.equal(kk.format.plural(1, forms), '1');
    assert.equal(kk.format.plural(2, forms), '2');
    assert.equal(kk.format.plural(3, forms), '2');
    assert.equal(kk.format.plural(4, forms), '2');
    assert.equal(kk.format.plural(5, forms), '3');
    assert.equal(kk.format.plural(6, forms), '3');
    assert.equal(kk.format.plural(7, forms), '3');
    assert.equal(kk.format.plural(8, forms), '3');
    assert.equal(kk.format.plural(9, forms), '3');
    assert.equal(kk.format.plural(10, forms), '3');
    assert.equal(kk.format.plural(11, forms), '3');
    assert.equal(kk.format.plural(21, forms), '1');
    assert.equal(kk.format.plural(32, forms), '2');
    assert.equal(kk.format.plural(55, forms), '3');


    assert.ok(kk.format.plural(0.1, forms) === '3', 'Дробные 1');
    assert.ok(kk.format.plural(0.2, forms) === '3', 'Дробные 2');
    assert.ok(kk.format.plural(0.5, forms) === '3', 'Дробные 3');

    assert.ok(kk.format.plural([0,0,0], forms) === '2', 'массив в качестве первого аргумента');

    // Старый способ
    assert.equal(kk.format.plural(0, '1', '2', '3'), '3');
    assert.equal(kk.format.plural(1, '1', '2', '3'), '1');
    assert.equal(kk.format.plural(2, '1', '2', '3'), '2');
    assert.equal(kk.format.plural(3, '1', '2', '3'), '2');
    assert.equal(kk.format.plural(4, '1', '2', '3'), '2');
    assert.equal(kk.format.plural(5, '1', '2', '3'), '3');
    assert.equal(kk.format.plural(6, '1', '2', '3'), '3');
    assert.equal(kk.format.plural(7, '1', '2', '3'), '3');
    assert.equal(kk.format.plural(8, '1', '2', '3'), '3');
    assert.equal(kk.format.plural(9, '1', '2', '3'), '3');
    assert.equal(kk.format.plural(10, '1', '2', '3'), '3');
    assert.equal(kk.format.plural(11, '1', '2', '3'), '3');
    assert.equal(kk.format.plural(21, '1', '2', '3'), '1');
    assert.equal(kk.format.plural(32, '1', '2', '3'), '2');
    assert.equal(kk.format.plural(55, '1', '2', '3'), '3');

});
