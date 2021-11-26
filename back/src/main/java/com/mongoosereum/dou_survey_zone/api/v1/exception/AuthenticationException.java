package com.mongoosereum.dou_survey_zone.api.v1.exception;

public class AuthenticationException extends RuntimeException{
    public AuthenticationException(String cause){
        super(cause);
    }
}
