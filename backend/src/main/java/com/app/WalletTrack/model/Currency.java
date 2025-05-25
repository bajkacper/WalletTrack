package com.app.WalletTrack.model;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "currencies")
public class Currency {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 3)
    private String code;

    @Column(nullable = false, length = 50)
    private String name;

    @OneToMany(mappedBy = "currency", cascade = CascadeType.ALL)
    private List<ExchangeRate> exchangeRates = new ArrayList<>();

    @OneToMany(mappedBy = "currency")
    private List<Wallet> wallets = new ArrayList<>();
}

