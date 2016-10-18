var cargar = function () {
	$("#numero").keydown(numbersValidation);
	$("#numero").keyup(longNumbers);
	$("#numero").keypress(keyDisable);
	$("#siguiente").click(codeGenerator);
	$(".codigo").keypress(longCode);
	$(".codigo").keydown(numbersValidation);
	$("#cel").text(window.localStorage.getItem("celu"));
	$(".codigo").keyup(changeInput);
	$("#siguienteValidar").click(validateCode);
	$("#resend").click(resend);
	$("#siguienteRegistro").click(validateData);
}

$(document).ready(cargar);


function numbersValidation(e) {
	var ascii = e.keyCode;
	if (ascii == 8 || ascii == 9 || (ascii >= 48 && ascii <= 57)) {
		return true;
	} else {
		return false;
	}
}

function longNumbers() {
	if ($(this).val().length == 9) {
		$("#siguiente").attr("href", "verifynumber.html");
	} else {
		$("#siguiente").removeAttr("href");
	}
}

function keyDisable() {
	if ($(this).val().length < 9) {
		return true;
	} else {
		return false;
	}
}

function codeGenerator(e) {
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

function resend(e) {
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

function longCode() {
	if ($(this).val().length === 0) {
		$("#siguiente").attr("href", "signup.html");
	} else {
		return false;
	}

}

function changeInput(e) {
	var long = $(this).val().length;
	if (long == 1) {
		$(this).next().focus();
	}
	if (e.keyCode == 8) {
		$(this).prev().focus();
	}
}

function validateCode() {
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

function validateData() {
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

