/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package cr.ac.una.prograiv.agenda.bl;

import cr.ac.una.prograiv.agenda.dao.IBaseDAO;
import cr.ac.una.prograiv.agenda.dao.*;
import java.util.LinkedHashMap;

/**
 *
 * @author chgari
 */
public class BaseBL {

    private final LinkedHashMap<String, IBaseDAO> daos;

    public BaseBL() {
        daos = new LinkedHashMap();
        daos.put("cr.ac.una.prograiv.agenda.domain.Persona", new PersonasDAO());
        daos.put("cr.ac.una.prograiv.agenda.domain.Ciudad", new CiudadesDAO());
        daos.put("cr.ac.una.prograiv.agenda.domain.TipoAvion", new TipoAvionDAO());
        daos.put("cr.ac.una.prograiv.agenda.domain.Avion", new AvionDAO());
        daos.put("cr.ac.una.prograiv.agenda.domain.Vuelo", new VueloDAO());
        daos.put("cr.ac.una.prograiv.agenda.domain.Funcionario", new FuncionarioDAO());
        daos.put("cr.ac.una.prograiv.agenda.domain.Usuario", new UsuarioDAO());
        daos.put("cr.ac.una.prograiv.agenda.domain.Viaje", new ViajeDAO());
        daos.put("cr.ac.una.prograiv.agenda.domain.Reservacion", new ReservacionDAO());

    }

    public IBaseDAO getDao(String className) {
        return daos.get(className);
    }
}
