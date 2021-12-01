package com.mongoosereum.dou_survey_zone.api.v1.exception;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import javax.servlet.ServletException;
import javax.validation.ConstraintViolation;
import java.util.Iterator;

@RestControllerAdvice
public class ExceptionHandlerController extends ResponseEntityExceptionHandler {

    // Request Body에 필요한 값이 전달되지않는 경우
    @Override
    protected ResponseEntity<Object> handleHttpMessageNotReadable(
            HttpMessageNotReadableException e,
            HttpHeaders headers,
            HttpStatus status,
            WebRequest request) {
        logger.info(ExceptionModel.of(e).getMessage() + request.toString());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ExceptionModel.of(e));
    }

    // Valid 만족하지 않는 값이 들어오는 경우
    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(
            MethodArgumentNotValidException e,
            HttpHeaders headers,
            HttpStatus status,
            WebRequest request
    ) {
        logger.info("Validation error list : "+ ExceptionModel.of(e).getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ExceptionModel.of(e));
    }

    @ExceptionHandler(BadRequestException.class)
    public ResponseEntity<ExceptionModel> badRequestExceptionHandler(BadRequestException e){
        logger.error("AuthenticationException :", e);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ExceptionModel.of(e));
    }

    @ExceptionHandler(UnauthorizedException.class)
    public ResponseEntity<ExceptionModel> authenticationExceptionHandler(UnauthorizedException e){
        logger.error("AuthenticationException :", e);
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(ExceptionModel.of(e));
    }

    @ExceptionHandler(ForbiddenException.class)
    public ResponseEntity<ExceptionModel> authorizationExceptionHandler(ForbiddenException e){
        logger.error("ForbiddenException :", e);
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(ExceptionModel.of(e));
    }


    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<ExceptionModel> businessExceptionHandler(NotFoundException e) {
        logger.error("BusinessException :",e);
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ExceptionModel.of(e));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity UnhandleExceptionHandler(Exception e){
        logger.error("UnhandleException :", e);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e);
    }

    @ExceptionHandler(ServletException.class)
    public ResponseEntity ServletExceptionHandler(Exception e){
        logger.error("ForbiddenException :", e);
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(e);
    }
}