package com.mongoosereum.dou_survey_zone.v1.api.survey.entity;

import com.fasterxml.jackson.annotation.JsonValue;
import org.apache.ibatis.type.MappedTypes;

public enum QuestionType {
    MULTIPLE(0),
    SHORT_ANSWER(1),
    ESSAY(2);
    private int num;
    QuestionType(int num){
        this.num = num;
    }
    @JsonValue
    public int getNum() {
        return this.num;
    }
}