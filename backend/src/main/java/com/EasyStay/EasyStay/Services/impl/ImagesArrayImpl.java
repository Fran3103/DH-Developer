package com.EasyStay.EasyStay.Services.impl;

import com.EasyStay.EasyStay.Entities.ImagesArray;
import com.EasyStay.EasyStay.Repositories.IImagesRepository;
import com.EasyStay.EasyStay.Services.IImagesServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

@Service
public class ImagesArrayImpl implements IImagesServices {

    private IImagesRepository imagesRepository;

    @Autowired
    public ImagesArrayImpl(IImagesRepository imagesRepository) {
        this.imagesRepository = imagesRepository;
    }

    @Override
    public String imageSave(MultipartFile file) throws Exception {
        try {
            //creo un nombre random para el archivo ingresado
            String fileName = UUID.randomUUID().toString();
            // obtengo la cantidad de bytes para despues comparar
            byte[] bytes = file.getBytes();
            //obtengo el nombre original del archivo
            String fileOriginalName = file.getOriginalFilename();

            // obtengo el tamaño del archivo y lo comparo a 9mb si es mayor a eso lanza un error
            Long fileSize = file.getSize();
            Integer maxFileSize = 9 * 1024 * 1024;

            if (fileSize > maxFileSize){
                return "el Archivo no debe ser mayor a 10mb";
            }

            // Verifico la extencion del archivo
            if (!fileOriginalName.endsWith(".jpg")&&
                    !fileOriginalName.endsWith(".jpeg")&&
                    !fileOriginalName.endsWith(".png")&&
                    !fileOriginalName.endsWith(".webp")
            ){
                return "Los archivo deben ser .JPG, .JPEG, .PNG o .WEBP ";
            }

            // extraigo la extension del archivo
            String fileExtension = fileOriginalName.substring(fileOriginalName.lastIndexOf("."));
            //Al nombre nuevo le agrego la extension
            String newFileName = fileName + fileExtension;

            // creo una nueva carperta, y verifico que no exista. si no esta, la crea.
            File folder = new File("images");
            if (!folder.exists()){

                folder.mkdirs();
            }

            // crea el directorio nuevo
            Path path = Paths.get("images/" + newFileName);
            Files.write(path,bytes);

            // devuelvo el nuevo directorio
            return "/images/"+ newFileName ;


        }catch (Exception e){
            throw new Exception(e.getMessage());
        }
    }

    @Override
    public List<ImagesArray> allImages() {
        return imagesRepository.findAll();
    }
}
