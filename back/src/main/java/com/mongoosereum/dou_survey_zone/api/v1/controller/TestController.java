package com.mongoosereum.dou_survey_zone.api.v1.controller;

import com.mongoosereum.dou_survey_zone.api.v1.common.mail.MailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@RestController
@RequestMapping(path = "/api/v1", produces = MediaType.APPLICATION_JSON_VALUE)
public class TestController{

    @Autowired
    private final MailService mailService;

    public TestController() {
        mailService = null;
    }

    @PostMapping(path="/ddd")
    public String test1( @AuthenticationPrincipal String userEmail){
        return userEmail;
    }

    @GetMapping(path="/testIP")
    public String testIP(HttpServletRequest request){
        String ip = "";
        String[] Header = new String []{
                "X-Forwarded-For",
                "Proxy-Client-IP",
                "WL-Proxy-Client-IP",
                "HTTP_CLIENT_IP",
                "HTTP_X_FORWARDED_FOR"
        };
        for(int i=0;i < Header.length;i++){
            ip += (Header[i] + " ip : " + request.getHeader(Header[i]) + "\n");
        }
        ip += "getRemoteAddr" + request.getRemoteAddr();
        System.out.println("=========================");
        System.out.println(ip);
        System.out.println("=========================");
        return ip;
    }
}