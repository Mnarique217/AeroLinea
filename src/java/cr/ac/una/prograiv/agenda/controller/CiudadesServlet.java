/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package cr.ac.una.prograiv.agenda.controller;

import com.google.gson.Gson;
import cr.ac.una.prograiv.agenda.bl.CiudadesBL;
import cr.ac.una.prograiv.agenda.domain.Ciudad;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Date;

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
@WebServlet(name = "CiudadesServlet", urlPatterns = {"/CiudadesServlet"})
public class CiudadesServlet extends HttpServlet {

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
            Ciudad p = new Ciudad();
            CiudadesBL pBL = new CiudadesBL();
            HttpSession session = request.getSession();
            String accion = request.getParameter("accion");

            System.out.println("accion " + accion);
            switch (accion) {
                case "consultarCiudads":
                    consultaCiudad(pBL, out, json);
                    break;
                case "eliminarCiudad":
                    aliminarCiudad(p, pBL, out, request);
                    break;
                case "modificarCiudad":
                    modificar(p, pBL, out, request);
                    break;
                case "consultarCiudadByID":
                    consultar(p, pBL, out, request, json);
                    break;
                case "agregarCiudad":
                    agregarCiudad(p, pBL, out, request);
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

    private void consultaCiudad(CiudadesBL pBL, PrintWriter out, String json) {

        json = new Gson().toJson(pBL.findAll(Ciudad.class.getName()));
        System.out.println("llegamos a la consulta de CIUDADES ");
        out.print(json);
    }

    private void aliminarCiudad(Ciudad p, CiudadesBL pBL, PrintWriter out, HttpServletRequest request) {
        p.setPkId(Integer.parseInt(request.getParameter("id")));
        pBL.delete(p);
        out.print("La Ciudad fue eliminada correctamente");
    }

    private void modificar(Ciudad p, CiudadesBL pBL, PrintWriter out, HttpServletRequest request) {
        p.setPkId(Integer.parseInt(request.getParameter("idCiudad")));
        p.setNombre(request.getParameter("nombre"));
        p.setUltModificacion(new Date());
        p.setUltUsuario("root");
        pBL.merge(p);
        out.print("C~La persona fue modificada correctamente");
    }

    private void consultar(Ciudad p, CiudadesBL pBL, PrintWriter out, HttpServletRequest request, String json) {
        p = pBL.findById(Integer.parseInt(request.getParameter("id")));
        //se pasa la informacion del objeto a formato JSON
        json = new Gson().toJson(p);
        out.print(json);
    }

    private void agregarCiudad(Ciudad p, CiudadesBL pBL, PrintWriter out, HttpServletRequest request) {
        p.setNombre(request.getParameter("nombre"));
        pBL.save(p);
        p.setUltModificacion(new Date());
        p.setUltUsuario("root");
        out.print("C~La persona fue modificada correctamente");
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
