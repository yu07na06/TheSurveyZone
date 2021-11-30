package com.mongoosereum.dou_survey_zone.api.v1.service;

import com.mongoosereum.dou_survey_zone.api.v1.dao.ParticipationDAOImpl;
import com.mongoosereum.dou_survey_zone.api.v1.dao.SurveyDAO;
import com.mongoosereum.dou_survey_zone.api.v1.dao.TagDAOImpl;
import com.mongoosereum.dou_survey_zone.api.v1.domain.tag.Tag;
import com.mongoosereum.dou_survey_zone.api.v1.dto.response.common.MainInfoRes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ParticipationService {

    @Autowired
    private ParticipationDAOImpl participationDAO;

    @Autowired
    private SurveyDAO surveyDAO;

    @Autowired
    private TagDAOImpl tagDAO;

    public MainInfoRes resultMainInfo(){
        return MainInfoRes.builder()
                .part_Total(participationDAO.ACCTotal())
                .survey_Total(surveyDAO.surveyTotal())
                .part_Age(participationDAO.ACCAge())
                .part_Gender(participationDAO.ACCGender())
                .sur_Tag(tagDAO.findById(""))
                .build();
    }

    public List<Tag> partTag(){
        return tagDAO.findById("");
    }

}
