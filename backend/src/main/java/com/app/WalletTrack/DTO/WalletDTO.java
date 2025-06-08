package com.app.WalletTrack.DTO;


import com.app.WalletTrack.model.User;
import java.math.BigDecimal;
import java.time.LocalDateTime;


public class WalletDTO {
    private Long id;
    private String name;
    private Long currencyId;
    private BigDecimal balance = BigDecimal.ZERO;

    private LocalDateTime createdAt = LocalDateTime.now();


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getCurrencyId() {
        return currencyId;
    }

    public void setCurrencyId(Long currencyId) {
        this.currencyId = currencyId;
    }

    public BigDecimal getBalance() {
        return balance;
    }

    public void setBalance(BigDecimal balance) {
        this.balance = balance;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public Long getCurrency() {
        return currencyId;
    }

    public void setCurrency(Long currencyId) {
        this.currencyId = currencyId;
    }
}
