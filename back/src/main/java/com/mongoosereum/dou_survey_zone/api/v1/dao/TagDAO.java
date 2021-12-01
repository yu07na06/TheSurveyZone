package com.mongoosereum.dou_survey_zone.api.v1.dao;

import com.mongoosereum.dou_survey_zone.api.v1.domain.tag.SurveyTag;
import com.mongoosereum.dou_survey_zone.api.v1.domain.tag.Tag;

import java.util.List;
import java.util.Optional;

public interface TagDAO {
    List<Tag> selectTagList();
    List<Tag> findById(String _id);
    void insertTag(SurveyTag surveyTag);
    Optional<SurveyTag> selectSurveyTag(String _id);
    void updateSurveyTag(SurveyTag surveyTag);
}
