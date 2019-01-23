var idSeleccionada = false;


$(function () {
    $('#dpSalida').datetimepicker({
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
        $("#modalViaje").modal("hide");
    });
});

$(document).ready(function () {
    consultarViajes();
    consultarVuelos();
});

function consultarViajes() {
    mostrarModal("myModal", "Espere por favor..", "Consultando la información de usuarios en la base de datos");
    //Se envia la información por ajax
    $.ajax({
        url: 'ViajesServlet',
        data: {
            accion: "consultarViajes"
        },
        error: function () { //si existe un error en la respuesta del ajax
            alert("Se presento un error a la hora de cargar la información de las personas en la base de datos");
        },
        success: function (data) { //si todo esta correcto en la respuesta del ajax, la respuesta queda en el data
            dibujarTablaV(data);
            ocultarModal("myModal");
        },
        type: 'POST',
        dataType: "json"
    });
}

function dibujarTablaV(dataJson) {
//limpia la información que tiene la tabla
    $("#tablaViajes").html("");
    //muestra el enzabezado de la tabla
    var head = $("<thead />");
    var body = $("<tbody />");
    var row = $("<tr/>");
    head.append(row);

    $("#tablaViajes").append(head);
    row.append($("<th><b>ORG</b></th>"));
    row.append($("<th><b>DEST</b></th>"));
    row.append($("<th><b>SALIDA</b></th>"));
    row.append($("<th><b>PRECIO</b></th>"));
    row.append($("<th><b>DESCUENTO</b></th>"));
    row.append($("<th><b>ACCION</b></th>"));
    //carga la tabla con el json devuelto
    $("#tablaViajes").append(body);
    for (var i = 0; i < dataJson.length; i++) {
        dibuFjarFilaV(dataJson[i]);
    }
    body.append("<tr><td colspan=9 ><div class=\"derecha\" id=\"page-nav\"></div></tr></td>");

    $("#tablaViajes").addClass("table-responsive");
    $("#tablaViajes").addClass("table-responsive");
    mypaginacion();
}

function dibuFjarFilaV(rowData) {
//Cuando dibuja la tabla en cada boton se le agrega la funcionalidad de cargar o eliminar la informacion
//de una persona
    var row = $("<tr class=\"paginas\" />");
    $("#tablaViajes").append(row);
    row.append($("<td>" + rowData.vuelo.ciudadByFkOrigen.nombre+ "</td>"));
    row.append($("<td>" + rowData.vuelo.ciudadByFkDestino.nombre+ "</td>"));
    row.append($("<td>" + rowData.fechaSalida + "</td>"));
    row.append($("<td>" + rowData.precio + "</td>"));
    row.append($("<td>" + rowData.descuento + "</td>"));
    row.append($('<td><center><button type="button" class="btn btn-default btn-xs" aria-label="Left Align" onclick="consultarViajesById(' + rowData.pkId + ');">' +
            '<span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>' +
            '</button>' +
            '<button type="button" class="btn btn-default btn-xs" aria-label="Left Align" onclick="confirmarEliminacion(' + rowData.pkId + ');">' +
            '<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>' +
            '</button></center></td>'));
}

function mypaginacion() {
    // Grab whatever we need to paginate
    var pagesParts = $(".paginas");
    // How many parts do we have?
    var numeroPages = pagesParts.length;
    // How many parts do we want per page?
    var perPage = 6;

    // When the document loads we're on page 1
    // So to start with... hide everything else
    pagesParts.slice(perPage).hide();
    // Apply simplePagination to our placeholder
    $("#page-nav").pagination({
        items: numeroPages,
        itemsOnPage: perPage,
        cssStyle: "light-theme",
        prevText: "Anterior",
        nextText: "Siguiente",

        onPageClick: function (pageNum) {
            // Which page parts do we show?
            var start = perPage * (pageNum - 1);
            var end = start + perPage;
            pagesParts.hide()
                    .slice(start, end).show();
        }
    });
}

function consultarViajesById(idViaje) {
    mostrarModal("myModal", "Espere por favor..", "Consultando la persona seleccionada");
    //Se envia la información por ajax
    $.ajax({
        url: 'ViajesServlet',
        data: {
            accion: "consultarViajesById",
            idViaje: idViaje
        },
        error: function () { //si existe un error en la respuesta del ajax
            cambiarMensajeModal("myModal", "Resultado acción", "Se presento un error, contactar al administador");
        },
        success: function (data) { //si todo esta correcto en la respuesta del ajax, la respuesta queda en el data
            // se oculta el mensaje de espera
            ocultarModal("myModal");
            limpiarForm();
            //se muestra el formulario
            $("#modalViaje").modal();
            $("#viajesAction").val("modificarViaje");
            $("#idviaje").attr('readonly', 'readonly');
            $("#vuelo").attr('readonly', 'readonly');

            //se modificar el hidden que indicar el tipo de accion que se esta realizando

            $("#idviaje").val(data.pkId);
            $("#vuelo").val(data.vuelo.pkId);
            var temp = data.fechaSalida;
            $("#dpSalida").val(temp);
            $("#asientos").val(data.cantidadAsientosDisponibles);
            $("#precio").val(data.precio);
            $("#rebaja").val(data.rebaja);
        },
        type: 'POST',
        dataType: "json"
    });
}

function enviar() {
    if (validar()) {
        //Se envia la información por ajax   //passwordconf,password,nomuser,direccion,email,dpFechaNacimiento,celular,apellidos,nombre,cedula
        $.ajax({
            url: 'ViajesServlet',
            data: {
                accion: $("#viajesAction").val(),
                vuelo: $("#vuelo").val(),
                salida: $("#dpSalida").data('date'),
                asientos: $("#asientos").val(),
                precio: $("#precio").val(),
                rebaja: $("#rebaja").val(),
                idViaje: $("#idviaje").val()
            },
            error: function () { //si existe un error en la respuesta del ajax
                mostrarMensaje("alert alert-danger", "Se genero un error, contacte al administrador (Error del ajax)", "Error!");
            },
            success: function (data) { //si todo esta correcto en la respuesta del ajax, la respuesta queda en el data
                var respuestaTxt = data.substring(2);
                var tipoRespuesta = data.substring(0, 2);
                if (tipoRespuesta === "C~") {
                    mostrarMensaje("alert alert-success", respuestaTxt, "Correcto!");
                    $("#modalViaje").modal("hide");
                    limpiarForm();
                    consultarViajes();
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
    //$("#groupusuario").removeClass("has-error");
    $("#groupVuelo").removeClass("has-error");
    $("#groupSalida").removeClass("has-error");
    $("#groupDisponibles").removeClass("has-error");
    $("#groupPrecio").removeClass("has-error");
    $("#groupDescuento").removeClass("has-error");

    if ($("#vuelo").val() === "") {
        $("#groupVuelo").addClass("has-error");
        validacion = false;
    }

    if ($("#dpSalida").data('date') === "") {
        $("#groupSalida").addClass("has-error");
        validacion = false;
    }
    if ($("#asientos").val() === "" || $("#asientos").val().length > 11) {
        $("#groupDisponibles").addClass("has-error");
        validacion = false;
    }

    if ($("#precio").val() === "" || $("#precio").val().length > 9) {
        $("#groupPrecio").addClass("has-error");
        validacion = false;
    }

    if ($("#rebaja").val() === "" || $("#rebaja").val().length > 9) {
        $("#groupDescuento").addClass("has-error");
        validacion = false;
    }


    return validacion;
}

function consultarVuelos() {
    mostrarModal("myModal", "Espere por favor..", "Consultando la informacion");
    //Se envia la información por ajax
    $.ajax({
        url: 'VueloServlet',
        data: {
            accion: "consultarVuelos"
        },
        error: function () { //si existe un error en la respuesta del ajax
            alert("Se presento un error a la hora de cargar la información");
        },
        success: function (data) { //si todo esta correcto en la respuesta del ajax, la respuesta queda en el data
            dibujarTablaVuelos(data);
            // limpiarForm();
            ocultarModal("myModal");
        },
        type: 'POST',
        dataType: "json"
    });
}

function dibujarTablaVuelos(dataJson) {
//limpia la información que tiene la tabla
    $("#tablaVuelos").html("");
    //muestra el enzabezado de la tabla
    var head = $("<thead />");
    var body = $("<tbody/>");
    var row = $("<tr />");
    head.append(row);

    $("#tablaVuelos").append(head);
    row.append($("<th></b>CODIGO</b></th>"));
    row.append($("<th><b>AVION</b></th>"));
    row.append($("<th><b>ORIGEN</b></th>"));
    row.append($("<th><b>DESTINO</b></th>"));
    row.append($("<th ><b>TOMAR</th>"));
    //carga la tabla con el json devuelto

    $("#tablaVuelos").append(body);
    for (var i = 0; i < dataJson.length; i++) {
        dibujarFilaVuelo(dataJson[i]);
    }
    body.append("<tr><td colspan=4 ><div  id=\"page-navigator\"></div></tr></td>");
    $("#tablaVuelos").addClass("table-responsive");
    paginacion2();
}

function dibujarFilaVuelo(rowData) {
//Cuando dibuja la tabla en cada boton se le agrega la funcionalidad de cargar o eliminar la informacion
//de una persona
    var row = $("<tr class=\"paginate5\" />");
    $("#tablaVuelos").append(row);
    row.append($("<td>" + rowData.pkId + "</td>"));
    row.append($("<td>" + rowData.avion.tipoAvion.modelo + "</td>"));
    row.append($("<td>" + rowData.ciudadByFkOrigen.nombre + "</td>"));
    row.append($("<td>" + rowData.ciudadByFkDestino.nombre + "</td>"));
    row.append($('<td>' +
            '<button type="button" class="btn btn-default btn-xs  aria-label="left Align" onclick="tomaID(' + rowData.pkId + ')">' +
            '<span class="glyphicon glyphicon-check" aria-hidden="true"></span>' +
            '</button>'));
}

function tomaID(id) {
    limpiarForm();
    $("#vuelo").val(id);
    $("#modalViaje").modal("show");
}

function paginacion2() {
// Grab whatever we need to paginate
    var pageParts = $(".paginate5");
// How many parts do we have?
    var numPages = pageParts.length;
// How many parts do we want per page?
    var perPage = 5;
// When the document loads we're on page 1
// So to start with... hide everything else
    pageParts.slice(perPage).hide();
// Apply simplePagination to our placeholder
    $("#page-navigator").pagination({
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

function myfiltro() {
// Declare variables 
    var ufiltro = document.getElementById("viajesSelect");
    var inputs, filters, tables, trs, tds, i;
    inputs = document.getElementById("buscador");
    filters = inputs.value.toUpperCase();
    tables = document.getElementById("tablaViajes");
    trs = tables.getElementsByTagName("tr");
    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < trs.length; i++) {
        tds = trs[i].getElementsByTagName("td")[parseInt(ufiltro.selectedIndex)];
        if (tds) {
            if (tds.innerHTML.toUpperCase().indexOf(filters) > -1) {
                trs[i].style.display = "";
            } else {
                trs[i].style.display = "none";
            }
        }
    }
}

function filtrado() {
// Declare variables 
    var tipFiltro = document.getElementById("vuelosSelect");
    var input, filter, table, tr, td, i;
    input = document.getElementById("buscador2");
    filter = input.value.toUpperCase();
    table = document.getElementById("tablaVuelos");
    tr = table.getElementsByTagName("tr");
    // Loop through all table rows, and hide those who don't match the search query
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
    $('#vuelo').focus();
    $("#vuelo").removeAttr("readonly"); //elimina el atributo de solo lectura

    //se cambia la accion por agregarPersona
    $("#viajesAction").val("agregarViaje");
    //esconde el div del mensaje
    mostrarMensaje("hiddenDiv", "", "");

    //Resetear el formulario
    $('#formViajes').trigger("reset");
}

function confirmarEliminacion(idViaje) {
    mostrarModal("myModalEliminar", "", "");
    $("#myModalEliminar").attr("data-id", idViaje);
}

function eliminarViaje(idViaje) {
    ocultarModal("myModalEliminar");
    mostrarModal("myModal", "Espere por favor..", "Se esta eliminando a la persona seleccionada");
    //Se envia la información por ajax
    $.ajax({
        url: 'ViajesServlet',
        data: {
            accion: "eliminarViaje",
            id: idViaje
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
                consultarViajes();
                consultarVuelos();// hace una pausa y consulta la información de la base de datos
            }
        },
        type: 'POST',
        dataType: "text"
    });
}


