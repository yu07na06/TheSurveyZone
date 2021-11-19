package com.mongoosereum.dou_survey_zone.v1.api.security;

import com.mongoosereum.dou_survey_zone.v1.api.user.entity.User_MySQL;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;

@Slf4j
@Service
public class TokenProvider {
    public static final String SECRET_KEY = "DOUSURVEYZONE";

    public String create(User_MySQL user_mySQL){
        // 기한은 지금부터 1일
        Date expiryDate = Date.from(
                Instant.now().plus(1, ChronoUnit.DAYS));

        /*
        { //header
            "alg":"HS512"
        },
        { //payload
            "sub" : "402880937dasjflks"
            "iss" : "dousurveyzone"
            'iat" : 1595733657"
            "exp" : "1596597657"
        }.
        // Secret_key를 이욯해 서명한 부분
        fjkasdfjadsklfjadksljflkadsjfjasdlkfjasdlkfjald;kj
         */

        //JWT Token 생성
        return Jwts.builder()
                //header에 들어갈 내용 및 서명을 하기 위한 Secret_key
                .signWith(SignatureAlgorithm.HS512, SECRET_KEY)
                .setSubject(user_mySQL.getUser_Email()) //sub
                .setIssuer("dousurveyzone app") // iss
                .setIssuedAt(new Date()) // iat
                .setExpiration(expiryDate) // exp
                .compact();
    }

    public String validateAndGetUserEmail(String token){
        // parseClaimsJws 메소드가 Base64 디코딩 및 파싱
        // 헤더와 페이로드를 setSigningKey로 넘어온 시크릿을 이용해 서명한 후 Token의 서명과 비교
        // 위조되지 않았다면 페이로드(Claims) 리턴, 위조라면 예외로 날림
        // 그 중 우리는 UserEmail이 필요하므로 getbody를 부른다.
        Claims claims = Jwts.parser()
                .setSigningKey(SECRET_KEY)
                .parseClaimsJws(token)
                .getBody();

        return claims.getSubject();
    }
}

