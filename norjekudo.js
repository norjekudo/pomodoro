var norjekudo = {};
    
function padZero(i) {
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
    var out = out + padZero(d.getMonth() + 1) + "-";
    var out = out + padZero(d.getDate()) + " ";
    var out = out + padZero(d.getHours()) + ":";
    var out = out + padZero(d.getMinutes());
    return out;
}