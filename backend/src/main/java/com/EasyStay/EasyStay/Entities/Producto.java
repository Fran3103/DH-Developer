package com.EasyStay.EasyStay.Entities;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table (name = "producto")
public class Producto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "producto_id")
    private long id;

    private String name;


    private String location;

    private Double price ;

    private Integer rating;

    private String quality;

    private  String address;

    @Lob
    private String description;

    //json reference evita la recurison excesiva
    @OneToMany(mappedBy =  "producto", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<ImagesArray> images;


    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonBackReference
    private Usuarios user;

    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinTable(
            name = "producto_caracteristicas",
            joinColumns = @JoinColumn(name = "producto_id"),
            inverseJoinColumns = @JoinColumn(name = "caracteristica_id"))
    private List<Caracteristicas> caracteristicas = new ArrayList<>(); // Relación con Caracteristicas


    @JsonProperty("categorias")
    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinTable(
            name = "producto_categoria",
            joinColumns = @JoinColumn(name = "producto_id"),
            inverseJoinColumns = @JoinColumn(name = "categoria_id"))
    private List<Categorias> categorias = new ArrayList<>();

    public Producto() {
    }

    public Producto(String name, List<Categorias> categorias, String location, Double price, Integer rating, String quality, String address, String description, List<ImagesArray> images) {
        this.name = name;
        this.categorias = categorias;
        this.location = location;
        this.price = price;
        this.rating = rating;
        this.quality = quality;
        this.address = address;
        this.description = description;
        this.images = images;
    }

    public Producto(List<ImagesArray> images, String description, String address, String quality, Integer rating, Double price, String location, List<Categorias> categorias, String name, long id) {
        this.images = images;
        this.description = description;
        this.address = address;
        this.quality = quality;
        this.rating = rating;
        this.price = price;
        this.location = location;
        this.categorias = categorias;
        this.name = name;
        this.id = id;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Categorias> getCategorias() {
        return categorias;
    }

    public void setCategorias(List<Categorias> categorias) {
        this.categorias = categorias;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Integer getRating() {
        return rating;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }

    public String getQuality() {
        return quality;
    }

    public void setQuality(String quality) {
        this.quality = quality;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<ImagesArray> getImages() {
        return images;
    }

    public void setImages(List<ImagesArray> images) {
        this.images = images;
    }

    public List<Caracteristicas> getCaracteristicas() {
        return caracteristicas;
    }

    public void setCaracteristicas(List<Caracteristicas> caracteristicas) {
        this.caracteristicas = caracteristicas;
    }
}
