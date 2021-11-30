package com.mongoosereum.dou_survey_zone.api.v1.exceptionHandler;

import com.mongoosereum.dou_survey_zone.api.v1.exception.AuthenticationException;
import com.mongoosereum.dou_survey_zone.api.v1.exception.AuthorizationException;
import com.mongoosereum.dou_survey_zone.api.v1.exception.NotFoundException;
import com.mongoosereum.dou_survey_zone.api.v1.exceptionHandler.dto.ExceptionModel;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

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

    @ExceptionHandler(AuthorizationException.class)
    public ResponseEntity<ExceptionModel> authorizationExceptionHandler(AuthorizationException e){
        logger.error("AuthorizationException :", e);
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(ExceptionModel.of(e));
    }

    @ExceptionHandler(AuthenticationException.class)
    public ResponseEntity<ExceptionModel> authenticationExceptionHandler(AuthenticationException e){
        logger.error("AuthenticationException :", e);
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(ExceptionModel.of(e));
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

//    protected String getResultMessage(final Iterator<ConstraintViolation<?> > violationIterator){
//        final StringBuilder resultMessageBuilder = new StringBuilder();
//        while(violationIterator.hasNext()){
//            final ConstraintViolation<?> constraintViolation = violationIterator.next();
//            resultMessageBuilder
//                    .append("['")
//                    .append(getPropertyName(constraintViolation.getPropertyPath().toString()))
//                    .append("' is '")
//                    .append(constraintViolation.getInvalidValue())
//                    .append("'. ")
//                    .append(constraintViolation.getMessage())
//                    .append("]");
//            if(violationIterator.hasNext())
//                resultMessageBuilder.append(", ");
//        }
//        return resultMessageBuilder.toString();
//    }
//    protected String getPropertyName(String propertyPath) {
//        return propertyPath.substring(propertyPath.lastIndexOf('.') + 1); // 전체 속성 경로에서 속성 이름만 가져온다.
//    }
}