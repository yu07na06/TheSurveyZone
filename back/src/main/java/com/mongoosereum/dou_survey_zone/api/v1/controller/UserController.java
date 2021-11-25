package com.mongoosereum.dou_survey_zone.api.v1.controller;

import com.mongoosereum.dou_survey_zone.api.v1.common.mail.MailService;
import com.mongoosereum.dou_survey_zone.api.v1.dto.request.user.*;
import com.mongoosereum.dou_survey_zone.api.v1.dto.response.user.SignInRes;
import com.mongoosereum.dou_survey_zone.security.TokenProvider;
import com.mongoosereum.dou_survey_zone.api.v1.domain.user.User;
import com.mongoosereum.dou_survey_zone.api.v1.domain.user.UserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiModelProperty;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Api(value="사용자 API", tags = {"User API"})
@RestController
@Slf4j
@RequestMapping(path = "/api/v1/user", produces = MediaType.APPLICATION_JSON_VALUE)
public class UserController{

    @Autowired
    private UserService userService;

    @Autowired
    private TokenProvider tokenProvider;

    @Autowired
    private MailService mailService;

    @PostMapping(path="/checkEmail")
    @ApiOperation(value = "이메일 중복검사")
    public ResponseEntity CheckEmail(
            @RequestBody
            @ApiParam(value="CheckEmailReq",required = true )
                    CheckEmailReq checkEmailReq
    ) {
        System.out.println(checkEmailReq.getUser_Email());
        return ResponseEntity.status(200).body(userService.checkEmail(checkEmailReq.getUser_Email()));
    }

    @PostMapping(path="/signup")
    @ApiOperation(value = "회원 가입")
    public ResponseEntity registerUser(
            @RequestBody
            @ApiParam(value="SignUpReq",required = true )
                    SignUpReq signUpReq
    ) {
        Integer result;
        try{
            result = userService.createUser(signUpReq);
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.toString());
        }
        if(result == 1) {
            return ResponseEntity.status(201).body("success");
        }
        return ResponseEntity.status(401).body("fail");
    }

    @PostMapping(path="/signin")
    @ApiOperation(value = "로그인")
    public ResponseEntity signin(@RequestBody SigninReq SigninReq) {

        User user = userService.login(SigninReq.getUser_Email(), SigninReq.getUser_Password());

        if(user != null){
            final String token = tokenProvider.create(user);
            final SignInRes signInRes = SignInRes.builder()
                    .user_Email(user.getUser_Email())
                    .user_Name(user.getUser_Name())
                    .user_Token(token)
                    .build();
            return ResponseEntity.status(200).body(signInRes);
        } else{
            return ResponseEntity.status(401).body("Login fail");
        }
    }

    @PostMapping(path="/searchID")
    @ApiOperation(value = "ID찾기")
    public ResponseEntity searchID(@RequestBody SearchIDReq searchIDReq) {
        List<String> user = userService.searchID(searchIDReq.getUser_Name(), searchIDReq.getUser_Tel());
    return (user != null) ? ResponseEntity.ok().body(user) :  ResponseEntity.status(401).body("NO User");
    }
    @PostMapping(path="/searchPW")
    @ApiOperation("비밀번호찾기")
    public ResponseEntity searchPW(@RequestBody SearchPWReq searchPWReq){
        if(userService.findByEmail_Name_Tel(searchPWReq) == 0)
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("존재하지 않는 정보");
        mailService.sendTempPW(searchPWReq.getUser_Email(), searchPWReq.getUser_Name());
        return ResponseEntity.ok().body("비밀번호 찾기 성공");
    }
    /* 테스트용 */
    @GetMapping(path="/test")
    public String test() {
        return "success";
    }
}


// USER 권한 분리 필요
// 