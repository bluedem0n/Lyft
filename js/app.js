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
	var numeroAleatorio = Math.floor(Math.random()*900)+99;
	e.preventDefault();
	if (longitud === 9) {
		window.localStorage.setItem("numberRandom",numeroAleatorio);
		swal({
			title: "Tu codigo aleatorio es : ",
			text: "LAB-" + localStorage.getItem("numberRandom"),
			type: "success",
			showCancelButton: false,
			confirmButtonText: "Ok!",
			closeOnConfirm: true
		}, function () {
			localStorage.setItem("celu",$("#numero").val());
			window.location.href = $("#siguiente").attr("href");
		});
	}
}

function longCode(e) {
	if ($(this).val().length === 0) {
		$("#siguiente").attr("href","signup.html");
	} else {
		return false;
	}

}
