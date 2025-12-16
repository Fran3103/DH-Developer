package com.EasyStay.EasyStay.Services;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface IFavoriteService {

    void addFavorite(Long usuarioId, Long productoId);
    void removeFavorite(Long usuarioId, Long productoId);
    List<Long> getFavoriteProductIds(Long usuarioId);

}
