package com.hrmanagement.hrmanagement.repository;

import java.util.List;
import java.util.Optional;

import com.hrmanagement.hrmanagement.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface UserRepository extends JpaRepository<User, Long> {
	Optional<User> findById(Long userId);


	Optional<User> findByUsername(String username);

	Optional<User> findByEmail(String email);

	List<User> findAll();

	Boolean existsByUsername(String username);

	Boolean existsByEmail(String email);
}
