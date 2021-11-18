package com.mongoosereum.dou_survey_zone.v1.api.survey.entity.mysql;

import com.mongoosereum.dou_survey_zone.v1.api.survey.entity.SurveyProgressType;
import com.mongoosereum.dou_survey_zone.v1.api.survey.entity.SurveyType;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@NoArgsConstructor
public class Survey_MySQL {
    private String _id;
    private String sur_Title; // 설문 제목
    private String sur_Content; // 설문 본문
    private SurveyProgressType sur_State;
    private Date sur_StartDate;
    private Date sur_EndDate;
    private Boolean sur_Publish;
    private String sur_Image;
    private String user_Email;
    private SurveyType sur_Type;

    @Builder
    public Survey_MySQL(String _id, String sur_Title, String sur_Content, SurveyProgressType sur_State, Date sur_StartDate, Date sur_EndDate, Boolean sur_Publish, String sur_Image, String user_Email, SurveyType surveyType) {
        this._id = _id;
        this.sur_Title = sur_Title;
        this.sur_Content = sur_Content;
        this.sur_State = sur_State;
        this.sur_StartDate = sur_StartDate;
        this.sur_EndDate = sur_EndDate;
        this.sur_Publish = sur_Publish;
        this.sur_Image = sur_Image;
        this.user_Email = user_Email;
        this.sur_Type = surveyType;
    }
}
