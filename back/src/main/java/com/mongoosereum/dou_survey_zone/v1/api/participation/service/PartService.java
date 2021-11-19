package com.mongoosereum.dou_survey_zone.v1.api.participation.service;

import com.mongoosereum.dou_survey_zone.v1.api.participation.dao.ParticipationDAO;
import com.mongoosereum.dou_survey_zone.v1.api.participation.entity.ACC.ACC_Age;
import com.mongoosereum.dou_survey_zone.v1.api.participation.entity.ACC.ACC_Gender;
import com.mongoosereum.dou_survey_zone.v1.api.participation.entity.Part_Acc_MySQL;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PartService {

    @Autowired
    private ParticipationDAO participationDAO;

    public Part_Acc_MySQL partACC(){
        Part_Acc_MySQL responseAcc = Part_Acc_MySQL.builder()
                .part_Total(participationDAO.ACCTotal())
                .part_Gender(participationDAO.ACCGender())
                .part_Age(participationDAO.ACCAge())
                .build();
        return responseAcc;
    }



}
