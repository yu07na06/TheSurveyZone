package com.mongoosereum.dou_survey_zone.api.v1.exception;

public class AuthenticationException extends RuntimeException{
    public ErrorCode errorCode;
    public AuthenticationException(ErrorCode errorCode){
        super(errorCode.getMessage());
        this.errorCode = errorCode;
    }
}
