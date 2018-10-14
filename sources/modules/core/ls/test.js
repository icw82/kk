QUnit.test('LS', assert => {

    const text_ls_key = `test-ls`;

    localStorage.removeItem(text_ls_key);

    { // 1
        kk.ls.create(text_ls_key);

        assert.equal(
            JSON.parse(localStorage.getItem(text_ls_key)),
            null,
            `Создан и по умолчанию Null`
        )
    }

    localStorage.removeItem(text_ls_key);

    { // 2
        let value = kk.ls.create(text_ls_key, `TEST`);

        assert.equal(
            JSON.parse(localStorage.getItem(text_ls_key)),
            `TEST`,
            `Создан и по умолчанию 'TEST'`
        )

        // 3
        assert.equal(
            value,
            `TEST`,
            `При создании значение передано обратно`
        )

        // 4
        assert.equal(
            kk.ls.get(text_ls_key),
            `TEST`,
            `Значение получено`
        )

    }

    localStorage.removeItem(text_ls_key);

    { // 5
        kk.ls.set(text_ls_key, 1234);

        assert.equal(
            JSON.parse(localStorage.getItem(text_ls_key)),
            1234,
            `Создан`
        )
    }

    { // 6
        kk.ls.set(text_ls_key, 4321);

        assert.equal(
            JSON.parse(localStorage.getItem(text_ls_key)),
            4321,
            `Новое значение`
        )
    }

    { // 7
        kk.ls.remove(text_ls_key);

        assert.equal(
            localStorage.getItem(text_ls_key),
            void(0),
            `Запись удалена`
        )
        // 8
        assert.equal(
            localStorage.getItem(`@` + text_ls_key),
            void(0),
            `Запись удалена (временная отметка)`
        )
    }
});
