package com.mongoosereum.dou_survey_zone.v1.api.survey.dto;

import com.mongoosereum.dou_survey_zone.v1.api.survey.Answer;
import lombok.Data;
import java.util.List;

@Data
public class AnswerInsertDTO {
    private String _id;
    private List<Answer> answerList;
}