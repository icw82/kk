kk.get_offset = function(element) {
    var boundingClientRect = element.getBoundingClientRect();

    return {
        top: boundingClientRect.top + window.pageYOffset,
        left: boundingClientRect.left + window.pageXOffset,
        width: boundingClientRect.width,
        height: boundingClientRect.height
    }
}
