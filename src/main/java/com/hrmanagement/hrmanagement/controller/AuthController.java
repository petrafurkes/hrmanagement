package com.hrmanagement.hrmanagement.controller;

import javax.validation.Valid;

import com.hrmanagement.hrmanagement.payload.request.LoginRequest;
import com.hrmanagement.hrmanagement.payload.request.SignupRequest;
import com.hrmanagement.hrmanagement.payload.response.MessageResponse;
import com.hrmanagement.hrmanagement.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {

	@Autowired
	AuthService authService;


	@PostMapping("/signin")
	public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
		return authService.authenticateUser(loginRequest);
	}

	@PostMapping("/user/signup")
	public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
		MessageResponse message = authService.registerUser(signUpRequest);
		return ResponseEntity.ok(message);
	}

	@PostMapping("/hruser/signup")
	public ResponseEntity<?> registerHRUser(@Valid @RequestBody SignupRequest signUpRequest) {
		MessageResponse message = authService.registerHRUser(signUpRequest);
		return ResponseEntity.ok(message);



	}
}
