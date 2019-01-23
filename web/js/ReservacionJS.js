/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 * falta hacer validar y enviar + el servlet de reservaciones
 *todo el modulo de tiquetes 
 * 
 * 
 */

$(document).ready(function () {
    consultarReservas();
    consultarViajes();
    consultarUsuarios();
    iniciarSelectores();
});

$(function () {
    
    $("#enviar").click(function () {
        enviar();
    });

    $("#cancel").click(function () {
        limpiarForm();
    });
});

function iniciarSelectores() {
    $('#selectorViaje').change(function () {
        var val = $("#selectorViaje option:selected").text();
        $("#viaje").val(val);

        var temp = $("#selectorViaje option:selected").val();
        $("#idViaje").val(temp);
    });

    $('#selectorUsuario').change(function () {
        var val1 = $("#selectorUsuario option:selected").text();
        $("#usuario").val(val1);

        var val2 = $("#selectorUsuario option:selected").val();
        $("#idUsuario").val(val2);

    });

    $("#viaje").attr('readonly', 'readonly');
    $("#usuario").attr('readonly', 'readonly');
    
}

function consultarReservas() {
    mostrarModal("myModal", "Espere por favor..", "Consultando la informacion");
    //Se envia la información por ajax
    $.ajax({
        url: 'ReservacionServlet',
        data: {
            accion: "consultarReservas"
        },
        error: function () { //si existe un error en la respuesta del ajax
            alert("Se presento un error a la hora de cargar la información");
        },
        success: function (data) { //si todo esta correcto en la respuesta del ajax, la respuesta queda en el data
            dibujarTablaR(data);
            limpiarForm();
            ocultarModal("myModal");
        },
        type: 'POST',
        dataType: "json"
    });
}

function dibujarTablaR(dataJson) {
//limpia la información que tiene la tabla
    $("#tablaReservas").html("");
    //muestra el enzabezado de la tabla
    var head = $("<thead />");
    var body = $("<tbody/>");
    var row = $("<tr />");
    head.append(row);

    $("#tablaReservas").append(head);
    row.append($("<th><b>USUARIO</b></th>"));
    row.append($("<th><b>VIAJE</b></th>"));
    row.append($("<th><b>ASIENTOS</b></th>"));
    row.append($("<th ><b>ACCION</th>"));
    //carga la tabla con el json devuelto


    $("#tablaReservas").append(body);
    for (var i = 0; i < dataJson.length; i++) {
        dibujarFilaR(dataJson[i]);
    }
    body.append("<tr><td colspan=4 ><div  id=\"page-navigator\"></div></tr></td>");
    $("#tablaReservas").addClass("table-responsive");
    paginacion2();
}

function dibujarFilaR(rowData) {
//Cuando dibuja la tabla en cada boton se le agrega la funcionalidad de cargar o eliminar la informacion
//de una persona
    var row = $("<tr class=\"paginate5\" />");
    $("#tablaReservas").append(row);
    row.append($("<td>" + rowData.usuario.nombreUsuario + "</td>"));
    row.append($("<td>" + rowData.viaje.fechaSalida+ " "+ rowData.viaje.vuelo.avion.tipoAvion.modelo + "</td>"));
    row.append($("<td>" + rowData.cantidadAsientos + "</td>"));
    row.append($('<td>' +
            '<button type="button" class="btn btn-default btn-xs  aria-label="left Align" onclick="consultarReservaByID(' + rowData.pkId + ')">' +
            '<span class="glyphicon glyphicon-check" aria-hidden="true"></span>' +
            '</button>' +
            '<button type="button" class="btn btn-default btn-xs" aria-label="Left Align" onclick="confirmarEliminacion(' + rowData.pkId + ');">' +
            '<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>' +
            '</button></td>'));
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

function consultarReservaByID(idR) {
    //solo puede editar la cantidad de asientos
    $.ajax({
        url: 'ReservacionServlet',
        data: {
            accion: "consultarReservaByID",
            id: idR
        },
        error: function () { //si existe un error en la respuesta del ajax
            cambiarMensajeModal("myModal", "Resultado acción", "Se presento un error, contactar al administador");
        },
        success: function (data) { //si todo esta correcto en la respuesta del ajax, la respuesta queda en el data
            limpiarForm();
            $('#selectorUsuario').attr('disabled', 'disabled');
            $('#selectorViaje').attr('disabled', 'disabled');
            
            $("#reservacionAction").val("modificarReserva");
            
            $("#id-merge").val(data.pkId);
            $("#idViaje").val(data.viaje.pkId);
            $("#idUsuario").val(data.usuario.pkId);
            $("#cant").val(data.cantidadAsientos);
            
            $("#viaje").val(data.viaje.vuelo.avion.tipoAvion.modelo);
            $("#usuario").val(data.usuario.nombreUsuario);

        },
        type: 'POST',
        dataType: "json"
    });
}

function validar() {
    var validacion = true;
    $("#groupViaje").removeClass("has-error");
    $("#groupUsuario").removeClass("has-error");
    $("#groupCantidad").removeClass("has-error");

    
    if ($("#viaje").val() === "") {
        $("#groupViaje").addClass("has-error");
        validacion = false;
    }
    if ($("#usuario").val() === "") {
        $("#groupUsuario").addClass("has-error");
        validacion = false;
    }
    
    if ($("#cant").val() === "" || $("#cant").val().length > 4) {
        $("#groupCantidad").addClass("has-error");
        validacion = false;
    }

    return validacion;
}

function enviar() {
    if (validar()) {
        $.ajax({
            url: 'ReservacionServlet',
            data: {
                accion: $("#reservacionAction").val(),
                usuario: $("#idUsuario").val(),
                viaje: $("#idViaje").val(),
                cantidad: $("#cant").val(),
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
                    limpiarForm();
                    consultarReservas();
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

function confirmarEliminacion(idR) {
    mostrarModal("myModalEliminar", "", "");
    $("#myModalEliminar").attr("data-id", idR);
}

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
            llenarSelectorViajes(data);
           // ocultarModal("myModal");
        },
        type: 'POST',
        dataType: "json"
    });
}

function llenarSelectorViajes(dataJson) {
    $("#selectorViaje").html("");//vaciamos el selector
    for (var i = 0; i < dataJson.length; i++) {
        opcionSelectorViaje(dataJson[i]);
    }
}

function opcionSelectorViaje(rowData) {
    $('#selectorViaje').append('<option value=' + rowData.pkId + '>' + rowData.vuelo.avion.tipoAvion.modelo + '</option>');
    }

function consultarUsuarios() {
    mostrarModal("myModal", "Espere por favor..", "Consultando la información de usuarios en la base de datos");
    //Se envia la información por ajax
    $.ajax({
        url: 'UsuariosServlet',
        data: {
            accion: "consultarUsuarios"
        },
        error: function () { //si existe un error en la respuesta del ajax
            alert("Se presento un error a la hora de cargar la información de las personas en la base de datos");
        },
        success: function (data) { //si todo esta correcto en la respuesta del ajax, la respuesta queda en el data
            llenarSelectorUsuarios(data);
           // ocultarModal("myModal");
        },
        type: 'POST',
        dataType: "json"
    });
}

function llenarSelectorUsuarios(dataJson) {
    $("#selectorUsuario").html("");//vaciamos el selector
    for (var i = 0; i < dataJson.length; i++) {
        opcionSelectorUsuario(dataJson[i]);
    }
}

function opcionSelectorUsuario(rowData) {
    $('#selectorUsuario').append('<option value=' + rowData.pkId + '>' + rowData.nombreUsuario+ '</option>');
    }

function filtradoReservas(){
   var tipFiltro = document.getElementById("reservasSelector");
    var input, filter, table, tr, td, i;
    input = document.getElementById("buscadorReservas");
    filter = input.value.toUpperCase();
    table = document.getElementById("tablaReservas");
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

function limpiarForm() {
    $("#reservacionAction").val("agregarReservacion");
    $('#selectorUsuario').removeAttr('disabled');
    $('#selectorViaje').removeAttr('disabled');
    mostrarMensaje("hiddenDiv", "", "");
    $("#reservasForm").trigger("reset");
}

function eliminarReservacion(id) {
    ocultarModal("myModalEliminar");
    mostrarModal("myModal", "Espere por favor..", "eliminando........");
    //Se envia la información por ajax
    $.ajax({
        url: 'ReservacionServlet',
        data: {
            accion: "eliminarReserva",
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
                setTimeout(consultarReservas, 2000);
            }
        },
        type: 'POST',
        dataType: "text"
    });
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