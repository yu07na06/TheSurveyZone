package com.mongoosereum.dou_survey_zone;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.WebApplicationType;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import org.springframework.web.servlet.handler.HandlerMappingIntrospector;

@SpringBootApplication
public class DouSurveyZoneApplication extends SpringBootServletInitializer{
	public static void main(String[] args) {
		 SpringApplication.run(DouSurveyZoneApplication.class, args);
	}
}
