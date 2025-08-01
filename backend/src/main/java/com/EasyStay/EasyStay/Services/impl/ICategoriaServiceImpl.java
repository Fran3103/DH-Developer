package com.EasyStay.EasyStay.Services.impl;

import com.EasyStay.EasyStay.Entities.Categorias;
import com.EasyStay.EasyStay.Repositories.ICategoriasRepository;
import com.EasyStay.EasyStay.Services.ICategoriaService;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.UUID;

@Slf4j
@Service
public class ICategoriaServiceImpl implements ICategoriaService {

    @Autowired
    private ICategoriasRepository repository;

    @Value("${app.upload.dir:imagesCategorias}")
    private String uploadDir;


    @Override
    public List<Categorias> allCategorias() {
        return repository.findAll();
    }

    @Override
    public Optional<Categorias> findById(Long id) {
        return repository.findById(id);
    }

    @Override
    public List<Categorias> findAllIds(List<Long> ids) {
        return repository.findAllById(ids);
    }

    @Override
    public void delete(Long id) {
        repository.deleteById(id);
    }

    @Override
    public String imageCategoriaSave(MultipartFile file) throws Exception {

            //creo un nombre random para el archivo ingresado
            String originalName = Objects.requireNonNull(file.getOriginalFilename());

            // obtengo el tamaño del archivo y lo comparo a 9mb si es mayor a eso lanza un error
            Long fileSize = file.getSize();
            Long maxFileSize = 10L * 1024 * 1024; //10mb

            if (fileSize > maxFileSize){
                return "el Archivo no debe ser mayor a 10mb";
            }

            // Verifico la extencion del archivo
           String ext = originalName.substring(originalName.lastIndexOf(".")).toLowerCase();
            if (!List.of(".jpg",".jpeg",".png",".webp").contains(ext)){
                throw new IOException("Solo se permiten JPG, JPEG, PNG, o WEBP");
            }

            //Nuevo nombre ramdom mas su extension
            String newName = UUID.randomUUID() + ext;

         //Directorio

            Path uploadPath = Paths.get(uploadDir).toAbsolutePath().normalize();

            //Crea si no existe
        log.info("✨ Guardando imágenes en: {}", uploadPath);
        System.out.printf("✨ Guardando imágenes en: %s%n  ", uploadPath);

            if (Files.notExists(uploadPath)){
             boolean created =   Files.createDirectories(uploadPath).toFile().exists();
                log.info("Carpeta creada ?? {}", created);
                System.out.printf("Carpeta creada: %b%n ", created);
            }



            Path target = uploadPath.resolve(newName);
            file.transferTo(target.toFile());


            return "/imagesCategorias/"+ newName;

    }

    @Override
    public Categorias save(Categorias categorias) {
        return repository.save(categorias);
    }

    @Override
    public Optional<Categorias> findByName(String name) {
        return repository.findByName(name);
    }

    @Override
    public Categorias update(Categorias categorias) {
            return repository.save(categorias);
    }
}
