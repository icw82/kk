kk.class_forever = function(name, element) {
    element.classList.add(name);

    var mo = new MutationObserver(function(mutations) {
        mutations.forEach(function(record) {
            if (
                (record.attributeName === 'class') &&
                (record.target === element) &&
                !element.classList.contains(name)
            ) {
                element.classList.add(name);
            }
        });
    });

    mo.observe(element, {attributes: true /*MutationObserverInit*/});
    //mo.disconnect();
}
