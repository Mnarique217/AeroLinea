//******************************************************************************
// // Funcion para generar el datetimepicker
// Además de agregar los eventos a las respectivas etiquetas
//******************************************************************************


/**
 * simplePagination.js v1.6
 * A simple jQuery pagination plugin.
 * http://flaviusmatis.github.com/simplePagination.js/
 *
 * Copyright 2012, Flavius Matis
 * Released under the MIT license.
 * http://flaviusmatis.github.com/license.html
 */



function longitud() {
    if ($("#direccion").val().length > 40) {

        var x = $("#direccion").val();
        $("#direccion").val(x.substring(0, 40));
    }
}

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
        $("#myModalFormulario").modal("hide");
    });

    $("#btMostarForm").click(function () {
        limpiarForm();
        $("#myModalFormulario").modal("show");
    });
});

//https://www.w3schools.com/w3css/w3data_filters.asp
function filtrado() {
    var tipFiltro = document.getElementById("personasSelect");
    var input, filter, table, tr, td, i;
    input = document.getElementById("buscadorPersonas");
    filter = input.value.toUpperCase();
    table = document.getElementById("tablaPersonas");
    tr = table.getElementsByTagName("tr");
//cilco que esconde las filas que no se ocupan ver
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[parseInt(tipFiltro.selectedIndex)];
        if (td) {
            if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}


function eliminarPersona(idPersona) {
    ocultarModal("myModalEliminar");
    mostrarModal("myModal", "Espere por favor..", "Se esta eliminando a la persona seleccionada");
    //Se envia la información por ajax
    $.ajax({
        url: 'PersonaServlet',
        data: {
            accion: "eliminarPersonas",
            idPersona: idPersona
        },
        error: function () { //si existe un error en la respuesta del ajax
            cambiarMensajeModal("myModal", "Resultado acción", "Se presento un error, contactar al administador");
        },
        success: function (data) { //si todo esta correcto en la respuesta del ajax, la respuesta queda en el data
            // se cambia el mensaje del modal por la respuesta del ajax
            var respuestaTxt = data.substring(2);
            var tipoRespuesta = data.substring(0, 2);
            if (tipoRespuesta === "E~") {
                cambiarMensajeModal("myModal", "Resultado acción", respuestaTxt);
            } else {
                setTimeout(consultarPersonas, 2000); // hace una pausa y consulta la información de la base de datos
            }
        },
        type: 'POST',
        dataType: "text"
    });
}

function paginacion() {
    // Grab whatever we need to paginate
    var pageParts = $(".paginate2");
    // How many parts do we have?
    var numPages = pageParts.length;
    // How many parts do we want per page?
    var perPage = 5;

    pageParts.slice(perPage).hide();
    // Apply simplePagination to our placeholder
    $("#page-nav").pagination({
        items: numPages,
        itemsOnPage: perPage,
        cssStyle: "light-theme",
        prevText: "<<",
        nextText: ">>",

        onPageClick: function (pageNum) {
            // Which page parts do we show?
            var start = perPage * (pageNum - 1);
            var end = start + perPage;
            pageParts.hide()
                    .slice(start, end).show();
        }
    });
}

function consultarPersonaByID(idPersona) {
    mostrarModal("myModal", "Espere por favor..", "Consultando la persona seleccionada");    //Se envia la información por ajax
    $.ajax({
        url: 'PersonaServlet',
        data: {
            accion: "consultarPersonasByID",
            idPersona: idPersona
        },
        error: function () { //si existe un error en la respuesta del ajax

        },
        success: function (data) { //si todo esta correcto en la respuesta del ajax, la respuesta queda en el data
            // se oculta el mensaje de espera
            ocultarModal("myModal");
            limpiarForm();
            //se muestra el formulario
            $("#myModalFormulario").modal();
            $("#cedula").attr('readonly', 'readonly');
            //se modificar el hidden que indicar el tipo de accion que se esta realizando
            $("#personasAction").val("modificarPersona");
            $("#cedula").val(data.pkId);
            $("#nombre").val(data.nombre);
            $("#apellidos").val(data.apellidos);
            var temp = data.fecNacimiento;
            $("#dpFechaNacimientoText").val(temp);
            $("#email").val(data.correoElectronico);
            $("#direccion").val(data.direccion);
            $("#telefono").val(data.telefono);
            $("#celular").val(data.celular);
        },
        type: 'POST',
        dataType: "json"
    });
}

//******************************************************************************
//Se ejecuta cuando la página esta completamente cargada
//******************************************************************************

$(document).ready(function () {
    consultarPersonas();
    $('#myModalFormulario').on('shown.bs.modal', function () {resizeMap();});
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

        url: 'PersonaServlet',
        data: {
            accion: "consultarPersonas"
        },
        error: function () { //si existe un error en la respuesta del ajax
            alert("Se presento un error a la hora de cargar la información de las personas en la base de datos");
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
function confirmarEliminacion(idPersona) {
    mostrarModal("myModalEliminar", "", "");
    $("#myModalEliminar").attr("data-id", idPersona);
}
function dibujarTabla(dataJson) {
//limpia la información que tiene la tabla
    $("#tablaPersonas").html("");
    //muestra el enzabezado de la tabla
    var head = $("<thead />");
    var body = $("<tbody />");
    var row = $("<tr />");
    head.append(row);

    $("#tablaPersonas").append(head);
    row.append($("<th><b>CEDULA</b></th>"));
    row.append($("<th><b>NOMBRE</b></th>"));
    row.append($("<th><b>EMAIL</b></th>"));
    row.append($("<th><b>CELULAR</b></th>"));
    row.append($("<th><b>ACCIÓN</th>"));
    //carga la tabla con el json devuelto
    $("#tablaPersonas").append(body);
    for (var i = 0; i < dataJson.length; i++) {
        dibujarFila(dataJson[i]);
    }
    body.append("<tr><td colspan=5 ><div class=\"derecha\" id=\"page-nav\"></div></tr></td>");
    $("#tablaPersonas").addClass("table-responsive table-bordered");
    paginacion();
}
function dibujarFila(rowData) {
    var row = $("<tr class=\"paginate2\" />");
    $("#tablaPersonas").append(row);
    row.append($("<td>" + rowData.pkId + "</td>"));
    row.append($("<td>" + rowData.nombre + "</td>"));
    row.append($("<td>" + rowData.correoElectronico + "</td>"));
    row.append($("<td>" + rowData.celular + "</td>"));
    row.append($('<td><center><button type="button" class="btn btn-default btn-xs" aria-label="Left Align" onclick="consultarPersonaByID(' + rowData.pkId + ');">' +
            '<span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>' +
            '</button>' +
            '<button type="button" class="btn btn-default btn-xs" aria-label="Left Align" onclick="confirmarEliminacion(' + rowData.pkId + ');">' +
            '<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>' +
            '</button></center></td>'));
}

//******************************************************************************
//******************************************************************************
//El metodo enviar funciona tanto para el insertar como para el modificar
//******************************************************************************
//******************************************************************************
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
function enviar() {
    if (validar()) {
        longitud();
        //Se envia la información por ajax   //passwordconf,password,nomuser,direccion,email,dpFechaNacimiento,celular,apellidos,nombre,cedula
        $.ajax({
            url: 'PersonaServlet',
            data: {
                accion: $("#personasAction").val(),
                cedula: $("#cedula").val(),
                nombre: $("#nombre").val(),
                apellidos: $("#apellidos").val(),
                fechaNacimiento: $("#dpFechaNacimiento").data('date'),
                correo: $("#email").val(),
                direccion: $("#direccion").val(),
                telefono: $("#telefono").val(),
                celular: $("#celular").val()
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
    $("#groupCedula").removeClass("has-error");
    $("#groupNombre").removeClass("has-error");
    $("#groupApellidos").removeClass("has-error");
    $("#groupCelular").removeClass("has-error");

    $("#groupFechaNacimiento").removeClass("has-error");
    $("#groupEmail").removeClass("has-error");
    $("#groupDireccion").removeClass("has-error");

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
    if ($("#email").val() === "") {
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
    $('#cedula').focus();
    $("#cedula").removeAttr("readonly"); //elimina el atributo de solo lectura

    //se cambia la accion por agregarPersona
    $("#personasAction").val("agregarPersona");

    //esconde el div del mensaje
    mostrarMensaje("hiddenDiv", "", "");
    //Resetear el formulario
    $('#formPersonas').trigger("reset");
}



