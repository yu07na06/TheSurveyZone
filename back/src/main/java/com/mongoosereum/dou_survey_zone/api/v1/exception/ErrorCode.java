package com.mongoosereum.dou_survey_zone.api.v1.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ErrorCode {
    EMAIL_DUPLICATION(400,"400_1","EMAIL DUPLICATED"), // 400 이메일 중복 // 계성 생성시 이메일 중복
    VALID_NULL(400,"400_2","VALID NULL"),
    VALID_FAILED(400,"400_3","VALID FAILED"),
    UNAUTHORIZED_ACCESS(401,"401_1","UNAUTHORIZED ACCESS"), // 401 인증 없음 // 로그인 실패
    ALREADY_PARTICIPATION(403,"403_1","ALREADY PARTICIPATION"), // 403 권한 없음  // 이미 설문조사 응답한 IP
    NOT_OWNER_SURVEY(403,"403_2","NOT OWNER"), // 403 작성자 아님 (삭제, 결과, )
    NOT_FOUND_USER(404,"404_1","NOT FOUND USER"), // 404 유저(ID,PW찾기에서 유저 정보가 없을경우, Survey insert시 user정보가 업을경우)
    NOT_FOUND_SURVEY(404,"404_2","NOT FOUND SURVEY"); // 404 설문(설문지가 없을경우)

    private int status;
    private String errorCode;
    private String message;

    @Override
    public String toString() {
        return ("["+ errorCode+ "]: " + message);
    }
}
