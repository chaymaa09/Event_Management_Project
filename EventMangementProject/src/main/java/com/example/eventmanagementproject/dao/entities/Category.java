package com.example.eventmanagementproject.dao.entities;

import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

/**
 * Category entity representing an event category with:
 * - categoryName (name)
 * - imageUrl
 * - subscribers (users)
 * and a one-to-many relation to events.
 */
@Entity
@Table(name = "category")
@Getter
@Setter
@ToString(exclude = { "subscribers", "events" })
@AllArgsConstructor
@NoArgsConstructor
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Category name/code, e.g. TECH, AI, PARTY ...
    @Column(name = "name", nullable = false, unique = true, length = 50)
    private String name;

    // Optional image/logo URL for this category
    @Column(name = "image_url", length = 500)
    private String imageUrl;

    // Users subscribed to this category
    @ManyToMany(mappedBy = "subscribedCategories")
    @JsonIgnore
    private Set<User> subscribers = new HashSet<>();

    // Events that belong to this category
    @OneToMany(mappedBy = "category")
    @JsonIgnore
    private Set<Event> events = new HashSet<>();
}
