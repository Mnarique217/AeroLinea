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
        <title>ADmin mode</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <link href="bootstrap/bootstrap.min.css" rel="stylesheet" type="text/css"/>
        <script src="js/jquery.min.js" type="text/javascript"></script>
        <script src="bootstrap/bootstrap.min.js" type="text/javascript"></script>
        <!-- ********************************************************** -->
        <!-- Script's de UTILERIAS -->
        <!-- ********************************************************** -->
        <script src="js/jquery.simplePagination.js" type="text/javascript"></script>
        <link href="css/simplePagination.css" rel="stylesheet" type="text/css"/>
        <!-- ********************************************************** -->
        <!-- Script's de CIUDADES -->
        <!-- ********************************************************** -->
        <script src="js/MapsJS.js" type="text/javascript"></script>
        <script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBxwZi0Uls1PPsL4I70Zj-oDMo5epEr3sM&callback=initMap"></script>

        <script src="js/utils.js" type="text/javascript"></script>
        <link href="css/css.css" rel="stylesheet" type="text/css"/>
        <script src="js/CiudadesJS.js" type="text/javascript"></script>

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
        <div class="modal fade" id="myModalEliminar" role="dialog">
            <div class="modal-dialog modal-sm">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title" id="myModalTitle">Confirmar eliminación</h4>
                    </div>
                    <div class="modal-body" id="">
                        <p>¿Desea eliminar esta persona?</p>
                        <button type="submit" class="btn btn-danger" id="eliminar" onclick="eliminarPersona($('#myModalEliminar').attr('data-id'))">Eliminar</button>
                        <button type="submit" class="btn btn-primary" onClick ="ocultarModal('myModalEliminar')">Cancelar</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- ********************************************************** -->
        <!-- ********************************************************** -->
        <!-- Modal del BootsTrap para mostrar el formulario de insertar -->
        <!-- o modificar
        <!-- ********************************************************** -->
        <!-- ********************************************************** -->
        <div class="modal fade" id="myModalFormulario" role="dialog">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title" id="myModalTitle">Agregar una nueva ciudad
                    </div>
                    <div class="modal-body colorRojo" id="myModalMessage">
                        <form role="form" onsubmit="return false;" id="formCiudades">
                            <div class="form-group" id="groupNombre">
                                <input type="hidden"  id="idCiudad"/>
                                <label for="nombre">Nombre:</label>
                                <input type="text" class="form-control texLarge" onkeyup="longitud();" id="direccion" placeholder="escribe o toma la ciudad del mapa!!" >
                            </div>
                            <div id="map" class="map"></div>
                            <div class="form-group">
                                <input type="hidden" value="agregarCiudad" id="CiudadAction"/>
                                <button type="submit" class="btn btn-primary" id="enviar">Guardar</button>
                                <button type="reset" class="btn btn-danger" id="cancelar">Cancelar</button>
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
        </div>
        <!-- ********************************************************** -->
        <!-- ********************************************************** -->
        <!-- ********************************************************** -->

        <div class="container">     
            <div class="box">
                <div class="panel">
                    <div class="panel-heading colorRojo"><h3>Mnatenimiento de ciudades</h3></div>
                    <div class="panel-body">
                        <div class="container">
                            <b>Agregar/Eliminar</b><br>
                            <div class="btn-group">
                                <input  type="text" class="form-control texMediano" id="buscadorCiudades" onkeyup="filtroCiudad();" placeholder="12500">
                            </div>
                            <div class="btn-group">
                                <button type="button" class="btn btn-info"  id="btMostarForm">Agregar</button>
                            </div>
                            <div class="btn-group">
                                <label  for="buscadorAviones" >Filtrar</label>
                                <select id="ciudadesSelect"> 
                                    <option value="1">NOMBRE</option>
                                    <option value="0">ID</option>
                                </select><br>
                            </div>
                        </div>  
                    </div>
                </div>
                <div class="panel">
                    <div class="panel-heading colorRojo">Tabla de ciudades</div>
                    <input type="hidden"  id="id-merge"/>
                    <div class='table-responsive '> 
                        <div style="overflow-x:scroll;">
                            <table class="table table-hover table-bordered" id="tablaCiudades"></table>
                        </div>
                    </div>
                    <div class="panel-footer">Nota: Acciones validas dependeran del rol del usuario</div>
                </div>
            </div>
        </div>
    </body>
</html>
