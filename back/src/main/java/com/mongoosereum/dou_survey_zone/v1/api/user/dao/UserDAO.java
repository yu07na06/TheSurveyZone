package com.mongoosereum.dou_survey_zone.v1.api.user.dao;

import com.mongoosereum.dou_survey_zone.v1.api.user.dto.UserDTO;
import com.mongoosereum.dou_survey_zone.v1.api.user.entity.User_MySQL;
import com.mongoosereum.dou_survey_zone.v1.api.user.repository.UserRepository;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class UserDAO implements UserRepository {

    @Autowired
    SqlSession sqlSession;

    @Autowired
    private UserRepository userRepository;

    @Override
    public int createUser_MySQL(User_MySQL User_MySQL) {
        return sqlSession.insert("createUser", User_MySQL);
    }

    @Override
    public String existsByEmail_MySQL(String email) {
        return sqlSession.selectOne("existsByEmail", email);
    }

    @Override
    public User_MySQL findByEmailAndPassword_MySQL(User_MySQL User_MySQL) {
        return sqlSession.selectOne("findByEmailAndPassword", User_MySQL);
    }
//
//    @Autowired
//    SqlSession sqlSession;
//
//    @Autowired
//    private UserRepository userRepository;
//
//    @Override
//    public int createUser_MySQL(User_MySQL User_MySQL) {
//        return sqlSession.insert("createUser", User_MySQL);
//    }
//
//    @Override
//    public String selectEmail_MySQL(String param){
//        System.out.println("SelectEmail==========");
//        System.out.println(param);
//        return sqlSession.selectOne("selectEmail",param);
//    }
//
//    @Override
//    public UserDTO login_MySQL(UserDTO userDTO) {
//        return sqlSession.selectOne("login", userDTO);
//    }


}
