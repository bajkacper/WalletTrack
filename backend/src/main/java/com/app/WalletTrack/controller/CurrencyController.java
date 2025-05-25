package com.app.WalletTrack.controller;

import com.app.WalletTrack.model.Currency;
import com.app.WalletTrack.service.CurrencyService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/currencies")
@RequiredArgsConstructor
public class CurrencyController {
    private final CurrencyService service;

    @GetMapping("/")
    public List<Currency> all() { return service.getAll(); }
    @GetMapping("/{id}")
    public Currency get(@PathVariable Long id) {
        return service.getById(id); }
    @PostMapping("/add")
    public Currency create(@RequestBody Currency c) {
        return service.create(c); }
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id); }
}