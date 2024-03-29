
$.ajaxSetup({
    cache: false,
    headers: {"cache-control": "no-cache"},
    beforeSend: function (xhr) {
        xhr.setRequestHeader("Authorization", "Bearer " + localStorage.getItem('token'));
    }
});

$(document).ajaxError(function (event, jqxhr, settings, exception) {
    if (jqxhr.status == 401) {
        window.location.href = HASH + "/login";
    }
    if (jqxhr.status == 403) {
        window.location.href = HASH + "/login";
    }
});

var HelloVietnam = HelloVietnam || {};
HelloVietnam.apiUrl = API_URL;

HelloVietnam.ajaxDataResponse = function (url, type, key, callbackSuccess, callbackError, data) {
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
        success: callbackSuccess,
        error: callbackError
    });
};

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

HelloVietnam.clear = function () {
    $('#auth-container').html("");
    $('#menu-container').html("");
    $('#header-container').html("");
    $('#content').html("");
};

HelloVietnam.clearAuth = function () {
    $('#auth-container').html("");
};

HelloVietnam.hideNav = function () {
    $('#menu-container').hide();
    $('#header-container').hide();
};

HelloVietnam.showNav = function () {
    $('#menu-container').show();
    $('#header-container').show();
};

var favicon = new Favico({
    animation: 'popFade'
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

function showAjaxError(response) {
    iziToast.error({
        title: 'Error: ' + response.status,
        message: 'Coś nie pytkło!',
        position: 'topRight'
    });
}

function showAjaxSuccessSave(response) {
    iziToast.success({
        title: "Saved",
        position: 'topRight'
    });
}
