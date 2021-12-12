package com.mongoosereum.dou_survey_zone.api.v1.dto.response.survey;

import com.mongoosereum.dou_survey_zone.api.v1.domain.survey.Answer;
import com.mongoosereum.dou_survey_zone.api.v1.domain.survey.Select;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
public class QuestionDTO {
    @ApiModelProperty(name="SurQue_Content", notes = "질문 제목")
    private String SurQue_Content;

    @ApiModelProperty(name="SurQue_QType", notes = "질문 유형 (0:객관식, 1:주관식, 2:선형배율)")
    private Integer SurQue_QType;

    @ApiModelProperty(name="SurQue_MaxAns", notes = "객관식 전용 - 질문 최대 답변 개수")
    private Long SurQue_MaxAns;

    @ApiModelProperty(name="SurQue_Order", notes = "질문 순서")
    private Long SurQue_Order;

    @ApiModelProperty(name="SurQue_Essential", notes="필수 문항 여부")
    private Boolean SurQue_Essential;

    @ApiModelProperty(name="selectList", notes = "객관식,선형배율 전용 - 해당 질문의 보기 리스트")
    private List<Select> selectList;
}
