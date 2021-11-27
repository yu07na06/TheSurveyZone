package com.mongoosereum.dou_survey_zone.api.v1.domain.survey;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@ApiModel("설문조사 질문")
public class Question {
//    @Id
//    private String SurQue_ID;
    @ApiModelProperty(name="SurQue_Content", notes = "질문 제목")
    private String SurQue_Content;

    @ApiModelProperty(name="SurQue_QType", notes = "질문 유형 (0:객관식, 1:주관식, 2:선형배율)")
    private Integer SurQue_QType;

    // @ApiModelProperty(name="SurQue_QType", notes = "질문 유형 (0:객관식, 1:주관식, 2:선형배율)")
    // private QuestionType SurQue_QType;

    @ApiModelProperty(name="SurQue_MaxAns", notes = "객관식 전용 - 질문 최대 답변 개수")
    private Long SurQue_MaxAns;

    @ApiModelProperty(name="SurQue_Order", notes = "질문 순서")
    private Long SurQue_Order;

    @ApiModelProperty(name="selectList", notes = "객관식,선형배율 전용 - 해당 질문의 보기 리스트")
    private List<Select> selectList;

    @ApiModelProperty(name="answerList", notes = "답변 리스트, 초기값 : 빈 배열")
    private List<Answer> answerList;
}