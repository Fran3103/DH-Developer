package com.EasyStay.EasyStay.Services;


import com.EasyStay.EasyStay.Dtos.CategoriaCount;
import com.EasyStay.EasyStay.Entities.Producto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@Service
public interface IProductoService {





    Producto save (Producto producto);

    Optional<Producto> findById (Long id);

    void update(Producto producto);

    void delete(Long id);

    List<Producto> findAll();
    boolean existsByName(String name);

    List<Producto> findByCategory(String categorias);
    List<Producto> findByCategoryIgnoreCase(String categorias);

    List<CategoriaCount> getCountCategory();

    Page<Producto> findByFilters(List<String> category,
                                 Double minPrice, Double maxPrice,
                                 String location,
                                 List<Long> caracteristicasId,
                                 Pageable page);
}
