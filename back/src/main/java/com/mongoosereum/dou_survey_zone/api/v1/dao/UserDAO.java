package com.mongoosereum.dou_survey_zone.api.v1.dao;

import com.mongoosereum.dou_survey_zone.api.v1.domain.user.User;

import java.util.List;
import java.util.Optional;

public interface UserDAO {
    String emailCheck (String email);
    void createUser_MySQL(User user_MySQL);
    Optional<User> existsByEmail_MySQL(String email);
    Optional<User> findByEmailAndPassword_MySQL(String email);
    List<String> findByEmail(User user_MySQL);
    Optional<User> findByEmail_Name_Tel(User user);
}