package com.mongoosereum.dou_survey_zone.config;

import com.mongoosereum.dou_survey_zone.api.v1.dao.SurveyDAO;
import com.mongoosereum.dou_survey_zone.api.v1.domain.survey.Survey_MySQL;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.configuration.annotation.JobBuilderFactory;
import org.springframework.batch.core.configuration.annotation.StepBuilderFactory;
import org.springframework.batch.core.configuration.annotation.StepScope;
import org.springframework.batch.item.ItemProcessor;
import org.springframework.batch.item.ItemWriter;
import org.springframework.batch.item.support.ListItemReader;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Slf4j // log 사용을 위한 lombok Annotation
@AllArgsConstructor  // 생성자 DI를 위한 lombok Annotation
@Configuration
public class EmailBatchConfig {

    @Autowired
    SurveyDAO surveyDAO;

    @Bean
    public Job sendMailJob(JobBuilderFactory jobBuilderFactory, Step sendMailJobStep) {
        log.info("********** Mail send");
        return jobBuilderFactory.get("sendMail")  // 1_1
                //.preventRestart()  // 1_2
                .start(sendMailJobStep)  // 1_3
                .build();  // 1_4
    }

    @Bean
    public Step sendMailJobStep(StepBuilderFactory stepBuilderFactory) {
        log.info("********** This is sendMailJobStep");
        return stepBuilderFactory.get("sendMailJobStep")  // 2_1
                .<Survey_MySQL, Survey_MySQL> chunk(10)  // 2_2
                .reader(sendMailReader())  // 2_3
                .processor(sendMailProcessor())  // 2_4
                .writer(sendMailWriter())  // 2_5
                .build();  // 2_6
    }

    @Bean
    @StepScope  // 1
    public ListItemReader<Survey_MySQL> sendMailReader() {
        log.info("********** This is sendMailReader");
        List<Survey_MySQL> sendMembers = surveyDAO.todaystartlist();
        log.info("          - activeMember SIZE : " + sendMembers.size());  // 2
        return new ListItemReader<>(sendMembers);  // 3
    }

    public ItemProcessor<Survey_MySQL, Survey_MySQL> sendMailProcessor() {
        return new ItemProcessor<Survey_MySQL, Survey_MySQL>() {
            @Override
            public Survey_MySQL process(Survey_MySQL survey_MySQL) throws Exception {
                log.info("********** This sendMailProcessor");
                return survey_MySQL.setSur_State(1);
            }
        };
    }

    public ItemWriter<Survey_MySQL> sendMailWriter() {
        log.info("********** This is sendMailWriter");
        return (List<? extends Survey_MySQL> memberList) -> {
            surveyDAO.todaystartlist();
        };
    }

}
