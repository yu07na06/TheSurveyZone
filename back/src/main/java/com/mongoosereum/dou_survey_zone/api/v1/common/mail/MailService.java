package com.mongoosereum.dou_survey_zone.api.v1.common.mail;

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

}

