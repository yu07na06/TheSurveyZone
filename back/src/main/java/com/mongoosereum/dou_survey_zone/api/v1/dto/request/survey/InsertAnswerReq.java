package com.mongoosereum.dou_survey_zone.api.v1.dto.request.survey;

import com.mongoosereum.dou_survey_zone.api.v1.domain.survey.Answer;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import java.util.List;

@Data
@ApiModel("설문제출 Request DTO")
public class InsertAnswerReq {
    @ApiModelProperty(name = "answerList", notes = "설문 제출 답변 List")
    private List<Answer> answerList;

    @ApiModelProperty(name = "age", notes = "사용자 연령", example = "10 or 20 or 30 or 40 or 50 or 60")
    private int age;

    @ApiModelProperty(name = "gender", notes = "설문 응답자 설명")
    private String gender;
}