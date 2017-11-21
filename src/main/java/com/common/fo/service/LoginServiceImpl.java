package com.common.fo.service;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


@Service
public class LoginServiceImpl implements LoginService {
	private final Logger log = LoggerFactory.getLogger(getClass());

	/* (non-Javadoc)
	 * @see org.springframework.security.core.userdetails.UserDetailsService#loadUserByUsername(java.lang.String)
	 */
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		// TODO Auto-generated method stub
		return null;
	}

//	@Autowired
//	private ServiceConfig config;
//
//	@Autowired
//	private MembersRestTemplate membersRestTemplate;
//
//	@Autowired
//	private MembersService membersService;
//
//	@Override
//	@MembersInfo
//	public void insertMbMbrLoginHst(MbMbrLoginHst MbMbrLoginHst) throws MembersException {
//		log.debug("로그인   성공 등록 API 호출");
//		StringBuilder url = new StringBuilder();
//		url.append(config.getApiServer() + ApiClientUtil.MEMBERSLOG_API + "/success" );
//
//		HttpEntity<MbMbrLoginHst> httpEntity = ApiClientUtil.getEntityBodyParam(MbMbrLoginHst, membersRestTemplate.getHeaderWithApikey());
//		membersRestTemplate.getRestTemplate().exchange(url.toString(), HttpMethod.POST, httpEntity, ResultObject.class);
//	}
//
//	@Override
//	@MembersInfo
//	public void insertMbMbrLoginFailr(MbEcCust MbEcCust) throws MembersException {
//		log.debug("로그인 실패 API 호출");
//		StringBuilder url = new StringBuilder();
//		url.append(config.getApiServer() + ApiClientUtil.MEMBERSLOG_API + "/fail" );
//
//		HttpEntity<MbEcCust> httpEntity = ApiClientUtil.getEntityBodyParam(MbEcCust, membersRestTemplate.getHeaderWithApikey());
//		membersRestTemplate.getRestTemplate().exchange(url.toString(), HttpMethod.POST, httpEntity, ResultObject.class);
//	}
//
//	@Override
//	@MembersInfo
//	public void initMbMbrLoginFailr(MbEcCust MbEcCust) throws MembersException {
//		// TODO: 로그인 초기화
//		log.debug("로그인 실패 초기화 API 호출");
//		StringBuilder url = new StringBuilder();
//		url.append(config.getApiServer() + ApiClientUtil.MEMBERSLOG_API + "/fail/init" );
//
//		HttpEntity<MbEcCust> httpEntity = ApiClientUtil.getEntityBodyParam(MbEcCust, membersRestTemplate.getHeaderWithApikey());
//		membersRestTemplate.getRestTemplate().exchange(url.toString(), HttpMethod.PUT, httpEntity, ResultObject.class);
//	}
//
//	@Override
//	public MbMbrLoginFailr selectMbMbrLoginFailr(String mbrLoginId)
//			throws MembersException {
//		log.debug("로그인 사용자 실패 로그 조회 API 호출");
//		StringBuilder url = new StringBuilder();
//		url.append(config.getApiServer() + ApiClientUtil.MEMBERSLOG_API);
//		url.append("/fail/{mbrLoginId}");
//
//		Map<String, Object> params = new HashMap<String, Object>();
//		params.put("mbrLoginId", mbrLoginId);
//
//		HttpEntity<String> httpEntity = new HttpEntity<String>(membersRestTemplate.getHeaderWithApikey());
//		ResponseEntity<MbMbrLoginFailr> responseEntity = membersRestTemplate.getRestTemplate().exchange(url.toString(), HttpMethod.GET, httpEntity, MbMbrLoginFailr.class, params);
//		return responseEntity.getBody();
//	}
//
//	@Override
//	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//
//		if(StringUtils.hasText(username) == false) {
//			throw new UsernameNotFoundException("아이디 또는 비밀번호가 틀렸습니다.");
//		}
//
//		Members members = membersService.getMembersInfo(username);
//		if(members == null || StringUtils.hasText(members.getMbrLoginId()) == false) {
//			throw new UsernameNotFoundException("아이디 또는 비밀번호가 틀렸습니다.");
//		}
//
//		GrantedAuthority authority = new SimpleGrantedAuthority(MembersConst.MEMBER_ROLE);
//		return new User(members.getMbrLoginId(), members.getMbrLoginPwd(), Arrays.asList(authority));
//	}
}
