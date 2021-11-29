package com.mongoosereum.dou_survey_zone.api.v1.exceptionHandler;

import com.mongoosereum.dou_survey_zone.api.v1.exception.AuthenticationException;
import com.mongoosereum.dou_survey_zone.api.v1.exception.AuthorizationException;
import com.mongoosereum.dou_survey_zone.api.v1.exception.BusinessException;
import com.mongoosereum.dou_survey_zone.api.v1.exceptionHandler.dto.ExceptionModel;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;
import java.util.Iterator;

@RestControllerAdvice
public class ExceptionHandlerController extends ResponseEntityExceptionHandler {

    @ExceptionHandler(ConstraintViolationException.class)
    @ResponseBody
    protected ResponseEntity constraintViolationExceptionHandler(ConstraintViolationException e) {
        logger.error("ConstraintViolationException :", e);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(getResultMessage(e.getConstraintViolations().iterator()));
    }

    @ExceptionHandler(AuthorizationException.class)
    public ResponseEntity<ExceptionModel> authorizationExceptionHandler(AuthorizationException e){
        logger.error("ErrorResponse :", e);
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(ExceptionModel.of(e));
    }

    @ExceptionHandler(AuthenticationException.class)
    public ResponseEntity<ExceptionModel> authenticationExceptionHandler(AuthenticationException e){
        logger.error("AuthenticationException :", e);
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(ExceptionModel.of(e));
    }

    @ExceptionHandler(BusinessException.class)
    public ResponseEntity<ExceptionModel> businessExceptionHandler(BusinessException e) {
        logger.error("BusinessException :",e);
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ExceptionModel.of(e));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity UnhandleExceptionHandler(Exception e){
        logger.error("UnhandleException : ", e);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e);
    }

    protected String getResultMessage(final Iterator<ConstraintViolation<?> > violationIterator){
        final StringBuilder resultMessageBuilder = new StringBuilder();
        while(violationIterator.hasNext()){
            final ConstraintViolation<?> constraintViolation = violationIterator.next();
            resultMessageBuilder
                    .append("['")
                    .append(getPopertyName(constraintViolation.getPropertyPath().toString()))
                    .append("' is '")
                    .append(constraintViolation.getInvalidValue())
                    .append("'. ")
                    .append(constraintViolation.getMessage())
                    .append("]");
            if(violationIterator.hasNext())
                resultMessageBuilder.append(", ");
        }
        return resultMessageBuilder.toString();
    }
    protected String getPopertyName(String propertyPath) {
        return propertyPath.substring(propertyPath.lastIndexOf('.') + 1); // 전체 속성 경로에서 속성 이름만 가져온다.
    }
}