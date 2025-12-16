package com.EasyStay.EasyStay.Repositories;

import com.EasyStay.EasyStay.Entities.Favorite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface FavoriteRepository extends JpaRepository<Favorite, Long> {

    boolean existsByUsuario_IdAndProducto_Id(Long usuarioId, Long productoId);

    void deleteByUsuarioIdAndProductoId(Long usuarioId, Long productoId);

    @Query("select f.producto.id from Favorite f where f.usuario.id = :usuarioId")
    List<Long> findProductoIdsByUsuarioId(@Param("usuarioId") Long usuarioId);


}
