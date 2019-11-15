let trapTemplateFolder = "./app/trap/";

HelloVietnam.trapList = function () {
    HelloVietnam.ajaxDataResponse('api/cms/trap/list', 'GET', false, function (data) {
        if (data) {
            $("#templates").load(trapTemplateFolder + "trapList.html", function () {
                for (var i = 0; i < data.length; i++) {
                    if (data[i].active == true) {
                        data[i].activeBadge = "badge-light";
                        data[i].activeName = "ON";
                    } else if (data[i].active == false) {
                        data[i].activeBadge = "badge-dark";
                        data[i].activeName = "OFF";
                    }

                    if (data[i].type == "IN") {
                        data[i].typeIcon = "exit_to_app";
                        data[i].typeName = "IN";
                    } else if (data[i].type == "OUT") {
                        data[i].typeIcon = "launch";
                        data[i].typeName = "OUT";
                    } else if (data[i].type == "IN_OUT") {
                        data[i].typeIcon = "swap_horiz";
                        data[i].typeName = "IN / OUT";
                    }
                }
                data = {traps: data};
                let output = Mustache.render($('#list').html(), data);
                $('#content').html(output);
                $('table').DataTable();
            });
        }
    }, function (data) {
        showAjaxError(data);
    });
};

HelloVietnam.trapDelete = function (id) {
    swal({
        title: 'Are you sure?',
        text: 'Once deleted, you will not be able to recover this trap!',
        icon: 'warning',
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                HelloVietnam.ajaxDataResponse('api/cms/trap/' + id, 'DELETE', false, function (data) {

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

HelloVietnam.trapEdit = function (param) {
    HelloVietnam.ajaxDataResponse('api/cms/trap/' + param.id, 'GET', false, function (data) {
        if (data) {
            if (data.trap.active == true) {
                data.trap.active = "checked";
            } else {
                data.trap.active = "";
            }

            data.type1 = "";
            data.type2 = "";
            data.type3 = "";

            if (data.trap.type == "IN") {
                data.trap.type1 = "selected";
            } else if (data.trap.type == "OUT") {
                data.trap.type2 = "selected";
            } else if (data.trap.type == "IN_OUT") {
                data.trap.type3 = "selected";
            }

            parsForm(data);
        }
    }, function (data) {
        showAjaxError(data);
    });
};

HelloVietnam.trapSave = function () {
    event.preventDefault();

    let devices = [];
    let points = [];
    $('#devicePicker option:selected').each(function () {
        devices.push($(this).val());
    });

    points = getPolygonCoords();

    let formData = {};
    formData['id'] = $("input[id='trap_id']").val() || 0;
    formData['name'] = $("input[id='trap_name']").val();
    formData['active'] = $('#trap_status').is(":checked") ? 1 : 0;
    formData['type'] = $("#trap_type option:selected").val();
    formData['device_id'] = devices;
    formData['polygon'] = {points: points};

    type = "POST";
    if (formData['id'] > 0) {
        type = "PUT"
    }

    HelloVietnam.ajaxDataResponse('api/cms/trap/' + formData['id'], type, false, function (data) {
        showAjaxSuccessSave(data);
        window.location.href = HASH + '/trap';
    }, function (data) {
        showAjaxError(data);
    }, JSON.stringify(formData));
};

function mapInitialize(points) {
    let myLatLng = new google.maps.LatLng(52.231674, 21.005675);
    let triangleCoords = [];
    triangleCoords.push(new google.maps.LatLng(52.232686, 21.003241));
    triangleCoords.push(new google.maps.LatLng(52.231721, 21.009380));
    triangleCoords.push(new google.maps.LatLng(52.229676, 21.004859));

    if (points.length > 0) {
        triangleCoords = [];
        myLatLng = new google.maps.LatLng(points[0].x, points[0].y);

        for (let i = 0; i < points.length; i++) {
            triangleCoords.push(new google.maps.LatLng(points[i].x, points[i].y));
        }
    }

    // General Options
    let mapOptions = {
        zoom: 15,
        center: myLatLng,
        mapTypeId: google.maps.MapTypeId.RoadMap
    };

    let map = new google.maps.Map(document.getElementById('map'), mapOptions);

    // Styling & Controls
    myPolygon = new google.maps.Polygon({
        paths: triangleCoords,
        draggable: true, // turn off if it gets annoying
        editable: true,
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35
    });


    myPolygon.setMap(map);
    //google.maps.event.addListener(myPolygon, "dragend", getPolygonCoords);
    //google.maps.event.addListener(myPolygon.getPath(), "remove_at", getPolygonCoords);
    google.maps.event.addListener(myPolygon.getPath(), "insert_at", getPolygonCoords);
    google.maps.event.addListener(myPolygon.getPath(), "set_at", getPolygonCoords);
}

function getPolygonCoords() {
    let len = myPolygon.getPath().getLength();
    let points = [];
    for (let i = 0; i < len; i++) {
        points.push({x: myPolygon.getPath().getAt(i).lat(), y: myPolygon.getPath().getAt(i).lng()});
    }

    return points;
}

function parsForm(data) {
    $("#templates").load(trapTemplateFolder + "trapEdit.html #editForm", function () {
        let output = Mustache.render($('#editForm').html(), data);
        $('#content').html(output);

        $('#devicePicker').select2();

        let devices = [];
        let points = [];
        devices = data ? data.trap.device_id : "";
        points = data.trap.polygon !== null ? data.trap.polygon.points : [];

        $("#devicePicker").val(devices).trigger('change');

        mapInitialize(points);
    });
}