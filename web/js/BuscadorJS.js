
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function esNumero() {
    $("#grouPasaporte").removeClass("has-error");
    var num = "abcdefghijklmnopqrstuvwxyz";
    var n = $("#pasaporte").val();
    n = n.toString();

    if (n.length > 11) {
        alert("verifica los datos del pasaporte");
        $("#grouPasaporte").addClass("has-error");
    }
    for (var i = 0; i < n.length; i++) {
        for (var j = 0; j < num.length; j++) {
            if (num[j] === n[i]) {
                alert("ingresa solo valores numericos");
                $("#grouPasaporte").addClass("has-error");
                return;
            }
        }
    }
}

var cantidadAsientos;


$(function () {

    $("#comprar").click(function () {

        $("#buscadorPricp").hide();
        $("#formResult").show();
        $("#myModal").modal("hide");
    });


    $("#siguiente").click(function () {
        pasarAcheck();
    });
});


function pasarAcheck() {
    var validacion = true;

    $("#grouPasaporte").removeClass("has-error");
    $("#groupNombre").removeClass("has-error");
    $("#groupApellidos").removeClass("has-error");
    $("#groupCantidadAsientos").removeClass("has-error");


    if ($("#pasaporte").val() === "") {
        $("#grouPasaporte").addClass("has-error");
        validacion = false;
    }
    if ($("#nombre").val() === "") {
        $("#groupNombre").addClass("has-error");
        validacion = false;
    }
    if ($("#cantidadAsientos").val() === "" || $("#cantidadAsientos").val()> $("#asientos").val()) {
        
        $("#groupCantidadAsientos").addClass("has-error");
        validacion = false;
    }
    if ($("#apellidos").val() === "") {
        $("#groupApellidos").addClass("has-error");
        validacion = false;
    }
    
    if(validacion)
        $("#asientosCheck").show();
}


function consultarFiltro() {

    //Se envia la información por ajax
    $.ajax({
        url: 'ViajesServlet',
        data: {
            accion: "consultanueva",
            origen: $("#origen").val(),
            destino: $("#dest").val()
        },
        error: function () { //si existe un error en la respuesta del ajax
            alert("fallo de consulta");
        },
        success: function (data) { //si todo esta correcto en la respuesta del ajax, la respuesta queda en el data
            dibujarCuadro(data);
        },
        type: 'POST',
        dataType: "json"
    });
}

$(document).ready(function () {
    $('#enviar').click(function () {
        consultarFiltro();
        limpiarForm();
    });
    iniciarSelectores();
    $("#formResult").hide();
    $("#asientosCheck").hide();



    limpiarForm();
    consultarCiudades();
    consultarFiltro2();
});
function verOferta() {
    $("#myModal").modal("show");
}

//******************************************************************************viajes
//******************************************************************************
//******************************************************************************
//******************************************************************************
//******************************************************************************


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
    $("#ofertas").html("");
    if (dataJson.length > 0) {
        $("#resultVerd").html("");
        $("#resultVerd").html(dataJson.length + " Resultados");
        $('#resultVerd').show();
    } else {
        $("#resultRojo").html("");
        $("#resultRojo").html(dataJson.length + " Resultados");
        $('#resultRojo').show();
    }


    for (var i = 0; i < dataJson.length; i++) {
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
            $("#orig").val(data.vuelo.ciudadByFkOrigen.nombre);
            $("#destino").val(data.vuelo.ciudadByFkDestino.nombre);
            $("#asientos").val(data.cantidadAsientosDisponibles);
        },
        type: 'POST',
        dataType: "json"
    });
}


//******************************************************************************selectores
//******************************************************************************
//******************************************************************************
//******************************************************************************
//******************************************************************************


function iniciarSelectores() {
    $('#selectorCiudadOrigen').change(function () {
        var val = $("#selectorCiudadOrigen option:selected").text();
        $("#origen").val(val);

        var temp = $("#selectorCiudadOrigen option:selected").val();
        $("#idOrigen").val(temp);
    });

    $('#selectorCiudadDestino').change(function () {
        var val1 = $("#selectorCiudadDestino option:selected").text();
        $("#dest").val(val1);

        var val2 = $("#selectorCiudadDestino option:selected").val();
        $("#idDestino").val(val2);

    });

//    $("#origen").attr('readonly', 'readonly');
//    $("#dest").attr('readonly', 'readonly');
}

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
}
//@ author manrique GeekMQ
function llenarSelectorCiudades(dataJson) {
    $("#selectorCiudadDestino").html("");//vaciamos el selector
    $("#selectorCiudadOrigen").html("");//vaciamos el selector

    $('#selectorCiudadDestino').append('<option  value=' + 0 + '>' + "seleccion" + '</option>');
    $('#selectorCiudadOrigen').append('<option  value=' + 0 + '>' + "seleccion" + '</option>');
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

function limpiarForm() {

    $('#buscadorPrincipal').trigger("reset");
    $('#resultVerd').hide();
    $('#resultRojo').hide();
}



//******************************************************************************
//******************************************************************************
//******************************************************************************
//******************************************************************************
//******************************************************************************

function consultarFiltro2() {

    //Se envia la información por ajax
    $.ajax({
        url: 'ViajesServlet',
        data: {
            accion: "consultarViajes"
        },
        error: function () { //si existe un error en la respuesta del ajax
            alert("fallo de consulta");
        },
        success: function (data) { //si todo esta correcto en la respuesta del ajax, la respuesta queda en el data
            dibujarCuadro2(data);
        },
        type: 'POST',
        dataType: "json"
    });
}

function dibujarCuadro2(dataJson) {


    var tam = 6;
    if (dataJson.length < 6)
        tam = dataJson.length;

    for (var i = 0; i < tam; i++) {
        cargarOfertas2(dataJson[i]);
    }
}


function cargarOfertas2(data) {


    $("#ofertas2").append('<li>'
            + '<div class="car-promo-container">'
            + '<img src="imagenes/pubfond/avion.png" alt=""/>'
            + '<div class="box2">'
            + '<div  onclick="consultarViajesById(' + data.pkId + ');" title="Ver Oferta" class="btnP medium">'
            + 'Ver Oferta'
            + '</div>'
            + '</div>'
            + '</div>' + '</li>');

}

//------------------------------------------------------------------------------
function validar() {
    var validacion = true;
    $("#groupNombre").removeClass("has-error");
    $("#groupApellidos").removeClass("has-error");
    $("#groupDisp").removeClass("has-error");
    $("#groupCedula").removeClass("has-error");

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

    if ($("#disp").val() === "" || $("#disp").val().length > 4 || $("#disp").val() < 0 || $("#disp").val() > $("#asientos").val()) {
        $("#groupDisp").addClass("has-error");
        validacion = false;
    }

    return validacion;
}



/*-------------------------------------------------------------------------------*/

var elejidos = new Array();
var asientos = new Array("1F", "3A", "5B", "1A", "1B");

$(function () {

    cantidadAsientosFila(9);
    crearAvion(5, 9);
});
function cantidadAsientosFila(cant) {
    var tam = (cant + 1) * (28 + 8);//El +1 es del pasillo
    $("#avion").css({
        "width": tam,
        "min-width": tam
    });
}
function crearAvion(cantFilas, cantColumnas) {
    var codigos = "ABCDEFGHIJKLMNÑOPQRSTVWXYZ";

    var pasillo = Math.ceil(cantColumnas / 2);
    for (var f = 0; f < cantFilas; f++) {
        for (var c = 0; c < cantColumnas; c++) {
            var bandera = asientos.includes((f + 1) + codigos.charAt(c));
            var principal;
            var contenedorAsiento;
            if (c === pasillo) {
                principal = document.getElementById("avion");
                contenedorAsiento = document.createElement("div");
                contenedorAsiento.className = "pasillo";
                contenedorAsiento.innerHTML = "P";
                principal.appendChild(contenedorAsiento);
            }

            principal = document.getElementById("avion");
            contenedorAsiento = document.createElement("div");
            contenedorAsiento.className = "avion_seat";

            var img = document.createElement("img");
            if (bandera) {
                img.src = "imagenadmin/ocupado.png";
            } else {
                $(contenedorAsiento).click(function (event) {

                    manejarEvento(event, "" + (f + 1) + codigos.charAt(c));
                });
                img.src = "imagenadmin/libre.png";
            }
            var codigo_asiento = document.createElement("div");
            codigo_asiento.className = "codigo_asiento";
            codigo_asiento.innerHTML = "" + (f + 1) + codigos.charAt(c);

            contenedorAsiento.appendChild(img);
            contenedorAsiento.appendChild(codigo_asiento);

            principal.appendChild(contenedorAsiento);

        }
    }
}

function manejarEvento(event, asiento) {


    if (elejidos.includes(asiento)) {
        event.currentTarget.firstChild.src = "imagenadmin/libre.png";
        elejidos = jQuery.grep(elejidos, function (value) {
            return value !== asiento;
        });
    } else {
        event.currentTarget.firstChild.src = "imagenadmin/tomado.png";
        elejidos.push(asiento);
    }

}


