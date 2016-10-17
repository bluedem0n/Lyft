// Funcionalidades para Lyft

// - Validar que solo se ingresen #s
// - Validar que sean 9 #s como max.
// - Generar un código aleatorio con la estructura LAB-XYZ
// - Validar lo obvio

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

function changeInput() {
	var long = $(this).val().length;
	if (long == 1) {
		$(this).next().focus();
	}
}

function validateCode() {
	var concatCode = $(".codigo").eq(0).val() + $(".codigo").eq(1).val() + $(".codigo").eq(2).val();
	if (concatCode == localStorage.getItem("numberRandom") || concatCode == 			localStorage.getItem("numberRandom2")) {
		$("#siguienteValidar").attr("href", "signup.html");
	} else {
		swal("Marginal tu codigo es incorrecto")
	}

}