package com.app.WalletTrack.service;

import com.app.WalletTrack.model.Transaction;
import com.app.WalletTrack.model.TransactionType;
import com.app.WalletTrack.model.Wallet;
import com.app.WalletTrack.repository.TransactionRepository;
import com.app.WalletTrack.repository.WalletRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TransactionService {
    private final TransactionRepository transactionRepository;
    private final WalletRepository walletRepository;

    public List<Transaction> getAll() {
        return transactionRepository.findAll(); }
    public Transaction create(Transaction tx) {
        return transactionRepository.save(tx); }
    public List<Transaction> getByWallet(Long walletId) {
        return transactionRepository.findByWalletId(walletId);
    }

    public Transaction create(Long walletId, BigDecimal amount, TransactionType type) {
        Wallet wallet = walletRepository.findById(walletId)
                .orElseThrow(() -> new RuntimeException("Wallet not found with id: " + walletId));

        Transaction tx = new Transaction();
        tx.setWallet(wallet);
        tx.setTransactionDate(LocalDateTime.now());
        tx.setTransactionType(type);

        if (type == TransactionType.WITHDRAWAL) {
            if (wallet.getBalance().compareTo(amount) < 0) {
                throw new RuntimeException("Insufficient balance");
            }
            tx.setAmount(amount.negate());
            wallet.setBalance(wallet.getBalance().subtract(amount));
        } else if (type == TransactionType.DEPOSIT) {
            tx.setAmount(amount);
            wallet.setBalance(wallet.getBalance().add(amount));
        } else {
            throw new RuntimeException("Unsupported transaction type");
        }

        walletRepository.save(wallet);
        return transactionRepository.save(tx);
    }


    public List<Transaction> getByUser(Long userId) {
        return transactionRepository.findByWallet_UserId(userId);
    }

    public List<Transaction> getTransactionsByUserEmail(String email) {
        return transactionRepository.findByWallet_UserEmail(email);
    }
}