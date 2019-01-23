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


        <link href="bootstrap/bootstrap.min.css" rel="stylesheet" type="text/css"/>
        <script src="js/jquery.min.js" type="text/javascript"></script>
        <script src="bootstrap/bootstrap.min.js" type="text/javascript"></script>


        <script src="js/jquery.simplePagination.js" type="text/javascript"></script>
        <link href="css/simplePagination.css" rel="stylesheet" type="text/css"/>
        <!-- ********************************************************** -->

        <link href="css/css.css" rel="stylesheet" type="text/css"/>
        <script src="js/utils.js" type="text/javascript"></script>
        <script src="js/TiposAvionJS.js" type="text/javascript"></script>

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
                        <p>¿Seguro que quieres eliminar?</p>
                        <button type="submit" class="btn btn-danger" id="eliminar" onclick="eliminarTipo($('#myModalEliminar').attr('data-id'))">Eliminar</button>
                        <button type="submit" class="btn btn-primary" onClick ="ocultarModal('myModalEliminar')">Cancelar</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- ********************************************************** -->
        <!-- ********************************************************** -->
        <div class="modal fade " id="myModalFormulario" role="dialog">
            <div class="modal-dialog modal-lg">
                <div class="modal-content ">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title" id="myModalTitle">Modal Header</h4>
                    </div>
                    <div class="modal-body colorRojo" id="myModalMessage">
                        <form role="form" onsubmit="return false;" id="groupTipoavion">
                            <div class="col-sm-4">
                                <div class="form-group" id="groupModelo">
                                    <input type="hidden"  id="identi"/>
                                    <label for="modelo">Modelo</label>
                                    <input type="text" class="form-control" id="modelo" placeholder="corto" >
                                </div>  

                                <div class="form-group" id="groupMarca">
                                    <label for="marca">Marca</label>
                                    <input type="text" class="form-control" id="marca" placeholder="Boeing" >
                                </div>
                                <div class="form-group" id="groupAno">
                                    <label for="ano">año</label>
                                    <input type="text" class="form-control" id="ano" placeholder="2015">
                                </div>
                            </div>
                            <div class="col-sm-4">
                                <div class="form-group" id="groupFilas">
                                    <label for="filas">Cantidad Filas</label>
                                    <input type="text" class="form-control" id="filas" placeholder="12">
                                </div>

                                <div class="form-group" id="groupAsientos">
                                    <label for="asientos">Asientos p fila</label>
                                    <input type="text" class="form-control" id="asientos" placeholder="asientos">
                                </div>
                                <div class="form-group" id="groupNpasajeros">
                                    <label for="pasajeros">Cantidad Pasajeros</label>
                                    <input type="text" class="form-control" id="pasajeros" placeholder="32">
                                </div>
                            </div><br>
                            <div class="col-sm-5">
                                <div class="form-group">
                                    <input type="hidden" value="agregarTipoAvion" id="TiposAction"/>
                                    <button type="submit" class="btn btn-primary" id="enviar">Guardar</button>
                                    <button type="reset" class="btn btn-danger" id="cancelar">Cancelar</button>
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="form-group " >
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
        <!-- ********************************************************** -->
        <!-- ********************************************************** -->
        <!-- ********************************************************** -->
        <div class="container">
            <div class="box">
                <div class="panel">
                    <div class="panel-heading colorRojo">Tipos de aviones</div>
                    <div class="panel-body">
                        <div class="container">
                            <b>Agregar/Eliminar</b><br>
                            <div class="btn-group">
                                <input type="text"   class="form-control texMediano" id="buscadorTipos" onkeyup="filtrado();" placeholder="Buscar">
                            </div>
                            <div class="btn-group">
                                <button type="button" class="btn btn-primary "  id="btMostarForm">Agregar</button>
                            </div>
                            <div class="btn-group">
                                <select id="tiposSelect" class="pull-left"> 
                                    <option value="0">MODELO</option>
                                    <option value="1">MARCA</option>
                                    <option value="2">CANT ASIENT</option>
                                    <option value="2">CANT PAS</option>
                                </select>
                            </div>
                        </div>                    
                    </div>
                    <div class="panel-footer"><br>Nota: Acciones validas dependeran del rol del usuario</div>
                </div>
                <div class="panel">
                    <div class="panel-heading colorRojo">Tabla de tipos de avion</div>
                    <div class="panel-body">
                        <div class='table-responsive '> 
                            <div style="overflow-x:scroll;">
                                <table class="table table-bordered" id="tablaTipos"></table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </body>
</html>
</html>
