package com.mongoosereum.dou_survey_zone.v1.api.controller;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.mongoosereum.dou_survey_zone.v1.api.survey.Survey;
import com.mongoosereum.dou_survey_zone.v1.api.survey.repository.SurveyRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(path = "/api/v1/survey", produces = MediaType.APPLICATION_JSON_VALUE)
public class SurveyController{
    @Autowired
    private SurveyRepository surveyRepository;

    @GetMapping(path="/")
    public List<Survey> getSurvey(){
        return surveyRepository.findAll();
    }
}