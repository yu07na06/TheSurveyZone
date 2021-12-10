package com.mongoosereum.dou_survey_zone.api.v1.dto.response.survey;

import com.mongoosereum.dou_survey_zone.api.v1.domain.survey.Survey_MySQL;
import com.mongoosereum.dou_survey_zone.api.v1.common.paging.PaginationInfo;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
@ApiModel("페이징 처리 결과 DTO")
public class SurveyListPageRes {

    @ApiModelProperty(name = "paginationInfo", notes = "해당 페이지에 대한 정보")
    private PaginationInfo paginationInfo;

    @ApiModelProperty(name = "surveylist", notes = "해당 페이지에 대한 설문조사 리스트")
    List<Survey_MySQL> surveylist;
}
