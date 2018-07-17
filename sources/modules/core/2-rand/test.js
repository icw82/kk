QUnit.test('rand', assert => {
    const each = kk.each;

    {
        const args = [10, 15];
        const label = 'Значения в заданном диапазоне';
        const numbers = Array(100).fill(0).map(x => kk.rand(...args));

        assert.ok(
            Math.min(...numbers) >= Math.min(...args) &&
            Math.max(...numbers) <= Math.max(...args),
            label
        );
    }

    {
        const args = [-5, 5];
        const label ='Значения в заданном диапазоне \
            (с отрицательным аргументом)';

        const numbers = Array(100).fill(0).map(x => kk.rand(...args));

        assert.ok(
            Math.min(...numbers) >= Math.min(...args) &&
            Math.max(...numbers) <= Math.max(...args),
            label
        );
    }

    {
        const args = [1];
        const label = 'Случайное 1-значное число';

        const numbers = Array(100).fill(0).map(x => kk.rand(...args));

        assert.ok(
            Math.min(...numbers) >= 0 &&
            Math.max(...numbers) <= 9,
            label
        );
    }

    {
        const args = [-1];
        const label = 'Случайное 1-значное число (отрицательный аргумент)';

        const numbers = Array(100).fill(0).map(x => kk.rand(...args));

        assert.ok(
            Math.min(...numbers) >= 0 &&
            Math.max(...numbers) <= 9,
            label
        );
    }

    {
        const args = [-1.82];
        const label = 'Случайное 1-значное число \
            (дробный отрицательный аргумент)';

        const numbers = Array(100).fill(0).map(x => kk.rand(...args));

        assert.ok(
            Math.min(...numbers) >= 0 &&
            Math.max(...numbers) <= 9,
            label
        );
    }

    {
        const args = [2];
        const label = 'Случайное n-значное число (максимум 15 знаков)';

        const numbers = Array(100).fill(0).map(x => kk.rand(...args));

        assert.ok(
            Math.min(...numbers) >= 10 &&
            Math.max(...numbers) <= 99,
            label
        );
    }

    {
        const args = [16];
        const label = 'Случайное n-значное число (максимум 15 знаков)';

        assert.throws(() => kk.rand(...args), label);
    }

    {
        const array = [1, `asd`, 9, null];
        const label = 'Случайный элемент массива';

        assert.ok(array.includes(kk.rand(array)), label);
    }

});
