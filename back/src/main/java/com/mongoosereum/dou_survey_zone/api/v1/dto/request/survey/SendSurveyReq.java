package com.mongoosereum.dou_survey_zone.api.v1.dto.request.survey;

import com.mongoosereum.dou_survey_zone.api.v1.domain.user.User;
import com.mongoosereum.dou_survey_zone.api.v1.dto.response.survey.SelectSurveyRes;
import lombok.Data;

import java.util.List;

@Data
public class SendSurveyReq {

    private User from;

    private String _id;

    private SelectSurveyRes survey;

    private List<String> emailList;
}
