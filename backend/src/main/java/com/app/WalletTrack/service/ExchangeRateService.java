package com.app.WalletTrack.service;

import com.app.WalletTrack.model.ExchangeRate;
import com.app.WalletTrack.repository.ExchangeRateRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ExchangeRateService {
    private final ExchangeRateRepository exchangeRateRepository;

    public List<ExchangeRate> getAll() {
        return exchangeRateRepository.findAll(); }
    public ExchangeRate create(ExchangeRate rate) {
        return exchangeRateRepository.save(rate); }
    public List<ExchangeRate> getByCurrency(Long currencyId) {
        return exchangeRateRepository.findByCurrencyId(currencyId);
    }
}
