package com.app.WalletTrack.config;

import com.app.WalletTrack.model.Currency;
import com.app.WalletTrack.model.ExchangeRate;
import com.app.WalletTrack.repository.CurrencyRepository;
import com.app.WalletTrack.repository.ExchangeRateRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Optional;

@Configuration
public class ExchangeRateConfig {

    @Bean
    CommandLineRunner initExchangeRates(CurrencyRepository currencyRepository, ExchangeRateRepository exchangeRateRepository) {
        return args -> {
            Object[][] exchangeRates = {
                    {"USD", new BigDecimal("4.1234")},
                    {"EUR", new BigDecimal("4.5678")},
                    {"GBP", new BigDecimal("5.2345")},
                    {"CHF", new BigDecimal("4.7890")},
                    {"PLN", new BigDecimal("1.0000")}
            };

            for (Object[] rateData : exchangeRates) {
                String code = (String) rateData[0];
                BigDecimal rate = (BigDecimal) rateData[1];

                Optional<Currency> currencyOpt = currencyRepository.findByCode(code);
                if (currencyOpt.isPresent()) {
                    Currency currency = currencyOpt.get();

                    boolean exists = exchangeRateRepository.existsByCurrencyAndFetchedAtBetween(
                            currency,
                            LocalDateTime.now().minusHours(1),
                            LocalDateTime.now().plusHours(1)
                    );

                    if (!exists) {
                        ExchangeRate exchangeRate = new ExchangeRate();
                        exchangeRate.setCurrency(currency);
                        exchangeRate.setRate(rate);
                        exchangeRate.setFetchedAt(LocalDateTime.now());
                        exchangeRateRepository.save(exchangeRate);
                    }
                }
            }
        };
    }
}
