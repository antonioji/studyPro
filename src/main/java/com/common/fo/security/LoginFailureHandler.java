package com.common.fo.security;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.LockedException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;

import com.common.fo.common.MembersConst;
import com.common.fo.service.LoginService;
import com.common.model.member.MbEcCust;
import com.common.model.member.MbMbrLoginHst;


public class LoginFailureHandler extends SimpleUrlAuthenticationFailureHandler {

	private Logger log = LoggerFactory.getLogger(getClass());

	@Autowired
	private LoginService loginService;

	@Override
	public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException)
			throws IOException, ServletException {

		log.debug("로그인에 실패 하였습니다. : {}", authException.getMessage());

		if(authException instanceof LockedException) {
			String defaultErrorUrl = "/login/locked";
			request.getRequestDispatcher(defaultErrorUrl).forward(request, response);
			return;
		}

		String defaultErrorUrl = "/login/error";
		String mbrLoginId = request.getParameter("mbrLoginId");
		String memLogin = request.getParameter("memLogin");
		request.setAttribute("mbrLoginId", mbrLoginId);
		request.setAttribute("memLogin",   memLogin);
		request.setAttribute("err_msg", authException.getMessage());
		this.mbMbrLoginFailr(request, response, authException);

		request.getRequestDispatcher(defaultErrorUrl).forward(request, response);
	}

	private void mbMbrLoginFailr(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) {

		if((authException instanceof UsernameNotFoundException) == true ) {
			return;
		}
		
		//TODO: 사이트 번호, 채널번호, 로그인 경로 구분 코드 정의 필요
		log.debug("##### 로그인 실패 이력 등록 #####");
		String mbrLoginId = request.getParameter("mbrLoginId");
		MbMbrLoginHst mbMbrLoginHst = new MbMbrLoginHst();
		mbMbrLoginHst.setMbrLoginId(mbrLoginId);
		mbMbrLoginHst.setSiteNo(MembersConst.MEMBER_SITE_NO);
		mbMbrLoginHst.setChnlNo(MembersConst.MEMBER_CHNL_NO);
		mbMbrLoginHst.setLoginIpAddr(request.getRemoteAddr());
		mbMbrLoginHst.setLoginRouteDvsCd(MembersConst.MEMBER_ROUTE_DVS_WEB);
		mbMbrLoginHst.setLoginScsYn(MembersConst.USE_YN_N);
		//loginService.insertMbMbrLoginHst(mbMbrLoginHst);

		MbEcCust mbEcCust = new MbEcCust();
		mbEcCust.setMbrLoginId(mbrLoginId);
		//loginService.insertMbMbrLoginFailr(mbEcCust);
	}
	
	
}