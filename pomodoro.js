/*jslint browser: true */
/*global Mustache norjekudo */
var timerId, teaId, bignumberId, countdown, countdownId;
timerId = 0;
teaId = 0;
countdownId = 0;
countdown = 0;

function renderPomodoros() {
    "use strict";
    var template, container, data;
    data = {};
    data.pomodoros = JSON.parse(window.localStorage.getItem('pomodoro'));
    template = document.getElementById("templatePomodoros").innerHTML;
    container = document.getElementById("container");
    container.innerHTML = Mustache.render(template, data);
}

function clearPomodoros() {
    "use strict";
    if (window.confirm("Are you sure?")) {
        window.localStorage.setItem('pomodoro', '[]');
        renderPomodoros();
    }
}

function alertPomodoro() {
    "use strict";
	clearTimeout(countdownId);
    document.getElementById("pomodoro_status").innerHTML = "Pomodoro finished at " + norjekudo.getDateTime() + ".";
    document.getElementById("bignumber").innerHTML = "Done.";
    document.title = "Pomodoro: Done.";
    window.alert("Pomodoro Finished");
}

function alert_break() {
    "use strict";
	clearTimeout(countdownId);
    document.getElementById("break_status").innerHTML = "Break finished at " + norjekudo.getDateTime() + ".";
    document.getElementById("bignumber").innerHTML = "Done.";
    document.title = "Pomodoro: Break Time Over.";
    window.alert("Break Time Over.");
}

function alert_tea() {
    "use strict";
    document.getElementById("tea_status").innerHTML = "Tea is Ready: " + norjekudo.getDateTime() + ".";
    window.alert("Tea Time");
}

function countdownTimer() {
    "use strict";
    document.getElementById("bignumber").innerHTML = countdown.toString();
    document.title = "Pomodoro: " + countdown.toString();
    countdown = countdown - 1;
    if (countdown < 1) {
        clearTimeout(countdownId);
    }
}

function start_pomodoro() {
    "use strict";
    var objPomodoro, pomodoro, start_date, start_time;
    objPomodoro = {};
    pomodoro = [];
    start_date = norjekudo.getDateTime();
    start_time = new Date().getTime();
    clearInterval(countdownId);
    clearTimeout(timerId);
    timerId = setTimeout(alertPomodoro, 1500000);
    countdown = 25;
    countdownTimer();
    countdownId = setInterval(countdownTimer, 60000);
    document.getElementById("pomodoro_status").innerHTML = "Started Pomodoro at " + start_date + ".";
    document.getElementById("break_status").innerHTML = "";
    objPomodoro.action = document.getElementById("txtPomodoro").value;
    objPomodoro.start_time = start_time;
    objPomodoro.start_date = start_date;
    if (!window.localStorage.getItem('pomodoro')) {
        window.localStorage.setItem('pomodoro', "[]");
    }
    pomodoro = JSON.parse(window.localStorage.getItem('pomodoro'));
    pomodoro.unshift(objPomodoro);
    window.localStorage.setItem('pomodoro', JSON.stringify(pomodoro));
    renderPomodoros();
    document.getElementById("txtPomodoro").value = "";
}

function start_break() {
    "use strict";
    clearTimeout(timerId);
    clearInterval(countdownId);
    timerId = setTimeout(alert_break, 300000);
    countdown = 5;
    countdownTimer();
    countdownId = setInterval(countdownTimer, 60000);
    document.getElementById("break_status").innerHTML = "Started Break at " + norjekudo.getDateTime() + ".";
    document.getElementById("pomodoro_status").innerHTML = "";
}

function start_tea() {
    "use strict";
    clearTimeout(teaId);
    teaId = setTimeout(alert_tea, 300000);
    document.getElementById("tea_status").innerHTML = "Started Tea at " + norjekudo.getDateTime() + ".";
}

function exportPomodoros() {
    "use strict";
    var output;
    output = "</br></br>";
    output += window.localStorage.getItem('pomodoro');
    output += "</br></br>";
    output += "<a href='javascript:exportDone()'>Done</a>";
    document.getElementById("export").innerHTML = output;
}

function showImport() {
    "use strict";
    document.getElementById("txtImport").value = "";
    document.getElementById("divImport").style.display = "inline";
}

function importPomodoros() {
    "use strict";
    window.localStorage.setItem('pomodoro', document.getElementById("txtImport").value);
    document.getElementById("divImport").style.display = "none";
    renderPomodoros();
}

function cancelImport() {
    "use strict";
	document.getElementById("txtImport").value = "";
    document.getElementById("divImport").style.display = "none";
}

function exportDone() {
    "use strict";
    document.getElementById("export").innerHTML = "";
}

function init() {
    "use strict";
    renderPomodoros();
}