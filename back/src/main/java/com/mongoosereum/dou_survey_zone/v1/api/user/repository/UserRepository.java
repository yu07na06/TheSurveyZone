package com.mongoosereum.dou_survey_zone.v1.api.user.repository;

import com.mongoosereum.dou_survey_zone.v1.api.user.dto.UserDTO;
import com.mongoosereum.dou_survey_zone.v1.api.user.entity.User_MySQL;

public interface UserRepository {

    int createUser_MySQL(User_MySQL User_MySQL);

    String existsByEmail_MySQL(String email);

    User_MySQL findByEmailAndPassword_MySQL (String email);

}
