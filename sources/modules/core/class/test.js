QUnit.test('class', function(assert) {

    const create_element = classes => {
        const element = document.createElement('div');

        if (typeof classes === 'sting')
            classes = [classes];

        if (classes instanceof Array)
            classes.forEach(item => element.classList.add(item));

        return element;
    }

    {
        const label = 'Проверка на элемент DOM';

        assert.throws(() => kk.class(null), label);
    }

    {
        const label = 'Второй аргумент может быть только массивом строк 1';

        const element = create_element();
        const classes = 12;
        const mask = null;

        assert.throws(() => kk.class(element, classes, mask), label);
    }

    {
        const label = 'Второй аргумент может быть только массивом строк 2';

        const element = create_element();
        const classes = {0: 'a'};
        const mask = null;

        assert.throws(() => kk.class(element, classes, mask), label);
    }

    {
        const label = 'Второй аргумент может быть только массивом строк 3';

        const element = create_element();
        const classes = [12];
        const mask = null;

        assert.throws(() => kk.class(element, classes, mask), label);
    }

    {
        const label = 'Второй аргумент может быть строкой (о как)';

        const element = create_element(['a', 'c']);

        const classes = 'a';
        const mask = ['a', 'b'];

        kk.class(element, classes, mask);

        const expected = ['a', 'c'];

        assert.ok(
            expected
                .filter(item => !element.classList.contains(item))
                .length === 0,
            label
        );
    }

    {
        const label = 'Маска больше';

        const element = create_element(['a']);

        const classes = ['a'];
        const mask = ['a', 'b'];

        kk.class(element, classes, mask);

        const expected = ['a'];

        assert.ok(
            expected
                .filter(item => !element.classList.contains(item))
                .length === 0,
            label
        );
    }

    {
        const label = 'Возможные варианты';

        const element = create_element(['a', 'b', 'c', 'd']);

        const classes = ['a', 'c', 'f'];
        const mask = ['a', 'b', 'e'];

        kk.class(element, classes, mask);

        const expected = ['a', 'c', 'd', 'f'];

        assert.ok(
            expected
                .filter(item => !element.classList.contains(item))
                .length === 0,
            label
        );
    }

});
