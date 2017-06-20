
function initMap() {
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    var map = new google.maps.Map(document.getElementById("map"), {
        zoom: 5,
        center: { lat: -9.1191427, lng: -77.0349046 },
        mapTypeControl: false,
        zoomControl: false,
        streetViewControl: false,
        mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
            mapTypeIds: ['roadmap', 'terrain']
        }

    });

    directionsDisplay.setMap(map);


    function buscar() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(funcionExito, funcionError);
        }
    }

    document.getElementById("encuentrame").addEventListener("click", buscar);
    var latitud, longitud;

    var funcionExito = function (posicion) {
        latitud = posicion.coords.latitude;
        longitud = posicion.coords.longitude;

        var miUbicacion = new google.maps.Marker({
            position: { lat: latitud, lng: longitud },
            animation: google.maps.Animation.DROP,
            icon: 'https://cdn4.iconfinder.com/data/icons/48x48-free-object-icons/48/Bike.png',//poner el icono de bicicleta :https://developers.google.com/maps/documentation/javascript/custom-markers
            map: map
        });
        map.setZoom(17);
        map.setCenter({ lat: latitud, lng: longitud });

    }

    var funcionError = function (error) {
        alert("Tenemos un problema con encontrar tu ubicacion");
    }
   
    var onClick = function () {
        calculateAndDisplayRoute(directionsService, directionsDisplay);
    };

    document.getElementById("route").addEventListener("click", onClick);
}
function calculateAndDisplayRoute(directionsService, directionsDisplay) {
    directionsService.route({
        origin: document.getElementById('start').value,
        destination: document.getElementById('end').value,
        travelMode: 'DRIVING'
    }, function (response, status) {
        if (status === 'OK') {
            directionsDisplay.setDirections(response);
        } else {
            window.alert('Directions request failed due to ' + status);
        }
    });
}

