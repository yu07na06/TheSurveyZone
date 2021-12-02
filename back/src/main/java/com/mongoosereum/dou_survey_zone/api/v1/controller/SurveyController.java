package com.mongoosereum.dou_survey_zone.api.v1.controller;

import com.mongoosereum.dou_survey_zone.api.v1.common.S3Uploader;
import com.mongoosereum.dou_survey_zone.api.v1.exception.BadRequestException;
import com.mongoosereum.dou_survey_zone.api.v1.exception.ErrorCode;
import com.mongoosereum.dou_survey_zone.api.v1.service.SurveyService;
import com.mongoosereum.dou_survey_zone.api.v1.dto.request.survey.InsertAnswerReq;
import com.mongoosereum.dou_survey_zone.api.v1.dto.request.survey.InsertSurveyReq;
import com.mongoosereum.dou_survey_zone.api.v1.dto.request.survey.SurveyListPageReq;
import com.mongoosereum.dou_survey_zone.api.v1.dto.response.survey.SelectSurveyRes;
import com.mongoosereum.dou_survey_zone.api.v1.dto.response.survey.SurveyPartCheckRes;
import com.mongoosereum.dou_survey_zone.api.v1.dto.response.survey.SurveyResultRes;
import com.mongoosereum.dou_survey_zone.api.v1.exception.ExceptionModel;
import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import javax.validation.constraints.NotBlank;

@Api(value = "설문조사 API", tags = {"Survey API"})
@RestController
@RequestMapping(path = "/api/v1", produces = MediaType.APPLICATION_JSON_VALUE)
public class SurveyController {

    @Autowired
    private SurveyService surveyService;

    @Autowired
    private S3Uploader s3Uploader;

    // selectSurveyList 설문지 리스트 출력
    @GetMapping(path = "/main/list")
    @ApiOperation(value = "설문지 리스트 출력", notes = "메인 페이지용, 페이징 작업중")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공", response = SelectSurveyRes.class)
    })
    public ResponseEntity selectSurveyList(

            @ApiParam(value = "페이징 처리 정보 DTO", required = true)

                    SurveyListPageReq surveylistDTO
    ) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(surveyService.selectSurveyList(surveylistDTO));
    }

    @GetMapping(path = "/survey/myPage")
    @ApiOperation(value = "내 설문지 리스트 출력")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공", response = SelectSurveyRes.class),
            @ApiResponse(code = 403, message = "권한 없음" , response = ExceptionModel.class)
    })
    public ResponseEntity selectMySurveyList(
            @ApiParam(value = "페이징 처리 정보 DTO", required = true)
                    SurveyListPageReq surveyListPageReq,
            @AuthenticationPrincipal
            @Valid
            @NotBlank
                    String userEmail
    ) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(surveyService.selectMySurveyList(userEmail, surveyListPageReq));
    }

    @GetMapping(path = "/survey/tags")
    @ApiOperation(value = "현재 존재하는 태그 리스트 출력", notes = "설문 생성시 존재하는 태그 리스트 출력")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공", response = SelectSurveyRes.class)
    })
    public ResponseEntity selectTagList() {
        return ResponseEntity.status(HttpStatus.OK)
                .body(surveyService.selectTagList());
    }

    @PostMapping(path = "/survey/")
    @ApiOperation(value = "설문 생성")
    @ApiResponses({
            @ApiResponse(code = 201, message = "return 설문 PK값"),
            @ApiResponse(code = 403, message = "권한 없음" , response = ExceptionModel.class)
    })
    public ResponseEntity insertSurvey(
            @RequestBody
            @ApiParam(value = "설문 생성 DTO", required = true)
            @Valid
                    InsertSurveyReq insertSurveyReq,
            @AuthenticationPrincipal
                    String userEmail
    ) {
        System.out.println("시작됐나?");
        if(insertSurveyReq.getSur_Image() == null)
            insertSurveyReq.setSur_Image("EMPTY");
        insertSurveyReq.setUser_Email(userEmail);
        return ResponseEntity.status(HttpStatus.OK)
                .body(surveyService.insertSurvey(insertSurveyReq));
    }

    // TODO 일단 보류
    @GetMapping(path = "/survey/{_id}/Check")
    @ApiOperation(value = "설문 참여 체크", notes = "설문 조사 참여할때 중복 참여 체크")
    @ApiResponses({
            @ApiResponse(code = 200, message = "설문 참여 여부", response = SurveyPartCheckRes.class),
            @ApiResponse(code = 404, message = "설문 존재하지 않음" , response = ExceptionModel.class)
    })
    public ResponseEntity partCheck(
            @PathVariable("_id")
                    String _id,
            HttpServletRequest request
    ) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(surveyService.checkPart(_id, request));
    }


    @GetMapping(path = "/survey/{_id}")
    @ApiOperation(value = "설문 조회", notes = "설문 조사 참여할때 설문 조사 출력")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공", response = SelectSurveyRes.class),
            @ApiResponse(code = 401, message = "해당 설문 없음", response = ExceptionModel.class),
    })
    public ResponseEntity findById(
            @PathVariable("_id")
            @ApiParam(value = "설문조사 PK (영어+숫자 24글자)", required = true, example = "619775a6f9517400e97e30e2")
                    String _id
    ) {
        return ResponseEntity.status(HttpStatus.OK).body(surveyService.findById(_id));
    }

    @PostMapping("/survey/{_id}")
    @ApiOperation(value = "설문 제출", notes = "설문 조사 참여할때 작성한 설문 제출")
    @ApiResponses({
            @ApiResponse(code = 201, message = "제출 완료"),
            @ApiResponse(code = 403, message = "이미 참여한 설문", response = ExceptionModel.class),
            @ApiResponse(code = 404, message = "해당 설문 없음", response = ExceptionModel.class)
    })
    public ResponseEntity insertAnswer(
            @PathVariable("_id")
            @ApiParam(value = "설문조사 PK (영어+숫자 24글자)", required = true, example = "619775a6f9517400e97e30e2")
                    String _id,
            @RequestBody
            @ApiParam(value = "작성 답변 DTO ", required = true)
                    InsertAnswerReq insertAnswerReq,
            @ApiParam(hidden = true)
                    HttpServletRequest request
    ) {
        surveyService.insertAnswer(_id, insertAnswerReq, request);
        return ResponseEntity.status(HttpStatus.CREATED).body("Success");
    }

    // 설문지 수정
    @PutMapping(path = "/survey/{id}")
    @ApiOperation(value = "설문 수정", notes = "작성한 설문 조사 수정")
    @ApiResponses({
            @ApiResponse(code = 200, message = "수정 완료"),
            @ApiResponse(code = 403, message = "권한 없음", response = ExceptionModel.class),
            @ApiResponse(code = 404, message = "해당 설문 없음", response = ExceptionModel.class)
    })
    public ResponseEntity updateSurvey(
            @PathVariable("id")
            @ApiParam(value = "설문조사 PK (영어+숫자 24글자)", required = true, example = "619775a6f9517400e97e30e2")
                    String _id,
            @RequestBody
            @ApiParam(value = "설문 수정 DTO", required = true)
                    InsertSurveyReq surveyInsertDTO,
            @AuthenticationPrincipal String userEmail
    ) {
        surveyInsertDTO.setUser_Email(userEmail);
        surveyService.updateSurvey(_id, surveyInsertDTO);
        return ResponseEntity.status(HttpStatus.OK).body("SURVEY UPDATED");
    }

    // 설문지 삭제
    @DeleteMapping(path = "/survey/{_id}")
    @ApiOperation(value = "설문 삭제", notes = "작성한 설문 조사 삭제, 작성자만 실행 가능")
    @ApiResponses({
            @ApiResponse(code = 200, message = "삭제 완료"),
            @ApiResponse(code = 403, message = "권한 없음", response = ExceptionModel.class),
            @ApiResponse(code = 404, message = "해당 설문 없음", response = ExceptionModel.class),
    })
    public ResponseEntity surveyDelete(
            @PathVariable("_id")
            @ApiParam(value = "설문조사 PK (영어+숫자 24글자)", required = true, example = "619775a6f9517400e97e30e2")
                    String _id,
            @AuthenticationPrincipal
                    String userEmail
    ) {

        surveyService.deleteSurvey(_id, userEmail);
        return ResponseEntity.status(HttpStatus.OK).body("SURVEY DELETED");
    }

    @GetMapping(path = "/survey/{_id}/result")
    @ApiOperation(value = "설문 결과 조회", notes = "작성한 설문 조사의 결과 조회, 작성자만 실행 가능 \n미구현 : 공개인 경우(모든 사람 조회가능) 실행 가능")
    @ApiResponses({
            @ApiResponse(code = 200, message = "설문 결과", response = SurveyResultRes.class),
            @ApiResponse(code = 403, message = "권한 없음", response = ExceptionModel.class),
            @ApiResponse(code = 404, message = "해당 설문 없음", response =ExceptionModel.class)
    })
    public ResponseEntity surveyResult(
            @PathVariable("_id")
            @ApiParam(value = "설문조사 PK (영어+숫자 24글자)", required = true, example = "619b39da46f35902f0cc7757")
                    String _id,
            @AuthenticationPrincipal
                    String userEmail
    ) {
        return ResponseEntity.status(HttpStatus.OK).body(surveyService.resultSurvey(userEmail,_id));
    }
}