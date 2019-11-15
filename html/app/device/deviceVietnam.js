let deviceTemplateFolder = "./app/device/";

HelloVietnam.deviceList = function () {
    HelloVietnam.ajaxDataResponse('api/cms/device/list', 'GET', false, function (data) {
        if (data) {
            $("#templates").load(deviceTemplateFolder + "deviceList.html", function () {
                for (var i = 0; i < data.length; i++) {
                    data[i].activeBadge = "";
                    data[i].activeName = "";
                    data[i].typeIcon = "";
                    data[i].typeName = "";

                    if (data[i].active == true) {
                        data[i].activeBadge = "badge-light";
                        data[i].activeName = "ON";
                    } else if (data[i].active == false) {
                        data[i].activeBadge = "badge-dark";
                        data[i].activeName = "OFF";
                    }

                    if (data[i].external == true) {
                        data[i].externalIcon = "exit_to_app";
                        data[i].externalName = "EXTERNAL";
                    } else if (data[i].external == false) {
                        data[i].externalIcon = "person";
                        data[i].externalName = "USER";
                    }

                    if (data[i].type == "PHONE") {
                        data[i].typeIcon = "smartphone";
                        data[i].typeName = "PHONE";
                    } else if (data[i].type == "BIKE") {
                        data[i].typeIcon = "directions_bike";
                        data[i].typeName = "BIKE";
                    } else if (data[i].type == "OTHER") {
                        data[i].typeIcon = "directions_walk";
                        data[i].typeName = "OTHER";
                    } else if (data[i].type == "CAR") {
                        data[i].typeIcon = "directions_car";
                        data[i].typeName = "CAR";
                    }
                }
                data = {devices: data};
                let output = Mustache.render($('#list').html(), data);
                $('#content').html(output);
                $('table').DataTable();
            });
        }
    }, function (data) {
        showAjaxError(data);
    });
};

HelloVietnam.deviceDelete = function (id) {
    swal({
        title: 'Are you sure?',
        text: 'Once deleted, you will not be able to recover this device!',
        icon: 'warning',
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                HelloVietnam.ajaxDataResponse('api/cms/device/' + id, 'DELETE', false, function (data) {

                    $('#delete_' + id).parents("tr").remove();

                    swal('', {
                        icon: 'success',
                    });
                }, function (data) {
                    showAjaxError(data);
                });
            }
        });
};

HelloVietnam.deviceEdit = function (param) {
    if (param.id != 0) {
        HelloVietnam.ajaxDataResponse('api/cms/device/' + param.id, 'GET', false, function (data) {
            if (data) {
                if (data.active == true) {
                    data.active = "checked";
                } else {
                    data.active = "";
                }

                data.type1 = "";
                data.type2 = "";
                data.type3 = "";
                data.type4 = "";

                if (data.type == "OTHER") {
                    data.type1 = "selected";
                } else if (data.type == "BIKE") {
                    data.type2 = "selected";
                } else if (data.type == "PHONE") {
                    data.type3 = "selected";
                } else if (data.type == "CAR") {
                    data.type4 = "selected";
                }

                parsForm(data);
            }
        }, function (data) {
            showAjaxError(data);
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
    formData['active'] = $('#device_status').is(":checked") ? 1 : 0;
    formData['type'] = $("#device_type option:selected").val();

    let type = "POST";
    if (formData['id'] > 0) {
        type = "PUT";
    }

    HelloVietnam.ajaxDataResponse('api/cms/device/' + formData['id'], type, false, function (data) {
        showAjaxSuccessSave(data);
        window.location.href = HASH + '/device';
    }, function (data) {
        showAjaxError(data);
    }, JSON.stringify(formData));
};