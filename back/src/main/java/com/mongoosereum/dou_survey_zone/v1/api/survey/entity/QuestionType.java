package com.mongoosereum.dou_survey_zone.v1.api.survey.entity;

public enum QuestionType {
    MULTIPLE(0),
    SHORT_ANSWER(1),
    ESSAY(2);
    private int num;
    public int getNum() {
        return this.num;
    }
    QuestionType(int num){
        this.num = num;
    }
}