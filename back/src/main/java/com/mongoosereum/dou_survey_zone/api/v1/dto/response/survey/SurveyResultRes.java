package com.mongoosereum.dou_survey_zone.api.v1.dto.response.survey;

import com.mongoosereum.dou_survey_zone.api.v1.domain.survey.Select;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Data
@ApiModel("설문 결과 조회 Response DTO")
public class SurveyResultRes {
    @ApiModelProperty(name = "userList", notes = "설문 참가 유저 List \n0번째 index엔 0번째로 참여한 User 정보")
    private List<String> userList;

    @ApiModelProperty(name = "questionList", notes = "설문 질문 List \n0번째 index엔 0번 질문의 내용이 있음 ex)귀하의 나이는?")
    private List<String> questionList;

    @ApiModelProperty(name = "selectList", notes = "보기 List\n0번째 index엔 0번 질문에 해당하는 보기들의 List 존재")
    private List<List<Select> > selectList;

    @ApiModelProperty(name = "answerList", notes = "답변 List\n0번째 index엔 0번 질문에 해당하는 답변들의 List 존재\n객관식 중복응답인 경우 List안의 List")
    private List< List<Object> > answerList;

    @ApiModelProperty(name = "resultMap", notes = "객관식 답변 빈도수\n0번째 index엔 0번 질문에 해당하는 답변들의 Key,Value 쌍\n객관식의 경우에만 존재, 주관식인 경우 null")
    private List<Map<String,Long> >resultMap;
    public SurveyResultRes(){
        this.userList = new ArrayList<String>();
        this.questionList = new ArrayList<String>();
        this.selectList = new ArrayList<List<Select> >();
        this.answerList = new ArrayList<List<Object> >();
        this.resultMap = new ArrayList<Map<String,Long> >();
    }
}
