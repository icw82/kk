QUnit.test('find_ancestor', function(assert) {

    {
        let element = document.body.querySelector('#test-find-ancestor');

        assert.notOk(kk.find_ancestor(element, kk.generate_key()),
            'Несуществующий идентификатор или название класса');
        assert.ok(kk.find_ancestor(element, 'test-class'),
            'Нахождение предка');
        assert.ok(kk.find_ancestor(element, '.test-class'),
            'Нахождение по классу предка');
        assert.ok(kk.find_ancestor(element, '#dom-tests-2'),
            'Нахождение по идентификатору предка');

        assert.ok(kk.find_ancestor(element, '.test-class', 3),
            'Нахождение по классу предка c ограничением');
        assert.notOk(kk.find_ancestor(element, '.test-class', 2),
            'Ненахождение по классу предка c ограничением');

        assert.ok(kk.find_ancestor(element, [kk.generate_key(), '.test-class'], 3),
            'Нахождение по нескольким классам предков c ограничением');

        assert.notOk(kk.find_ancestor(element, [kk.generate_key(), kk.generate_key()], 3),
            'Ненахождение по нескольким классам предков c ограничением');
    }

});
