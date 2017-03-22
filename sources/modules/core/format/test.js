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
