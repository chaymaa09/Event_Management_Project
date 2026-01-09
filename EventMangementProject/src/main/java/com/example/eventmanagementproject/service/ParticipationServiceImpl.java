package com.example.eventmanagementproject.service;

import com.example.eventmanagementproject.dao.entities.Event;
import com.example.eventmanagementproject.dao.entities.ParticipationStatus;
import com.example.eventmanagementproject.dao.entities.User;
import com.example.eventmanagementproject.dao.entities.Participation;
import com.example.eventmanagementproject.dao.repositories.ParticipationRepository;
import com.example.eventmanagementproject.dao.repositories.UserRepository;
import com.example.eventmanagementproject.dao.repositories.EventRepository;

import com.zaxxer.hikari.util.ClockSource;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ParticipationServiceImpl implements ParticipationService {
    private final ParticipationRepository participationRepository;
    private final UserRepository userRepository;
    private final EventRepository eventRepository;


    @Override
    public List<Participation> getEventParticipations(Event event) {
        return participationRepository.findByEvent(event);
    }

    @Override
    public Boolean cancelParticipation(Long participationId) {
        if (participationRepository.existsById(participationId)) {
            participationRepository.deleteById(participationId);
            return true;
        }
        return false;
    }

    @Override
    public Participation registerForEvent(Long userId, Long eventId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new RuntimeException("Event not found with id: " + eventId));
        Optional<Participation> existingRegistration = participationRepository.findByEventAndUser(event, user);
        if (existingRegistration.isPresent()) {
            throw new RuntimeException("User is already registered for this event!");
        }
        Participation participation = new Participation();

        participation.setUser(user);
        participation.setEvent(event);
        participation.setRegistrationDate(ZonedDateTime.now());
        participation.setStatus(ParticipationStatus.PENDING);


        return participationRepository.save(participation);
    }

    @Override
    public Participation updateStatus(Long participationId, ParticipationStatus newStatus) {
        Participation participation = participationRepository.findById(participationId)
                .orElseThrow(() -> new RuntimeException("Participation not found with id: " + participationId));

        validateStatusTransition(participation.getStatus(), newStatus);
        participation.setStatus(newStatus);
        return participationRepository.save(participation);
    }

    public void validateStatusTransition(ParticipationStatus currentStatus, ParticipationStatus newStatus) {
        if (currentStatus == ParticipationStatus.CANCELLED && newStatus == ParticipationStatus.CONFIRMED) {
            throw new RuntimeException("Cannot confirm a cancelled participation");
        }

        if (currentStatus == ParticipationStatus.ATTENDED && newStatus == ParticipationStatus.PENDING) {
            throw new RuntimeException("Cannot change attended participation back to pending");
        }

    }

    public List<User> getEventSubscribers(Long eventId){
        Event event = eventRepository.findEventById(eventId);
        List<User> subscribers = new ArrayList<>();
        if (event != null) {
            List<Participation> participations = getEventParticipations(event);

            if(participations != null || participations.size() > 0) {
                for (Participation participation : participations) {
                    if (participation.getStatus().equals(ParticipationStatus.ATTENDED)) {
                        subscribers.add(participation.getUser());
                    }
                }
            }else{
                throw new RuntimeException("No participations found for event: " + eventId);
            }
        }else{
            throw new RuntimeException("Event not found with id: " + eventId);
        }
        return subscribers;
    }


    @Override
    public List<User> getJoinedAttendees(Long eventId) {

        Event event = eventRepository.findById(eventId)
                .orElse(null);

        List<User> joinedUsers = getEventParticipations(event)

                .stream()
                .filter(p -> p.getStatus() == ParticipationStatus.CONFIRMED)
                .map(Participation::getUser)
                .toList();

        return joinedUsers;
    }

    @Override
    public Participation createParticipation(Event event, User user, ParticipationStatus status){
        if (event != null && user != null) {

            Participation participation = new Participation();
            participation.setEvent(event);
            participation.setUser(user);
            participation.setStatus(status);
            return participationRepository.save(participation);
        }else {
            return null;
        }

    }


    @Override
    public Boolean sendRequestToJoin(Long eventId, Long userId) {
        Event event = eventRepository.findById(eventId).orElse(null);
        User user = userRepository.findById(userId).orElse(null);
        if (event == null || user == null) return false;
        // find existing participation and update status to PENDING if necessary
        Optional<Participation> existing = participationRepository.findByEventAndUser(event, user);
        if (existing.isPresent()) {
            Participation p = existing.get();
            p.setStatus(ParticipationStatus.PENDING);
            participationRepository.save(p);
            return true;
        }
        Participation p = createParticipation(event, user, ParticipationStatus.PENDING);
        return p != null;



    }

    @Override
    public Boolean join(Long eventId, Long userId) {
        Event event = eventRepository.findById(eventId).orElse(null);
        User user = userRepository.findById(userId).orElse(null);
        if (event == null || user == null) return false;
        Optional<Participation> existing = participationRepository.findByEventAndUser(event, user);
        if (existing.isPresent()) {
            Participation p = existing.get();
            if (p.getStatus() == ParticipationStatus.PENDING) {
                p.setStatus(ParticipationStatus.CONFIRMED);
                participationRepository.save(p);
                return true;
            }
            return false;
        } else {
            Participation pnew = createParticipation(event, user, ParticipationStatus.CONFIRMED);
            return pnew != null;
        }

    }

}
