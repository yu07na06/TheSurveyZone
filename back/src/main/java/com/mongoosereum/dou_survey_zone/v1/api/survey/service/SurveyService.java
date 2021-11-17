package com.mongoosereum.dou_survey_zone.v1.api.survey.service;

import com.mongoosereum.dou_survey_zone.v1.api.survey.Answer;
import com.mongoosereum.dou_survey_zone.v1.api.survey.Question;
import com.mongoosereum.dou_survey_zone.v1.api.survey.Survey;
import com.mongoosereum.dou_survey_zone.v1.api.survey.dao.SurveyDAO;
import com.mongoosereum.dou_survey_zone.v1.api.survey.dto.AnswerInsertDTO;
import com.mongoosereum.dou_survey_zone.v1.api.survey.dto.SurveyInsertDTO;
import com.mongoosereum.dou_survey_zone.v1.api.survey.repository.SurveyRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.springframework.data.mongodb.core.query.Criteria.where;

@AllArgsConstructor
@Service
public class SurveyService {
    @Autowired
    private final SurveyRepository surveyRepository;

    @Autowired
    private final SurveyDAO surveyDAO;

//    @Autowired
//    private final SurveyMySqlDAO surveyMySqlDAO;

    public List<Survey> findAll(){
        return surveyDAO.findAll();
    }
    public String save(SurveyInsertDTO surveyInsertDTO){
        Survey survey = Survey.builder()
                .questionList(surveyInsertDTO.getQuestionList())
                .build();
        return surveyDAO.save(survey);
        // String surveyID = surveyDAO.save(survey);
        // TODO surveyID 이용해서 mySQL에 데이터 삽입
        // surveyMySqlDAO.insertSurvey();
    }

    public String insertAnswer(AnswerInsertDTO answerInsertDTO){
//        Optional<Survey> optSurvey = surveyRepository.findById(answerInsertDTO.get_id());
//        if(optSurvey.isPresent()) {
//            System.out.println("###### 존재하지 않는 ID값 ######");
//            return "존재하지 않는 설문입니다";
//        }
        return surveyDAO.insertAnswer(answerInsertDTO);
    }
}