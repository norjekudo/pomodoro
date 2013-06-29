var norjekudo = {};
    
norjekudo.padZero = function (i) {
    var out = "";
    if (i < 10) {
        out = "0" + i.toString();
    } else {
        out = i.toString();
    }
    return out;
}
    
norjekudo.getDateTime = function () {
    var out = "";
    var d = new Date();
    var out = out + d.getFullYear().toString() + "-";
    var out = out + norjekudo.padZero(d.getMonth() + 1) + "-";
    var out = out + norjekudo.padZero(d.getDate()) + " ";
    var out = out + norjekudo.padZero(d.getHours()) + ":";
    var out = out + norjekudo.padZero(d.getMinutes());
    return out;
}
