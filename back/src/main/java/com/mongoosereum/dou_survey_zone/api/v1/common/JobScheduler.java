package com.mongoosereum.dou_survey_zone.api.v1.common;


import com.mongoosereum.dou_survey_zone.config.EmailBatchConfig;
import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.core.JobParameter;
import org.springframework.batch.core.JobParameters;
import org.springframework.batch.core.JobParametersInvalidException;
import org.springframework.batch.core.launch.JobLauncher;
import org.springframework.batch.core.repository.JobExecutionAlreadyRunningException;
import org.springframework.batch.core.repository.JobInstanceAlreadyCompleteException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@Component
public class JobScheduler {

    @Autowired
    private JobLauncher jobLauncher;

    @Autowired
    private EmailBatchConfig emailBatchConfig;

    @Scheduled(cron = "0 0 0 * * ?") // 초 분 시 일 월 요일 년(생략가능)
    public void runMailJob(){
        System.out.println("스케쥴 실행");
        Map<String, JobParameter> confMap = new HashMap<>();
        confMap.put("time", new JobParameter(System.currentTimeMillis()));
        JobParameters jobParameter = new JobParameters(confMap);
        try {
            jobLauncher.run(emailBatchConfig.sendMailJob(), jobParameter);
        }catch (JobExecutionAlreadyRunningException | JobInstanceAlreadyCompleteException
                | JobParametersInvalidException | org.springframework.batch.core.repository.JobRestartException e) {
            log.error(e.getMessage());
        }
    }

}
