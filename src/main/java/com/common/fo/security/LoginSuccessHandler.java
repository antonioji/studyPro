package com.common.fo.security;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.catalina.security.SecurityUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;

import com.common.fo.common.MembersConst;
import com.common.fo.security.user.AppUser;
import com.common.fo.service.LoginService;
import com.common.fo.service.MembersService;
import com.common.model.member.MbEcCust;
import com.common.model.member.MbMbrLoginHst;
import com.common.model.member.Members;

public class LoginSuccessHandler extends SavedRequestAwareAuthenticationSuccessHandler implements AuthenticationSuccessHandler {

	private Logger log = LoggerFactory.getLogger(getClass());

	@Autowired
	private LoginService loginService;

	@Autowired
	private MembersService membersService;

	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
			Authentication authentication) throws IOException, ServletException {
		// set our response to OK status
		response.setStatus(HttpServletResponse.SC_OK);

		this.insertMbMbrLoginHst(request, response);

		// user정보를 session에 세팅한다 [추가 정보 세팅]
		setSessionWithUser(request);
		response.sendRedirect(request.getContextPath() + "/");
	}

	private void setSessionWithUser(HttpServletRequest req) {
		HttpSession session = req.getSession();
		String sessionId = session.getId();

		String mbrLoginId = req.getParameter("mbrLoginId");
//		Members  members = membersService.getMembersInfo(mbrLoginId);

		AppUser appUser = new AppUser();
		appUser.setRole(MembersConst.MEMBER_ROLE);
		appUser.setId(mbrLoginId);

		appUser.setEcCustNo("aaaa");
		appUser.setMbrLoginId(mbrLoginId);
		appUser.setMemberName("test");
		appUser.setCscoId("");
		session.setAttribute("testsessionkey" + sessionId, appUser);
	}

	private void insertMbMbrLoginHst(HttpServletRequest request, HttpServletResponse response) {

		//TODO: 사이트 번호, 채널번호, 로그인 경로 구분 코드 정의 필요
		log.debug("##### 로그인 성공 이력 등록 #####");
		String mbrLoginId = request.getParameter("mbrLoginId");
		MbMbrLoginHst mbMbrLoginHst = new MbMbrLoginHst();
		mbMbrLoginHst.setMbrLoginId(mbrLoginId);
		mbMbrLoginHst.setSiteNo(MembersConst.MEMBER_SITE_NO);
		mbMbrLoginHst.setChnlNo(MembersConst.MEMBER_CHNL_NO);
		mbMbrLoginHst.setLoginIpAddr(request.getRemoteAddr());
		mbMbrLoginHst.setLoginRouteDvsCd(MembersConst.MEMBER_ROUTE_DVS_WEB);
		mbMbrLoginHst.setLoginScsYn(MembersConst.USE_YN_Y);
//		loginService.insertMbMbrLoginHst(mbMbrLoginHst);

		log.debug("##### 로그인 실패 이력 초기화 #####");
		MbEcCust MbEcCust = new MbEcCust();
		MbEcCust.setMbrLoginId(mbrLoginId);
//		loginService.initMbMbrLoginFailr(MbEcCust);
	}
}