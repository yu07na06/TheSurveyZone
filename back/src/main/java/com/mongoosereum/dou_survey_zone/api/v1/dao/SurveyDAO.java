package com.mongoosereum.dou_survey_zone.api.v1.dao;

import com.mongoosereum.dou_survey_zone.api.v1.common.paging.PageCriteria;
import com.mongoosereum.dou_survey_zone.api.v1.common.paging.PaginationInfo;
import com.mongoosereum.dou_survey_zone.api.v1.domain.survey.Answer;
import com.mongoosereum.dou_survey_zone.api.v1.domain.survey.Survey_Mongo;
import com.mongoosereum.dou_survey_zone.api.v1.domain.survey.Survey_MySQL;

import java.util.List;
import java.util.Optional;

public interface SurveyDAO {
    long surveyTotal();
    List<Survey_MySQL> selectSurveyList(PaginationInfo paginationInfo);
    int selectSurveyTotalCount(PageCriteria Criteria);
    List<Survey_MySQL> selectMySurveyList(PaginationInfo paginationInfo);
    int selectMySurveyTotalCount(PageCriteria Criteria);
    Survey_Mongo surveyInsert_Mongo(final Survey_Mongo survey);
    int surveyInsert_MySQL(final Survey_MySQL survey);
    Optional<Survey_MySQL> findById_MySQL(String _id);
    Optional<Survey_Mongo> findById_Mongo(String _id);
    Integer insertAnswer(final String _id, final List<Answer> answerList);
    String selectOwner(String _id);
    int deleteSurvey_MySQL(String _id);
    Long deleteSurvey_Mongo(String _id);
    Long updateSurvey_Mongo(Survey_Mongo survey);
    Integer updateSurvey_MySQL(Survey_MySQL survey);
    List<Survey_MySQL> todaySurveyList();
    Integer todaySurveyUpdate(List<? extends Survey_MySQL> list);
}
