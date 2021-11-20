package com.mongoosereum.dou_survey_zone.v1.api.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.RequestHandler;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import java.util.HashSet;
import java.util.Set;

@Configuration
@EnableSwagger2
public class SwaggerConfig {

    @Bean
    public Docket api(){
        return new Docket(DocumentationType.SWAGGER_2)
                .consumes(getConsumeContentTypes()) // Request
                .produces(getProduceContentTypes()) // Response
                .apiInfo(getApiInfo()) // Swagger API 문서정보
                .select()
                .apis(RequestHandlerSelectors.basePackage("com.mongoosereum.dou_survey_zone.v1.api"))
                //api 문서로 만들려는 basePackage 지정
                .paths(PathSelectors.ant("/api/v1/**")) // URL 경로지정, 해당 URL에 해당하는 요청만 API문서로
                .build();
    }
    private Set<String> getConsumeContentTypes(){
        Set<String> consumes = new HashSet<>();
        consumes.add("application/json;charset=UTF-8");
        consumes.add("application/x-www-form-urlencoded");
        return consumes;
    }
    private Set<String> getProduceContentTypes(){
        Set<String> produces = new HashSet<>();
        produces.add("application/json;charset=UTF-8");
        return produces;
    }

    private ApiInfo getApiInfo(){
        return new ApiInfoBuilder()
                .title("API")
                .description("[SurveyZone] API")
                .contact(new Contact("SurveyZone Swagger","https://github.com/yu07na06/TheSurveyZone","ojh2134@gmail.com"))
                .version("1.0")
                .build();
    }
}
