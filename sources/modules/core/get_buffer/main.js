// TODO: возможность задавать промежутки разными способами
//       (начало--конец, начало--длина).

/*
Examples of byte-ranges-specifier values (assuming an entity-body of
length 10000):

   - The first 500 bytes (byte offsets 0-499, inclusive):
     bytes=0-499

   - The second 500 bytes (byte offsets 500-999, inclusive):
     bytes=500-999

   - The final 500 bytes (byte offsets 9500-9999, inclusive):
     bytes=-500

   - Or bytes=9500-

   - The first and last bytes only (bytes 0 and 9999):
     bytes=0-0,-1

   - Several legal but not canonical specifications of the second 500
     bytes (byte offsets 500-999, inclusive):
     bytes=500-600,601-999
     bytes=500-700,601-999

*/

kk.get_buffer = function(url /*[, range1[, rangeN]]*/) {
    //var args = (arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments));
    var ranges = kk._A.prototype.slice.call(arguments).splice(1);

    return new Promise(function(resolve, reject) {
        if (!kk.is_s(url))
            throw kk.err.ia;

        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);

        if (ranges.length !== 0) {
            var bytes = [];

            ranges = ranges.map(function(item, i) {
                if (kk.is_n(item)) {
                    if (item >= 0) {
                        bytes.push(item + '-');
                    } else {
                        bytes.push(item);
                    }
                    return item;
                }

                if (kk.is_A(item) &&
                    kk.is_n(item[0]) && item[0] >= 0 &&
                    kk.is_n(item[1]) && item[1] >= 0
                ) {
                    bytes.push(item[0] + '-' + item[1]);
                    return item;
                }

                return false;
            });

            bytes = bytes.join(',');

            if (bytes !== '' && bytes !== '0-') {
                xhr.setRequestHeader('Range', 'bytes=' + bytes);
            }
        }

        function convert_xhr(xhr) {
            return {
                'headers': xhr.getAllResponseHeaders(),
                'getHeader': function(name) {
                    return xhr.getResponseHeader(name);
                },
                'content': xhr.response
            }
        }

        xhr.addEventListener('loadend', function() {
            if (xhr.status === 200) {
                resolve(convert_xhr(xhr));
            } else if (xhr.status === 206) {
                var response = [];

                if (xhr.getResponseHeader('Content-Range')) {
                    resolve(convert_xhr(xhr));
                } else {
                    var separator = (function(type){
                        var out = type.match(/boundary=(.+)$/);
                        if (out && out[1])
                            return out[1];
                        else
                            return false;
                    })(xhr.getResponseHeader('Content-Type'));
                    var parts = get_parts(xhr.response, separator);

                    ranges.forEach(function(item) {
                        if (item !== false) {
                            response.push(parts.shift());
                        } else {
                            response.push(false);
                        }
                    });
                    resolve(response);
                }

            } else {
                console.error(xhr.status);
                console.log('bytes >', bytes);
                console.log('status >', xhr.status);
                console.log('range >', xhr.getResponseHeader('Content-Type'));
            }
        });

        xhr.responseType = 'arraybuffer';
        xhr.send();

    });
};

function get_parts(response, separator) {
    var out = [];
    var ranges = get_ranges(response, separator);

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

function get_ranges(response, separator){
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
