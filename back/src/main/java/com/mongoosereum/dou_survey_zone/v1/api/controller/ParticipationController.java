package com.mongoosereum.dou_survey_zone.v1.api.controller;


import com.mongoosereum.dou_survey_zone.v1.api.participation.entity.Part_Acc_MySQL;
import com.mongoosereum.dou_survey_zone.v1.api.participation.service.PartService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@Slf4j
@RequestMapping(path = "/api/v1/participation", produces = MediaType.APPLICATION_JSON_VALUE)
public class ParticipationController {

    @Autowired
    private PartService service;

    /*누적이용자수*/
    @GetMapping(path="/accuser")
    public ResponseEntity<?> accUser() {
        Part_Acc_MySQL result = service.partACC();
        return ResponseEntity.ok().body(result);
    }

}
