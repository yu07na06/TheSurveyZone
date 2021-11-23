package com.mongoosereum.dou_survey_zone;

import org.springframework.batch.core.configuration.annotation.EnableBatchProcessing;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

@EnableBatchProcessing // 배치 기능 활성화
@SpringBootApplication
public class DouSurveyZoneApplication extends SpringBootServletInitializer{
	public static void main(String[] args) {
		 SpringApplication.run(DouSurveyZoneApplication.class, args);
	}
}
