package com.EasyStay.EasyStay.Services;

import com.EasyStay.EasyStay.Entities.Caracteristicas;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Optional;

@Service
public interface ICaracteristicasService {

    List<Caracteristicas> allCaracteristicas() ;
    Optional<Caracteristicas> findById (Long id);
    void delete(Long id);

    Caracteristicas save(Caracteristicas caracteristicas);

    Optional <Caracteristicas> findByName(String name);

    void update(Caracteristicas caracteristica);
}
