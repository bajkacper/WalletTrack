package com.app.WalletTrack.config;

import com.app.WalletTrack.model.User;
import com.app.WalletTrack.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class UserConfig {

    @Bean
    CommandLineRunner initAdmin(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            String adminEmail = "admin@wallet.com";

            if (userRepository.existsByEmail(adminEmail)) return;

            User admin = new User();
            admin.setFirstName("Admin");
            admin.setLastName("User");
            admin.setEmail(adminEmail);
            admin.setPassword(passwordEncoder.encode("kacperek1234"));
            admin.setRole((short) 0);
            admin.setEnabled(true);

            userRepository.save(admin);
        };
    }
}
