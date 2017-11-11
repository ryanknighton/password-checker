$( document ).ready(function() {
    selectGauge = new Gauge(document.getElementById("gauge"));
    selectGauge.maxValue = 3000;
    selectGauge.set(1552);
});