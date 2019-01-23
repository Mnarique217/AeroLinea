/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package cr.ac.una.prograiv.agenda.dao;

import cr.ac.una.prograiv.agenda.domain.Funcionario;
import cr.ac.una.prograiv.agenda.utils.HibernateUtil;
import java.util.LinkedHashMap;
import java.util.List;
import org.hibernate.HibernateException;

/**
 *
 * @author GeekMQ
 */
public class FuncionarioDAO  extends HibernateUtil implements IBaseDAO<Funcionario, Integer>{
      
    @Override
    public void save(Funcionario o) {
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
    public Funcionario merge(Funcionario o) throws HibernateException {
        try {
            iniciaOperacion();
            o = (Funcionario) getSesion().merge(o);
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
    public void delete(Funcionario o) {
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
    public Funcionario findById(Integer id) {
        Funcionario personas = null;

        try {
            iniciaOperacion();
            personas = (Funcionario) getSesion().get(Funcionario.class, id);
        } finally {
            getSesion().close();
        }
        return personas;
    }

    @Override
    public List<Funcionario> findAll() {
        List<Funcionario> listaFuncionario;
        try {
            iniciaOperacion();//HQL
            listaFuncionario = getSesion().createQuery("from Funcionario").list();
        } finally {
            getSesion().close();
        }

        return listaFuncionario;
    }

    @Override
    public List createQueryHQL(LinkedHashMap<String, Object> parametros) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }
      
}
