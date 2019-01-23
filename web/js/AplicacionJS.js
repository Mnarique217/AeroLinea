/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 * 
 Longitud: -84.0000000  pertenecientes a costa rica
 Latitud: 10.0000000   costa rica
 */

var imagenes = ["imagenes/orlando_disney.jpg", "imagenes/orlando_disney.jpg", "imagenes/playa1.jpg", "imagenes/cancun.jpg", "imagenes/cartagena.jpg", "imagenes/lima.jpg"];

$(document).ready(function () {

    for (var i = 1; i < imagenes.length; i++) {
        var image = document.createElement("img");
        image.alt = "Alt information for image";
        image.src = imagenes[i];
     
        $('#slide' + i).html(image);
        $('#slide' + i).css({
            "width": 100
        });
    }
    $("#slider").carousel({interval: 2000});
});

var idaregreso = ['fechaida', 'fecharegreso'];
$(function () {
    //Genera el datapicker

    for (var i = 0; i < idaregreso.length; i++) {
        $('#'+idaregreso[i]).datetimepicker({
            weekStart: 1,
            todayBtn: 1,
            autoclose: 1,
            todayHighlight: 1,
            startView: 2,
            minView: 2,
            forceParse: 0
        });
    }
    $("#ida").hide();
});

function idaVuelta() {
$("#ida").show();
}

function ida() {
$("#ida").hide();
}




