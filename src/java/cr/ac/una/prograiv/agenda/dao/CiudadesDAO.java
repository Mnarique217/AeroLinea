/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package cr.ac.una.prograiv.agenda.dao;

import cr.ac.una.prograiv.agenda.domain.Ciudad;
import cr.ac.una.prograiv.agenda.utils.HibernateUtil;
import java.util.LinkedHashMap;
import java.util.List;
import org.hibernate.HibernateException;

/**
 *
 * @author chgari
 */
public class CiudadesDAO extends HibernateUtil implements IBaseDAO<Ciudad, Integer>{
    
    @Override
    public void save(Ciudad o) {
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
    public Ciudad merge(Ciudad o) throws HibernateException {
        try {
            iniciaOperacion();
            o = (Ciudad) getSesion().merge(o);
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
    public void delete(Ciudad o) {
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
    public Ciudad findById(Integer id) {
        Ciudad personas = null;

        try {
            iniciaOperacion();
            personas = (Ciudad) getSesion().get(Ciudad.class, id);
        } finally {
            getSesion().close();
        }
        return personas;
    }

    @Override
    public List<Ciudad> findAll() {
        List<Ciudad> listaCiudad;
        try {
            iniciaOperacion();//HQL
            listaCiudad = getSesion().createQuery("from Ciudad").list();
        } finally {
            getSesion().close();
        }

        return listaCiudad;
    }

    @Override
    public List createQueryHQL(LinkedHashMap<String, Object> parametros) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }
    
    
}
