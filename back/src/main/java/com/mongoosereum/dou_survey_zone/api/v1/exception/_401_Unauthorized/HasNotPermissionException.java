package com.mongoosereum.dou_survey_zone.api.v1.exception._401_Unauthorized;

import com.mongoosereum.dou_survey_zone.api.v1.exception.AuthenticationException;
import com.mongoosereum.dou_survey_zone.api.v1.exception.ErrorCode;

public class HasNotPermissionException extends AuthenticationException {
    private ErrorCode errorCode;
    public HasNotPermissionException(ErrorCode errorCode){
        super("해당 요청에 권한이 없습니다.");
        this.errorCode = errorCode;
    }
}
