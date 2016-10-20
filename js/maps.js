var cargarPagina = function () {

	$("#buscar").click(buscarDireccion);

	if (location.href.includes("geolocation.html")) {
		if (navigator.geolocation) {
			navigator.geolocation.watchPosition(funcionExito, funcionError);
		}
	}
}
var map;
$(document).ready(cargarPagina);

/* Geolocalización */

var funcionExito = function (posicion) {
	var lat = posicion.coords.latitude;
	var lon = posicion.coords.longitude;

	 map = new GMaps({
		div: '#map',
		lat: lat,
		lng: lon,
		enableNewStyle: true
	});

	map.addMarker({
		lat: lat,
		lng: lon,
		title: 'Lima',
		click: function (e) {
			alert('You clicked in this marker');
		}
	});

}
var buscarDireccion = function () {
	GMaps.geocode({
		address: $('#address').val(),
		callback: function (results, status) {
			if (status == 'OK') {
				var latlng = results[0].geometry.location;
				map.setCenter(latlng.lat(), latlng.lng());
				map.addMarker({
					lat: latlng.lat(),
					lng: latlng.lng()
				});
			}
		}
	});
}

var funcionError = function (error) {
	console.log(error);
}
