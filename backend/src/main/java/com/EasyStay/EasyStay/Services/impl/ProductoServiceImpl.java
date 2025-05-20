package com.EasyStay.EasyStay.Services.impl;


import com.EasyStay.EasyStay.Entities.Producto;
import com.EasyStay.EasyStay.Repositories.IProductoRepository;
import com.EasyStay.EasyStay.Services.IProductoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@Service
public class ProductoServiceImpl implements IProductoService {

    private IProductoRepository productoRepository;

    @Autowired
    public ProductoServiceImpl(IProductoRepository productoService) {
        this.productoRepository = productoService;
    }




    @Override
    public Producto save(Producto producto){
        return productoRepository.save(producto);
    }

    @Override
    public Optional<Producto> findById(Long id){
        return productoRepository.findById(id);
    }

    @Override
    public void update(Producto producto) {
        productoRepository.save(producto);
    }

    @Override
    public void delete(Long id) {

        productoRepository.deleteById(id);

    }

    @Override
    public List<Producto> findAll(){
       return productoRepository.findAll();
    }

    @Override
    public boolean existsByName(String name) {
        return productoRepository.existsByName(name);
    }

    @Override
    public List<Producto> findByCategory(String category) {
        return productoRepository.findByCategory(category);
    }

    @Override
    public List<Producto> findByCategoryIgnoreCase(String category) {
        return productoRepository.findByCategoryIgnoreCase(category);
    }
}
