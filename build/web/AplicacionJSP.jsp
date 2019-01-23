<%-- 
    Document   : PersonasJSP
    Created on : Apr 14, 2016, 2:30:49 PM
    Author     : chgari 
    modificado por manrique arrieta geekMQ
--%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@page import="java.util.*" session="true" %>

<!DOCTYPE html>
<html>
    <head>
        <title>Easy Aero</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <!-- google fonts-->
        <link href="https://fonts.googleapis.com/css?family=Orbitron" rel="stylesheet">
        <!--Bootstrap-->
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>

        <!--css propio-->
        <link href="css/nosotros.css" rel="stylesheet" type="text/css"/>
        <link href="css/css.css" rel="stylesheet" type="text/css"/>
        <!-- responsive -->
        <meta name="viewport" content="width=device-width, initial-scale=1.0"> 
        <!-- my script mover slider -->

        <script src="js/AplicacionJS.js" type="text/javascript"></script>

        <script src="js/datetimepicker.js" type="text/javascript"></script>
        <script src="js/utils.js" type="text/javascript"></script>
    </head>
    <body>

        <div class="avionmdl">
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
                                <li class="active"><a href="AplicacionJSP.jsp" data-selector="Footers" > <b class="texto_barra">Prinipal</b></a></li>
                                <li><a href="BuscadorVuelosJSP.jsp" data-selector="Footers" style=""><b class="texto_barra">Buscador</b></a></li>
                                <li><a href="UsuarioPublico.jsp" data-selector="Footers" style=""><b class="texto_barra">Nueva Cuenta</b></a></li>
                                <li><a href="LoginJSP.jsp" data-selector="Footers" style=""><b class="texto_barra">Iniciar Secion</b></a></li>
                                <li><a href="Contactenos.jsp" data-selector="Footers" style=""><b class="texto_barra">Contacto</b></a></li>
                            </ul>
                        </div><!-- /.navbar-collapse -->
                    </div>
                </nav>
            </header>

            <!--cuerpo del menu-->
            <H3 class="text_blanco">Pagina Principal</H3>
            <div class="txt_bienvenida">
                <h1>Valoramos tu confort</h1>
            </div>
        </div>



        <section class="row_mine">

            <div class="row_item">
                <div class="team1"></div>
                <div class="leader-overflow">
                    <strong>Patrices</strong>
                    <div>SEO / Web Designer</div>
                    <p>Lorem ipsum dolor amet, consect etuer adipiscing sed diam</p> 
                </div>
            </div>

            <div class="row_item">
                <div class="team2"></div>

                <div class="leader-overflow">
                    <strong>Patrices</strong>
                    <div>SEO / Web Designer</div>
                    <p>Lorem ipsum dolor amet, consect etuer adipiscing sed diam</p> 
                </div>
            </div>

            <div class="row_item">
                <div class="team3"></div>
                <div class="leader-overflow">
                    <strong>John Doe</strong>
                    <div>CEO / Co - founder</div>
                    <p>Lorem ipsum dolor amet, consect etuer adipiscing sed diam</p> 
                </div>
            </div>

            <div class="row_item">
                <div class="team4"></div>
                <div class="leader-overflow">
                    <strong>Richard</strong>
                    <div>ACM / Menager</div>
                    <p>Lorem ipsum dolor amet, consect etuer adipiscing sed diam</p> 
                </div>
            </div>

        </section>






        <div class="container" >
            <div id="myCarousel" class="carousel slide" data-ride="carousel">
                <!-- Indicators -->
                <ol class="carousel-indicators">
                    <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
                    <li data-target="#myCarousel" data-slide-to="1"></li>
                    <li data-target="#myCarousel" data-slide-to="2"></li>
                    <li data-target="#myCarousel" data-slide-to="3"></li>
                    <li data-target="#myCarousel" data-slide-to="4"></li>
                    <li data-target="#myCarousel" data-slide-to="5"></li>
                </ol>

                <!-- Wrapper for slides -->
                <div class="carousel-inner">
                    <div class="item active"> <img src="imagenes/cancun.jpg" alt="Los Angeles" style="width:100%; "></div>
                    <div class="item"> <img src="imagenes/playa1.jpg" alt="Chicago" style="width:100%;"> </div>
                    <div class="item"><img src="imagenes/orlando_disney.jpg" alt="New york" style="width:100%;"></div>
                    <div class="item"><img src="imagenes/cartagena.jpg" alt="New york" style="width:100%;"></div>
                    <div class="item"><img src="imagenes/lima.jpg" alt="New york" style="width:100%;"></div>
                </div>


                <!-- Left and right controls -->
                <a class="left carousel-control" href="#myCarousel" data-slide="prev">
                    <span class="glyphicon glyphicon-chevron-left"></span>
                    <span class="sr-only">Previous</span>
                </a>
                <a class="right carousel-control" href="#myCarousel" data-slide="next">
                    <span class="glyphicon glyphicon-chevron-right"></span>
                    <span class="sr-only">Next</span>
                </a>
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
</html>
