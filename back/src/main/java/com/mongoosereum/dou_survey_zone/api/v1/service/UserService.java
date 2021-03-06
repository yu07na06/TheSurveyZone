package com.mongoosereum.dou_survey_zone.api.v1.service;

import com.mongoosereum.dou_survey_zone.api.v1.dao.UserDAOImpl;
import com.mongoosereum.dou_survey_zone.api.v1.domain.user.User;
import com.mongoosereum.dou_survey_zone.api.v1.dto.request.user.ChagePWReq;
import com.mongoosereum.dou_survey_zone.api.v1.dto.request.user.SearchPWReq;
import com.mongoosereum.dou_survey_zone.api.v1.dto.request.user.SignUpReq;
import com.mongoosereum.dou_survey_zone.api.v1.exception.*;
import com.mongoosereum.dou_survey_zone.security.TokenProvider;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.*;
import java.util.concurrent.TimeUnit;

@Slf4j
@Service
public class UserService {

    @Autowired
    private UserDAOImpl userDAO;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private RedisTemplate redisTemplate;

    @Autowired
    private TokenProvider tokenProvider;

    public void createUser(final SignUpReq signUpReq){
        if(checkEmail(signUpReq.getUser_Email()))
            throw new BadRequestException(ErrorCode.EMAIL_DUPLICATION);
        userDAO.existsByEmail_MySQL(signUpReq.getUser_Email()).isPresent();
        String encodedPassword = passwordEncoder.encode(signUpReq.getUser_Password());

        User user_mySQL = User.builder()
                .user_Email(signUpReq.getUser_Email())
                .user_Password(encodedPassword)
                .user_Name(signUpReq.getUser_Name())
                .user_Tel(signUpReq.getUser_Tel())
                .build();

        userDAO.createUser_MySQL(user_mySQL);
    }

    public boolean checkEmail(final String User_Email){
        return Objects.equals(User_Email, userDAO.emailCheck(User_Email));
    }

    public List<?> signin(final String email, final String password){
        User searchUser = userDAO.findByEmailAndPassword_MySQL(email)
                .orElseThrow(() -> new UnauthorizedException(ErrorCode.UNAUTHORIZED_ACCESS));
        String tempPW = (String) redisTemplate.opsForValue().get(email+" TempPW");
        ArrayList result = new ArrayList();
        if(passwordEncoder.matches(password, searchUser.getUser_Password())){
            result.add("UserPW");
            result.add(tokenProvider.create(searchUser));
            result.add(searchUser);
            return result;
        }
        else if(passwordEncoder.matches(password, tempPW)) {
            result.add("TempPW");
            result.add(tokenProvider.create(searchUser));
            result.add(searchUser);
            return result;
        }
        throw new UnauthorizedException(ErrorCode.UNAUTHORIZED_ACCESS);
    }

    public void signout(HttpServletRequest request){
        //?????? ????????? ?????????????????? ????????? ?????? ???????????????.
        // ???????????? JWT ??? ???????????????.
        String token = tokenProvider.resolveToken(request);
        System.out.println(token);
        if(token != null){
            // ????????? ???????????? ???????????? ??????
            Jws<Claims> claims = tokenProvider.confirmToken(token);
            long expiretime =  claims.getBody().getExpiration().getTime()-System.currentTimeMillis();
            log.info("logout expireTime: "+ expiretime);
            // BlackListToken Redis ?????? (expirationTime ????????? ?????? ?????? ?????? ??????)
            //.set(?????? (bt: ??????) , value(), ??????????????? ??????, ?????? ??????)
            redisTemplate.opsForValue()
                    .set("BT:" + token, "blacklist",
                            // Date ??????(LONG) - ???????????? () = ???????????? ????????????() ????????? REDIS?????? ??? ???????????????.
                            expiretime,
                            TimeUnit.MILLISECONDS);
        }

    }

    public List<String> searchID(final String name, final String tel){
        User user_mySQL = User.builder()
                .user_Name(name)
                .user_Tel(tel)
                .build();

        List<String> searchEmail = userDAO.findByEmail(user_mySQL);

        if(searchEmail.isEmpty()){
            throw new NotFoundException(ErrorCode.NOT_FOUND_USER);
        }

        return searchEmail;
    }


    //?????? ???????????? ??????
    public String makeTempPW(SearchPWReq searchPWReq) {

        User user_mySQL =  User.builder()
                .user_Email(searchPWReq.getUser_Email())
                .user_Name(searchPWReq.getUser_Name())
                .user_Tel(searchPWReq.getUser_Tel())
                .build();

        User result = userDAO.findByEmail_Name_Tel(user_mySQL)
                .orElseThrow(() -> new NotFoundException(ErrorCode.NOT_FOUND_USER));

        String User_Email = result.getUser_Email();

        int leftLimit = 48;
        int rightLimit = 122;
        int tempPW_length = 10;
        Random random = new Random();
        String tempPW = random.ints(leftLimit, rightLimit + 1)
                .filter(i -> (i <= 57 || i >= 65) && (i <= 90 || i >= 97))
                .limit(tempPW_length)
                .collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append)
                .toString();
        String encodedPassword = passwordEncoder.encode(tempPW);

        redisTemplate.opsForValue()
                .set(User_Email+" TempPW", encodedPassword,
                        10,
                        TimeUnit.MINUTES);

        return tempPW;
    }

    public User findByEmail(String userEmail){
        if(userEmail==null || userEmail.equals("anonymousUser"))
            throw new ForbiddenException(ErrorCode.UNAUTHORIZED_ACCESS);

        return userDAO.existsByEmail_MySQL(userEmail)
                .orElseThrow(()->new NotFoundException(ErrorCode.NOT_FOUND_USER));
    }

    //???????????? ??????
    public void changePW(String Email, ChagePWReq chagePWReq) {
        User searchUser = userDAO.findByEmailAndPassword_MySQL(Email)
                .orElseThrow(() -> new UnauthorizedException(ErrorCode.NOT_FOUND_USER));
        if(passwordEncoder.matches(chagePWReq.getUser_Password(), searchUser.getUser_Password()))
            throw new UnauthorizedException(ErrorCode.PASSWORD_DUPLICATION);

        String encodedPassword = passwordEncoder.encode(chagePWReq.getUser_Password());

        User user_mySQL =  User.builder()
                .user_Email(Email)
                .user_Password(encodedPassword)
                .build();

        userDAO.changePW(user_mySQL);

    }

}
