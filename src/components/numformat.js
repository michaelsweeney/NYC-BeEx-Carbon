function formatInt(nStr) {

    if (+nStr < 5) {
        return Math.round(+nStr * 1000) / 1000
    }

    if (!isFinite(nStr)) {
        return 0
    }

    if (+nStr > 1e6 ) {
        nStr = (+nStr / 1e6)
        nStr += ''
        var x = nStr.split('.');
        var x1 = x[0];
        var x2 = x.length > 1 ? '.' + x[1] : '';
        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1' + ',' + '$2');
        }
        return (x1 + Math.round(x2 * 100) / 100 ) + "M"
    }

    else {
        nStr += '';
        var x = nStr.split('.');
        var x1 = x[0];
        var x2 = x.length > 1 ? '.' + x[1] : '';
        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1' + ',' + '$2');
        }
        return (x1 + x2).split('.')[0];
    }


}


export {
    formatInt
}