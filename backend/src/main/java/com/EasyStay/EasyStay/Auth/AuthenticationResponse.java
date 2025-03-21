package com.EasyStay.EasyStay.Auth;

import com.EasyStay.EasyStay.Repositories.IUsuarioRepository;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticationResponse {

    private String token;
    private String Nombre;
    private String lastName;


    public AuthenticationResponse(String reason) {


        this.token = null;
        this.Nombre = reason;
        this.lastName = null;
    }
}
