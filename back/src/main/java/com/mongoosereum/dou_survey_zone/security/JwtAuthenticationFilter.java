package com.mongoosereum.dou_survey_zone.security;

import com.mongoosereum.dou_survey_zone.api.v1.exception.ErrorCode;
import com.mongoosereum.dou_survey_zone.api.v1.exception.ForbiddenException;
import com.mongoosereum.dou_survey_zone.api.v1.exception.UnauthorizedException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.ObjectUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.util.WebUtils;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private TokenProvider tokenProvider;

    @Autowired
    private RedisTemplate redisTemplate;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        try {
            //요청에서 토큰 가져오기
            String token = parseBearerToken(request);

            log.info("Filter is running...");
            // 토큰 검사하기.  JWT이므로 인가 서버에 요청하지 않고도 검증이 가능
            if (token != null && !token.equalsIgnoreCase("null")) {


                String isLogout = (String) redisTemplate.opsForValue().get("BT:" + token);
                log.info(ObjectUtils.isEmpty(isLogout)? "this token is not black list" : "this token is black list");

                if(ObjectUtils.isEmpty(isLogout)) {
                    //userEmail 가져오기. 위조된 경우 예외 처리된다.
                    String userEmail = tokenProvider.validateAndGetUserEmail(token);
                    log.info("Authenticated user Email :" + userEmail);
                    //인증 완료. SecurityContextHolder에 등록해야 인증된 사용자라고 생각한다
                    AbstractAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                            userEmail, // 인증된 사용자의 정보, 무자열리 아니여도 아무것이나 넣을 수 있다. 보퉁 UserDetail라는 오브젝트를 넣는 것이 과반수
                            null, //
                            AuthorityUtils.NO_AUTHORITIES
                    );
                    authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContext securityContext = SecurityContextHolder.createEmptyContext();
                    securityContext.setAuthentication(authentication);
                    SecurityContextHolder.setContext(securityContext);
                }
            }
        }catch (Exception e){
            logger.error("Could not set user authentication in security context" , e);
        }
        filterChain.doFilter(request, response);
        }


        private String parseBearerToken(HttpServletRequest request){
        // Http 요청의 헤더를 파싱해 Bearar 토큰을 리턴한다.
            Cookie bearerToken =  WebUtils.getCookie(request, "Authorization");
            if (bearerToken != null) {
                return bearerToken.getValue();
            }
            return null;
            }


}
// 1. 요청의 헤더에서 Bearer 토큰을 가져온다. 이 작업은 parseBearerToken() 메서드에서 이뤄진다.
// 2. TokenProvider를 이용해서 토큰을 인증하고 UsernamePasswordAuthenticationToken을 작성한다.
// 이 오브젝트에 사용자의 인증 정보를 저장하고 SecurityContext에 인증된 사용자를 등록한다.
// 왜 등록하냐? 요청을 처리하는 과정에서 사용자가 인증됐는지의 여부나 인증된 사용자가 누군지 알아야 할 때가 있기 때문


