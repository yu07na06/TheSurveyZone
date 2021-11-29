package com.mongoosereum.dou_survey_zone.api.v1.exception._403_Forbidden;

import com.mongoosereum.dou_survey_zone.api.v1.exception.AuthorizationException;
import com.mongoosereum.dou_survey_zone.api.v1.exception.ErrorCode;

public class AlreadyParticipatedException extends AuthorizationException {
    private ErrorCode errorCode;
    public AlreadyParticipatedException(ErrorCode errorCode){
        super("이미 참여한 설문입니다.");
        this.errorCode = errorCode;
    }
}
