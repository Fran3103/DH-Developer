package com.EasyStay.EasyStay.Services.impl;

import com.EasyStay.EasyStay.Entities.Caracteristicas;
import com.EasyStay.EasyStay.Entities.Producto;
import com.EasyStay.EasyStay.Repositories.ICaracteristicasRepository;
import com.EasyStay.EasyStay.Services.ICaracteristicasService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
public class CaracteristicasImpl implements ICaracteristicasService {

    private final ICaracteristicasRepository caracteristicasRepository;

    public CaracteristicasImpl(ICaracteristicasRepository caracteristicasRepository) {
        this.caracteristicasRepository = caracteristicasRepository;
    }

    @Override
    public List<Caracteristicas> allCaracteristicas() {
        return caracteristicasRepository.findAll();
    }

    @Override
    public Optional<Caracteristicas> findById(Long id) {
        return caracteristicasRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        Caracteristicas caracteristica = caracteristicasRepository.findById(id)
                .orElseThrow(()-> new RuntimeException("Caracteristica no encontrada"));
        
        for (Producto producto : caracteristica.getProductos()){
            producto.getCaracteristicas().remove(caracteristica);
        }
        
        caracteristica.getProductos().clear();
        caracteristicasRepository.delete(caracteristica);
    }

    @Override
    public Caracteristicas save(Caracteristicas caracteristicas) {
        return caracteristicasRepository.save(caracteristicas);
    }

    @Override
    public Optional<Caracteristicas> findByName(String name) {
        return caracteristicasRepository.findByName(name);
    }

    @Override
    public void update(Caracteristicas caracteristica) {
        caracteristicasRepository.save(caracteristica);
    }

    ;
}