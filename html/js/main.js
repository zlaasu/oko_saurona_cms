var API_URL = 'http://localhost:8282/';
var MAIN_URL = 'http://localhost/#/';
var HASH = '#';

$.ajaxSetup({
    cache: false,
    headers: { "cache-control": "no-cache" }
    //async: true,
    // beforeSend: function (xhr) {
    //     xhr.setRequestHeader("Authorization", localStorage.getItem('token'));
    // }
});

$(document).ajaxError(function (event, jqxhr, settings, exception) {
    if (jqxhr.status == 401) {
        window.location.href = 'index.html';
    }
});

var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
};