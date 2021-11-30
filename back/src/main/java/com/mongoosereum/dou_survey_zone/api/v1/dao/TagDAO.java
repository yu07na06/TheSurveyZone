package com.mongoosereum.dou_survey_zone.api.v1.dao;

import com.mongoosereum.dou_survey_zone.api.v1.domain.tag.SurveyTag;
import com.mongoosereum.dou_survey_zone.api.v1.domain.tag.Tag;

import java.util.List;

public interface TagDAO {

    List<Tag> selectTagList();
    List<Tag> findById(String _id);
    int insertTag(SurveyTag surveyTag);

}
