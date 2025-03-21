package com.EasyStay.EasyStay.Repositories;

import com.EasyStay.EasyStay.Entities.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IProductoRepository extends JpaRepository<Producto, Long> {

    boolean existsByName(String name);
}
