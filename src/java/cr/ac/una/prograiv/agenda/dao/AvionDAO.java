package cr.ac.una.prograiv.agenda.dao;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import cr.ac.una.prograiv.agenda.domain.Avion;
import cr.ac.una.prograiv.agenda.utils.HibernateUtil;
import java.util.LinkedHashMap;
import java.util.List;
import org.hibernate.HibernateException;


/**
 *
 * @author chgari
 * editado por Manrique Arrieta
 */
public class AvionDAO extends HibernateUtil implements IBaseDAO<Avion, Integer>{
      
    @Override
    public void save(Avion o) {
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
    public Avion merge(Avion o) throws HibernateException {
        try {
            iniciaOperacion();
            o = (Avion) getSesion().merge(o);
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
    public void delete(Avion o) {
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
    public Avion findById(Integer id) {
        Avion personas = null;

        try {
            iniciaOperacion();
            personas = (Avion) getSesion().get(Avion.class, id);
        } finally {
            getSesion().close();
        }
        return personas;
    }

    @Override
    public List<Avion> findAll() {
        List<Avion> listaAvion;
        try {
            iniciaOperacion();//HQL
            listaAvion = getSesion().createQuery("from Avion").list();
        } finally {
            getSesion().close();
        }

        return listaAvion;
    }

    @Override
    public List createQueryHQL(LinkedHashMap<String, Object> parametros) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }
      
}
