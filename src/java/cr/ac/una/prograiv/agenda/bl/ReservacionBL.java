/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package cr.ac.una.prograiv.agenda.bl;

import cr.ac.una.prograiv.agenda.domain.Reservacion;

import java.util.List;

/**
 *
 * @author Mario
 */
public class ReservacionBL extends BaseBL implements IBaseBL<Reservacion, Integer>{
public ReservacionBL(){
    super();
}


    @Override
    public void save(Reservacion o) {
        this.getDao(o.getClass().getName()).save(o);
    }
    @Override
    public Reservacion merge(Reservacion o) {
        return (Reservacion) this.getDao(o.getClass().getName()).merge(o);
    }
    @Override
    public void delete(Reservacion o) {
        /*Ej: 1.1
          ELIMINAR UNA PERSONA SOLO SI TIENE MENOS DE 5 TELEFONOS Y
          3 DIRECCIONES
        */
        this.getDao(o.getClass().getName()).delete(o);
    }
    @Override
    public Reservacion findById(Integer o) {
        return (Reservacion) this.getDao(Reservacion.class.getName()).findById(o);
    }
    @Override
    public List<Reservacion> findAll(String className) {
        return this.getDao(className).findAll();
    }

    
}
