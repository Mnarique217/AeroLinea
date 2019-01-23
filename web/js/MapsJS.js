/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/**
 *   geekMQ
 */
var map;

function resizeMap() {

    google.maps.event.trigger(map, 'resize');
    map.setCenter(new google.maps.LatLng(10.0000000, -84.0000000));

}

function initMap() {
    var myLatlng = {lat: 10.0000000, lng: -84.0000000};

    map = new google.maps.Map(document.getElementById('map'), {zoom: 4, center: myLatlng});

    var marker = new google.maps.Marker({position: myLatlng, map: map, title: 'Click to zoom'});
    marker.addListener('click', function () {
        map.setZoom(8);
        marker.setPosition(myLatlng);
        map.setCenter(marker.getPosition());
    });

    google.maps.event.addListener(map, 'click', function (e) {
        placeMarker(e.latLng, map, marker);
    });
}
function placeMarker(position, map, marker) {
    var geocoder = new google.maps.Geocoder;
    var infowindow = new google.maps.InfoWindow;
    marker.setPosition(position);
    geocodeLatLng(geocoder, map, infowindow, position, marker);
    map.panTo(position);
}



function geocodeLatLng(geocoder, map, infowindow, position, marker) {

    geocoder.geocode({'location': position}, function (results, status) {
        if (status === 'OK') {
            if (results[1]) {
                infowindow.setContent(results[0].formatted_address);
                infowindow.open(map, marker);

                var str = results[0].formatted_address;
                var n = str.includes("Unnamed Road,");
                if (n === true) {
                    str = str.replace("Unnamed Road,", "");
                }
                document.getElementById('direccion').value = str;
            } else {
                window.alert('No results found');
            }
        } else {
            window.alert('Geocoder failed due to: ' + status);
        }
    });
}