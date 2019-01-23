/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package cr.ac.una.prograiv.agenda.bl;

import cr.ac.una.prograiv.agenda.domain.Persona;

import java.util.List;

/**
 *
 * @author chgari
 */
public class PersonasBL extends BaseBL implements IBaseBL<Persona, Integer>{
    public PersonasBL() {
        super();
    }
    
    @Override
    public void save(Persona o) {
        this.getDao(o.getClass().getName()).save(o);
    }
    @Override
    public Persona merge(Persona o) {
        return (Persona) this.getDao(o.getClass().getName()).merge(o);
    }
    @Override
    public void delete(Persona o) {
        /*Ej: 1.1
          ELIMINAR UNA PERSONA SOLO SI TIENE MENOS DE 5 TELEFONOS Y
          3 DIRECCIONES
        */
        this.getDao(o.getClass().getName()).delete(o);
    }
    @Override
    public Persona findById(Integer o) {
        return (Persona) this.getDao(Persona.class.getName()).findById(o);
    }
    @Override
    public List<Persona> findAll(String className) {
        return this.getDao(className).findAll();
    }
    
}
