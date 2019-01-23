<%-- 
    Document   : ViajesJSP
    Created on : 23/05/2017, 12:58:41 AM
    Author     : Mario
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
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>JSP Page</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js"></script>
        <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>

        <!-- ********************************************************** -->
        <!-- Includes para el datapicker -->
        <!-- ********************************************************** -->
        <link href="css/datetimepicker.min.css" rel="stylesheet" type="text/css"/>
        <script src="js/datetimepicker.js" type="text/javascript"></script>
        <!-- ********************************************************** -->
        <!-- Estilos de la página -->
        <!-- ********************************************************** -->
        <link href="css/css.css" rel="stylesheet" type="text/css"/>
        <!-- ********************************************************** -->
        <!-- Script's de UTILERIAS -->
        <!-- ********************************************************** -->
        <script src="js/utils.js" type="text/javascript"></script>

        <script src="js/ViajesJS.js" type="text/javascript"></script>
        <script src="js/jquery.simplePagination.js" type="text/javascript"></script>
        <link href="css/simplePagination.css" rel="stylesheet" type="text/css"/>


    </head>




    <body class="admin">
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

        <!-- Modal del BootsTrap para eliminacion                 -->
        <!-- ********************************************************** -->
        <!-- ********************************************************** -->

        <div class="modal fade" id="myModalEliminar" role="dialog">
            <div class="modal-dialog modal-sm">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title" id="myModalTitle">Confirmar eliminación</h4>
                    </div>
                    <div class="modal-body" id="">
                        <p>¿Desea eliminar este viaje?</p>
                        <button type="submit" class="btn btn-danger" id="eliminar" onclick="eliminarViaje($('#myModalEliminar').attr('data-id'))">Eliminar</button>
                        <button type="submit" class="btn btn-primary" onClick ="ocultarModal('myModalEliminar')">Cancelar</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade" id="modalViaje" role="dialog">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title" id="myModalTitle">Insertar / Modificar Viajes
                    </div>
                    <div class="modal-body colorRojo" id="myModalMessage">

                        <form role="form" onsubmit="return false;" id="formViajes">
                            <div class="col-sm-6">
                                <div class="form-group" id="groupVuelo">
                                    <input type="hidden" id="idviaje"/>
                                    <label for="vuelo">ID del vuelo</label>
                                    <input type="number" class="form-control" id="vuelo" placeholder="Vuelo">

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

                                <div class="form-group" id="groupDisponibles">
                                    <label for="asientos">Asientos Disponibles</label>
                                    <input type="number" class="form-control" id="asientos" placeholder="asientos disponibles" >
                                </div>
                            </div>

                            <div class="col-sm-6">
                                <div class="form-group" id="groupPrecio">
                                    <label for="precio">Costo($)</label>
                                    <input type="number" class="form-control" id="precio" placeholder="precio" >
                                </div>

                                <div class="form-group" id="groupDescuento">
                                    <label for="rebaja">Descuento($)</label>
                                    <input type="number" class="form-control" id="rebaja" placeholder="rebaja" >
                                </div>

                                <div class="form-group">
                                    <input type="hidden" value="agregarViaje" id="viajesAction"/>
                                    <button type="submit" class="btn btn-primary" id="enviar">Guardar</button>
                                    <button type="reset" class="btn btn-danger" id="cancelar">Cancelar</button>
                                </div>

                                <div class="form-group height25" >
                                    <div class="alert alert-success hiddenDiv" id="mesajeResult">
                                        <strong id="mesajeResultNeg">Info!</strong> 
                                        <span id="mesajeResultText">This alert box could indicate a neutral informative change or action.</span>
                                    </div>
                                </div>
                            </div>             
                        </form>   
                    </div>
                </div>                      
            </div>                       
        </div>


        <div class="container panel-body">
            <div class="box">
                <div class="panel">
                    <div class="panel-heading colorRojo"><h3>Administración de viajes</h3></div>
                    <div class="panel-body">
                        <div class="form-group">
                            <div class="btn-group">
                                <label for="buscador" class="margen_iz">Filtrar por </label>   
                            </div>
                            <div class="btn-group">
                                <select id="viajesSelect" class="pull-left"> 
                                    <option value="0">VUELO</option>
                                    <option value="1">SALIDA</option>
                                    <option value="2">DISPONIBLES</option>
                                    <option value="3">PRECIO</option>
                                    <option value="4">DESCUENTO</option>
                                </select>
                            </div>
                            <div class="btn-group">
                                <input type="text" class="form-control texMediano" id="buscador" onkeyup="myfiltro();" placeholder="may 8, ">
                            </div>
                        </div>
                    </div>
                    <div class="panel">
                        <div class="panel-heading colorRojo"><h3>Tabla de viajes</h3></div>
                        <div class='table-responsive '> 
                            <div style="overflow-x:scroll;">
                                <table class="table table-bordered" id="tablaViajes"></table>
                            </div>
                        </div>
                        <div class="panel-footer"></div>
                    </div>
                </div>
            </div>
            <div class=" box marginTop">
                <div class ="panel-heading colorRojo"><h3>Vuelos </h3></div>
                <div class="panel-body">
                    <div class="form-group margen_fondo7px">
                        <label for="buscador2">Filtrar por </label>
                        <div class="btn-group">
                            <select id="vuelosSelect" class="pull-left"> 
                                <option value="0">ID</option>
                                <option value="1">AVION</option>
                                <option value="2">ORIGEN</option>
                                <option value="3">DESTINO</option>
                            </select>
                        </div>
                        <input type="text" class="form-control texMediano" id="buscador2" onkeyup="filtrado();" placeholder="por ejemplo: Mario">
                    </div>
                    <div class="panel">
                        <div class="panel-heading colorRojo"><h3>Tabla de Vuelos</h3></div>
                        <div class='table-responsive '> 
                            <div style="overflow-x:scroll;">
                                <table class="table table-bordered" id="tablaVuelos"></table>
                            </div>
                        </div>
                        <div class="panel-footer"></div>
                    </div>
                </div>         
            </div>
        </div>         
    </body>
</html>
