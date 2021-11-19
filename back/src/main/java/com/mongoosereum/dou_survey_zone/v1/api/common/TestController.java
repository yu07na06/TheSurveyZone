package com.mongoosereum.dou_survey_zone.v1.api.common;

import com.mongoosereum.dou_survey_zone.v1.api.survey.entity.mysql.Survey_MySQL;
import com.mongoosereum.dou_survey_zone.v1.api.survey.service.SurveyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/api/v1", produces = MediaType.APPLICATION_JSON_VALUE)
public class TestController{

    @Autowired
    SurveyService surveyService;

    @GetMapping(path="/ddd")
    public String test1( @AuthenticationPrincipal String userEmail){
        return userEmail;
    }
    // selectSurveyList 설문지 리스트 출력
    @GetMapping(path="/list")
    public ResponseEntity selectSurveyList(){
        List<Survey_MySQL> surveyList = surveyService.selectSurveyList();
        if(surveyList != null){
            return ResponseEntity.status(HttpStatus.OK).body(surveyList);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("설문 리스트가 존재하지 않습니다.");
    }
}