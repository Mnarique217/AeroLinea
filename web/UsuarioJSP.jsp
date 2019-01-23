<%-- 
    Document   : Funcionarios
    Created on : 15/05/2017, 10:36:50 PM
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

        <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js"></script>
        <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>

        <script src="js/jquery.simplePagination.js" type="text/javascript"></script>
        <link href="css/simplePagination.css" rel="stylesheet" type="text/css"/>
        <link href="css/datatables.min.css" rel="stylesheet" type="text/css"/>
        <link href="css/css.css" rel="stylesheet" type="text/css"/>
        <script src="js/utils.js" type="text/javascript"></script>
        <script src="js/UsuarioJS.js" type="text/javascript"></script>
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

        <!-- Modal del BootsTrap para confirmar la eliminacion de aviones-->
        <!-- ********************************************************** -->
        <!-- ********************************************************** -->
        <div class="modal fade" id="myModalEliminar" role="dialog">
            <div class="modal-dialog modal-sm">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title" id="myModalTitle">Confirmar eliminación</h4>
                    </div>
                    <div class="modal-body" id="">
                        <p>¿Desea eliminar a este funcionario?</p>
                        <button type="submit" class="btn btn-danger" id="eliminar" onclick="eliminarUsuario($('#myModalEliminar').attr('data-id'))">Eliminar</button>
                        <button type="submit" class="btn btn-primary" onClick ="ocultarModal('myModalEliminar')">Cancelar</button>
                    </div>
                </div>
            </div>
        </div> 


        <div class="modal fade" id="usuarioModal" role="dialog">
            <div class="modal-dialog modal-sm">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title" id="myModalTitle">Registro</h4>
                    </div>
                    <div class="modal-body" id="myModalMessage">
                        <form role="form" onsubmit="return false;" id="formFuncionarios">

                            <div class="form-group" id="groupCedula">
                                <input type="hidden" id="idfun"/>
                                <label for="ced">ID</label>
                                <input type="text" disabled class="form-control" id="ced" placeholder="ID /PASSPORT NUMBER" >
                            </div> 
                            <div class="form-group" id="groupNombreF">
                                <label for="nomfuncionario">Nombre Usuario</label>
                                <input type="text" class="form-control" id="nomfuncionario" placeholder="Nombre de usuario" >
                            </div>
                            <div class="form-group" id="groupcontrasena">
                                <label for="password">Contraseña:</label>
                                <input type="password" class="form-control" id="password" placeholder="Contraseña" >
                            </div>
                            <div class="form-group">
                                <input type="hidden" value="agregarUsuario" id="usuariosAction"/>
                                <button type="submit" class="btn btn-primary" id="enviar">Confirmar</button>
                                <button type="reset" class="btn btn-danger" id="cancel">Cancelar</button>
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

        <div class="container">
            <div class="box">
                <div class="panel">
                    <div class="panel-heading colorRojo"><h3>Administración de usuarios</h3></div>
                    <div class="panel-body">
                        <div class="col-sm-4 margen_fondo7px">
                            <label for="buscador">Filtrar por</label>
                            <div class="btn-group">
                                <select id="funcionariosSelect" class="pull-left"> 
                                    <option value="0">ID</option>
                                    <option value="1">CEDULA</option>
                                    <option value="2">NOMBRE FUNCIONARIO</option>
                                </select>
                            </div>
                            <input type="text" class="form-control" id="buscador2" onkeyup="myfiltro();" placeholder="ejemplo: mshc">
                        </div>
                        <div class="panel-body">
                            <div class='table-responsive '> 
                                <div style="overflow-x:scroll;">
                                    <table class="table table-bordered" id="tablaFuncionarios"></table>
                                </div>
                            </div>
                        </div
                        <div class="panel-footer">Nota: Acciones validas dependeran del rol del usuario</div>
                    </div>
                </div>

                <div>
                    <div class="box">
                        <div class="panel colorRojo">
                            <div class="panel-heading"><h3>Personas</h3></div>
                            <div class="panel-body ">
                                <div class="form-group">  
                                    <div class="btn btn-group">
                                        <label  for="buscadorAviones" >Filtrar</label>
                                        <select id="personasSelect" class="pull-left"> 
                                            <option value="0">CEDULA</option>
                                            <option value="1">NOMBRE</option>
                                        </select><br>
                                    </div>
                                    <div class="btn btn-group">
                                        <input  type="text" class="form-control texMediano" id="buscador" onkeyup="filtradoPersonas();" placeholder="12500">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="panel">
                            <input type="hidden"  id="id-merge"/>
                            <div class='table-responsive '> 
                                <div style="overflow-x:scroll;">
                                    <table class="table table-bordered" id="tablaPersonas"></table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>     
        </div>    
    </body>
</html>
