package com.app.WalletTrack.controller;

import com.app.WalletTrack.model.ExchangeRate;
import com.app.WalletTrack.service.ExchangeRateService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rates")
@RequiredArgsConstructor
public class ExchangeRateController {
    private final ExchangeRateService service;

    @GetMapping("/")
    public List<ExchangeRate> all() {
        return service.getAll(); }
    @GetMapping("/currency/{currencyId}")
    public List<ExchangeRate> byCurrency(@PathVariable Long currencyId) {
        return service.getByCurrency(currencyId);
    }
    @PostMapping("/add")
    public ExchangeRate create(@RequestBody ExchangeRate r) {
        return service.create(r); }
}
