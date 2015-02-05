kk.get_window_params = function(){
    var kenzo = kk,
        root = window,
        doc = document,
        doc_elem = doc.documentElement,
        sizes = {};

    sizes.x = (root.pageXOffset !== kenzo._u) ? root.pageXOffset :
        (doc_elem || doc.body.parentNode || doc.body).scrollLeft;
    sizes.y = (root.pageYOffset !== kenzo._u) ? root.pageYOffset :
        (doc_elem || doc.body.parentNode || doc.body).scrollTop;

    sizes.w = ('innerWidth' in root) ? root.innerWidth : doc_elem.clientWidth;
    sizes.h = ('innerWidth' in root) ? root.innerHeight : doc_elem.clientHeight;

    return sizes;
}
