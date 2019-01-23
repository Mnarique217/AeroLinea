/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package cr.ac.una.prograiv.agenda.controller;

import com.google.gson.Gson;
import cr.ac.una.prograiv.agenda.bl.ReservacionBL;
import cr.ac.una.prograiv.agenda.domain.Reservacion;
import cr.ac.una.prograiv.agenda.domain.Usuario;
import cr.ac.una.prograiv.agenda.domain.Viaje;
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
 * @author Mario
 */
@WebServlet(name = "ReservacionServlet", urlPatterns = {"/ReservacionServlet"})
public class ReservacionServlet extends HttpServlet {

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
        try{
            String json = null;
            Reservacion p = new Reservacion();
            ReservacionBL pBL = new ReservacionBL();
            HttpSession session = request.getSession();
            String accion = request.getParameter("accion");
            
           System.out.println("accion " + accion);
          switch(accion){
          //completar
              case "consultarReservas":
              consultarReservas(pBL, out, json);
              break;
              case "eliminarReserva":
              eliminarReserva(p, pBL, out, request);
              break;
              case "modificarReserva":
              modificar(p, pBL, out, request);
              break;
              case "consultarReservaByID":
              consultaReservas(p, pBL, out, request, json);
              break;
              case "agregarReservacion":
              agregarReserva(p, pBL, out, request);
              break;
              default:
              out.print("E~No se indico la accion que se desea realizar");
              break;
          } 
            
        }catch (NumberFormatException e) {
            out.print("E~" + e.getMessage());
        } catch (Exception e) {
            out.print("E~" + e.getMessage());
        }
    }

    private void consultarReservas(ReservacionBL pBL, PrintWriter out, String json) {

        json = new Gson().toJson(pBL.findAll(Reservacion.class.getName()));
        System.out.println("llegamos a la consulta de Reservaciones ");
        out.print(json);
    }
    
    private void eliminarReserva(Reservacion p, ReservacionBL pBL, PrintWriter out, HttpServletRequest request) {

        p.setPkId(Integer.parseInt(request.getParameter("id")));
        System.out.println("el id a borrar es  " + p.getPkId());
        pBL.delete(p);
        out.print("La Reservacin fue eliminada correctamente");
    }
    
    private void modificar(Reservacion p, ReservacionBL pBL, PrintWriter out, HttpServletRequest request) {
        
        p.setPkId(Integer.parseInt(request.getParameter("idMerge")));
        Viaje v = new Viaje();
        Usuario u = new Usuario();
        v.setPkId(Integer.parseInt(request.getParameter("viaje")));
        u.setPkId(Integer.parseInt(request.getParameter("usuario")));
        p.setUsuario(u);
        p.setViaje(v);
        p.setCantidadAsientos(Integer.parseInt(request.getParameter("cantidad")));
        pBL.merge(p);
        out.print("C~La reservacion fue modificada correctamente");
    }
    
    private void consultaReservas(Reservacion p, ReservacionBL pBL, PrintWriter out, HttpServletRequest request, String json) {
        p = pBL.findById(Integer.parseInt(request.getParameter("id")));
        json = new Gson().toJson(p);
        out.print(json);
    }
    
    private void agregarReserva(Reservacion p, ReservacionBL pBL, PrintWriter out, HttpServletRequest request) {
       
        Viaje v = new Viaje();
        Usuario u = new Usuario();
        v.setPkId(Integer.parseInt(request.getParameter("viaje")));
        u.setPkId(Integer.parseInt(request.getParameter("usuario")));
        p.setUsuario(u);
        p.setViaje(v);
        p.setCantidadAsientos(Integer.parseInt(request.getParameter("cantidad")));
        pBL.save(p);
        out.print("C~Agregada correctamente");
        
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
