package com.mongoosereum.dou_survey_zone.api.v1.dto;

import lombok.Builder;
import lombok.Data;


@Data
public class SurveylistDTO  {

    private int page_Num;

    private String search_Key;

    private Integer search_Tag;

    public SurveylistDTO() {
        this.page_Num = 1;
        this.search_Key = null;
        this.search_Tag = null;
    }
}
