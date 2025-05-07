package com.T_Tour.Tourism.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table( name = "users", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"user_email" , "user_phone"})
})
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer Id;

    @NotBlank(message = "user name is required")
    @Column(name = "user_name",length = 255,nullable = false)
    private String name;

    @NotBlank(message = "user email is required")
    @Column(name = "user_email",length = 255,nullable = false)
    private String email;

    @NotBlank(message = "user password is required")
    @Column(name = "user_password",length = 255,nullable = false)
    private String password;


    @NotBlank(message = "user phone is required")
    @Column(name = "user_phone", length = 255, nullable = false)
    private String phone;

    @Enumerated(EnumType.STRING)
    private Role role;


}

