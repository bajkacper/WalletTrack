package com.app.WalletTrack.controller;

import com.app.WalletTrack.DTO.WalletDTO;
import com.app.WalletTrack.model.Currency;
import com.app.WalletTrack.model.User;
import com.app.WalletTrack.model.Wallet;
import com.app.WalletTrack.repository.CurrencyRepository;
import com.app.WalletTrack.repository.UserRepository;
import com.app.WalletTrack.service.WalletService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.security.Principal;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/wallets")
@RequiredArgsConstructor
public class WalletController {
    private final WalletService service;
    @Autowired
    private final UserRepository userRepository;
    @Autowired
    private final CurrencyRepository currencyRepository;

    @GetMapping("/")
    public List<Wallet> all() { return service.getAll(); }
    @GetMapping("/{id}")
    public Wallet get(@PathVariable Long id) {
        return service.getById(id); }
    @GetMapping("/my")
    public ResponseEntity<List<Wallet>> getMyWallets(Principal principal) {
        String email = principal.getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Authenticated user not found."));
        List<Wallet> wallets = service.getByUser(user.getId());
        return ResponseEntity.ok(wallets);
    }
    @PostMapping("/add")
    public Wallet create(@RequestBody WalletDTO walletDTO, Principal principal) {
        String email = principal.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Currency currency = currencyRepository.findById(walletDTO.getCurrency())
                .orElseThrow(() -> new RuntimeException("Currency with that ID does not exist"));

        Wallet wallet = new Wallet();
        wallet.setUser(user);
        wallet.setCurrency(currency);
        wallet.setName(walletDTO.getName());
        wallet.setBalance(walletDTO.getBalance() != null ? walletDTO.getBalance() : BigDecimal.ZERO);
        wallet.setCreatedAt(LocalDateTime.now());

        return service.create(wallet);
    }

}
