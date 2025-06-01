package com.app.WalletTrack.mail;

import org.springframework.stereotype.Service;

import org.springframework.mail.javamail.*;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendEmail(String to, String subject, String content) {
        MimeMessage message = mailSender.createMimeMessage();

        try {
            MimeMessageHelper helper = new MimeMessageHelper(message, "utf-8");
            helper.setText(content, true);
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setFrom("noteappbdio@gmail.com");

            mailSender.send(message);
        } catch (MessagingException e) {
            throw new IllegalStateException("Błąd wysyłania maila", e);
        }
    }
}
