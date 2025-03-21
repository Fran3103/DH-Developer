package com.EasyStay.EasyStay.Controllers;

import com.EasyStay.EasyStay.Entities.Role;
import com.EasyStay.EasyStay.Entities.Usuarios;
import com.EasyStay.EasyStay.Services.IUsuarioServices;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/usuarios")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class UserController {

    private final IUsuarioServices usuarioServices;

    @GetMapping()
    public ResponseEntity<List<Usuarios>> getALL(){
        return ResponseEntity.ok(usuarioServices.findAll());
    }

    @GetMapping("/me")
    public ResponseEntity<Usuarios> getCurrentUser( UserDetails userDetails) {
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        // Obtiene el email del usuario autenticado
        String email = userDetails.getUsername();
        Usuarios user = usuarioServices.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return ResponseEntity.ok(user);
    }

    @PutMapping("/{id}")
    public  ResponseEntity<String> update (
            @PathVariable("id") Long id,
            @RequestParam("role") String role) {
        Optional <Usuarios> usuario1 = usuarioServices.findById(id);

        if(usuario1.isPresent()){
            Usuarios usuario = usuario1.get();
            usuario.setRole(Role.valueOf(role.toUpperCase()));

            usuarioServices.update(usuario);
            return ResponseEntity.ok("Se actualizó el Usuario correctamente");
        }else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se pudo actualizar el Usuario");
        }

    }
}
