package com.hrmanagement.hrmanagement.repository;

import com.hrmanagement.hrmanagement.model.ERole;
import com.hrmanagement.hrmanagement.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {

	Optional<Role> findByName(ERole name);
}
