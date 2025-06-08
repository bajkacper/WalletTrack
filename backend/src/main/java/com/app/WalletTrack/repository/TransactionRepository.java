package com.app.WalletTrack.repository;

import com.app.WalletTrack.model.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    List<Transaction> findByWalletId(Long walletId);
    List<Transaction> findByWallet_UserId(Long userId);
    List<Transaction> findByWallet_UserEmail(String email);

}
