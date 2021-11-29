package com.mongoosereum.dou_survey_zone.api.v1.exception;

public class AuthorizationException extends RuntimeException{
    private ErrorCode errorCode;
    public AuthorizationException(String cause){
        super(cause);
    }
}
