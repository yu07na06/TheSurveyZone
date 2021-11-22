package com.mongoosereum.dou_survey_zone.v1.api.survey.entity.mysql;

import com.mongoosereum.dou_survey_zone.v1.api.common.paging.PaginationInfo_MySQL;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class Surveylist_MySQL {

    private PaginationInfo_MySQL paginationInfo;

    List<Survey_MySQL> surveylist;
}
