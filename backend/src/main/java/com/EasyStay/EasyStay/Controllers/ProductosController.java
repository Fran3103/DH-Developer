package com.EasyStay.EasyStay.Controllers;

import com.EasyStay.EasyStay.Entities.Caracteristicas;
import com.EasyStay.EasyStay.Entities.ImagesArray;
import com.EasyStay.EasyStay.Entities.Producto;
import com.EasyStay.EasyStay.Repositories.IImagesRepository;
import com.EasyStay.EasyStay.Services.ICaracteristicasService;
import com.EasyStay.EasyStay.Services.IImagesServices;
import com.EasyStay.EasyStay.Services.IProductoService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/productos")
@CrossOrigin(origins = "*")
public class ProductosController {

    private final IProductoService productoService;
    private final IImagesServices iImagesServices;
    private final IImagesRepository imagenesRepository;
    private  final ICaracteristicasService caracteristicasService;


    @Autowired
    public ProductosController(IProductoService productoService, IImagesServices iImagesServices, IImagesRepository imagenesRepository, ICaracteristicasService caracteristicasService) {
        this.productoService = productoService;
        this.iImagesServices = iImagesServices;
        this.imagenesRepository = imagenesRepository;
        this.caracteristicasService = caracteristicasService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Producto> findById(@PathVariable Long id) {
        Optional<Producto> producto = productoService.findById(id);
        return producto.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<List<Producto>> findAll() {
        return ResponseEntity.ok(productoService.findAll());
    }

    @PostMapping
    public ResponseEntity<?> save(
            @RequestParam("name") String name,
            @RequestParam("category") String category,
            @RequestParam(value = "location", required = false) String location,
            @RequestParam("address") String address,
            @RequestParam(value = "description", required = false) String description,
            @RequestParam("price") Double price,
            @RequestParam(value = "rating", required = false) Integer rating,
            @RequestParam(value = "quality", required = false) String quality,
            @RequestParam("caracteristicas") String caracteristicas,
            @RequestParam(value = "files" ) MultipartFile[] files) {

        // Verifica si ya existe un producto con el mismo nombre
        if (productoService.existsByName(name)) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Ya existe un producto con ese nombre");  // Retorna un error 409 si el producto ya existe
        }



        // Primero, guarda el producto en la base de datos

        Producto producto = new Producto();

        producto.setName(name);
        producto.setCategory(category);
        producto.setLocation(location);
        producto.setAddress(address);
        producto.setPrice(price);
        producto.setRating(rating);
        producto.setQuality(quality);
        producto.setDescription(description);



        ObjectMapper mapper = new ObjectMapper();
        List<Long> caracteristicasIds;
        try {
            caracteristicasIds = mapper.readValue(caracteristicas, new TypeReference<List<Long>>() {});
        } catch (JsonProcessingException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error al procesar las características");
        }
        // Luego, guarda las imágenes relacionadas con el producto
        List<Caracteristicas> caracteristicasList = caracteristicasService.findAllIds(caracteristicasIds);
        producto.setCaracteristicas(caracteristicasList);
        productoService.save(producto);
        List<ImagesArray> images = new ArrayList<>();
        for (MultipartFile file : files) {
            try {
                String imageUrl = iImagesServices.imageSave(file);  // Aquí se espera que retorne la URL o la ruta de la imagen

                ImagesArray image = new ImagesArray();
                image.setUrl(imageUrl);  // Establece la URL o ruta de la imagen
                image.setProducto(producto);  // Establece la relación con el producto
                images.add(image);
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al Guardar imagen");  // Maneja errores en la subida de imágenes
            }
        }
        imagenesRepository.saveAll(images);  // Guarda las imágenes en la base de datos

        return ResponseEntity.ok(producto);
    }


    @PutMapping
    public ResponseEntity<String> update(
            @RequestParam("id") Long id,
            @RequestParam("name") String name,
            @RequestParam("category") String category,
            @RequestParam("location") String location,
            @RequestParam("address") String address,
            @RequestParam("price") Double price,
            @RequestParam("description") String description,
            @RequestParam("rating") Integer rating,
            @RequestParam("quality") String quality,
            @RequestParam("caracteristicas") String caracteristicas,
            @RequestParam(value = "files", required = false) MultipartFile[] files) {

        ObjectMapper mapper = new ObjectMapper();
        List<Long> caracteristicasIds;
        try {
            caracteristicasIds = mapper.readValue(caracteristicas, new TypeReference<List<Long>>() {});
        } catch (JsonProcessingException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error al procesar las características");
        }
        Optional<Producto> producto1 = productoService.findById(id);

        if (producto1.isPresent()) {
            Producto producto = producto1.get();
            producto.setName(name);
            producto.setCategory(category);
            producto.setLocation(location);
            producto.setAddress(address);
            producto.setPrice(price);
            producto.setRating(rating);
            producto.setDescription(description);
            producto.setQuality(quality);


            if (files != null && files.length > 0) {
                // Procesa las imágenes y actualiza el producto si es necesario
            }
            List<Caracteristicas> caracteristicasList = caracteristicasService.findAllIds(caracteristicasIds);
            producto.setCaracteristicas(caracteristicasList);
            productoService.update(producto);
            return ResponseEntity.ok("Se actualizó el Producto correctamente");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se pudo actualizar el Producto");
        }
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        productoService.delete(id);
        return ResponseEntity.ok("Se eliminó el Producto con el id: " + id);
    }
}
