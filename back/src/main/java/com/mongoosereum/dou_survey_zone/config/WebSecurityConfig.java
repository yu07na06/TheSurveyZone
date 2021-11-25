package com.mongoosereum.dou_survey_zone.config;

import com.mongoosereum.dou_survey_zone.security.JwtAuthenticationFilter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.filter.CorsFilter;

@EnableWebSecurity
@Slf4j
@Configuration
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Bean
    public PasswordEncoder getPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Autowired
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        //http 시큐리티 빌더
        http.cors()
                .and().csrf().disable()
                .httpBasic().disable() // token을 사용하므로 Basic 인증 disable
                .sessionManagement() // session 기반이 아님을 명시
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authorizeRequests() // /와 /auth/** 경로는 인증 안해도 됨
                .antMatchers("/","/api/v1/user/**", "/api/v1/survey/{}", "/api/v1/participation/**").permitAll()
                .anyRequest()
                .permitAll();
//                .authenticated();

        // fillter 등록
        // 매요청 마다
        // CorsFilter 실행한 후에
        // jwtAuthenticationFilter 실행을 한다.
        http.addFilterAfter(
                jwtAuthenticationFilter,
                CorsFilter.class
        );
        // 토큰 보낼때 쿠키로 보낸다음 response cookie setcookie
        // 토큰이 담겨있으니까 읽을때 헤더의 토큰을 읽어오는데 쿠키에서 getCookie를 가져와서 확인함
        // 모르겠으면 진우형한테 물어보기
    }
}


// survey/{_id} 는 GET, POST만 허용되어야 한다. 이상 전달 끝