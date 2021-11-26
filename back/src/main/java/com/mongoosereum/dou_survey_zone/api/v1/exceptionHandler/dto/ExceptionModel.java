package com.mongoosereum.dou_survey_zone.api.v1.exceptionHandler.dto;

import com.mongoosereum.dou_survey_zone.api.v1.exception.AuthenticationException;
import com.mongoosereum.dou_survey_zone.api.v1.exception.BusinessException;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.boot.autoconfigure.neo4j.Neo4jProperties;

@Data
@AllArgsConstructor
public class ExceptionModel {
    private final int status;
    private final String message;

//    private ExceptionModel(int status,String message){
//        this.status =status;
//        this.message = message;
//    }
    public static ExceptionModel of(BusinessException e) {
        return new ExceptionModel(404, e.getMessage());
    }
    public static ExceptionModel of(AuthenticationException e) {
        return new ExceptionModel(404, e.getMessage());
    }
}
