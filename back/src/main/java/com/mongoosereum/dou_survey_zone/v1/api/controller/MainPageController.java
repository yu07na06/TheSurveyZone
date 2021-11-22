package com.mongoosereum.dou_survey_zone.v1.api.controller;


import com.mongoosereum.dou_survey_zone.v1.api.participation.dto.ParticipationDTO;
import com.mongoosereum.dou_survey_zone.v1.api.participation.entity.Part_Acc_MySQL;
import com.mongoosereum.dou_survey_zone.v1.api.participation.service.PartService;
import com.mongoosereum.dou_survey_zone.v1.api.tag.entity.Tag;
import io.swagger.annotations.ApiOperation;
import lombok.Builder;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Slf4j
@RequestMapping(path = "/api/v1", produces = MediaType.APPLICATION_JSON_VALUE)
public class MainPageController {

    @Autowired
    private PartService partService;

    /*누적이용자수*/
    @GetMapping(path="/main/acc")
    @ApiOperation(value = "누적 이용자 정보 출력")
    public ResponseEntity<?> accUser() {
        Part_Acc_MySQL resultAcc = partService.partACC();
        List<Tag> resultTag = partService.partTag();
        ParticipationDTO response = ParticipationDTO.builder()
                .part_Total(resultAcc.getPart_Total())
                .part_Age(resultAcc.getPart_Age())
                .part_Gender(resultAcc.getPart_Gender())
                .sur_Tag(resultTag)
                .build();
        return ResponseEntity.ok().body(response);
    }

}
