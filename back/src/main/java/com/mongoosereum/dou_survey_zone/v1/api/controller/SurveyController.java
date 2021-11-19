package com.mongoosereum.dou_survey_zone.v1.api.controller;

import com.mongoosereum.dou_survey_zone.v1.api.survey.dto.SelectSurveyDTO;
import com.mongoosereum.dou_survey_zone.v1.api.survey.dto.InsertAnswerDTO;
import com.mongoosereum.dou_survey_zone.v1.api.survey.dto.InsertSurveyDTO;
import com.mongoosereum.dou_survey_zone.v1.api.survey.entity.mongo.Answer;
import com.mongoosereum.dou_survey_zone.v1.api.survey.entity.mysql.Survey_MySQL;
import com.mongoosereum.dou_survey_zone.v1.api.survey.service.SurveyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/api/v1/survey", produces = MediaType.APPLICATION_JSON_VALUE)
public class SurveyController{

    @Autowired
    private SurveyService surveyService;

    // selectSurveyList 설문지 리스트 출력
    @GetMapping(path="/")
    public ResponseEntity selectSurveyList(){
        List<Survey_MySQL> surveyList = surveyService.selectSurveyList();
        if(surveyList != null){
            return ResponseEntity.status(HttpStatus.OK).body(surveyList);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("설문 리스트가 존재하지 않습니다.");
    }

    // 설문지 생성
    @PostMapping(path="/")
    public ResponseEntity insertSurvey(@RequestBody InsertSurveyDTO surveyInsertDTO){
        // TODO 정환 로그인 상태 확인 if( )
        // return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Fail Insert survey");
        String surveyID = surveyService.insertSurvey(surveyInsertDTO);
        if(surveyID == null || surveyID.length() != 24)
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Fail Insert survey");
        return ResponseEntity.status(HttpStatus.OK).body(surveyID);
    }

    // FindById 설문 참여할 때 설문 출력
    @GetMapping(path="/{_id}")
    public ResponseEntity findById(@PathVariable("_id") String _id){
        SelectSurveyDTO result = surveyService.findById(_id);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    // 설문 제출
    @PostMapping("/{_id}")
    public ResponseEntity insertAnswer(@PathVariable("_id") String _id, @RequestBody List<Answer> answerList){
        switch(surveyService.insertAnswer(_id,answerList)){
            case 0: return ResponseEntity.status(HttpStatus.NOT_FOUND).body("NOT FOUND");
            case 1: return ResponseEntity.status(HttpStatus.OK).body("Success");
            default: return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Fail Insert survey");
        }
    }
    // 설문지 수정
    @PutMapping(path="/{id}")
    public ResponseEntity updateSurvey(@PathVariable("id") String _id, @RequestBody InsertSurveyDTO surveyInsertDTO){
        // TODO 정환, 현재 로그인한 유저로 확인하는 로직 추가해야함
        try{
            return surveyService.updateSurvey(_id, surveyInsertDTO)?
                    ResponseEntity.status(HttpStatus.OK).body("Success"):
                    ResponseEntity.status(HttpStatus.NOT_FOUND).body("NOT FOUND");
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("NOT FOUND");
        }
    }

    // 설문지 삭제
    @DeleteMapping(path="/{_id}")
    public ResponseEntity surveyDelete(@PathVariable("_id") String _id, @RequestBody String User_Email){
        // TODO 정환, 현재 로그인한 유저로 확인하는 로직 추가해야함
        switch(surveyService.deleteSurvey(_id, User_Email)) {
            case 0: return ResponseEntity.status(HttpStatus.NOT_FOUND).body("NOT FOUND");
            case 1: return ResponseEntity.status(HttpStatus.OK).body("Success");
            default: return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Fail Insert survey");
        }
    }

    //접근 권한 테스트용
    @GetMapping(path="/test")
    public String testabc() {
        return "test OK!";
    }
}