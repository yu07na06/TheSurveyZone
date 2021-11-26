package com.mongoosereum.dou_survey_zone.api.v1.exception;

public class NotFoundEntityException extends BusinessException{
    public NotFoundEntityException(){
        super("존재하지 않는 정보의 접근입니다.");
    }
}
