/* 
 MERLYN PRENDAS BARBOZA
 */


$(function () {
    //Genera el datapicker
    $('#dpFechaNacimiento').datetimepicker({
        weekStart: 1,
        todayBtn: 1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 2,
        minView: 2,
        forceParse: 0
    });

    //agrega los eventos las capas necesarias
    $("#enviar").click(function () {
        enviar();
    });

    //agrega los eventos las capas necesarias
    $("#cancelar").click(function () {
        limpiarForm();
    });

});





// METODO PARA GUARGAR LOS DATOS


function enviar() {

    if (validar()) {
        longitud();
        //Se envia la información por ajax   //passwordconf,password,nomuser,direccion,email,dpFechaNacimiento,celular,apellidos,nombre,cedula
        $.ajax({
            url: 'UsuarioPublicoServlet',
            data: {
                accion: $("#personasAction").val(),
                cedula: $("#cedula").val(),
                nombre: $("#nombre").val(),
                apellidos: $("#apellidos").val(),
                fechaNacimiento: $("#dpFechaNacimiento").data('date'),
                nomUsuario: $("#nomUser").val(),
                correo: $("#email").val(),
                direccion: $("#direccion").val(),
                telefono: $("#telefono").val(),
                celular: $("#celular").val(),
                contraseña: $("#contraseña").val()
            },
            error: function () { //si existe un error en la respuesta del ajax
                mostrarMensaje("alert alert-danger", "Se genero un error, contacte al administrador (Error del ajax)", "Error!");
            },
            success: function (data) { //si todo esta correcto en la respuesta del ajax, la respuesta queda en el data
                var respuestaTxt = data.substring(2);
                var tipoRespuesta = data.substring(0, 2);
                if (tipoRespuesta === "C~") {
                    setTimeout(mostrarMensaje("alert alert-success", respuestaTxt, "Correcto!"), 3000);
                    $("#myModalFormulario").modal("hide");
                    limpiarForm();
                    setTimeout(function () { window.location = "LoginJSP.jsp";}, 800);
                } else {
                    if (tipoRespuesta === "E~") {
                        mostrarMensaje("alert alert-danger", respuestaTxt, "Error!");
                    } else {
                        mostrarMensaje("alert alert-danger", "Se genero un error, contacte al administrador", "Error!");
                    }
                }

            },
            type: 'POST'
        });
    } else {
        mostrarMensaje("alert alert-danger", "Debe digitar los campos del formulario", "Error!");
    }
}


//------------------------------------------------------------------------------VALIDANDO LOS DATOS DE ENTRADA

function longitud() {
    if ($("#direccion").val().length > 40) {

        var x = $("#direccion").val();
        $("#direccion").val(x.substring(0, 40));
    }
}
function validar() {
    var validacion = true;

    //Elimina estilo de error en los css
    //notese que es sobre el grupo que contienen el input
    $("#groupCedula").removeClass("has-error");
    $("#groupNombre").removeClass("has-error");
    $("#groupApellidos").removeClass("has-error");
    $("#groupCelular").removeClass("has-error");

    $("#groupFechaNacimiento").removeClass("has-error");
    $("#groupNombreUsuario").removeClass("has-error");

    $("#groupEmail").removeClass("has-error");
    $("#groupDireccion").removeClass("has-error");
    $("#groupContraseña").removeClass("has-error");

    $("#groupNombUser").removeClass("has-error");
    $("#groupPassword").removeClass("has-error");
    $("#groupPasswordconf").removeClass("has-error");
    $("#groupTelefono").removeClass("has-error");

    if ($("#cedula").val() === "") {
        $("#groupCedula").addClass("has-error");
        validacion = false;
    }
    if ($("#nombre").val() === "") {
        $("#groupNombre").addClass("has-error");
        validacion = false;
    }
    if ($("#apellidos").val() === "") {
        $("#groupApellidos").addClass("has-error");
        validacion = false;
    }
    if ($("#celular").val() === "") {
        $("#groupCelular").addClass("has-error");
        validacion = false;
    }
    if ($("#telefono").val() === "") {
        $("#groupTelefono").addClass("has-error");
        validacion = false;
    }
    if ($("#dpFechaNacimiento").data('date') === "") {
        $("#groupFechaNacimiento").addClass("has-error");
        validacion = false;
    }

    if ($("#nomUser").val() === "") {
        $("#groupNombreUsuario").addClass("has-error");
        validacion = false;
    }

    if ($("#email").val() === "" && validaCorreos() === false) {
        $("#groupEmail").addClass("has-error");
        validacion = false;
    }

    if ($("#direccion").val() === "") {
        $("#groupDireccion").addClass("has-error");
        validacion = false;
    }

    if ($("#nomuser").val() === "") {
        $("#groupNombUser").addClass("has-error");
        validacion = false;
    }


    if ($("#contraseña").val() === "") {
        $("#groupContraseña").addClass("has-error");
        validacion = false;
    }

    return validacion;
}

function esNumero() {
    $("#groupCedula").removeClass("has-error");
    var num = "abcdefghijklmnopqrstuvwxyz";
    var n = $("#cedula").val();
    n = n.toString();

    if (n.length > 11) {
        alert("la identificacion es superior a lo permitido");
        $("#groupCedula").addClass("has-error");
    }
    for (var i = 0; i < n.length; i++) {
        for (var j = 0; j < num.length; j++) {
            if (num[j] === n[i]) {
                alert("ingresa solo valores numericos");
                $("#groupCedula").addClass("has-error");
                return;
            }
        }
    }
}

function validaCorreos() {
    $("#groupEmail").removeClass("has-error");
    var mail = $("#email").val();
    var atpos = mail.indexOf("@");
    var dotpos = mail.lastIndexOf(".");
    if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= mail.length) {
        alert("No es un email valido!");
        $("#groupEmail").addClass("has-error");
        return false;
    } else {
        return true;
    }
}

function validaNombre() {
    $("#groupNombre").removeClass("has-error");
    var numero = "0123456789";
    var nom = $("#nombre").val();
    for (var i = 0; i < nom.length; i++) {
        for (var j = 0; j < numero.length; j++) {
            if (nom[i] === numero[j]) {
                alert("ingresa solo Letras!!");
                $("#groupNombre").addClass("has-error");
                return;
            }
        }
    }
}

function validaApellido() {
    $("#groupApellidos").removeClass("has-error");
    var numero = "0123456789";
    var nom = $("#apellidos").val();
    for (var i = 0; i < nom.length; i++) {
        for (var j = 0; j < numero.length; j++) {
            if (nom[i] === numero[j]) {
                alert("ingresa solo Letras!!");
                $("#groupApellidos").addClass("has-error");
                return;
            }
        }
    }
}

function validaTelefono() {
    $("#groupTelefono").removeClass("has-error");
    var numero = "abcdefghijklmnopqrstuvwxyz";
    var nom = $("#telefono").val();
    for (var i = 0; i < nom.length; i++) {
        for (var j = 0; j < numero.length; j++) {
            if (nom[i] === numero[j]) {
                alert("ingresa solo Numeros!!");
                $("#groupTelefono").addClass("has-error");
                return;
            }
        }
    }
}

function validaCelular() {
    $("#groupCelular").removeClass("has-error");
    var numero = "abcdefghijklmnopqrstuvwxyz";
    var nom = $("#celular").val();
    for (var i = 0; i < nom.length; i++) {
        for (var j = 0; j < numero.length; j++) {
            if (nom[i] === numero[j]) {
                alert("ingresa solo Numeros!!");
                $("#groupCelular").addClass("has-error");
                return;
            }
        }
    }
}

function mostrarMensaje(classCss, msg, neg) {
    //se le eliminan los estilos al mensaje
    $("#mesajeResult").removeClass();

    //se setean los estilos
    $("#mesajeResult").addClass(classCss);

    //se muestra la capa del mensaje con los parametros del metodo
    $("#mesajeResult").fadeIn("slow");
    $("#mesajeResultNeg").html(neg);
    $("#mesajeResultText").html(msg);
    $("#mesajeResultText").html(msg);
}

function limpiarForm() {
    //setea el focus del formulario
    $('#cedula').focus();

    //se cambia la accion por agregarPersona
    $("#personasAction").val("agregarPersona");

    //esconde el div del mensaje
    mostrarMensaje("hiddenDiv", "", "");
    //Resetear el formulario
    $('#formPersonas').trigger("reset");
}
