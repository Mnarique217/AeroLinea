//******************************************************************************
// // Funcion para generar el datetimepicker
// Además de agregar los eventos a las respectivas etiquetas
//******************************************************************************
$(function () {

    //Genera el datapicker
    $('#dpFecha').datetimepicker({
        weekStart: 1,
        todayBtn: 1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 2,
        minView: 2,
        forceParse: 0
    });

    $("#enviar").click(function () {
        enviar();
    });

    //agrega los eventos las capas necesarias
    $("#cancelar").click(function () {
        limpiarForm();
        $("#myModalFormulario").modal("hide");
    });
    $("#btMostarForm").click(function () {
        limpiarForm();
        $("#myModalFormulario").modal("show");
    });
});

//******************************************************************************
//Se ejecuta cuando la página esta completamente cargada
//******************************************************************************

$(document).ready(function () {
   // consultarPersonas();
});

//******************************************************************************
//******************************************************************************
//metodos para consultas el listado de las personas
//******************************************************************************
//******************************************************************************

function consultarPersonas() {
    mostrarModal("myModal", "Espere por favor..", "Consultando la información de personas en la base de datos");
    //Se envia la información por ajax
    $.ajax({
        url: 'TelefonosServlet',
        data: {
            accion: "consultarTelefonos"
        },
        error: function () { //si existe un error en la respuesta del ajax
            alert("Se presento un error a la hora de cargar la información de los telefonos");
        },
        success: function (data) { //si todo esta correcto en la respuesta del ajax, la respuesta queda en el data
            dibujarTabla(data);
            // se oculta el modal esta funcion se encuentra en el utils.js
            ocultarModal("myModal");
        },
        type: 'POST',
        dataType: "json"
    });
}

function dibujarTabla(dataJson) {
    //limpia la información que tiene la tabla
    $("#tablaPersonas").html("");

    //muestra el enzabezado de la tabla
    var head = $("<thead />");
    var row = $("<tr />");
    head.append(row);
    $("#tablaPersonas").append(head);
    row.append($("<th><b>Telefono</b></th>"));
    row.append($("<th><b>cedula</b></th>"));
    row.append($("<th><b>Descripcion</b></th>"));
    row.append($("<th><b>Ultimo Usuario</b></th>"));
    row.append($("<th><b>ultima modificacion</b></th>"));
    //carga la tabla con el json devuelto
    for (var i = 0; i < dataJson.length; i++) {
        dibujarFila(dataJson[i]);
    }
}

function dibujarFila(rowData) {
    //Cuando dibuja la tabla en cada boton se le agrega la funcionalidad de cargar o eliminar la informacion
    //de un telefono

    var name= rowData.pkTelefono;
    
    var row = $("<tr />");
    $("#tablaPersonas").append(row);
    row.append($("<td>" + rowData.pkTelefono + "</td>"));
    row.append($("<td>" + rowData.pkFkCedula + "</td>"));
    row.append($("<td>" + rowData.descripcion + "</td>"));
    row.append($("<td>" + rowData.ultUsuario + "</td>"));
    row.append($("<td>" + rowData.ultModificacion + "</td>"));
    row.append($('<td><button type="button" class="btn btn-default btn-xs" aria-label="Left Align" onclick="alert(\'modificar\');">' +
            '<span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>' +
            '</button>' +
            '<button type="button" id='+name+';class="btn btn-default btn-xs" aria-label="Left Align" onclick="eliminarTelefono('+name+');">' +
            '<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>' +
            '</button></td>'));
}

function eliminarTelefono(numero) {
    alert("se quiere eliminar "+numero);
        //Se envia la información por ajax
        $.ajax({
            url: 'TelefonosServlet',
            data: {
                accion: $("#TelefonoAction").val(),
                telefono: $("#numero").val(),
                cedula: $("#cedula").val(),
                descripcion: $("#descripcion").val()
            },
            error: function () { //si existe un error en la respuesta del ajax
                mostrarMensaje("alert alert-danger", "Se genero un error, contacte al administrador (Error del ajax)", "Error!");
            },
            success: function (data) { //si todo esta correcto en la respuesta del ajax, la respuesta queda en el data
                var respuestaTxt = data.substring(2);
                var tipoRespuesta = data.substring(0, 2);
                if (tipoRespuesta === "C~") {
                    mostrarMensaje("alert alert-success", respuestaTxt, "Correcto!");
                    $("#myModalFormulario").modal("hide");
                    consultarPersonas();
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
}

//******************************************************************************
//******************************************************************************
//El metodo enviar funciona tanto para el insertar como para el modificar
//******************************************************************************
//******************************************************************************

function enviar() {
    if (validar()) {
        //Se envia la información por ajax
        $.ajax({
            url: 'TelefonosServlet',
            data: {
                accion: $("#TelefonoAction").val(),
                telefono: $("#numero").val(),
                cedula: $("#cedula").val(),
                descripcion: $("#descripcion").val()
            },
            error: function () { //si existe un error en la respuesta del ajax
                mostrarMensaje("alert alert-danger", "Se genero un error, contacte al administrador (Error del ajax)", "Error!");
            },
            success: function (data) { //si todo esta correcto en la respuesta del ajax, la respuesta queda en el data
                var respuestaTxt = data.substring(2);
                var tipoRespuesta = data.substring(0, 2);
                if (tipoRespuesta === "C~") {
                    mostrarMensaje("alert alert-success", respuestaTxt, "Correcto!");
                    $("#myModalFormulario").modal("hide");
                    consultarPersonas();
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

function validar() {
    var validacion = true;

    //Elimina estilo de error en los css
    //notese que es sobre el grupo que contienen el input
    $("#groupDescripcion").removeClass("has-error");
    $("#groupTelefono").removeClass("has-error");
    $("#groupCedula").removeClass("has-error");
    $("#TelefonoAction").removeClass("has-error");

    //valida cada uno de los campos del formulario
    //Nota: Solo si fueron digitados
    if ($("#numero").val() === "") {
        $("#groupTelefono").addClass("has-error");
        validacion = false;
    }
    if ($("#cedula").val() === "") {
        $("#groupCedula").addClass("has-error");
        validacion = false;
    }
    if ($("#descripcion").val() === "") {
        $("#groupDescripcion").addClass("has-error");
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
    $("#mesajeResult").fadeIn("fast");
    $("#mesajeResultNeg").html(neg);
    $("#mesajeResultText").html(msg);
    $("#mesajeResultText").html(msg);
}

//******************************************************************************
//******************************************************************************

function limpiarForm() {
    //setea el focus del formulario
    $('#cedula').focus();
    $("#cedula").removeAttr("readonly"); //elimina el atributo de solo lectura

    //se cambia la accion por agregarPersona
    $("#TelefonoAction").val("agregarTelefonos");

    //esconde el div del mensaje
    mostrarMensaje("hiddenDiv", "", "");

    //Resetear el formulario
    $('#formPersonas').trigger("reset");
}



