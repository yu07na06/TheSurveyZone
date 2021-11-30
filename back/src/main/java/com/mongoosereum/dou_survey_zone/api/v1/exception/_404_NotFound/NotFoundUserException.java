package com.mongoosereum.dou_survey_zone.api.v1.exception._404_NotFound;

import com.mongoosereum.dou_survey_zone.api.v1.exception.BusinessException;
import com.mongoosereum.dou_survey_zone.api.v1.exception.ErrorCode;

public class NotFoundUserException extends BusinessException {
    public NotFoundUserException(ErrorCode errorCode){
        super("존재하지 않는 유저의 접근입니다.");
        super.errorCode = errorCode;
    }
}
