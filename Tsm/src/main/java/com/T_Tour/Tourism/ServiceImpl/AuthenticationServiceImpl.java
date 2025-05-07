package com.T_Tour.Tourism.ServiceImpl;

import com.T_Tour.Tourism.Dto.LoginDto;
import com.T_Tour.Tourism.Dto.LoginResponseDto;
import com.T_Tour.Tourism.Dto.RegisterDto;
import com.T_Tour.Tourism.models.User;
import com.T_Tour.Tourism.repositories.UserRepository;
import com.T_Tour.Tourism.services.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;



@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    @Override
    public String register(RegisterDto registerDto) {

        // to check if the user arleady exist
        if(userRepository.findByEmail(registerDto.getEmail()).isPresent()){
            return "Email Already Exist";
        }

        var user = new  User();
                user.setName(registerDto.getName());
               user.setEmail(registerDto.getEmail());
               user.setPassword(passwordEncoder.encode(registerDto.getPassword()));
               user.setPhone(registerDto.getPhone());
                user.setRole(registerDto.getRole());
        userRepository.save(user);

        return "User registered successfully";
    }


    public LoginResponseDto Login(LoginDto loginDto) {
        try{
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginDto.getEmail(),
                            loginDto.getPassword()
                    )
            );
            if (authentication.isAuthenticated()) {
                var user = userRepository.findByEmail(loginDto.getEmail())
                        .orElseThrow(() -> new UsernameNotFoundException("User not found"));

                CustomUserDetails customUserDetails = new CustomUserDetails(user);
                var jwtToken = jwtService.generateToken(customUserDetails);

                return new LoginResponseDto( jwtToken,customUserDetails.getNames(),customUserDetails.getRole(),customUserDetails.getUsername(),"Login Successful");
            }
        }
        catch (BadCredentialsException e) {
            throw new BadCredentialsException("Invalid username or password");
        } catch (UsernameNotFoundException e) {
            throw new UsernameNotFoundException("User not found");
        }
        throw new RuntimeException("Login failed");
    }

    @Override
    public String logoutrUser() {
        return "";
    }

    @Override
    public void requestPasswordReset(String email) {

    }

    @Override
    public boolean verifyResetCode(String email, String code) {
        return false;
    }

    @Override
    public void resetPassword(String email, String newPassword) {

    }

    @Override
    public String fetchAllUsers() {
        return userRepository.findAll().toString();
    }


}
