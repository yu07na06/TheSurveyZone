package com.mongoosereum.dou_survey_zone.v1.api.participation.Repository;

import com.mongoosereum.dou_survey_zone.v1.api.participation.entity.ACC.ACC_Age;
import com.mongoosereum.dou_survey_zone.v1.api.participation.entity.ACC.ACC_Gender;

public interface PartRepository {

    int ACCTotal ();

    ACC_Age ACCAge ();

    ACC_Gender ACCGender();

}
