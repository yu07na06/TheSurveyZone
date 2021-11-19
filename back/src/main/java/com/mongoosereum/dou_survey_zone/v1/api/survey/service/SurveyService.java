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

    @Transactional(rollbackFor=Exception.class)
    public String insertSurvey(InsertSurveyDTO surveyInsertDTO){
       // MongoDB insert
        Survey_Mongo survey_Mongo = Survey_Mongo.builder()
                .questionList(surveyInsertDTO.getQuestionList())
                .build();
        String surveyID = surveyDAO.surveyInsert_Mongo(survey_Mongo);

        System.out.println(surveyInsertDTO.toString());
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
        Integer result = surveyDAO.surveyInsert_MySQL(survey_MySQL);
        return ( (result==1) ? surveyID: "Insert Fail");
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
//        Optional<Survey> optSurvey = surveyRepository.findById(answerInsertDTO.get_id());
//        if(optSurvey.isPresent()) {
//            System.out.println("###### 존재하지 않는 ID값 ######");
//            return "존재하지 않는 설문입니다";
//        }
        return surveyDAO.insertAnswer(_id,answerList);
    }
    @Transactional(rollbackFor=Exception.class)
    public Integer deleteSurvey(String _id, String User_Email){
        // 해당 설문의 작성자 확인
        String owner = surveyDAO.selectOwner(_id);

        // 현재 유저와 불일치 -> 실패
        if(!owner.equals(User_Email)) {
            return null;
        }
        // 현재 유저와 일치 -> 성공
        return surveyDAO.deleteSurvey(_id);
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