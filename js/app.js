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

function longNumbers(e) {
	if ($(this).val().length == 9) {
		$("#siguiente").attr("href", "verifynumber.html");
	} else {
		$("#siguiente").removeAttr("href");
	}
}

function keyDisable(e) {
	if ($(this).val().length < 9) {
		return true;
	} else {
		return false;
	}
}

function codeGenerator(e) {
	var longitud = $("#numero").val().length;
	e.preventDefault();
	if (longitud === 9) {
		var code = "LAB-";
		var aleatorio = Math.floor((Math.random() * 900) + 99);
		swal({
			title: "Tu codigo aleatorio es : ",
			text: code + aleatorio,
			type: "success",
			showCancelButton: false,
			confirmButtonText: "Ok!",
			closeOnConfirm: true
		}, function () {
			window.location.href = $("#siguiente").attr("href");
		});
	}
}

function longCode(e) {
	if ($(this).val().length === 0) {
		return true;
	} else {
		return false;
	}
}