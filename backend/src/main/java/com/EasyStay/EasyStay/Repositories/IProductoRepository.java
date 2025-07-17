package com.EasyStay.EasyStay.Repositories;

import com.EasyStay.EasyStay.Dtos.CategoriaCount;
import com.EasyStay.EasyStay.Entities.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IProductoRepository extends JpaRepository<Producto, Long>, JpaSpecificationExecutor<Producto> {

    boolean existsByName(String name);
    List<Producto> findByCategory(String category);
    List<Producto> findByCategoryIgnoreCase(String category);

    @Query("""
  SELECT p.category   AS categoria,
         COUNT(p)     AS total
    FROM Producto p
   GROUP BY p.category
  """)
    List<CategoriaCount> countByCategory();

}
