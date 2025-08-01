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
    List<Producto> findByCategoriasName(String name);
    List<Producto> findByCategoriasNameIgnoreCase(String name);

    @Query("""
  SELECT c.name  AS category,
         COUNT(p)     AS total
    FROM Producto p
    JOIN p.categorias c
   GROUP BY c.name
  """)
    List<CategoriaCount> countByCategory();

}
