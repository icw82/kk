kk.get_buffer = function(/*url, [ranges,] in_one_request =  false*/) {
//    console.log(arguments);

    var args = Array.prototype.slice.call(arguments);

    return new Promise((resolve, reject) => {
        try {
            var url = args.shift();
            var ranges;
            var in_one_request = false;

            if (args.length > 1 && kk.is.b(args[args.length - 1]))
                in_one_request = args.pop();

            ranges = args;

//            console.log(url, ranges, in_one_request);

            if (!kk.is.s(url))
                reject('URL не задан');

            if (
                (ranges.length === 0) ||
                (ranges.length === 1 && ranges[0] === 0)
            ) {
                get_whole_file(url).then(resolve, reject);
                return;
            }

            // Валидация запроса
            ranges = ranges.map(function(item, i) {
                if (
                    kk.is.n(item) || (
                        kk.is.A(item) &&
                        kk.is.n(item[0]) && item[0] >= 0 &&
                        kk.is.n(item[1]) && item[1] >= 0
                    )
                ) {
                    return item;
                }

                return false;
            });

            // console.warn(ranges);

            if (in_one_request) {
                // TODO: Попилить классику, если она вообще нужна

                // var separator = (function(type){
                //     var out = type.match(/boundary=(.+)$/);
                //     if (out && out[1])
                //         return out[1];
                //     else
                //         return false;
                // })(xhr.getResponseHeader('Content-Type'));
                // var parts = get_separated_parts(xhr.response, separator);
                //
                // ranges.forEach(function(item) {
                //     if (item !== false) {
                //         response.push(parts.shift());
                //     } else {
                //         response.push(false);
                //     }
                // });
                // resolve(response);

            } else {
                if (ranges.length === 1) {
                    get_part(url, ranges[0]).then(resolve, reject);
                } else {
                    Promise.all(ranges.map(function(range, i) {
                        if (range !== false)
                            return get_part(url, range);
                    })).then(resolve, reject);
                }
            }

        } catch (error) {
            console.error(error);
            // throw error;
        }
    });
};

function range_to_string(range) {
    if (kk.is.n(range)) {
        if (range >= 0) {
            // Содержимое начиная с range байта файла
            return(range + '-');
        } else {
            // Содержимое начиная с range байта с конца файла
            return(range);
        }
    }

    if (kk.is.A(range) &&
        kk.is.n(range[0]) && range[0] >= 0 &&
        kk.is.n(range[1]) && range[1] >= 0
    ) {
        return(range[0] + '-' + range[1]);
    }
}

function get_whole_file(url) { return new Promise(function(resolve, reject) {
    try {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'arraybuffer';

        xhr.addEventListener('loadend', function(event) {
            if (xhr.status === 200) {
                resolve(convert_xhr(xhr));
            } else {
                reject({
                    url: xhr.responseURL,
                    status: xhr.status,
                    range: xhr.getResponseHeader('Content-Type')
                });
            }
        });

        xhr.send();

    } catch (error) {
        console.error(error);
        // throw error;
    }
})}

function get_part(url, range) { return new Promise(function(resolve, reject) {
    try {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'arraybuffer';
        xhr.setRequestHeader('Range', 'bytes=' + range_to_string(range));

        xhr.addEventListener('loadend', function(event) {
            if (xhr.status === 206) {
                if (xhr.getResponseHeader('Content-Range')) {
                    var response = convert_xhr(xhr);
                    response.range = range;
                    resolve(response);
                }
            } else {
                console.error(url, range, xhr.status);
                console.log('range >', xhr.getResponseHeader('Content-Type'));
                reject([url, range, xhr.status])
            }
        });

        xhr.send();

    } catch (error) {
        console.error(error);
        // throw error;
    }
})}

function convert_xhr(xhr) {
    return {
        'headers': xhr.getAllResponseHeaders(),
        'getHeader': function(name) {
            return xhr.getResponseHeader(name);
        },
        'content': xhr.response
    }
}

function get_separated_parts(response, separator) {
    var out = [];
    var ranges = separate(response, separator);

    ranges.forEach(function(item) {
        var headers = '';
        var headers_array = new Uint8Array(
            response,
            item.headers,
            item.begin - 4 - item.headers
        );

        headers_array.forEach(function(item) {
            headers += String.fromCharCode(item);
        });

        out.push({
            'headers': headers,
            'getHeader': function(header) {
                var regexp = new RegExp(header + ': (.+)');
                var matches = this.headers.match(regexp);
                return matches[1];
            },
            'content': response.slice(item.begin, item.end)
        });
    });

    return out;
};

function separate(response, separator){
    var view = new Uint8Array(response);
    var ranges = [];
    var cur = 0;
    // indian Magic (рождённое в муках)
    // Не знаю как, но это работает >__>
    // Поиск начала данных раздела
    while (cur < response.byteLength){
        if ((view[cur] === 45) && (view[cur + 1] === 45)){
            cur += 2;

            for (var i = 0; i < separator.length; i++) {
                if (separator.charCodeAt(i) === view[cur]){
                    if (i == separator.length - 1){
                        cur++;
                        // Если после разделителя идёт перенос
                        if (view[cur] === 13 && view[cur + 1] === 10){
                            cur += 2;
                            if (ranges.length > 0){
                                ranges[ranges.length - 1].end =
                                    cur - separator.length - 6;
                            }

                            ranges.push({headers: cur});

                            while (
                                cur < response.byteLength &&
                                !(view[cur + 2] === 45 && view[cur + 3] === 45)
                            ){
                                if (
                                    view[cur] === 13 && view[cur + 1] === 10 &&
                                    view[cur + 2] === 13 && view[cur + 3] === 10
                                ){
                                    cur += 4;
                                    break;
                                } else {
                                    cur++;
                                }
                            }

                            if (cur !== response.byteLength - 1)
                                ranges[ranges.length - 1].begin = cur;

                        } else if (view[cur] === 45 && view[cur + 1] === 45){
                            // Последние два дефиса
                            ranges[ranges.length - 1].end =
                                cur - separator.length - 4;
                        }
                    }
                } else {
                    break;
                }

                cur++;
            }
        } else {
            cur++;
        }
    }

    return ranges;
}
