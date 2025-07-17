package com.EasyStay.EasyStay.Services.impl;

import com.EasyStay.EasyStay.Entities.Usuarios;
import com.EasyStay.EasyStay.Entities.VerificacionToken;
import com.EasyStay.EasyStay.Repositories.VerificacionTokenReposity;
import com.EasyStay.EasyStay.Services.VerificacionTokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Service
public class VerificacionTokenServiceImpl implements VerificacionTokenService {


    @Autowired
    private VerificacionTokenReposity reposity;



    @Override
    public VerificacionToken createTokenForUser(Usuarios user) {
        VerificacionToken token = new VerificacionToken(user);
        return reposity.save(token);
    }

    @Override
    public Optional<VerificacionToken> findByToken(String token) {
        return reposity.findByToken(token);
    }

    @Override
    public Optional<VerificacionToken> findByUsuario(Usuarios usuario) {
        return reposity.findByUsuario(usuario);
    }

    @Override
    public boolean isTokenExpired(VerificacionToken token) {
        return token.getExpiresAt().isBefore(LocalDateTime.now());
    }

    @Override
    public VerificacionToken regenerateToken(VerificacionToken token) {

        token.setToken(UUID.randomUUID().toString());
        token.setCreatedAt(LocalDateTime.now());
        token.setExpiresAt(LocalDateTime.now().plusMinutes(30));
        return reposity.save(token);
    }
}
