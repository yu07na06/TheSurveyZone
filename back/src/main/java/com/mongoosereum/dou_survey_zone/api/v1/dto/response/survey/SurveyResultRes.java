package com.mongoosereum.dou_survey_zone.api.v1.dto.response.survey;

import com.mongoosereum.dou_survey_zone.api.v1.domain.participation.Participation;
import com.mongoosereum.dou_survey_zone.api.v1.domain.survey.Question;
import com.mongoosereum.dou_survey_zone.api.v1.domain.survey.Select;
import com.mongoosereum.dou_survey_zone.api.v1.domain.survey.Survey_MySQL;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import io.swagger.models.auth.In;
import lombok.Data;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Data
@ApiModel("설문 결과 조회 Response DTO")
public class SurveyResultRes{

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
    private String sur_Img;

    @ApiModelProperty(name = "sur_Type", notes = "설문 타입, 미구현")
    private Integer sur_Type;

    @ApiModelProperty(name = "userList", notes = "설문 참가 유저 List \n0번째 index엔 0번째로 참여한 User 정보")
    private List<String> userList;

    @ApiModelProperty(name = "questionList", notes = "설문 질문 List \n0번째 index엔 0번 질문의 내용이 있음 ex)귀하의 나이는?")
    private List<QuestionDTO> questionList;

    @ApiModelProperty(name = "selectList", notes = "보기 List\n0번째 index엔 0번 질문에 해당하는 보기들의 List 존재")
    private List<List<Select> > selectList;

    @ApiModelProperty(name = "answerList", notes = "답변 List\n0번째 index엔 0번 질문에 해당하는 답변들의 List 존재\n객관식 중복응답인 경우 List안의 List")
    private List< List<String []> > answerList;

    @ApiModelProperty(name = "resultMap", notes = "객관식 답변 빈도수\n0번째 index엔 0번 질문에 해당하는 답변들의 Key,Value 쌍\n객관식의 경우에만 존재, 주관식인 경우 null")
    private List<Map<String,Long> >resultMap;

    private List<LinkedHashMap<String,List<Integer> > > selectResultMap;

    private Map<String, Integer[]> partList;
    public SurveyResultRes(){
        this.userList = new ArrayList<String>();
        this.questionList = new ArrayList<>();
        this.selectList = new ArrayList<List<Select> >();
        this.answerList = new ArrayList<List<String []> >();
        this.resultMap = new ArrayList<Map<String,Long> >();
    }
    public void setQuestion(Question question){
        this.questionList.add(
                QuestionDTO.builder()
                        .SurQue_Content(question.getSurQue_Content())
                        .SurQue_Essential(question.getSurQue_Essential())
                        .SurQue_MaxAns(question.getSurQue_MaxAns())
                        .SurQue_Order(question.getSurQue_Order())
                        .SurQue_QType(question.getSurQue_QType())
                        .selectList(question.getSelectList())
                        .build());
    }
    public void setSurvey(Survey_MySQL survey_mySQL){
        this.sur_Title = survey_mySQL.getSur_Title();
        this.sur_Content = survey_mySQL.getSur_Content();
        this.sur_State = survey_mySQL.getSur_State();
        this.sur_StartDate = survey_mySQL.getSur_StartDate();
        this.sur_EndDate = survey_mySQL.getSur_EndDate();
        this.sur_Publish = survey_mySQL.getSur_Publish();
        this.sur_Img = survey_mySQL.getSur_Img();
        this.sur_Type = survey_mySQL.getSur_Type();
    }
}
