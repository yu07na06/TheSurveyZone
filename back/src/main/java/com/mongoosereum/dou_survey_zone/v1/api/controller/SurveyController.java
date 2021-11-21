package com.mongoosereum.dou_survey_zone.v1.api.controller;

import com.mongoosereum.dou_survey_zone.v1.api.survey.dto.SelectSurveyDTO;
import com.mongoosereum.dou_survey_zone.v1.api.survey.dto.InsertSurveyDTO;
import com.mongoosereum.dou_survey_zone.v1.api.survey.entity.mongo.Answer;
import com.mongoosereum.dou_survey_zone.v1.api.survey.entity.mysql.Survey_MySQL;
import com.mongoosereum.dou_survey_zone.v1.api.survey.service.SurveyService;
import com.mongoosereum.dou_survey_zone.v1.api.tag.entity.Tag;
import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;

import java.util.List;

@Api(value="설문조사 API", tags = {"Survey API"})
@RestController
@RequestMapping(path = "/api/v1", produces = MediaType.APPLICATION_JSON_VALUE)
public class SurveyController{

    @Autowired
    private SurveyService surveyService;

    @GetMapping(path="/main/list")
    @ApiOperation(value = "설문지 리스트 출력",notes="메인 페이지용, 페이징 미완성")
    public ResponseEntity selectSurveyList(){
        List<Survey_MySQL> surveyList = surveyService.selectSurveyList();
        return ResponseEntity.ok(surveyList);
    }
    @GetMapping(path="/survey/myPage")
    @ApiOperation(value = "내 설문지 리스트 출력")
    public ResponseEntity selectMySurveyList(/*@AuthenticationPrincipal String userEmail*/@RequestParam @ApiParam(value="사용자 이메일 정보", required = true) String userEmail){
        List<Survey_MySQL> surveyList = surveyService.selectMySurveyList(userEmail);
        return ResponseEntity.ok().body(surveyList);
    }
    @GetMapping(path="/survey/tags")
    @ApiOperation(value="현재 존재하는 태그 리스트 출력", notes = "설문 생성시 존재하는 태그 리스트 출력")
    public ResponseEntity selectTagList(){
        return ResponseEntity.ok(surveyService.selectTagList());
    }
    @GetMapping(path="/survey/tags-exist")
    @ApiOperation(value="게시물이 존재하는 태그 리스트 출력", notes="메인 페이지에서 보여줄 태그 리스트 출력")
    public ResponseEntity selectTagExistList(){
        return ResponseEntity.ok(surveyService.selectTagExistList(""));
    }
    @PostMapping(path="/survey/")
    @ApiOperation(value = "설문 생성")
    public ResponseEntity insertSurvey(@RequestBody InsertSurveyDTO surveyInsertDTO){
        // TODO 정환 로그인 상태 확인 if( )
        // return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Fail Insert survey");
        String surveyID = surveyService.insertSurvey(surveyInsertDTO);
            if (surveyID == null || surveyID.length() != 24)
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Fail Insert survey");
        return ResponseEntity.status(HttpStatus.OK).body(surveyID);
    }

    @GetMapping(path="/survey/{_id}")
    @ApiOperation(value = "설문 조회", notes="설문 조사 참여할때 설문 조사 출력")
    public ResponseEntity findById(@PathVariable("_id") String _id){
        SelectSurveyDTO result = surveyService.findById(_id);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    @PostMapping("/survey/{_id}")
    @ApiOperation(value = "설문 제출", notes="설문 조사 참여할때 작성한 설문 제출")
    public ResponseEntity insertAnswer(@PathVariable("_id") String _id, @RequestBody List<Answer> answerList){
        switch(surveyService.insertAnswer(_id,answerList)){
            case 0: return ResponseEntity.status(HttpStatus.NOT_FOUND).body("NOT FOUND");
            case 1: return ResponseEntity.status(HttpStatus.OK).body("Success");
            default: return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Fail Insert survey");
        }
    }
    // 설문지 수정
    @PutMapping(path="/survey/{id}")
    @ApiOperation(value = "설문 수정", notes="작성한 설문 조사 수정")
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
    @ApiOperation(value = "설문 수정", notes="작성한 설문 조사 삭제")
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