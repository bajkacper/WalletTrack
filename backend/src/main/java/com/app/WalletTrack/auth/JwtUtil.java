package com.app.WalletTrack.auth;

import com.app.WalletTrack.model.User;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtUtil {

    private final String SECRET = "06470b670359a653c65a3e053e95184c08d0e173822757876bda9723b312afc1";
    private final long EXPIRATION = 1000 * 60 * 60; // 1 godzina
    public String generateToken(String email, String role) {
        return JWT.create()
                .withSubject(email)
                .withIssuedAt(new Date())
                .withClaim("role", role)
                .withExpiresAt(new Date(System.currentTimeMillis() + EXPIRATION))
                .sign(Algorithm.HMAC256(SECRET));
    }
    public String validateTokenAndRetrieveSubject(String token) {
        return JWT.require(Algorithm.HMAC256(SECRET))
                .build()
                .verify(token)
                .getSubject();
    }
    public String extractRole(String token) {
        return JWT.require(Algorithm.HMAC256(SECRET))
                .build()
                .verify(token)
                .getClaim("role").asString();
    }
}

