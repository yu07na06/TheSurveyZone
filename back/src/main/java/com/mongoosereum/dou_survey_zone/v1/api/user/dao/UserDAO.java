package com.mongoosereum.dou_survey_zone.v1.api.user.dao;

import com.mongoosereum.dou_survey_zone.v1.api.user.dto.UserDTO;
import com.mongoosereum.dou_survey_zone.v1.api.user.repository.UserRepository;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserDAO implements UserRepository {
    @Autowired
    SqlSession sqlSession;

    @Autowired
    private UserRepository userRepository;


    @Override
    public int createUser(UserDTO userDTO) {
        return sqlSession.insert("createUser", userDTO);
    }

    @Override
    public String selectEmail(String param){
        System.out.println("SelectEmail==========");
        System.out.println(param);
        return sqlSession.selectOne("selectEmail",param);
    }

    @Override
    public UserDTO login(UserDTO userDTO) {
        return sqlSession.selectOne("login", userDTO);
    }


}
