package com.mongoosereum.dou_survey_zone.api.v1.common.mail;

import com.mongoosereum.dou_survey_zone.api.v1.dao.UserDAOImpl;
import com.mongoosereum.dou_survey_zone.api.v1.domain.survey.Survey_MySQL;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring5.SpringTemplateEngine;

import java.util.Random;

@Service
@AllArgsConstructor
public class MailService {

    private JavaMailSender javaMailSender;

    final String mainPageLink = "http://220.119.14.242:3000/";

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    UserDAOImpl userDAO;

    @Autowired
    private SpringTemplateEngine templateEngine;

    private String makeTempPW() {
        int leftLimit = 48;
        int rightLimit = 122;
        int tempPW_length = 10;
        Random random = new Random();
        String tempPW = random.ints(leftLimit, rightLimit + 1)
                .filter(i -> (i <= 57 || i >= 65) && (i <= 90 || i >= 97))
                .limit(tempPW_length)
                .collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append)
                .toString();

        System.out.println(tempPW);
        return tempPW;
    }

    @Async
    public void sendTempPW(String User_Email, String User_Name, String tempPW){

        // 1. tempPW가 임시 비밀 번호 :  userservice
        // 2. encodedPassword :  userservice
        // 3. redis 저장할 건데 몇 분? 10분? ㅇㅋㅇㅋ
        // 4.. pw가 원래 께 맞지않으면 redis판별하고 return w주는데 임시로 한건 따로 표시를 해서 return

//       if(userDAO.setPW(User.builder()
//                .user_Email(User_Email)
//                .user_Password(encodedPassword)
//                .build()) == 0)
//            return;

        String subject = "[DouSurveyZone]비밀번호 재설정 안내 메일";

        Context context = new Context();
        context.setVariable("userName",User_Name);
        context.setVariable("mainLink", mainPageLink);
        context.setVariable("tempPW", tempPW);
        context.setVariable("linkToLogin",mainPageLink + "/Login");
        String html = templateEngine.process("resetPW",context);

        mailSend(User_Email,subject,html);
    }
    public void surveyStartMail(Survey_MySQL survey_MySQL){

        String sendto = survey_MySQL.getUser_Email();

        System.out.println(survey_MySQL.getSur_Title());
        System.out.println(survey_MySQL.getSur_Content());
        System.out.println(survey_MySQL.getSur_Publish());
        System.out.println(survey_MySQL.getSur_StartDate());


        String subject = "[DouSurveyZone]설문시작 안내 메일";

        Context context = new Context();
        context.setVariable("mainLink", mainPageLink);
        context.setVariable("Sur_Title", survey_MySQL.getSur_Title());
        context.setVariable("Sur_Content", survey_MySQL.getSur_Content());
        context.setVariable("Sur_Publish", survey_MySQL.getSur_Publish() ? "공개" : "비공개" );
        context.setVariable("Sur_StartDate", survey_MySQL.getSur_StartDate());
        context.setVariable("Sur_EndDate", survey_MySQL.getSur_EndDate());
        context.setVariable("linkToSurvey","http://220.119.14.242:3000/SurveySubmitPage/"+survey_MySQL.get_id());
        String html = templateEngine.process("surveyStartMail",context);

        mailSend(sendto,subject,html);
    }

    public void surveyEndMail(Survey_MySQL survey_MySQL){

        String sendto = survey_MySQL.getUser_Email();

        String subject = "[DouSurveyZone]설문종료 안내 메일";

        Context context = new Context();
        context.setVariable("mainLink",mainPageLink);
        context.setVariable("Sur_Title", survey_MySQL.getSur_Title());
        context.setVariable("Sur_Content", survey_MySQL.getSur_Content());
        context.setVariable("Sur_Publish", survey_MySQL.getSur_Publish() ? "공개" : "비공개" );
        context.setVariable("Sur_StartDate", survey_MySQL.getSur_StartDate());
        context.setVariable("Sur_EndDate", survey_MySQL.getSur_EndDate());
        context.setVariable("linkToSurvey","http://220.119.14.242:3000/ResultPage/"+survey_MySQL.get_id());
        String html = templateEngine.process("surveyEndMail",context);

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
        }
        catch (Exception e){
            e.printStackTrace();
        }
    }
}

