package com.T_Tour.Tourism.Dto;


import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import com.T_Tour.Tourism.models.Role;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoginResponseDto {

   @NotBlank(message = "token is requierd")
   private String token;

   @NotBlank(message = "name is required")
   private String  name;

   private Role role;


   @NotBlank(message = "email is required")
   private String  email;

   @NotBlank(message = "response is required")
   private String  response;

}
