package com.mongoosereum.dou_survey_zone.api.v1.dto;

import lombok.*;

@Data
@Builder
public class Part_Acc_MySQL {
    private int part_Total;
    private ACC_Gender part_Gender;
    private ACC_Age part_Age;
}
