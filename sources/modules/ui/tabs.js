//kenzo.tabs = (function() {
//    var anchors = [],
//        panels = [],
//        preactivated_groups = [];
//
//    // Индексирование якоря или панели
//    var add = function(element) {
//        if (!(element instanceof Element)) return false;
//
//        var anchor_name = element.getAttribute('data-kenzo-tab-anchor'),
//            group_name = element.getAttribute('data-kenzo-tab-group'),
//            panel_name = element.getAttribute('data-kenzo-tab-panel'),
//            exist = false;
//
//        if (group_name === '') group_name = null;
//
//        if (anchor_name) {
//            each (anchors, function(item) {
//                if ((anchor_name === item.name) && (group_name === item.group)) {
//                    exist = true;
//                    item.dom.push(element);
//                    return true;
//                }
//            });
//
//            exist || anchors.push({
//                'name': anchor_name,
//                'group': group_name,
//                'dom': [element]
//            });
//
//            element.kenzo_anchor_name = anchor_name;
//            element.kenzo_group_name = group_name;
//            element.addEventListener('click', anchor_listner);
//
//            if (element.classList.contains('current')) {
//                if (preactivated_groups.indexOf(group_name) > -1) {
//                    element.classList.remove('current');
//                } else {
//                    preactivated_groups.push(group_name);
//                    show(anchor_name, group_name);
//                }
//            }
//        } else if (panel_name) {
//            each (panels, function(item) {
//                if ((panel_name === item.name) && (group_name === item.group)) {
//                    exist = true;
//                    item.dom.push(element);
//                    return true;
//                }
//            });
//
//            exist || panels.push({
//                'name': panel_name,
//                'group': group_name,
//                'dom': [element]
//            });
//        }
//    }
//
//    var anchor_listner = function(event) {
//        var anchor_search = function(child) {
//            if (child.getAttribute('data-kenzo-tab-anchor'))
//                return child;
//            else if (child.parentNode !== document.body)
//                return anchor_search(child.parentNode);
//        }
//
//        var anchor = anchor_search(event.target),
//            name = anchor.kenzo_anchor_name,
//            group = anchor.kenzo_group_name;
//
//        if (!(anchor instanceof Element) || anchor.classList.contains('current')) return false;
//
//        each (anchors, function(item) {
//            if (item.group === group) {
//
//                if (item.name === name) {
//                    each (item.dom, function(element) {
//                        element.classList.add('current');
//                    });
//                } else {
//                    each (item.dom, function(element) {
//                        element.classList.remove('current');
//                    });
//                }
//            }
//        });
//
//        show(name, group);
//    }
//
//    var show = function(name, group) {
//        if (typeof name != 'string') return false;
//        if (typeof group != 'string') group = null;
//
//        // TODO: prev and next;
//
//        each (panels, function(item) {
//            if (item.group === group) {
//                if (item.name === name) {
//                    each (item.dom, function(element) {
//                        element.classList.add('current');
//                    });
//                } else {
//                    each (item.dom, function(element) {
//                        element.classList.remove('current');
//                    });
//                }
//            }
//        });
//
//        kenzo.generate.resize();
//    }
//
//    // Панели
//    each ('[data-kenzo-tab-panel]', add);
//
//    // Якори
//    each ('[data-kenzo-tab-anchor]', add);
//
//    return {
//        'add': add,
//        'show': show
//    }
//})();
