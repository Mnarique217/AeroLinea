package cr.ac.una.prograiv.agenda.bl;

import cr.ac.una.prograiv.agenda.domain.Vuelo;
import java.util.List;

public class VueloBL extends BaseBL implements IBaseBL<Vuelo, Integer> {

    public VueloBL() {
        super();
    }

    @Override
    public void save(Vuelo o) {

        this.getDao(o.getClass().getName()).save(o);

    }

    @Override
    public Vuelo merge(Vuelo o) {
        return (Vuelo) this.getDao(o.getClass().getName()).merge(o);
    }

    @Override
    public void delete(Vuelo o) {
        this.getDao(o.getClass().getName()).delete(o);
    }

    @Override
    public Vuelo findById(Integer o) {
        return (Vuelo) this.getDao(Vuelo.class.getName()).findById(o);
    }

    @Override
    public List<Vuelo> findAll(String className) {
        return this.getDao(className).findAll();
    }

}
