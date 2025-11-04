package com.EasyStay.EasyStay.Controllers;

import com.EasyStay.EasyStay.Dtos.BookingDTO;
import com.EasyStay.EasyStay.Dtos.CategoriaCount;
import com.EasyStay.EasyStay.Entities.Caracteristicas;
import com.EasyStay.EasyStay.Entities.Categorias;
import com.EasyStay.EasyStay.Entities.ImagesArray;
import com.EasyStay.EasyStay.Entities.Producto;
import com.EasyStay.EasyStay.Repositories.IImagesRepository;
import com.EasyStay.EasyStay.Services.*;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.validation.GroupSequence;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

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
    private  final ICategoriaService categoriaService;
    private final AvailabilityService availabilityService;

    @Autowired
    public ProductosController(IProductoService productoService, IImagesServices iImagesServices, IImagesRepository imagenesRepository, ICaracteristicasService caracteristicasService, ICategoriaService categoriaService, AvailabilityService availabilityService) {
        this.productoService = productoService;
        this.iImagesServices = iImagesServices;
        this.imagenesRepository = imagenesRepository;
        this.caracteristicasService = caracteristicasService;
        this.categoriaService = categoriaService;
        this.availabilityService = availabilityService;
    }




    @GetMapping("/{id}")
    public ResponseEntity<Producto> findById(@PathVariable Long id) {
        Optional<Producto> producto = productoService.findById(id);
        return producto.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping({"/categoria/{category}"})
    public ResponseEntity<List<Producto>> findCategory(@PathVariable String category){

        List<Producto> productos = productoService.findByCategoryIgnoreCase(category);
        System.out.println("Buscando productos en categoría: " + category);
        if (productos.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(productos);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Producto>> findAll() {
        return ResponseEntity.ok(productoService.findAll());
    }

    @GetMapping("/filter")
    public ResponseEntity<Page<Producto>> list(
            @RequestParam(value="category", required=false) List<String> category,
            @RequestParam(value="minPrice", required=false) Double minPrice,
            @RequestParam(value="maxPrice", required=false) Double maxPrice,
            @RequestParam(value="location", required=false) String location,
            @RequestParam(value="feature", required=false) List<Long> caracteristicasIds,
            Pageable page
    ){
        Page<Producto> filters = productoService.findByFilters(category, minPrice, maxPrice, location, caracteristicasIds, page);
        System.out.println("Filtro recibido → categories: "
                + category + ", features: " + caracteristicasIds + " Location: " + location);
        return ResponseEntity.ok(filters);
    }

    @GetMapping("/categorias")
    public ResponseEntity<List<CategoriaCount>> listarCategoriasConTotales(){
        var lista = productoService.getCountCategory();
        return ResponseEntity.ok(lista);
    }

    @PostMapping
    public ResponseEntity<?> save(
            @RequestParam("name") String name,
            @RequestParam("categoria") Long categoria,
            @RequestParam(value = "location", required = false) String location,
            @RequestParam("address") String address,
            @RequestParam(value = "description", required = false) String description,
            @RequestParam("price") Double price,
            @RequestParam(value = "rating", required = false) Integer rating,
            @RequestParam(value = "quality", required = false) String quality,
            @RequestParam(value = "caracteristicas", required = false) List<Long> caracteristicas,
            @RequestParam(value = "files" ) MultipartFile[] files) {

        // Verifica si ya existe un producto con el mismo nombre
        if (productoService.existsByName(name)) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Ya existe un producto con ese nombre");  // Retorna un error 409 si el producto ya existe
        }


        List<Caracteristicas> feats = caracteristicasService.findAllIds(caracteristicas);
        // Primero, guarda el producto en la base de datos

        Producto producto = new Producto();

        producto.setName(name);
        producto.setLocation(location);
        producto.setAddress(address);
        producto.setPrice(price);
        producto.setRating(rating);
        producto.setQuality(quality);
        producto.setDescription(description);
        producto.setCaracteristicas(feats);

       // ObjectMapper mapper = new ObjectMapper();
/*
        List<Long> categorias;
        try {
            categorias = mapper.readValue(categoria.toString(), new TypeReference<List<Long>>() {});
        } catch (JsonProcessingException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error al procesar las características");
        }*/
        // Luego, guarda las imágenes relacionadas con el producto
        Optional<Categorias> categoriasList = categoriaService.findById(categoria);
        producto.setCategorias(categoriasList.stream().toList());
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


    @PutMapping("/{id}")
    public ResponseEntity<String> update(
            @PathVariable("id") Long id,
            @RequestParam("name") String name,
            @RequestParam("categoria") Long categoria,
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

        Categorias cat = categoriaService.findById(categoria).orElseThrow(()-> new ResponseStatusException(HttpStatus.NOT_FOUND));

        System.out.printf("Categoria", categoria);
        if (producto1.isPresent()) {
            Producto producto = producto1.get();
            producto.setName(name);
            producto.setLocation(location);
            producto.setAddress(address);
            producto.setPrice(price);
            producto.setRating(rating);
            producto.setDescription(description);
            producto.setQuality(quality);
            producto.setCategorias(new ArrayList<>(List.of(cat)));

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


    @GetMapping("/{id}/availability")
    public ResponseEntity<?> getAvailability(@PathVariable Long id) {

        // validación básica: ¿existe el producto?
        if (productoService.findById(id).isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Producto no encontrado");
        }

        try {
            List<BookingDTO> booked = availabilityService.getBookedDatesForProduct(id);
            return ResponseEntity.ok(booked);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("No se pudo obtener disponibilidad");
        }
    }

}
