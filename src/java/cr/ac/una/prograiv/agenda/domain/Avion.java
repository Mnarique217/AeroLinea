package cr.ac.una.prograiv.agenda.domain;
// Generated May 25, 2017 9:24:05 PM by Hibernate Tools 4.3.1


import java.util.Date;

/**
 * Avion generated by hbm2java
 */
public class Avion  implements java.io.Serializable {


     private Integer pkId;
     private TipoAvion tipoAvion;
     private String ultUsuario;
     private Date ulModificacion;

    public Avion() {
    }

	
    public Avion(TipoAvion tipoAvion) {
        this.tipoAvion = tipoAvion;
    }
    public Avion(TipoAvion tipoAvion, String ultUsuario, Date ulModificacion) {
       this.tipoAvion = tipoAvion;
       this.ultUsuario = ultUsuario;
       this.ulModificacion = ulModificacion;
      
    }
   
    public Integer getPkId() {
        return this.pkId;
    }
    
    public void setPkId(Integer pkId) {
        this.pkId = pkId;
    }
    public TipoAvion getTipoAvion() {
        return this.tipoAvion;
    }
    
    public void setTipoAvion(TipoAvion tipoAvion) {
        this.tipoAvion = tipoAvion;
    }
    public String getUltUsuario() {
        return this.ultUsuario;
    }
    
    public void setUltUsuario(String ultUsuario) {
        this.ultUsuario = ultUsuario;
    }
    public Date getUlModificacion() {
        return this.ulModificacion;
    }
    
    public void setUlModificacion(Date ulModificacion) {
        this.ulModificacion = ulModificacion;
    }
}


