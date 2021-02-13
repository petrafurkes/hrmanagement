package com.hrmanagement.hrmanagement.payload.request;

import java.util.Set;

import javax.persistence.Column;
import javax.validation.constraints.*;
 
public class SignupRequest {
    @NotBlank
    private String username;
 
    @NotBlank
    private String email;
    
    private Set<String> role;
    
    @NotBlank
    private String password;

    public SignupRequest(String username,
                         String email,
                         Set<String> role,
                         String password) {
        this.username = username;
        this.email = email;
        this.role = role;
        this.password = password;
    }

    public SignupRequest() {
    }

    public String getUsername() {
        return username;
    }
 
    public void setUsername(String username) {
        this.username = username;
    }
 
    public String getEmail() {
        return email;
    }
 
    public void setEmail(String email) {
        this.email = email;
    }
 
    public String getPassword() {
        return password;
    }
 
    public void setPassword(String password) {
        this.password = password;
    }
    
    public Set<String> getRole() {
      return this.role;
    }
    
    public void setRole(Set<String> role) {
      this.role = role;
    }
}
