package com.hotel.booking.system.api.security.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hotel.booking.system.api.security.auth.AuthenticationResponse;

@RestController
@RequestMapping("/api")
public class ApplicationUserController {


    @Autowired
    private ApplicationUserService userService;


    @GetMapping("/users/all")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<AuthenticationResponse> getAllUsers() {
    	AuthenticationResponse response = userService.getAllUsers();
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }
    
    
    @GetMapping("/users/get-by-id/{email}")
    public ResponseEntity<AuthenticationResponse> getUserByEmail(String email) {
    	AuthenticationResponse response = userService.getUserByEmail(email);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @DeleteMapping("/users/delete/{email}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<AuthenticationResponse> deleteUser( String email) {
    	AuthenticationResponse response = userService.deleteUser(email);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @GetMapping("/users/get-logged-in-profile-info")
    public ResponseEntity<AuthenticationResponse> getLoggedInUserProfile() {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        AuthenticationResponse response = userService.getMyInfo(email);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @GetMapping("/users/get-user-bookings/{email}")
    public ResponseEntity<AuthenticationResponse> getUserBookingHistory(String email) {
    	AuthenticationResponse response = userService.getUserBookingHistory(email);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }


}
