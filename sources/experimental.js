isIE8 = /MSIE\s([\d\.]+)/.exec(navigator.userAgent)
isIE8 = isIE8 ? parseFloat(isIE8[1]) : null;

function to_white(r, g, b) {
    var min = Math.min(r, g, b);
    var k = (255 - min) / 255;

    return [
        Math.round((r - min) / k),
        Math.round((g - min) / k),
        Math.round((b - min) / k),
        Math.round(k * 1000) / 1000
    ]
}

// Function.length — количество аргументов, ожидаемых функцией.
// Свойство function.name возвращает имя функции

/*
 *  Метод добавляет элемент в массив.
 *  Если length задан и если длина массива больше length,
 *  то массив будет сокращён до длины length.
 */
if (isIE8 != 8) {
    Array.prototype.stack = function() {
        this.unshift( arguments[0] );
        if (typeof arguments[1] == 'number') {
            while (this.length > arguments[1])
                this.pop();
        }

    }; Object.defineProperty(Array.prototype, 'stack', {
        enumerable: false,
        configurable: false,
        writable: false
    });
}

function Array_Stack() {
    if (isIE8 != 8) {

        arguments[0].stack(arguments[1], arguments[2])
        return arguments[0];

    }else{
        arguments[0].unshift( arguments[1] );

        if (typeof arguments[2] == 'number') {
            while (arguments[0].length > arguments[2])
                arguments[0].pop();
        }

        return arguments[0];
    }
}


/*
 *    Метод удаляет элементы массива по их значению.
 */
if (isIE8 != 8) {
    Array.prototype.remove = function() {
        if (
            (typeof arguments[0] != 'string') &&
            (typeof arguments[0] != 'number') &&
            (typeof arguments[0] != 'boolean')
        ) return false;

        var
            clone = [],
            keys = Object.keys(this);

        // Уничтожение старого массива
        for (var i = 0; i < keys.length; i++) {
            if (arguments[0] !== this[keys[i]])
                clone.push(this[keys[i]]);
            delete this[keys[i]];
        }

        // Создание нового массива
        for (var i = 0; i < clone.length; i++)
            this[i] = clone[i];

        this.length = clone.length;

    }; Object.defineProperty(Array.prototype, 'remove', {
        enumerable: false,
        configurable: false,
        writable: false
    });

    function Array_Remove() {
        return arguments[0].remove(arguments[1]);
    }
}else{
    // Для старого дерьма
    function Array_Remove() {
        if (
            (typeof arguments[1] != 'string') &&
            (typeof arguments[1] != 'number') &&
            (typeof arguments[1] != 'boolean')
        ) return false;

        var
            clone = [],
            keys = [];

        for (var i in arguments[0]) {
            if (typeof arguments[0][i] != 'undefined')
                keys.push(i);
        }

        // Уничтожение старого массива
        for (var i = 0; i < keys.length; i++) {
            if (arguments[1] !== arguments[0][keys[i]])
                clone.push(arguments[0][keys[i]]);
            delete arguments[0][keys[i]];
        }

        // Создание нового массива
        for (var i = 0; i < clone.length; i++)
            arguments[0][i] = clone[i];

        arguments[0].length = clone.length;

        return arguments[0];
    }
}


/*
 *  Функция преобразует входящий объект в список (массив «ключ — значение»),
 *  где Ключ — это путь до значения в объекте.
 *  Вид ключа:
 *     object.example.path
 *  Если в объекте значение object.example.path — это тоже объект,
 *  то ключ object.example.path будет содержать массив с ключами объекта\
 *  UPDATE 19.09.2013: Исполнение функций.
 */
function make_links() {
    (typeof arguments[2] != 'undefined') || (arguments[2] = {})

    for (var i in arguments[0]) {
        var
            path = (typeof arguments[1] != 'undefined') ? arguments[1] + '.' + i : i,
            result = arguments[0][i];

        if (typeof result == 'function') {
            result = result();
        }

        if (typeof result == 'object') {
            var keys = [];
            for (var j in result)
                keys.push(j);
            arguments[2][path] = keys;

            arguments.callee(result, path, arguments[2]);
        }else{
            arguments[2][path] = result;
        }
    }

    return arguments[2];
}


function kenzoOnResizeSet() {
    var ROOT = $('body');
    var W = ROOT.width();

    if (W<=1220)
        ROOT.addClass('m1000');
    else
        ROOT.removeClass('m1000');
}

// Сбор информации
//function kzInfo() {
//    this.ua = navigator.userAgent;
//    this.pattern = {
//        ie: /MSIE\s([\d\.]+)/
//    },
//
//    // Версия Internet Explorer
//    this.ie = this.pattern.ie.exec(this.ua);
//    this.ie = this.ie ? parseFloat(this.ie[1]) : null;
//
//};

function kzInfo() {
    this.ua = navigator.userAgent;

    this.pattern = {
        ie: /MSIE\s([\d\.]+)/,
        opera: /Opera.+Version\/([\d\.\d]+)/,
        ios: /AppleWebKit.+Version\/([\d\.\d]+).+ Mobile/,
    },

    // Версия Internet Explorer
    this.ie = this.pattern.ie.exec(this.ua);
    this.ie = this.ie ? parseFloat(this.ie[1]) : null;
    Number(this.ie);

    this.opera = this.pattern.opera.exec(this.ua);
    this.opera = this.opera ? parseFloat(this.opera[1]) : null;
    Number(this.opera);

    this.ios = this.pattern.ios.exec(this.ua);
    this.ios = this.ios ? parseFloat(this.ios[1]) : null;
    Number(this.ios);

};

// Функции для анимации
// Автор: George McGinley Smith, 2008

var info = new kzInfo();


function readObject(o) {
    if(typeof(o) == 'array' || typeof(o) == 'object') {
        out = '<ul>';

        for(p in o) {
            if(typeof(o[p]) == 'array' || typeof(o[p]) == 'object') {
                out += '<li><strong class="key">['+p+']</strong> → <em>'+typeof(o[p])+'</em>';
                out += readObject(o[p]);
                out += '</li>';
            }else{
                if(typeof(o[p]) != 'function')
                    out += '<li><strong class="key">['+p+']</strong> → <em class="value">'+o[p]+'</em></li>';
            }
        }

        out += '</ul>';

        return out;
    }else
        return '<em class="value">'+o+'</em>';
}


var kzCurrentlyPressedKeys = [];

window.addEventListener('keydown', function(event) {
    var pos = kzCurrentlyPressedKeys.indexOf(event.keyCode);

    if (pos === -1)
        kzCurrentlyPressedKeys.push(event.keyCode);
});

window.addEventListener('keyup', function(event) {
    var pos = kzCurrentlyPressedKeys.indexOf(event.keyCode);

    if (pos > -1)
        kzCurrentlyPressedKeys.splice(pos, 1);
});


(function() {
    // небольшая типографская правка (Русскоязычная)
    // 2014-10-30
    var typo = function(html) {
        html = html.replace(/\s+/g, ' ');
        //html = html.replace(/\!+/g, '!');
        //html = html.replace(/\?+/g, '?!');
        //html = html.replace(/\?+!+/g, '?!');
        html = html.replace(/([,\.])\s+/g, '$1 ');
        html = html.replace(/\s+([,\.])/g, '$1 ');

        html = html.replace(/ (-|–|--) /g, ' — ');
        html = html.replace(/(\d{4})(-|–|--)(\d{4})\s?(год|гг)/gi, '$1—$3 $4');
        html = html.replace(/(\d+)(x|х)(\d+)/gi, '$1×$3');

        html = html.replace(/ ([уаояи]) /gi, ' $1 ');
        html = html.replace(/ ([вдкпс]о?|за?|изо?|над?|не|обо?|ото?|подо?) /gi, ' $1 ');
        html = html.replace(/ ([втм]ы|она?|е[её]|их) /gi, ' $1 ');

        html = html.replace(/\((c|с)\)/gi, '©');
        html = html.replace(/\((r)\)/gi, '®');
        html = html.replace(/\s+кв. (к?м?м)/gi, ' $1²');
        html = html.replace(/\s+куб. (к?м?м)/gi, ' $1³');
        html = html.replace(/&lt;&lt;=/g, '«');
        html = html.replace(/&gt;&gt;=/g, '»');
        html = html.replace(/&lt;(-|–|--|—)+/g, '←');
        html = html.replace(/(-|–|--|—)+&gt;/g, '→');
        html = html.replace(/&lt;=/g, '≤');
        html = html.replace(/&gt;=/g, '≥');
        html = html.replace(/(\+-|-\+)/g, '±');

        return html;
    }

    // форматирование чисел
    var numbers = function(html) {
        html = html.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
        return html;
    }

    // Антивизивиг. Против Произвола б-мерзкого визивига.
    var antiwysiwyg = function(html) {
        html = html.replace(/(&nbsp;)+/g, ' ');
        html = html.replace(/( style=".*?")/g, '');
        html = html.replace(/( class="MsoNormal")/g, '');
        html = html.replace(/<span>(.*?)<\/span>/g, '$1');

        return html;
    }

    var blocks = document.querySelectorAll('[data-kz]');

    each (blocks, function(item) {
        var values = item.getAttribute('data-kz').split(' ');

        if (values.indexOf('antiwysiwyg') > -1)
            item.innerHTML = antiwysiwyg(item.innerHTML);

        if (values.indexOf('typo') > -1)
            item.innerHTML = typo(item.innerHTML);

        if (values.indexOf('numbers') > -1)
            item.innerHTML = numbers(item.innerHTML);

    });
})();
