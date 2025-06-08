package com.app.WalletTrack.repository;

import com.app.WalletTrack.model.Currency;
import com.app.WalletTrack.model.ExchangeRate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ExchangeRateRepository extends JpaRepository<ExchangeRate, Long> {
    List<ExchangeRate> findByCurrencyId(Long currencyId);
    boolean existsByCurrencyAndFetchedAtBetween(Currency currency, LocalDateTime start, LocalDateTime end);
}
