package com.mongoosereum.dou_survey_zone.v1.api.survey.dto;

import com.mongoosereum.dou_survey_zone.v1.api.survey.Answer;
import com.mongoosereum.dou_survey_zone.v1.api.survey.Question;
import lombok.Data;
import lombok.ToString;

import java.util.List;

@Data
public class SurveyInsertDTO {
    private List<Question> questionList;
}