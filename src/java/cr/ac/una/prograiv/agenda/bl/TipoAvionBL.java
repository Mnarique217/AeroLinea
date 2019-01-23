/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package cr.ac.una.prograiv.agenda.bl;

import cr.ac.una.prograiv.agenda.domain.Avion;
import cr.ac.una.prograiv.agenda.domain.TipoAvion;

import java.util.List;

/**
 * @author chgari
 */
public class TipoAvionBL extends BaseBL implements IBaseBL<TipoAvion, Integer>{
    public TipoAvionBL() {
        super();
    }
    
    @Override
    public void save(TipoAvion o) {
        this.getDao(o.getClass().getName()).save(o);
    }
    @Override
    public TipoAvion merge(TipoAvion o) {
        return (TipoAvion) this.getDao(o.getClass().getName()).merge(o);
    }
    @Override
    public void delete(TipoAvion o) {
        this.getDao(o.getClass().getName()).delete(o);
    }
    @Override
    public TipoAvion findById(Integer o) {
        return (TipoAvion) this.getDao(TipoAvion.class.getName()).findById(o);
    }
    @Override
    public List<TipoAvion> findAll(String className) {
        return this.getDao(className).findAll();
    }
    
}
