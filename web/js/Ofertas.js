/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$(document).ready(function () {
    $('#comprar').click(function(){
        enviar();
    });
    
    consultarViajes();
});

function verOferta() {
    $("#myModal").modal("show");
}

//******************************************************************************viajes
//******************************************************************************
//******************************************************************************
//******************************************************************************
//******************************************************************************

function consultarViajes() {

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
            dibujarCuadro(data);

        },
        type: 'POST',
        dataType: "json"
    });
}

function cargarOfertas(data) {


        $("#ofertas").append('<li>'
                + '<div class="car-promo-container">'
                + '<img src="imagenes/pubfond/avion.png" alt=""/>'
                + '<div class="box2">'
                + '<div  onclick="consultarViajesById(' + data.pkId + ');" title="Ver Oferta" class="btnP medium">'
                + 'Ver Oferta'
                + '</div>'
                + '</div>'
                + '</div>' + '</li>');

}

function dibujarCuadro(dataJson) {
    var limit=6;
    if (dataJson.length < 5)
        limit=dataJson.length;
    
    for (var i = 0; i < limit; i++) {
        cargarOfertas(dataJson[i]);
    }

}

function consultarViajesById(idViaje) {

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
            //se muestra el formulario
            $("#myModal").modal();
            $('#precio').prop('readonly', true);
            $('#descuento').prop('readonly', true);
            $('#origen').prop('readonly', true);
            $('#destino').prop('readonly', true);
            $('#asientos').prop('readonly', true);
            
            var temp = data.fechaSalida;
            $("#dpSalidaText").val(temp);
            $("#precio").val(data.precio);
            $("#descuento").val(data.descuento);
            $("#origen").val(data.vuelo.ciudadByFkOrigen.nombre);
            $("#destino").val(data.vuelo.ciudadByFkDestino.nombre);
            $("#asientos").val(data.cantidadAsientosDisponibles);  
        },
        type: 'POST',
        dataType: "json"
    });
}

//******************************************************************************
//******************************************************************************
//******************************************************************************
//******************************************************************************
//******************************************************************************

function dibujarTablaV(dataJson) {
//limpia la información que tiene la tabla
    $("#tablaViajes").html("");
    //muestra el enzabezado de la tabla
    var head = $("<thead/>");
    var body = $("<tbody/>");
    var row = $("<tr/>");
    head.append(row);

    $("#tablaViajes").append(head);
    row.append($("<th><b>VUELO</b></th>"));
    row.append($("<th><b>SALIDA</b></th>"));
    row.append($("<th><b>ASIENTOS DISPONIBLES</b></th>"));
    row.append($("<th><b>PRECIO</b></th>"));
    row.append($("<th><b>DESCUENTO</b></th>"));
    row.append($("<th><b>ACCION</b></th>"));

}

function dibuFjarFilaV(rowData) {
//Cuando dibuja la tabla en cada boton se le agrega la funcionalidad de cargar o eliminar la informacion
//de una persona
    var row = $("<tr class=\"paginas\" />");
    $("#tablaViajes").append(row);
    row.append($("<td>" + rowData.vuelo.pkId + "</td>"));
    row.append($("<td>" + rowData.fechaSalida + "</td>"));
    row.append($("<td>" + rowData.cantidadAsientosDisponibles + "</td>"));
    row.append($("<td>" + rowData.precio + "</td>"));
    row.append($("<td>" + rowData.descuento + "</td>"));
    row.append($('<td><center><button type="button" class="btn btn-default btn-xs" aria-label="Left Align" onclick="consultarViajesById(' + rowData.pkId + ');">' +
            '<span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>' +
            '</button>' +
            '<button type="button" class="btn btn-default btn-xs" aria-label="Left Align" onclick="confirmarEliminacion(' + rowData.pkId + ');">' +
            '<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>' +
            '</button></center></td>'));
}




function enviar() {
        //Se envia la información por ajax   //passwordconf,password,nomuser,direccion,email,dpFechaNacimiento,celular,apellidos,nombre,cedula
        $.ajax({
            url: 'ViajesServlet',
            data: {
                accion: "",
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

}