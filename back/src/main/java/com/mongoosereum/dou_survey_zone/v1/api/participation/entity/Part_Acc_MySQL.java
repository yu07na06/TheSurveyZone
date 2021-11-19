package com.mongoosereum.dou_survey_zone.v1.api.participation.entity;

import com.mongoosereum.dou_survey_zone.v1.api.participation.entity.ACC.ACC_Age;
import com.mongoosereum.dou_survey_zone.v1.api.participation.entity.ACC.ACC_Gender;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Part_Acc_MySQL {

    private int part_Total;

    private ACC_Gender part_Gender;

    private ACC_Age part_Age;
}
