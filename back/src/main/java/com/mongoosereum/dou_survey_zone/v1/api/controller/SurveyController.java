package com.mongoosereum.dou_survey_zone.v1.api.controller;

import com.mongoosereum.dou_survey_zone.v1.api.survey.dto.SelectSurveyDTO;
import com.mongoosereum.dou_survey_zone.v1.api.survey.dto.InsertSurveyDTO;
import com.mongoosereum.dou_survey_zone.v1.api.survey.dto.SurveyResultDTO;
import com.mongoosereum.dou_survey_zone.v1.api.survey.dto.SurveylistDTO;
import com.mongoosereum.dou_survey_zone.v1.api.survey.entity.mongo.Answer;
import com.mongoosereum.dou_survey_zone.v1.api.survey.entity.mysql.Survey_MySQL;
import com.mongoosereum.dou_survey_zone.v1.api.survey.entity.mysql.Surveylist_MySQL;
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

@Api(value="설문조사 API",tags = {"Survey API"})
@RestController
@RequestMapping(path = "/api/v1", produces = MediaType.APPLICATION_JSON_VALUE)
public class SurveyController{

    @Autowired
    private SurveyService surveyService;

    // selectSurveyList 설문지 리스트 출력
    @GetMapping(path="/main/list/")
    @ApiOperation(value = "설문지 리스트 출력",notes="메인 페이지용, 페이징 작업중")
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
    @ApiOperation(value = "내 설문지 리스트 출력")
    public ResponseEntity selectMySurveyList(/*@AuthenticationPrincipal String userEmail*/@RequestParam String userEmail){

        Surveylist_MySQL surveyList = surveyService.selectMySurveyList(userEmail);

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
    public ResponseEntity insertSurvey(
            @RequestBody
            @ApiParam(value="설문 생성 DTO", required = true)
                    InsertSurveyDTO surveyInsertDTO
    ){
        // TODO 정환 로그인 상태 확인 if( )
        // return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Fail Insert survey");
        String surveyID = surveyService.insertSurvey(surveyInsertDTO);
            if (surveyID == null || surveyID.length() != 24)
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Fail Insert survey");
        return ResponseEntity.status(HttpStatus.OK).body(surveyID);
    }

    @GetMapping(path="/survey/{_id}")
    @ApiOperation(value = "설문 조회", notes="설문 조사 참여할때 설문 조사 출력")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공", response = SelectSurveyDTO.class),
            @ApiResponse(code = 404, message = "해당 설문 없음", response = HttpClientErrorException.NotFound.class),
            @ApiResponse(code = 500, message = "서버 오류", response = HttpServerErrorException.InternalServerError.class)
    })
    public ResponseEntity findById(
            @PathVariable("_id")
            @ApiParam(value="설문조사 PK (영어+숫자 24글자)",required = true, example = "619775a6f9517400e97e30e2")
                    String _id
    ){
        SelectSurveyDTO result = surveyService.findById(_id);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    @PostMapping("/survey/{_id}")
    @ApiOperation(value = "설문 제출", notes="설문 조사 참여할때 작성한 설문 제출")
    @ApiResponses({
            @ApiResponse(code = 201, message = "제출 완료"),
            @ApiResponse(code = 404, message = "해당 설문 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity insertAnswer(
            @PathVariable("_id")
            @ApiParam(value="설문조사 PK (영어+숫자 24글자)",required = true, example = "619775a6f9517400e97e30e2")
                    String _id,
            @RequestBody
            @ApiParam(value="작성 답변 List (해당 설문의 질문 개수와 동일한 length)",required = true)
                    List<Answer> answerList
    ){
        switch(surveyService.insertAnswer(_id,answerList)){
            case 0: return ResponseEntity.status(HttpStatus.NOT_FOUND).body("NOT FOUND");
            case 1: return ResponseEntity.status(HttpStatus.CREATED).body("Success");
            default: return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Fail Insert survey");
        }
    }
    // 설문지 수정
    @PutMapping(path="/survey/{id}")
    @ApiOperation(value = "설문 수정", notes="작성한 설문 조사 수정")
    @ApiResponses({
            @ApiResponse(code = 201, message = "수정 완료"),
            @ApiResponse(code = 404, message = "해당 설문 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity updateSurvey(
            @PathVariable("id")
            @ApiParam(value="설문조사 PK (영어+숫자 24글자)",required = true, example = "619775a6f9517400e97e30e2")
                    String _id,
            @RequestBody
            @ApiParam(value="설문 수정 DTO", required = true)
                    InsertSurveyDTO surveyInsertDTO
    ){
        // TODO 정환, 현재 로그인한 유저로 확인하는 로직 추가해야함
        try{
            return surveyService.updateSurvey(_id, surveyInsertDTO)?
                    ResponseEntity.status(HttpStatus.CREATED).body("SURVEY UPDATED"):
                    ResponseEntity.status(HttpStatus.NOT_FOUND).body("NOT FOUND");
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("INTERNAL_SERVER_ERROR : "+e);
        }
    }

    // 설문지 삭제
    @DeleteMapping(path="/survey/{_id}")
    @ApiOperation(value = "설문 삭제", notes="작성한 설문 조사 삭제, 작성자만 실행 가능")
    @ApiResponses({
            @ApiResponse(code = 200, message = "삭제 완료"),
            @ApiResponse(code = 404, message = "해당 설문 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity surveyDelete(
            @PathVariable("_id")
            @ApiParam(value="설문조사 PK (영어+숫자 24글자)",required = true, example = "619775a6f9517400e97e30e2")
                    String _id,
            @RequestBody
            @ApiParam(value="해당 설문 작성자 Email", required = true, example = "ojh2134@gmail.com")
                    String User_Email
    ) {
        // TODO 정환, 현재 로그인한 유저로 확인하는 로직 추가해야함
        if (surveyService.deleteSurvey(_id, User_Email) == 0)
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("DELETE FAILED");
        return ResponseEntity.status(HttpStatus.OK).body("SURVEY DELETED");
    }

    @GetMapping(path="/survey/{_id}/result")
    @ApiOperation(value = "설문 결과 조회", notes="작성한 설문 조사의 결과 조회, 작성자만 실행 가능 \n미구현 : 공개인 경우(모든 사람 조회가능) 실행 가능")
    @ApiResponses({
            @ApiResponse(code = 200, message = "설문 결과", response = SurveyResultDTO.class),
            @ApiResponse(code = 404, message = "해당 설문 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity surveyResult(
            @PathVariable("_id")
            @ApiParam(value="설문조사 PK (영어+숫자 24글자)",required = true, example = "619b39da46f35902f0cc7757")
                    String _id
//            @RequestParam
//            @ApiParam(value="해당 설문 작성자 Email", required = true, example = "ojh2134@gmail.com")
//                    String User_Email // TODO security로 확인하게끔 변경해야함
    ) {
        // TODO 정환, 현재 로그인한 유저로 확인하는 로직 필요
        SurveyResultDTO surveyResultDTO = surveyService.resultSurvey(_id);
        if(surveyResultDTO == null)
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("해당하는 설문이 존재하지 않습니다");
        return ResponseEntity.status(HttpStatus.OK).body(surveyResultDTO);
    }

    //접근 권한 테스트용
    @GetMapping(path="/survey/test")
    public String testabc() {
        return "test OK!";
    }
}