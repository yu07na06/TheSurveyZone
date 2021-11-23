package com.mongoosereum.dou_survey_zone.api.v1.dto;

import com.mongoosereum.dou_survey_zone.api.v1.domain.survey.Survey_MySQL;
import com.mongoosereum.dou_survey_zone.api.v1.common.paging.PaginationInfo;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class Surveylist_MySQL {

    private PaginationInfo paginationInfo;

    List<Survey_MySQL> surveylist;
}
