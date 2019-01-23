/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package cr.ac.una.prograiv.agenda.controller;

import com.google.gson.Gson;
import cr.ac.una.prograiv.agenda.bl.FuncionarioBL;
import cr.ac.una.prograiv.agenda.domain.Funcionario;
import cr.ac.una.prograiv.agenda.domain.Persona;
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 *
 * @author GeekMQ
 */
public class FuncionarioServlet extends HttpServlet {

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
            Funcionario p = new Funcionario();
            FuncionarioBL pBL = new FuncionarioBL();
            HttpSession session = request.getSession();
            String accion = request.getParameter("accion");

            System.out.println("accion detectada " + accion);

            switch (accion) {
                case "consultarFuncionarios":
                    consultarFuncionarios(pBL, out, json);
                    break;
                case "eliminarFuncionarios":
                    eliminarFuncionario(p, pBL, out, request);
                    break;
                case "consultarFuncionariosByID":
                    consultarFuncionarioByIDF(p, pBL, out, request, json);
                    break;
                case "agregarFuncionario":
                    agregarFuncionario(p, pBL, out, request);
                    break;
                case "modificarFuncionario":
                    modificarFuncionario(p, pBL, out, request);
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

    private void consultarFuncionarios(FuncionarioBL pBL, PrintWriter out, String json) {
        json = new Gson().toJson(pBL.findAll(Funcionario.class.getName()));
        out.print(json);
    }

    private void eliminarFuncionario(Funcionario p, FuncionarioBL pBL, PrintWriter out, HttpServletRequest request) {
        p.setPkId(Integer.parseInt(request.getParameter("id")));
        pBL.delete(p);
        out.print("El funcionario fue eliminado correctamente");
    }

    private void consultarFuncionarioByIDF(Funcionario p, FuncionarioBL pBL, PrintWriter out, HttpServletRequest request, String json) {
        p = pBL.findById(Integer.parseInt(request.getParameter("idFuncionario")));
        json = new Gson().toJson(p);
        out.print(json);
    }

    private void agregarFuncionario(Funcionario p, FuncionarioBL pBL, PrintWriter out, HttpServletRequest request) {
        Persona per = new Persona();
        per.setPkId(Integer.parseInt(request.getParameter("cedula")));
        if (pBL.existe(per)) {
            out.print("E~Ya existe un funcionario para esta persona");
        } else {
            p.setPersona(per);
            p.setNombreUsuario(request.getParameter("nombrefun"));
            p.setContrasena(request.getParameter("password"));
            pBL.save(p);
            out.print("C~El usuario fue agregado correctamente");
        }
    }

    private void modificarFuncionario(Funcionario p, FuncionarioBL pBL, PrintWriter out, HttpServletRequest request) {
        System.out.println("Entrando a modificar funcionario");
        Persona per = new Persona();
        per.setPkId(Integer.parseInt(request.getParameter("cedula")));
        p.setPersona(per);
        p.setPkId(Integer.parseInt(request.getParameter("idFuncionario")));
        p.setNombreUsuario(request.getParameter("nombrefun"));
        p.setContrasena(request.getParameter("password"));
        pBL.merge(p);
        out.print("C~El usuario fue modificado correctamente");
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
