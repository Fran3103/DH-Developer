package com.EasyStay.EasyStay.Services;


import com.EasyStay.EasyStay.Entities.Producto;
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

    List<Producto> findByCategory(String category);
    List<Producto> findByCategoryIgnoreCase(String category);
}
