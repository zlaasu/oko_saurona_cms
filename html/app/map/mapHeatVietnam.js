
HelloVietnam.mapHeat = function () {
    HelloVietnam.ajaxData('device/list', 'GET', false, function (data) {
        if (data) {

            $("#templates").load(mapTemplateFolder + "mapHeat.html", function () {

                data = {devices: data};

                let output = Mustache.render($('#mapTemplate').html(), data);
                $('#content').html(output);
                $('#dateRangePicker').daterangepicker();
                $('#devicePicker').select2();

                var heatmapData = [
                    new google.maps.LatLng(52.118896484375, 20.70130729675293),
                    new google.maps.LatLng(52.118072509765625, 20.725494384765625),
                    new google.maps.LatLng(52.118629455566406, 20.7216796875),
                    new google.maps.LatLng(52.11909866333008, 20.718639373779297),
                    new google.maps.LatLng(52.12044143676758, 20.710569381713867),
                    {location: new google.maps.LatLng(52.12044143676758, 20.710569381713867), weight: 2},
                ];

                var sanFrancisco = new google.maps.LatLng(52.12044143676758, 20.710569381713867);

                map = new google.maps.Map(document.getElementById('map'), {
                    center: sanFrancisco,
                    zoom: 15,
                    mapTypeId: 'satellite',
                });

                var heatmap = new google.maps.visualization.HeatmapLayer({
                    data: heatmapData,
                    radius: 100
                });
                heatmap.setMap(map);

            });

        }
    });


    dateRangePicker
};
