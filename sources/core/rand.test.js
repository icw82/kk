QUnit.test("Kenzo.rand", function(assert){
    var each = kk.each,
        max = 12,
        min = 12;

    each (100, function(){
        var result = kk.rand(10, 15);

        if (result > max) max = result;
        if (result < min) min = result;
    });
    assert.ok((min == 10) && (max == 15),
        'Значения в заданном диапазоне');

    max = min = 0;
    each (100, function(){
        var result = kk.rand(-5, 5);

        if (result > max) max = result;
        if (result < min) min = result;
    });
    assert.ok((min == -5) && (max == 5),
        'Значения в заданном диапазоне (с отрицательный аргументов)');


    max = min = 5;
    each (100, function(){
        var result = kk.rand(1);

        if (result > max) max = result;
        if (result < min) min = result;
    });
    assert.ok((min === 0) && (max == 9),
        'Случайное 1-значное число');


    max = min = 5;
    each (100, function(){
        var result = kk.rand(-1);

        if (result > max) max = result;
        if (result < min) min = result;
    });
    assert.ok((min === 0) && (max == 9),
        'Случайное 1-значное число (отрицательный аргумент)');

    max = min = 5;
    each (100, function(){
        var result = kk.rand(-1.82);

        if (result > max) max = result;
        if (result < min) min = result;
    });
    assert.ok((min === 0) && (max == 9),
        'Случайное 1-значное число (дробный отрицательный аргумент)');


    max = min = 50;
    each (1000, function(){
        var result = kk.rand(2);

        if (result > max) max = result;
        if (result < min) min = result;
    });
    assert.ok((min === 10) && (max == 99),
        'Случайное n-значное число');

});
