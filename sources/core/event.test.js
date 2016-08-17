QUnit.test('Event', function(assert) {
    {
        let event = new kk.Event();
        event.addListener(x => {
            assert.ok(true,
                'Событие вызвано')
        });
        event.dispatch();
    }

    {
        let event = new kk.Event();
        event.addListener(x => {
            assert.equal(x, 'x',
                'Диспетчер передал данные');
        });
        event.dispatch('x');
    }

    {
        let key = kk.generate_key(5);
        let event = new kk.Event(key);
        event.addListener(x => {
            assert.equal(x, 'z',
                'Событие вызвано с ключём и диспетчер передал данные');
        });
        event.dispatch(key, 'z');
    }

    {
        let key = kk.generate_key(5);
        let event = new kk.Event(key);
        event.addListener(x => {
            assert.ok(false,
                'Диспетчер не должен отвечать, если ключ не совпадает')
        });
        event.dispatch('y');
    }

    {
        let count = 0;
        let listener = () => {count++};
        let event = new kk.Event();
        event.addListener(listener);
        event.addListener(listener);
        event.addListener(listener);
        event.dispatch();
        assert.equal(count, 1,
            'Слушатель вызывается один раз')
    }

    {
        let count = 0;
        let listener = () => {count++};
        let event = new kk.Event();
        event.addListener(listener);
        event.dispatch();
        event.removeListener(listener);
        event.dispatch();

        assert.equal(count, 1,
            'Удаление слушателя');
    }

    {
        let count = 0;
        let listener = () => {count++};
        let event = new kk.Event();
        event.complete();

        event.addListener(listener);
        event.addListener(listener);
        event.addListener(listener);

        event.dispatch();

        assert.equal(count, 3,
            'Событие произошло и слушатели обрабатываются сразу');
    }

});
