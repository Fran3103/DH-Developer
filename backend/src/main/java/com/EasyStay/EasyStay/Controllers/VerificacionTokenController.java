package com.EasyStay.EasyStay.Controllers;

import com.EasyStay.EasyStay.Entities.Usuarios;
import com.EasyStay.EasyStay.Entities.VerificacionToken;
import com.EasyStay.EasyStay.Services.EmailService;
import com.EasyStay.EasyStay.Services.IUsuarioServices;
import com.EasyStay.EasyStay.Services.VerificacionTokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
public class VerificacionTokenController {


    @Autowired
    private VerificacionTokenService tokenService;

    @Autowired
    private IUsuarioServices usuarioServices;

    @Autowired
    private EmailService emailService;

    @GetMapping("/verify")
    public ResponseEntity<String> verifyUser(@RequestParam String token){
        Optional<VerificacionToken> optionalToken = tokenService.findByToken(token);

        if (optionalToken.isEmpty()){
            return ResponseEntity.badRequest().body("Token invalido");
        }

        VerificacionToken verificacionToken = optionalToken.get();

        if (tokenService.isTokenExpired(verificacionToken)){
            return ResponseEntity.status(HttpStatus.GONE).body("El token a expirado");
        }


        Usuarios usuario = verificacionToken.getUsuario();
        usuario.setEnabled(true);
        usuarioServices.update(usuario);


        return ResponseEntity.ok("Cuenta verificada correctamente. Ya podes iniciar sesion");
    }


    @PostMapping("/resend-verification")
    public ResponseEntity<String> resendVerification(@RequestBody Map<String, String> body){

        String email = body.get("email");

        System.out.println("Este es el email que se registro: " + email);
        Optional<Usuarios> optionalUsuario = usuarioServices.findByEmail(email);

        if (optionalUsuario.isEmpty()){
            return ResponseEntity.badRequest().body("El Email no esta registrado");
        }

        Usuarios usuario = optionalUsuario.get();

//        if (usuario.isEnabled()){
//            return  ResponseEntity.badRequest().body("El usuario ya esta verificado");
//        }

        VerificacionToken token = tokenService.findByUsuario(usuario).map(tokenService::regenerateToken).orElseGet(()-> tokenService.createTokenForUser(usuario));

        String verificationLink = "http://localhost:3000/verificar?token=" + token.getToken();

        emailService.sendVerificationEmail(usuario.getEmail(),usuario.getName(), verificationLink);

        return  ResponseEntity.ok("Se ha reenviado el correo de verificacion");
    }

}
