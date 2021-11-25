package com.mongoosereum.dou_survey_zone.api.v1.domain.survey.type;

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
