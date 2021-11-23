package com.mongoosereum.dou_survey_zone.v1.api.common;

import com.mongoosereum.dou_survey_zone.v1.api.common.mail.MailDTO;
import com.mongoosereum.dou_survey_zone.v1.api.common.mail.MailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/api/v1", produces = MediaType.APPLICATION_JSON_VALUE)
public class TestController{

    @Autowired
    private final MailService mailService;

    public TestController() {
        mailService = null;
    }

    @PostMapping(path="/ddd")
    public String test1( @AuthenticationPrincipal String userEmail){
        return userEmail;
    }

    @PostMapping("/mail")
    public void execMail(@RequestBody MailDTO mailDTO) {
        mailService.mailSend(mailDTO);
    }


}