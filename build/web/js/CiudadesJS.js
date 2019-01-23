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



$(document).ready(function () {
    consultarCiudades();
    $('#myModalFormulario').on('shown.bs.modal', function () {resizeMap();});
});


function longitud() {
    if ($("#direccion").val().length > 30) {
        var x = $("#direccion").val();
        $("#direccion").val(x.substring(0, 30));
    }

}

$(function () {

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
function filtroCiudad() {
    var tipFiltro = document.getElementById("ciudadesSelect");
 
    var input, filter, table, tr, td, i;
    input = document.getElementById("buscadorCiudades");
    filter = input.value.toUpperCase();
    table = document.getElementById("tablaCiudades");
    tr = table.getElementsByTagName("tr");
//cilco que esconde las filas que no se ocupan ver
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[parseInt(tipFiltro.options[tipFiltro.selectedIndex].value)];
        if (td) {
            if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

function eliminarPersona(idCiudad) {
    ocultarModal("myModalEliminar");
    // console.log(idPersona);
    mostrarModal("myModal", "Espere por favor..", "Se esta eliminando a la ciudad seleccionada");
    //Se envia la información por ajax
    $.ajax({
        url: 'CiudadesServlet',
        data: {
            accion: "eliminarCiudad",
            id: idCiudad
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
                setTimeout(consultarCiudades, 1000); // hace una pausa y consulta la información de la base de datos
            }
        },
        type: 'POST',
        dataType: "text"
    });
}

function paginacion() {
    // Grab whatever we need to paginate
    var pageParts = $(".paginate3");
    // How many parts do we have?
    var numPages = pageParts.length;
    // How many parts do we want per page?
    var perPage = 6;

    // When the document loads we're on page 1
    // So to start with... hide everything else
    pageParts.slice(perPage).hide();
    // Apply simplePagination to our placeholder
    $("#page-nav2").pagination({
        items: numPages,
        itemsOnPage: perPage,
        cssStyle: "light-theme",
        prevText: "Anterior",
        nextText: "Siguiente",
        // We implement the actual pagination
        //   in this next function. It runs on
        //   the event that a user changes page
        onPageClick: function (pageNum) {
            // Which page parts do we show?
            var start = perPage * (pageNum - 1);
            var end = start + perPage;

            // First hide all page parts
            // Then show those just for our page
            pageParts.hide().slice(start, end).show();
        }
    });
}


function consultarCiudadesByID(idCiudad) {
    mostrarModal("myModal", "Espere por favor..", "Consultando la Ciudad seleccionada");
    $.ajax({
        url: 'CiudadesServlet',
        data: {
            accion: "consultarCiudadByID",
            id: idCiudad
        },
        error: function () { //si existe un error en la respuesta del ajax
            cambiarMensajeModal("myModal", "Resultado acción", "Se presento un error, contactar al administador");
        },
        success: function (data) { //si todo esta correcto en la respuesta del ajax, la respuesta queda en el data
            ocultarModal("myModal");
            limpiarForm();
            $("#myModalFormulario").modal();
            $("#CiudadAction").val("modificarCiudad");
            $("#direccion").val(data.nombre);
            $("#idCiudad").val(data.pkId);
        },
        type: 'POST',
        dataType: "json"
    });
}


//******************************************************************************
//Se ejecuta cuando la página esta completamente cargada
//******************************************************************************



//******************************************************************************
//******************************************************************************
//metodos para consultas el listado de las personas
//******************************************************************************
//******************************************************************************

function consultarCiudades() {
    mostrarModal("myModal", "Espere por favor..", "Consultando la información de personas en la base de datos");
    //Se envia la información por ajax
    $.ajax({
        url: 'CiudadesServlet',
        data: {
            accion: "consultarCiudads"
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
    ocultarModal("myModal");
}

function confirmarEliminacion(idPersona) {
    mostrarModal("myModalEliminar", "", "");
    $("#myModalEliminar").attr("data-id", idPersona);
}

function dibujarTabla(dataJson) {
//limpia la información que tiene la tabla
    $("#tablaCiudades").html("");
    //muestra el enzabezado de la tabla
    var head = $("<thead />");
    var body = $("<tbody />");
    var row = $("<tr />");
    head.append(row);
    $("#tablaCiudades").append(head);
    row.append($("<th><b>IDENTIFICADOR</b></th>"));
    row.append($("<th><b>NOMBRE</b></th>"));
    row.append($("<th><b>Borrar/editar</b></th>"));

    //carga la tabla con el json devuelto
    $("#tablaCiudades").append(body);
    for (var i = 0; i < dataJson.length; i++) {
        dibujarFila(dataJson[i]);
    }
    body.append("<tr><td colspan=3 ><div id=\"page-nav2\"></div></tr></td>");
    $("#tablaCiudades").addClass("table-responsive");
    $("#tablaCiudades").addClass("table-responsive");
    $("#tablaCiudades").addClass("table-bordered");
    paginacion();
}
function dibujarFila(rowData) {

    var row = $("<tr class=\"paginate3\" />");

    $("#tablaCiudades").append(row);
    row.append($("<td>" + rowData.pkId + "</td>"));
    row.append($("<td>" + rowData.nombre + "</td>"));
    row.append($('<td><center><button type="button" class="btn btn-default btn-xs" aria-label="Left Align" onclick="consultarCiudadesByID(' + rowData.pkId + ');">' +
            '<span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>' +
            '</button>' +
            '<button type="button" class="btn btn-default btn-xs" aria-label="Left Align" onclick="confirmarEliminacion(' + rowData.pkId + ');">' + /*eliminarPersona(' + rowData.pkCedula + ')*/
            '<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>' +
            '</button></center></td>'));
}

//******************************************************************************
//******************************************************************************
//El metodo enviar funciona tanto para el insertar como para el modificar
//******************************************************************************
//******************************************************************************

function enviar() {
    if (validar()) {
        longitud();
        //Se envia la información por ajax
        $.ajax({
            url: 'CiudadesServlet',
            data: {
                accion: $("#CiudadAction").val(),
                nombre: $("#direccion").val(),
                idCiudad: $("#idCiudad").val()
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
                    consultarCiudades();
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
    $("#groupNombre").removeClass("has-error");

    if ($("#direccion").val() === "") {
        $("#groupNombre").addClass("has-error");
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
    $('#nombre').focus();
    //se cambia la accion por agregarPersona
    $("#CiudadAction").val("agregarCiudad");

    //esconde el div del mensaje
    mostrarMensaje("hiddenDiv", "", "");

    //Resetear el formulario
    $('#formCiudades').trigger("reset");
}



