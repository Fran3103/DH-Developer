package com.EasyStay.EasyStay.Services.impl;


import com.EasyStay.EasyStay.Dtos.CategoriaCount;
import com.EasyStay.EasyStay.Entities.Caracteristicas;
import com.EasyStay.EasyStay.Entities.Categorias;
import com.EasyStay.EasyStay.Entities.Producto;
import com.EasyStay.EasyStay.Repositories.IProductoRepository;
import com.EasyStay.EasyStay.Services.IProductoService;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.JoinType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
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
        return productoRepository.findByCategoriasName(category);
    }

    @Override
    public List<Producto> findByCategoryIgnoreCase(String category) {
        return productoRepository.findByCategoriasNameIgnoreCase(category);
    }

    @Override
    public List<CategoriaCount> getCountCategory() {
        return productoRepository.countByCategory();
    }

    @Override
    public Page<Producto> findByFilters(List<String>category, Double minPrice, Double maxPrice, String location, List<Long> caracteristicasIds, Pageable page) {

        Specification<Producto> spec = Specification.where(null);

        if (category != null && !category.isEmpty()) {
            spec = spec.and((root, query, cb) ->{
                query.distinct(true);
                Join<Producto, Categorias> join = root.join("categorias",JoinType.INNER);
                return join.get("name").in(category);
                    });

        }
        if (minPrice != null) {
            spec = spec.and((root, query, cb) ->
                    cb.ge(root.get("price"), minPrice));
        }
        if (maxPrice != null) {
            spec = spec.and((root, query, cb) ->
                    cb.le(root.get("price"), maxPrice));
        }
        if (location != null) {
            spec = spec.and((root, query, cb) ->
                    cb.equal(root.get("location"), location));
        }
        if (caracteristicasIds != null && !caracteristicasIds.isEmpty()) {
            for (Long caractId : caracteristicasIds) {
                spec = spec.and((root, query, cb) -> {

                    query.distinct(true);

                    Join<Producto, Caracteristicas> join = root.join("caracteristicas", JoinType.INNER);
                    return cb.equal(join.get("id"), caractId);
                });
            }
        }

        return productoRepository.findAll(spec, page);

    }
}
