package com.mongoosereum.dou_survey_zone.api.v1.domain.survey.type;

import com.fasterxml.jackson.annotation.JsonValue;
import org.apache.ibatis.type.MappedTypes;

public enum QuestionType {
    ESSAY(0), //주관식
    MULTIPLE(1), // 객관식
    LINEAR(2); // 선형배율
    private int num;
    QuestionType(int num){
        this.num = num;
    }
    @JsonValue
    public int getNum() {
        return this.num;
    }
}