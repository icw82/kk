if (!kk.d) return;

var define = Object.defineProperty;
var body = kk.d.body;
var viewport = {
    body: {},
};

viewport.root = viewport.body; // DEPRECATED
kk.viewport = viewport;

if (kk.is_n(kk.r.pageXOffset)) {
    define(viewport, 'x', {
        get: function() {
            return kk.r.pageXOffset
        }
    });

    define(viewport, 'y', {
        get: function() {
            return kk.r.pageYOffset
        }
    });

} else {
    define(viewport, 'x', {
        get: function() {
            return (kk.d || body.parentNode || body).scrollLeft
        }
    });

    define(viewport, 'y', {
        get: function() {
            return (kk.d || body.parentNode || body).scrollTop
        }
    });
}

define(viewport, 'w', {
    get: function() {
        return kk.r.innerWidth
    }
});

define(viewport, 'h', {
    get: function() {
        return kk.r.innerHeight
    }
});

define(viewport.body, 'w', {
    get: function() {
        return kk.d.clientWidth
    }
});

define(viewport.body, 'h', {
    get: function() {
        return kk.d.clientHeight
    }
});
