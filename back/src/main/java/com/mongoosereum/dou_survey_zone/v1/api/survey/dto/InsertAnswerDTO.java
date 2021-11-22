package com.mongoosereum.dou_survey_zone.v1.api.survey.dto;

import com.mongoosereum.dou_survey_zone.v1.api.survey.entity.mongo.Answer;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import java.util.List;

@Data
@ApiModel("설문제출 Request DTO")
public class InsertAnswerDTO {
    @ApiModelProperty(name = "answerList", notes = "설문 제출 답변 List")
    private List<Answer> answerList;
}