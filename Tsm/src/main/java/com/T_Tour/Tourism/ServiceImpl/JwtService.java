package com.T_Tour.Tourism.ServiceImpl;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtService {


    @Value("${jwt.secret}")
    private  String  SECRET_KEY;

    @Value("${jwt.expiration}")
    private Long Expired;

    public String extractUserName(String token) {
     try {
         return extractClaim(token, Claims::getSubject);
     }
     catch (Exception e) {
         System.out.println("Failed to extract username"+e.getMessage());
     }
     return null;
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver){
        try {
            final Claims claims = extractAllClaims(token);
            return claimsResolver.apply(claims);
        }catch (Exception e) {
            System.out.println("Failed to extract claims"+e.getMessage());
        }
   return null;
    }
public  String generateToken(UserDetails userDetails) {
        return generateToken(new HashMap<>(),userDetails );
    }

    public String generateToken(
            Map<String , Object>  extraClaims,
            UserDetails userDetails
    ){
        try {
            System.out.println(userDetails.getUsername());
            return Jwts
                    .builder()
                    .claims(extraClaims)
                    .subject(userDetails.getUsername())
                    .issuedAt(new Date(System.currentTimeMillis()))
                    .expiration(new Date(System.currentTimeMillis() + Expired))
                    .signWith(getSignInKey(), Jwts.SIG.HS256)
                    .compact();
        }catch (Exception e) {
            System.out.println("Failed to generate token"+e.getMessage());
        }
        return null;
    }

    public boolean isTokenValid(String token, UserDetails userDetails)  {
         final String username = extractUserName(token);
         return username.equals(userDetails.getUsername()) && !isTokenExpired(token);
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }


    private Claims extractAllClaims (String token){
        try {
            return Jwts
                    .parser()                       // Use parserBuilder() instead of parser()
                    .verifyWith(getSignInKey())
                    .build()                               // Build the parser explicitly
                    .parseSignedClaims(token)
                    .getPayload();
        }catch (Exception e) {
            System.out.println("Failed to extract all claims"+e.getMessage());
        }
        return null;
    }
        private SecretKey getSignInKey() {
        byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }


}




