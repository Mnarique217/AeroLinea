<%-- 
    Document   : PersonasJSP
    Created on : Apr 14, 2016, 2:30:49 PM
    Author     : chgari
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@page import="java.util.*" session="true" %>

<%
    HttpSession sesion = request.getSession(true);
    String tipoUsuario = "";
    if (sesion != null) {
        if (sesion.getAttribute("usuario") == null) {
            response.sendRedirect("LoginJSP.jsp");
        } else {
            tipoUsuario = (String) sesion.getAttribute("tipo");
            if (tipoUsuario.equals("Publico")) {
                 response.sendRedirect("Allowed.jsp");
            }
        }
    } else {
        response.sendRedirect("LoginJSP.jsp");
    }
%>
<!DOCTYPE html>
<html>
    <head>
        <title>Admin Tipos de avion</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js"></script>
        <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>



        <link href="css/css.css" rel="stylesheet" type="text/css"/>
        <script src="js/utils.js" type="text/javascript"></script>

        <script src="js/jquery.simplePagination.js" type="text/javascript"></script>
        <link href="css/simplePagination.css" rel="stylesheet" type="text/css"/>
        <!-- ********************************************************** -->
        <script src="js/VuelosJS.js" type="text/javascript"></script>
    </head>
    <body class ="admin">
        <nav class="navbar navbar-inverse" >
            <nav class="container-fluid">
                <nav class="navbar-header">
                    <a class="navbar-brand" href="#" >Easy Aero</a>
                </nav>
                <ul class="nav navbar-nav">
                    <li><a href="AplicacionJSP.jsp">Public</a></li>
                    <li><a href="PersonasJSP.jsp">Personas </a></li>
                    <li><a href="UsuarioJSP.jsp">Usuarios </a></li>
                    <li><a href="FuncionarioJSP.jsp">Funcionarios </a></li>
                    <li><a href="ReservacionJSP.jsp">Reservaciones</a></li>
                    <li><a href="Ciudades.jsp">Agregar/Eliminar ciudades</a></li>
                    <li><a href="TiposAvion.jsp">Tipos de avion </a></li>
                    <li><a href="AvionJSP.jsp">Aviones</a></li>
                    <li><a href="VuelosJSP.jsp">Vuerlos</a></li>
                    <li><a href="ViajesJSP.jsp">Viajes</a></li>
                    <li>
                    <div class="col-md-4" style="text-align: right;">  <a class="btn btn-success" href="Logout" role="button"> <span class="glyphicon glyphicon-log-out" aria-hidden="true"></span> Cerrar Sesión</a></div>
                    </li>
                </ul>
            </nav>
        </nav>


        <!-- Modal del BootsTrap para confirmar la eliminacion          -->
        <!-- ********************************************************** -->
        <!-- ********************************************************** -->
        <div class="modal fade" id="myModalEliminar" role="dialog">
            <div class="modal-dialog modal-sm">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title" id="myModalTitle">Confirmar eliminación</h4>
                    </div>
                    <div class="modal-body" id="">
                        <p>¿Estas seguro ?</p>
                        <button type="submit" class="btn btn-danger" id="eliminar" onclick="eliminarVuelo($('#myModalEliminar').attr('data-id'))">Eliminar</button>
                        <button type="submit" class="btn btn-primary" onClick ="ocultarModal('myModalEliminar')">Cancelar</button>
                    </div>
                </div>
            </div>
        </div>
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

        <!-- tabla de vuelos-->
        <!-- ********************************************************** -->
        <!-- ********************************************************** -->  
        <div class="container">
            <div class="contenedor">
                <div class="panel">
                    <div class="panel-heading"><h3>Administracion de vuelos</h3></div>
                    <div class="panel-body colorRojo">
                        <div class="form-group " >
                            <div class="btn btn-group">
                                <label  for="vuelosSelector" >Filtrar</label>
                                <select id="vuelosSelector"> 
                                    <option value="0">AVION</option>
                                    <option value="1">ORIGEN</option>
                                    <option value="2">DESTINO</option>
                                </select><br>
                            </div>
                            <div class="btn btn-group">
                                <input  type="text" class="form-control texMediano" id="buscadorVuelos" onkeyup="filtradoVuelos();" placeholder="buscar vuelo">
                            </div>
                        </div>
                    </div>
                </div>
                <!-- ********************************************************** -->
                <!-- ********************************************************** --> 
                <div class="panel">
                    <input type="hidden"  id="id-merge"/>
                    <div class='table-responsive '> 
                        <div style="overflow-x:scroll;">
                            <table class="table table-hover table-bordered" id="tablaVuelos"></table>
                        </div>
                    </div>
                    <div class="panel-footer"></div>
                </div>

                <div class="panel colorRojo">
                    <div class="panel-body">
                        <form id="vuelosFomr">   
                            <div class="col-sm-3" id="groupAvion">
                                <label for="avion">Avion</label>
                                <input type="text" class="form-control textBlack"  id="avion"  placeholder="Click">
                                <input type="hidden"  id="idAvion"/>
                                <select id="selectorAvion" class=""></select>
                            </div>
                            <div class="col-sm-3" id="groupOrigen">
                                <label for="apellidos">Origen</label>
                                <input type="text" class="form-control textBlack" id="origen" placeholder="bilbao" >
                                <input type="hidden"  id="idOrigen"/>
                                <select id="selectorCiudadOrigen"> </select>
                            </div>
                            <div class="col-sm-3" id="groupDestino">
                                <label for="apellidos"> Destino</label>
                                <input type="text" class="form-control textBlack" id="destino" placeholder="bilbao" >
                                <input type="hidden"  id="idDestino"/>
                                <select id="selectorCiudadDestino"> </select>
                            </div>
                        </form>   

                        <div class="form-group">
                            <div class="btn btn-group">
                                <input type="hidden"  value="agregarVuelo" id="vuelosAction"/>
                                <button type="submit" class="btn btn-primary" id="enviar">Confirmar</button>
                                <button type="reset"  class="btn btn-danger"  id="cancel">Limpiar</button>
                            </div>
                        </div>
                        <div class="form-group " >
                            <div class="btn btn-group">
                                <div class="alert alert-success hiddenDiv" id="mesajeResult">
                                    <strong id="mesajeResultNeg">Info!</strong> 
                                    <span id="mesajeResultText">This alert box could indicate a neutral informative change or action.</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </body>
</html>

