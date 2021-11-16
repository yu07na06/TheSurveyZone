package com.mongoosereum.dou_survey_zone.v1.api.survey.service;

import com.mongoosereum.dou_survey_zone.v1.api.survey.Answer;
import com.mongoosereum.dou_survey_zone.v1.api.survey.Survey;
import com.mongoosereum.dou_survey_zone.v1.api.survey.dao.SurveyDAO;
import com.mongoosereum.dou_survey_zone.v1.api.survey.dto.SurveyInsertDTO;
import com.mongoosereum.dou_survey_zone.v1.api.survey.repository.SurveyRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@Service
public class SurveyService {
    @Autowired
    private final SurveyRepository surveyRepository;

    @Autowired
    private final SurveyDAO surveyDAO;

    public List<Survey> findAll(){
        return surveyDAO.findAll();
    }
    public String save(SurveyInsertDTO surveyInsertDTO){
        Survey survey = Survey.builder()
                .questionList(surveyInsertDTO.getQuestionList())
                .build();
        return surveyDAO.save(survey);
    }
}
