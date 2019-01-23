//
//var elejidos = new Array();
//var asientos = new Array("1F", "3A", "5B", "1A", "1B");
//
//$(function () {
//    
//    cantidadAsientosFila(8);
//    crearAvion(5, 8);
//});
//function cantidadAsientosFila(cant) {
//    var tam = (cant + 1) * (28 + 8);//El +1 es del pasillo
//    $("#avion").css({
//        "width": tam,
//        "min-width": tam
//    });
//}
//function crearAvion(cantFilas, cantColumnas) {
//    var codigos = "ABCDEFGHIJKLMNÑOPQRSTVWXYZ";
//    
//    var pasillo = Math.ceil(cantColumnas / 2);
//    for (var f = 0; f < cantFilas; f++) {
//        for (var c = 0; c < cantColumnas; c++) {
//            var bandera = asientos.includes((f + 1) + codigos.charAt(c));
//            var principal;
//            var contenedorAsiento;
//            if (c === pasillo) {
//                principal = document.getElementById("avion");
//                contenedorAsiento = document.createElement("div");
//                contenedorAsiento.className = "pasillo";
//                contenedorAsiento.innerHTML = "P";
//                principal.appendChild(contenedorAsiento);
//            }
//
//            principal = document.getElementById("avion");
//            contenedorAsiento = document.createElement("div");
//            contenedorAsiento.className = "avion_seat";
//
//            var img = document.createElement("img");
//            if (bandera) {
//                img.src = "imagenadmin/ocupado.png";
//            } else {
//                $(contenedorAsiento).click(function (event) {
//
//                    manejarEvento(event,"" + (f + 1) + codigos.charAt(c));
//                });
//                img.src = "imagenadmin/libre.png";
//            }
//            var codigo_asiento = document.createElement("div");
//            codigo_asiento.className = "codigo_asiento";
//            codigo_asiento.innerHTML = "" + (f + 1) + codigos.charAt(c);
//
//            contenedorAsiento.appendChild(img);
//            contenedorAsiento.appendChild(codigo_asiento);
//
//            principal.appendChild(contenedorAsiento);
//
//        }
//    }
//}
//
//function manejarEvento(event, asiento) {
//
//
//    if (elejidos.includes(asiento)) {
//        event.currentTarget.firstChild.src = "imagenadmin/libre.png";
//        elejidos = jQuery.grep(elejidos, function (value) {
//            return value !== asiento;
//        });
//    } else {
//        event.currentTarget.firstChild.src = "imagenadmin/tomado.png";
//        elejidos.push(asiento);
//    }
//
//}
//
//
