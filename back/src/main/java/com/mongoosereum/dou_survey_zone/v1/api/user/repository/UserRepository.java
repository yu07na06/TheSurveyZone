package com.mongoosereum.dou_survey_zone.v1.api.user.repository;

import com.mongoosereum.dou_survey_zone.v1.api.user.dto.UserDTO;

public interface UserRepository {

    int createUser(UserDTO userDTO);

    String selectEmail(String param);

    UserDTO login(UserDTO userDTO);

}
