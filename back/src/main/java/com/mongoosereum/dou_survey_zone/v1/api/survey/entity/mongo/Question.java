package com.mongoosereum.dou_survey_zone.v1.api.survey.entity.mongo;

import com.mongoosereum.dou_survey_zone.v1.api.survey.entity.QuestionType;
import com.mongoosereum.dou_survey_zone.v1.api.survey.entity.SurveyType;
import io.swagger.annotations.ApiParam;
import lombok.*;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
public class Question {
//    @Id
//    private String SurQue_ID;
    private String SurQue_Content;

    private QuestionType SurQue_QType;

    private Long SurQue_MaxAns;

    private Long SurQue_Order;

    private List<Select> selectList;

    private List<Answer> answerList;
}