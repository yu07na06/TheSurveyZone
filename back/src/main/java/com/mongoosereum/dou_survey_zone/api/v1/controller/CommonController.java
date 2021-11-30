package com.mongoosereum.dou_survey_zone.api.v1.controller;

import com.mongoosereum.dou_survey_zone.api.v1.service.ParticipationService;
import com.mongoosereum.dou_survey_zone.api.v1.dto.response.common.MainInfoRes;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@Slf4j
@RequestMapping(path = "/api/v1", produces = MediaType.APPLICATION_JSON_VALUE)
public class CommonController {

    @Autowired
    private ParticipationService partService;

    @GetMapping(path="/main/acc")
    @ApiOperation(value = "메인 페이지 정보 출력", notes = "누적 사용자 정보 및 게시물이 존재하는 태그 리스트 출력")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공", response = MainInfoRes.class),
    })
    public ResponseEntity mainTest() {
        MainInfoRes mainInfo = partService.resultMainInfo();
        if(mainInfo == null)
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Server Fail");
        return ResponseEntity.ok().body(partService.resultMainInfo());
    }
}