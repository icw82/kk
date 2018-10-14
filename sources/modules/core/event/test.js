QUnit.test('Event', assert => {
    { // 1
        let event = new kk.Event();
        event.addListener(x => {
            assert.ok(true,
                'Событие вызвано')
        });
        event.dispatch();
    }

    { // 2
        let event = new kk.Event();
        event.addListener(x => {
            assert.equal(x, 'x',
                'Диспетчер передал данные');
        });
        event.dispatch('x');
    }

    { // 5
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

    { // 6
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

    { // 7 + 8
        let count = 0;
        let listener = () => {count++};
        let event = new kk.Event();
        event.complete();

        assert.ok(event.state.completed,
            'Получено состояние: Событие произошло');

        event.addListener(listener);
        event.addListener(listener);
        event.addListener(listener);

        event.dispatch();

        assert.equal(count, 3,
            'Событие произошло и слушатели обрабатываются сразу');

    }

});
