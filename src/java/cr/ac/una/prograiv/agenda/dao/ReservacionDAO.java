/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package cr.ac.una.prograiv.agenda.dao;

import cr.ac.una.prograiv.agenda.domain.Reservacion;
import cr.ac.una.prograiv.agenda.utils.HibernateUtil;
import java.util.LinkedHashMap;
import java.util.List;
import org.hibernate.HibernateException;

/**
 *
 * @author Mario
 */
public class ReservacionDAO extends HibernateUtil implements IBaseDAO<Reservacion, Integer>{
    @Override
    public void save(Reservacion o) {
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
    public Reservacion merge(Reservacion o) throws HibernateException {
        try {
            iniciaOperacion();
            o = (Reservacion) getSesion().merge(o);
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
    public void delete(Reservacion o) {
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
    public Reservacion findById(Integer id) {
        Reservacion personas = null;

        try {
            iniciaOperacion();
            personas = (Reservacion) getSesion().get(Reservacion.class, id);
        } finally {
            getSesion().close();
        }
        return personas;
    }

    @Override
    public List<Reservacion> findAll() {
        List<Reservacion> listaReservacion;
        try {
            iniciaOperacion();//HQL
            listaReservacion = getSesion().createQuery("from Reservacion").list();
        } finally {
            getSesion().close();
        }

        return listaReservacion;
    }

    @Override
    public List createQueryHQL(LinkedHashMap<String, Object> parametros) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }
    
}
