package com.mongoosereum.dou_survey_zone.api.v1.exception;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.MethodArgumentNotValidException;

import java.util.List;
import java.util.stream.Collectors;

@Data
@AllArgsConstructor
public class ExceptionModel {
    private final int status;
    private final String errorCode;
    private final String message;

    public static ExceptionModel of(BadRequestException e) {
        return new ExceptionModel(e.errorCode.getStatus(),e.errorCode.getErrorCode(), e.errorCode.getMessage());
    }
    public static ExceptionModel of(NotFoundException e) {
        return new ExceptionModel(e.errorCode.getStatus(),e.errorCode.getErrorCode(), e.errorCode.getMessage());
    }
    public static ExceptionModel of(ForbiddenException e){
        return new ExceptionModel(e.errorCode.getStatus(),e.errorCode.getErrorCode(), e.errorCode.getMessage());
    }
    public static ExceptionModel of(UnauthorizedException e) {
        return new ExceptionModel(e.errorCode.getStatus(),e.errorCode.getErrorCode(), e.errorCode.getMessage());
    }
//    public static ExceptionModel of(MethodArgumentNotValidException e){
//        List<String> validationList = e.getBindingResult()
//                .getFieldErrors()
//                .stream()
//                .map(fieldError-> fieldError.getField()+" : "+fieldError.getDefaultMessage())
//                .collect(Collectors.toList());
//
//        return new ExceptionModel(400,validationList.toString());
//    }
//    public static ExceptionModel of(HttpMessageNotReadableException e) {
//        return new ExceptionModel(400, "Request body has empty value");
//    }
}
