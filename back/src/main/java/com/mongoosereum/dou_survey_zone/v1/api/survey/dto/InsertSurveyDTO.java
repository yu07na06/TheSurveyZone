package com.mongoosereum.dou_survey_zone.v1.api.survey.dto;

import com.mongoosereum.dou_survey_zone.v1.api.survey.entity.SurveyType;
import com.mongoosereum.dou_survey_zone.v1.api.survey.entity.mongo.Question;
import com.mongoosereum.dou_survey_zone.v1.api.survey.entity.SurveyProgressType;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Data
@ApiModel("설문 생성 or 수정 Request DTO")
public class InsertSurveyDTO {
    @ApiModelProperty(name = "sur_Title", notes = "설문 제목")
    private String sur_Title;

    @ApiModelProperty(name = "sur_Content", notes = "설문 내용")
    private String sur_Content;

    @ApiModelProperty(name = "sur_State", notes = "설문 상태(0:진행전,1:진행중,2:완료)")
    private SurveyProgressType sur_State;

    @ApiModelProperty(name = "sur_StartDate", notes = "설문 시작일")
    private LocalDate sur_StartDate;

    @ApiModelProperty(name = "sur_EndDate", notes = "설문 종료일")
    private LocalDate sur_EndDate;

    @ApiModelProperty(name = "sur_Publish", notes = "설문 공개 여부(공개 : true, 비공개 : false")
    private Boolean sur_Publish;

    @ApiModelProperty(name = "sur_Image", notes = "설문 이미지, 미구현 ")
    private String sur_Image;

    @ApiModelProperty(name = "user_Email", notes = "설문 작성자 UserEmail")
    private String user_Email;

    @ApiModelProperty(name = "questionList", notes = "질문 리스트")
    private List<Question> questionList;

    @ApiModelProperty(name = "sur_Type", notes = "설문 타입, 미구현")
    private SurveyType sur_Type;

    @ApiModelProperty(name = "sur_Tag", notes = "설문 태그, v1 : 1개 태그만 가능")
    private Long sur_Tag; // TODO [정환] 여러개로 변경해야함.
}