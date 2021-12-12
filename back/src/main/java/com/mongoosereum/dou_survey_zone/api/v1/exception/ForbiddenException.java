package com.mongoosereum.dou_survey_zone.api.v1.exception;

public class ForbiddenException extends RuntimeException{
    public ErrorCode errorCode;
    public ForbiddenException(ErrorCode errorCode){
        super(errorCode.getMessage());
        this.errorCode = errorCode;
    }
}
