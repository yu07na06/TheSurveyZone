package com.mongoosereum.dou_survey_zone.security;

import com.mongoosereum.dou_survey_zone.api.v1.domain.user.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.util.WebUtils;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.Optional;

@Slf4j
@Service
public class TokenProvider {
    public static final String SECRET_KEY = "DOUSURVEYZONE";

    public String create(User user_mySQL){
        //TODO 유효기간 현재 작업 편하게 10시간 해둠 1시간으로 변경 필요!
        Date expiryDate = Date.from(
                Instant.now().plus(10, ChronoUnit.HOURS));

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

    // Request의 Header에서 token 값을 가져옵니다. "X-AUTH-TOKEN" : "TOKEN값'
    public String resolveToken(HttpServletRequest request) {
        Cookie token =  WebUtils.getCookie(request, "Authorization");
        if(token != null) {
            return token.getValue();
        }else {
            return null;
        }
    }

    // 토큰의 유효성 + 만료일자 확인
    public Jws<Claims> confirmToken(String jwtToken) {
        Jws<Claims> claims = Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(jwtToken);
        return claims;

    }

}

