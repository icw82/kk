QUnit.test('get_buffer', assert => {
    let test_count = 0;
    let test_file_url = 'buffer-test.txt';
    let test_file_content =
        'BUFFER-TEST12334567890abcdefghijklmnopqrstuvwxyz\n';

    {
        test_count++;
        let label = 'Без аргументов';

        kk.get_buffer().then(result => {
            assert.ok(false, label);
            done();
        }, error => {
            assert.ok(true, label);
            done();
        });
    }

    {
        test_count++;
        let label = 'Целый (1)';

        kk.get_buffer(test_file_url).then(result => {
            const view = new Uint8Array(result.content);
            const string = kk.i8ArrayToString(view);
            assert.ok(string === test_file_content, label);
            done();
        }, error => {
            assert.ok(false, label);
            done();
        });
    }

    {
        test_count++;
        let label = 'Целый (2)';

        kk.get_buffer(test_file_url, 0).then(result => {
            const view = new Uint8Array(result.content);
            const string = kk.i8ArrayToString(view);
            assert.ok(string === test_file_content, label);
            done();
        }, error => {
            assert.ok(false, label);
            done();
        });
    }

    {
        test_count++;
        let label = 'Срез 30';

        kk.get_buffer(test_file_url, 30).then(result => {
            const view = new Uint8Array(result.content);
            const string = kk.i8ArrayToString(view);
            assert.ok(string === test_file_content.substring(30), label);
            done();
        }, error => {
            assert.ok(false, label);
            done();
        });
    }

    {
        test_count += 4;
        let label = 'Три среза и один неправильный аргумент';

        kk.get_buffer(test_file_url, [5, 10], [0, 5], '', -5).then(result => {
            assert.ok(kk.is_u(result[2]), 'один неправильный аргумент');
            done();

            {
                let view = new Uint8Array(result[0].content);
                let string = kk.i8ArrayToString(view);
                assert.equal(string, test_file_content.substring(5, 11), label);
                done();
            }
            {
                let view = new Uint8Array(result[1].content);
                let string = kk.i8ArrayToString(view);
                assert.equal(string, test_file_content.substring(0, 6), label);
                done();
            }
            {
                let view = new Uint8Array(result[3].content);
                let string = kk.i8ArrayToString(view);
                assert.equal(string,
                    test_file_content.substring(test_file_content.length - 5), label);
                done();
            }
        }, error => {
            assert.ok(false, label);
            done();
        });
    }

    assert.expect( test_count );
    const done = assert.async( test_count );
});
