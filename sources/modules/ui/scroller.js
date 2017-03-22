///*
//
//Набор элементов:
//    .kenzo-scroll-content
//        data-name="[имя]"
//    .kenzo-scroll-bar
//        data-name="[имя]"
//        data-type="[dot | proportional]"
//        data-orientation="[horizontal | vertical]"
//    .kenzo-scroll-thumb
//        * должен находиться в элементе .kenzo-scroll-bar
//
//*/
//kenzo.scroller = (function() {
//    var
//        model = [],
//        current, current_bar, current_bar_type, last_pos;
//
//    var search_bar = function(child) {
//        if (child.classList.contains('kenzo-scroll-bar'))
//            return child;
//        else if (child.parentNode !== document.body)
//            return search_bar(child.parentNode);
//    }
//
//    var mouse_capture = function(event) {
//        if ((current !== null) && (current_bar !== null)) {
//            if (last_pos === null) {
//                last_pos = event.clientX;
//                var offset = 0;
//            } else {
//                var offset = last_pos - event.clientX;
//                last_pos = event.clientX;
//            }
//
//            var thumb = current_bar.querySelector('.kenzo-scroll-thumb');
//
//            if (!current.pos) current.pos = 0;
//
//            if (current_bar_type == 'proportional') {
//                current.pos = (thumb.offsetLeft - offset) /
//                    (current_bar.offsetWidth - thumb.offsetWidth);
//            } else {
//                current.pos = (current.pos * current_bar.offsetWidth - offset) /
//                    (current_bar.offsetWidth - thumb.offsetWidth);
//            }
//
//            if (current.pos > 1)
//                current.pos = 1;
//            else if (current.pos < 0)
//                current.pos = 0;
//
//        } else {
//            stop_mouse_capture();
//        }
//
//        event.preventDefault();
//        update(current);
//    };
//
//    var stop_mouse_capture = function() {
//        if (current !== null) {
//            current = null;
//            current_bar = null;
//            current_bar_type = null;
//            last_pos = null;
//            document.removeEventListener('mousemove', mouse_capture, true);
//        }
//    }
//
//    document.addEventListener('mouseup', stop_mouse_capture);
//
//    var add = function(element) {
//        if (!(element instanceof Element)) return false;
//        var name = element.getAttribute('data-name');
//        if (name === null) return false;
//
//        if (element.classList.contains('kenzo-scroll-content')) {
//            each (model, function(item) {
//                if (item.name === name) {
//                    item.content.dom = element;
//                    return true;
//                }
//            }, function() {
//                model.push({
//                    'name': name,
//                    'pos': 0,
//                    'content': {
//                        'dom': element
//                    },
//                    'bars': []
//                });
//            });
//
//        } else if (element.classList.contains('kenzo-scroll-bar')) {
//            var
//                index,
//                thumb = element.querySelector('.kenzo-scroll-thumb'),
//                type = element.getAttribute('data-type');
//            each (model, function(item, i) {
//                if (item.name === name) {
//                    item.bars.push({
//                        'dom': element,
//                        'type': type,
//                        'thumb': {
//                            'dom': thumb
//                        }
//                    });
//
//                    index = i;
//                    return true;
//                }
//            }, function() {
//                if (!(thumb instanceof Element)) return false;
//
//                model.push({
//                    'name': name,
//                    'pos': 0,
//                    'content': {
//                        'dom': null
//                    },
//                    'bars': [{
//                        'dom': element,
//                        'type': type,
//                        'thumb': {
//                            'dom': thumb
//                        }
//                    }]
//                });
//
//                index = model.length - 1;
//            });
//
//            if (index === null) return false;
//
//            each (model[index].bars, function(bar) {
//                bar.thumb.dom.addEventListener('mousedown', function(event) {
//                    event.preventDefault();
//                    current = model[index];
//                    current_bar = search_bar(event.target);
//                    current_bar_type = bar.type;
//                    document.addEventListener('mousemove', mouse_capture, true);
//                }, true);
//            });
//
//        }
//    }
//
//    var update = function() {
//        each (model, function() {
//            var
//                name = arguments[0].name,
//                pos = arguments[0].pos,
//                content = arguments[0].content,
//                bars = arguments[0].bars;
//
//            if (
//                !(content.dom instanceof Element) ||
//                !(bars.length > 0)
//            ) return false;
//
//            if (content.dom.scrollWidth > content.dom.offsetWidth)
//                var show = true;
//            else
//                var show = false;
//
//            if (show) {
//                if (pos === 0) {
//                    content.dom.classList.remove('left');
//                    content.dom.classList.add('right');
//                } else if (pos === 1) {
//                    content.dom.classList.add('left');
//                    content.dom.classList.remove('right');
//                } else {
//                    content.dom.classList.add('left');
//                    content.dom.classList.add('right');
//                }
//            } else {
//                content.dom.classList.remove('left');
//                content.dom.classList.remove('right');
//            }
//
//            each (bars, function(bar) {
//                if (show) {
//                    bar.dom.classList.remove('hidden');
//
//                    if (bar.type == 'proportional') {
//                    //bar.thumb.width =
//                    //    Math.round((content.dom.offsetWidth / content.dom.scrollWidth) *
//                    //        bar.dom.offsetWidth);
//
//                    //if (bar.thumb.width > 372)
//                        bar.thumb.width = 372;
//                    } else {
//                        bar.thumb.width = 0;
//                    }
//
//                    bar.thumb.dom.style.width = bar.thumb.width  + 'px';
//                    bar.thumb.dom.style.left =
//                        Math.round((bar.dom.offsetWidth - bar.thumb.width) * pos) + 'px';
//                } else {
//                    bar.dom.classList.add('hidden');
//                }
//            });
//
//            content.dom.scrollLeft =
//                Math.round((content.dom.scrollWidth - content.dom.offsetWidth) * pos);
//        });
//    }
//
//    each ('.kenzo-scroll-content', add);
//    each ('.kenzo-scroll-bar', add);
//
//    update();
//
//    window.addEventListener('resize', update);
//
//    return {
//        'add': add,
//        'update': update
//    }
//
//})();
