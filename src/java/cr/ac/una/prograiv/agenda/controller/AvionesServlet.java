/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package cr.ac.una.prograiv.agenda.controller;

import com.google.gson.Gson;
import cr.ac.una.prograiv.agenda.bl.AvionesBL;
import cr.ac.una.prograiv.agenda.domain.Avion;
import cr.ac.una.prograiv.agenda.domain.TipoAvion;
import java.io.IOException;
import java.io.PrintWriter;
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
@WebServlet(name = "AvionesServlet", urlPatterns = {"/AvionesServlet"})
public class AvionesServlet extends HttpServlet {

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
            Avion p = new Avion();
            AvionesBL pBL = new AvionesBL();
            HttpSession session = request.getSession();
            String accion = request.getParameter("accion");

            System.out.println("accion " + accion);
            switch (accion) {
                case "consultarAviones":
                    consultaAvion(pBL, out, json);
                    break;
                case "eliminarAvion":
                    aliminarAvion(p, pBL, out, request);
                    break;
                case "modificarAvion":
                    modificar(p, pBL, out, request);
                    break;
                case "consultarAvionByID":
                    consultar(p, pBL, out, request, json);
                    break;
                case "agregarAvion":
                    agregarAvion(p, pBL, out, request);
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

    private void consultaAvion(AvionesBL pBL, PrintWriter out, String json) {
        json = new Gson().toJson(pBL.findAll(Avion.class.getName()));
        out.print(json);
    }

    private void aliminarAvion(Avion p, AvionesBL pBL, PrintWriter out, HttpServletRequest request) {
        p.setPkId(Integer.parseInt(request.getParameter("idAvion")));
        pBL.delete(p);
        out.print("C~el avion se elimino correctamente");
    }

    private void modificar(Avion p, AvionesBL pBL, PrintWriter out, HttpServletRequest request) {
        TipoAvion tp = new TipoAvion();
        tp.setPkId(Integer.parseInt(request.getParameter("idTipo")) );
        p.setPkId(Integer.parseInt(request.getParameter("idMerge")));
        p.setTipoAvion(tp);
        p.setUltUsuario("root");
        pBL.merge(p);
        out.print("C~Avion actualizado..");
    }

    private void consultar(Avion p, AvionesBL pBL, PrintWriter out, HttpServletRequest request, String json) {
        p = pBL.findById(Integer.parseInt(request.getParameter("id")));
        //se pasa la informacion del objeto a formato JSON
        json = new Gson().toJson(p);
        out.print(json);
    }

    private void agregarAvion(Avion p, AvionesBL pBL, PrintWriter out, HttpServletRequest request) {
        TipoAvion t = new TipoAvion();
        t.setPkId(Integer.parseInt(request.getParameter("idTipo")));
        p.setTipoAvion(t);
        pBL.save(p);
        out.print("C~Agregado exitoso");
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
