package com.mongoosereum.dou_survey_zone.v1.api.survey.entity;

public enum SurveyType {
    ONE(0),
    TWO(1),
    THREE(2);
    private int num;
    public int getNum() {
        return this.num;
    }
    SurveyType(int num){
        this.num = num;
    }
}
