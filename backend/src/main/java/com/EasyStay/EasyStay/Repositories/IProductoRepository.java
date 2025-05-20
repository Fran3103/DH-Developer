package com.EasyStay.EasyStay.Repositories;

import com.EasyStay.EasyStay.Entities.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IProductoRepository extends JpaRepository<Producto, Long> {

    boolean existsByName(String name);
    List<Producto> findByCategory(String category);
    List<Producto> findByCategoryIgnoreCase(String category);

}
