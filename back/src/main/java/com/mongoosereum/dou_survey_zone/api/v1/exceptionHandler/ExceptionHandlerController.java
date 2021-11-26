package com.mongoosereum.dou_survey_zone.api.v1.exceptionHandler;

import com.mongoosereum.dou_survey_zone.api.v1.exception.BusinessException;
import com.mongoosereum.dou_survey_zone.api.v1.exceptionHandler.dto.ExceptionModel;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ExceptionHandlerController {

    @ExceptionHandler(BusinessException.class)
    public ResponseEntity<ExceptionModel> businessExceptionHandler(BusinessException e) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ExceptionModel.of(e));
    }
}