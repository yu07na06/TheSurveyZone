package com.mongoosereum.dou_survey_zone.api.v1.domain.user;

import com.mongoosereum.dou_survey_zone.api.v1.dao.UserDAO;
import com.mongoosereum.dou_survey_zone.api.v1.dto.UserDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
public class UserService {

    @Autowired
    private UserDAO Dao;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public Integer createUser(final UserDTO userDTO){

        String encodedPassword = passwordEncoder.encode(userDTO.getUser_Password());

        User user_mySQL = User.builder()
                .user_Email(userDTO.getUser_Email())
                .user_Password(encodedPassword)
                .user_Name(userDTO.getUser_Name())
                .user_Tel(userDTO.getUser_Tel())
                .build();

        return Dao.createUser_MySQL(user_mySQL);
    }

    public boolean checkEmail(final String User_Email){
        return Objects.equals(User_Email, Dao.existsByEmail_MySQL(User_Email));
    }

    public User login(final String email, final String password){

        User searchUser =  Dao.findByEmailAndPassword_MySQL(email);
        System.out.println(searchUser.getUser_Email());
        System.out.println(searchUser.getUser_Password());
        if(searchUser != null && passwordEncoder.matches(password, searchUser.getUser_Password())){
            return searchUser;
        }
        return null;
    }

    public List<String> searchID(final String name, final String tel){
        User user_mySQL = User.builder()
                .user_Name(name)
                .user_Tel(tel)
                .build();

        List<String> searchEmail = Dao.findByEmail(user_mySQL);

        return (searchEmail != null)? searchEmail : null;

    }

}
