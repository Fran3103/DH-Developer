package com.EasyStay.EasyStay.Auth;

import com.EasyStay.EasyStay.Entities.Usuarios;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AuthenticationController {


    private final AuthenticationService authenticationService;


    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register (@RequestBody RegisterRequest request){
        
       try {
           AuthenticationResponse response = authenticationService.register(request);
           return ResponseEntity.ok(response);
       }catch (ResponseStatusException e){
           return ResponseEntity.status(e.getStatusCode()).body(new AuthenticationResponse(e.getReason()));
       }

    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> login (@RequestBody AuthenticationRequest request){
        System.out.println("Intentando autenticación para: " + request.getEmail());
        System.out.println("Contraseña recibida: " + request.getPassword()); // Solo para depuración, no en producción
        return ResponseEntity.ok(authenticationService.login(request));
    }


    @GetMapping("/users")
    public ResponseEntity<List<Usuarios>> Users (){
        List<Usuarios> users = authenticationService.allUsers();
        return ResponseEntity.ok(users);
    }
}