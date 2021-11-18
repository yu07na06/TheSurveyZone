package com.mongoosereum.dou_survey_zone.v1.api.controller;

import com.mongoosereum.dou_survey_zone.v1.api.survey.entity.mongo.Survey_Mongo;
import com.mongoosereum.dou_survey_zone.v1.api.survey.dao.SurveyDAO;
import com.mongoosereum.dou_survey_zone.v1.api.survey.dto.AnswerInsertDTO;
import com.mongoosereum.dou_survey_zone.v1.api.survey.dto.SurveyInsertDTO;
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

    @GetMapping(path="/")
    public List<Survey_Mongo> getSurvey(){
        return surveyService.findAll();
    }

    @PostMapping(path="/")
    public Integer surveyInsert(@RequestBody SurveyInsertDTO surveyInsertDTO){
        System.out.println("surveyInsert 실행!");
        System.out.println(surveyInsertDTO.toString());
        // 성공시 1 return
        return surveyService.surveyInsert(surveyInsertDTO);
    }

    @PostMapping("/submit")
    public String insertSurveyAnswer(@RequestBody AnswerInsertDTO answerInsertDTO){
        System.out.println(answerInsertDTO.get_id());
        return surveyService.insertAnswer(answerInsertDTO);
    }
}