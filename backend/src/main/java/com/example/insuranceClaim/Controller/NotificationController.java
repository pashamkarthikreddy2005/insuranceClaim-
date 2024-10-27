package com.example.insuranceClaim.Controller;

import com.example.insuranceClaim.Model.Message;
import com.example.insuranceClaim.Model.Notification;
import com.example.insuranceClaim.Repo.NotificationRepo;
import com.example.insuranceClaim.Service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
public class NotificationController {

    @Autowired
    private NotificationService notificationService;

    @Autowired
    private NotificationRepo notificationRepo;


    @GetMapping("/notifications/all-notifications")
    public ResponseEntity<List<Notification>> getAllNotifications(Principal principal) {
        return ResponseEntity.ok(notificationService.getByUsername(principal.getName()));
    }
    @PostMapping("/notifications/add-notification")
    public ResponseEntity<Notification> addNotification(@RequestBody Notification notification, Principal principal) {
        String agentName = principal.getName();
        notification.setAgentName(agentName);
        Notification savedNotification = notificationService.createNotification(notification);
        return ResponseEntity.ok(savedNotification);
    }
    @PostMapping("/messages/add-message")
    public ResponseEntity<Message> addMessage(@RequestBody Message message, Principal principal) {
        String userName = principal.getName();
        message.setSentBy(userName);
        Message savedMessage = notificationService.createMessage(message);
        return ResponseEntity.ok(savedMessage);
    }
    @GetMapping("/messages/all-messages")
    public ResponseEntity<List<Message>> getAllMessages() {
        return ResponseEntity.ok(notificationService.getMessages());
    }

    @PostMapping("/messages/mark-as-read/{id}")
    public ResponseEntity<Void> markMessageAsRead(@PathVariable Long id) {
        notificationService.markMessageAsRead(id);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/notifications/mark-as-read/{id}")
    public ResponseEntity<Void> markNotificationAsRead(@PathVariable Long id) {
        notificationService.markNotificationAsRead(id);
        return ResponseEntity.ok().build();
    }

}
