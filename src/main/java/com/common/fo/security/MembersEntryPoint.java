package com.common.fo.security;

import java.io.IOException;


import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.InitializingBean;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.DefaultRedirectStrategy;
import org.springframework.security.web.RedirectStrategy;

public class MembersEntryPoint implements AuthenticationEntryPoint, InitializingBean {

	private RedirectStrategy redirectStrategy = new DefaultRedirectStrategy();

	private String loginUrl="/login/form";

	@Override
	public void commence(HttpServletRequest request, HttpServletResponse response,	AuthenticationException authException) throws IOException, ServletException {
		redirectStrategy.sendRedirect(request, response, loginUrl);
	}

	@Override
	public void afterPropertiesSet() throws Exception {


	}

}
