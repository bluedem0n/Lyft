var cargar = function () {
	$("#numero").keydown(validaNumeros);
	$("#numero").keyup(longCel);
	$("#numero").keypress(deshabilitarTecla);
	$("#siguiente").click(generadorCodigo);
	$(".codigo").keypress(longCodigo);
	$(".codigo").keydown(validaNumeros);
	$("#cel").text(window.localStorage.getItem("celu"));
	$(".codigo").keyup(cambiaInput);
	$("#siguienteValidar").click(validarCodigo);
	$("#resend").click(reenviar);
	$("#siguienteRegistro").click(validarData);
	$("#siguienteRegistro").click(validarCheck);
	$("#nombre").keydown(soloLetras);
	$("#apellidos").keydown(soloLetras);
}

$(document).ready(cargar);


var validaNumeros = function (e) {
	var ascii = e.keyCode;
	if (ascii == 8 || ascii == 9 || (ascii >= 48 && ascii <= 57)) {
		return true;
	} else {
		return false;
	}
}

var longCel = function () {
	if ($(this).val().length == 9) {
		$("#siguiente").attr("href", "verificar-numero.html");
	} else {
		$("#siguiente").removeAttr("href");
	}
}

var deshabilitarTecla = function () {
	if ($(this).val().length < 9) {
		return true;
	} else {
		return false;
	}
}

var generadorCodigo = function (e) {
	e.preventDefault();
	var longitud = $("#numero").val().length;
	var numeroAleatorio = Math.floor(Math.random() * 900) + 99;
	if (longitud === 9) {
		window.localStorage.setItem("numberRandom", numeroAleatorio);
		swal({
			title: "Tu codigo aleatorio es : ",
			text: "LAB-" + localStorage.getItem("numberRandom"),
			type: "success",
			showCancelButton: false,
			confirmButtonText: "OK",
			closeOnConfirm: true
		}, function () {
			localStorage.setItem("celu", $("#numero").val());
			window.location.href = $("#siguiente").attr("href");
		});
	}
}

var reenviar = function (e) {
	e.preventDefault();
	var numeroAleatorio2 = Math.floor(Math.random() * 900) + 99;
	window.localStorage.setItem("numberRandom2", numeroAleatorio2);
	swal({
		title: "Tu codigo aleatorio es : ",
		text: "LAB-" + localStorage.getItem("numberRandom2"),
		timer: 2000,
		showConfirmButton: false
	});
}

var longCodigo = function () {
	if ($(this).val().length === 0) {
		$("#siguiente").attr("href", "signup.html");
	} else {
		return false;
	}

}

var cambiaInput = function (e) {
	var long = $(this).val().length;
	if (long == 1) {
		$(this).next().focus();
	}
	if (e.keyCode == 8) {
		$(this).prev().focus();
	}
}

var validarCodigo = function () {
	var concatCode = $(".codigo").eq(0).val() + $(".codigo").eq(1).val() + $(".codigo").eq(2).val();
	if (concatCode === localStorage.getItem("numberRandom") || concatCode === localStorage.getItem("numberRandom2")) {
		$("#siguienteValidar").attr("href", "signup.html");
	} else if ($(".codigo").val().length == 0) {
		swal("Ingrese su código por favor")
	} else {
		$(".codigo").val("");
		$(".codigo").eq(0).focus();
		swal("Código inválido")
	}
}

var validarData = function () {
	var nombre = $("#nombre").val().trim().length;
	var apellidos = $("#apellidos").val().trim().length;
	var emailong = $("#email").val().trim().length;
	var email = $("#email").val().trim();
	var regexEmail = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

	if (nombre > 1 && nombre < 20 && apellidos > 1 && apellidos < 30 && emailong > 5 && emailong < 50 && regexEmail.test(email)) {
		$(this).attr("href", "geolocation.html");
	} else {
		swal({
			title: "Datos incorrectos",
			text: "Ingresa correctamente tu información",
			timer: 2000,
			showConfirmButton: false
		});
	}
}

var validarCheck = function () {
	if ($("#checkbox").is(":checked")) {
		$(this).attr("href", "geolocation.html");
	} else {
		swal({
			title: "Datos incorrectos",
			text: "Acepta los términos y condiciones",
			timer: 2000,
			showConfirmButton: false
		});
	}
}

var soloLetras = function (e) {
	key = e.keyCode || e.which;
	// fromCharCode(key) obteniene el caracter presionado por el usuario que añadiendo la sentencia toLowerCase() convertiríamos la letra a minúscula
	tecla = String.fromCharCode(key).toLowerCase();
	letras = " áéíóúabcdefghijklmnñopqrstuvwxyz";
	// Arreglo de teclas especiales
	especiales = "8-37-39-46";
	tecla_especial = false
	// si está la tecla presionada por el usuario en el array de teclas especiales “especiales”
	for (var i in especiales) {
		if (key == especiales[i]) {
			tecla_especial = true;
			break;
		}
	}
	// indexOf() que averigua si una cadena se encuentra dentro de otra cadena devolviendo como valor la posición de la cadena encontrada o el valor de -1 si es que no la encuentra , que para este caso queremos averiguar si el caracter presionado se encuentra entre las letras permitidas.
	if (letras.indexOf(tecla) == -1 && !tecla_especial) {
		return false;
	}
}

var convertirMayuscula = function(e){

}
