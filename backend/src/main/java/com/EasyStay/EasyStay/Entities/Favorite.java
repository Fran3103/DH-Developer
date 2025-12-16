package com.EasyStay.EasyStay.Entities;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;


@Entity
@Table(name = "user_favorites",
        uniqueConstraints = @UniqueConstraint(name = "uk_user_product", columnNames = {"usuario_id", "producto_id"})
)
public class Favorite {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuarios usuario;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "producto_id", nullable = false)
    private Producto producto;

    @CreationTimestamp
    @Column(name = "create_at", nullable = false, updatable = false)
    private LocalDateTime favoritedAt;



    public Favorite() {
    }

    public Favorite(Usuarios user, Producto producto) {
        this.usuario = user;
        this.producto = producto
        ;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Usuarios getUser() {
        return usuario;
    }

    public void setUser(Usuarios usuario) {
        this.usuario = usuario;
    }

    public Producto getProducto() {
        return producto;
    }

    public void setProducto(Producto producto) {
        this.producto = producto;
    }

    public LocalDateTime getFavoritedAt() {
        return favoritedAt;
    }

    public void setFavoritedAt(LocalDateTime favoritedAt) {
        this.favoritedAt = favoritedAt;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
       if (!(o instanceof Favorite)) return false;
       Favorite that = (Favorite) o;

        return id != null ? id.equals(that.id) : that.id == null;
    }
    @Override
    public int hashCode() {
        return 31;
    }
}
