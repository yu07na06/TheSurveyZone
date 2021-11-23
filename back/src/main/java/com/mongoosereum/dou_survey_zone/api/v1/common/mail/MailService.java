package com.mongoosereum.dou_survey_zone.api.v1.common.mail;

import com.mongoosereum.dou_survey_zone.api.v1.domain.survey.Survey_MySQL;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring5.SpringTemplateEngine;

@Service
@AllArgsConstructor
public class MailService {

    private JavaMailSender javaMailSender;

    final String mainPageLink = "http://220.119.14.242:3000/";

    @Autowired
    private SpringTemplateEngine templateEngine;

    public void surveyStartMail(Survey_MySQL survey_MySQL){

        String sendto = survey_MySQL.getUser_Email();

        String subject = "[DouSurveyZone]설문시작 안내 메일";

        Context context = new Context();
        context.setVariable("link",mainPageLink);
        context.setVariable("linktosurvey","http://220.119.14.242:3000/SurveySubmitPage/"+survey_MySQL.get_id());
        String html = templateEngine.process("mail_start",context);

        mailSend(sendto,subject,html);
    }

    public void surveyEndMail(Survey_MySQL survey_MySQL){

        String sendto = survey_MySQL.getUser_Email();

        String subject = "[DouSurveyZone]설문종료 안내 메일";

        Context context = new Context();
        context.setVariable("link",mainPageLink);
        context.setVariable("linktosurvey","http://220.119.14.242:3000/SurveySubmitPage/"+survey_MySQL.get_id());
        String html = templateEngine.process("mail_start",context);

        mailSend(sendto,subject,html);
    }

    public void mailSend(String sendTo, String subject, String html){
        try {
            MailHandler mailHandler = new MailHandler(javaMailSender);
            mailHandler.setTo(sendTo);
            mailHandler.setSubject(subject);
            String htmlContent = "<p>" + html +"<p>";
            mailHandler.setText(htmlContent, true);
            mailHandler.send();
            System.out.println("메일 전송 완료");
        }
        catch (Exception e){
            e.printStackTrace();
            System.out.println("메일 전송 실패");
        }
    }

}

