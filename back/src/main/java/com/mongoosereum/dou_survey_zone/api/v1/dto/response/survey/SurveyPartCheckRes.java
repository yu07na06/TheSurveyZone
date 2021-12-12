package com.mongoosereum.dou_survey_zone.api.v1.dto.response.survey;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SurveyPartCheckRes {

    private int check_State;

    private boolean check_IP;

}
