package com.EasyStay.EasyStay.Services;



import com.EasyStay.EasyStay.Entities.Categorias;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@Service
public interface ICategoriaService {


    List<Categorias> allCategorias();
    Optional<Categorias> findById (Long id);
    List<Categorias> findAllIds(List<Long> ids);
    void delete(Long id);
    String imageCategoriaSave (MultipartFile file ) throws Exception;
    Categorias save(Categorias categorias);
    Optional <Categorias> findByName(String name);

    Categorias update(Categorias categorias);

}
