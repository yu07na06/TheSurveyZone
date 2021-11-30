package com.mongoosereum.dou_survey_zone.api.v1.exception._400_BadRequest;

import com.mongoosereum.dou_survey_zone.api.v1.exception.AuthenticationException;
import com.mongoosereum.dou_survey_zone.api.v1.exception.ErrorCode;

public class AlreadyRegisteredEmailException extends AuthenticationException {
    private ErrorCode errorCode;
    public AlreadyRegisteredEmailException(ErrorCode errorCode){
        super("이미 존재하는 Eamil입니다");
        this.errorCode = errorCode;
    }
}
