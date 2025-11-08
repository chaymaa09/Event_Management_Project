package com.example.eventmangementproject;

import com.example.eventmangementproject.dao.entities.User;
import com.example.eventmangementproject.dao.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.stream.Stream;

@SpringBootApplication
public class EventMangementProjectApplication implements CommandLineRunner {
	@Autowired
	private UserRepository userRepository;

	public static void main(String[] args) {
		SpringApplication.run(EventMangementProjectApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		Stream.of("John", "Julie", "Jennifer", "Helen", "Rachel").forEach(name -> {
			User user = new User(
					null,
					name,
					name.toLowerCase() + "@domain.com",
					"test",   // password should be a String, not char
					"LOCAL",  // provider type also String
					null, null, null, null, null
			);
			userRepository.save(user);
		});

		userRepository.findAll().forEach(System.out::println);
	}


}
