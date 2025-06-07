package com.app.WalletTrack.mail;

import com.app.WalletTrack.model.User;
import com.app.WalletTrack.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class ConfirmationTokenService {
    private final ConfirmationTokenRepository tokenRepository;
    private final UserRepository userRepository;

    @Autowired
    public ConfirmationTokenService(ConfirmationTokenRepository tokenRepository, UserRepository userRepository) {
        this.tokenRepository = tokenRepository;
        this.userRepository = userRepository;
    }

    public ConfirmationToken createToken(User user) {
        String token = UUID.randomUUID().toString();
        ConfirmationToken confirmationToken = new ConfirmationToken(
                token,
                LocalDateTime.now(),
                LocalDateTime.now().plusMinutes(15),
                user
        );
        return tokenRepository.save(confirmationToken);
    }

    public void confirmToken(String token) {
        ConfirmationToken confirmationToken = tokenRepository.findByToken(token)
                .orElseThrow(() -> new IllegalStateException("Token nie istnieje"));

        if (confirmationToken.getConfirmedAt() != null) {
            throw new IllegalStateException("Email już potwierdzony");
        }

        if (confirmationToken.getExpiresAt().isBefore(LocalDateTime.now())) {
            throw new IllegalStateException("Token wygasł");
        }

        confirmationToken.setConfirmedAt(LocalDateTime.now());
        tokenRepository.save(confirmationToken);

        User user = confirmationToken.getUser();
        user.setEnabled(true);
        userRepository.save(user);
    }

}

