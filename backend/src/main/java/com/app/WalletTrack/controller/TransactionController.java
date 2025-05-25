package com.app.WalletTrack.controller;

import com.app.WalletTrack.model.Transaction;
import com.app.WalletTrack.service.TransactionService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/transactions")
@RequiredArgsConstructor
public class TransactionController {
    private final TransactionService service;

    @GetMapping("/")
    public List<Transaction> all() {
        return service.getAll(); }
    @GetMapping("/wallet/{walletId}")
    public List<Transaction> byWallet(@PathVariable Long walletId) {
        return service.getByWallet(walletId);
    }
    @PostMapping("/add")
    public Transaction create(@RequestBody Transaction t) {
        return service.create(t); }
}
