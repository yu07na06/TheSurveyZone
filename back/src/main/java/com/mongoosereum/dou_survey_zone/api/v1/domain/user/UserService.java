package com.mongoosereum.dou_survey_zone.api.v1.domain.user;

import com.mongoosereum.dou_survey_zone.api.v1.dao.UserDAO;
import com.mongoosereum.dou_survey_zone.api.v1.dto.request.user.SearchPWReq;
import com.mongoosereum.dou_survey_zone.api.v1.dto.request.user.SignUpReq;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
public class UserService {

    @Autowired
    private UserDAO userDAO;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public Integer createUser(final SignUpReq signUpReq){

        String encodedPassword = passwordEncoder.encode(signUpReq.getUser_Password());

        User user_mySQL = User.builder()
                .user_Email(signUpReq.getUser_Email())
                .user_Password(encodedPassword)
                .user_Name(signUpReq.getUser_Name())
                .user_Tel(signUpReq.getUser_Tel())
                .build();

        return userDAO.createUser_MySQL(user_mySQL);
    }

    public boolean checkEmail(final String User_Email){
        return Objects.equals(User_Email, userDAO.existsByEmail_MySQL(User_Email));
    }

    public User login(final String email, final String password){

        User searchUser =  userDAO.findByEmailAndPassword_MySQL(email);
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

        List<String> searchEmail = userDAO.findByEmail(user_mySQL);

        return (searchEmail != null)? searchEmail : null;
    }
    public Integer searchPW(SearchPWReq searchPWReq){
        Integer result = userDAO.findByEmail_Name_Tel(User.builder()
                .user_Email(searchPWReq.getUser_Email())
                .user_Name(searchPWReq.getUser_Name())
                .user_Tel(searchPWReq.getUser_Tel())
                .build());
        if(result == 0 || result == null)
            return result;
//        String tempPW =
//        String encodedPassword = passwordEncoder.encode(newPW);
//
//        userDAO.modifyPW(newPW);
        return null;
    }
}
