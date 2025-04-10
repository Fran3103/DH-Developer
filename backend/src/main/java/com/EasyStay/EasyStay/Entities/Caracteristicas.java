package com.EasyStay.EasyStay.Entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "caracteristica")
public class Caracteristicas {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private  Long id ;

    private String name;
    private String icono;

    @ManyToMany(mappedBy = "caracteristicas", cascade = {CascadeType.PERSIST, CascadeType.MERGE} )
    @JsonBackReference
    private List<Producto> productos = new ArrayList<>(); // Relación inversa


    public Caracteristicas() {
    }



    public Caracteristicas( String name, String icono) {
        this.name = name;
        this.icono = icono;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
    public List<Producto> getProductos() {
        return productos;
    }

    public void setProductos(List<Producto> productos) {
        this.productos = productos;
    }

    public String getIcono() {
        return icono;
    }

    public void setIcono(String icono) {
        this.icono = icono;
    }
}
