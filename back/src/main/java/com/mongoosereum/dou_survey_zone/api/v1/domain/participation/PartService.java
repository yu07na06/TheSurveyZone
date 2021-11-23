package com.mongoosereum.dou_survey_zone.api.v1.domain.participation;

import com.mongoosereum.dou_survey_zone.api.v1.dao.ParticipationDAO;
import com.mongoosereum.dou_survey_zone.api.v1.dto.Part_Acc_MySQL;
import com.mongoosereum.dou_survey_zone.api.v1.dao.TagDAO;
import com.mongoosereum.dou_survey_zone.api.v1.domain.tag.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PartService {

    @Autowired
    private ParticipationDAO participationDAO;

    @Autowired
    private TagDAO tagDAO;

    public Part_Acc_MySQL partACC(){
        Part_Acc_MySQL responseAcc = Part_Acc_MySQL.builder()
                .part_Total(participationDAO.ACCTotal())
                .part_Gender(participationDAO.ACCGender())
                .part_Age(participationDAO.ACCAge())
                .build();
        return responseAcc;
    }

    public List<Tag> partTag(){
        return tagDAO.findById("");
    }



}
