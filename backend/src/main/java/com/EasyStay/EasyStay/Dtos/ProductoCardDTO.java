package com.EasyStay.EasyStay.Dtos;

import com.EasyStay.EasyStay.Entities.Producto;

public record ProductoCardDTO(Long id, String name, String location, Double price, String imagenUrl, Integer rating, String quality) {
    public static ProductoCardDTO from(Producto p) {
        // ajustá getters y el campo de imagen según tu modelo
        return new ProductoCardDTO(p.getId(), p.getName(), p.getLocation(), p.getPrice(),
                p.getImages().get(0).getUrl(), p.getRating(), p.getQuality());
    }
}