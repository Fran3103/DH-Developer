package com.EasyStay.EasyStay.Repositories;

import com.EasyStay.EasyStay.Entities.Caracteristicas;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ICaracteristicasRepository extends JpaRepository<Caracteristicas, Long> {
    Optional<Caracteristicas> findByName(String name);
}
