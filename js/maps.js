var cargarPagina = function () {

	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(funcionExito, funcionError);
	}
}

$(document).ready(cargarPagina);

/* Geolocalización */

function funcionExito(posicion) {
	var lat = posicion.coords.latitude;
	var lon = posicion.coords.longitude;

	var map = new GMaps({
		div: '#map',
		lat: lat,
		lng: lon
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

var funcionError = function (error) {
	console.log(error);
};
