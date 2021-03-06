package com.mongoosereum.dou_survey_zone.api.v1.domain.survey;


import com.mongoosereum.dou_survey_zone.api.v1.dto.request.survey.InsertSurveyReq;
import lombok.*;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
public class Survey_MySQL {
    private String _id;
    private String sur_Title; // 설문 제목
    private String sur_Content; // 설문 본문
    private Integer sur_State;
    private LocalDate sur_StartDate;
    private LocalDate sur_EndDate;
    private Boolean sur_Publish;
    private String sur_Img;
    private String user_Email;
    private Integer sur_Type;
    private Integer tag_ID;

    @Builder
    public Survey_MySQL(String _id, String sur_Title, String sur_Content, Integer sur_State, LocalDate sur_StartDate, LocalDate sur_EndDate, Boolean sur_Publish, String sur_Img, String user_Email, Integer surveyType,Integer tag_ID) {
        this._id = _id;
        this.sur_Title = sur_Title;
        this.sur_Content = sur_Content;
        this.sur_State = sur_State;
        this.sur_StartDate = sur_StartDate;
        this.sur_EndDate = sur_EndDate;
        this.sur_Publish = sur_Publish;
        this.sur_Img = sur_Img;
        this.user_Email = user_Email;
        this.sur_Type = surveyType;
        this.tag_ID = tag_ID;
    }

    public void set(InsertSurveyReq insertSurveyReq){
        this.sur_Title = insertSurveyReq.getSur_Title();
        this.sur_Content = insertSurveyReq.getSur_Content();
        this.sur_State = insertSurveyReq.getSur_State().getNum();
        this.sur_StartDate = insertSurveyReq.getSur_StartDate();
        this.sur_EndDate = insertSurveyReq.getSur_EndDate();
        this.sur_Publish = insertSurveyReq.getSur_Publish();
        this.sur_Img = insertSurveyReq.getSur_Image();
        this.user_Email = insertSurveyReq.getUser_Email();
        this.sur_Type = insertSurveyReq.getSur_Type().getNum();
        this.tag_ID = insertSurveyReq.getSur_Tag();
    }
    public Survey_MySQL setSur_State(int sur_State) {
        this.sur_State = sur_State;
        return this;
    }
}
