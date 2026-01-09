package com.example.eventmanagementproject.dao.entities;

import java.time.ZonedDateTime;
import java.util.Collection;
import java.util.List;
import java.util.Set;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.CascadeType;
import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder
@JsonIgnoreProperties({ "createdEvents", "participations", "password", "authorities", "accountNonExpired",
    "accountNonLocked", "credentialsNonExpired" })
@Table(name = "user",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = "email"),
                @UniqueConstraint(columnNames = "keycloakId")
        })

public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable=false)
    private String name;
    @Column(nullable=false, unique=true)
    private String email;
    @Column(nullable=false)
    private String password;


    private ZonedDateTime createdAt = ZonedDateTime.now();

    @Enumerated(EnumType.STRING)
    private AuthType authType;

    @Column(nullable=false, unique=true)
    private String keycloakId;

    private String bio;
    private String phone;
    private String instagramAccount;
    private String youtubeAccount;
    private String linkedinAccount;

    @JsonProperty("xAccount")
    @Column(name = "x_account")
    private String xAccount;
    private String website;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(
            name = "user_email_sup",
            joinColumns = @JoinColumn(name = "user_id")
    )
    @Column(name = "email")
    private List<String> emailSup;

    private String provider;
    private String providerId;
    private String avatarUrl;


    
    @Column(nullable = false, columnDefinition = "boolean default true")
    private boolean enabled = true; 

    @Column(nullable = false, columnDefinition = "boolean default true")
    private boolean accountNonExpired = true;

    @Column(nullable = false,columnDefinition = "boolean default true")
    private boolean accountNonLocked = true;

    @Column(nullable = false, columnDefinition = "boolean default true")
    private boolean credentialsNonExpired = true;

    @OneToMany(mappedBy = "creator", cascade = CascadeType.ALL)
    private List<Event> createdEvents;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Participation> participations;

        // Categories this user is subscribed to
        @ManyToMany
        @JoinTable(
            name = "category_subscribers",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "category_id")
        )
        @JsonIgnore
        private Set<Category> subscribedCategories;

    // UserDetails Implementation
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority("USER"));
    }

    @Override
    public String getUsername() {
        return this.email;
    }

    @Override
    public String getPassword() {
        return this.password;
    }

    @Override
    public boolean isAccountNonExpired() {
        return this.accountNonExpired;
    }

    @Override
    public boolean isAccountNonLocked() {
        return this.accountNonLocked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return this.credentialsNonExpired;
    }

    @Override
    public boolean isEnabled() {
        return this.enabled;
    }
}
