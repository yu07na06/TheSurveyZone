package com.mongoosereum.dou_survey_zone.api.v1.dto.request.survey;

import lombok.Builder;
import lombok.Data;


@Data
public class SurveyListPageReq {


    private int page_Num;
    private String search_Key;
    private Integer search_Tag;

    public SurveyListPageReq() {
        this.page_Num = 1;
        this.search_Key = null;
        this.search_Tag = null;
    }
}
