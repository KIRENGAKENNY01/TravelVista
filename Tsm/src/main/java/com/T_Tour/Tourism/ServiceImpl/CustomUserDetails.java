package com.T_Tour.Tourism.ServiceImpl;


import com.T_Tour.Tourism.models.Role;
import com.T_Tour.Tourism.models.User;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;



public class CustomUserDetails  implements UserDetails {

  private final User user;


  public CustomUserDetails(User user) {
      this.user = user;
  }


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public String getPassword() {
        return user.getPassword();
    }

    @Override
    public String getUsername() {
        return user.getEmail();
    }


    public String getNames() {
        return user.getName();
    }

    public Role getRole() {
      return user.getRole();
    }


    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return  true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }


    public User getUser() {
      return user;
    }
}
