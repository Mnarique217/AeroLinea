/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package cr.ac.una.prograiv.agenda.controller;

import com.google.gson.Gson;
import cr.ac.una.prograiv.agenda.bl.FuncionarioBL;
import cr.ac.una.prograiv.agenda.bl.PersonasBL;
import cr.ac.una.prograiv.agenda.bl.UsuariosBL;
import static cr.ac.una.prograiv.agenda.controller.LoguinServlet.FLAG;
import cr.ac.una.prograiv.agenda.domain.Funcionario;
import cr.ac.una.prograiv.agenda.domain.Persona;
import cr.ac.una.prograiv.agenda.domain.Usuario;
import java.io.IOException;
import java.io.PrintWriter;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Locale;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 *
 * @author GeekMK
 */
@WebServlet(name = "PersonaServlet", urlPatterns = {"/PersonaServlet"})
public class PersonaServlet extends HttpServlet {

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        PrintWriter out = response.getWriter();
        try {
            String json = null;
            Persona p = new Persona();
            PersonasBL pBL = new PersonasBL();
            HttpSession session = request.getSession();
            String accion = request.getParameter("accion");

            System.out.println("Accion detectada " + accion);
            switch (accion) {
                case "consultarPersonas":
                    consultaPersona(pBL, out, json);
                    break;
                case "eliminarPersonas":
                    aliminarPersona(p, pBL, out, request);
                    break;

                case "consultarPersonasByID":
                    //se consulta la persona por ID
                    p = pBL.findById(Integer.parseInt(request.getParameter("idPersona")));

                    //se pasa la informacion del objeto a formato JSON
                    json = new Gson().toJson(p);
                    out.print(json);
                    break;

                case "agregarPersona":
                case "modificarPersona":
                    System.out.println("Accion detectada " + accion);
                    //Se llena el objeto con los datos enviados por AJAX por el metodo post
                    p.setPkId(Integer.parseInt(request.getParameter("cedula")));
                    p.setNombre(request.getParameter("nombre"));
                    p.setApellidos(request.getParameter("apellidos"));
                    p.setCorreoElectronico(request.getParameter("correo"));
                    p.setDireccion(request.getParameter("direccion"));
                    p.setTelefono(request.getParameter("telefono"));
                    p.setCelular(request.getParameter("celular"));
                    //Guardar Correctamente en la base de datos
                    String fechatxt = request.getParameter("fechaNacimiento");
                    DateFormat format = new SimpleDateFormat("dd/MM/yyyy", Locale.ENGLISH);
                    Date date = format.parse(fechatxt);
                    p.setFechaNacimiento(date);

                    System.out.println("Accion detectada " + accion);
                    if (accion.equals("agregarPersona")) { //es insertar personas
                        //Se guarda el objeto
                        System.out.println(p.toString());
                        pBL.save(p);
                        out.print("C~La persona fue ingresada correctamente");

                    } else {//es modificar persona

                        pBL.merge(p);

                        //Se imprime la respuesta con el response
                        out.print("C~La persona fue modificada correctamente");
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

    private void consultaPersona(PersonasBL pBL, PrintWriter out, String json) {

        json = new Gson().toJson(pBL.findAll(Persona.class.getName()));

        out.print(json);
    }

    private void aliminarPersona(Persona p, PersonasBL pBL, PrintWriter out, HttpServletRequest request) {
        p.setPkId(Integer.parseInt(request.getParameter("idPersona")));

        UsuariosBL usBL = new UsuariosBL();
        FuncionarioBL fuBL = new FuncionarioBL();
        List usuarios = usBL.findAll(Usuario.class.getName());
        usuarios.forEach((user) -> {
            Usuario u = (Usuario) user;
            if (p.getPkId() == u.getPersona().getPkId()) {
                throw new IllegalArgumentException("Registra Usuarios!!..imposible");
            }
        });

        List funci = usBL.findAll(Funcionario.class.getName());
        funci.forEach((user) -> {
            Funcionario f = (Funcionario) user;
            if (p.getPkId() == f.getPersona().getPkId()) {
                throw new IllegalArgumentException("Registra Funcionario..imposible");
            }
        });

        pBL.delete(p);

        out.print("La persona fue eliminada correctamente");
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
