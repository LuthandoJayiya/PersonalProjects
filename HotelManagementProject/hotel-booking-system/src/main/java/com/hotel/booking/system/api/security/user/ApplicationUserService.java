package com.hotel.booking.system.api.security.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hotel.booking.system.api.dto.BookingResponseDTO;
import com.hotel.booking.system.api.exception.ResourceNotFoundException;
import com.hotel.booking.system.api.model.Booking;
import com.hotel.booking.system.api.model.Customer;
import com.hotel.booking.system.api.repository.BookingRepository;
import com.hotel.booking.system.api.repository.CustomerRepository;
import com.hotel.booking.system.api.security.auth.AuthenticationResponse;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ApplicationUserService implements IApplicationUserService {
    @Autowired
    private ApplicationUserRepository userRepository;
    @Autowired
    private static CustomerRepository customerRepository;
    @Autowired
    private static BookingRepository bookingRepository;

    @Override
    public AuthenticationResponse getAllUsers() {

    	AuthenticationResponse response = new AuthenticationResponse();
        try {
            List<ApplicationUser> userList = userRepository.findAll();
            List<ApplicationUserResponseDTO> userDTOList = mapUserListEntityToUserListDTO(userList);
            response.setStatusCode(200);
            response.setMessage("successful");
            response.setUserList(userDTOList);
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error getting all users " + e.getMessage());
        }
        return response;
    }

    @Override
    public AuthenticationResponse getUserBookingHistory(String email) {

    	AuthenticationResponse response = new AuthenticationResponse();


        try {
            ApplicationUser user = userRepository.findByEmail(email).orElseThrow(() -> new ResourceNotFoundException("ApplicationUser", "email", email));
            ApplicationUserResponseDTO userDTO = mapUserEntityToUserDTOPlusUserBookingsAndRoom(user);
            response.setStatusCode(200);
            response.setMessage("successful");
            response.setUser(userDTO);

        } catch (ResourceNotFoundException e) {
            response.setStatusCode(404);
            response.setMessage(e.getMessage());

        } catch (Exception e) {

            response.setStatusCode(500);
            response.setMessage("Error getting all users " + e.getMessage());
        }
        return response;
    }

    @Override
    public AuthenticationResponse deleteUser(String email) {

        AuthenticationResponse response = new AuthenticationResponse();

        try {
            ApplicationUser user = userRepository.findByEmail(email).orElseThrow(() -> new ResourceNotFoundException("ApplicationUser", "email", email));
            userRepository.deleteById(user.getId());
            response.setStatusCode(200);
            response.setMessage("successful");

        } catch (ResourceNotFoundException e) {
            response.setStatusCode(404);
            response.setMessage(e.getMessage());

        } catch (Exception e) {

            response.setStatusCode(500);
            response.setMessage("Error getting all users " + e.getMessage());
        }
        return response;
    }

    @Override
    public AuthenticationResponse getUserByEmail(String email) {

        AuthenticationResponse response = new AuthenticationResponse();

        try {
        	 ApplicationUser user = userRepository.findByEmail(email).orElseThrow(() -> new ResourceNotFoundException("ApplicationUser", "email", email));
            ApplicationUserResponseDTO userDTO = mapUserEntityToUserDTO(user);
            response.setStatusCode(200);
            response.setMessage("successful");
            response.setUser(userDTO);

        } catch (ResourceNotFoundException e) {
            response.setStatusCode(404);
            response.setMessage(e.getMessage());

        } catch (Exception e) {

            response.setStatusCode(500);
            response.setMessage("Error getting all users " + e.getMessage());
        }
        return response;
    }

    @Override
    public AuthenticationResponse getMyInfo(String email) {

        AuthenticationResponse response = new AuthenticationResponse();

        try {
            ApplicationUser user = userRepository.findByEmail(email).orElseThrow(() -> new ResourceNotFoundException("ApplicationUser", "email", email));
            ApplicationUserResponseDTO userDTO = mapUserEntityToUserDTO(user);
            response.setStatusCode(200);
            response.setMessage("successful");
            response.setUser(userDTO);

        } catch (ResourceNotFoundException e) {
            response.setStatusCode(404);
            response.setMessage(e.getMessage());

        } catch (Exception e) {

            response.setStatusCode(500);
            response.setMessage("Error getting all users " + e.getMessage());
        }
        return response;
    }
    
	public static ApplicationUserResponseDTO mapUserEntityToUserDTO(ApplicationUser user) {
			
		ApplicationUserResponseDTO userDTO = new ApplicationUserResponseDTO();

        userDTO.setId(user.getId());
        userDTO.setFirstName(user.getFirstName());
        userDTO.setLastName(user.getLastName());
        userDTO.setEmail(user.getEmail());
        userDTO.setUserName(user.getUsername());
        userDTO.setPhoneNumber(user.getPhoneNumber());
        userDTO.setRole(user.getRole().toString());
        return userDTO;
    }
	
	 public static List<ApplicationUserResponseDTO> mapUserListEntityToUserListDTO(List<ApplicationUser> userList) {
	        return userList.stream().map(ApplicationUserService::mapUserEntityToUserDTO).collect(Collectors.toList());
	 }
	 
	 public static ApplicationUserResponseDTO mapUserEntityToUserDTOPlusUserBookingsAndRoom(ApplicationUser user) {
        ApplicationUserResponseDTO userDTO = new ApplicationUserResponseDTO();

        userDTO.setId(user.getId());
        userDTO.setFirstName(user.getFirstName());
        userDTO.setLastName(user.getLastName());
        userDTO.setEmail(user.getEmail());
        userDTO.setUserName(user.getUsername());
        userDTO.setPhoneNumber(user.getPhoneNumber());
        userDTO.setRole(user.getRole().toString());
        Optional<Customer> customer = customerRepository.findByEmail(user.getEmail());
        if(customer.isPresent()) {
        List<Booking> bookings = bookingRepository.findAll().stream().filter(booking -> booking.getCustomer().getId() == customer.get().getId()).collect(Collectors.toList());
        if (bookings.size() > 0) {
        	List<BookingResponseDTO> bookingResponseDTOs = new ArrayList<BookingResponseDTO>();
        	for(Booking booking : bookings) {
        		BookingResponseDTO bookingResponseDTO = new BookingResponseDTO();
        		bookingResponseDTO.setId(booking.getId());
        		bookingResponseDTO.setCheckInDate(booking.getCheckInDate());
        		bookingResponseDTO.setCheckOutDate(booking.getCheckOutDate());
        		bookingResponseDTO.setTotalPrice(booking.getTotalPrice());
        		bookingResponseDTO.setStatus(booking.getStatus());
        		bookingResponseDTOs.add(bookingResponseDTO);
        	}
            userDTO.setBookings(bookingResponseDTOs);
        }
        }
        return userDTO;
    }
}

