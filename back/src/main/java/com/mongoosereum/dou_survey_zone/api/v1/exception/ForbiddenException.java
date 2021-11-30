package com.mongoosereum.dou_survey_zone.api.v1.exception;

public class AuthorizationException extends RuntimeException{
    public ErrorCode errorCode;
    public AuthorizationException(ErrorCode errorCode){
        super(errorCode.getMessage());
        this.errorCode = errorCode;
    }
}
