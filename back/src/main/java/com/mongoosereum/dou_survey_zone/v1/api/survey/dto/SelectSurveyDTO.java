package com.mongoosereum.dou_survey_zone.v1.api.survey.dto;

import com.mongoosereum.dou_survey_zone.v1.api.survey.entity.SurveyProgressType;
import com.mongoosereum.dou_survey_zone.v1.api.survey.entity.SurveyType;
import com.mongoosereum.dou_survey_zone.v1.api.survey.entity.mongo.Question;
import com.mongoosereum.dou_survey_zone.v1.api.survey.entity.mongo.Survey_Mongo;
import com.mongoosereum.dou_survey_zone.v1.api.survey.entity.mysql.Survey_MySQL;
import lombok.Data;
import lombok.ToString;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Data
@ToString
public class SelectSurveyDTO {
    private String _id;
    private String sur_Title; // 설문 제목
    private String sur_Content; // 설문 본문
    private Integer sur_State;
    private LocalDate sur_StartDate;
    private LocalDate sur_EndDate;
    private Boolean sur_Publish;
    private String sur_Image;
    private String user_Email;
    private Integer sur_Type;
    private List<Question> questionList;

    public void set(Survey_Mongo survey_mongo, Survey_MySQL survey_mySQL){
        this._id = survey_mongo.get_id();
        this.sur_Title = survey_mySQL.getSur_Title();
        this.sur_Content = survey_mySQL.getSur_Content();
        this.sur_State = survey_mySQL.getSur_State();
        this.sur_StartDate = survey_mySQL.getSur_StartDate();
        this.sur_EndDate = survey_mySQL.getSur_EndDate();
        this.sur_Image = survey_mySQL.getSur_Image();
        this.user_Email = survey_mySQL.getUser_Email();
        this.sur_Publish = survey_mySQL.getSur_Publish();
        this.sur_Type = survey_mySQL.getSur_Type();
        this.questionList = survey_mongo.getQuestionList();
    }
}
