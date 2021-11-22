package com.mongoosereum.dou_survey_zone.v1.api.participation.dto;

import com.mongoosereum.dou_survey_zone.v1.api.participation.entity.ACC.ACC_Age;
import com.mongoosereum.dou_survey_zone.v1.api.participation.entity.ACC.ACC_Gender;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ParticipationDTO {

    private int part_Total;

    private ACC_Gender part_Gender;

    private ACC_Age part_Age;

}
