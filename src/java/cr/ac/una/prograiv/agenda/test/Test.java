/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package cr.ac.una.prograiv.agenda.test;


import cr.ac.una.prograiv.agenda.bl.FuncionarioBL;
import cr.ac.una.prograiv.agenda.bl.PersonasBL;
import cr.ac.una.prograiv.agenda.domain.Funcionario;
import cr.ac.una.prograiv.agenda.domain.Persona;
import java.util.Date;

/**
 * @author chgari
 */
public class Test {

    public static void main(String arg[]) {

        

        
        
                Persona p=new Persona(555555,"manri","alafao",new Date(), "122", "122", "122", "222") ;
                 PersonasBL per= new PersonasBL();
                per.save(p);
                 
                 Funcionario f=new Funcionario(p,"MQ","123");
                 FuncionarioBL bl=new FuncionarioBL();
                 bl.delete(f);
    }
}
