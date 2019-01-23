//******************************************************************************
// // Funcion para generar el datetimepicker
// Además de agregar los eventos a las respectivas etiquetas
//******************************************************************************



$(function () {
    $("#loader").hide();
    //agrega los eventos las capas necesarias
    $("#enviar").click(function () {
        $("#loader").show();
        enviar();
    });

    //agrega los eventos las capas necesarias
    $("#cancelar").click(function () {
        limpiarForm();
        $("#myModalFormulario").modal("hide");
    });

});

//******************************************************************************
//******************************************************************************
//El metodo enviar envia la información del login
//******************************************************************************
//******************************************************************************

function enviar() {
    if (validar()) {
        //Se envia la información por ajax
        $.ajax({
            url: 'LoguinServlet',
            data: {
                accion: "validarUsuario",
                usuario: $("#usuario").val(),
                password: $("#password").val()
            },
            error: function () { //si existe un error en la respuesta del ajax
                mostrarMensaje("alert alert-danger", "Se genero un error, contacte al administrador (Error del ajax)", "Error!");
                $("#loader").hide();
            },
            success: function (data) { //si todo esta correcto en la respuesta del ajax, la respuesta queda en el data
                var respuestaTxt = data.substring(2);
                var tipoRespuesta = data.substring(0, 2);
                if (tipoRespuesta === "C~") {
                    mostrarMensaje("alert alert-success", respuestaTxt, "Correcto!");
                    $("#loader").hide();
                    $("#myModalFormulario").modal("hide");
                    //se redirecciona en JavaScript
                    
                    if(data.substring(2, 3)=== "A")
                    setTimeout(function () { window.location = "PersonasJSP.jsp";}, 800);
                    else
                        setTimeout(function () { window.location = "AplicacionJSP.jsp";}, 800);
                        
                } else {
                    if (tipoRespuesta === "E~") {
                        mostrarMensaje("alert alert-danger", respuestaTxt, "Error!");
                        $("#loader").hide();
                    } else {
                        mostrarMensaje("alert alert-danger", "Se genero un error, contacte al administrador", "Error!");
                        $("#loader").hide();
                    }
                }
            },
            dataType: "text",
            type: 'POST'
        });
    } else {
        mostrarMensaje("alert alert-danger", "Debe digitar los campos del formulario", "Error!");
        $("#loader").hide();
    }
}

function validar() {
    var validacion = true;

    //Elimina estilo de error en los css
    //notese que es sobre el grupo que contienen el input
    $("#groupUsario").removeClass("has-error");
    $("#groupPassword").removeClass("has-error");

    //valida cada uno de los campos del formulario
    //Nota: Solo si fueron digitados
    if ($("#usuario").val() === "") {
        $("#groupUsario").addClass("has-error");
        validacion = false;
    }
    if ($("#password").val() === "") {
        $("#groupPassword").addClass("has-error");
        validacion = false;
    }
    return validacion;
}


//******************************************************************************
//******************************************************************************

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

//******************************************************************************
//******************************************************************************

function limpiarForm() {
    //setea el focus del formulario
    $('#usuario').focus();
    $("#loader").hide();
    //Resetear el formulario
    $('#formLogin').trigger("reset");
}



