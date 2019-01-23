/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package cr.ac.una.prograiv.agenda.controller;

import cr.ac.una.prograiv.agenda.bl.ViajeBL;
import cr.ac.una.prograiv.agenda.domain.Viaje;
import cr.ac.una.prograiv.agenda.domain.Vuelo;
import com.google.gson.Gson;
import java.io.IOException;
import java.io.PrintWriter;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.LinkedHashMap;
import java.util.Locale;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 *
 * @author Mario
 */
@WebServlet(name = "ViajesServlet", urlPatterns = {"/ViajesServlet"})
public class ViajesServlet extends HttpServlet {

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
            String json = null;
            Viaje p = new Viaje();
            ViajeBL pBL = new ViajeBL();
            HttpSession session = request.getSession();
            String accion = request.getParameter("accion");

            switch (accion) {
                case "consultarViajes":
                    consultarViajes(pBL, out, json);
                    break;
                case "eliminarViaje":
                    eliminarViaje(p, pBL, out, request);
                    break;
                case "consultarViajesById":
                    consultarViajeByIDV(p, pBL, out, request, json);
                    break;
                case "agregarViaje":
                    agregarViaje(p, pBL, out, request);
                    break;

                case "modificarViaje":
                    modificarViaje(p, pBL, out, request);
                    break;

                case "consultanueva":

                    String origen=request.getParameter("origen");
                    String destino=request.getParameter("destino");
                    System.out.println("el origen es "+origen);
                    System.out.println("el destino es "+destino);
                    
                    LinkedHashMap<String, Object> parametros = new LinkedHashMap<>();
                    parametros.put("origen",origen);
                    parametros.put("destino",destino);
                    
                    json = new Gson().toJson(pBL.createQueryHQL(Viaje.class.getName(), parametros));
                    out.print(json);
                    break;
                default:
                    out.print("E~No se indico la accion que desea realizar");
            }

        } catch (NumberFormatException e) {
            out.print("E~" + e.getMessage());
        } catch (Exception e) {
            out.print("E~" + e.getMessage());
        }
    }

    private void consultarViajes(ViajeBL pBL, PrintWriter out, String json) {
        json = new Gson().toJson(pBL.findAll(Viaje.class.getName()));
        out.print(json);
    }

    private void eliminarViaje(Viaje p, ViajeBL pBL, PrintWriter out, HttpServletRequest request) {
        p.setPkId(Integer.parseInt(request.getParameter("id")));
        pBL.delete(p);
        out.print("El viaje fue eliminado correctamente");
    }

    private void consultarViajeByIDV(Viaje p, ViajeBL pBL, PrintWriter out, HttpServletRequest request, String json) {
        p = pBL.findById(Integer.parseInt(request.getParameter("idViaje")));
        json = new Gson().toJson(p);
        out.print(json);
    }

    private void agregarViaje(Viaje p, ViajeBL pBL, PrintWriter out, HttpServletRequest request) throws ParseException {
        Vuelo v = new Vuelo();
        v.setPkId(Integer.parseInt(request.getParameter("vuelo")));

        p.setVuelo(v);
        String salidatxt = request.getParameter("salida");
        DateFormat format = new SimpleDateFormat("dd/MM/yyyy", Locale.ENGLISH);
        Date date = format.parse(salidatxt);
        p.setFechaSalida(date);
        p.setCantidadAsientosDisponibles(Integer.parseInt(request.getParameter("asientos")));
        p.setPrecio(Double.parseDouble(request.getParameter("precio")));
        p.setDescuento(Double.parseDouble(request.getParameter("rebaja")));
        p.setUltModificacion(new Date());
        p.setUltUsuario("root");
        pBL.save(p);
        out.print("C~El viaje fue agregado correctamente");

    }

    private void modificarViaje(Viaje p, ViajeBL pBL, PrintWriter out, HttpServletRequest request) throws ParseException {
        System.out.println("Entrando a modificar el viaje");
        Vuelo v = new Vuelo();
        p.setVuelo(v);
        p.setPkId(Integer.parseInt(request.getParameter("idViaje")));
        v.setPkId(Integer.parseInt(request.getParameter("vuelo")));

        String salidatxt = request.getParameter("salida");
        DateFormat format = new SimpleDateFormat("dd/MM/yyyy", Locale.ENGLISH);
        Date date = format.parse(salidatxt);
        p.setFechaSalida(date);

        p.setCantidadAsientosDisponibles(Integer.parseInt(request.getParameter("asientos")));
        p.setPrecio(Double.parseDouble(request.getParameter("precio")));
        p.setDescuento(Double.parseDouble(request.getParameter("rebaja")));
        p.setUltModificacion(new Date());
        p.setUltUsuario("root");
        pBL.merge(p);
        out.print("C~El viaje fue modificado correctamente");
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
