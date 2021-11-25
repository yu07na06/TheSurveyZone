package com.mongoosereum.dou_survey_zone.api.v1.dto.request.survey;

import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Data;


@Data
public class SurveyListPageReq {

    @ApiModelProperty(name = "page_Num", notes = "페이지 번호", example = "1")
    private int page_Num;

    @ApiModelProperty(name = "search_Key", notes = "검색 키워드", example = "음식")
    private String search_Key;

    @ApiModelProperty(name = "search_Tag", notes = "검색 태그", example = "1")
    private Integer search_Tag;

    public SurveyListPageReq() {
        this.page_Num = 1;
        this.search_Key = null;
        this.search_Tag = null;
    }
}
