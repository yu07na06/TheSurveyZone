package com.mongoosereum.dou_survey_zone.api.v1.domain.participation;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class Participation {
    private String _id;
    private String part_IP;
    private char part_Gender;
    private int part_Age;
}
