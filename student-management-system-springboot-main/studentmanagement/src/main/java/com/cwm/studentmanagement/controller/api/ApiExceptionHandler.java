package com.cwm.studentmanagement.controller.api;

import java.util.Map;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.security.core.AuthenticationException;

@RestControllerAdvice(basePackages = "com.cwm.studentmanagement.controller.api")
@Order(Ordered.HIGHEST_PRECEDENCE)
public class ApiExceptionHandler {
    @ExceptionHandler(AuthenticationException.class)
    public ResponseEntity<?> unauthorized(Exception ex) { return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "Invalid username or password.")); }
    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> error(Exception ex) { return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("message", ex.getMessage() == null ? "Request failed." : ex.getMessage())); }
}
