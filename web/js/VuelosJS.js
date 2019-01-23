


$(document).ready(function () {
    consultarVuelos();
    consultarCiudades();
    consultarAviones();
    iniciarSelectores();
});


//se les da los eventos alos selectores
//@ author manrique GeekMQ
function iniciarSelectores() {
    $('#selectorCiudadOrigen').change(function () {
        var val = $("#selectorCiudadOrigen option:selected").text();
        $("#origen").val(val);

        var temp = $("#selectorCiudadOrigen option:selected").val();
        $("#idOrigen").val(temp);
    });

    $('#selectorCiudadDestino').change(function () {
        var val1 = $("#selectorCiudadDestino option:selected").text();
        $("#destino").val(val1);

        var val2 = $("#selectorCiudadDestino option:selected").val();
        $("#idDestino").val(val2);

    });

    $('#selectorAvion').change(function () {
        var val1 = $("#selectorAvion option:selected").text();
        $("#avion").val(val1);

        var val2 = $("#selectorAvion option:selected").val();
        $("#idAvion").val(val2);

    });
    $("#origen").attr('readonly', 'readonly');
    $("#destino").attr('readonly', 'readonly');
    $("#avion").attr('readonly', 'readonly');
}

$(function () {
    //envia los datos por ajax al servlet
    $("#enviar").click(function () {
        enviar();
    });

    //si cancela se vuelve a modo agregar y quita el modificar
    $("#cancel").click(function () {
        limpiarForm();
    });
});
//------------------------------------------------------------------------------ vuelos
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------consultar vuelos


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
            limpiarForm();
            ocultarModal("myModal");
        },
        type: 'POST',
        dataType: "json"
    });
}
//------------------------------------------------------------------------------dibujar tabla
function dibujarTablaVuelos(dataJson) {
//limpia la información que tiene la tabla
    $("#tablaVuelos").html("");
    //muestra el enzabezado de la tabla
    var head = $("<thead />");
    var body = $("<tbody/>");
    var row = $("<tr />");
    head.append(row);

    $("#tablaVuelos").append(head);
    row.append($("<th><b>AVION</b></th>"));
    row.append($("<th><b>ORIGEN</b></th>"));
    row.append($("<th><b>DESTINO</b></th>"));
    row.append($("<th ><b>ACCION</th>"));
    //carga la tabla con el json devuelto


    $("#tablaVuelos").append(body);
    for (var i = 0; i < dataJson.length; i++) {
        dibujarFilaVuelo(dataJson[i]);
    }
    body.append("<tr><td colspan=4 ><div  id=\"page-navigator\"></div></tr></td>");
    $("#tablaVuelos").addClass("table-responsive");
    paginacion2();
}
//------------------------------------------------------------------------------dibujar Fila
function dibujarFilaVuelo(rowData) {
//Cuando dibuja la tabla en cada boton se le agrega la funcionalidad de cargar o eliminar la informacion
//de una persona
    var row = $("<tr class=\"paginate5\" />");
    $("#tablaVuelos").append(row);
    row.append($("<td>" + rowData.avion.tipoAvion.modelo + "</td>"));
    row.append($("<td>" + rowData.ciudadByFkOrigen.nombre + "</td>"));
    row.append($("<td>" + rowData.ciudadByFkDestino.nombre + "</td>"));
    row.append($('<td>' +
            '<button type="button" class="btn btn-default btn-xs  aria-label="left Align" onclick="consultarVueloByID(' + rowData.pkId + ')">' +
            '<span class="glyphicon glyphicon-check" aria-hidden="true"></span>' +
            '</button>' +
            '<button type="button" class="btn btn-default btn-xs" aria-label="Left Align" onclick="confirmarEliminacion(' + rowData.pkId + ');">' +
            '<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>' +
            '</button></td>'));
}
//------------------------------------------------------------------------------consultar id
function consultarVueloByID(idVuelo) {
    $.ajax({
        url: 'VueloServlet',
        data: {
            accion: "consultarVueloByID",
            id: idVuelo
        },
        error: function () { //si existe un error en la respuesta del ajax
            cambiarMensajeModal("myModal", "Resultado acción", "Se presento un error, contactar al administador");
        },
        success: function (data) { //si todo esta correcto en la respuesta del ajax, la respuesta queda en el data
            limpiarForm();
            $('#selectorAvion').attr('disabled', 'disabled');
            $("#vuelosAction").val("modificarVuelo");
            $("#destino").val(data.ciudadByFkDestino.nombre);
            $("#origen").val(data.ciudadByFkOrigen.nombre);
            $("#avion").val(data.avion.tipoAvion.modelo);

            $("#id-merge").val(data.pkId);
            $("#idAvion").val(data.avion.pkId);
            $("#idOrigen").val(data.ciudadByFkOrigen.pkId);
            $("#idDestino").val(data.ciudadByFkDestino.pkId);

        },
        type: 'POST',
        dataType: "json"
    });
}
//------------------------------------------------------------------------------filtrar
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
//------------------------------------------------------------------------------ eliminar vuelo
function confirmarEliminacion(idVuelo) {
    mostrarModal("myModalEliminar", "", "");
    $("#myModalEliminar").attr("data-id", idVuelo);
}
//------------------------------------------------------------------------------
function eliminarVuelo(id) {
    ocultarModal("myModalEliminar");
    mostrarModal("myModal", "Espere por favor..", "eliminando........");
    //Se envia la información por ajax
    $.ajax({
        url: 'VueloServlet',
        data: {
            accion: "eliminarVuelo",
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
                setTimeout(consultarVuelos, 2000);
            }
        },
        type: 'POST',
        dataType: "text"
    });
}
//------------------------------------------------------------------------------envio de datos
function enviar() {
    if (validar()) {
        $.ajax({
            url: 'VueloServlet',
            data: {
                accion: $("#vuelosAction").val(),
                origen: $("#idOrigen").val(),
                destino: $("#idDestino").val(),
                avion: $("#idAvion").val(),
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
                    consultarVuelos();
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
    $("#groupIdAvion").removeClass("has-error");
    $("#groupIdLLegada").removeClass("has-error");
    $("#groupidSalida").removeClass("has-error");

    //valida cada uno de los campos del formulario
    //Nota: Solo si fueron digitados
    if ($("#avion").val() === "") {
        $("#groupAvion").addClass("has-error");
        validacion = false;
    }
    if ($("#origen").val() === "") {
        $("#groupOrigen").addClass("has-error");
        validacion = false;
    }
    if ($("#destino").val() === "") {
        $("#groupDestino").addClass("has-error");
        validacion = false;
    }

    return validacion;
}

//------------------------------------------------------------------------------Consulta ciudades
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------

function consultarCiudades() {

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
            llenarSelectorCiudades(data);

        },
        type: 'POST',
        dataType: "json"
    });
    ocultarModal("myModal");
}
//@ author manrique GeekMQ
function llenarSelectorCiudades(dataJson) {
    $("#selectorCiudadDestino").html("");//vaciamos el selector
    $("#selectorCiudadOrigen").html("");//vaciamos el selector
    
    $('#selectorCiudadDestino').append('<option  value=' + 0+ '>' + "seleccion" + '</option>');
    $('#selectorCiudadOrigen').append('<option  value=' + 0+ '>' + "seleccion" + '</option>');
    for (var i = 0; i < dataJson.length; i++) {
        opcionSelectorCiudad(dataJson[i]);
    }
}

//@ author manrique GeekMQ
function opcionSelectorCiudad(rowData) {// el evento esta en document ready
    var $select = $('#selectorCiudadOrigen');//el value es necesario para almacenarlo en un hidden
    $select.append('<option value=' + rowData.pkId + '>' + rowData.nombre + '</option>');

    $('#selectorCiudadDestino').append('<option value=' + rowData.pkId + '>' + rowData.nombre + '</option>');
}
//------------------------------------------------------------------------------consultar Aviones
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------

function consultarAviones() {

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
            llenarSelectorAviones(data);

        },
        type: 'POST',
        dataType: "json"
    }); 
}
//------------------------------------------------------------------------------selector de ciudades
function llenarSelectorAviones(dataJson) {
    $("#selectorAvion").html("");//vaciamos el selector
    $('#selectorAvion').append('<option  value=' + 0+ '>' + "seleccion" + '</option>');
    for (var i = 0; i < dataJson.length; i++) {
        opcionSelectorAvion(dataJson[i]);
    }
}
//------------------------------------------------------------------------------opcion de l selector de avion

function opcionSelectorAvion(rowData) {// el evento esta en document ready

    $('#selectorAvion').append('<option value=' + rowData.pkId + '>' + rowData.tipoAvion.modelo + "---CAPACIDAD---" + rowData.tipoAvion.cantidadPasajeros + '</option>');
}

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------


function filtradoVuelos() {

    var tipFiltro = document.getElementById("vuelosSelector");
    var input, filter, table, tr, td, i;
    input = document.getElementById("buscadorVuelos");
    filter = input.value.toUpperCase();
    table = document.getElementById("tablaVuelos");
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
//------------------------------------------------------------------------------

function limpiarForm() {
    $("#vuelosAction").val("agregarVuelo");
    $('#selectorAvion').removeAttr('disabled');
    mostrarMensaje("hiddenDiv", "", "");
    $("#vuelosFomr").trigger("reset");
}
//------------------------------------------------------------------------------
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


