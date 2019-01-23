/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package cr.ac.una.prograiv.agenda.controller;

import cr.ac.una.prograiv.agenda.bl.FuncionarioBL;
import cr.ac.una.prograiv.agenda.bl.UsuariosBL;
import cr.ac.una.prograiv.agenda.domain.Funcionario;
import cr.ac.una.prograiv.agenda.domain.Usuario;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 *
 * @author GeekMQ
 */
@WebServlet(name = "LoguinServlet", urlPatterns = {"/LoguinServlet"})
public class LoguinServlet extends HttpServlet {

    public static boolean FLAG=true;
    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        PrintWriter out = response.getWriter();
        try {

            UsuariosBL usBL = new UsuariosBL();
            FuncionarioBL fuBL = new FuncionarioBL();

            FLAG=true;
            //**********************************************************************
            //se consulta cual accion se desea realizar
            //**********************************************************************
            String accion = request.getParameter("accion");

            String usuario, password;
            switch (accion) {
                case "validarUsuario":
                   
                    usuario = request.getParameter("usuario");
                    password = request.getParameter("password");

                    List usuarios = usBL.findAll(Usuario.class.getName());
                    usuarios.forEach((user) -> {
                        Usuario u = (Usuario) user;
                        if (u.getNombreUsuario().equals(usuario)) {
                            if (u.getContrasena().equals(password)) {
                                
                                HttpSession session = request.getSession(true);
                                session.setAttribute("usuario", usuario);
                                session.setAttribute("PACHOVILLA",password);
                                session.setAttribute("loginStatus", "login");
                                session.setAttribute("loginStatus", "login");

                                FLAG=false;
                                out.print("C~Public.....");
                               
                            } else {
                                throw new IllegalArgumentException("Usuario o contraceña incorrectos");
                            }
                        }
                    });

                    List funcionarios = fuBL.findAll(Funcionario.class.getName());
                    funcionarios.forEach((fun) -> {
                        Funcionario u = (Funcionario) fun;
                        if (u.getNombreUsuario().equals(usuario)) {
                            if (u.getContrasena().equals(password)) {
                                HttpSession session = request.getSession(true);
                                session.setAttribute("usuario", usuario);
                                session.setAttribute("loginStatus", "login");
                                session.setAttribute("PACHOVILLA", "HOOLAMARIO");
                                session.setAttribute("tipo", "Admin");
                                FLAG=false;
                                out.print("C~Admin mode....... up");
                                
                            } else {
                                throw new IllegalArgumentException("Usuario o contraceña incorrectos");
                            }
                        }
                    });
                    if(FLAG){
                    out.print("E~Usuario o contraseña invalidos");
                    }
                    break;

                default:
                    out.print("E~No se indico la acción que se desea realizare");
                    break;
            }

        } catch (NumberFormatException e) {
            out.print("E~" + e.getMessage());
        } catch (Exception e) {
            out.print("E~" + e.getMessage());
        }
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
