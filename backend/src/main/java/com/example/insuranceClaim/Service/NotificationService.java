package com.example.insuranceClaim.Service;

import com.example.insuranceClaim.Model.Message;
import com.example.insuranceClaim.Model.Notification;
import com.example.insuranceClaim.Repo.MessageRepo;
import com.example.insuranceClaim.Repo.NotificationRepo;
import org.hibernate.ResourceClosedException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.config.ConfigDataResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
public class NotificationService {

    @Autowired
    private NotificationRepo notificationRepo;

    @Autowired
    private MessageRepo messageRepo;


    public Notification createNotification(Notification notification) {
        return notificationRepo.save(notification);
    }

    public List<Notification> getByUsername(String username) {
        return notificationRepo.findByUsername(username);
    }

    public Message createMessage(Message messages) {
        return messageRepo.save(messages);
    }

    public List<Message> getMessages() {
        return messageRepo.findAll();
    }

    public void markNotificationAsRead(Long id) {
            Notification notification = notificationRepo.findById(id)
                    .orElseThrow(() -> new ResourceClosedException("Notification not found"));
            notification.setRead(true);
        notificationRepo.save(notification);
    }

    public void markMessageAsRead(Long id) {
        Message message = messageRepo.findById(id)
                .orElseThrow(() -> new ResourceClosedException("Message not found"));
        message.setRead(true);
        messageRepo.save(message);
    }

}
