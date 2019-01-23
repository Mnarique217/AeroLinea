/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package cr.ac.una.prograiv.agenda.dao;


import cr.ac.una.prograiv.agenda.domain.Vuelo;
import cr.ac.una.prograiv.agenda.utils.HibernateUtil;
import java.util.LinkedHashMap;
import java.util.List;
import org.hibernate.HibernateException;


/**
 *
 * @author chgari
 * editado por Manrique Arrieta
 */
public class VueloDAO extends HibernateUtil implements IBaseDAO<Vuelo, Integer>{
      
    @Override
    public void save(Vuelo o) {
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
    public Vuelo merge(Vuelo o) throws HibernateException {
        try {
            iniciaOperacion();
            o = (Vuelo) getSesion().merge(o);
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
    public void delete(Vuelo o) {
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
    public Vuelo findById(Integer id) {
        Vuelo personas = null;

        try {
            iniciaOperacion();
            personas = (Vuelo) getSesion().get(Vuelo.class, id);
        } finally {
            getSesion().close();
        }
        return personas;
    }

    @Override
    public List<Vuelo> findAll() {
        List<Vuelo> listaVuelo;
        try {
            iniciaOperacion();//HQL
            listaVuelo = getSesion().createQuery("from Vuelo").list();
        } finally {
            getSesion().close();
        }

        return listaVuelo;
    }

    @Override
    public List createQueryHQL(LinkedHashMap<String, Object> parametros) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }
      
}
