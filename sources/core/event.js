kk.event = (function(){
    var _ = {},
        create_event = document.createEvent;

    _.resize = function(delay){
        if (typeof create_event == kk._f){
            var event = create_event('Event');
            event.initEvent('resize', true, true);
            window.dispatchEvent(event);
        }
    }

    _.stop = function(event){
        event = event || window.event;

        if (!event)
            return false;

        while (event.originalEvent){
            event = event.originalEvent
        }

        if (event.preventDefault)
            event.preventDefault();
        if (event.stopPropagation)
            event.stopPropagation();

        event.cancelBubble = true;

        return false;
    }

    return _;

})();
