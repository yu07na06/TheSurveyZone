package com.mongoosereum.dou_survey_zone.v1.api.survey.entity.mongo;

import com.mongoosereum.dou_survey_zone.v1.api.survey.entity.QuestionType;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class Question {
//    @Id
//    private String SurQue_ID;
    private String SurQue_Content;
    private QuestionType SurQue_QType;
    private Long SurQue_MaxAns;
    private Long SurQue_Order;
    private List<Select> selectList;
    private List<Answer> answerList;

    @Builder
    public Question(String SurQue_Content, QuestionType SurQue_QType, Long SurQue_MaxAns, Long SurQue_Order, List<Select>selectList, List<Answer>answerList) {
        this.SurQue_Content = SurQue_Content;
        this.SurQue_QType = SurQue_QType;
        this.SurQue_MaxAns = SurQue_MaxAns;
        this.SurQue_Order = SurQue_Order;
        this.selectList = selectList;
        this.answerList = answerList;
    }
}