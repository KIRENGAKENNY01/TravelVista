package com.T_Tour.Tourism.Config;

import com.T_Tour.Tourism.ServiceImpl.JwtService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.security.web.util.matcher.OrRequestMatcher;
import org.springframework.security.web.util.matcher.RequestMatcher;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import com.T_Tour.Tourism.ServiceImpl.CustomUserDetails;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JWTAuthenticationFilter  extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;

    
    private final RequestMatcher skipPathMatcher = new OrRequestMatcher(
            new AntPathRequestMatcher("/Tourism/v1/auth/login"),
            new AntPathRequestMatcher("/Tourism/v1/auth/register")
    );

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        return skipPathMatcher.matches(request);
    }




    @Override
    protected void doFilterInternal(
           HttpServletRequest request,
           HttpServletResponse response,
           FilterChain filterChain) throws ServletException, IOException {

        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
            filterChain.doFilter(request, response);
            return;
        }


        final String authorizationHeader = request.getHeader("Authorization");

        System.out.println("Authorization Header: " + authorizationHeader);

        final String jwtToken ;
        final String userEmail;
        if (authorizationHeader == null ||  !authorizationHeader.startsWith("Bearer ")){
            filterChain.doFilter(request, response);
            return;
        }


        jwtToken = authorizationHeader.substring(7);
        userEmail= jwtService.extractUserName(jwtToken);
        if(userEmail != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            CustomUserDetails userDetails = (CustomUserDetails) this.userDetailsService.loadUserByUsername(userEmail);
            //update the security Context holder
            if(jwtService.isTokenValid(jwtToken, userDetails)){
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                        userDetails,
                        null,
                        userDetails.getAuthorities());
                authToken.setDetails(userDetails);
                SecurityContextHolder.getContext().setAuthentication(authToken);
                logger.info("Authentication is set in SecurityContext: " + SecurityContextHolder.getContext().getAuthentication());
            }
        }


   filterChain.doFilter(request, response);

    }



}
