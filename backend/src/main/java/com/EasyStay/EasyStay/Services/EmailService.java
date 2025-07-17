package com.EasyStay.EasyStay.Services;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;



@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;



    public void sendVerificationEmail(String to,String userName, String verificationLink){
        SimpleMailMessage message = new SimpleMailMessage();

        message.setTo(to);
        message.setSubject("Verificación de cuenta - EaseStay");
        String cuerpo = "Hola " + userName + ",\n\n" +
                "Correo Registrado: " + to + "\n" +
                "Haz clic en el siguiente enlace para verificar tu cuenta:\n" +
                verificationLink + "\n\n" +
                "¡Gracias por registrarte en EasyStay!";

        message.setText(cuerpo);

        mailSender.send(message);
    }
}
