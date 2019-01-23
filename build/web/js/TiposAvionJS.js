


$(document).ready(function () {
    consultarTipos();
});

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

//******************************************************************************
//******************************************************************************
//******************************************************************************
//******************************************************************************
function consultarTipos() {
    mostrarModal("myModal", "Espere por favor..", "Consultando la información de personas en la base de datos");
    //Se envia la información por ajax
    $.ajax({
        url: 'TiposAvionServlet',
        data: {
            accion: "consultarTipos"
        },
        error: function () { //si existe un error en la respuesta del ajax
            alert("Se presento un error a la hora de cargar la información");
        },
        success: function (data) { //si todo esta correcto en la respuesta del ajax, la respuesta queda en el data
            dibujarTablaTipos(data);
            ocultarModal("myModal");
        },
        type: 'POST',
        dataType: "json"
    });
}
//------------------------------------------------------------------------------tabla de tipos
function dibujarTablaTipos(dataJson) {
//limpia la información que tiene la tabla
    $("#tablaTipos").html("");
    var head = $("<thead />");
    var body = $("<tbody />");
    var row = $("<tr />");

    head.append(row);
    $("#tablaTipos").append(head);
    row.append($("<th><b>MODELO</b></th>"));
    row.append($("<th><b>MARCA</b></th>"));
    row.append($("<th><b>CANT ASIENT</b></th>"));
    row.append($("<th><b>CANT PAS</b></th>"));
    row.append($("<th><b>ACCIÓN</th>"));

    //carga la tabla con el json devuelto
    $("#tablaTipos").append(body);
    for (var i = 0; i < dataJson.length; i++) {
        dibujarFila(dataJson[i]);
    }
    body.append("<tr><td colspan=5 ><div id=\"pagination\"></div></tr></td>");
    $("#tablaPersonas").addClass("table-responsive table-bordered");
    paginacion();
}
//------------------------------------------------------------------------------dibujar filas
function dibujarFila(rowData) {
    var row = $("<tr class=\"paginateR\" />");
    $("#tablaTipos").append(row);
    row.append($("<td>" + rowData.modelo + "</td>"));
    row.append($("<td>" + rowData.marca + "</td>"));
    row.append($("<td>" + rowData.cantidadAsientos + "</td>"));
    row.append($("<td>" + rowData.cantidadPasajeros + "</td>"));
    row.append($('<td><center><button type="button" class="btn btn-default btn-xs" aria-label="Left Align" onclick="consultarTiposBYid(' + rowData.pkId + ');">' +
            '<span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>' +
            '</button>' +
            '<button type="button" class="btn btn-default btn-xs" aria-label="Left Align" onclick="confirmarEliminacion(' + rowData.pkId + ');">' +
            '<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>' +
            '</button></center></td>'));
}
//------------------------------------------------------------------------------paginacion
function paginacion() {
    // Grab whatever we need to paginate
    var pageParts = $(".paginateR");
    // How many parts do we have?
    var numPages = pageParts.length;
    // How many parts do we want per page?
    var perPage = 5;

    // When the document loads we're on page 1
    // So to start with... hide everything else
    pageParts.slice(perPage).hide();
    // Apply simplePagination to our placeholder
    $("#pagination").pagination({
        items: numPages,
        itemsOnPage: perPage,
        cssStyle: "dark-theme",
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
//------------------------------------------------------------------------------eliminar
function confirmarEliminacion(idPersona) {
    mostrarModal("myModalEliminar", "", "");
    $("#myModalEliminar").attr("data-id", idPersona);
}
//------------------------------------------------------------------------------eliminar
function eliminarTipo(id) {
    ocultarModal("myModalEliminar");
    mostrarModal("myModal", "Espere por favor..", "eliminando........");
    //Se envia la información por ajax
    $.ajax({
        url: 'TiposAvionServlet',
        data: {
            accion: "eliminarTipoAvion",
            id: id
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
                limpiarForm();
                setTimeout(consultarTipos, 2000);
            }
        },
        type: 'POST',
        dataType: "text"
    });
}
///-----------------------------------------------------------------------------consultar por id
function consultarTiposBYid(id) {
    mostrarModal("myModal", "Espere por favor..", "Consultando la persona seleccionada");
    //Se envia la información por ajax
    $.ajax({
        url: 'TiposAvionServlet',
        data: {
            accion: "consultarTiposByID",
            id: id
        },
        error: function () { //si existe un error en la respuesta del ajax
            cambiarMensajeModal("myModal", "Resultado acción", "Se presento un error, contactar al administador");
        },
        success: function (data) { //si todo esta correcto en la respuesta del ajax, la respuesta queda en el data
            ocultarModal("myModal");
            limpiarForm();
            $("#myModalFormulario").modal("show");
            $("#TiposAction").val("modificarTipoAvion");
            $("#identi").val(data.pkId);
            $("#modelo").val(data.modelo);
            $("#marca").val(data.marca);
            $("#ano").val(data.ano);
            $("#asientos").val(data.cantidadFilas);
            $("#filas").val(data.cantidadAsientos);
            $("#pasajeros").val(data.cantidadPasajeros);
        },
        type: 'POST',
        dataType: "json"
    });
}
//------------------------------------------------------------------------------enviar
function enviar() {
    if (validar()) {
        $.ajax({
            url: 'TiposAvionServlet',
            data: {
                accion: $("#TiposAction").val(),
                modelo: $("#modelo").val(),
                marca: $("#marca").val(),
                ano: $("#ano").val(),
                cantidadA: $("#asientos").val(),
                cantidadF: $("#filas").val(),
                cantidadP: $("#pasajeros").val(),
                id: $("#identi").val()
            },
            error: function () { //si existe un error en la respuesta del ajax
                mostrarMensaje("alert alert-danger", "Se genero un error, contacte al administrador (Error del ajax)", "Error!");
            },
            success: function (data) { //si todo esta correcto en la respuesta del ajax, la respuesta queda en el data
                limpiarForm();
                limpiarForm();
                var respuestaTxt = data.substring(2);
                var tipoRespuesta = data.substring(0, 2);
                if (tipoRespuesta === "C~") {
                    mostrarMensaje("alert alert-success", respuestaTxt, "Correcto!");
                    $("#myModalFormulario").modal("hide");
                    consultarTipos();
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
//------------------------------------------------------------------------------validar
function validar() {
    var validacion = true;

    //Elimina estilo de error en los css
    //notese que es sobre el grupo que contienen el input

    $("#groupModelo").removeClass("has-error");
    $("#groupMarca").removeClass("has-error");
    $("#groupFilas").removeClass("has-error");
    $("#groupAsientos").removeClass("has-error");
    $("#groupNpasajeros").removeClass("has-error");
    $("#groupAno").removeClass("has-error");

    if ($("#modelo").val() === "") {
        $("#groupModelo").addClass("has-error");
        validacion = false;
    }
    if ($("#ano").val() === "") {
        $("#groupAno").addClass("has-error");
        validacion = false;
    }
    if ($("#marca").val() === "") {
        $("#groupMarca").addClass("has-error");
        validacion = false;
    }
    if ($("#filas").val() === "") {
        $("#groupFilas").addClass("has-error");
        validacion = false;
    }
    if ($("#asientos").val() === "") {
        $("#groupAsientos").addClass("has-error");
        validacion = false;
    }
    if ($("#pasajeros").val() === "") {
        $("#groupNpasajeros").addClass("has-error");
        validacion = false;
    }


    return validacion;
}
//------------------------------------------------------------------------------filtro
//https://www.w3schools.com/w3css/w3data_filters.asp
function filtrado() {
    var tipFiltro = document.getElementById("tiposSelect");
    var input, filter, table, tr, td, i;
    input = document.getElementById("buscadorTipos");
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



//------------------------------------------------------------------------------utilidades 
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------

function limpiarForm() {
 
    $("#TiposAction").val("agregarTipoAvion");
    mostrarMensaje("hiddenDiv", "", "");
    $('#myModalFormulario').trigger("reset");
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