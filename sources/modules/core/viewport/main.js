kk.viewport = (function(kenzo, window, document) {
    var root = document.documentElement;
    var body = document.body;
    var define = Object.defineProperty;
    var _ = {
        root: {}
    };

    if (window.pageXOffset !== kenzo._u) {
        define(_, 'x', {
            get: function() {
                return window.pageXOffset
            }
        });

        define(_, 'y', {
            get: function() {
                return window.pageYOffset
            }
        });

    } else {
        define(_, 'x', {
            get: function() {
                return (root || body.parentNode || body).scrollLeft
            }
        });

        define(_, 'y', {
            get: function() {
                return (root || body.parentNode || body).scrollTop
            }
        });
    }

    define(_, 'w', {
        get: function() {
            return window.innerWidth
        }
    });

    define(_, 'h', {
        get: function() {
            return window.innerHeight
        }
    });

    define(_.root, 'w', {
        get: function() {
            return root.clientWidth
        }
    });

    define(_.root, 'h', {
        get: function() {
            return root.clientHeight
        }
    });

    return _;

})(kk, window, document)
