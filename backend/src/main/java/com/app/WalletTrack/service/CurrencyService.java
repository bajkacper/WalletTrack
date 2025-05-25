package com.app.WalletTrack.service;

import com.app.WalletTrack.model.Currency;
import com.app.WalletTrack.repository.CurrencyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CurrencyService {
    private final CurrencyRepository currencyRepository;

    public List<Currency> getAll() {
        return currencyRepository.findAll(); }
    public Currency getById(Long id) {
        return currencyRepository.findById(id).orElseThrow(); }
    public Currency create(Currency c) {
        return currencyRepository.save(c); }
    public void delete(Long id) {
        currencyRepository.deleteById(id); }
}
