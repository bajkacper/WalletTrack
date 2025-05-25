package com.app.WalletTrack.service;

import com.app.WalletTrack.model.User;
import com.app.WalletTrack.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public List<User> getAllUsers() {
        return userRepository.findAll(); }

    public User getUser(Long id) {
        return userRepository.findById(id).orElseThrow(); }

    public User createUser(User user) {
        return userRepository.save(user); }

    public User updateUser(Long id, User userData) {
        User user = getUser(id);
        user.setFirstName(userData.getFirstName());
        user.setLastName(userData.getLastName());
        user.setEmail(userData.getEmail());
        user.setPassword(userData.getPassword());
        user.setRole(userData.getRole());
        return userRepository.save(user);
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id); }
}
