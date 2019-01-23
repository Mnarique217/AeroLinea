package cr.ac.una.prograiv.agenda.domain;
// Generated May 25, 2017 9:24:05 PM by Hibernate Tools 4.3.1


import java.util.Date;


/**
 * Viaje generated by hbm2java
 */
public class Viaje  implements java.io.Serializable {


     private Integer pkId;
     private Vuelo vuelo;
     private Date fechaSalida;
     private int cantidadAsientosDisponibles;
     private Double precio;
     private Double descuento;
     private String ultUsuario;
     private Date ultModificacion;

    public Viaje() {
    }

	
    public Viaje(Vuelo vuelo, int cantidadAsientosDisponibles) {
        this.vuelo = vuelo;
        this.cantidadAsientosDisponibles = cantidadAsientosDisponibles;
    }
    public Viaje(Vuelo vuelo, Date fechaSalida, int cantidadAsientosDisponibles, Double precio, Double descuento, String ultUsuario, Date ultModificacion) {
       this.vuelo = vuelo;
       this.fechaSalida = fechaSalida;
       this.cantidadAsientosDisponibles = cantidadAsientosDisponibles;
       this.precio = precio;
       this.descuento = descuento;
       this.ultUsuario = ultUsuario;
       this.ultModificacion = ultModificacion;
       
    }
   
    public Integer getPkId() {
        return this.pkId;
    }
    
    public void setPkId(Integer pkId) {
        this.pkId = pkId;
    }
    public Vuelo getVuelo() {
        return this.vuelo;
    }
    
    public void setVuelo(Vuelo vuelo) {
        this.vuelo = vuelo;
    }
    public Date getFechaSalida() {
        return this.fechaSalida;
    }
    
    public void setFechaSalida(Date fechaSalida) {
        this.fechaSalida = fechaSalida;
    }
    public int getCantidadAsientosDisponibles() {
        return this.cantidadAsientosDisponibles;
    }
    
    public void setCantidadAsientosDisponibles(int cantidadAsientosDisponibles) {
        this.cantidadAsientosDisponibles = cantidadAsientosDisponibles;
    }
    public Double getPrecio() {
        return this.precio;
    }
    
    public void setPrecio(Double precio) {
        this.precio = precio;
    }
    public Double getDescuento() {
        return this.descuento;
    }
    
    public void setDescuento(Double descuento) {
        this.descuento = descuento;
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


}

