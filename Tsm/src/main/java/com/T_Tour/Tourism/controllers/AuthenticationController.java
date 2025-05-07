package com.T_Tour.Tourism.controllers;



import com.T_Tour.Tourism.Dto.LoginDto;
import com.T_Tour.Tourism.Dto.LoginResponseDto;
import com.T_Tour.Tourism.Dto.RegisterDto;
import com.T_Tour.Tourism.ServiceImpl.AuthenticationServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/Tourism/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationServiceImpl service;

    @PostMapping("/register")
    public ResponseEntity<String> register(
            @RequestBody RegisterDto request
    ){
        return ResponseEntity.ok(service.register(request));
    }

    @GetMapping("/getUsers")
    public ResponseEntity<String> getUsers(
     @RequestBody  String request
    ){
        return ResponseEntity.ok(service.fetchAllUsers());
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDto> login(
            @RequestBody LoginDto loginData
    ){
        return ResponseEntity.ok(service.Login(loginData));
    }

}
