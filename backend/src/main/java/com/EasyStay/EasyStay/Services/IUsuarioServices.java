package com.EasyStay.EasyStay.Services;

import com.EasyStay.EasyStay.Entities.Usuarios;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public interface IUsuarioServices  {


    Usuarios save (Usuarios usuarios );

    Optional<Usuarios> findById (Long id);
    Optional<Usuarios> findByEmail (String email);
    void update(Usuarios usuarios);

    void delete(Long id);

    List<Usuarios> findAll();
    boolean existsByEmail(String email);


}
