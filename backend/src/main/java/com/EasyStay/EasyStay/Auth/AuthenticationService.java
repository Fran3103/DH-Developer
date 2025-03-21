package com.EasyStay.EasyStay.Auth;

import com.EasyStay.EasyStay.Entities.Role;
import com.EasyStay.EasyStay.Entities.Usuarios;
import com.EasyStay.EasyStay.Repositories.IUsuarioRepository;
import com.EasyStay.EasyStay.configuration.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final IUsuarioRepository usuarioRepository;

    private final PasswordEncoder passwordEncoder;

    private final JwtService jwtService;

    private final AuthenticationManager authenticationManager;
    public  AuthenticationResponse allUsers;

    public List<Usuarios> allUsers(){
        return usuarioRepository.findAll();
    } ;


    /*public AuthenticationResponse register(RegisterRequest request){

        var existingUser = usuarioRepository.findByEmail(request.getEmail());
        if (existingUser.isPresent()) {
            // Lanza una excepción si el usuario ya existe
            throw new ResponseStatusException(HttpStatus.CONFLICT, "El usuario ya está registrado con este correo.");
        }



        var user = Usuarios.builder()
                .name(request.getFirstname())
                .lastName(request.getLastname())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER)
                .build();

        usuarioRepository.save(user);

        var jwt = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwt)
                .name(user.getName())
                .lastName(user.getLastName())
                .build();
    }*/
    public AuthenticationResponse register(RegisterRequest request) {
        var existingUser = usuarioRepository.findByEmail(request.getEmail());
        if (existingUser.isPresent()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "El usuario ya está registrado con este correo.");
        }

        var user = Usuarios.builder()
                .name(request.getName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER)
                .build();

        usuarioRepository.save(user);

        var jwt = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwt)
                .Nombre(user.getName())
                .lastName(user.getLastName())
                .build();
    }
    public AuthenticationResponse login (AuthenticationRequest request) {


            var usuario = usuarioRepository.findByEmail(request.getEmail())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuario no encontrado"));

            if (!passwordEncoder.matches(request.getPassword(), usuario.getPassword())){
                throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Contraseña incorrecta");
            }

            //Autenticar al usuario
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
            );

            var jwt = jwtService.generateToken(usuario);
            return AuthenticationResponse.builder()
                    .token(jwt)
                    .Nombre(usuario.getName())
                    .lastName(usuario.getLastName())
                    .build();


    }


}
