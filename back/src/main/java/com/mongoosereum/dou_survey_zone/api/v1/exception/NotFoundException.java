package com.mongoosereum.dou_survey_zone.api.v1.exception;

public class NotFoundException extends RuntimeException{
    public ErrorCode errorCode;
    public NotFoundException(ErrorCode errorCode){
        super(errorCode.getMessage());
        this.errorCode = errorCode;
    }
}