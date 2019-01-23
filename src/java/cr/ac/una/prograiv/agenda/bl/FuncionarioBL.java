/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package cr.ac.una.prograiv.agenda.bl;

import cr.ac.una.prograiv.agenda.domain.Funcionario;
import cr.ac.una.prograiv.agenda.domain.Persona;
import java.util.List;

/**
 *
 * @author GeekMQ
 */
public class FuncionarioBL extends BaseBL implements IBaseBL<Funcionario, Integer> {

    public FuncionarioBL() {
        super();
    }

    @Override
    public void save(Funcionario o) {

        this.getDao(o.getClass().getName()).save(o);

    }

    @Override
    public Funcionario merge(Funcionario o) {
        return (Funcionario) this.getDao(o.getClass().getName()).merge(o);
    }

    @Override
    public void delete(Funcionario o) {
        this.getDao(o.getClass().getName()).delete(o);
    }

    @Override
    public Funcionario findById(Integer o) {
        return (Funcionario) this.getDao(Funcionario.class.getName()).findById(o);
    }

    @Override
    public List<Funcionario> findAll(String className) {
        return this.getDao(className).findAll();
    }

    public boolean existe(Persona p) {
        List funcionarios = this.getDao(Funcionario.class.getName()).findAll();
        for (Object funcionario : funcionarios) {
            Funcionario f = (Funcionario) funcionario;
            if (p.getPkId() == f.getPersona().getPkId()) {
                System.out.println("Ya existe un funcionario con esta persona");
                return true;
            }
        }
        return false;
    }

}
