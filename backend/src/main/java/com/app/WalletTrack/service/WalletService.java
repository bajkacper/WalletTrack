package com.app.WalletTrack.service;

import com.app.WalletTrack.model.Wallet;
import com.app.WalletTrack.repository.CurrencyRepository;
import com.app.WalletTrack.repository.UserRepository;
import com.app.WalletTrack.repository.WalletRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class WalletService {
    private final WalletRepository walletRepository;
    private final UserRepository userRepository;
    private final CurrencyRepository currencyRepository;

    public List<Wallet> getAll() {
        return walletRepository.findAll(); }
    public Wallet getById(Long id) {
        return walletRepository.findById(id).orElseThrow(); }

    public Wallet create(Wallet wallet) {
        return walletRepository.save(wallet);
    }

    public List<Wallet> getByUser(Long userId) {
        return walletRepository.findByUserId(userId);
    }
}
