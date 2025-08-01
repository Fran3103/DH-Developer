package com.EasyStay.EasyStay.configuration;

import com.EasyStay.EasyStay.Dtos.ProductoSeed;
import com.EasyStay.EasyStay.Entities.*;
import com.EasyStay.EasyStay.Repositories.ICaracteristicasRepository;
import com.EasyStay.EasyStay.Repositories.ICategoriasRepository;
import com.EasyStay.EasyStay.Repositories.IProductoRepository;
import com.EasyStay.EasyStay.Repositories.IUsuarioRepository;
import com.EasyStay.EasyStay.Repositories.IImagesRepository;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Configuration
public class CargaJson {


    @Bean
    public CommandLineRunner loadData(IProductoRepository productoRepository, IUsuarioRepository usuarioRepository, ICaracteristicasRepository caracteristicasRepository, ICategoriasRepository categoriasRepository, IImagesRepository imagesArray) {
        //commandlinerunner ejecuca el codigo al inicio de la app.
        return args -> {
            //verifico que el repositorio este vacio


            if (caracteristicasRepository.count() == 0  ) {
                //creo un objeo que va a ser mapeado
                ObjectMapper objectMapper = new ObjectMapper();
                try {
                    System.out.println("Intentando leer el archivo JSON  de Caracteristicas...");
                    //creo lista de objeto a ser mapeado
                    List<Caracteristicas> caracteristicas = objectMapper.readValue(
                            new File("src/main/resources/caracteristicas.json"),
                            //se va a mapea un producto desde el json
                            new TypeReference<List<Caracteristicas>>() {});

                    System.out.println("Guardando productos en la base de datos...");
                    caracteristicasRepository.saveAll(caracteristicas);
                    System.out.println("Caracteristicas guardados exitosamente.");
                } catch (IOException e) {
                    System.err.println("Error al leer el archivo JSON:");
                    e.printStackTrace();
                } catch (Exception e) {
                    System.err.println("Error inesperado:");
                    e.printStackTrace();
                }
            }
            if (categoriasRepository.count() == 0  ) {
                //creo un objeo que va a ser mapeado
                ObjectMapper objectMapper = new ObjectMapper();
                try {
                    System.out.println("Intentando leer el archivo JSON  de Categorias...");
                    //creo lista de objeto a ser mapeado
                    List<Categorias> categorias = objectMapper.readValue(
                            new File("src/main/resources/categorias.json"),
                            //se va a mapea un producto desde el json
                            new TypeReference<List<Categorias>>() {});

                    System.out.println("Guardando productos en la base de datos...");
                    categoriasRepository.saveAll(categorias);
                    System.out.println("Categorias guardados exitosamente.");
                } catch (IOException e) {
                    System.err.println("Error al leer el archivo JSON:");
                    e.printStackTrace();
                } catch (Exception e) {
                    System.err.println("Error inesperado:");
                    e.printStackTrace();
                }
            }
            if (productoRepository.count() == 0) {
                ObjectMapper mapper = new ObjectMapper();
                try {
                    // 1) Leer como lista de DTOs
                    List<ProductoSeed> seeds = mapper.readValue(
                            new File("src/main/resources/productos.json"),
                            new TypeReference<List<ProductoSeed>>() {}
                    );

                    List<Producto> entidades = new ArrayList<>();
                    for (ProductoSeed seed : seeds) {
                        Producto p = new Producto();
                        p.setId(seed.id);
                        p.setName(seed.name);
                        p.setAddress(seed.address);
                        p.setQuality(seed.quality);
                        p.setRating(seed.rating);
                        p.setPrice(seed.price);
                        p.setLocation(seed.location);
                        p.setDescription(seed.description);

                        p.setImages(new ArrayList<>());


                        for (ImagesArray imgDto : seed.images) {
                            ImagesArray img = new ImagesArray();
                            img.setUrl(imgDto.getUrl());
                            img.setProducto(p);
                            p.getImages().add(img);
                        }

                        // 2) Mapear categorías por ID
                        for (Long catId : seed.categorias) {
                            categoriasRepository.findById(catId)
                                    .ifPresent(p.getCategorias()::add);
                        }

                        // 3) Mapear características por ID
                        for (Long featId : seed.caracteristicas) {
                            caracteristicasRepository.findById(featId)
                                    .ifPresent(p.getCaracteristicas()::add);
                        }

                        entidades.add(p);
                    }

                    productoRepository.saveAll(entidades);
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
            //Verifica si la BD esta vacia
            if (usuarioRepository.count() == 0){
                ObjectMapper objectMapper = new ObjectMapper();
                BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
                try{
                    System.out.println("Intentado leer el archivo users.json...");
                    List<Usuarios> usuarios = objectMapper.readValue(
                            new File("src/main/resources/users.json"),
                            new TypeReference<List<Usuarios>>() {}
                    );
                    for (Usuarios usuario : usuarios ){
                        String rawPassword = usuario.getPassword();
                        String encryptedPassword = passwordEncoder.encode(rawPassword);
                        usuario.setPassword(encryptedPassword);
                    }

                    usuarioRepository.saveAll(usuarios);
                    System.out.println("Usuarios Guardados Exitosamente");
                }catch (IOException e){
                    System.err.println("Error al leer users.json: ");
                    e.printStackTrace();
                }catch (Exception e){
                    System.err.println("Error inesperado al cargar usuarios: ");
                    e.printStackTrace();
                }
            }
        };
    }

}
