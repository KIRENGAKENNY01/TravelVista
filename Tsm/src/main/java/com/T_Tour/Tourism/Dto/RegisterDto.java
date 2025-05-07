package com.T_Tour.Tourism.Dto;

import com.T_Tour.Tourism.models.Role;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterDto {

    @NotBlank(message = "username is required")
    @Size(min = 3, max = 50, message = "User name must be between 3 and 50 characters.")
    private String name;

    @NotBlank(message = "User email is required.")
    @Email(message = "Must be a valid email address.")
    private String email;

    @NotBlank(message = "User password is required.")
    @Size(min = 6, message = "Password must be at least 6 characters long.")
    private String password;

    @NotBlank(message = "User password is required.")
    @Size(min = 13, max=13 , message = "Password must be at least 6 characters long.")
    private String phone;


    private Role role;

}
