package com.mongoosereum.dou_survey_zone;

import org.springframework.batch.core.configuration.annotation.EnableBatchProcessing;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.scheduling.annotation.EnableScheduling;

import javax.annotation.PostConstruct;
import java.util.TimeZone;

// 배치 기능 활성화
@EnableBatchProcessing
@EnableScheduling
@SpringBootApplication
public class DouSurveyZoneApplication extends SpringBootServletInitializer{

	@PostConstruct
	void started() {
		TimeZone.setDefault(TimeZone.getTimeZone("Asia/Seoul"));
	}

	public static void main(String[] args) {
		 SpringApplication.run(DouSurveyZoneApplication.class, args);
	}
}
