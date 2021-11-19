package com.mongoosereum.dou_survey_zone.v1.api.survey.dto;

import com.mongoosereum.dou_survey_zone.v1.api.survey.entity.mongo.Answer;
import lombok.Data;
import java.util.List;

@Data
public class InsertAnswerDTO {
    private List<Answer> answerList;
}