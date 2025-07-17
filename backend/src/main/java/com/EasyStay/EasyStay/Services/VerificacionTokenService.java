package com.EasyStay.EasyStay.Services;

import com.EasyStay.EasyStay.Entities.Usuarios;
import com.EasyStay.EasyStay.Entities.VerificacionToken;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Optional;

public interface VerificacionTokenService {

    VerificacionToken createTokenForUser(Usuarios user);
    Optional<VerificacionToken> findByToken (String token);
    Optional<VerificacionToken> findByUsuario (Usuarios usuario);
    boolean isTokenExpired (VerificacionToken token);
    VerificacionToken regenerateToken(VerificacionToken token);


}
