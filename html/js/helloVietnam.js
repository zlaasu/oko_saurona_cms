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

HelloVietnam.deviceList = function () {
    HelloVietnam.ajaxData('device/list', 'GET', false, function (data) {
        if (data) {
            $("#templates").load("./templates/deviceList.html", function () {
                let output = Mustache.render($('#bookList').html(), {devices: data});
                $('#content').html(output);
                $('table').DataTable();
            });
        }
    });
};

HelloVietnam.deviceDelete = function (id) {
    HelloVietnam.ajaxData('device/' + id, 'DELETE', false, function (data) {
        if (data) {
            $('#delete_' + id).parents("tr").remove();
        }
    });
};

HelloVietnam.deviceEdit = function (param) {
    if (param.id != 0) {
        HelloVietnam.ajaxData('device/' + param.id, 'GET', false, function (data) {
            if (data) {
                parsForm(data);
            }
        });
    } else {
        parsForm("");
    }

    function parsForm(data) {
        $("#templates").load("./templates/deviceEdit.html #editForm", function () {
            let output = Mustache.render($('#editForm').html(), data);
            $('#content').html(output);

        });
    }
};

HelloVietnam.deviceSave = function () {
    event.preventDefault();

    let formData = {};
    formData['id'] = $("input[id='device_id']").val() || 0;
    formData['name'] = $("input[id='device_name']").val();
    formData['status'] = $("input[id='device_status']").val();
    formData['type'] = $("input[id='device_type']").val();

    let type = "POST";
    if (formData['id'] > 0) {
        type = "PUT"
    }

    HelloVietnam.ajaxData('device/', type, false, function (data) {
        if (data) {
            window.location.href = HASH + '/device';
        }
    }, JSON.stringify(formData));
};
