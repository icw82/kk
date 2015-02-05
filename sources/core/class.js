kk.class = function(element, classes, mask){
    var kenzo = kk,
        each = kenzo.each,
        abort;

    if (element instanceof kenzo._E){
        if (typeof classes == kenzo._s)
            classes = [classes];

        each (classes, function(c){
            if (typeof c != kenzo._s){
                abort = true;
                return true;
            }
        });

        if (!abort && classes instanceof kenzo._A){
            if (typeof mask == kenzo._u)
                mask = [];

            if (mask instanceof kenzo._A){
                each (mask, function(c){
                    if (typeof c != kenzo._s){
                        abort = true;
                        return true;
                    }
                });

                if (!abort){
                    each (mask, function(c){
                        if (classes.indexOf(c) < 0){
                            element.classList.remove(c);
                        }
                    });

                    each (classes, function(c){
                        element.classList.add(c);
                    });

                    return true;
                } else
                    kenzo.__a();
            } else
                kenzo.__a();
        } else
            kenzo.__a();
    } else
        kenzo.__a();
}
