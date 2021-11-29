package com.mongoosereum.dou_survey_zone.api.v1.controller;

import com.mongoosereum.dou_survey_zone.api.v1.common.mail.MailService;
import com.mongoosereum.dou_survey_zone.api.v1.dto.request.user.*;
import com.mongoosereum.dou_survey_zone.api.v1.dto.response.user.SignInRes;
import com.mongoosereum.dou_survey_zone.config.RedisDBConfig;
import com.mongoosereum.dou_survey_zone.security.TokenProvider;
import com.mongoosereum.dou_survey_zone.api.v1.domain.user.User;
import com.mongoosereum.dou_survey_zone.api.v1.domain.user.UserService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiModelProperty;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.Future;
import java.util.concurrent.TimeUnit;

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

    //TODO
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
    public ResponseEntity signin(@RequestBody SigninReq SigninReq , HttpServletResponse response) {

        List result = userService.login(SigninReq.getUser_Email(), SigninReq.getUser_Password());

        if(result != null){
            String loginType = (String) result.get(0);
            User user = (User) result.get(1);
            final String token = tokenProvider.create(user);

            // create a cookie
            Cookie cookie = new Cookie("Authorization", token);
            // expires 3h 유효기간
            cookie.setMaxAge(60 * 60);
            // optional properties
            cookie.setSecure(true); // 암호화
            cookie.setHttpOnly(true); // js가 못건들게 하는것
            cookie.setPath("/"); // 모든 경로에서 쓸수있게  (Front에서 쓰는경로에서)
            // add cookie to response
            response.addCookie(cookie);


            // 헤더에 담았엇던 것 ( 헤더 << 쿠키 맞는건가? )
//            HttpHeaders headers= new HttpHeaders();
//            headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));
//            member.setResponseToken(jwtTokenProvider.createToken(member.getUsername(), member.getRoles()));

            final SignInRes signInRes = SignInRes.builder()
                    .user_Email(user.getUser_Email())
                    .user_Name(user.getUser_Name())
                    .user_Token(token)
                    .login_Type(loginType)
                    .build();

            return ResponseEntity.status(200).body(signInRes);
        } else{
            return ResponseEntity.status(401).body("Login fail");
        }
    }

    @PostMapping("/signout") // 받아와야하기에
    public ResponseEntity logout(HttpServletRequest request) {

        //푸는 이유는 블랙리스트를 추가를 하기 위해서이다.
        // 헤더에서 JWT 를 받아옵니다.
        String token = tokenProvider.resolveToken((HttpServletRequest) request);

        // 전체를 뽑아내서 뽑아내는 토큰
        Jws<Claims> claims = tokenProvider.confirmToken(token);

        Boolean result = userService.BlackListToken(token, claims);

        return result ? ResponseEntity.status(200).body("logout success") : ResponseEntity.status(401).body("logout fail");
    }

    @PostMapping(path="/searchID")
    @ApiOperation(value = "ID찾기")
    public ResponseEntity searchID(@RequestBody SearchIDReq searchIDReq) {
        List<String> user = userService.searchID(searchIDReq.getUser_Name(), searchIDReq.getUser_Tel());
    return (user != null) ? ResponseEntity.ok().body(user) :  ResponseEntity.status(401).body("NO User");
    }

    @PostMapping(path="/searchPW")
    @ApiOperation("임시비밀번호 발금")
    public ResponseEntity searchPW(@RequestBody SearchPWReq searchPWReq){

        if(userService.findByEmail_Name_Tel(searchPWReq) == 0)
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("존재하지 않는 정보");

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