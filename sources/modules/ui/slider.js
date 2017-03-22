///*
//
//Набор элементов:
//    .kenzo-slider — корневой элемент слайдера
//        data-base-width="[ number ]" — базовая ширина слайдера;
//        data-flipspeed="[ number ]" — скорость анимации в секундах;
//        data-autoflip="[ number ]" — период автоматического перелистывания в секундах;
//        data-distribution="[ number ]" — распределяет в слайды то количество элементов,
//            что указано.
//            Если атрибут отсутсвует, элементы распределяются, заполняя слайд до базовой ширины;
//        data-options="[ string ]" — опции, разделены пробелами:
//            proportional-font-size — изменяет размер шрифта рамки пропорционально ширине слайдера;
//
//    .kenzo-slider__frame — рамка слайдера;
//    .kenzo-slider__container — контейнер (он же слайдер самолично);
//    .kenzo-slider__slide — слайд (генерируется скриптом);
//    .kenzo-slider__item — элемент слайдера (помещается скриптом в слайды);
//
//    .kenzo-slider__prev — элемент управления, листает слайды назад;
//    .kenzo-slider__next — элемент управления, листает слайды вперёд;
//
//    .kenzo-slider__indicator — элемент управления, показывает слайд,
//        соответсвующий порядковому номеру индикатора.
//
//Структура:
//    slider → frame → container → *slide* → item
//    slider → prev, next, indicator
//
//*/
//kenzo.slider = (function() {
//    var model = [],
//        defaults = {
//            'flipspeed': .4,
//            'autoflip': null,
//            'base_width': null,
//            'distribution': null,
//            'user_pause': 30
//        };
//
//    var add = function(block) {
//
//        if (!(block instanceof Element) || (!block.classList.contains('kenzo-slider')))
//            return false;
//
//        var frame = block.querySelector('.kenzo-slider__frame');
//        if (frame === null) {console.warn('Отсутсвует рамка', block); return false }
//
//        var container = frame.querySelector('.kenzo-slider__container');
//        if (container === null) {console.warn('Отсутсвует контейнер', block); return false }
//
//        var items = container.querySelectorAll('.kenzo-slider__item');
//
//        if (!kenzo.is_nodes(items)) {
//            console.warn('Отсутсвуют элементы', block);
//            return false;
//        }
//
//        var slides = [],
//            controls = {
//                prev: block.querySelector('.kenzo-slider__prev'),
//                next: block.querySelector('.kenzo-slider__next'),
//                indicators: block.querySelectorAll('.kenzo-slider__indicator')
//            },
//            settings = {
//                'flipspeed':
//                    parseFloat(block.getAttribute('data-flipspeed')) || defaults.flipspeed,
//                'autoflip':
//                    parseFloat(block.getAttribute('data-autoflip')) || defaults.autoflip,
//                'base_width':
//                    parseInt(block.getAttribute('data-base-width')) || defaults.base_width,
//                'distribution':
//                    parseInt(block.getAttribute('data-distribution')) || defaults.distribution
//            },
//            options = (function() {
//                var options = block.getAttribute('data-options');
//
//                if ((typeof options == 'string') && (options !== "")) {
//                    options = options
//                        .replace(/(?:^|\s)([^_a-zA-Z][\w\-]*)/g, '')
//                        .trim();
//                    options = options
//                        .split(' ')
//                        .sort();
//                }
//
//                if (!(options instanceof Array)) options = [];
//
//                return options;
//            })();
//
//        // Распределение элементов по слайдам
//        // Не пересчитывается при изменении размера рамки.
//        if (settings.distribution > 0) {
//            var wrapper = document.createDocumentFragment(),
//                number_of_slides = Math.ceil(items.length / settings.distribution);
//
//            for (var slide_index = 0; slide_index < number_of_slides; slide_index++) {
//                var slide = document.createElement('div');
//                slide.classList.add('kenzo-slider__slide');
//
//                for (
//                    var item_index = slide_index * settings.distribution;
//                    (item_index < (slide_index + 1) * settings.distribution)
//                        && (item_index < items.length);
//                    item_index++
//                ) {
//                    slide.appendChild(items[item_index]);
//                }
//
//                slides.push(slide);
//                wrapper.appendChild(slide);
//            }
//            container.appendChild(wrapper);
//
//        } else if (settings.base_width > 0) {
//            var width_sum = 0,
//                stack = [],
//                wrapper = document.createDocumentFragment();
//
//            each (items, function(item, i) {
//                stack.push(item);
//                width_sum += item.offsetWidth;
//
//                if (
//                    (i + 1 === items.length) ||
//                    (width_sum + items[i + 1].offsetWidth > settings.base_width)
//                ) {
//                    var
//                        k = width_sum / settings.base_width,
//                        slide = document.createElement('div');
//                    slide.classList.add('kenzo-slider__slide');
//
//                    if (k < .85)
//                        width_sum = Math.round(settings.base_width * .95);
//
//                    each (stack, function(e) {
//                        e.style.width = (Math.floor(e.offsetWidth/width_sum*10000) / 100) + '%';
//                        slide.appendChild(e);
//                    });
//
//                    stack = [];
//                    width_sum = 0;
//
//                    slides.push(slide);
//                    wrapper.appendChild(slide);
//                }
//            });
//
//            container.appendChild(wrapper);
//
//        } else {
//            console.warn('kenzo.slider:', 'Cледует указать либо базовую ширину,'
//                + ' либо количество элементов в слайде.');
//            return false;
//        }
//
//        // Индикаторы
//        if (kenzo.is_nodes(controls.indicators)) {
//            for (var i = slides.length; i < controls.indicators.length; i++) {
//                controls.indicators[i].parentNode.removeChild(controls.indicators[i]);
//            }
//
//            var wrapper = document.createDocumentFragment();
//
//            for (var i = controls.indicators.length; i < slides.length; i++) {
//                wrapper.appendChild( controls.indicators[0].cloneNode() );
//            }
//
//            controls.indicators[0].parentNode.appendChild(wrapper);
//            controls.indicators = block.parentNode.querySelectorAll('.kenzo-slider__indicator');
//        } else {
//            controls.indicators = null;
//        }
//
//        model.push({
//            'dom': block,
//            'frame': frame,
//            'container': container,
//            'slides': slides,
//            'items': items,
//            'controls': controls,
//            'settings': settings,
//            'options': options,
//            'width': null,
//            'height': null,
//            'current': null
//        });
//
//        var index = model.length - 1;
//
//        choose(model[index], 0);
//        block.classList.add('activated');
//        set_flip_interval(model[index]);
//        set_transition(model[index]);
//
//        window.addEventListener('resize', function() {
//            update(model[index]);
//        });
//
//        if (controls.next instanceof Element)
//            controls.next.addEventListener('click', function() { next(model[index], 'user') });
//        if (controls.prev instanceof Element)
//            controls.prev.addEventListener('click', function() { prev(model[index], 'user') });
//
//        each (controls.indicators, function(indicator, i) {
//            indicator.addEventListener('click', function() { choose(model[index], i, 'user') });
//        });
//
//        each (slides, function(slide, i) {
//            slide.addEventListener('click', function() { choose(model[index], i, 'user') });
//        })
//    }
//
//    // Выбор слайда
//    var choose = function(block, slide, source) {
//        if ((source == 'user') && (block.settings.flip_interval > 0)) {
//            clearInterval(block.settings.flip_interval);
//            setTimeout(function() {
//                set_flip_interval(block);
//            }, defaults.user_pause * 1000);
//        }
//
//        var need_update = false;
//
//        if (block.current !== slide) {
//            block.current = slide;
//            need_update = true;
//        }
//
//        need_update && update(block);
//    }
//
//    var next = function(block, source) {
//        if ((block.current !== null) && (block.current + 1 < block.slides.length)) {
//            choose(block, block.current + 1, source);
//        } else {
//            choose(block, 0, source);
//        }
//    }
//
//    var prev = function(block, source) {
//        if ((block.current !== null) && (block.current - 1 >= 0)) {
//            choose(block, block.current - 1, source);
//        } else {
//            choose(block, block.slides.length - 1, source);
//        }
//    }
//
//    // Установка периода перелистывания
//    var set_flip_interval = function(block) {
//        if (block.settings.autoflip > 0) {
//            clearInterval(block.settings.flip_interval);
//            block.settings.flip_interval = setInterval(function() {
//                next(block);
//            }, block.settings.autoflip * 1000);
//        }
//    }
//
//    var set_transition = function(block) {
//        if (kenzo.browser === 'normal' || kenzo.browser === 'webkit') {
//            block.container.style.transitionDuration = block.settings.flipspeed + 's';
//            block.container.style.transitionTimingFunction = 'ease';
//
//            //block.frame.style.transitionDuration = flipspeed + 's';
//            //block.frame.style.transitionTimingFunction = 'ease';
//
//            if (kenzo.browser === 'normal') {
//                block.container.style.transitionProperty = 'transform';
//            } else if (kenzo.browser === 'webkit') {
//                block.container.style.transitionProperty = '-webkit-transform';
//            } else {
//                block.container.style.transitionProperty = 'left';
//            }
//
//            //block.frame.style.transitionProperty = 'height';
//        }
//    };
//
//    var update = function(block) {
//        if (block.current === null) return false;
//
//        block.width = block.frame.offsetWidth;
//        each (block.slides, function(slide) {
//            slide.style.width = block.width + 'px';
//        });
//
//        block.height = block.slides[block.current].offsetHeight;
//        block.container.style.width = block.width * block.slides.length + 'px';
//        block.frame.style.height = block.height + 'px';
//
//        // FIXME: Не учитывется поздняя загрузка изображений.
//
////        if (block.height > 0) {
////            if (block.height > block.settings.base_max_height) {
////                block.height = block.settings.base_max_height
////            }
////            if (block.height > block.frame.style.height) {
////                block.frame.style.height = block.height + 'px';
////            }
////        }
//
//        if (
//            (block.options.indexOf('proportional-font-size') > -1) &&
//            (block.settings.base_width > 0)
//        )
//            block.frame.style.fontSize = block.width / block.settings.base_width + 'em';
//
//        if (kenzo.is_nodes(block.controls.indicators)) {
//            each (block.controls.indicators, function(indicator, i) {
//                if (i === block.current)
//                    indicator.classList.add('current');
//                else
//                    indicator.classList.remove('current');
//            });
//        }
//
//        var container_shift = -block.width * block.current + 'px',
//            container_transform = 'translate3d(' + container_shift + ', 0px, 0px)';
//
//        if (kenzo.browser == 'normal')
//            block.container.style.transform = container_transform;
//        else if (kenzo.browser == 'webkit')
//            block.container.style.webkitTransform = container_transform;
//        else
//            block.container.style.left = container_shift;
//
//        each (block.slides, function(slide, i) {
//            if (i === block.current) {
//                slide.classList.add('current');
//            } else {
//                slide.classList.remove('current');
//            }
//        });
//    }
//
//    return {
//        'add': add
//    }
//})();
//
