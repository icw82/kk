var module = {};

var top_layer = document.querySelector('.layout-top-layer');
if (!kk.is_E(top_layer)) {
    console.log('Верхний слой не обнаружен');
    return;
}

var popup_layer = document.querySelector('.layout-top-layer');
if (!kk.is_E(popup_layer)) {
    console.log('Слой для панелей не обнаружен');
    return;
}

var shadow_layer = document.querySelector('.layout-top-layer');
if (!kk.is_E(shadow_layer)) {
    console.log('Затеняющий слой не обнаружен');
    return;
}

module.show = function() {

}


kk.toplayer = module;


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
