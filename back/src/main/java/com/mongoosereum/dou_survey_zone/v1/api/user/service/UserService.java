package com.mongoosereum.dou_survey_zone.v1.api.user.service;

import com.mongoosereum.dou_survey_zone.v1.api.user.dao.UserDAO;
import com.mongoosereum.dou_survey_zone.v1.api.user.dto.UserDTO;
import com.mongoosereum.dou_survey_zone.v1.api.user.entity.User_MySQL;
import com.mongoosereum.dou_survey_zone.v1.api.user.repository.UserRepository;
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

        User_MySQL user_mySQL = User_MySQL.builder()
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

    public User_MySQL login(final String email, final String password){

        User_MySQL searchUser =  Dao.findByEmailAndPassword_MySQL(email);
        System.out.println(searchUser.getUser_Email());
        System.out.println(searchUser.getUser_Password());
        if(searchUser != null && passwordEncoder.matches(password, searchUser.getUser_Password())){
            return searchUser;
        }
        return null;
    }

    public List<String> searchID(final String name, final String tel){
        User_MySQL user_mySQL = User_MySQL.builder()
                .user_Name(name)
                .user_Tel(tel)
                .build();

        List<String> searchEmail = Dao.findByEmail(user_mySQL);

        return (searchEmail != null)? searchEmail : null;

    }

}
