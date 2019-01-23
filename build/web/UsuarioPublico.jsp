<%-- 
    Document   : UsuarioPublico
    Created on : May 30, 2017, 12:59:02 AM
    Author     : GeekMQ
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js"></script>
        <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>

        <link href="css/datetimepicker.min.css" rel="stylesheet" type="text/css"/>
        <script src="js/datetimepicker.js" type="text/javascript"></script>

        <script src="js/MapsJS.js" type="text/javascript"></script>
        <script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBxwZi0Uls1PPsL4I70Zj-oDMo5epEr3sM&callback=initMap"></script>
        <script src="js/UsuarioPublico.js" type="text/javascript"></script>
        <link href="css/css.css" rel="stylesheet" type="text/css"/>


        <title>JSP Page</title>
    </head>
    <body>

        <!-- Modal del BootsTrap para mostrar mensajes                  -->
        <!-- ********************************************************** -->
        <!-- ********************************************************** -->
        <div class="modal fade" id="myModal" role="dialog">
            <div class="modal-dialog modal-sm">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title" id="myModalTitle">Modal Header</h4>
                    </div>
                    <div class="modal-body" id="myModalMessage">
                        <p>This is a small modal.</p>
                    </div>
                </div>
            </div>
        </div>
        <!-- ********************************************************** -->
        <!-- ********************************************************** -->
        <!-- ********************************************************** -->
        <div class="registro">
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
                                <li><a href="AplicacionJSP.jsp" data-selector="Footers" > <b class="texto_barra" >Prinipal</b></a></li>
                                <li><a href="BuscadorVuelosJSP.jsp" data-selector="Footers" style=""><b class="texto_barra">Buscador</b></a></li>
                                <li class="active"><a href="UsuarioPublico.jsp" data-selector="Footers" style=""><b class="texto_barra">Nueva Cuenta</b></a></li>
                                <li><a href="LoginJSP.jsp" data-selector="Footers" style=""><b class="texto_barra">Iniciar Secion</b></a></li>
                                <li><a href="Contactenos.jsp" data-selector="Footers" style=""><b class="texto_barra">Contacto</b></a></li>
                            </ul>
                        </div><!-- /.navbar-collapse -->
                    </div>
                </nav>
            </header>
            <div class="container">
                <div class="boxRegistro text_blanco">
                    <form role="form" onsubmit="return false;" id="formPersonas">
                        <div class="col-sm-4">
                            <div class="form-group" id="groupCedula">
                                <label for="cedula">Cedula:</label>
                                <input type="text" class="form-control small" onkeyup="esNumero();" id="cedula"  placeholder="Cedula">
                            </div>

                            <div class="form-group" id="groupNombre">
                                <label for="nombre">Nombre:</label>
                                <input type="text" class="form-control" id="nombre" placeholder="Nombre" onkeyup="validaNombre();">
                            </div>  
                            <div class="form-group" id="groupApellidos">
                                <label for="apellidos">Apellidos:</label>
                                <input type="text" class="form-control" id="apellidos" placeholder="Apellidos" onkeyup="validaApellido();"   >
                            </div>
                            <div class="form-group" id="groupFechaNacimiento">
                                <label for="dpFechaNacimientoText">Fecha de Nacimiento:</label>
                                <div id="dpFechaNacimiento" class="input-group date form_date" data-date="" data-date-format="dd/mm/yyyy" data-link-format="dd/mm/yyyy">
                                    <input class="form-control" type="text" value="" readonly placeholder="dd/mm/aaaa" id="dpFechaNacimientoText">
                                    <span class="input-group-addon">
                                        <span class="glyphicon glyphicon-calendar"></span>
                                    </span>
                                </div>
                            </div>

                            <div class="form-group" id="groupNombreUsuario">
                                <label for="nomUser">Nombre de usuario:</label>
                                <input type="text" class="form-control" id="nomUser" placeholder="Nombre de usuario">
                            </div>
                        </div>


                        <div class="col-sm-4">
                            <div class="form-group" id="groupEmail">
                                <label for="email">Correo Electronico: </label>
                                <input type="email" class="form-control" id="email" placeholder="Email">
                            </div>

                            <div class="form-group" id="groupDireccion">
                                <label for="direccion">Direccion:</label>
                                <input type="text" class="form-control"  id="direccion" placeholder="Direccion">
                            </div>


                            <div class="form-group" id="groupTelefono">
                                <label for="telefono">Telefono:</label>
                                <input type="text" class="form-control" id="telefono" placeholder="Telefono" onkeyup="validaTelefono();">

                            </div>

                            <div class="form-group" id="groupCelular">
                                <label for="celular">Celular:</label>
                                <input type="text" class="form-control" id="celular" placeholder="Celular" onkeyup="validaCelular();">
                            </div>



                            <div class="form-group" id="groupContraseña">
                                <label for="contraseña">Contraseña:</label>
                                <input type="password" class="form-control" id="contraseña" placeholder="Contraseña">
                            </div>


                        </div>
                        <div id="map" class="map"></div>

                        <div class="form-group">
                            <div class="btn btn-group">
                                <input type="hidden" value="agregarPersona" id="personasAction"/>
                                <button type="submit" class="btn btn-primary" id="enviar" onclick="guardadoDatos();">Guardar</button>
                                <button type="reset" class="btn btn-danger" id="cancelar">Cancelar</button>
                            </div>
                        </div>

                        <div class="form-group height25" >
                            <div class="alert alert-success hiddenDiv" id="mesajeResult">
                                <strong id="mesajeResultNeg">Info!</strong> 
                                <span id="mesajeResultText">This alert box could indicate a neutral informative change or action.</span>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
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
                                <p class="small">© Copyright 2017. Script Eden Network</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    </body>
</html>
