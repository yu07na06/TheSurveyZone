package com.mongoosereum.dou_survey_zone.v1.api.user.dao;

import com.mongoosereum.dou_survey_zone.v1.api.user.dto.UserDTO;
import com.mongoosereum.dou_survey_zone.v1.api.user.entity.User_MySQL;
import com.mongoosereum.dou_survey_zone.v1.api.user.repository.UserRepository;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class UserDAO  {

    @Autowired
    SqlSession sqlSession;

    public int createUser_MySQL(User_MySQL user_MySQL) {
        return sqlSession.insert("createUser", user_MySQL);
    }

    public String existsByEmail_MySQL(String email) {
        return sqlSession.selectOne("existsByEmail", email);
    }

    public User_MySQL findByEmailAndPassword_MySQL(String email) {
        return sqlSession.selectOne("findByEmailAndPassword", email);
    }

    public List<String> findByEmail(User_MySQL user_MySQL) {
        return sqlSession.selectList("findByEmail", user_MySQL);
    }

}
