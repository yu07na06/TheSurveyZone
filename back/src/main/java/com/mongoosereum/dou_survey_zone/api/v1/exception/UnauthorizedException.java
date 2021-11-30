package com.mongoosereum.dou_survey_zone.api.v1.exception;

public class UnauthorizedException extends RuntimeException{
    public ErrorCode errorCode;
    public UnauthorizedException(ErrorCode errorCode){
        super(errorCode.getMessage());
        this.errorCode = errorCode;
    }
}
