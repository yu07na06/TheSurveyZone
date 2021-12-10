package com.mongoosereum.dou_survey_zone.api.v1.exception;

public class BadRequestException extends RuntimeException{
    public ErrorCode errorCode;
    public BadRequestException(ErrorCode errorCode){
        super(errorCode.getMessage());
        this.errorCode = errorCode;
    }
}
