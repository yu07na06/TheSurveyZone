package com.mongoosereum.dou_survey_zone.v1.api.survey.entity.mysql;


import com.mongoosereum.dou_survey_zone.v1.api.survey.entity.SurveyProgressType;
import com.mongoosereum.dou_survey_zone.v1.api.survey.entity.SurveyType;
import io.swagger.annotations.ApiModel;
import lombok.*;

import java.time.LocalDate;
import java.util.Date;

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
    private String sur_Image;
    private String user_Email;
    private Integer sur_Type;
    private Integer tag_ID;
    @Builder
    public Survey_MySQL(String _id, String sur_Title, String sur_Content, Integer sur_State, LocalDate sur_StartDate, LocalDate sur_EndDate, Boolean sur_Publish, String sur_Image, String user_Email, Integer surveyType,Integer tag_ID) {
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

    public Survey_MySQL setSur_State(int sur_State) {
        this.sur_State = sur_State;
        return this;
    }

}
