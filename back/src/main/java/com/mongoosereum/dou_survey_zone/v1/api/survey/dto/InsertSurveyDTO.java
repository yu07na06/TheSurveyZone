package com.mongoosereum.dou_survey_zone.v1.api.survey.dto;

import com.mongoosereum.dou_survey_zone.v1.api.survey.entity.SurveyType;
import com.mongoosereum.dou_survey_zone.v1.api.survey.entity.mongo.Question;
import com.mongoosereum.dou_survey_zone.v1.api.survey.entity.SurveyProgressType;
import lombok.Data;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Data
public class InsertSurveyDTO {
    private String sur_Title;
    private String sur_Content;
    private SurveyProgressType sur_State;
    private LocalDate sur_StartDate;
    private LocalDate sur_EndDate;
    private Boolean sur_Publish;
    private String sur_Image;
    private String user_Email;
    private List<Question> questionList;
    private SurveyType sur_Type;
}