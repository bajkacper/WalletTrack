package com.app.WalletTrack.config;

import com.app.WalletTrack.model.Currency;
import com.app.WalletTrack.repository.CurrencyRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class CurrencyConfig {

    @Bean
    CommandLineRunner initCurrencies(CurrencyRepository currencyRepository) {
        return args -> {
            String[][] currencies = {
                    {"PLN", "Polski Złoty"},
                    {"USD", "US Dollar"},
                    {"EUR", "Euro"},
                    {"GBP", "British Pound"},
                    {"CHF", "Swiss Franc"}
            };

            for (String[] curr : currencies) {
                if (!currencyRepository.existsByCode(curr[0])) {
                    Currency currency = new Currency();
                    currency.setCode(curr[0]);
                    currency.setName(curr[1]);
                    currencyRepository.save(currency);
                }
            }
        };
    }
}