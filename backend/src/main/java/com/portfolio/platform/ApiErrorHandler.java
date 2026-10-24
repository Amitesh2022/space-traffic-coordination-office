package com.portfolio.platform;

import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ApiErrorHandler {
  @ExceptionHandler(ItemNotFoundException.class) @ResponseStatus(HttpStatus.NOT_FOUND)
  Map<String, String> missing(ItemNotFoundException error) { return Map.of("error", error.getMessage()); }

  @ExceptionHandler(MethodArgumentNotValidException.class) @ResponseStatus(HttpStatus.BAD_REQUEST)
  Map<String, String> invalid(MethodArgumentNotValidException error) {
    var detail = error.getBindingResult().getFieldErrors().stream().findFirst().map(item -> item.getDefaultMessage()).orElse("Request is invalid");
    return Map.of("error", detail);
  }
}
