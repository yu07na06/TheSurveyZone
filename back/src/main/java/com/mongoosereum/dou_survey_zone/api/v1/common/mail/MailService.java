package com.mongoosereum.dou_survey_zone.api.v1.common.mail;

import com.mongoosereum.dou_survey_zone.api.v1.dto.MailDTO;
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


    @Autowired
    private SpringTemplateEngine templateEngine;

    public void mailSend(MailDTO mailDto){

        Context context = new Context();
        context.setVariable("link","www.naver.com");
        context.setVariable("linktosurvey","www.naver.com");
        String html = templateEngine.process("mail_start",context);

        mailDto.setMessage(html);

        try {
            MailHandler mailHandler = new MailHandler(javaMailSender);
            mailHandler.setTo(mailDto.getAddress());
            mailHandler.setSubject("[안내메일]");
            String htmlContent = "<p>" + mailDto.getMessage() +"<p>";
            mailHandler.setText(htmlContent, true);
            mailHandler.send();
        }
        catch (Exception e){
            e.printStackTrace();
        }

    }
}

