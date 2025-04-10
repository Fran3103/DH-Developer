package com.EasyStay.EasyStay.Controllers;


import com.EasyStay.EasyStay.Entities.Caracteristicas;
import com.EasyStay.EasyStay.Entities.Producto;
import com.EasyStay.EasyStay.Services.ICaracteristicasService;
import com.EasyStay.EasyStay.Services.IProductoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/caracteristicas")
@CrossOrigin(origins = "*")
public class CaracteristicasController {

    @Autowired
    private ICaracteristicasService caracteristicasService;
    @Autowired
    private IProductoService productoService;

    @Autowired
    public CaracteristicasController(ICaracteristicasService caracteristicasService, IProductoService productoService) {
        this.caracteristicasService = caracteristicasService;
        this.productoService = productoService;
    }

    @PostMapping
    public ResponseEntity<?> save(@RequestBody Caracteristicas caracteristicas){

        if (caracteristicasService.findByName(caracteristicas.getName()).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("La caracteristica ya exite");  // Retorna un error 409 si el producto ya existe
        }

        Caracteristicas nuevaCaracteristica = caracteristicasService.save(caracteristicas);



        return ResponseEntity.status(HttpStatus.CREATED).body(nuevaCaracteristica);

    }

    @GetMapping
    public ResponseEntity<List<Caracteristicas>> findAll(){
        return ResponseEntity.ok(caracteristicasService.allCaracteristicas());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Caracteristicas> findById(@PathVariable Long id){
        Optional<Caracteristicas> caracteristica = caracteristicasService.findById(id);
        return caracteristica.map(ResponseEntity::ok).orElseGet(()-> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id){
        caracteristicasService.delete(id);
        return ResponseEntity.ok("Se elimino correctamente" + id);
    }

    @PostMapping("/producto/{productoId}/add")
    public ResponseEntity<?> addCaracteristicaToProducto(@PathVariable Long productoId, @RequestParam Long caracteristicaId) {

        Optional<Producto> productoOptional = productoService.findById(productoId);
        Optional<Caracteristicas> caracteristicaOptional = caracteristicasService.findById(caracteristicaId);

        if (productoOptional.isPresent() && caracteristicaOptional.isPresent()) {
            Producto producto = productoOptional.get();
            Caracteristicas caracteristica = caracteristicaOptional.get();

            if (producto.getCaracteristicas().contains(caracteristica)) {
                return ResponseEntity.status(HttpStatus.CONFLICT).body("La característica ya está asociada al producto.");
            }

            // Añadir la característica al producto
            producto.getCaracteristicas().add(caracteristica);

            // Guardar el producto actualizado
            productoService.save(producto);

            return ResponseEntity.ok(producto);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @PutMapping
    public ResponseEntity<String> update(
            @RequestParam("id") Long id,
            @RequestParam("name") String name,
            @RequestParam("icono")String icono){

        Optional<Caracteristicas> caracteristica1 = caracteristicasService.findById(id);

        if (caracteristica1.isPresent()) {
            Caracteristicas caracteristica = caracteristica1.get();
            caracteristica.setName(name);
            caracteristica.setIcono(icono);

            caracteristicasService.update(caracteristica);
            return ResponseEntity.ok("Se actualizó la caracteristica  correctamente");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se pudo actualizar la caracteristica");
        }
    }


    @DeleteMapping("/producto/{productoId}/remove/{caracteristicaId}")
    public ResponseEntity<String> removeCaracteristicaFromProducto(@PathVariable Long productoId, @PathVariable Long caracteristicaId) {
        Optional<Producto> productoOptional = productoService.findById(productoId);
        Optional<Caracteristicas> caracteristicaOptional = caracteristicasService.findById(caracteristicaId);

        if (productoOptional.isPresent() && caracteristicaOptional.isPresent()) {
            Producto producto = productoOptional.get();
            Caracteristicas caracteristica = caracteristicaOptional.get();

            // Eliminar la característica del producto
            producto.getCaracteristicas().remove(caracteristica);

            // Guardar el producto actualizado
            productoService.save(producto);

            return ResponseEntity.ok("Característica eliminada del producto");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Producto o característica no encontrados");
        }
    }
}
