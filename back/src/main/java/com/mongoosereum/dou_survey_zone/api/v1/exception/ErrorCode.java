package com.mongoosereum.dou_survey_zone.api.v1.exception;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@AllArgsConstructor
public enum ErrorCode {
    EMAIL_DUPLICATION(400,"ERR-USER-400","EMAIL DUPLICATED"), // 400 이메일 중복
    UNAUTHORIZED_ACCESS(401,"ERR-USER-401","UNAUTHORIZED_ACCESS"), // 401 인증 없음
    ALREADY_PARTICIPATION(403,"ERR-USER-403","ALREADY_PARTICIPATION"), // 403 권한 없음
    NOT_FOUND_USER(404,"ERR-USER-404","NOT FOUND USER"), // 404 유저
    NOT_FOUND_SURVEY(404,"ERR-SURVEY-404","NOT FOUND SURVEY"); // 404 설문

    private int status;
    private String errorCode;
    private String message;
}
