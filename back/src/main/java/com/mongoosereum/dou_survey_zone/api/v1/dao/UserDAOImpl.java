package com.mongoosereum.dou_survey_zone.api.v1.dao;

import com.mongoosereum.dou_survey_zone.api.v1.domain.user.User;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserDAOImpl implements UserDAO {

    @Autowired
    SqlSession sqlSession;

    public void createUser_MySQL(User user_MySQL) {
        sqlSession.insert("createUser", user_MySQL);
    }

    public Optional<User> existsByEmail_MySQL(String email) {
        return Optional.ofNullable(sqlSession.selectOne("existsByEmail", email));
    }

    public Optional<User> findByEmailAndPassword_MySQL(String email) {
        return Optional.ofNullable(sqlSession.selectOne("findByEmailAndPassword", email));
    }

    public List<String> findByEmail(User user_MySQL) {
        return sqlSession.selectList("findByEmail", user_MySQL);
    }

    public Optional<User> findByEmail_Name_Tel(User user){
        return Optional.ofNullable(sqlSession.selectOne("findByEmail_Name_Tel",user));
    }

}
