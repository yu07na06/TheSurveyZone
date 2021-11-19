package com.mongoosereum.dou_survey_zone.v1.api.controller;

import com.mongoosereum.dou_survey_zone.v1.api.security.TokenProvider;
import com.mongoosereum.dou_survey_zone.v1.api.user.dao.UserDAO;
import com.mongoosereum.dou_survey_zone.v1.api.user.dto.UserDTO;
import com.mongoosereum.dou_survey_zone.v1.api.user.entity.User_MySQL;
import com.mongoosereum.dou_survey_zone.v1.api.user.service.UserService;
import org.apache.el.parser.Token;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/api/v1/user", produces = MediaType.APPLICATION_JSON_VALUE)
public class UserController{

//    @Autowired
//    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserService Service;

    @Autowired
    private TokenProvider tokenProvider;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping(path="/checkEmail")
    public ResponseEntity<?> CheckEmail(@RequestBody UserDTO userDTO) {
        System.out.println("controller");
        boolean result = Service.checkEmail(userDTO.getUser_Email());
        return !result ? ResponseEntity.ok().body("True") : ResponseEntity.badRequest().body("False");
    }

    @PostMapping(path="/signup")
    public ResponseEntity<?> registerUser(@RequestBody UserDTO userDTO) {

        String encodedPassword = passwordEncoder.encode(userDTO.getUser_Password());

        User_MySQL user = User_MySQL.builder()
                .user_Email(userDTO.getUser_Email())
                .user_Password(encodedPassword)
                .user_Name(userDTO.getUser_Name())
                .user_Tel(userDTO.getUser_Tel())
                .build();

        Integer result;
        try{
        result = Service.createUser(user);
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.toString());
        }
        if(result == 1) {
            UserDTO responseUserDTO = userDTO;
            return ResponseEntity.ok().body(responseUserDTO);
        }
        return ResponseEntity.badRequest().body("fail");
    }

    @PostMapping(path="/signin")
    public ResponseEntity<?> signin(@RequestBody UserDTO userDTO) {
        User_MySQL user = Service.login(userDTO.getUser_Email(), userDTO.getUser_Password(), passwordEncoder);

        if(user != null){
            final String token = tokenProvider.create(user);
            final UserDTO responseUserDTO = UserDTO.builder()
                    .user_Email(user.getUser_Email())
                    .user_Name(user.getUser_Name())
                    .user_token(token)
                    .build();
            return ResponseEntity.ok().body(responseUserDTO);
        } else{
            return ResponseEntity.badRequest().body("fail");
        }
    }

    /*
    이메일 체크
    */
//    @PostMapping(path="/checkEmail")
//    public ResponseEntity<String> CheckEmail(@RequestBody UserDTO userDTO) {
//        String Email = userDTO.getUser_Email();
//        System.out.println(Email);
//        try{
//            String result = Dao.selectEmail_MySQL(Email);
//            if(result == null){
//                return ResponseEntity.status(HttpStatus.ACCEPTED).body("True");
//            }
//            else {
//                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("False");
//            }
//        } catch (Exception e){
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.toString());
//        }
//    }
//
//    /*
//    계정 생성
//    */
//    @PostMapping(path="/createUser")
//    public ResponseEntity<String> createUser(@RequestBody UserDTO userDTO) {
//
//        String encodedPassword = passwordEncoder.encode(userDTO.getUser_Password());
//        userDTO.setUser_Password(encodedPassword);
//        int result = Dao.createUser_MySQL(userDTO);
//        System.out.println(result);
//
//        return result == 1 ?
//                ResponseEntity.status(HttpStatus.CREATED).body("success")
//                : ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("fail");
//    }
//
//    /*
//    로그인
//    */
//    @PostMapping(path="/login")
//    public ResponseEntity<String> login(@RequestBody UserDTO userDTO) {
//
//        UserDTO checkUser = Dao.login_MySQL(userDTO);
//
//        if(checkUser == null) {
//            System.out.println("사용자 없음");
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("fail");
//        }
//        if(!passwordEncoder.matches(userDTO.getUser_Password(),checkUser.getUser_Password()))
//        {
//            System.out.println("비밀번호가 일치하지 않습니다.");
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("fail");
//        }
//
//        //jwt 토큰 발행 필요
//
//
//        System.out.println("로그인 성공");
//        return ResponseEntity.status(HttpStatus.CREATED).body("success");
//
//    }


    /* 테스트용 */
    @GetMapping(path="/test")
    public String test(@RequestBody UserDTO userDTO) {

        System.out.println(userDTO.getUser_Email());
        System.out.println(userDTO.getUser_Password());

        return "success";
    }


}