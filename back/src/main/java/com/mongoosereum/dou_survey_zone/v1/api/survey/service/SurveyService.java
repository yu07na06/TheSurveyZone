package com.mongoosereum.dou_survey_zone.v1.api.survey.service;

import com.mongoosereum.dou_survey_zone.v1.api.survey.dto.SelectSurveyDTO;
import com.mongoosereum.dou_survey_zone.v1.api.survey.entity.mongo.Answer;
import com.mongoosereum.dou_survey_zone.v1.api.survey.entity.mongo.Survey_Mongo;
import com.mongoosereum.dou_survey_zone.v1.api.survey.dao.SurveyDAO;
import com.mongoosereum.dou_survey_zone.v1.api.survey.dto.InsertAnswerDTO;
import com.mongoosereum.dou_survey_zone.v1.api.survey.dto.InsertSurveyDTO;
import com.mongoosereum.dou_survey_zone.v1.api.survey.entity.mysql.Survey_MySQL;
import com.mongoosereum.dou_survey_zone.v1.api.survey.repository.SurveyRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@AllArgsConstructor
@Service
public class SurveyService {
    @Autowired
    private final SurveyDAO surveyDAO;

    public List<Survey_MySQL> selectSurveyList() {
        return surveyDAO.selectSurveyList();
    }
    public List<Survey_MySQL> selectMySurveyList(String User_Email) {
        return surveyDAO.selectMySurveyList(User_Email);
    }

    public String insertSurvey(InsertSurveyDTO surveyInsertDTO){
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
                        .sur_State(surveyInsertDTO.getSur_State().getNum())
                        .sur_StartDate(surveyInsertDTO.getSur_StartDate())
                        .sur_EndDate(surveyInsertDTO.getSur_EndDate())
                        .sur_Publish(surveyInsertDTO.getSur_Publish())
                        .sur_Image(surveyInsertDTO.getSur_Image())
                        .user_Email(surveyInsertDTO.getUser_Email())
                        .surveyType(surveyInsertDTO.getSur_Type().getNum())
                        .build();
        try {
            surveyDAO.surveyInsert_MySQL(survey_MySQL);
        }catch(Exception e) {
            // Insert에 실패한경우 생성된 MongoDB의 Document를 삭제해줘야함
            surveyDAO.deleteSurvey_Mongo(surveyID);
            return "FAIL";
        }
        return surveyID;
    }

    public SelectSurveyDTO findById(String _id){
        Survey_MySQL resultMySQL = surveyDAO.findById_MySQL(_id);
        Survey_Mongo resultMongo = surveyDAO.findById_Mongo(_id);

        SelectSurveyDTO surveySelectDTO = new SelectSurveyDTO();
        surveySelectDTO.set(resultMongo,resultMySQL);
        return surveySelectDTO;
    }

    @Transactional(rollbackFor=Exception.class)
    public Integer insertAnswer(String _id, List<Answer> answerList){
        return surveyDAO.insertAnswer(_id,answerList);
    }
    @Transactional(rollbackFor=Exception.class)
    public Long deleteSurvey(String _id, String User_Email){
        String owner = surveyDAO.selectOwner(_id);
        if(!owner.equals(User_Email)) {
            return 0L;
        }
        surveyDAO.deleteSurvey_MySQL(_id);
        return surveyDAO.deleteSurvey_Mongo(_id);
    }

    @Transactional(rollbackFor=Exception.class)
    public Boolean updateSurvey(String _id, InsertSurveyDTO surveyInsertDTO) throws Exception {
        // MongoDB insert
        Survey_Mongo survey_Mongo = Survey_Mongo.builder()
                ._id(_id)
                .questionList(surveyInsertDTO.getQuestionList())
                .build();

        Survey_MySQL survey_MySQL = Survey_MySQL.builder()
                ._id(_id)
                .sur_Title(surveyInsertDTO.getSur_Title())
                .sur_Content(surveyInsertDTO.getSur_Content())
                .sur_State(surveyInsertDTO.getSur_State().getNum())
                .sur_StartDate(surveyInsertDTO.getSur_StartDate())
                .sur_EndDate(surveyInsertDTO.getSur_EndDate())
                .sur_Publish(surveyInsertDTO.getSur_Publish())
                .sur_Image(surveyInsertDTO.getSur_Image())
                .user_Email(surveyInsertDTO.getUser_Email())
                .surveyType(surveyInsertDTO.getSur_Type().getNum())
                .build();

        Long resultMongo = surveyDAO.updateSurvey_Mongo(survey_Mongo);
        if(resultMongo==0L)
            throw new Exception("IMPOSSIBLE TO UPDATE");
        // MySQL insert by MongoDB.id
        Integer resultMySQL = surveyDAO.updateSurvey_MySQL(survey_MySQL);
//        if (resultMySQL.equals("500")|| resultMySQL.equals("500"))
//            throw new Exception("Failed to ");
//        if(surveyDAO.surveyUpdate_MySQL(survey_MySQL)!=0 && surveyDAO.surveyUpdate_Mongo(survey_Mongo)!= 0L)
//            return true;
        if(resultMySQL>=1)
            return true;
        else
            throw new Exception("IMPOSSIBLE TO UPDATE");
    }
}