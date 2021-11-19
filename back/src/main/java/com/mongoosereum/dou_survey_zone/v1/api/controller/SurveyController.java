package com.mongoosereum.dou_survey_zone.v1.api.controller;

import com.mongoosereum.dou_survey_zone.v1.api.survey.dto.SurveySelectDTO;
import com.mongoosereum.dou_survey_zone.v1.api.survey.entity.mongo.Survey_Mongo;
import com.mongoosereum.dou_survey_zone.v1.api.survey.dao.SurveyDAO;
import com.mongoosereum.dou_survey_zone.v1.api.survey.dto.AnswerInsertDTO;
import com.mongoosereum.dou_survey_zone.v1.api.survey.dto.SurveyInsertDTO;
import com.mongoosereum.dou_survey_zone.v1.api.survey.entity.mysql.Survey_MySQL;
import com.mongoosereum.dou_survey_zone.v1.api.survey.service.SurveyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/api/v1/survey", produces = MediaType.APPLICATION_JSON_VALUE)
public class SurveyController{
    @Autowired
    private SurveyService surveyService;

    @GetMapping(path="/ddd")
    public List<Survey_Mongo> getSurvey(){
        return surveyService.findAll();
    }
    // selectSurveyList 설문지 리스트 출력
    @GetMapping(path="/")
    public List<Survey_MySQL> selectSurveyList(){
        return surveyService.selectSurveyList();
    }
    // FindById 설문 참여할 때 설문 출력
    @GetMapping(path="/{sur_ID}")
    public SurveySelectDTO findById(@PathVariable("sur_ID") String sur_ID){
        return surveyService.findById(sur_ID);
    }
    // 설문지 생성
    @PostMapping(path="/")
    public String surveyInsert(@RequestBody SurveyInsertDTO surveyInsertDTO){
        return surveyService.insertSurvey(surveyInsertDTO);
    }

    @PostMapping("/submit")
    public String answerInsert(@RequestBody AnswerInsertDTO answerInsertDTO){
        return surveyService.insertAnswer(answerInsertDTO);
    }

    //접근 권한 테스트용
    @GetMapping(path="/test")
    public String testabc() {
        return "test OK!";
    }
}