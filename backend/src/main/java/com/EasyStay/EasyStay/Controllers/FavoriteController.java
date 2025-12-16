package com.EasyStay.EasyStay.Controllers;

import com.EasyStay.EasyStay.Entities.Usuarios;
import com.EasyStay.EasyStay.Repositories.IUsuarioRepository;
import com.EasyStay.EasyStay.Services.IFavoriteService;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("usuarios/me/favorites")
@CrossOrigin(origins = "*")
public class FavoriteController {

    private final IFavoriteService favoriteService;
    private final IUsuarioRepository usuarioRepository;

    public FavoriteController(IFavoriteService favoriteService, IUsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
        this.favoriteService = favoriteService;

    }

    private Long getCurrentUserId() {
        // Aquí deberías implementar la lógica para obtener el ID del usuario autenticado
        // Por ejemplo, podrías usar Spring Security para obtener el usuario actual
        // y luego buscar su ID en la base de datos.

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !auth.isAuthenticated() || "anonymousUser".equals(auth.getPrincipal())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED,"Usuario no autenticado");
        }

        Object p = auth.getPrincipal();

        if (p instanceof UserDetails ud){
            return usuarioRepository.findByEmail(ud.getUsername())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,"Usuario no encontrado"))
                .getId();
        }

        if (p instanceof String email){
            return usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,"Usuario no encontrado"))
                .getId();
        }
       if (p instanceof Usuarios u){
            return u.getId();
       }

        throw new ResponseStatusException(HttpStatus.UNAUTHORIZED,"Usuario no autenticado" + p.getClass().getName());
    }


    @GetMapping("/all")
    public ResponseEntity<List<Long>> getIds() {
        Long userId = getCurrentUserId();
       return ResponseEntity.ok(favoriteService.getFavoriteProductIds(userId));
    }

    @PostMapping("/{productoId}")
    public ResponseEntity<Void> addFavorite(@PathVariable Long productoId) {
        Long userId = getCurrentUserId();
        favoriteService.addFavorite(userId, productoId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{productoId}")
    public ResponseEntity<Void> removeFavorite(@PathVariable Long productoId) {
        Long userId = getCurrentUserId();
        favoriteService.removeFavorite(userId, productoId);
        return ResponseEntity.ok().build();
    }
}
