///*
// * To change this license header, choose License Headers in Project Properties.
// * To change this template file, choose Tools | Templates
// * and open the template in the editor.
// */
//package cr.ac.una.prograiv.agenda.controller;
//
//import java.io.IOException;
//import java.io.PrintWriter;
//import javax.servlet.ServletException;
//import javax.servlet.annotation.WebServlet;
//import javax.servlet.http.HttpServlet;
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;
//
///**
// *
// * @author GeekMQ
// */
//@WebServlet(name = "ComprasServlet", urlPatterns = {"/ComprasServlet"})
//public class ComprasServlet extends HttpServlet {
//
//
//    /**
//     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
//     * methods.
//     *
//     * @param request servlet request
//     * @param response servlet response
//     * @throws ServletException if a servlet-specific error occurs
//     * @throws IOException if an I/O error occurs
//     */
//    protected void processRequest(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
//        response.setContentType("text/html;charset=UTF-8");
//        PrintWriter out = response.getWriter();
//        try {
//            String json = null;
//            Ciudad p = new Ciudad();
//            CiudadesBL pBL = new CiudadesBL();
//            HttpSession session = request.getSession();
//            String accion = request.getParameter("accion");
//
//            System.out.println("accion " + accion);
//            switch (accion) {
//                case "consultarCiudads":
//                    consultaCiudad(pBL, out, json);
//                    break;
//            }
//
//        } catch (NumberFormatException e) {
//            out.print("E~" + e.getMessage());
//        } catch (Exception e) {
//            out.print("E~" + e.getMessage());
//        }
//    }
//
//    private void consultaCiudad(CiudadesBL pBL, PrintWriter out, String json) {
//
//        json = new Gson().toJson(pBL.findAll(Ciudad.class.getName()));
//        System.out.println("llegamos a la consulta de CIUDADES ");
//        out.print(json);
//    }
//
//
//
//    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
//    /**
//     * Handles the HTTP <code>GET</code> method.
//     *
//     * @param request servlet request
//     * @param response servlet response
//     * @throws ServletException if a servlet-specific error occurs
//     * @throws IOException if an I/O error occurs
//     */
//    @Override
//    protected void doGet(HttpServletRequest request, HttpServletResponse response)
//            throws ServletException, IOException {
//        processRequest(request, response);
//    }
//
//    /**
//     * Handles the HTTP <code>POST</code> method.
//     *
//     * @param request servlet request
//     * @param response servlet response
//     * @throws ServletException if a servlet-specific error occurs
//     * @throws IOException if an I/O error occurs
//     */
//    @Override
//    protected void doPost(HttpServletRequest request, HttpServletResponse response)
//            throws ServletException, IOException {
//        processRequest(request, response);
//    }
//
//    /**
//     * Returns a short description of the servlet.
//     *
//     * @return a String containing servlet description
//     */
//    @Override
//    public String getServletInfo() {
//        return "Short description";
//    }// </editor-fold>
//
//}
