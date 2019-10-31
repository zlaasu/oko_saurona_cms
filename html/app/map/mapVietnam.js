let mapTemplateFolder = "./app/map/";

HelloVietnam.map = function () {
    HelloVietnam.ajaxData('device/list', 'GET', false, function (data) {
        if (data) {

            $("#templates").load(mapTemplateFolder + "map.html", function () {

                data = {devices: data};

                let output = Mustache.render($('#mapTemplate').html(), data);
                $('#content').html(output);
                $('#dateRangePicker').daterangepicker();
                $('#devicePicker').select2();


                $('#dateRangePicker').daterangepicker().on('apply.daterangepicker', function (e, picker) {
                    var startDate = picker.startDate.format('YYYY-MM-DD');
                    var endDate = picker.endDate.format('YYYY-MM-DD');

                    console.log(startDate);
                    console.log(endDate);
                });
                // $('#datePicker').dateTime();

                var locations = [
                    ['Owczarnia', 52.118896484375, 20.70130729675293, 5],
                    ['Bluszczowa', 52.118072509765625, 20.725494384765625, 4],
                    ['Podkowa Leśna', 52.118629455566406, 20.7216796875, 3],
                    ['Podkowa Leśna', 52.11909866333008, 20.718639373779297, 2],
                    ['Grodziska', 52.12044143676758, 20.710569381713867, 1]
                ];

                var map = new google.maps.Map(document.getElementById('map'), {
                    zoom: 14,
                    center: new google.maps.LatLng(52.118896484375, 20.70130729675293),
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                });

                var infowindow = new google.maps.InfoWindow();

                var marker, i;

                for (i = 0; i < locations.length; i++) {
                    marker = new google.maps.Marker({
                        position: new google.maps.LatLng(locations[i][1], locations[i][2]),
                        map: map
                    });

                    google.maps.event.addListener(marker, 'click', (function (marker, i) {
                        return function () {
                            infowindow.setContent(locations[i][0]);
                            infowindow.open(map, marker);
                        }
                    })(marker, i));
                }

            });

        }
    });

};
