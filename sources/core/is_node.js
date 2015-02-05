kk.is_nodes = function(){
    var arg = arguments[0];

    if ((typeof StaticNodeList == kk._o) && (arg instanceof StaticNodeList))
        if (arg.length > 0)
            return true;
        else
            return false;

    if (arg instanceof kk._NL)
        if (arg.length > 0)
            return true;
        else
            return false;
}
