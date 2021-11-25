package com.mongoosereum.dou_survey_zone.api.v1.domain.participation;

import com.mongoosereum.dou_survey_zone.api.v1.dao.ParticipationDAO;
import com.mongoosereum.dou_survey_zone.api.v1.dao.SurveyDAO;
import com.mongoosereum.dou_survey_zone.api.v1.dao.TagDAO;
import com.mongoosereum.dou_survey_zone.api.v1.domain.tag.Tag;
import com.mongoosereum.dou_survey_zone.api.v1.dto.response.common.MainInfoRes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ParticipationService {

    @Autowired
    private ParticipationDAO participationDAO;

    @Autowired
    private SurveyDAO surveyDAO;

    @Autowired
    private TagDAO tagDAO;

    public MainInfoRes resultMainInfo(){
        return MainInfoRes.builder()
                .part_Total(participationDAO.ACCTotal())
                .survey_Total(surveyDAO.surveyTotal())
                .part_Age(participationDAO.ACCAge())
                .part_Gender(participationDAO.ACCGender())
                .sur_Tag(tagDAO.findById(""))
                .build();
    }
//    public Part_Acc_MySQL partACC(){
//        Part_Acc_MySQL responseAcc = Part_Acc_MySQL.builder()
//                .part_Total(participationDAO.ACCTotal())
//                .part_Gender(participationDAO.ACCGender())
//                .part_Age(participationDAO.ACCAge())
//                .build();
//        return responseAcc;
//    }

    public List<Tag> partTag(){
        return tagDAO.findById("");
    }
}
