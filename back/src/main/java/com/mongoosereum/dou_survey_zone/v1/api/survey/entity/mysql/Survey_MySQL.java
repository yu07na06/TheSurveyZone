package com.mongoosereum.dou_survey_zone.v1.api.survey.entity.mysql;


import com.mongoosereum.dou_survey_zone.v1.api.survey.entity.SurveyProgressType;
import com.mongoosereum.dou_survey_zone.v1.api.survey.entity.SurveyType;
import io.swagger.annotations.ApiModel;
import lombok.*;

import java.time.LocalDate;
import java.util.Date;

@Data
@Builder
@AllArgsConstructor
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
}
