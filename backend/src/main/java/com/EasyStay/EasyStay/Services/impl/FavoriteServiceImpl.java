package com.EasyStay.EasyStay.Services.impl;

import com.EasyStay.EasyStay.Entities.Favorite;
import com.EasyStay.EasyStay.Entities.Producto;
import com.EasyStay.EasyStay.Entities.Usuarios;
import com.EasyStay.EasyStay.Repositories.FavoriteRepository;
import com.EasyStay.EasyStay.Repositories.IProductoRepository;
import com.EasyStay.EasyStay.Repositories.IUsuarioRepository;
import com.EasyStay.EasyStay.Services.IFavoriteService;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class FavoriteServiceImpl implements IFavoriteService {

    private final FavoriteRepository favoriteRepository;
    private final IUsuarioRepository usuarioRepository;
    private final IProductoRepository productoRepository;

    public FavoriteServiceImpl(FavoriteRepository favoriteRepository, IUsuarioRepository usuarioRepository, IProductoRepository productoRepository) {
        this.favoriteRepository = favoriteRepository;
        this.usuarioRepository = usuarioRepository;
        this.productoRepository = productoRepository;
    }


    @Override
    @Transactional
    public void addFavorite(Long usuarioId, Long productoId) {
        if (favoriteRepository.existsByUsuario_IdAndProducto_Id(usuarioId, productoId)) return;

        Usuarios user = usuarioRepository.findById(usuarioId).orElseThrow(()-> new IllegalArgumentException("Usuario no encontrado"));
        Producto prod = productoRepository.findById(productoId).orElseThrow(()-> new IllegalArgumentException("Producto no encontrado"));

        favoriteRepository.save(new Favorite(user, prod));
    }

    @Override
    @Transactional
    public void removeFavorite(Long usuarioId, Long productoId) {
         favoriteRepository.deleteByUsuarioIdAndProductoId(usuarioId, productoId);
    }

    @Override
    public List<Long> getFavoriteProductIds(Long usuarioId) {
        return favoriteRepository.findProductoIdsByUsuarioId(usuarioId);
    }
}
