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

var idSeleccionada = false;

$(document).ready(function () {
    consultarAviones();
});

$(function () {
    //envia los datos por ajax al servlet
    $("#enviar").click(function () {
        enviar();
    });

    //si cancela se vuelve a modo agregar y quita el modificar
    $("#cancel").click(function () {
        limpiarForm();
        $("#modalTipoAvion").modal("hide");
    });

    //muestra la tabla de tipos para tomar id y hacer avion nuevo
    $("#btMostarForm").click(function () {
        limpiarForm();
        $("#modalTipoAvion").modal("show");
        consultarTiposAvion();
    });
});

//*******************************************************************************************************************
//*******************************************************************************************************************
//******************   Aviones        *******************************************************************************
//*******************************************************************************************************************
//*******************************************************************************************************************
//------------------------------------------------------------------------------consulta a la base de datos por aviones
function consultarAviones() {
    mostrarModal("myModal", "Espere por favor..", "Consultando la información de Aviones  en la base de datos");
    //Se envia la información por ajax
    $.ajax({
        url: 'AvionesServlet',
        data: {
            accion: "consultarAviones"
        },
        error: function () { //si existe un error en la respuesta del ajax
            alert("Se presento un error a la hora de cargar la información de las personas en la base de datos");
        },
        success: function (data) { //si todo esta correcto en la respuesta del ajax, la respuesta queda en el data
            dibujarTablaAviones(data);
            ocultarModal("myModal");
        },
        type: 'POST',
        dataType: "json"
    });
}
//------------------------------------------------------------------------------dibuja la tabla Avion
function dibujarTablaAviones(dataJson) {
//limpia la información que tiene la tabla
    $("#tablaAviones").html("");
    //muestra el enzabezado de la tabla
    var head = $("<thead />");
    var body = $("<tbody/>");
    var row = $("<tr />");
    head.append(row);

    $("#tablaAviones").append(head);
    row.append($("<th><b>MODELO</b></th>"));
    row.append($("<th><b>CANT ASIENT</b></th>"));
    row.append($("<th><b>CAPACIDAD PAS</b></th>"));
    row.append($("<th ><b>ACCION</th>"));
    //carga la tabla con el json devuelto

    $("#tablaAviones").append(body);
    for (var i = 0; i < dataJson.length; i++) {
        dibujarFilaAvion(dataJson[i]);
    }
    body.append("<tr><td colspan=9 ><div  id=\"paginacion\"></div></tr></td>");
    $("#tablaAviones").addClass("table-responsive");
    paginacion2();
}
//------------------------------------------------------------------------------dibujar una fila de tabla
function dibujarFilaAvion(rowData) {
//Cuando dibuja la tabla en cada boton se le agrega la funcionalidad de cargar o eliminar la informacion
//de una persona
    var row = $("<tr class=\"paginate2\" />");
    $("#tablaAviones").append(row);
    row.append($("<td>" + rowData.tipoAvion.modelo + "</td>"));
    row.append($("<td>" + rowData.tipoAvion.cantidadAsientos + "</td>"));
    row.append($("<td>" + rowData.tipoAvion.cantidadPasajeros + "</td>"));
    row.append($('<td>' +
            '<button type="button" class="btn btn-default btn-xs  aria-label="left Align" onclick="mergeAvion(' + rowData.pkId + ')">' +
            '<span class="glyphicon glyphicon-check" aria-hidden="true"></span>' +
            '</button>' +
            '<button type="button" class="btn btn-default btn-xs" aria-label="Left Align" onclick="confirmarEliminacion(' + rowData.pkId + ');">' + /*eliminarPersona(' + rowData.pkCedula + ')*/
            '<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>' +
            '</button></td>'));
}
//------------------------------------------------------------------------------toma el id para merge
function mergeAvion(idAvion) {
    $("#id-merge").val(idAvion);//el id del avion que se le va hacer merge
    $("#modalTipoAvion").modal("show");
    consultarTiposAvion();
    $("#AvionesAction").val("modificarAvion");
}
//------------------------------------------------------------------------------modal eliminar
function confirmarEliminacion(idAvion) {
    mostrarModal("myModalEliminar", "", "");
    $("#myModalEliminar").attr("data-id", idAvion);
}
//------------------------------------------------------------------------------eliminar Avion
function eliminarAvion(id) {
    ocultarModal("myModalEliminar");
    mostrarModal("myModal", "Espere por favor..", "eliminando........");
    //Se envia la información por ajax
    $.ajax({
        url: 'AvionesServlet',
        data: {
            accion: "eliminarAvion",
            idAvion: id
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
                setTimeout(consultarAviones(), 2000);
            }
        },
        type: 'POST',
        dataType: "text"
    });
}
//------------------------------------------------------------------------------envio
function enviar() {
    if (validar()) {
        $.ajax({
            url: 'AvionesServlet',
            data: {
                accion: $("#AvionesAction").val(),
                idTipo: $("#idTipo").val(),
                idMerge: $("#id-merge").val()
            },
            error: function () { //si existe un error en la respuesta del ajax
                mostrarMensaje("alert alert-danger", "Se genero un error, contacte al administrador (Error del ajax)", "Error!");
            },
            success: function (data) { //si todo esta correcto en la respuesta del ajax, la respuesta queda en el data
                var respuestaTxt = data.substring(2);
                var tipoRespuesta = data.substring(0, 2);
                if (tipoRespuesta === "C~") {
                    mostrarMensaje("alert alert-success", respuestaTxt, "Correcto!");
                    $("#modalTipoAvion").modal("hide");
                    limpiarForm();
                    consultarAviones();
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
//------------------------------------------------------------------------------validacion
function validar() {
    var validacion = true;
    $("#groupItipo").removeClass("has-error");
    if ($("#idTipo").val() === "") {
        $("#groupItipo").addClass("has-error");
        validacion = false;
    }
    return validacion;
}
//------------------------------------------------------------------------------paginacion
function paginacion2() {
    // Grab whatever we need to paginate
    var pageParts = $(".paginate2");
    // How many parts do we have?
    var numPages = pageParts.length;
    // How many parts do we want per page?
    var perPage = 5;
    // When the document loads we're on page 1
    // So to start with... hide everything else
    pageParts.slice(perPage).hide();
    // Apply simplePagination to our placeholder
    $("#paginacion").pagination({
        items: numPages,
        itemsOnPage: perPage,
        cssStyle: "compact-theme",
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
//------------------------------------------------------------------------------filtro aviones
function filtradoAviones() {
    
    var tipFiltro = document.getElementById("avionesSelect");
    var input, filter, table, tr, td, i;
    input = document.getElementById("buscadorAviones");
    filter = input.value.toUpperCase();
    table = document.getElementById("tablaAviones");
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
//*******************************************************************************************************************
//*******************************************************************************************************************
//*******************************************************************************************************************
//******************************           Tipos de avion  **********************************************************
//*******************************************************************************************************************

function consultarTiposAvion() {
    mostrarModal("myModal", "Espere por favor..", "Consultando la información de personas en la base de datos");
    $.ajax({

        url: 'TiposAvionServlet',
        data: {
            accion: "consultarTipos"
        },
        error: function () { //si existe un error en la respuesta del ajax
            alert("Se presento un error a la hora de cargar la información de las personas en la base de datos");
        },
        success: function (data) { //si todo esta correcto en la respuesta del ajax, la respuesta queda en el data
            dibujarTablaTipos(data);
            ocultarModal("myModal");
        },
        type: 'POST',
        dataType: "json"
    });
}
//------------------------------------------------------------------------------dibujar fila tipos
function dibujarTablaTipos(dataJson) {

    $("#tablaTipos").html("");//borra los datos de la tabla solo visiblemente la base sigue igual
    var head = $("<thead />");
    var body = $("<tbody />");
    var row = $("<tr />");
    head.append(row);
    $("#tablaTipos").append(head);
    row.append($("<th><b>modelo</b></th>"));
    row.append($("<th><b>CANT ASIENT</b></th>"));
    row.append($("<th><b>PASAJEROS</b></th>"));
    row.append($("<th ><b>TOMAR</th>"));
    //carga la tabla con el json devuelto
    $("#tablaTipos").append(body);
    for (var i = 0; i < dataJson.length; i++) {
        dibujarFilaTipo(dataJson[i]);
    }
    body.append("<tr><td colspan=4 ><div class=\"derecha1\" id=\"page-nav\"></div></tr></td>");
    $("#tablaTipos").addClass("table-responsive");
    paginacion();
}
//------------------------------------------------------------------------------DIBUJAR LAS FILAS
function dibujarFilaTipo(rowData) {
//Cuando dibuja la tabla en cada boton se le agrega la funcionalidad de cargar o eliminar la informacion
//de una persona
    var row = $("<tr class=\"paginate\"/>");
    $("#tablaTipos").append(row);
    row.append($("<td>" + rowData.modelo + "</td>"));
    row.append($("<td>" + rowData.cantidadAsientos + "</td>"));
    row.append($("<td>" + rowData.cantidadPasajeros + "</td>"));                                           //almacena  idTipo modal tipoavion
    row.append($('<td><center><button type="button" class="btn btn-default btn-xs" aria-label="Left Align" onclick="tomarID(' + rowData.pkId + ');">' +
            '<span class="glyphicon glyphicon-check" aria-hidden="true"></span>'));
}
//------------------------------------------------------------------------------tomar idTipo para merge o agregar
function tomarID(id) {
    $("#idTipo").val(id);
}
//------------------------------------------------------------------------------pagima los resultados obtenidos
function paginacion() {
    // Grab whatever we need to paginate
    var pageParts = $(".paginate");
    // How many parts do we have?
    var numPages = pageParts.length;
    // How many parts do we want per page?
    var perPage = 5;

    // When the document loads we're on page 1
    // So to start with... hide everything else
    pageParts.slice(perPage).hide();
    // Apply simplePagination to our placeholder
    $("#page-nav").pagination({
        items: numPages,
        itemsOnPage: perPage,
        cssStyle: "light-theme",
        prevText: "Anterior",
        nextText: "Siguiente",

        onPageClick: function (pageNum) {
            // Which page parts do we show?
            var start = perPage * (pageNum - 1);
            var end = start + perPage;
            pageParts.hide()
                    .slice(start, end).show();
        }
    });
}
//-----------------------------------------------------------------------------filtrar tipos de avion

//https://www.w3schools.com/w3css/w3data_filters.asp
function filtradoTipos() {
    var tipFiltro = document.getElementById("tiposSelect");
    var input, filter, table, tr, td, i;
    input = document.getElementById("buscadorTpos");
    filter = input.value.toUpperCase();
    table = document.getElementById("tablaTipos");
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
//*******************************************************************************************************************
//*******************************************************************************************************************
//*******************************************************************************************************************
//******************************                           **********************************************************
//*******************************************************************************************************************


//------------------------------------------------------------------------------se devuelve a original
//si hubo cambios los deja de nuevo como cuando inicio la aplicacion 
function limpiarForm() {
    $("#AvionesAction").val("agregarAvion");
    mostrarMensaje("hiddenDiv", "", "");
    $("#modalTipoAvion").trigger("reset");
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