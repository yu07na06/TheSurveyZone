package com.mongoosereum.dou_survey_zone.api.v1.exception;

public class BusinessException extends RuntimeException{
    public ErrorCode errorCode;
    public BusinessException(String cause){
        super(cause);
    }
}