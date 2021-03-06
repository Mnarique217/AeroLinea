package cr.ac.una.prograiv.agenda.domain;
// Generated Jun 9, 2017 9:24:50 AM by Hibernate Tools 4.3.1


import java.util.Date;

/**
 * Tiquete generated by hbm2java
 */
public class Tiquete  implements java.io.Serializable {


     private Integer codigoTiquete;
     private Reservacion reservacion;
     private String asiento;
     private String ultUsuario;
     private Date ultModificacion;
     private String nombre;
     private String apellido;

    public Tiquete() {
    }

	
    public Tiquete(Reservacion reservacion, String asiento) {
        this.reservacion = reservacion;
        this.asiento = asiento;
    }
    public Tiquete(Reservacion reservacion, String asiento, String ultUsuario, Date ultModificacion, String nombre, String apellido) {
       this.reservacion = reservacion;
       this.asiento = asiento;
       this.ultUsuario = ultUsuario;
       this.ultModificacion = ultModificacion;
       this.nombre = nombre;
       this.apellido = apellido;
    }
   
    public Integer getCodigoTiquete() {
        return this.codigoTiquete;
    }
    
    public void setCodigoTiquete(Integer codigoTiquete) {
        this.codigoTiquete = codigoTiquete;
    }
    public Reservacion getReservacion() {
        return this.reservacion;
    }
    
    public void setReservacion(Reservacion reservacion) {
        this.reservacion = reservacion;
    }
    public String getAsiento() {
        return this.asiento;
    }
    
    public void setAsiento(String asiento) {
        this.asiento = asiento;
    }
    public String getUltUsuario() {
        return this.ultUsuario;
    }
    
    public void setUltUsuario(String ultUsuario) {
        this.ultUsuario = ultUsuario;
    }
    public Date getUltModificacion() {
        return this.ultModificacion;
    }
    
    public void setUltModificacion(Date ultModificacion) {
        this.ultModificacion = ultModificacion;
    }
    public String getNombre() {
        return this.nombre;
    }
    
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
    public String getApellido() {
        return this.apellido;
    }
    
    public void setApellido(String apellido) {
        this.apellido = apellido;
    }




}


