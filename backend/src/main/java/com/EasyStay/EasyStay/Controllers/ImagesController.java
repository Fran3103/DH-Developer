package com.EasyStay.EasyStay.Controllers;

import com.EasyStay.EasyStay.Entities.ImagesArray;
import com.EasyStay.EasyStay.Services.IImagesServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@RestController
@RequestMapping("/images")
@CrossOrigin(origins = "*")
public class ImagesController {

    @Autowired
    private IImagesServices iImagesServices;

    @PostMapping
    public ResponseEntity<String> save(@RequestParam("files") MultipartFile file) throws Exception {
        String result = iImagesServices.imageSave(file);
        if (result.equals("el archivo se subio correctamente")) {
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(result);
        }
    }

    @GetMapping("/{filename}")
    public ResponseEntity<Resource> getImage(@PathVariable String filename) {
        try {
            //creo la ruta combinando el archivo recibido
            Path imagePath = Paths.get("images/").resolve(filename);
            //convierte la ruta de la imagen y crea un objto a devolver
            Resource resource = new UrlResource(imagePath.toUri());
                return ResponseEntity.ok()
                        .body(resource);
            }
         catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping
    public ResponseEntity<List<ImagesArray>> findAll() {
        return ResponseEntity.ok(iImagesServices.allImages());
    }
}
