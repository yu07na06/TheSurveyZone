package com.mongoosereum.dou_survey_zone.v1.api.controller;

import com.mongoosereum.dou_survey_zone.v1.api.survey.dto.SelectSurveyDTO;
import com.mongoosereum.dou_survey_zone.v1.api.survey.dto.InsertSurveyDTO;
import com.mongoosereum.dou_survey_zone.v1.api.survey.dto.SurveylistDTO;
import com.mongoosereum.dou_survey_zone.v1.api.survey.entity.mongo.Answer;
import com.mongoosereum.dou_survey_zone.v1.api.survey.entity.mysql.Survey_MySQL;
import com.mongoosereum.dou_survey_zone.v1.api.survey.entity.mysql.Surveylist_MySQL;
import com.mongoosereum.dou_survey_zone.v1.api.survey.service.SurveyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/api/v1", produces = MediaType.APPLICATION_JSON_VALUE)
public class SurveyController{

    @Autowired
    private SurveyService surveyService;

    // selectSurveyList 설문지 리스트 출력
    @GetMapping(path="/main/list/")
    public ResponseEntity selectSurveyList(SurveylistDTO surveylistDTO){

        // test print keyword and tag
        //System.out.println(surveylistDTO.getSearch_Key());
        //System.out.println(surveylistDTO.getSearch_Tag());

        Surveylist_MySQL surveyList = surveyService.selectSurveyList(surveylistDTO);

        if(surveyList.getSurveylist() != null){
            return ResponseEntity.status(HttpStatus.OK).body(surveyList);
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(surveylistDTO);

    }
    @GetMapping(path="/survey/myPage")
    public ResponseEntity selectMySurveyList(/*@AuthenticationPrincipal String userEmail*/@RequestParam String userEmail){

        Surveylist_MySQL surveyList = surveyService.selectMySurveyList(userEmail);

        return ResponseEntity.ok().body(surveyList);
    }
    // 설문지 생성
    @PostMapping(path="/survey/")
    public ResponseEntity insertSurvey(@RequestBody InsertSurveyDTO surveyInsertDTO){
        // TODO 정환 로그인 상태 확인 if( )
        // return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Fail Insert survey");
        String surveyID = surveyService.insertSurvey(surveyInsertDTO);
            if (surveyID == null || surveyID.length() != 24)
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Fail Insert survey");
        return ResponseEntity.status(HttpStatus.OK).body(surveyID);
    }

    // FindById 설문 참여할 때 설문 출력
    @GetMapping(path="/survey/{_id}")
    public ResponseEntity findById(@PathVariable("_id") String _id){
        SelectSurveyDTO result = surveyService.findById(_id);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    // 설문 제출
    @PostMapping("/survey/{_id}")
    public ResponseEntity insertAnswer(@PathVariable("_id") String _id, @RequestBody List<Answer> answerList){
        switch(surveyService.insertAnswer(_id,answerList)){
            case 0: return ResponseEntity.status(HttpStatus.NOT_FOUND).body("NOT FOUND");
            case 1: return ResponseEntity.status(HttpStatus.OK).body("Success");
            default: return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Fail Insert survey");
        }
    }
    // 설문지 수정
    @PutMapping(path="/survey/{id}")
    public ResponseEntity updateSurvey(@PathVariable("id") String _id, @RequestBody InsertSurveyDTO surveyInsertDTO){
        // TODO 정환, 현재 로그인한 유저로 확인하는 로직 추가해야함
        try{
            return surveyService.updateSurvey(_id, surveyInsertDTO)?
                    ResponseEntity.status(HttpStatus.OK).body("Success"):
                    ResponseEntity.status(HttpStatus.NOT_FOUND).body("NOT FOUND");
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("UPDATE FAIL");
        }
    }

    // 설문지 삭제
    @DeleteMapping(path="/survey/{_id}")
    public ResponseEntity surveyDelete(@PathVariable("_id") String _id, @RequestBody String User_Email) {
        // TODO 정환, 현재 로그인한 유저로 확인하는 로직 추가해야함
        if (surveyService.deleteSurvey(_id, User_Email) == 0)
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Fail Insert survey");
        return ResponseEntity.status(HttpStatus.OK).body("Success");
    }

    //접근 권한 테스트용
    @GetMapping(path="/survey/test")
    public String testabc() {
        return "test OK!";
    }
}