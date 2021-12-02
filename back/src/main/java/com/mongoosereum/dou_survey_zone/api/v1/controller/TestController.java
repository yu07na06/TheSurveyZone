package com.mongoosereum.dou_survey_zone.api.v1.controller;

import com.mongoosereum.dou_survey_zone.api.v1.common.S3Uploader;
import com.mongoosereum.dou_survey_zone.api.v1.common.mail.MailService;
import com.mongoosereum.dou_survey_zone.api.v1.domain.user.User;
import com.mongoosereum.dou_survey_zone.api.v1.dto.request.survey.SendSurveyReq;
import com.mongoosereum.dou_survey_zone.api.v1.dto.response.survey.SelectSurveyRes;
import com.mongoosereum.dou_survey_zone.api.v1.exception.ExceptionModel;
import com.mongoosereum.dou_survey_zone.api.v1.service.SurveyService;
import com.mongoosereum.dou_survey_zone.api.v1.service.UserService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
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

    @Autowired
    private final SurveyService surveyService;

    @Autowired
    private final UserService userService;

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

    @PostMapping(path="/user/send")
    @ApiOperation(value="설문 전송", notes="이메일 리스트에 설문 참여 안내 이메일 전송")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공", response = String.class),
            @ApiResponse(code = 403, message = "해당 작성자 아님", response = ExceptionModel.class),
            @ApiResponse(code = 404, message = "해당 유저 or 설문 없음", response = ExceptionModel.class),
    })
    public ResponseEntity testEmail(
            @ApiParam(value = "메일 전송 DTO", required = true)
            @RequestBody
                    SendSurveyReq sendSurveyReq,
            @AuthenticationPrincipal
                    String userEmail
    ){
        User user = userService.findByEmail(userEmail);
        SelectSurveyRes selectSurveyRes = surveyService.findById(sendSurveyReq.get_id());

        sendSurveyReq.setSurvey(selectSurveyRes);
        sendSurveyReq.setFrom(user);

        mailService.sendSurvey(sendSurveyReq);
        return ResponseEntity.status(HttpStatus.OK).body("EMAIL SENT");
    }
}