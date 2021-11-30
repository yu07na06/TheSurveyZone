package com.mongoosereum.dou_survey_zone.api.v1.controller;

import com.mongoosereum.dou_survey_zone.api.v1.common.mail.MailService;
import com.mongoosereum.dou_survey_zone.api.v1.dto.request.user.*;
import com.mongoosereum.dou_survey_zone.api.v1.dto.response.survey.SelectSurveyRes;
import com.mongoosereum.dou_survey_zone.api.v1.dto.response.user.SignInRes;
import com.mongoosereum.dou_survey_zone.api.v1.exception.ExceptionModel;
import com.mongoosereum.dou_survey_zone.api.v1.domain.user.User;
import com.mongoosereum.dou_survey_zone.api.v1.service.UserService;
import io.swagger.annotations.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import java.util.List;

@Api(value="사용자 API", tags = {"User API"})
@RestController
@Slf4j
@RequestMapping(path = "/api/v1/user", produces = MediaType.APPLICATION_JSON_VALUE)
public class UserController{

    @Autowired
    private UserService userService;


    @Autowired
    private MailService mailService;

    @PostMapping(path="/checkEmail")
    @ApiOperation(value = "이메일 중복검사")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공(return ture/false)", response = String.class),
    })
    public ResponseEntity CheckEmail(
            @RequestBody
            @ApiParam(value="CheckEmailReq",required = true )
            @Valid CheckEmailReq checkEmailReq
    ) {
        System.out.println(checkEmailReq.getUser_Email());
        return ResponseEntity.status(200).body(userService.checkEmail(checkEmailReq.getUser_Email()));
    }

    @PostMapping(path="/signup")
    @ApiOperation(value = "회원 가입")
    @ApiResponses({
            @ApiResponse(code = 201, message = "성공", response = SelectSurveyRes.class),
    })
    public ResponseEntity registerUser(
            @RequestBody
            @ApiParam(value="SignUpReq",required = true )
            @Valid SignUpReq signUpReq
    ) {
         userService.createUser(signUpReq);
         return ResponseEntity.status(201).body("success");
    }

    @PostMapping(path="/signin")
    @ApiOperation(value = "로그인")
    @ApiResponses({
            @ApiResponse(code = 200, message = "로그인 성공", response = SignInRes.class),
            @ApiResponse(code = 401, message = "로그인 실패" , response = ExceptionModel.class)
    })
    public ResponseEntity signin(
            @Valid
            @RequestBody SigninReq SigninReq ,
            @Valid
            @NotNull HttpServletResponse response
    ) {
        List result = userService.signin(SigninReq.getUser_Email(), SigninReq.getUser_Password());

        String loginType = (String) result.get(0);
        String token = (String) result.get(1);
        User user = (User) result.get(2);

        /* Cookie */
        Cookie cookie = new Cookie("Authorization", token); // create a cookie
        cookie.setMaxAge(60 * 60); // expires 1h 유효기간
        // optional properties
//            cookie.setSecure(true); // SSL 통신채널 연결 시에만 쿠키를 전송하도록 설정
//            cookie.setHttpOnly(true); // 자바 스크립트에서 쿠키값을 읽어가지 못하도록 설정
        cookie.setPath("/"); // 모든 경로에서 쓸수있게  (Front에서 쓰는경로에서)
        response.addCookie(cookie);  // add cookie to response

        final SignInRes signInRes = SignInRes.builder()
                .user_Email(user.getUser_Email())
                .user_Name(user.getUser_Name())
                .user_Token(token)
                .login_Type(loginType)
                .build();

        return ResponseEntity.status(200).body(signInRes);
    }

    @PostMapping("/signout")
    @ApiResponses({
            @ApiResponse(code = 200, message = "로그아웃 성공", response = String.class),
    })
    public ResponseEntity signout(
            @Valid
            @NotNull HttpServletRequest request
    ) {
        userService.signout(request);
        return ResponseEntity.status(200).body("logout success");
    }

    @PostMapping(path="/searchID")
    @ApiOperation(value = "ID찾기")
    @ApiResponses({
            @ApiResponse(code = 200, message = "검색 결과 성공", response = SearchIDReq.class),
            @ApiResponse(code = 404, message = "검색 결과 없음" , response = ExceptionModel.class)
    })
    public ResponseEntity searchID(
            @RequestBody
            @Valid SearchIDReq searchIDReq) {
        List<String> user = userService.searchID(searchIDReq.getUser_Name(), searchIDReq.getUser_Tel());
    return ResponseEntity.ok().body(user);
    }

    @PostMapping(path="/searchPW")
    @ApiOperation("임시비밀번호 발금")
    @ApiResponses({
            @ApiResponse(code = 200, message = "임시 비밀번호 발급 성공", response = String.class),
            @ApiResponse(code = 404, message = "검색 결과 없음" , response = ExceptionModel.class)
    })
    public ResponseEntity tempPW(
            @RequestBody
            @Valid SearchPWReq searchPWReq){
        String tempPW = userService.makeTempPW(searchPWReq);
        mailService.sendTempPW(searchPWReq.getUser_Email(), searchPWReq.getUser_Name(), tempPW);
        return ResponseEntity.ok().body("임시 비밀 번호 전송");
    }

}