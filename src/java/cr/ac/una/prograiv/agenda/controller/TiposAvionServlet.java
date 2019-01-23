/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package cr.ac.una.prograiv.agenda.controller;

import com.google.gson.Gson;
import cr.ac.una.prograiv.agenda.bl.TipoAvionBL;

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
 * @author GeekMK
 */
@WebServlet(name = "TiposAvionServlet", urlPatterns = {"/TiposAvionServlet"})
public class TiposAvionServlet extends HttpServlet {

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
            TipoAvion p = new TipoAvion();
            TipoAvionBL pBL = new TipoAvionBL();
            HttpSession session = request.getSession();
            String accion = request.getParameter("accion");

            System.out.println("accion "+accion);
            switch (accion) {
                case "consultarTipos":
                    consultaTipoAvion(pBL, out, json);
                    break;
                case "eliminarTipoAvion":
                    aliminarTipoAvion(p, pBL, out, request);
                    break;
                case "modificarTipoAvion":
                    modificar(p, pBL, out, request);
                    break;
                case "consultarTiposByID":
                    consultar(p, pBL, out, request, json);
                    break;
                case "agregarTipoAvion":
                    agregarTipoAvion(p, pBL, out, request);
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

    private void consultaTipoAvion(TipoAvionBL pBL, PrintWriter out, String json) {
        json = new Gson().toJson(pBL.findAll(TipoAvion.class.getName()));
        out.print(json);
    }

    private void aliminarTipoAvion(TipoAvion p, TipoAvionBL pBL, PrintWriter out, HttpServletRequest request) {
        p.setPkId(Integer.parseInt(request.getParameter("id")));
        pBL.delete(p);
    }

    private void modificar(TipoAvion p, TipoAvionBL pBL, PrintWriter out, HttpServletRequest request) {
        p.setPkId(Integer.parseInt(request.getParameter("id")));
        p.setModelo(request.getParameter("modelo"));
        p.setMarca(request.getParameter("marca"));
        p.setAno(Integer.parseInt(request.getParameter("ano") ));
        p.setCantidadAsientos(Integer.parseInt(request.getParameter("cantidadA")));
        p.setCantidadFilas(Integer.parseInt(request.getParameter("cantidadF")));
        p.setCantidadPasajeros(Integer.parseInt(request.getParameter("cantidadP")));
        pBL.merge(p);
        out.print("C~La persona fue modificada correctamente");
    }

    private void consultar(TipoAvion p, TipoAvionBL pBL, PrintWriter out, HttpServletRequest request, String json) {
        p = pBL.findById(Integer.parseInt(request.getParameter("id")));
        //se pasa la informacion del objeto a formato JSON
        json = new Gson().toJson(p);
        out.print(json);
    }

    private void agregarTipoAvion(TipoAvion p, TipoAvionBL pBL, PrintWriter out, HttpServletRequest request) {

        p.setModelo(request.getParameter("modelo"));
        p.setMarca(request.getParameter("marca"));
        p.setAno(Integer.parseInt(request.getParameter("ano") ));
        p.setCantidadAsientos(Integer.parseInt(request.getParameter("cantidadA")));
        p.setCantidadFilas(Integer.parseInt(request.getParameter("cantidadF")));
        p.setCantidadPasajeros(Integer.parseInt(request.getParameter("cantidadP")));
        pBL.save(p);
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
