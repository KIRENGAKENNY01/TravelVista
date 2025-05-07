    package com.T_Tour.Tourism.Dto;

    import com.T_Tour.Tourism.models.Role;
    import jakarta.validation.constraints.NotBlank;
    import lombok.AllArgsConstructor;
    import lombok.Builder;
    import lombok.Data;
    import lombok.NoArgsConstructor;

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public class LoginDto {

        @NotBlank(message = "email is required")
        private String email;

        @NotBlank(message = "password is required")
        private String password;

      
    }
