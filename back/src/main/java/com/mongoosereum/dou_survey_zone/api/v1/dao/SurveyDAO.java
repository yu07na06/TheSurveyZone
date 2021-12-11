package com.mongoosereum.dou_survey_zone.api.v1.dao;

import com.mongoosereum.dou_survey_zone.api.v1.common.paging.PageCriteria;
import com.mongoosereum.dou_survey_zone.api.v1.common.paging.PaginationInfo;
import com.mongoosereum.dou_survey_zone.api.v1.domain.survey.Answer;
import com.mongoosereum.dou_survey_zone.api.v1.domain.survey.Survey_Mongo;
import com.mongoosereum.dou_survey_zone.api.v1.domain.survey.Survey_MySQL;

import java.util.List;
import java.util.Optional;

public interface SurveyDAO {
    // CREATE
    Survey_Mongo surveyInsert_Mongo(final Survey_Mongo survey);
    void surveyInsert_MySQL(final Survey_MySQL survey);
    void insertAnswer(final String _id, final List<Answer> answerList);

    // READ - paging
    long surveyTotal();
    int selectSurveyTotalCount(PageCriteria Criteria);
    int selectMySurveyTotalCount(PageCriteria Criteria);
    List<Survey_MySQL> selectSurveyList(PaginationInfo paginationInfo);
    List<Survey_MySQL> selectMySurveyList(PaginationInfo paginationInfo);
    // READ
    Optional<Survey_MySQL> findById_MySQL(String _id);
    Optional<Survey_Mongo> findById_Mongo(String _id);
    Optional<String> selectOwner(String _id);

    // UPDATE
    void updateSurvey_Mongo(Survey_Mongo survey);
    void updateSurvey_MySQL(Survey_MySQL survey);
    List<Survey_MySQL> todaySurveyList();
    Integer todaySurveyUpdate(List<? extends Survey_MySQL> list);

    // DELETE
    void deleteSurvey_MySQL(String _id);
    void deleteSurvey_Mongo(String _id);
}
