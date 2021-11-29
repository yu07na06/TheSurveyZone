package com.mongoosereum.dou_survey_zone.api.v1.exception;

public class BusinessException extends RuntimeException{
    public BusinessException(String cause){
        super(cause);
    }
}
