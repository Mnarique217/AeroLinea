/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package cr.ac.una.prograiv.agenda.dao;

import cr.ac.una.prograiv.agenda.domain.Persona;
import cr.ac.una.prograiv.agenda.utils.HibernateUtil;
import java.util.LinkedHashMap;
import java.util.List;
import org.hibernate.HibernateException;

/**
 *
 * @author chgari
 */
public class PersonasDAO extends HibernateUtil implements IBaseDAO<Persona, Integer>{
    
    @Override
    public void save(Persona o) {
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
    public Persona merge(Persona o) throws HibernateException {
        try {
            iniciaOperacion();
            o = (Persona) getSesion().merge(o);
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
    public void delete(Persona o) {
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
    public Persona findById(Integer id) {
        Persona personas = null;

        try {
            iniciaOperacion();
            personas = (Persona) getSesion().get(Persona.class, id);
        } finally {
            getSesion().close();
        }
        return personas;
    }

    @Override
    public List<Persona> findAll() {
        List<Persona> listaPersona;
        try {
            iniciaOperacion();//HQL
            listaPersona = getSesion().createQuery("from Persona").list();
        } finally {
            getSesion().close();
        }

        return listaPersona;
    }

    @Override
    public List createQueryHQL(LinkedHashMap<String, Object> parametros) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }
    
    
}
