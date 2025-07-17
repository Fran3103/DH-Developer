package com.EasyStay.EasyStay.Repositories;

import com.EasyStay.EasyStay.Entities.Usuarios;
import com.EasyStay.EasyStay.Entities.VerificacionToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface VerificacionTokenReposity extends JpaRepository<VerificacionToken, Long> {

    Optional<VerificacionToken> findByToken(String token);

    Optional<VerificacionToken> findByUsuario(Usuarios usuario);
}
