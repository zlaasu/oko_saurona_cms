let deviceTemplateFolder = "./app/device/";

HelloVietnam.deviceList = function () {
    HelloVietnam.ajaxData('api/cms/device/list', 'GET', false, function (data) {
        if (data) {
            $("#templates").load(deviceTemplateFolder + "deviceList.html", function () {
                for (var i = 0; i < data.length; i++) {
                    data[i].statusBadge = "";
                    data[i].statusName = "";
                    data[i].typeIcon = "";
                    data[i].typeName = "";

                    if (data[i].status == "1") {
                        data[i].statusBadge = "badge-light";
                        data[i].statusName = "ON";
                    } else if (data[i].status == "0") {
                        data[i].statusBadge = "badge-dark";
                        data[i].statusName = "OFF";
                    }

                    if (data[i].type == "1") {
                        data[i].typeIcon = "smartphone";
                        data[i].typeName = "PHONE";
                    } else if (data[i].type == "2") {
                        data[i].typeIcon = "directions_bike";
                        data[i].typeName = "BIKE";
                    }
                }
                data = {devices: data};
                let output = Mustache.render($('#list').html(), data);
                $('#content').html(output);
                $('table').DataTable();
            });
        }
    });
};

HelloVietnam.deviceDelete = function (id) {
    HelloVietnam.ajaxData('api/cms/device/' + id, 'DELETE', false, function (data) {
        if (data) {
            $('#delete_' + id).parents("tr").remove();
        }
    });
};

HelloVietnam.deviceEdit = function (param) {
    if (param.id != 0) {
        HelloVietnam.ajaxData('api/cms/device/' + param.id, 'GET', false, function (data) {
            if (data) {
                if (data.status == 1) {
                    data.status = "checked";
                } else {
                    data.status = "";
                }

                if (data.type == 1) {
                    data.type1 = "selected";
                    data.type2 = "";
                } else if (data.type == 2) {
                    data.type1 = "";
                    data.type2 = "selected";
                }

                parsForm(data);
            }
        });
    } else {
        parsForm("");
    }

    function parsForm(data) {
        $("#templates").load(deviceTemplateFolder + "deviceEdit.html #editForm", function () {
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
    formData['status'] = $('#device_status').is(":checked") ? 1 : 0;
    formData['type'] = $( "#device_type option:selected" ).val();

    let type = "POST";
    if (formData['id'] > 0) {
        type = "PUT"
    }

    HelloVietnam.ajaxData('api/cms/device/', type, false, function (data) {
        if (data) {
            window.location.href = HASH + '/device';
        }
    }, JSON.stringify(formData));
};