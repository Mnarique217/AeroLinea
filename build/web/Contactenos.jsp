<%-- 
    Document   : Contactenos
    Created on : Jun 15, 2017, 9:43:15 PM
    Author     : GeekMQ
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
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

        <link href="css/contacto.css" rel="stylesheet" type="text/css"/>
        <script src="js/utils.js" type="text/javascript"></script>
        <script src="js/LoginJS.js" type="text/javascript"></script>
    </head>
    <body>
        <div class="bg"></div>

        <header class="header3" id="header">
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
                            <li class="active"><a href="AplicacionJSP.jsp" data-selector="Footers">Prinipal</a></li>
                            <li><a href="BuscadorVuelosJSP.jsp" data-selector="Footers" style="">Buscador</a></li>
                            <li><a href="UsuarioPublico.jsp" data-selector="Footers" style="">Nueva Cuenta</a></li>
                            <li><a href="LoginJSP.jsp" data-selector="Footers" style="">Iniciar Secion</a></li>
                            <li><a href="Contactenos.jsp" data-selector="Footers" style="">Contacto</a></li>
                        </ul>
                    </div><!-- /.navbar-collapse -->
                </div>
            </nav>

            <div class="container">
                <div class="container">
                    <section id="contact2" class="contact2"><!-- background pattern -->
                        <div class="container">
                            <div class="row">
                                <div class="col-md-offset-3 col-md-6 col-sm-12 col-xs-12 text-center">
                                    <!-- section title -->
                                    <h1 class="text_blanco">Contactenos</h1>
                                    <!-- big paragraph -->
                                    <p class="big-para">Lorem Ipsum adalah contoh teks atau dummy dalam industri percetakan dan penataan huruf atau typesetting.</p>
                                </div>
                                <div class="row">
                                    <div class="col-md-offset-3 col-md-6 col-sm-12 col-xs-12 ">
                                        <!-- contact form -->
                                        <div class="contact-form">
                                            <form class="clearfix" accept-charset="utf-8" method="get" action="#">
                                                <div class="row">
                                                    <div class="col-sm-6 form-group wow fadeInDown" data-wow-delay="700ms" data-wow-duration="1000ms">
                                                        <label class="sr-only" for="name">Nombre</label>									
                                                        <input type="text" placeholder="su nombre" name="name" class="form-control input-lg" required="">										
                                                    </div>
                                                    <div class="col-sm-6 form-group wow fadeInDown" data-wow-delay="700ms" data-wow-duration="1000ms">
                                                        <label class="sr-only" for="email">Email</label>
                                                        <input type="email" placeholder="ejemplo@gmail.com" name="email" class="form-control input-lg" required="">
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-sm-12 form-group wow fadeInDown" data-wow-delay="900ms" data-wow-duration="1000ms">
                                                        <label class="sr-only">Phone Number</label>
                                                        <input type="tel" placeholder="Telefono" name="tel" class="form-control input-lg">                                         
                                                    </div>
                                                </div>
                                                <div class="row">

                                                    <div class="col-sm-12 form-group wow fadeInDown" data-wow-delay="1000ms" data-wow-duration="1000ms">

                                                        <label class="sr-only" for="message">Escriba su mensaje</label>
                                                        <textarea rows="6" name="message" id="message" class="form-control input-lg " placeholder="mensaje" required=""></textarea>

                                                    </div>

                                                </div>

                                                <!-- submit button -->
                                                <button class="btn btn-success btn-lg btn-block wow fadeInDown" data-wow-delay="1200ms" data-wow-duration="1000ms" type="submit">enviar</button>

                                            </form>

                                        </div>

                                    </div>

                                </div>

                            </div>

                    </section>
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
    </body>
</html>
