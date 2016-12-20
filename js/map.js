var cargaPag = function(){
	var esRuta = location.href.indexOf("map.html");
	if (esRuta > 0){
		if (navigator.geolocation){
			navigator.geolocation.getCurrentPosition(todoBien, hayError);
		}
	}
	$("#contacto").click(aparecePerfil);
	$("#mitad").click(apareceMap);
	$("#dire").dblclick(limparInput);
	$("#inputFile").change(cambiarFoto);
	$("#pick").click(generarDirec);
	$(".name").text(localStorage.getItem("nombre") +" "+localStorage.getItem("apellido"));
	var fotoPerfil = localStorage.getItem("guarFoto");
	var nombre = localStorage.getItem("nombre");
	var apellido = localStorage.getItem("apellido");
	var correo = localStorage.getItem("email");
	if (fotoPerfil != null) {
		$("#fotoGuar").attr("src", fotoPerfil);
		$("#fotoprev").attr("src", fotoPerfil);
		$("#semiFoto").attr("src", fotoPerfil);
	}
	if (nombre != null && apellido != null && correo != null) {
		$("#name").val(nombre);
		$("#lastname").val(apellido);
		$("#email").val(correo);
	}
}
var entra = true;
var conta = 0; 
$(document).ready(cargaPag);


var todoBien = function(pos){
	var lat = pos.coords.latitude;
	var lon = pos.coords.longitude; 
	var latlon = new google.maps.LatLng(lat, lon);
	$("#map").addClass("tamanoMapa");

	var misOpciones = {
		center:latlon, zoom: 14,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		mapTypeControl: false,
		navigationControlOptions: {
			style: google.maps.NavigationControlStyle.SMALL
		}
	};

	var mapa = new google.maps.Map(document.getElementById("map"), misOpciones);

	var marcador = new google.maps.Marker({
		position: latlon,
		map: mapa,
		title: "You are here"
	});

	var geocoder = new google.maps.Geocoder();
	geocoder.geocode({"latLng":latlon},direcActual);
}
var direcActual = function(resultado, estado){
	if (estado == google.maps.GeocoderStatus.OK){
		if (resultado[0]){
			$("#dire").val(resultado[0].formatted_address);
		}
	}
}
var hayError = function (error){
	swal("ERROR");
}
var aparecePerfil = function(){
	$("#mitad").removeClass("ocultar");
}
var apareceMap = function(){
	$("#mitad").addClass("ocultar");
}
var generarDirec = function(){
	var direccion = $("#dire").val();
	var geocoder = new google.maps.Geocoder();
	geocoder.geocode({ "address": direccion} , dirResultado);
}
var dirResultado = function(resultado, estado){
	if (estado){
		var opMap = {
			center: resultado[0].geometry.location,
			mapTypeId: google.maps.MapTypeId.ROADMAP,
		};

		var mapa = new google.maps.Map(document.getElementById("map"), opMap);
		mapa.fitBounds(resultado[0].geometry.viewport);

		var markerOptions = { position: resultado[0].geometry.location }
        var marker = new google.maps.Marker(markerOptions);
        marker.setMap(mapa);
	}
}
var limparInput = function(){
	$("#dire").val("");
}
var cambiarFoto = function(e){
	if(e.target.files && e.target.files[0]){
		var reader = new FileReader();

		reader.onload = function(e){
			var guardarFoto = e.target.result;
			$("#fotoprev").attr("src", guardarFoto);
			localStorage.setItem("guarFoto", guardarFoto);
		}
		reader.readAsDataURL(e.target.files[0]);

	}
}
