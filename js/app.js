// Funcionalidades para Lyft

// - Validar que solo se ingresen #s
// - Validar que sean 9 #s como max.
// - Generar un código aleatorio con la estructura LAB-XYZ
// - Validar lo obvio

$(document).ready(function() {
	$("#numero").keydown(function(evento) {
		var ascii = evento.keyCode;
		if (ascii == 8 || (ascii >= 48 && ascii <= 57)) {
			return true;
		} else {
			return false;
		}
	});
	$("#numero").keyup(function(evento) {
		var longitud = $(this).val().length;
		if (longitud == 9) {
			$("#siguiente").attr("href", "signup.html");
		} else  {
			$("#siguiente").removeAttr("href");
		}

	});
	$("#numero").keypress(function(evento){
		var longitud = $(this).val().length;
   if (longitud < 9) {
        return true;
    } else {
        return false;
    }
});
});
