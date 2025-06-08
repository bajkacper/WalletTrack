package com.app.WalletTrack.controller;

import com.app.WalletTrack.model.Transaction;
import com.app.WalletTrack.model.TransactionRequest;
import com.app.WalletTrack.service.TransactionService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/transactions")
@RequiredArgsConstructor
public class TransactionController {
    private final TransactionService service;

    @GetMapping("/wallet/{walletId}")
    public List<Transaction> byWallet(@PathVariable Long walletId) {
        return service.getByWallet(walletId);
    }

    @PostMapping("/add")
    public Transaction create(@RequestBody TransactionRequest request) {
        return service.create(request.getWalletId(), request.getAmount(), request.getTransactionType());
    }
    @GetMapping("/my")
    public List<Transaction> myTransactions(Principal userDetails) {
        String email = userDetails.getName();
        return service.getTransactionsByUserEmail(email);
    }
    @GetMapping("/user/{userId}")
    public List<Transaction> byUser(@PathVariable Long userId) {
        return service.getByUser(userId);
    }
}
