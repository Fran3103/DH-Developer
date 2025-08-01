package com.EasyStay.EasyStay.Repositories;


import com.EasyStay.EasyStay.Entities.Categorias;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ICategoriasRepository extends JpaRepository<Categorias, Long > {
    Optional<Categorias> findByName(String name);
}
