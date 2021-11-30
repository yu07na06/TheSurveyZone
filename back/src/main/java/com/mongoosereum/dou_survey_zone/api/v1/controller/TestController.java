package com.mongoosereum.dou_survey_zone.api.v1.controller;

import com.mongoosereum.dou_survey_zone.api.v1.common.S3Uploader;
import com.mongoosereum.dou_survey_zone.api.v1.common.mail.MailService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

@RequiredArgsConstructor
@RestController
@RequestMapping(path = "/api/v1", produces = MediaType.APPLICATION_JSON_VALUE)
public class TestController{

    private final S3Uploader s3Uploader;

    @Autowired
    private final MailService mailService;

    @PostMapping(path="/ddd")
    public String test1( @AuthenticationPrincipal String userEmail){
        return userEmail;
    }

    @PostMapping(path="/testS3")
    public String testS3(@RequestParam("image") MultipartFile multipartFile) throws IOException {
        return s3Uploader.upload(multipartFile,"static");
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