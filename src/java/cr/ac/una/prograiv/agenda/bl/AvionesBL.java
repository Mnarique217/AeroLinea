/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package cr.ac.una.prograiv.agenda.bl;

import cr.ac.una.prograiv.agenda.domain.Avion;

import java.util.List;

/**
 *
 * @author chgari
 */
public class AvionesBL extends BaseBL implements IBaseBL<Avion, Integer>{
    public AvionesBL() {
        super();
    }
    
    @Override
    public void save(Avion o) {
        this.getDao(o.getClass().getName()).save(o);
    }
    @Override
    public Avion merge(Avion o) {
        return (Avion) this.getDao(o.getClass().getName()).merge(o);
    }
    @Override
    public void delete(Avion o) {
        /*Ej: 1.1
          ELIMINAR UNA PERSONA SOLO SI TIENE MENOS DE 5 TELEFONOS Y
          3 DIRECCIONES
        */
        this.getDao(o.getClass().getName()).delete(o);
    }
    @Override
    public Avion findById(Integer o) {
        return (Avion) this.getDao(Avion.class.getName()).findById(o);
    }
    @Override
    public List<Avion> findAll(String className) {
        return this.getDao(className).findAll();
    }
    
}
