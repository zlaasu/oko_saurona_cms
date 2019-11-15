let mapTemplateFolder = "./app/map/";

HelloVietnam.map = function () {
    HelloVietnam.ajaxDataResponse('api/cms/device/list', 'GET', false, function (data) {
        if (data) {
            $("#templates").load(mapTemplateFolder + "map.html", function () {
                data = {devices: data};

                let output = Mustache.render($('#mapTemplate').html(), data);
                $('#content').html(output);
                $('#dateRangePicker').daterangepicker();
                $('#devicePicker').select2();

                let points = [];
                mapPointsInitialize(points);
            });
        }
    }, function (data) {
        showAjaxError(data);
    });
};

HelloVietnam.mapSearch = function () {
    event.preventDefault();

    var startDate = $('#dateRangePicker').data('daterangepicker').startDate.format('YYYY-MM-DD');
    var endDate = $('#dateRangePicker').data('daterangepicker').endDate.format('YYYY-MM-DD');

    let devices = [];
    $('#devicePicker option:selected').each(function () {
        devices.push($(this).val());
    });

    let formData = {};
    formData['dateStart'] = startDate;
    formData['dateStop'] = endDate;
    formData['devices'] = devices;

    HelloVietnam.ajaxDataResponse('api/cms/location/search', 'POST', false, function (data) {
        if (window.location.href.includes('heatmap')) {
            mapHeatInitialize(data);
        } else {
            mapPointsInitialize(data)
        }
    }, function (data) {
        showAjaxError(data);
    }, JSON.stringify(formData));
};

function mapPointsInitialize(data) {
    let mapCenter;

    if (data.length == 0) {
        mapCenter = new google.maps.LatLng(52.231674, 21.005675);
    } else {
        mapCenter = new google.maps.LatLng(data[0].latitude, data[0].longitude);
    }

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 14,
        center: mapCenter,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    var infowindow = new google.maps.InfoWindow();
    var marker, i;

    for (i = 0; i < data.length; i++) {
        let icon = "/img/marker.png";

        if (i == data.length - 1) {
            icon = "/img/markerLast.png";
        }

        marker = new google.maps.Marker({
            position: new google.maps.LatLng(data[i].latitude, data[i].longitude),
            icon: icon,
            map: map
        });

        let date = data[i].time.substring(0, 19).split('T');

        google.maps.event.addListener(marker, 'click', (function (marker, i) {
            return function () {
                infowindow.setContent(data[i].name + "<br>" + date[0] + "<br>" + date[1]);
                infowindow.open(map, marker);
            }
        })(marker, i));
    }
}

function mapHeatInitialize(data) {
    let mapCenter;

    if (data.length == 0) {
        mapCenter = new google.maps.LatLng(52.231674, 21.005675);
    } else {
        mapCenter = new google.maps.LatLng(data[0].latitude, data[0].longitude);
    }

    var heatmapData = [];
    for (i = 0; i < data.length; i++) {
        heatmapData.push(new google.maps.LatLng(data[i].latitude, data[i].longitude));
    }

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 14,
        center: mapCenter,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: [
            {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
            {
                featureType: 'administrative.locality',
                elementType: 'labels.text.fill',
                stylers: [{color: '#d59563'}]
            },
            {
                featureType: 'poi',
                elementType: 'labels.text.fill',
                stylers: [{color: '#d59563'}]
            },
            {
                featureType: 'poi.park',
                elementType: 'geometry',
                stylers: [{color: '#263c3f'}]
            },
            {
                featureType: 'poi.park',
                elementType: 'labels.text.fill',
                stylers: [{color: '#6b9a76'}]
            },
            {
                featureType: 'road',
                elementType: 'geometry',
                stylers: [{color: '#38414e'}]
            },
            {
                featureType: 'road',
                elementType: 'geometry.stroke',
                stylers: [{color: '#212a37'}]
            },
            {
                featureType: 'road',
                elementType: 'labels.text.fill',
                stylers: [{color: '#9ca5b3'}]
            },
            {
                featureType: 'road.highway',
                elementType: 'geometry',
                stylers: [{color: '#746855'}]
            },
            {
                featureType: 'road.highway',
                elementType: 'geometry.stroke',
                stylers: [{color: '#1f2835'}]
            },
            {
                featureType: 'road.highway',
                elementType: 'labels.text.fill',
                stylers: [{color: '#f3d19c'}]
            },
            {
                featureType: 'transit',
                elementType: 'geometry',
                stylers: [{color: '#2f3948'}]
            },
            {
                featureType: 'transit.station',
                elementType: 'labels.text.fill',
                stylers: [{color: '#d59563'}]
            },
            {
                featureType: 'water',
                elementType: 'geometry',
                stylers: [{color: '#17263c'}]
            },
            {
                featureType: 'water',
                elementType: 'labels.text.fill',
                stylers: [{color: '#515c6d'}]
            },
            {
                featureType: 'water',
                elementType: 'labels.text.stroke',
                stylers: [{color: '#17263c'}]
            }
        ]
    });

    var heatmap = new google.maps.visualization.HeatmapLayer({
        data: heatmapData,
        radius: 50
    });
    heatmap.setMap(map);
}
