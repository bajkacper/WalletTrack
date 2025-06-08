package com.app.WalletTrack.service;

import com.app.WalletTrack.DTO.RegisterRequest;
import com.app.WalletTrack.mail.ConfirmationToken;
import com.app.WalletTrack.mail.ConfirmationTokenService;
import com.app.WalletTrack.mail.EmailService;
import com.app.WalletTrack.model.User;
import com.app.WalletTrack.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserService {

    private final UserRepository userRepository;
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private ConfirmationTokenService confirmationTokenService;

    @Autowired
    private EmailService emailService;

    @Transactional
    public User createUser(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already in use");
        }

        User user = new User();
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole((short) 1);
        return userRepository.save(user);
    }

    public void registerUser(RegisterRequest request) {
        User user = createUser(request); // osobna transakcja
        ConfirmationToken token = confirmationTokenService.createToken(user);
        String link = "http://localhost:4200/confirm-account?token=" + token.getToken();
        emailService.sendEmail(user.getEmail(), "Potwierdzenie rejestracji", buildEmail(user.getFirstName(), link));
    }

    public void createUserByAdmin(User request){
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already in use");
        }

        User user = new User();
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(request.getRole());
        user.setEnabled(true);
        userRepository.save(user);
    }

    private String buildEmail(String name, String link) {
        return "<div style=\"font-family:Arial,sans-serif;font-size:16px;color:#333\">"
                + "<h2 style=\"color:#2d6cdf\">Witaj " + name + "!</h2>"
                + "<p>Dziękujemy za rejestrację w <strong>WalletTrack</strong>.</p>"
                + "<p>Aby aktywować swoje konto, kliknij poniższy link:</p>"
                + "<p style=\"margin:20px 0;\"><a href=\"" + link + "\" "
                + "style=\"display:inline-block;padding:10px 20px;background-color:#2d6cdf;"
                + "color:#fff;text-decoration:none;border-radius:5px\">Potwierdź rejestrację</a></p>"
                + "<p>Link wygaśnie za <strong>15 minut</strong>.</p>"
                + "<hr style=\"margin:30px 0;border:none;border-top:1px solid #eee\">"
                + "<p style=\"font-size:14px;color:#888\">Jeśli to nie Ty, po prostu zignoruj tę wiadomość.</p>"
                + "</div>";
    }


}

