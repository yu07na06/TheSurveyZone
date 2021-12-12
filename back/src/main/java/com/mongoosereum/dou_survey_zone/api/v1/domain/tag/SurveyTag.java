package com.mongoosereum.dou_survey_zone.api.v1.domain.tag;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class SurveyTag {
    private String _id;
    private Long Tag_ID;
}
