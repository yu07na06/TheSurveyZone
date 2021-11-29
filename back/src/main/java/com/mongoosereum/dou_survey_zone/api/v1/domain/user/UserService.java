package com.mongoosereum.dou_survey_zone.api.v1.domain.user;

import com.mongoosereum.dou_survey_zone.api.v1.common.mail.MailService;
import com.mongoosereum.dou_survey_zone.api.v1.dao.UserDAO;
import com.mongoosereum.dou_survey_zone.api.v1.dto.request.user.SearchPWReq;
import com.mongoosereum.dou_survey_zone.api.v1.dto.request.user.SignUpReq;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.*;
import java.util.concurrent.TimeUnit;

@Service
public class UserService {

    @Autowired
    private UserDAO userDAO;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private RedisTemplate redisTemplate;

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

    public List<?> login(final String email, final String password){
        User searchUser =  userDAO.findByEmailAndPassword_MySQL(email);
        String tempPW = (String) redisTemplate.opsForValue().get(email+" TempPW");

        ArrayList result = new ArrayList();

        if(searchUser != null){
            if(passwordEncoder.matches(password, searchUser.getUser_Password())){
                result.add("UserPW");
                result.add(searchUser);
                return result;
            }
            else if(passwordEncoder.matches(password, tempPW)) {
                result.add("TempPW");
                result.add(searchUser);
                return result;
            }
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
    public int findByEmail_Name_Tel(SearchPWReq searchPWReq){
        int result = userDAO.findByEmail_Name_Tel(
                User.builder()
                .user_Email(searchPWReq.getUser_Email())
                .user_Name(searchPWReq.getUser_Name())
                .user_Tel(searchPWReq.getUser_Tel())
                .build());
        return result;
    }

    public boolean BlackListToken(String token, Jws<Claims> claims){
//	        log.info("logout:"+(claims.getBody().getExpiration().getTime()-System.currentTimeMillis()));

        // BlackListToken Redis 저장 (expirationTime 설정을 통해 자동 삭제 처리)

        System.out.println(claims.getBody().getExpiration().getTime()-System.currentTimeMillis());

        long expiretime =  claims.getBody().getExpiration().getTime()-System.currentTimeMillis();

        //.set(이름 (bt: 토큰) , value(), 익스파이어 시간, 시간 타입)
        try{redisTemplate.opsForValue()
                .set("BT:" + token, expiretime,
                        // Date 타입(LONG) - 현재시간 () = 유효기간 남은시간() 만큼난 REDIS에서 쳐 들고잇는다.
                        expiretime,
                        TimeUnit.MILLISECONDS);
            return true;
        }catch (Exception e) {
            return false;
        }

        //is empty에서 redis black list를 판별한번 조지고 뒤에 인가할건지 filter실행
    }

    //임시 비밀번호 발금
    public String makeTempPW(String User_Email) {
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
                        // Date 타입(LONG) - 현재시간 () = 유효기간 남은시간() 만큼난 REDIS에서 쳐 들고잇는다.
                        10,
                        TimeUnit.MINUTES);

        return tempPW;
    }
}
