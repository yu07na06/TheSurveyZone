package com.mongoosereum.dou_survey_zone.api.v1.exception;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import javax.servlet.ServletException;
import javax.validation.ConstraintViolation;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

@RestControllerAdvice
public class ExceptionHandlerController extends ResponseEntityExceptionHandler {

    // Request Body에 필요한 값이 전달되지않는 경우
    @Override
    protected ResponseEntity<Object> handleHttpMessageNotReadable(
            HttpMessageNotReadableException e,
            HttpHeaders headers,
            HttpStatus status,
            WebRequest request) {
        Throwable mostSpecificCause = e.getMostSpecificCause();
        if (mostSpecificCause != null) {
            String exceptionName = mostSpecificCause.getClass().getName();
            String message = mostSpecificCause.getMessage();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ExceptionModel(
                            400,
                            ErrorCode.VALID_FAILED.getErrorCode(),
                            ErrorCode.VALID_FAILED.getMessage()));
            //
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(e.getMessage());
        }
    }

    // Valid 만족하지 않는 값이 들어오는 경우
    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(
            MethodArgumentNotValidException e,
            HttpHeaders headers,
            HttpStatus status,
            WebRequest request
    ) {
        String errors = "";
        for (FieldError error : e.getBindingResult().getFieldErrors()) {
            errors+=(error.getField() + ": " + error.getDefaultMessage()+"\n");
        }
        for (ObjectError error : e.getBindingResult().getGlobalErrors()) {
            errors+=(error.getObjectName() + ": " + error.getDefaultMessage()+"\n");
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(new ExceptionModel(400,ErrorCode.VALID_FAILED.getErrorCode(),errors));
    }

    //Todo 오정환 화이팅!!!!!!!!!!!!!!!!!
    @ExceptionHandler(BadRequestException.class)
    public ResponseEntity<ExceptionModel> badRequestExceptionHandler(BadRequestException e){
        logger.error("AuthenticationException :", e);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(ExceptionModel.of(e));
    }

    @ExceptionHandler(UnauthorizedException.class)
    public ResponseEntity<ExceptionModel> authenticationExceptionHandler(UnauthorizedException e){
        logger.error("AuthenticationException :", e);
        return ResponseEntity.status(HttpStatus.FORBIDDEN)
                .body(ExceptionModel.of(e));
    }

    @ExceptionHandler(ForbiddenException.class)
    public ResponseEntity<ExceptionModel> authorizationExceptionHandler(ForbiddenException e){
        logger.error("ForbiddenException :", e);
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(ExceptionModel.of(e));
    }


    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<ExceptionModel> notFoundException(NotFoundException e) {
        logger.error("NotFoundException :",e);
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(ExceptionModel.of(e));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity UnhandleExceptionHandler(Exception e){
        logger.error("UnhandleException :", e);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(e);
    }
}