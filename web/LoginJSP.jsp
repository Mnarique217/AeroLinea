<%-- 
    Document   : login
    Created on : May 13, 2016, 1:20:00 PM
    Author     : chgari
--%>
<%-- PARA EL MANEJO DE SESSIONES ES REQUERIDO LA LINEA session="true"--%>
<%@page contentType="text/html" pageEncoding="UTF-8" session="false" %>

<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->
<html>
    <head>
        <title>TODO supply a title</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js"></script>
        <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
        <link href="css/css.css" rel="stylesheet" type="text/css"/>
        <link href="css/Loguin.css" rel="stylesheet" type="text/css"/>
        <script src="js/utils.js" type="text/javascript"></script>
        <script src="js/LoginJS.js" type="text/javascript"></script>
    </head>
    <body>


        <header class="header3" id="header3">

  
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
                                <li ><a href="AplicacionJSP.jsp" data-selector="Footers" > <b>Prinipal</b></a></li>
                                <li><a href="BuscadorVuelosJSP.jsp" data-selector="Footers" style=""><b class="texto_barra">Buscador</b></a></li>
                                <li><a href="UsuarioPublico.jsp" data-selector="Footers" style=""><b class="texto_barra">Nueva Cuenta</b></a></li>
                                <li class="active"><a href="LoginJSP.jsp" data-selector="Footers" style=""><b class="texto_barra">Iniciar Secion</b></a></li>
                                <li><a href="Contactenos.jsp" data-selector="Footers" style=""><b class="texto_barra">Contacto</b></a></li>
                            </ul>
                        </div><!-- /.navbar-collapse -->
                    </div>
                </nav>


            <div class="container">
                <div class="container">
                    <form role="form" onsubmit="return false;" id="formLogin">
                        <div class="form-group">
                            <h1 class="text_blanco">Login</h1>
                        </div>
                        <div class="form-group" id="groupUsario">
                            <div class="btn btn-group">
                                <label for="usuario" class="text_blanco">Usuario:</label>
                            </div>
                            <input type="text" class="form-control texLarge" id="usuario"  placeholder="Usuario">
                        </div>
                        <div class="form-group" id="groupPassword">
                            <div class="btn btn-group">
                                <label for="password" class="text_blanco">Contraseña:</label>
                            </div>
                            <input type="password" class="form-control texLarge" id="password" placeholder="Contraseña" >
                        </div>
                        <div class="form-group">
                            <img src="imagenes/loader.gif" id="loader" alt="load" />
                            <input type="hidden" value="agregarPersona" id="personasAction"/>
                            <button type="submit" class="btn btn-primary" id="enviar">Ingresar</button>
                            <button type="reset" class="btn btn-danger" id="cancelar">Cancelar</button>
                        </div>
                        <div class="form-group " >
                            <div class="alert alert-success hidden" id="mesajeResult">
                                <strong id="mesajeResultNeg">Info!</strong> 
                                <span id="mesajeResultText">This alert box could indicate a neutral informative change or action.</span>
                            </div>
                        </div>
                    </form>
                </div>
            </div><!-- container -->
        </header><!-- header -->
        <!-- Footer -->
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
        <!-- Go to www.addthis.com/dashboard to customize your tools -->
    </body>
</html>
