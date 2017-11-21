package com.common.fo.security.sso;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.common.fo.service.LoginService;


public class CustomerAuthenticationprovider extends DaoAuthenticationProvider {
	@Autowired
	private LoginService loginService;
	@Autowired
	private PasswordEncoder passwordEncoder;

	@Override
	protected void additionalAuthenticationChecks(UserDetails userDetails,
			UsernamePasswordAuthenticationToken authentication) throws AuthenticationException {

//		MbMbrLoginFailr mbMbrLoginFailr = loginService.selectMbMbrLoginFailr(userDetails.getUsername());

//		if(mbMbrLoginFailr != null && MembersConst.USE_YN_Y.equals(mbMbrLoginFailr.getPwdLockYn())) {
//			throw new LockedException("고객님의 정보를 위해 연속된 로그인 실패로 자동으로 계정아 차단되었습니다.");
//		}
//
//		if(passwordEncoder.matches(authentication.getCredentials().toString(), userDetails.getPassword()) == false) {
//			throw new BadCredentialsException("비밀 번호가 잘못되었습니다.");
//		}
	}
}
