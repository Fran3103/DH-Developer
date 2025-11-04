package com.EasyStay.EasyStay.Entities;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "booking")
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private  Long id;

    private LocalDate startDate;
    private LocalDate endDate;

    @ManyToOne
    @JoinColumn(name = "producto_id")
    private Producto producto;

    public Booking(Long id, LocalDate startDate, LocalDate endDate, Producto producto) {
        this.id = id;
        this.startDate = startDate;
        this.endDate = endDate;
        this.producto = producto;
    }

    public Booking() {
    }

    public Booking(LocalDate startDate, LocalDate endDate, Producto producto) {
        this.startDate = startDate;
        this.endDate = endDate;
        this.producto = producto;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public Producto getProducto() {
        return producto;
    }

    public void setProducto(Producto producto) {
        this.producto = producto;
    }
}
