package com.mongoosereum.dou_survey_zone.api.v1.dto.request.survey;

import com.mongoosereum.dou_survey_zone.api.v1.domain.user.User;
import com.mongoosereum.dou_survey_zone.api.v1.dto.response.survey.SelectSurveyRes;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.util.List;

@Data
@ApiModel("이메일 전송 DTO")
public class SendSurveyReq {

    private User from;

    @ApiModelProperty("설문 ID")
    private String _id;

    private SelectSurveyRes survey;

    @ApiModelProperty("이메일 List")
    private List<String> emailList;
}
