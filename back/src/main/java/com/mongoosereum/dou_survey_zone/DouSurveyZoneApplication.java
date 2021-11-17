package com.mongoosereum.dou_survey_zone;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import com.mongoosereum.dou_survey_zone.v1.api.survey.QType;
import com.mongoosereum.dou_survey_zone.v1.api.survey.Question;
import com.mongoosereum.dou_survey_zone.v1.api.survey.Select;
import com.mongoosereum.dou_survey_zone.v1.api.survey.Survey;
import com.mongoosereum.dou_survey_zone.v1.api.survey.repository.SurveyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@SpringBootApplication
//@EnableMongoRepositories
public class DouSurveyZoneApplication {

	public static void main(String[] args) {
		SpringApplication.run(DouSurveyZoneApplication.class, args);
	}
//	@Bean
//	CommandLineRunner runner(SurveyRepository surveyRepository, MongoTemplate mongoTemplate) {
//		return args -> {
//			List<Question> questionList = new ArrayList<Question>();
//			for (int i = 0; i < 10; i++) {
//				List<Select> selectList = new ArrayList<Select>();
//				for (int j = 0; j < 5; j++) {
//					Select select = Select.builder()
//							.SurSel_Content("보기" + j + 1L)
//							.SurSel_Order(1L + j)
//							.build();
//					selectList.add(select);
//				}
//				Question question = Question.builder()
//						.SurQue_Content("질문" + i + 1L + ".")
//						.SurQue_QType(QType.MULTIPLE)
//						.SurQue_MaxAns(3L)
//						.SurQue_Order(i + 1L)
//						.selectList(selectList)
//						.build();
//				questionList.add(question);
//			}
//			Survey survey = Survey.builder()
//					.questionList(questionList)
//					.answerList(new ArrayList<>())
//					.build();
//			surveyRepository.insert(survey);
//		};
//	}
}
