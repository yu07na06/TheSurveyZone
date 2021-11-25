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
    @ApiModelProperty(name ="paginationInfo", notes = "paging 관련 정보")
    private PaginationInfo paginationInfo;

    @ApiModelProperty(name ="surveylist", notes = "설문 List")
    List<Survey_MySQL> surveylist;
}
