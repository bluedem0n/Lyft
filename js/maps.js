var cargarPagina = function () {

    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(funcionExito, funcionError);
    }

}

$(document).ready(cargarPagina);

var funcionExito = function (posicion) {

    var lat = posicion.coords.latitude;
    var lon = posicion.coords.longitude;

    var mymap = L.map('mapid').setView([lat, lon], 13);

    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
        maxZoom: 18
    }).addTo(mymap);

    L.control.scale().addTo(mymap);

    L.marker([lat, lon], {
            draggable: true
        }).addTo(mymap)
        .bindPopup("<b>Hello world!</b><br />I am a popup.").openPopup();

}

var funcionError = function (error) {
    console.log(error);
};