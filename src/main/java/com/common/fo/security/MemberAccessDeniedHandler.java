package com.common.fo.security;

import java.io.IOException;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.security.web.util.UrlUtils;

public class MemberAccessDeniedHandler implements AccessDeniedHandler {

	private Logger log = LoggerFactory.getLogger(getClass());

	@Override
	public void handle(HttpServletRequest request, HttpServletResponse response,
			AccessDeniedException accessDeniedException) throws IOException, ServletException {

		String url = UrlUtils.buildFullRequestUrl(request);
		String redirectUri = "/";

		Pattern pattern = Pattern.compile("(/login/)|(/regist/)");
		Matcher match = pattern.matcher(url);

		//TOTO: 접근 제한 url 분기 처리 필요
		if (match.find() == false) {
			//redirectUri = "/login/form";
		}

		log.debug("(accessDeniedException) : 접근 시도 URL >> {}", url);
		response.sendRedirect(request.getContextPath() + redirectUri);
	}

}
