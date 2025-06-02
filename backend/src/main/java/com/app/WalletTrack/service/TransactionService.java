package com.app.WalletTrack.service;

import com.app.WalletTrack.model.Transaction;
import com.app.WalletTrack.repository.TransactionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TransactionService {
    private final TransactionRepository transactionRepository;

    public List<Transaction> getAll() {
        return transactionRepository.findAll(); }
    public Transaction create(Transaction tx) {
        return transactionRepository.save(tx); }
    public List<Transaction> getByWallet(Long walletId) {
        return transactionRepository.findByWalletId(walletId);
    }
}