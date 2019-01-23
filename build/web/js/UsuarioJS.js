
var idSeleccionada = false;
$(function () {
    //agrega los eventos las capas necesarias
    $("#enviar").click(function () {
        enviar();
    });

    //agrega los eventos las capas necesarias
    $("#cancel").click(function () {
        limpiarForm();
        $("#usuarioModal").modal("hide");
        idSeleccionada = false;
    });
});

$(document).ready(function () {
    consultarPersonas();
    consultarUsuario();
});

//------------------------------------------------------------------------------Tabla Personas
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------

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
            dibujarTablaPersonas(data);
            // se oculta el modal esta funcion se encuentra en el utils.js
            ocultarModal("myModal");
        },
        type: 'POST',
        dataType: "json"
    });
}
//------------------------------------------------------------------------------tabla de personas
function dibujarTablaPersonas(dataJson) {
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
    row.append($("<th><b>TOMAR</th>"));
    //carga la tabla con el json devuelto
    $("#tablaPersonas").append(body);
    for (var i = 0; i < dataJson.length; i++) {
        dibujarFilaPersonas(dataJson[i]);
    }
    body.append("<tr><td colspan=3 ><div id=\"page-nav\"></div></tr></td>");

    $("#tablaPersonas").addClass("table-responsive");
    $("#tablaPersonas").addClass("table-responsive");

    paginacion();
}
//------------------------------------------------------------------------------dibujar fila
function dibujarFilaPersonas(rowData) {
//Cuando dibuja la tabla en cada boton se le agrega la funcionalidad de cargar o eliminar la informacion
//de una persona
    var row = $("<tr class=\"paginas\" />");
    $("#tablaPersonas").append(row);
    row.append($("<td>" + rowData.pkId + "</td>"));
    row.append($("<td>" + rowData.nombre + "</td>"));
    row.append($('<button type="button" class="btn btn-default btn-xs  aria-label="left Align" onclick="tomacedula(' + rowData.pkId + ');">' +
            '<span class="glyphicon glyphicon-user" aria-hidden="true"></span>' +
            '</button></center></td>'));
}

//------------------------------------------------------------------------------usuarios
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------



function consultarUsuario() {
    mostrarModal("myModal", "Espere por favor..", "Consultando la información de funcionarios en la base de datos");
    //Se envia la información por ajax
    $.ajax({
        url: 'UsuariosServlet',
        data: {
            accion: "consultarUsuarios"
        },
        error: function () { //si existe un error en la respuesta del ajax
            alert("Se presento un error a la hora de cargar la información ");
        },
        success: function (data) { //si todo esta correcto en la respuesta del ajax, la respuesta queda en el data
            dibujarTablaUsuario(data);
            ocultarModal("myModal");
        },
        type: 'POST',
        dataType: "json"
    });
}
//------------------------------------------------------------------------------dibujar tabla
function dibujarTablaUsuario(dataJson) {
//limpia la información que tiene la tabla
    $("#tablaFuncionarios").html("");
    //muestra el enzabezado de la tabla
    var head = $("<thead />");
    var body = $("<tbody />");
    var row = $("<tr/>");
    head.append(row);
    $("#tablaFuncionarios").append(head);
    row.append($("<th><b>ID</b></th>"));
    row.append($("<th><b>Cedula</b></th>"));
    row.append($("<th><b>Nombre de funcionario</th>"));
    row.append($("<th><b>ACCIÓN</th>"));
    //carga la tabla con el json devuelto
    $("#tablaFuncionarios").append(body);
    for (var i = 0; i < dataJson.length; i++) {
        dibuFjarFilaUsuario(dataJson[i]);
    }
    body.append("<tr><td colspan=9 ><div class=\"derecha\" id=\"page-nav\"></div></tr></td>");

    $("#tablaFuncionarios").addClass("table-responsive");
    $("#tablaFuncionarios").addClass("table-responsive");
    mypaginacion();
}
//------------------------------------------------------------------------------dibujar fila
function dibuFjarFilaUsuario(rowData) {
//Cuando dibuja la tabla en cada boton se le agrega la funcionalidad de cargar o eliminar la informacion
//de una persona
    var row = $("<tr class=\"paginate\" />");
    $("#tablaFuncionarios").append(row);
    row.append($("<td>" + rowData.pkId + "</td>"));
    row.append($("<td>" + rowData.persona.pkId + "</td>"));
    row.append($("<td>" + rowData.nombreUsuario + "</td>"));
    row.append($('<td><center><button type="button" class="btn btn-default btn-xs" aria-label="Left Align" onclick="consultarUsuarioByID(' + rowData.pkId + ');">' +
            '<span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>' +
            '</button>' +
            '<button type="button" class="btn btn-default btn-xs" aria-label="Left Align" onclick="confirmarEliminacion(' + rowData.pkId + ');">' +
            '<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>' +
            '</button></center></td>'));
}

//------------------------------------------------------------------------------eliminar usuairo
function eliminarUsuario(idf) {
    ocultarModal("myModalEliminar");
    mostrarModal("myModal", "Espere por favor..", "Se esta eliminando a la persona seleccionada");
    //Se envia la información por ajax
    $.ajax({
        url: 'UsuariosServlet',
        data: {
            accion: "eliminarUsuarios",
            id: idf
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
                consultarUsuario();
                consultarPersonas();// hace una pausa y consulta la información de la base de datos
            }
        },
        type: 'POST',
        dataType: "text"
    });
}
//------------------------------------------------------------------------------validacion
function validar() {
    var validacion = true;
    $("#groupNombreF").removeClass("has-error");
    $("#groupcontrasena").removeClass("has-error");

    if ($("#nomfuncionario").val() === "" || $("#nomfuncionario").val().length > 30) {
        $("#groupNombreF").addClass("has-error");
        validacion = false;
    }
    if ($("#password").val() === "" || $("#password").val().length > 15) {
        $("#groupcontrasena").addClass("has-error");
        validacion = false;
    }
    return validacion;
}
//------------------------------------------------------------------------------envio de datos
function enviar() {
    if (validar()) {
        //Se envia la información por ajax   //passwordconf,password,nomuser,direccion,email,dpFechaNacimiento,celular,apellidos,nombre,cedula
        $.ajax({
            url: 'UsuariosServlet',
            data: {
                accion: $("#usuariosAction").val(),
                cedula: $("#ced").val(),
                nombreuser: $("#nomfuncionario").val(),
                password: $("#password").val(),
                idFuncionario: $("#idfun").val()
            },
            error: function () { //si existe un error en la respuesta del ajax
                mostrarMensaje("alert alert-danger", "Se genero un error, contacte al administrador (Error del ajax)", "Error!");
            },
            success: function (data) { //si todo esta correcto en la respuesta del ajax, la respuesta queda en el data
                var respuestaTxt = data.substring(2);
                var tipoRespuesta = data.substring(0, 2);
                if (tipoRespuesta === "C~") {
                    mostrarMensaje("alert alert-success", respuestaTxt, "Correcto!");
                    $("#usuarioModal").modal("hide");
                    limpiarForm();
                    consultarUsuario();
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
//------------------------------------------------------------------------------consulta
function consultarUsuarioByID(id) {
    mostrarModal("myModal", "Espere por favor..", "Consultando la persona seleccionada");
    //Se envia la información por ajax
    $.ajax({
        url: 'UsuariosServlet',
        data: {
            accion: "consultarUsuariosByID",
            idUsuario: id
        },
        error: function () { //si existe un error en la respuesta del ajax
            cambiarMensajeModal("myModal", "Resultado acción", "Se presento un error, contactar al administador");
        },
        success: function (data) { //si todo esta correcto en la respuesta del ajax, la respuesta queda en el data
            // se oculta el mensaje de espera
            ocultarModal("myModal");
            limpiarForm();
            //se muestra el formulario
            $("#usuarioModal").modal();
            $("#usuariosAction").val("modificarUsuario");
            $("#idfun").attr('readonly', 'readonly');
            $("#ced").attr('readonly', 'readonly');

            //se modificar el hidden que indicar el tipo de accion que se esta realizando

            $("#idfun").val(data.pkId);
            $("#ced").val(data.persona.pkId);
            $("#nomfuncionario").val(data.nombreUsuario);
            $("#password").val(data.contrasena);
        },
        type: 'POST',
        dataType: "json"
    });
}



//------------------------------------------------------------------------------utilidades, paginacion
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------


function tomacedula(id) {
    $("#ced").val(id);
    $("#usuarioModal").modal("show");
}

function filtradoPersonas() {
// Declare variables
    var tipFiltro = document.getElementById("personasSelect");
    var input, filter, table, tr, td, i;
    input = document.getElementById("buscador");
    filter = input.value.toUpperCase();
    table = document.getElementById("tablaPersonas");
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

function myfiltro() {
// Declare variables 
    var ffiltro = document.getElementById("funcionariosSelect");
    var inputs, filters, tables, trs, tds, i;
    inputs = document.getElementById("buscador2");
    filters = inputs.value.toUpperCase();
    tables = document.getElementById("tablaFuncionarios");
    trs = tables.getElementsByTagName("tr");
    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < trs.length; i++) {
        tds = trs[i].getElementsByTagName("td")[parseInt(ffiltro.selectedIndex)];
        if (tds) {
            if (tds.innerHTML.toUpperCase().indexOf(filters) > -1) {
                trs[i].style.display = "";
            } else {
                trs[i].style.display = "none";
            }
        }
    }
}

function mypaginacion() {
    // Grab whatever we need to paginate
    var pagesParts = $(".paginate");
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

function paginacion() {
    // Grab whatever we need to paginate
    var pageParts = $(".paginas");
    // How many parts do we have?
    var numPages = pageParts.length;
    // How many parts do we want per page?
    var perPage = 6;

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
    $('#ced').focus();
    $("#ced").removeAttr("readonly"); //elimina el atributo de solo lectura

    //se cambia la accion por agregarPersona
    $("#usuariosAction").val("agregarUsuario");
    //esconde el div del mensaje
    mostrarMensaje("hiddenDiv", "", "");

    //Resetear el formulario
    $('#usuarioModal').trigger("reset");
}

function confirmarEliminacion(idUsuario) {
    mostrarModal("myModalEliminar", "", "");
    $("#myModalEliminar").attr("data-id", idUsuario);
}

