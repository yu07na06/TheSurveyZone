package com.mongoosereum.dou_survey_zone.v1.api.survey.repository;

import com.mongoosereum.dou_survey_zone.v1.api.survey.Survey;
import com.mongoosereum.dou_survey_zone.v1.api.survey.dto.SurveyInsertDTO;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SurveyRepository extends MongoRepository<Survey,String>{

}