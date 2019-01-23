/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package cr.ac.una.prograiv.agenda.bl;
import cr.ac.una.prograiv.agenda.domain.Usuario;
import cr.ac.una.prograiv.agenda.domain.Persona;

import java.util.List;

/**
 *
 * @author Mario
 */
public class UsuariosBL extends BaseBL implements IBaseBL<Usuario, Integer>{
    public UsuariosBL() {
        super();
    }
    
    @Override
    public void save(Usuario o) {
        
        this.getDao(o.getClass().getName()).save(o);
    }
    
    public boolean existe(Persona p){
        List usuarios = this.getDao(Usuario.class.getName()).findAll();
        for(Object usuario: usuarios){
        Usuario u = (Usuario)usuario;
        if(p.getPkId() == u.getPersona().getPkId()){
            System.out.println("Ya existe un usuario con esta persona");
            return true;
        }
        }
        return false;
    }
    
    
    @Override
    public Usuario merge(Usuario o) {
        return (Usuario) this.getDao(o.getClass().getName()).merge(o);
    }
    @Override
    public void delete(Usuario o) {
        /*Ej: 1.1
          ELIMINAR UNA PERSONA SOLO SI TIENE MENOS DE 5 TELEFONOS Y
          3 DIRECCIONES
        */
        this.getDao(o.getClass().getName()).delete(o);
    }
    @Override
    public Usuario findById(Integer o) {
        return (Usuario) this.getDao(Usuario.class.getName()).findById(o);
    }
    @Override
    public List<Usuario> findAll(String className) {
        return this.getDao(className).findAll();
    }
    
}
