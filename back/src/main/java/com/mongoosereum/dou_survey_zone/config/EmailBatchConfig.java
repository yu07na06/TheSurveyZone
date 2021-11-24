package com.mongoosereum.dou_survey_zone.config;

import com.mongoosereum.dou_survey_zone.api.v1.common.mail.MailService;
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

    @Autowired
    MailService mailService;

    private final JobBuilderFactory jobBuilderFactory;
    private final StepBuilderFactory stepBuilderFactory;

    @Bean
    public Job sendMailJob() {
        log.info("********** Mail send");
        return jobBuilderFactory.get("sendMail")  // 1_1
                //.preventRestart()  // 1_2
                .start(sendMailJobStep())  // 1_3
                .build();  // 1_4
    }

    //1-1 : 주입받은 JobBuilderFactory의 get() 메서드를 이용해서 'sendMail'이라는 Job이름을 가진 빌더를 생성합니다.
    //1-2 : sendMail 이름의 Job의 중복 실행을 방지합니다.
    //1-3 : Job 실행 시작 시점에 파라미터로 주입받은 sendMailJobStep을 실행합니다.
    //      아래 sendMailJobStep 메서드는 @Bean으로 등록되어 있는 것을 알 수 있습니다.
    //1-4 : 지금까지 설정된 내용으로 Job 객체를 빌드합니다.

    @Bean
    public Step sendMailJobStep() {
        log.info("********** This is sendMailJobStep");
        return stepBuilderFactory.get("sendMailJobStep")  // 2_1
                .<Survey_MySQL, Survey_MySQL> chunk(10)  // 2_2
                .reader(sendMailReader())  // 2_3
                .processor(sendMailProcessor())  // 2_4
                .writer(sendMailWriter())  // 2_5
                .build();  // 2_6
    }

    //2_1 : 주입받은 StepBuilderFactory의 get() 메서드를 이용해서 'sendMailJobStep'이라는 Step이름을 가진 빌더를 생성합니다.
    //2_2 : (매우 중요!)
    //      입력 타입(앞)과 출력 타입(뒤)을 선언합니다. 둘 다 동일한 Member 타입을 선언하였습니다.
    //      chunk()의 인자 값으로 10을 설정하였습니다. 즉 아래 write 메서드에서 실행시킬 개수 단위입니다.
    //      한 번에 10개씩 write를 실행할 것입니다.
    //2_3 : 데이터는 읽고 = reader
    //2_4 : 읽어온 데이터를 처리하고  = processor
    //2_5 : 처리한 데이터를 저장 = writer
    //2_6 : 지금까지 설정된 내용으로 Step 객체를 빌드합니다.

    @Bean
    @StepScope  // 1
    public ListItemReader<Survey_MySQL> sendMailReader() {
        log.info("********** This is sendMailReader");
        List<Survey_MySQL> sendMembers = surveyDAO.todaySurveyList();
        log.info(" - activeMember SIZE : " + sendMembers.size());  // 2
        return new ListItemReader<>(sendMembers);  // 3
    }

    //1 : (중요)
    //      @Bean은 인스턴스에 대한 클래스가 최초 한 번한 메모리에 적재되고 이후로도 하나의 인스턴스로 계속 사용됩니다.
    //      그러나 @StepScope은 Step 주기를 실행할 때마다 항상 매번 새로운 @Bean을 만들겠다는 선언입니다.
    //      그렇기 때문에 지연 생성이 가능하게 되죠.
    //2 : DB에서 오늘 진행 해야되는 Survey와 오늘 마감되어야 하는 Survey의 레코드를 읽어옵니다.
    //3 : ListItemReader 객체를 생성하고 읽어온 Survey 리스트를 담아 반환합니다.

    public ItemProcessor<Survey_MySQL, Survey_MySQL> sendMailProcessor() {
        return new ItemProcessor<Survey_MySQL, Survey_MySQL>() { // 1
            @Override
            public Survey_MySQL process(Survey_MySQL survey_MySQL) throws Exception {
                log.info("********** This sendMailProcessor");

                switch (survey_MySQL.getSur_State()){
                    case 0: {
                        mailService.surveyStartMail(survey_MySQL);
                        return survey_MySQL.setSur_State(1); //2
                        }
                    case 1: {
                        mailService.surveyEndMail(survey_MySQL);
                        return survey_MySQL.setSur_State(2);
                    }
                    default: {
                        return survey_MySQL;
                    }
                }
            }
        };
    }
    //1 : 전자의 Survey_MySQL는 입력되는 타입, 후자의 Survey_MySQL는 반환되는 타입을 의미합니다.
    //2 : process() 메서드를 오버라이드 하여 다음의 비즈니스 로직이 처리된 survey_MySQL 타입을 반환합니다.
    //    setSur_State = 0 (진행예정) > 1 (진행중) / 1 (진행중) >> 2 (진행완료)

    public ItemWriter<Survey_MySQL> sendMailWriter() {
        log.info("********** This is sendMailWriter");
        return (List<? extends Survey_MySQL> sendMailList) -> {
//            surveyDAO.todaySurveyUpdate(sendMailList); // 1
        };
    }

    //1 : ItemProcessor 통해 처리된 회원 목록을 DB에 저장합니다.
    //    여기서 중요하게 보아야 할 대목은 처리할 회원 목록 즉,
    //    sendMailList를 Step에서 설정한 chuck단위로 받습니다.
    //    방금 전 Step객체를 빌드할 때 chuck의 인자를 10으로 설정하였으니
    //    ItemWriter에서는 한 번에 10개 단위의 레코드를 DB로 커밋하게 됩니다.


}
