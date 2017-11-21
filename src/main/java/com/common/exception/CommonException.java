package com.common.exception;

public class CommonException extends RuntimeException{

	private static final long serialVersionUID = -2123225506115170246L;

	public CommonException() {
		super();
	}

	public CommonException(final String message, final Throwable cause) {
	    super(message, cause);
	}

	public CommonException(final String message) {
	    super(message);
	}

	public CommonException(final Throwable cause) {
	    super(cause);
	}

}
