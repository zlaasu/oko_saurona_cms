var API_URL = 'http://localhost:8080/';
var MAIN_URL = 'http://localhost:8080/#/';
var HASH = '#';
var GMAPS = "AIzaSyBdIss9DT7hkFJzdxI_k6h8PelgwXGNs9Q";

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


var HelloVietnam = HelloVietnam || {};
HelloVietnam.apiUrl = API_URL;

HelloVietnam.ajaxData = function (url, type, key, callback, data) {
    data = data || {};

    let urlPath = API_URL + url;
    let lang = $('body').data('lang') || 'pl-PL';
    $.ajax({
        type: type,
        url: urlPath,
        data: data,
        //data: JSON.stringify(data),
        contentType: 'application/json',
        cache: false,
        dataType: 'json',
        headers: {
            'Content-Language': lang,
            'Accept-Language': lang
        },
        success: callback,
        error: callback
    });
};
