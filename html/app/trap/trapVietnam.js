let trapTemplateFolder = "./app/trap/";

HelloVietnam.trap = function () {
    HelloVietnam.ajaxData('device/list', 'GET', false, function (data) {
        if (data) {

            $("#templates").load(trapTemplateFolder + "trap.html", function () {

                let output = Mustache.render($('#mapTemplate').html(), data);
                $('#content').html(output);

                function mapInitialize() {
                    // Map Center
                    let myLatLng = new google.maps.LatLng(33.5190755, -111.9253654);
                    // General Options
                    let mapOptions = {
                        zoom: 12,
                        center: myLatLng,
                        mapTypeId: google.maps.MapTypeId.RoadMap
                    };
                    let map = new google.maps.Map(document.getElementById('map'), mapOptions);
                    // Polygon Coordinates
                    let triangleCoords = [
                        new google.maps.LatLng(33.5362475, -111.9267386),
                        new google.maps.LatLng(33.5104882, -111.9627875),
                        new google.maps.LatLng(33.5004686, -111.9027061)
                    ];
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
                    google.maps.event.addListener(myPolygon.getPath(), "insert_at", getPolygonCoords);
                    //google.maps.event.addListener(myPolygon.getPath(), "remove_at", getPolygonCoords);
                    google.maps.event.addListener(myPolygon.getPath(), "set_at", getPolygonCoords);
                }

                mapInitialize();


                function getPolygonCoords() {
                    let len = myPolygon.getPath().getLength();
                    let htmlStr = "";
                    for (let i = 0; i < len; i++) {
                        //htmlStr += "{" + myPolygon.getPath().getAt(i).toUrlValue(5) + "}, ";
                        //htmlStr += "new google.maps.LatLng(" + myPolygon.getPath().getAt(i).toUrlValue(5) + "), ";
                        //Use this one instead if you want to get rid of the wrap > new google.maps.LatLng(),
                        htmlStr += " / " + myPolygon.getPath().getAt(i).toUrlValue(5);
                    }
                    //htmlStr += "]";
                    console.log(htmlStr);
                }
            });
        }
    });
};