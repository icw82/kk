kk.format.date_range_to_string = (start, end) => {
    if (kk.is.s(start))
        start = new Date(start);

    if (kk.is.s(end))
        end = new Date(end);

    if (kk.is.D(start) && kk.is.D(end)) {
        return `с ${ kk.date_to_string(start) } по ${ kk.date_to_string(end) }`
    } else {
        throw new Error(kk.msg.ia);
    }
}
