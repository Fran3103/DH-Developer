package com.EasyStay.EasyStay.Entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "caracteristica")
public class Caracteristicas {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "caracteristica_id")
    private  Long id ;

    private String name;

    @ManyToMany(mappedBy = "caracteristicas")
    @JsonBackReference
    private List<Producto> productos; // Relación inversa


    public Caracteristicas() {
    }

    public Caracteristicas(String name) {
        this.name = name;
    }

    public Caracteristicas(Long id, String name) {
        this.id = id;
        this.name = name;
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

}
