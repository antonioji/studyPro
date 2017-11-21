package com.common.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.common.model.ResultObject;


@ControllerAdvice
@ResponseBody
public class GlobalControllerExceptionHandler {


	@ExceptionHandler(CommonException.class)
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	public ResultObject handleUserNotFoundException(Exception e){
		return new ResultObject("N", HttpStatus.BAD_REQUEST, "", e.getMessage());
	}

	@ExceptionHandler(MethodArgumentNotValidException.class)
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	public ResultObject handleMethodArgumentNotValidException(MethodArgumentNotValidException e){
		return new ResultObject("N", HttpStatus.BAD_REQUEST, "", e.getBindingResult().getAllErrors().get(0).getDefaultMessage());
	}
}
