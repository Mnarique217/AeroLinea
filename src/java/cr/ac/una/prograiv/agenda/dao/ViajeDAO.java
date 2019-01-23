/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package cr.ac.una.prograiv.agenda.dao;

import cr.ac.una.prograiv.agenda.domain.Viaje;
import cr.ac.una.prograiv.agenda.utils.HibernateUtil;
import java.util.LinkedHashMap;
import java.util.List;
import org.hibernate.HibernateException;
import org.hibernate.SQLQuery;

/**
 *
 * @author Mario
 */
public class ViajeDAO extends HibernateUtil implements IBaseDAO<Viaje, Integer> {

    @Override
    public void save(Viaje o) {
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
    public Viaje merge(Viaje o) throws HibernateException {
        try {
            iniciaOperacion();
            o = (Viaje) getSesion().merge(o);
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
    public void delete(Viaje o) {
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
    public Viaje findById(Integer id) {
        Viaje viajes = null;

        try {
            iniciaOperacion();
            viajes = (Viaje) getSesion().get(Viaje.class, id);
        } finally {
            getSesion().close();
        }
        return viajes;
    }

    @Override
    public List<Viaje> findAll() {
        List<Viaje> listaViaje;
        try {
            iniciaOperacion();//HQL
            listaViaje = getSesion().createQuery("from Viaje").list();
        } finally {
            getSesion().close();
        }

        return listaViaje;
    }
    
    @Override
    public List createQueryHQL(LinkedHashMap<String, Object> parametros) {
        List lista = null;

        System.out.println("origen " + parametros.get("origen").toString() + "\n destino " + parametros.get("destino").toString());

        try {
            iniciaOperacion();

            String sql = "SELECT * FROM Viaje vi inner join Vuelo vu on vi.fk_vuelo = vu.pk_id\n"
                    + "                    inner join Ciudad c on (vu.fk_origen = c.pk_id) and (c.nombre  like '%" + parametros.get("origen").toString() + "%') \n"
                    + "                    inner join Ciudad c2 on (vu.fk_destino = c2.pk_id) and (c2.nombre like '%" + parametros.get("destino").toString() + "%')";
            SQLQuery query = getSesion().createSQLQuery(sql);
            query.addEntity(Viaje.class);
            lista = query.list();

        } finally {
            getSesion().close();
        }
        return lista;
    }

}
