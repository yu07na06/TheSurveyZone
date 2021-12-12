package com.mongoosereum.dou_survey_zone.api.v1.domain.participation;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class Participation {
    private int Part_ID;
    private String _id;
    private String Part_IP;
    private char Part_Gender;
    private int Part_Age;
}
