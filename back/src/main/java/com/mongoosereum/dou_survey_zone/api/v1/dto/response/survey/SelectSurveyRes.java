package com.mongoosereum.dou_survey_zone.api.v1.dto.response.survey;

import com.mongoosereum.dou_survey_zone.api.v1.domain.survey.Question;
import com.mongoosereum.dou_survey_zone.api.v1.domain.survey.Survey_Mongo;
import com.mongoosereum.dou_survey_zone.api.v1.domain.survey.Survey_MySQL;
import com.mongoosereum.dou_survey_zone.api.v1.domain.tag.Tag;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.ToString;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Data
@ToString
@ApiModel("설문 조회 Response DTO")
public class SelectSurveyRes {
    @ApiModelProperty(name="_id",notes = "설문 PK 24자")
    private String _id;

    @ApiModelProperty(name="sur_Title",notes = "설문 제목")
    private String sur_Title;

    @ApiModelProperty(name="sur_Content",notes = "설문 본문")
    private String sur_Content;

    @ApiModelProperty(name="sur_State",notes = "설문 상태(0:진행전,1:진행중,2:완료)")
    private Integer sur_State;

    @ApiModelProperty(name = "sur_StartDate", notes = "설문 시작일")
    private LocalDate sur_StartDate;

    @ApiModelProperty(name = "sur_EndDate", notes = "설문 종료일")
    private LocalDate sur_EndDate;

    @ApiModelProperty(name = "sur_Publish", notes = "설문 공개 여부(공개 : true, 비공개 : false")
    private Boolean sur_Publish;

    @ApiModelProperty(name = "sur_Image", notes = "설문 이미지, 미구현 ")
    private String sur_Image;

    @ApiModelProperty(name = "user_Email", notes = "설문 작성자 Email")
    private String user_Email;

    @ApiModelProperty(name = "sur_Type", notes = "설문 타입, 미구현")
    private Integer sur_Type;

    @ApiModelProperty(name = "questionList", notes = "질문 리스트")
    private List<QuestionDTO> questionList;

    @ApiModelProperty(name = "tagList", notes = "설문 태그 리스트, v1 : 1개 태그만 전달됨")
    private List<Tag> tagList;

    public void set(Survey_Mongo survey_mongo, Survey_MySQL survey_mySQL, List<Tag> tagList){
        this._id = survey_mongo.get_id();
        this.sur_Title = survey_mySQL.getSur_Title();
        this.sur_Content = survey_mySQL.getSur_Content();
        this.sur_State = survey_mySQL.getSur_State();
        this.sur_StartDate = survey_mySQL.getSur_StartDate();
        this.sur_EndDate = survey_mySQL.getSur_EndDate();
        this.sur_Image = survey_mySQL.getSur_Image();
        this.user_Email = survey_mySQL.getUser_Email();
        this.sur_Publish = survey_mySQL.getSur_Publish();
        this.sur_Type = survey_mySQL.getSur_Type();
        this.questionList = new ArrayList<QuestionDTO>();
        for(int i=0;i<survey_mongo.getQuestionList().size();i++) {
            Question question = survey_mongo.getQuestionList().get(i);
            this.questionList.add(
                    QuestionDTO.builder()
                            .SurQue_QType(question.getSurQue_QType())
                            .SurQue_Content(question.getSurQue_Content())
                            .SurQue_Essential(question.getSurQue_Essential())
                            .SurQue_MaxAns(question.getSurQue_MaxAns())
                            .SurQue_Order(question.getSurQue_Order())
                            .selectList(question.getSelectList())
                            .build());
        }
        this.tagList = tagList;
    }
}
