package com.app.WalletTrack.controller;

import com.app.WalletTrack.model.Wallet;
import com.app.WalletTrack.service.WalletService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/wallets")
@RequiredArgsConstructor
public class WalletController {
    private final WalletService service;

    @GetMapping("/")
    public List<Wallet> all() { return service.getAll(); }
    @GetMapping("/{id}")
    public Wallet get(@PathVariable Long id) {
        return service.getById(id); }
    @GetMapping("/user/{userId}")
    public List<Wallet> byUser(@PathVariable Long userId) {
        return service.getByUser(userId); }
    @PostMapping("/add")
    public Wallet create(@RequestBody Wallet w) {
        return service.create(w); }
}
