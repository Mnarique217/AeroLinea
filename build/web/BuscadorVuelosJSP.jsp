<%-- 
    Document   : BuscadorVuelosJSP
    Created on : Jun 6, 2017, 12:03:11 PM
    Author     : GeekMQ
--%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>JSP Page</title>

        <script src="js/jquery-3.2.0.min.js" type="text/javascript"></script>
        <script src="js/CheckingJS.js" type="text/javascript"></script>
        <link href="css/checking.css" rel="stylesheet" type="text/css"/>

        <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js"></script>
        <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>

        <link href="css/css.css" rel="stylesheet" type="text/css"/>
        <link href="css/Ofertas.css" rel="stylesheet" type="text/css"/>
        <script src="js/BuscadorJS.js" type="text/javascript"></script>
    </head>
    <body>
        <div class="container">  
            <header>

                <nav role="navigation" class="navbar navbar-default">
                    <div class="container">
                        <div class="navbar-header">
                            <button data-target="#navbar-collapse-02" data-toggle="collapse" class="navbar-toggle" type="button" data-selector="Footers">
                                <span class="sr-only">Toggle navigation</span>
                                <span class="icon-bar"></span>
                                <span class="icon-bar"></span>
                                <span class="icon-bar"></span>
                            </button>
                            <a href="#" class="navbar-brand brand" data-selector="Footers"><i class="fa fa-codepen"></i>Easy Aero</a>
                        </div>

                        <div id="navbar-collapse-02" class="collapse navbar-collapse">		      
                            <ul class="nav navbar-nav navbar-right">
                                <li ><a href="AplicacionJSP.jsp" data-selector="Footers">Prinipal</a></li>
                                <li class="item active"><a href="BuscadorVuelosJSP.jsp" data-selector="Footers" style="">Buscador</a></li>
                                <li><a href="UsuarioPublico.jsp" data-selector="Footers" style="">Nueva Cuenta</a></li>
                                <li><a href="LoginJSP.jsp" data-selector="Footers" style="">Iniciar Secion</a></li>
                                <li><a href="Contactenos.jsp" data-selector="Footers" style="">Contacto</a></li>
                            </ul>
                        </div><!-- /.navbar-collapse -->
                    </div>
                </nav>
            </header>

            <div class="container" id="buscadorPricp">
                <div class="container" >
                    <div class="container" >
                        <div class="panel imgBuscador">
                            <form role="form" onsubmit="return false;" id="buscadorPrincipal">
                                <table>
                                    <tr>
                                        <td colspan="2" class="text_blanco">
                                            <input type="radio" name="radio" checked="checked" value="Ida" onclick="ida();"/>Ida
                                            <input type="radio" name="radio" value="Vuelta" onclick="idaVuelta();"/>Ida/Vuelta
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <label for="origen" class="text_blanco">Origen</label>&nbsp;&nbsp;
                                            <input type="text" class="form-control textBlack" id="origen" placeholder="bilbao" >
                                            <input type="hidden"  id="idOrigen"/>
                                            <select id="selectorCiudadOrigen"> </select>
                                        </td>
                                        <td>
                                            <label for="destino" class="text_blanco">Destino</label>&nbsp;&nbsp;
                                            <input type="text" class="form-control textBlack" id="dest" placeholder="barcelna" >
                                            <input type="hidden"  id="idDestino"/>
                                            <select id="selectorCiudadDestino"> </select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td >
                                            <label for="fechaida" class="text_blanco">Feca Ida</label>&nbsp;&nbsp;
                                            <div id="fechaida" class="input-group date form_date" data-date="" data-date-format="dd/mm/yyyy" data-link-format="dd/mm/yyyy">
                                                <input class="form-control" type="text" value="" readonly placeholder="dd/mm/aaaa" id="fechaidaText">
                                                <span class="input-group-addon">
                                                    <span class="glyphicon glyphicon-calendar"></span>
                                                </span>
                                            </div>
                                        </td>
                                        <td>
                                            <label for="cantidad" class="text_blanco">Cantidad</label>&nbsp;&nbsp;
                                            <input class="form-control" type="text" value=""  placeholder="canada" id="cantidad">
                                        </td>
                                    </tr>
                                    <tr>
                                        <td id="ida">
                                            <label for="fechaida" class="text_blanco">Feca Regreso</label>&nbsp;&nbsp;
                                            <div id="fecharegreso" class="input-group date form_date" data-date="" data-date-format="dd/mm/yyyy" data-link-format="dd/mm/yyyy">
                                                <input class="form-control" type="text" value="" readonly placeholder="dd/mm/aaaa" id="fecharegresoText">
                                                <span class="input-group-addon">
                                                    <span class="glyphicon glyphicon-calendar"></span>
                                                </span>
                                            </div>
                                        </td>
                                        <td>
                                            <button type="button" class="btn btn-success" id="enviar" >Consultar</button>
                                        </td>
                                    </tr>
                                </table>
                            </form>
                        </div> 
                    </div>
                </div>


                <div class="container">
                    <div class="modal fade" id="myModal" role="dialog">
                        <div class="modal-dialog">
                            <!-- Modal content-->
                            <div class="modal-content colorRojo">
                                <div class="modal-header colorBlanco">
                                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                                    <h4 class="modal-title">Oferta de viaje</h4>
                                </div>
                                <div class="modal-body">
                                    <div class="col-sm-4">
                                        <div class="form-group" id="groupPrecio">
                                            <label for="precio">$ precio</label>
                                            <input type="text" class="form-control" id="precio" placeholder="222">
                                        </div>
                                        <div class="form-group" id="groupSalida">
                                            <label for="dpSalida">Fecha de Salida:</label>
                                            <div id="dpSalida" class="input-group date form_date" data-date="" data-date-format="dd/mm/yyyy" data-link-format="dd/mm/yyyy">
                                                <input class="form-control" type="text" value="" readonly placeholder="dd/mm/aaaa" id="dpSalidaText">
                                                <span class="input-group-addon">
                                                    <span class="glyphicon glyphicon-calendar"></span>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-sm-4">
                                        <div class="form-group" id="groupDisponibles">
                                            <label for="asientos">Asientos Disponibles</label>
                                            <input type="text" class="form-control" id="asientos" placeholder="asientos disponibles" >
                                        </div>
                                        <div class="form-group" id="groupDescuento">
                                            <label for="descuento">Descuento</label>
                                            <input type="text" class="form-control" id="descuento" placeholder="$50" >
                                        </div>
                                    </div>
                                    <div class="col-sm-4">
                                        <div class="form-group" id="groupDestino">
                                            <label for="asientos">origen</label>
                                            <input type="text" class="form-control" id="orig" placeholder="Costa rica" >
                                        </div>
                                        <div class="form-group" id="groupDescuento">
                                            <label for="destino">destino</label>
                                            <input type="text" class="form-control" id="destino" placeholder="barcelo" >
                                        </div>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <div class="form form-group">
                                        <div class="btn btn-group">
                                            <button type="button" class="btnP" data-dismiss="modal">Close</button>
                                        </div>
                                        <div class="btn btn-group">
                                            <button type="button" class="btnP"  id="comprar">Comprar</button>
                                        </div>
                                    </div>
                                </div>       
                            </div>
                        </div>
                    </div>
                </div>
                <div class="container" id="ofertasBuscador">
                    <div class="btnP" id="resultVerd"></div>
                    <div class="btnR" id="resultRojo"></div>
                    <div class="container article">
                        <ul class="galeria" id="ofertas">   
                        </ul>
                    </div>
                </div>

                <div class="container" id="ofertasInicio">
                    <div class="container article">
                        <ul class="galeria" id="ofertas2">   
                        </ul>
                    </div>
                </div>
            </div>


            <div id="formResult">
                <div class="container" id="result">
                    <div class="car-promo-container2">
                        <form role="form" onsubmit="return false;">
                            <div class="btn-group" id="grouPasaporte">
                                <label for="pasaporte">Pasaporte</label>
                                <input type="text" class="form-control small"  onkeyup="esNumero();" id="pasaporte"  placeholder="Passport">
                            </div>

                            <div class="btn-group" id="groupNombre">
                                <label for="nombre">Nombre:</label>
                                <input type="text" class="form-control" id="nombre" placeholder="Nombre" >
                            </div>  
                            <div class="btn-group" id="groupApellidos">
                                <label for="apellidos">Apellidos:</label>
                                <input type="text" class="form-control" id="apellidos" placeholder="Apellidos" >
                            </div>
                            <div class="btn-group" id="groupCantidadAsientos">
                                <label for="apellidos">Cantidad de Asientos:</label>
                                <input type="number" class="form-control" id="cantidadAsientos" placeholder="seleccione una cantidad" >
                            </div>

                            <div class="btn-group" id="groupApartar">
                                <button type="button" id="siguiente" class="btn btn-success">siguente</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div class="caja_buscador" id="asientosCheck">
                <div style="overflow-x:scroll;">
                    <div  id="avion"></div>
                </div>
            </div>
        </div>
        
        <input type="hidden" value="" id="idViaje"/>

        <footer class="footer4">
            <div class="container">
                <div class="row">
                    <div class="col-md-offset-1 col-md-10">
                        <div class="row footer-margin">
                            <div class="col-md-4">
                                <ul class="list-unstyled">
                                    <li><p>What is Binary Options</p></li>
                                    <li><p>Binary Brokers</p></li>
                                    <li><p>Binary Products</p></li>
                                </ul>
                            </div>
                            <div class="col-md-4">
                                <ul class="list-unstyled">
                                    <li><p>About Boaelite</p></li>
                                    <li><p>Our Affiliate Team</p></li>
                                    <li><p>Payout Affiliate Options</p></li>
                                </ul>
                            </div>
                            <div class="col-md-4">
                                <ul class="list-inline">
                                    <li class="social-title">Always With You</li>
                                    <li><i class="fa fa-facebook social-icon"></i></li>
                                    <li><i class="fa fa-google-plus social-icon"></i></li>
                                    <li><i class="fa fa-twitter social-icon"></i></li>
                                    <li><i class="fa fa-dribbble social-icon"></i></li>
                                </ul>
                            </div>
                        </div>
                        <hr class="footer-margin">
                        <div class="row footer-margin">
                            <div class="col-md-12">
                                <p><a href="#">Privacy Policy</a> | <a href="#">Terms of Use</a></p>
                                <p class="small">EasyAero</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    </body>
</html>
