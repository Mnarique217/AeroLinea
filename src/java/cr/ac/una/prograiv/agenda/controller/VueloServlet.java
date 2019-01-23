/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package cr.ac.una.prograiv.agenda.controller;

import com.google.gson.Gson;
import cr.ac.una.prograiv.agenda.bl.VueloBL;
import cr.ac.una.prograiv.agenda.domain.Avion;
import cr.ac.una.prograiv.agenda.domain.Ciudad;
import cr.ac.una.prograiv.agenda.domain.Vuelo;
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
 * @author GeekMQ
 */
@WebServlet(name = "VueloServlet", urlPatterns = {"/VueloServlet"})
public class VueloServlet extends HttpServlet {

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
            Vuelo p = new Vuelo();
            VueloBL pBL = new VueloBL();
            HttpSession session = request.getSession();
            String accion = request.getParameter("accion");

            System.out.println("accion " + accion);
            switch (accion) {
                case "consultarVuelos":
                    consultaVuelo(pBL, out, json);
                    break;
                case "eliminarVuelo":
                    aliminarVuelo(p, pBL, out, request);
                    break;
                case "modificarVuelo":
                    modificar(p, pBL, out, request);
                    break;
                case "consultarVueloByID":
                    consultar(p, pBL, out, request, json);
                    break;
                case "agregarVuelo":
                    agregarVuelo(p, pBL, out, request);
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

    private void consultaVuelo(VueloBL pBL, PrintWriter out, String json) {

        json = new Gson().toJson(pBL.findAll(Vuelo.class.getName()));
        out.print(json);
    }

    private void aliminarVuelo(Vuelo p, VueloBL pBL, PrintWriter out, HttpServletRequest request) {

        p.setPkId(Integer.parseInt(request.getParameter("id")));
        System.out.println("el id a borrar es  " + p.getPkId());
        pBL.delete(p);
        out.print("La Vuelo fue eliminada correctamente");
    }

    private void modificar(Vuelo p, VueloBL pBL, PrintWriter out, HttpServletRequest request) {
        p.setPkId(Integer.parseInt(request.getParameter("idMerge")));
        Ciudad c = new Ciudad();
        Ciudad c2 = new Ciudad();
        Avion av = new Avion();
        c.setPkId(Integer.parseInt(request.getParameter("origen")));
        c2.setPkId(Integer.parseInt(request.getParameter("destino")));
        av.setPkId(Integer.parseInt(request.getParameter("avion")));
        p.setAvion(av);
        p.setCiudadByFkDestino(c2);
        p.setCiudadByFkOrigen(c);
        p.setUltModificacion(new Date());
        p.setUltUsuario("root");
        pBL.merge(p);
        out.print("C~La persona fue modificada correctamente");
    }

    private void consultar(Vuelo p, VueloBL pBL, PrintWriter out, HttpServletRequest request, String json) {
        p = pBL.findById(Integer.parseInt(request.getParameter("id")));
        json = new Gson().toJson(p);
        out.print(json);
    }

    private void agregarVuelo(Vuelo p, VueloBL pBL, PrintWriter out, HttpServletRequest request) {
        Ciudad c = new Ciudad();
        Ciudad c2 = new Ciudad();
        Avion av = new Avion();
        c.setPkId(Integer.parseInt(request.getParameter("origen")));
        c2.setPkId(Integer.parseInt(request.getParameter("destino")));
        av.setPkId(Integer.parseInt(request.getParameter("avion")));
        p.setAvion(av);
        p.setCiudadByFkDestino(c2);
        p.setCiudadByFkOrigen(c);
        p.setUltModificacion(new Date());
        p.setUltUsuario("root");

        System.out.println("se va guardad un vuelo");
        pBL.save(p);
        out.print("C~Agregado correctamente ");
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
