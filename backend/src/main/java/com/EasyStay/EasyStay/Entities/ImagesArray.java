package com.EasyStay.EasyStay.Entities;


import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;


@Entity
public class ImagesArray {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "image_id")
    private Long id;
    private String url;

    //el json references evita q se generen recursion
    @ManyToOne
    @JoinColumn(name = "producto_id")
    @JsonBackReference
    private  Producto producto;

    public ImagesArray(String url, Producto producto) {
        this.url = url;
        this.producto = producto;
    }

    public ImagesArray(Long id, String url, Producto producto) {
        this.id = id;
        this.url = url;
        this.producto = producto;
    }

    public ImagesArray() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public Producto getProducto() {
        return producto;
    }

    public void setProducto(Producto producto) {
        this.producto = producto;
    }
}
