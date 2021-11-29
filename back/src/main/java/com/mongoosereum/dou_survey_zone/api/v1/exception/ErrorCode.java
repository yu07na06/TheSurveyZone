package com.mongoosereum.dou_survey_zone.api.v1.exception;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@AllArgsConstructor
public enum ErrorCode {
    EMAIL_DUPLICATION(400,"ERR-USER-400","EMAIL DUPLICATED"),
    UNAUTHORIZED_ACCESS(401,"ERR-USER-401","UNAUTHORIZED_ACCESS"),
    ALREADY_PARTICIPATION(403,"ERR-USER-403","ALREADY_PARTICIPATION"),
    NOT_FOUND_USER(404,"ERR-USER-404","NOT FOUND USER"),
    NOT_FOUND_SURVEY(404,"ERR-SURVEY-404","NOT FOUND SURVEY");

    private int status;
    private String errorCode;
    private String message;
}
