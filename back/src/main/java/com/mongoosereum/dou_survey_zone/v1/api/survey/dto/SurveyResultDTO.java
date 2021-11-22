package com.mongoosereum.dou_survey_zone.v1.api.survey.dto;

import com.mongoosereum.dou_survey_zone.v1.api.survey.entity.mongo.Answer;
import com.mongoosereum.dou_survey_zone.v1.api.survey.entity.mongo.Question;
import com.mongoosereum.dou_survey_zone.v1.api.survey.entity.mongo.Select;
import lombok.Builder;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Data
public class SurveyResultDTO {
    private List<String> userList;
    private List<String> questionList;
    private List<List<Select> > selectList;
    private List< List<Object> > answerList;
    private List<Map<String,Long> >resultMap;
    public SurveyResultDTO(){
        this.userList = new ArrayList<String>();
        this.questionList = new ArrayList<String>();
        this.selectList = new ArrayList<List<Select> >();
        this.answerList = new ArrayList<List<Object> >();
        this.resultMap = new ArrayList<Map<String,Long> >();
    }
}
