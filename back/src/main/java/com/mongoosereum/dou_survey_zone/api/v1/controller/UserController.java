package com.mongoosereum.dou_survey_zone.api.v1.controller;

import com.mongoosereum.dou_survey_zone.api.v1.common.mail.MailService;
import com.mongoosereum.dou_survey_zone.api.v1.dto.request.user.*;
import com.mongoosereum.dou_survey_zone.api.v1.dto.response.user.SignInRes;
import com.mongoosereum.dou_survey_zone.api.v1.exception._400_BadRequest.AlreadyRegisteredEmailException;
import com.mongoosereum.dou_survey_zone.security.TokenProvider;
import com.mongoosereum.dou_survey_zone.api.v1.domain.user.User;
import com.mongoosereum.dou_survey_zone.api.v1.domain.user.UserService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.extern.slf4j.Slf4j;
import org.apache.el.stream.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
    private TokenProvider tokenProvider;

    @Autowired
    private MailService mailService;

    @PostMapping(path="/checkEmail")
    @ApiOperation(value = "이메일 중복검사")
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
    public ResponseEntity registerUser(
            @RequestBody
            @ApiParam(value="SignUpReq",required = true )
            @Valid SignUpReq signUpReq
    ) {
        Integer result;
         result = userService.createUser(signUpReq);
        if(result == 1) {
            return ResponseEntity.status(201).body("success");
        }
        return ResponseEntity.status(401).body("fail");
    }

    @PostMapping(path="/signin")
    @ApiOperation(value = "로그인")
    public ResponseEntity signin(
            @Valid
            @RequestBody SigninReq SigninReq ,
            @Valid
            @NotNull HttpServletResponse response
    ) {
        List result = userService.login(SigninReq.getUser_Email(), SigninReq.getUser_Password());

        String loginType = (String) result.get(0);
        String token = (String) result.get(1);
        User user = (User) result.get(2);

        Cookie cookie = new Cookie("Authorization", token); // create a cookie
        cookie.setMaxAge(60 * 60); // expires 1h 유효기간
        // optional properties
//            cookie.setSecure(true); // 암호화
//            cookie.setHttpOnly(true); // js가 못건들게 하는것
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

    @PostMapping("/signOut")
    public ResponseEntity logout(
            @Valid
            @NotNull HttpServletRequest request
    ) {

        userService.BlackListToken(request);
        return ResponseEntity.status(200).body("logout success");
    }

    @PostMapping(path="/searchID")
    @ApiOperation(value = "ID찾기")
    public ResponseEntity searchID(
            @RequestBody
            @Valid SearchIDReq searchIDReq) {
        List<String> user = userService.searchID(searchIDReq.getUser_Name(), searchIDReq.getUser_Tel());
    return ResponseEntity.ok().body(user);
    }

    @PostMapping(path="/searchPW")
    @ApiOperation("임시비밀번호 발금")
    public ResponseEntity searchPW(
            @RequestBody
            @Valid SearchPWReq searchPWReq){

        userService.findByEmail_Name_Tel(searchPWReq);

        String tempPW = userService.makeTempPW(searchPWReq.getUser_Email());
        System.out.println(tempPW);

        mailService.sendTempPW(searchPWReq.getUser_Email(), searchPWReq.getUser_Name(), tempPW);
        return ResponseEntity.ok().body("임시 비밀 번호 전송");
    }
    /* 테스트용 */
    @GetMapping(path="/test")
    public String test() {
        return "success";
    }

}


// USER 권한 분리 필요
// 