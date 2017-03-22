//kenzo.toplayer = (function() {
//    var _ = {},
//        top_layer = document.querySelector('.layout-top-layer');
//
//    if (!(top_layer instanceof Element)) return false;
//
//    var popup_layer = top_layer.querySelector('.layout-wrapper'),
//        shadow_layer = top_layer.querySelector('.layout-top-layer__shadow');
//
//    if (!(popup_layer instanceof Element)) {
//        console.warn('Отсутсвует верхний слой');
//        return false
//    }
//
//    if (!(shadow_layer instanceof Element)) {
//        console.warn('Отсутсвует затеняющий слой');
//        return false
//    }
//
//    _.show = function(show_shadow_layer) {
//        top_layer.classList.add('visible');
//        if (show_shadow_layer === true)
//            shadow_layer.classList.add('visible');
//    }
//
//    _.hide = function() {
//        top_layer.classList.remove('visible');
//        shadow_layer.classList.remove('visible');
//    }
//
//    _.get_popup_layer = function() {
//        return popup_layer;
//    }
//
//    _.get_shadow_layer = function() {
//        return shadow_layer;
//    }
//
//    _.get_popup_layer_state = function() {
//        return top_layer.classList.contains('visible');
//    }
//
//    _.get_shadow_layer_state = function() {
//        return shadow_layer.classList.contains('visible');
//    }
//
//    return _;
//
//})();
