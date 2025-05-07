package com.T_Tour.Tourism.services;


import com.T_Tour.Tourism.Dto.LoginDto;
import com.T_Tour.Tourism.Dto.LoginResponseDto;
import com.T_Tour.Tourism.Dto.RegisterDto;

public interface AuthService {
    String register(RegisterDto registerDto);
    LoginResponseDto Login(LoginDto loginDto);
    String logoutrUser();
    void requestPasswordReset(String email);
    boolean verifyResetCode(String email, String code);
    void resetPassword(String email, String newPassword);

     String  fetchAllUsers();
}
