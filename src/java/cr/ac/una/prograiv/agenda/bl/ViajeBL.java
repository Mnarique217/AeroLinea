/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package cr.ac.una.prograiv.agenda.bl;

import cr.ac.una.prograiv.agenda.domain.Viaje;
import java.util.LinkedHashMap;
import java.util.List;

/**
 *
 * @author Mario
 */
public class ViajeBL extends BaseBL implements IBaseBL<Viaje, Integer> {

    public ViajeBL() {
        super();
    }

    @Override
    public void save(Viaje o) {
        this.getDao(o.getClass().getName()).save(o);
    }

    @Override
    public Viaje merge(Viaje o) {
        return (Viaje) this.getDao(o.getClass().getName()).merge(o);
    }

    @Override
    public void delete(Viaje o) {
        /*Ej: 1.1
          ELIMINAR UNA PERSONA SOLO SI TIENE MENOS DE 5 TELEFONOS Y
          3 DIRECCIONES
         */
        this.getDao(o.getClass().getName()).delete(o);
    }

    @Override
    public Viaje findById(Integer o) {
        return (Viaje) this.getDao(Viaje.class.getName()).findById(o);
    }

    @Override
    public List<Viaje> findAll(String className) {
        return this.getDao(className).findAll();
    }

    public List createQueryHQL(String className, LinkedHashMap<String, Object> parametros) {
        return this.getDao(className).createQueryHQL(parametros);
    }
    

}
