package com.app.WalletTrack.controller;

import com.app.WalletTrack.model.User;
import com.app.WalletTrack.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @GetMapping("/")
    public List<User> all() { return userService.getAllUsers(); }
    @GetMapping("/{id}")
    public User get(@PathVariable Long id) {
        return userService.getUser(id); }
    @PostMapping ("/add")
    public ResponseEntity<User> create(@RequestBody User u) {
        return ResponseEntity.status(HttpStatus.CREATED).body(userService.createUser(u));
    }
    @PutMapping("/{id}")
    public User update(@PathVariable Long id, @RequestBody User u) {
        return userService.updateUser(id, u);
    }
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        userService.deleteUser(id); }
}
