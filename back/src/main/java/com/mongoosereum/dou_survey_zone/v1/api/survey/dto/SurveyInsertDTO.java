package com.mongoosereum.dou_survey_zone.v1.api.survey.dto;

import com.mongoosereum.dou_survey_zone.v1.api.survey.entity.SurveyType;
import com.mongoosereum.dou_survey_zone.v1.api.survey.entity.mongo.Question;
import com.mongoosereum.dou_survey_zone.v1.api.survey.entity.SurveyProgressType;
import lombok.Data;
import lombok.ToString;

import java.util.Date;
import java.util.List;

@Data
@ToString
public class SurveyInsertDTO {
    private String sur_Title;
    private String sur_Content;
    private SurveyProgressType sur_State;
    private Date sur_StartDate;
    private Date sur_EndDate;
    private Boolean sur_Publish;
    private String sur_Image;
    private String user_Email;
    private List<Question> questionList;
    private SurveyType sur_Type;

    @Override
    public String toString() {
        return "SurveyInsertDTO{" +
                "sur_Title='" + sur_Title + '\'' +
                ", sur_Content='" + sur_Content + '\'' +
                ", sur_State=" + sur_State +
                ", sur_StartDate=" + sur_StartDate +
                ", sur_EndDate=" + sur_EndDate +
                ", sur_Publish=" + sur_Publish +
                ", sur_Image='" + sur_Image + '\'' +
                ", user_Email='" + user_Email + '\'' +
                ", questionList=" + questionList +
                ", sur_Type=" + sur_Type +
                '}';
    }
}