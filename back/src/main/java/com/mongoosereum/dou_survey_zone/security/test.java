//package com.mongoosereum.dou_survey_zone.security;
//
//import io.jsonwebtoken.Claims;
//import io.jsonwebtoken.Jws;
//import io.jsonwebtoken.Jwts;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.util.ObjectUtils;
//import org.springframework.web.util.WebUtils;
//
//import javax.servlet.FilterChain;
//import javax.servlet.ServletException;
//import javax.servlet.ServletRequest;
//import javax.servlet.ServletResponse;
//import javax.servlet.http.Cookie;
//import javax.servlet.http.HttpServletRequest;
//import java.io.IOException;
//
//public class test {
//
//    @Override
//    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
//
//        // 헤더에서 JWT 를 받아옵니다.
//        // (HttpServletRequest) => ServletRequest를 바꾸기위해서 써야한다.
//        String token = tokenProvider.resolveToken((HttpServletRequest) request);
//
//        // 유효한 토큰인지 확인합니다.
//        if (token != null && tokenProvider.validateAndGetUserEmail(token)) {
//            log.info(token);
//
//            //레디스에 접속해서 get때린다.
//            String isLogout = (String) redisTemplate.opsForValue().get("BT:" + token);
//
//            // redis에 로그아웃된 토큰이 존재하는지 확인
//            // 값이 저장되있으면 당연히 안되는게 맞다
//            // null인 상태에서만 넘어간다.
//            if (ObjectUtils.isEmpty(isLogout)) {
//                // 토큰이 유효하면 토큰으로부터 유저 정보를 받아옵니다.
//                Authentication authentication = tokenProvider.validateAndGetUserEmail(token);
//                // SecurityContext 에 Authentication 객체를 저장합니다.
//                SecurityContextHolder.getContext().setAuthentication(authentication);
//            }
//        }
//
//
//        chain.doFilter(request, response);
//    }
//
//    // Request의 Header에서 token 값을 가져옵니다. "X-AUTH-TOKEN" : "TOKEN값'
//    public String resolveToken(HttpServletRequest request) {
//        Cookie name = WebUtils.getCookie(request, "token");
//        if(name != null) {
//            return name.getValue();
//        }else {
//            return null;
//        }
////        return request.getHeader("X-AUTH-TOKEN");
//    }
//
//    // 토큰의 유효성 + 만료일자 확인
//    public Jws<Claims> confirmToken(String jwtToken) {
//
//        Jws<Claims> claims = Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(jwtToken);
//        return claims;
//
//    }
//
//}
