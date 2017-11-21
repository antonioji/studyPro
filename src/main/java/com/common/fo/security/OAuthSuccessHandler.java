package com.common.fo.security;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;


public class OAuthSuccessHandler implements AuthenticationSuccessHandler {

	private Logger log = LoggerFactory.getLogger(getClass());

	private String type;
	private UserDetailsService userDetailsService;

	public OAuthSuccessHandler(String type, UserDetailsService userDetailsService) {
		this.type = type;
		this.userDetailsService = userDetailsService;
	}

	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
			Authentication authentication) throws IOException, ServletException {
		// TODO 인증 정보 세션에 저장 처리
		log.debug("==========================[/login/socialconnected]====================================");
	}

}
