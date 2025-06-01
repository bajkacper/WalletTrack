package com.app.WalletTrack.auth;

import com.app.WalletTrack.DTO.RegisterRequest;
import com.app.WalletTrack.mail.ConfirmationTokenService;
import com.app.WalletTrack.model.User;
import com.app.WalletTrack.repository.UserRepository;
import com.app.WalletTrack.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
public class AuthController {

    private final ConfirmationTokenService confirmationTokenService;
    private final UserService userService;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;

    public AuthController(ConfirmationTokenService confirmationTokenService, UserService userService, UserRepository userRepository, PasswordEncoder passwordEncoder, JwtUtil jwtUtil, AuthenticationManager authenticationManager) {
        this.confirmationTokenService = confirmationTokenService;
        this.userService = userService;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
        this.authenticationManager = authenticationManager;
    }
    @GetMapping("/api/auth/confirm")
    public ResponseEntity<String> confirm(@RequestParam("token") String token) {
        confirmationTokenService.confirmToken(token);
        return ResponseEntity.ok("Konto zostało potwierdzone!");
    }
    @PostMapping("/api/auth/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        userService.registerUser(request);
        return ResponseEntity.ok("User registered");
    }
    @PostMapping("/api/auth/login")
    public Map<String, String> login(@RequestBody Map<String, String> loginRequest) {
        String email = loginRequest.get("email");
        String password = loginRequest.get("password");

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(email, password)
        );

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        String token = jwtUtil.generateToken(user.getEmail(), getRoleName(user.getRole()));

        return Map.of("token", token);
    }

    private String getRoleName(short roleValue) {
        return switch (roleValue) {
            case 0 -> "ADMIN";
            case 1 -> "USER";
            default -> "UNKNOWN";
        };
    }
}

