package com.mongoosereum.dou_survey_zone.api.v1.exception._403_Forbidden;

import com.mongoosereum.dou_survey_zone.api.v1.exception.AuthorizationException;
import com.mongoosereum.dou_survey_zone.api.v1.exception.ErrorCode;

public class NotOwnerException extends AuthorizationException {
    private ErrorCode errorCode;
    public NotOwnerException(ErrorCode errorCode){
        super("해당 설문에 대한 권한이 없습니다.");
        this.errorCode = errorCode;
    }
}
