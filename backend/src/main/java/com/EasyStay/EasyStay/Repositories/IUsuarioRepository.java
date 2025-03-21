package com.EasyStay.EasyStay.Repositories;


import com.EasyStay.EasyStay.Entities.Usuarios;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IUsuarioRepository  extends JpaRepository <Usuarios, Long> {

    boolean existsByEmail(String email);

    Optional<Usuarios> findByEmail(String email);
}
