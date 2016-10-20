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

	var content = $("#direccion");
	var dir = "";
	var latlng = new google.maps.LatLng(lat, lon);
	geocoder = new google.maps.Geocoder();
	geocoder.geocode({
		"latLng": latlng
	}, function (resultado, estado) {
		if (estado == google.maps.GeocoderStatus.OK) {
			if (resultado[0]) {
				dir = resultado[0].formatted_address;
			} else {
				dir = "No se ha podido obtener ninguna dirección en esas coordenadas.";
			}
		} else {
			dir = "El Servicio de Codificación Geográfica ha fallado con el siguiente error: " + estado;
		}
		content.text(dir);
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
	$('#address').val("");
}

var funcionError = function (error) {
	console.log(error);
}
