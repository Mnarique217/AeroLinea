/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package cr.ac.una.prograiv.agenda.bl;

import cr.ac.una.prograiv.agenda.domain.Ciudad;

import java.util.List;

/**
 *
 * @author chgari
 */
public class CiudadesBL extends BaseBL implements IBaseBL<Ciudad, Integer>{
    public CiudadesBL() {
        super();
    }
    
    @Override
    public void save(Ciudad o) {
        this.getDao(o.getClass().getName()).save(o);
    }
    @Override
    public Ciudad merge(Ciudad o) {
        return (Ciudad) this.getDao(o.getClass().getName()).merge(o);
    }
    @Override
    public void delete(Ciudad o) {
        /*Ej: 1.1
          ELIMINAR UNA PERSONA SOLO SI TIENE MENOS DE 5 TELEFONOS Y
          3 DIRECCIONES
        */
        this.getDao(o.getClass().getName()).delete(o);
    }
    @Override
    public Ciudad findById(Integer o) {
        return (Ciudad) this.getDao(Ciudad.class.getName()).findById(o);
    }
    @Override
    public List<Ciudad> findAll(String className) {
        return this.getDao(className).findAll();
    }
    
}
