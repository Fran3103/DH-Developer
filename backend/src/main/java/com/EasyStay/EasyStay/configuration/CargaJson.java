package com.EasyStay.EasyStay.configuration;

import com.EasyStay.EasyStay.Entities.Caracteristicas;
import com.EasyStay.EasyStay.Entities.Producto;
import com.EasyStay.EasyStay.Entities.Usuarios;
import com.EasyStay.EasyStay.Repositories.ICaracteristicasRepository;
import com.EasyStay.EasyStay.Repositories.IProductoRepository;
import com.EasyStay.EasyStay.Repositories.IUsuarioRepository;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.io.File;
import java.io.IOException;
import java.util.List;

@Configuration
public class CargaJson {


    @Bean
    public CommandLineRunner loadData(IProductoRepository productoRepository, IUsuarioRepository usuarioRepository, ICaracteristicasRepository caracteristicasRepository) {
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
            if (productoRepository.count() == 0  ) {
                //creo un objeo que va a ser mapeado
                ObjectMapper objectMapper = new ObjectMapper();
                try {
                    System.out.println("Intentando leer el archivo JSON...");
                    //creo lista de objeto a ser mapeado
                    List<Producto> productos = objectMapper.readValue(
                            new File("src/main/resources/productos.json"),
                            //se va a mapea un producto desde el json
                            new TypeReference<List<Producto>>() {});

                    System.out.println("Guardando productos en la base de datos...");
                    productoRepository.saveAll(productos);
                    System.out.println("Productos guardados exitosamente.");
                } catch (IOException e) {
                    System.err.println("Error al leer el archivo JSON:");
                    e.printStackTrace();
                } catch (Exception e) {
                    System.err.println("Error inesperado:");
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
