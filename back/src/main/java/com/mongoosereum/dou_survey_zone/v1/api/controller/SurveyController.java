package com.mongoosereum.dou_survey_zone.v1.api.controller;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.mongoosereum.dou_survey_zone.v1.api.survey.Survey;
import com.mongoosereum.dou_survey_zone.v1.api.survey.dao.SurveyDAO;
import com.mongoosereum.dou_survey_zone.v1.api.survey.dto.AnswerInsertDTO;
import com.mongoosereum.dou_survey_zone.v1.api.survey.dto.SurveyInsertDTO;
import com.mongoosereum.dou_survey_zone.v1.api.survey.repository.SurveyRepository;
import com.mongoosereum.dou_survey_zone.v1.api.survey.service.SurveyService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/api/v1/survey", produces = MediaType.APPLICATION_JSON_VALUE)
public class SurveyController{
    @Autowired
    private SurveyService surveyService;

    @Autowired
    private SurveyDAO surveyDAO;

    @GetMapping(path="/")
    public List<Survey> getSurvey(){
        return surveyService.findAll();
    }

    @PostMapping(path="/")
    public String insertSurvey(@RequestBody SurveyInsertDTO surveyInsertDTO){
        System.out.println(surveyInsertDTO.toString());
        return surveyService.save(surveyInsertDTO);
    }

    @PostMapping("/submit")
    public String insertSurveyAnswer(@RequestBody AnswerInsertDTO answerInsertDTO){
        System.out.println(answerInsertDTO.get_id());
        return surveyService.insertAnswer(answerInsertDTO);
    }
}