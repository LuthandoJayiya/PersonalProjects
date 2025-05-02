package com.hotel.booking.system.api.dto.post;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CustomerPostDTO {

    @NotBlank(message = "First name is required")
    private String firstName;
    @NotBlank(message = "First name is required")
    private String lastName;

    @Email(message = "Invalid email format")
    @NotBlank(message = "Email is required")
    private String email;

    private String password;
    private String phoneNumber;
    private String address;
    private String cardDetails;
    private String userName;
}
