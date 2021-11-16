package com.mongoosereum.dou_survey_zone.v1.api.survey.repository;

import com.mongoosereum.dou_survey_zone.v1.api.survey.Survey;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface SurveyRepository extends MongoRepository<Survey,String>{

}
