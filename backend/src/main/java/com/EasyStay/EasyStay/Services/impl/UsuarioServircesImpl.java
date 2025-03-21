package com.EasyStay.EasyStay.Services.impl;
import com.EasyStay.EasyStay.Entities.Usuarios;
import com.EasyStay.EasyStay.Repositories.IUsuarioRepository;
import com.EasyStay.EasyStay.Services.IUsuarioServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioServircesImpl implements IUsuarioServices {


    private final IUsuarioRepository usuarioRepository;

    @Autowired
    public UsuarioServircesImpl(IUsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    @Override
    public Usuarios save(Usuarios usuarios) {
        return usuarioRepository.save(usuarios);
    }

    @Override
    public Optional<Usuarios> findById(Long id) {
        return usuarioRepository.findById(id);
    }

    @Override
    public Optional<Usuarios> findByEmail(String email) {
        return usuarioRepository.findByEmail(email);
    }

    @Override
    public void update(Usuarios usuarios) {
        usuarioRepository.save(usuarios);
    }

    @Override
    public void delete(Long id) {
        usuarioRepository.deleteById(id);
    }

    @Override
    public List<Usuarios> findAll() {
        return usuarioRepository.findAll();
    }

    @Override
    public boolean existsByEmail(String email) {
        return usuarioRepository.existsByEmail(email);
    }
}
