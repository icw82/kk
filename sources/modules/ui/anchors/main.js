// Класс .hover и .pressed всем ссылкам на один и тот же документ
//kenzo.anchors = (function() {
//    // TODO: 'xlink:href'
//    var _ = {},
//        anchors = document.querySelectorAll('a[href]');
//
//    _.add = function(anchor) {
//        try {
//            var url = anchor.getAttribute('href').replace(/[\n\r\b\t]/g, ''),
//                same = document.querySelectorAll('a[href="' + url + '"]');
//
//            anchor.addEventListener('mouseover', function() {
//                each (same, function(o) {
//                    (o.classList.contains('hover')) || (o.classList.add('hover'))
//                });
//            }, false);
//
//            anchor.addEventListener('mouseout', function() {
//                each (same, function(o) {
//                    (o.classList.contains('hover')) && (o.classList.remove('hover'))
//                });
//            }, false);
//
//            anchor.addEventListener('mousedown', function() {
//                each (same, function(o) {
//                    (o.classList.contains('pressed')) || (o.classList.add('pressed'))
//                });
//            }, false);
//
//            anchor.addEventListener('mouseup', function() {
//                each (same, function(o) {
//                    (o.classList.contains('pressed')) && (o.classList.remove('pressed'))
//                });
//            }, false);
//        } catch (e) {
//            console.warn(e);
//        }
//    }
//
//    each (anchors, _.add);
//
//    return _;
//})();
