package com.EasyStay.EasyStay.Controllers;

import com.EasyStay.EasyStay.Dtos.CategoriasDto;
import com.EasyStay.EasyStay.Dtos.CategoriasUpdateDto;
import com.EasyStay.EasyStay.Entities.Categorias;
import com.EasyStay.EasyStay.Entities.Producto;
import com.EasyStay.EasyStay.Services.ICategoriaService;
import com.EasyStay.EasyStay.Services.IProductoService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/categorias")
@CrossOrigin(origins = "*")
public class CategoriasController {


    @Autowired
    private ICategoriaService categoriaService;

    @Autowired
    private IProductoService productoService;
    private static final Logger log = LoggerFactory.getLogger(CategoriasController.class);

    @PostMapping(
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> save(@ModelAttribute CategoriasDto dto) throws Exception {

        log.info("🆕 Intentando crear categoría con nombre: “{}”", dto.getName());
        if ( categoriaService.findByName(dto.getName().trim()).isPresent()){
            return ResponseEntity.status(HttpStatus.CONFLICT).body("La Categoria " + dto.getName() + " ya existe");
        }
        log.info("🔍 findByName retornó: {}", dto.getName());
        String imageUrl = categoriaService.imageCategoriaSave(dto.getImage());
        Categorias c = new Categorias(dto.getName().trim(), dto.getDescription(), imageUrl);
        Categorias nuevaCategoria = categoriaService.save(c);
        return ResponseEntity.status(HttpStatus.CREATED).body(nuevaCategoria);
    }

    @GetMapping
    public ResponseEntity<List<Categorias>> findAll(){
        return ResponseEntity.ok(categoriaService.allCategorias());
    }


    @GetMapping("/{id}")
    public ResponseEntity<Categorias> findById(@PathVariable  Long id){
        Optional<Categorias> categorias = categoriaService.findById(id);
        return  categorias.map(ResponseEntity::ok).orElseGet(()-> ResponseEntity.notFound().build());
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id){
        categoriaService.delete(id);
        return ResponseEntity.ok("Se elimino correctamente");
    }



    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Categorias> update(
            @PathVariable Long id,
            @ModelAttribute CategoriasUpdateDto dto) throws Exception {

        Categorias categorias1 = categoriaService.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        System.out.printf("Se edita esto: %s%n", dto);
        log.debug("Se edita esto: {}", dto);

        categorias1.setName(dto.getName());
        categorias1.setDescription(dto.getDescription());

        MultipartFile file = dto.getImage();
        if (file != null && !file.isEmpty()){
            String fileName = categoriaService.imageCategoriaSave(file);
            categorias1.setImage(fileName);
        }

        Categorias nuevaCategoria = categoriaService.save(categorias1);

        return ResponseEntity.ok(nuevaCategoria);
    }



    @PostMapping("/producto/{productoId}/categoria/{categoriaId}")
    public ResponseEntity<?> addCategoriaToProducto(@PathVariable Long productoId, @PathVariable Long categoriaId) {

       Producto p = productoService.findById(productoId).orElseThrow(()-> new ResponseStatusException(HttpStatus.NOT_FOUND));

       Categorias c = categoriaService.findById(categoriaId).orElseThrow(()-> new ResponseStatusException(HttpStatus.NOT_FOUND));

       if(!p.getCategorias().contains(c)){
           p.getCategorias().add(c);
           productoService.save(p);
       }

        return ResponseEntity.ok(p);

    }

    @DeleteMapping("/producto/{productoId}/categoria/{categoriaId}")
    public ResponseEntity<?> deleteCategoriaToProducto(@PathVariable Long productoId, @PathVariable Long categoriaId) {

        Producto p = productoService.findById(productoId).orElseThrow(()-> new ResponseStatusException(HttpStatus.NOT_FOUND));

        Categorias c = categoriaService.findById(categoriaId).orElseThrow(()-> new ResponseStatusException(HttpStatus.NOT_FOUND));

        if(p.getCategorias().contains(c)){
            p.getCategorias().remove(c);
            productoService.save(p);
        }

        return ResponseEntity.ok(p);

    }

}
