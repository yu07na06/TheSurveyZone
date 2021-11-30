package com.mongoosereum.dou_survey_zone.api.v1.controller;

import com.mongoosereum.dou_survey_zone.api.v1.dto.request.survey.InsertAnswerReq;
import com.mongoosereum.dou_survey_zone.api.v1.dto.response.survey.SelectSurveyRes;
import com.mongoosereum.dou_survey_zone.api.v1.dto.request.survey.InsertSurveyReq;
import com.mongoosereum.dou_survey_zone.api.v1.dto.response.survey.SurveyPartCheckRes;
import com.mongoosereum.dou_survey_zone.api.v1.dto.response.survey.SurveyResultRes;
import com.mongoosereum.dou_survey_zone.api.v1.dto.request.survey.SurveyListPageReq;
import com.mongoosereum.dou_survey_zone.api.v1.dto.response.survey.SurveyListPageRes;
import com.mongoosereum.dou_survey_zone.api.v1.domain.survey.SurveyService;
import com.mongoosereum.dou_survey_zone.api.v1.exception._404_NotFound.NotFoundEntityException;
import com.mongoosereum.dou_survey_zone.api.v1.exceptionHandler.dto.ExceptionModel;
import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.Nullable;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import javax.validation.constraints.NotBlank;

@Api(value="설문조사 API",tags = {"Survey API"})
@RestController
@RequestMapping(path = "/api/v1", produces = MediaType.APPLICATION_JSON_VALUE)
public class SurveyController{

    @Autowired
    private SurveyService surveyService;

    // selectSurveyList 설문지 리스트 출력
    @GetMapping(path="/main/list")
    @ApiOperation(value = "설문지 리스트 출력",notes="메인 페이지용, 페이징 작업중")
    public ResponseEntity selectSurveyList(

            @ApiParam(value="페이징 처리 정보 DTO", required = true)

            SurveyListPageReq surveylistDTO
    ){
            return ResponseEntity.status(HttpStatus.OK).body(surveyService.selectSurveyList(surveylistDTO));
    }
    @GetMapping(path="/survey/myPage")
    @ApiOperation(value = "내 설문지 리스트 출력")
    public ResponseEntity selectMySurveyList(
            @ApiParam(value="페이징 처리 정보 DTO",required = true)
                    SurveyListPageReq surveyListPageReq,
            @AuthenticationPrincipal
            @Valid
            @NotBlank
                    String userEmail
    ){
        return ResponseEntity.ok().body(surveyService.selectMySurveyList(userEmail, surveyListPageReq));
    }
    @GetMapping(path="/survey/tags")
    @ApiOperation(value="현재 존재하는 태그 리스트 출력", notes = "설문 생성시 존재하는 태그 리스트 출력")
    public ResponseEntity selectTagList(){
        return ResponseEntity.ok(surveyService.selectTagList());
    }

    @PostMapping(path="/survey/")
    @ApiOperation(value = "설문 생성")
    public ResponseEntity insertSurvey(
            @RequestBody
            @ApiParam(value="설문 생성 DTO", required = true)
            @Valid
                    InsertSurveyReq insertSurveyReq,
            @AuthenticationPrincipal
                    String userEmail
    ){
        insertSurveyReq.setUser_Email(userEmail);
        String surveyID = surveyService.insertSurvey(insertSurveyReq);
        if (surveyID == null || surveyID.length() != 24)
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Fail Insert survey");
        return ResponseEntity.status(HttpStatus.OK).body(surveyID);
    }

    @GetMapping(path = "/survey/{_id}/Check")
    @ApiOperation(value = "설문 참여 체크", notes="설문 조사 참여할때 중복 참여 체크")
    public ResponseEntity partCheck(
            @PathVariable("_id")
                    String _id,
            HttpServletRequest request
    ){
        return ResponseEntity.ok().body(surveyService.checkPart(_id, request));
    }


    @GetMapping(path="/survey/{_id}")
    @ApiOperation(value = "설문 조회", notes="설문 조사 참여할때 설문 조사 출력")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공", response = SelectSurveyRes.class),
            @ApiResponse(code = 404, message = "해당 설문 없음", response = ExceptionModel.class),
    })
    public ResponseEntity findById(
            @PathVariable("_id")
            @ApiParam(value="설문조사 PK (영어+숫자 24글자)",required = true, example = "619775a6f9517400e97e30e2")
                    String _id
    ){
        return ResponseEntity.status(HttpStatus.OK).body(surveyService.findById(_id));
    }

    @PostMapping("/survey/{_id}")
    @ApiOperation(value = "설문 제출", notes="설문 조사 참여할때 작성한 설문 제출")
    @ApiResponses({
            @ApiResponse(code = 201, message = "제출 완료"),
            @ApiResponse(code = 404, message = "해당 설문 없음"),
    })
    public ResponseEntity insertAnswer(
            @PathVariable("_id")
            @ApiParam(value="설문조사 PK (영어+숫자 24글자)",required = true, example = "619775a6f9517400e97e30e2")
                    String _id,
            @RequestBody
            @ApiParam(value="작성 답변 DTO ",required = true)
                    InsertAnswerReq insertAnswerReq,
            @ApiParam(hidden = true)
                    HttpServletRequest request
    ){
        switch(surveyService.insertAnswer(_id,insertAnswerReq,request)){
            case -1: return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("이미 응답이 존재하는 IP입니다.");
            case 1: return ResponseEntity.status(HttpStatus.CREATED).body("Success");
            case 0 :
            default : return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("설문 제출 실패");
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
                    InsertSurveyReq surveyInsertDTO,
            @AuthenticationPrincipal String userEmail
    ){
        if(!surveyService.checkOwner(_id,userEmail))
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("권한 없음");

        surveyInsertDTO.setUser_Email(userEmail);

        try{
            Integer result = surveyService.updateSurvey(_id, surveyInsertDTO);
            if (result == null)
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("권한 없음");
            else if (result == 0)
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("NOT FOUND");
            else
                return ResponseEntity.status(HttpStatus.CREATED).body("SURVEY UPDATED");
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

            @AuthenticationPrincipal
                    String userEmail
    ) {
        if(!surveyService.checkOwner(_id,userEmail))
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("권한 없음");

        if (surveyService.deleteSurvey(_id, userEmail) == 0L)
            // TODO delete Survey 단순 삭제하는 로직만
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("권한 없음");
        return ResponseEntity.status(HttpStatus.OK).body("SURVEY DELETED");
    }

    @GetMapping(path="/survey/{_id}/result")
    @ApiOperation(value = "설문 결과 조회", notes="작성한 설문 조사의 결과 조회, 작성자만 실행 가능 \n미구현 : 공개인 경우(모든 사람 조회가능) 실행 가능")
    @ApiResponses({
            @ApiResponse(code = 200, message = "설문 결과", response = SurveyResultRes.class),
            @ApiResponse(code = 404, message = "해당 설문 없음"),
    })
    public ResponseEntity surveyResult(
            @PathVariable("_id")
            @ApiParam(value="설문조사 PK (영어+숫자 24글자)",required = true, example = "619b39da46f35902f0cc7757")
                    String _id
//            @AuthenticationPrincipal
//                    String userEmail
    ) {
//        if(!surveyService.checkOwner(_id,userEmail))
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("권한 없음");
        return ResponseEntity.status(HttpStatus.OK).body(surveyService.resultSurvey(_id));
    }

    //접근 권한 테스트용
    @GetMapping(path="/survey/test")
    public String testabc() {
        return "test OK!";
    }

}