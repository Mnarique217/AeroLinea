package cr.ac.una.prograiv.agenda.domain;
// Generated May 25, 2017 9:24:05 PM by Hibernate Tools 4.3.1


/**
 * Usuario generated by hbm2java
 */
public class Usuario  implements java.io.Serializable {


     private Integer pkId;
     private Persona persona;
     private String nombreUsuario;
     private String contrasena;

    public Usuario() {
    }

	
    public Usuario(Persona persona, String nombreUsuario, String contrasena) {
        this.persona = persona;
        this.nombreUsuario = nombreUsuario;
        this.contrasena = contrasena;
    }

   
    public Integer getPkId() {
        return this.pkId;
    }
    
    public void setPkId(Integer pkId) {
        this.pkId = pkId;
    }
    public Persona getPersona() {
        return this.persona;
    }
    
    public void setPersona(Persona persona) {
        this.persona = persona;
    }
    public String getNombreUsuario() {
        return this.nombreUsuario;
    }
    
    public void setNombreUsuario(String nombreUsuario) {
        this.nombreUsuario = nombreUsuario;
    }
    public String getContrasena() {
        return this.contrasena;
    }
    
    public void setContrasena(String contrasena) {
        this.contrasena = contrasena;
    }
}

