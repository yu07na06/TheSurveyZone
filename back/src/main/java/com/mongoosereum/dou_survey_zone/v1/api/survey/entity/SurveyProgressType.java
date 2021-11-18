package com.mongoosereum.dou_survey_zone.v1.api.survey.entity;

public enum SurveyProgressType {
    BEFORE(0),
    DOING(1),
    CLOSED(2);

    private int num;
    public int getNum() {
        return this.num;
    }
    SurveyProgressType(int num){
        this.num = num;
    }
}
