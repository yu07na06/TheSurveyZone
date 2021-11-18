package com.mongoosereum.dou_survey_zone.v1.api.survey.service;

import com.mongoosereum.dou_survey_zone.v1.api.survey.dto.SurveySelectDTO;
import com.mongoosereum.dou_survey_zone.v1.api.survey.entity.mongo.Survey_Mongo;
import com.mongoosereum.dou_survey_zone.v1.api.survey.dao.SurveyDAO;
import com.mongoosereum.dou_survey_zone.v1.api.survey.dto.AnswerInsertDTO;
import com.mongoosereum.dou_survey_zone.v1.api.survey.dto.SurveyInsertDTO;
import com.mongoosereum.dou_survey_zone.v1.api.survey.entity.mysql.Survey_MySQL;
import com.mongoosereum.dou_survey_zone.v1.api.survey.repository.SurveyRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class SurveyService {
    @Autowired
    private final SurveyRepository surveyRepository;

    @Autowired
    private final SurveyDAO surveyDAO;

    public List<Survey_Mongo> findAll(){
        return surveyDAO.findAll();
    }

    public SurveySelectDTO findById(String sur_ID){
        return surveyDAO.findById(sur_ID);
    }
    public List<Survey_MySQL> selectSurveyList() {
        return surveyDAO.selectSurveyList();
    }
    public String insertSurvey(SurveyInsertDTO surveyInsertDTO){
        System.out.println(surveyInsertDTO.toString());
        // MongoDB insert
        Survey_Mongo survey_Mongo = Survey_Mongo.builder()
                .questionList(surveyInsertDTO.getQuestionList())
                .build();
        String surveyID = surveyDAO.surveyInsert_Mongo(survey_Mongo);

        // MySQL insert by MongoDB.id
        Survey_MySQL survey_MySQL = Survey_MySQL.builder()
                        ._id(surveyID)
                        .sur_Title(surveyInsertDTO.getSur_Title())
                        .sur_Content(surveyInsertDTO.getSur_Content())
                        .sur_State(surveyInsertDTO.getSur_State())
                        .sur_StartDate(surveyInsertDTO.getSur_StartDate())
                        .sur_EndDate(surveyInsertDTO.getSur_EndDate())
                        .sur_Publish(surveyInsertDTO.getSur_Publish())
                        .sur_Image(surveyInsertDTO.getSur_Image())
                        .user_Email(surveyInsertDTO.getUser_Email())
                        .surveyType(surveyInsertDTO.getSur_Type())
                        .build();
        Integer result = surveyDAO.surveyInsert_MySQL(survey_MySQL);
        return ( (result==1) ? surveyID: "Insert Fail");
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