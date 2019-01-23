/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package cr.ac.una.prograiv.agenda.dao;

import cr.ac.una.prograiv.agenda.domain.TipoAvion;
import cr.ac.una.prograiv.agenda.utils.HibernateUtil;
import java.util.LinkedHashMap;
import java.util.List;
import org.hibernate.HibernateException;

/**
 *
 * @author chgari
 */
public class TipoAvionDAO extends HibernateUtil implements IBaseDAO<TipoAvion, Integer>{
    
    @Override
    public void save(TipoAvion o) {
            try {
                iniciaOperacion();
                getSesion().save(o);
                getTransac().commit();
            } catch (HibernateException he) {
                manejaExcepcion(he);
                throw he;
            } finally {
                getSesion().close();
            }
    }
    
    @Override
    public TipoAvion merge(TipoAvion o) throws HibernateException {
        try {
            iniciaOperacion();
            o = (TipoAvion) getSesion().merge(o);
            getTransac().commit();
        } catch (HibernateException he) {
            manejaExcepcion(he);
            throw he;
        } finally {
            getSesion().close();
        }
        return o;
    }
   
    @Override
    public void delete(TipoAvion o) {
        try {
            iniciaOperacion();
            getSesion().delete(o);
            getTransac().commit();
        } catch (HibernateException he) {
            manejaExcepcion(he);
            throw he;
        } finally {
            getSesion().close();
        }
    }

    @Override
    public TipoAvion findById(Integer id) {
        TipoAvion personas = null;

        try {
            iniciaOperacion();
            personas = (TipoAvion) getSesion().get(TipoAvion.class, id);
        } finally {
            getSesion().close();
        }
        return personas;
    }

    @Override
    public List<TipoAvion> findAll() {
        List<TipoAvion> listaTipoAvion;
        try {
            iniciaOperacion();//HQL
            listaTipoAvion = getSesion().createQuery("from TipoAvion").list();
        } finally {
            getSesion().close();
        }

        return listaTipoAvion;
    }

    @Override
    public List createQueryHQL(LinkedHashMap<String, Object> parametros) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }
    
    
}
