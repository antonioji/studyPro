package com.common.fo.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;


/**
 * MembersServiceImpl.java
 * 회원 서비스
 *
 * @Project Lotte EC Platform Service
 * @Company leps.com
 * @since 2017-10-30
 * @author junil
 */
@Service
public class MembersServiceImpl implements MembersService{
	private final Logger log = LoggerFactory.getLogger(getClass());

//	@Autowired
//	private ServiceConfig config;
//
//	@Autowired
//	private ConvertUtil convertUtil;
//
//	@Autowired
//	private RedisManager<MbMbrOcpnAthnt> redisManager;
//
//	@Autowired
//	private PasswordEncoder passwordEncoder;
//
//	/**
//	 * getHeaderWithApikey
//	 * Api 호출시 header api key 셋팅 후 리턴 header
//	 *
//	 * @return
//	 * @return HttpHeaders
//	 * @since 2017-10-30
//	 * @author junil
//	 */
//	private HttpHeaders getHeaderWithApikey() {
//		HttpHeaders headers = ApiClientUtil.getHeaders();
//		headers.set(config.getApiMembersKey(), config.getApiMembersKeyVal());
//		return headers;
//	}
//	/**
//	 * getRestTemplate
//	 * service에서 API 서버 호출시 사용
//	 *
//	 * @return
//	 * @return RestTemplate
//	 * @since 2017-10-30
//	 * @author junil
//	 */
//	private RestTemplate getRestTemplate() {
//		RestTemplate restTemplate = new RestTemplate();
//		restTemplate.setErrorHandler(new DefaultResponseErrorHandler() {
//			@Override
//			public void handleError(ClientHttpResponse response) throws IOException {
//				 log.error("handleError code :" + response.getStatusText());
//			}
//		});
//
//		return restTemplate;
//	}
//
//
//	@Override
//	public Members getMembersInfo(String mbrLoginId) throws UsernameNotFoundException {
//		StringBuilder url = new StringBuilder();
//		url.append(config.getApiServer() + ApiClientUtil.MEMBERS_API );
//		url.append("?mbrLoginId={mbrLoginId}");
//
//		Map<String, Object> params = new HashMap<String, Object>();
//		params.put("mbrLoginId", mbrLoginId);
//
//		HttpEntity<String> httpEntity = new HttpEntity<String>(getHeaderWithApikey());
//		ResponseEntity<Members[]> responseEntity = getRestTemplate().exchange(url.toString(), HttpMethod.GET, httpEntity, Members[].class, params);
//		List<Members> Members = Arrays.asList(responseEntity.getBody());
//
//		if(Members == null || responseEntity.getBody().length == 0) {
//			throw new UsernameNotFoundException("아이디 또는 사용자 정보가 잘못 되었습니다.");
//		}
//
//
//		return Members.get(0);
//	}
//
//
//	/* (non-Javadoc)
//	 * @see com.lotte.members.fo.service.MembersService#checkDuplMambers(com.lotte.members.fo.model.MbEcCust)
//	 */
//	@Override
//	public MbEcCust checkDuplMambers(MbEcCust MbEcCust) throws MembersException{
//
//		if(StringUtils.hasText(MbEcCust.getCustEmailAddr()) == false){
//			throw new MembersException("이메일을 입력해주세요.");
//		}
//		StringBuilder url = new StringBuilder();
//		Map<String, Object> param = convertUtil.ObjectToMap(MbEcCust);
//		url.append(config.getApiServer() + ApiClientUtil.MEMBERS_API + "/checkDuplMambers?custEmailAddr={custEmailAddr}" );
//		HttpEntity<String> httpEntity = new HttpEntity<String>(getHeaderWithApikey());
//		ResponseEntity<MbEcCust> responseEntity = getRestTemplate().exchange(url.toString(), HttpMethod.GET, httpEntity, MbEcCust.class, param);
//		return responseEntity.getBody();
//	}
//
//	/* (non-Javadoc)
//	 * @see com.lotte.members.fo.service.MembersService#sendEmailCertification(com.lotte.members.fo.model.MbEcCust)
//	 */
//	@Override
//	public MbMbrOcpnAthnt sendEmailCertification(MbMbrOcpnAthnt mbMbrOcpnAthnt) throws MembersException {
//		if(mbMbrOcpnAthnt.getCustEmailAddr().isEmpty()){
//			throw new MembersException("이메일을 입력해주세요.");
//		}
//		mbMbrOcpnAthnt.setAthntMediaTypeCd(MembersConst.ATHNT_MEDIA_TYPE_CD_EMAIL);//인증매체유형코드 #EMAIL
//		mbMbrOcpnAthnt.setUseYn(MembersConst.USE_YN_Y);//사용 Y
//		mbMbrOcpnAthnt.setAthntPurpsDvsCd(MembersConst.ATHNT_PURPS_DVS_CD_MBR_ADMS);//인증용도 구분 코드 #회원가입
//		mbMbrOcpnAthnt.setAthntStatCd(MembersConst.ATHNT_STAT_CD_ATHNT_WT);//ATHNT_WT 인증대기
//		mbMbrOcpnAthnt.setMbrLoginPwd(passwordEncoder.encode(mbMbrOcpnAthnt.getMbrLoginPwd()));//비밀번호 암호화
//		StringBuilder url = new StringBuilder();
//		url.append(config.getApiServer() + ApiClientUtil.CERTIFICATION_API );
//		HttpEntity<MbMbrOcpnAthnt> httpEntity = ApiClientUtil.getEntityBodyParam(mbMbrOcpnAthnt, getHeaderWithApikey());
//		ResponseEntity<ResultObject> responseEntity = getRestTemplate().exchange(url.toString(), HttpMethod.POST, httpEntity, ResultObject.class);
//		if(responseEntity.getBody().getStatusCode() != HttpStatus.OK) {
//			throw new MembersException(responseEntity.getBody().getDevMessage());
//		}
//		MbMbrOcpnAthnt response =  responseEntity.getBody().getData(MbMbrOcpnAthnt.class);
//		return setAuthCertification(response);//이메일 발송후 정송 결과 페이지로 넘길시 session에 정보 추가
//	}
//
//	/* (non-Javadoc)
//	 * @see com.lotte.members.fo.service.MembersService#reSendEmailCertification(com.lotte.members.fo.model.MbEcCust)
//	 */
//	@Override
//	public MbMbrOcpnAthnt reSendEmailCertification(MbMbrOcpnAthnt mbMbrOcpnAthnt) throws MembersException {
//		if(mbMbrOcpnAthnt.getOcpnAthntSn() == 0){
//			throw new MembersException("점유인증번호가 없습니다.");
//		}
//
//		StringBuilder url = new StringBuilder();
//		url.append(config.getApiServer() + ApiClientUtil.CERTIFICATION_API +"/resend" );
//		HttpEntity<MbMbrOcpnAthnt> httpEntity = ApiClientUtil.getEntityBodyParam(mbMbrOcpnAthnt, getHeaderWithApikey());
//		ResponseEntity<ResultObject> responseEntity = getRestTemplate().exchange(url.toString(), HttpMethod.POST, httpEntity, ResultObject.class);
//		if(responseEntity.getBody().getStatusCode() != HttpStatus.OK) {
//			throw new MembersException(responseEntity.getBody().getDevMessage());
//		}
//		MbMbrOcpnAthnt response =  responseEntity.getBody().getData(MbMbrOcpnAthnt.class);
//		return setAuthCertification(response);//이메일 발송후 정송 결과 페이지로 넘길시 session에 정보 추가
//	}
//
//
//
//	/* (non-Javadoc)
//	 * @see com.lotte.members.fo.service.MembersService#getMbMbrOcpnAthntByOcpnAthntSn(java.lang.String, java.lang.String)
//	 */
//	@Override
//	public MbMbrOcpnAthnt getMbMbrOcpnAthntByOcpnAthntSn(String ocpnAthntSn , String athntMediaTgtVal) throws MembersException{
//		Map<String, Object> param = new HashMap<String, Object>();
//		param.put("ocpnAthntSn", ocpnAthntSn);
//		param.put("athntMediaTgtVal", athntMediaTgtVal);
//		param.put("athntPurpsDvsCd" , MembersConst.ATHNT_PURPS_DVS_CD_MBR_ADMS);
//		StringBuilder url = new StringBuilder();
//		url.append(config.getApiServer() + ApiClientUtil.CERTIFICATION_API +"?ocpnAthntSn={ocpnAthntSn}&athntMediaTgtVal={athntMediaTgtVal}&athntPurpsDvsCd={athntPurpsDvsCd}");
//		HttpEntity<String> httpEntity = new HttpEntity<String>(getHeaderWithApikey());
//		ResponseEntity<MbMbrOcpnAthnt> responseEntity = getRestTemplate().exchange(url.toString(), HttpMethod.GET, httpEntity, MbMbrOcpnAthnt.class, param);
//		return setAuthCertification(responseEntity.getBody());
//	}
//	
//	/* (non-Javadoc)
//	 * @see com.lotte.members.fo.service.MembersService#getMbMbrOcpnAthntByOcpnAthntSnByFindPwd(java.lang.String, java.lang.String)
//	 */
//	@Override
//	public MbMbrOcpnAthnt getMbMbrOcpnAthntByOcpnAthntSnByFindPwd(String ocpnAthntSn , String athntMediaTgtVal) throws MembersException{
//		Map<String, Object> param = new HashMap<String, Object>();
//		param.put("ocpnAthntSn", ocpnAthntSn);
//		param.put("athntMediaTgtVal", athntMediaTgtVal);
//		param.put("athntPurpsDvsCd" , MembersConst.ATHNT_PURPS_DVS_CD_PWD_FIND);
//		StringBuilder url = new StringBuilder();
//		url.append(config.getApiServer() + ApiClientUtil.CERTIFICATION_API +"?ocpnAthntSn={ocpnAthntSn}&athntMediaTgtVal={athntMediaTgtVal}&athntPurpsDvsCd={athntPurpsDvsCd}");
//		HttpEntity<String> httpEntity = new HttpEntity<String>(getHeaderWithApikey());
//		ResponseEntity<MbMbrOcpnAthnt> responseEntity = getRestTemplate().exchange(url.toString(), HttpMethod.GET, httpEntity, MbMbrOcpnAthnt.class, param);
//		return setAuthCertification(responseEntity.getBody());
//	}
//
//	/**
//	 * setAuthCertification
//	 * 인증 시 점유인증 테이블의 정보를 redis 세션에 등록
//	 *
//	 * @param MbMbrOcpnAthnt
//	 * @return
//	 * @return MbMbrOcpnAthnt
//	 * @since 2017-11-01
//	 * @author junil
//	 */
//	private MbMbrOcpnAthnt setAuthCertification(MbMbrOcpnAthnt MbMbrOcpnAthnt){
//		redisManager.put(MembersUtils.getRedisKey(MembersConst.MEMBER_MEMBSERVICE_PREFIX), MbMbrOcpnAthnt, 1L, TimeUnit.HOURS);
//		return MbMbrOcpnAthnt;
//	}
//
//	/* (non-Javadoc)
//	 * @see com.lotte.members.fo.service.MembersService#updateMbMbrOcpnAthnt(java.lang.String)
//	 */
//	@Override
//	public MbMbrOcpnAthnt updateMbMbrOcpnAthnt(String athntStatCd) throws MembersException{
//		MbMbrOcpnAthnt MbMbrOcpnAthnt = redisManager.getValue(MembersUtils.getRedisKey(MembersConst.MEMBER_MEMBSERVICE_PREFIX));
//		MbMbrOcpnAthnt.setAthntStatCd(athntStatCd);
//
//		StringBuilder url = new StringBuilder();
//		url.append(config.getApiServer() + ApiClientUtil.CERTIFICATION_API );
//		HttpEntity<MbMbrOcpnAthnt> httpEntity = ApiClientUtil.getEntityBodyParam(MbMbrOcpnAthnt, getHeaderWithApikey());
//		ResponseEntity<ResultObject> responseEntity = getRestTemplate().exchange(url.toString(), HttpMethod.PUT, httpEntity, ResultObject.class);
//		if(responseEntity.getBody().getStatusCode() != HttpStatus.OK) {
//			throw new MembersException(responseEntity.getBody().getDevMessage());
//		}
//		MbMbrOcpnAthnt response =  responseEntity.getBody().getData(MbMbrOcpnAthnt.class);
//		return response;
//
//	}
//
//	/* (non-Javadoc)
//	 * @see com.lotte.members.fo.service.MembersService#registMemberOtherInfo(com.lotte.members.fo.model.MbEcCust)
//	 */
//	@Override
//	public MbEcCust registMemberInfo(MbMbrOcpnAthnt mbMbrOcpnAthnt) throws MembersException{
//		StringBuilder url = new StringBuilder();
//		url.append(config.getApiServer() + ApiClientUtil.MEMBERS_API );
//		HttpEntity<MbMbrOcpnAthnt> httpEntity = ApiClientUtil.getEntityBodyParam(mbMbrOcpnAthnt, getHeaderWithApikey());
//		ResponseEntity<ResultObject> responseEntity = getRestTemplate().exchange(url.toString(), HttpMethod.POST, httpEntity, ResultObject.class);
//		if(responseEntity.getBody().getStatusCode() != HttpStatus.OK) {
//			throw new MembersException(responseEntity.getBody().getDevMessage());
//		}
//		MbEcCust response =  responseEntity.getBody().getData(MbEcCust.class);
//		return response;
//	}
//
//	/* (non-Javadoc)
//	 * @see com.lotte.members.fo.service.MembersService#getSessionInfo()
//	 */
//	@Override
//	public MbMbrOcpnAthnt getSessionInfo() throws MembersException{
//		MbMbrOcpnAthnt mbMbrOcpnAthnt = redisManager.getValue(MembersUtils.getRedisKey(MembersConst.MEMBER_MEMBSERVICE_PREFIX));
//		String custNm = mbMbrOcpnAthnt.getCustNm(); 
//		int custNmLen = custNm.length();
//		String maskCustNm = custNm.substring(0 , 1);
//		for(int i = 1  ; i < custNmLen ; i++){
//			maskCustNm += "*";
//		}
//		mbMbrOcpnAthnt.setMaskCustNm(maskCustNm);
//		return mbMbrOcpnAthnt;
//	}
//
//	/* (non-Javadoc)
//	 * @see com.lotte.members.fo.service.MembersService#reSendEmailCertification(com.lotte.members.fo.model.MbMbrOcpnAthnt)
//	 */
//	@Override
//	public MbMbrOcpnAthnt sendCertificationBySMS(MbMbrOcpnAthnt mbMbrOcpnAthnt) throws MembersException {
//		mbMbrOcpnAthnt.setUseYn(MembersConst.USE_YN_Y);//사용 Y
//		mbMbrOcpnAthnt.setAthntStatCd(MembersConst.ATHNT_STAT_CD_ATHNT_WT);//ATHNT_WT 인증대기
//		StringBuilder url = new StringBuilder();
//		url.append(config.getApiServer() + ApiClientUtil.CERTIFICATION_API );
//		HttpEntity<MbMbrOcpnAthnt> httpEntity = ApiClientUtil.getEntityBodyParam(mbMbrOcpnAthnt, getHeaderWithApikey());
//		ResponseEntity<ResultObject> responseEntity = getRestTemplate().exchange(url.toString(), HttpMethod.POST, httpEntity, ResultObject.class);
//		if(responseEntity.getBody().getStatusCode() != HttpStatus.OK) {
//			throw new MembersException(responseEntity.getBody().getDevMessage());
//		}
//		MbMbrOcpnAthnt response = responseEntity.getBody().getData(MbMbrOcpnAthnt.class);
//		return response;
//	}
//	
//	/* (non-Javadoc)
//	 * @see com.lotte.members.fo.service.MembersService#checkCertificationBySms(com.lotte.members.fo.model.MbMbrOcpnAthnt)
//	 */
//	@Override
//	public MbMbrOcpnAthnt checkCertificationBySms(MbMbrOcpnAthnt mbMbrOcpnAthnt) throws MembersException {
//		StringBuilder url = new StringBuilder();
//		url.append(config.getApiServer() + ApiClientUtil.CERTIFICATION_API );
//		HttpEntity<MbMbrOcpnAthnt> httpEntity = ApiClientUtil.getEntityBodyParam(mbMbrOcpnAthnt, getHeaderWithApikey());
//		ResponseEntity<ResultObject> responseEntity = getRestTemplate().exchange(url.toString(), HttpMethod.PUT, httpEntity, ResultObject.class);
//		if(responseEntity.getBody().getStatusCode() != HttpStatus.OK) {
//			throw new MembersException(responseEntity.getBody().getDevMessage());
//		}
//		MbMbrOcpnAthnt response =  responseEntity.getBody().getData(MbMbrOcpnAthnt.class);
//		return setAuthCertification(response);
//	}
//	
//	/* (non-Javadoc)
//	 * @see com.lotte.members.fo.service.MembersService#getSessionInfoAndFindId()
//	 */
//	@Override
//	public List<MbEcCust> getSessionInfoAndFindId() throws MembersException{
//		MbMbrOcpnAthnt mbMbrOcpnAthnt = redisManager.getValue(MembersUtils.getRedisKey(MembersConst.MEMBER_MEMBSERVICE_PREFIX));
//		StringBuilder url = new StringBuilder();
//		MbEcCust mbEcCust =new MbEcCust();
//		MembersUtils.copyObject(mbEcCust, mbMbrOcpnAthnt);
//		Map<String, Object> param = convertUtil.ObjectToMap(mbEcCust);
//		url.append(config.getApiServer() + ApiClientUtil.MEMBERS_API + "/selectMemberInfo?custNm={custNm}&mccNoCd={mccNoCd}&custCellTxNo={custCellTxNo}&custCellSprtlyNo={custCellSprtlyNo}" );
//		HttpEntity<String> httpEntity = new HttpEntity<String>(getHeaderWithApikey());
//		ResponseEntity<MbEcCust[]> responseEntity = getRestTemplate().exchange(url.toString(), HttpMethod.GET, httpEntity, MbEcCust[].class, param);
//		List<MbEcCust> membersList = Arrays.asList(responseEntity.getBody());
//		return maskingEmailAddr(membersList);//이메일 마스킹 처리
//	}
//	
//	/**
//	 * maskingEmailAddr
//	 * 이메일 정보 마스킹 처리
//	 * 
//	 * @param membersList
//	 * @return
//	 * @return List<MbEcCust>
//	 * @since 2017-11-14
//	 * @author junil
//	 */
//	private List<MbEcCust> maskingEmailAddr(List<MbEcCust> membersList){
//		if(!membersList.isEmpty()){
//			for(MbEcCust rowData : membersList){
//				String emailAddr = rowData.getCustEmailAddr();
//				String[] tempArr = emailAddr.split("@");
//				String emailId = tempArr[0];
//				int emailIdLen = emailId.length();
//				String maskEmailId = emailId.substring(0 , 3);
//				for(int i = 3  ; i < emailIdLen ; i++){
//					maskEmailId += "*";
//				}
//				rowData.setMaskEmailAddr(maskEmailId+"@"+tempArr[1]);
//			}
//		}
//		return membersList;
//	}
//	
//	
//	@Override
//	public MbMbrOcpnAthnt selectMemberInfo(MbEcCust mbEcCust) throws MembersException{
//		StringBuilder url = new StringBuilder();
//		MbMbrOcpnAthnt result = new MbMbrOcpnAthnt();
//		Map<String, Object> param = convertUtil.ObjectToMap(mbEcCust);
//		url.append(config.getApiServer() + ApiClientUtil.MEMBERS_API + "/selectMemberInfo?custEmailAddr={custEmailAddr}&custNm={custNm}&mccNoCd={mccNoCd}&custCellTxNo={custCellTxNo}&custCellSprtlyNo={custCellSprtlyNo}" );
//		HttpEntity<String> httpEntity = new HttpEntity<String>(getHeaderWithApikey());
//		ResponseEntity<MbEcCust[]> responseEntity = getRestTemplate().exchange(url.toString(), HttpMethod.GET, httpEntity, MbEcCust[].class, param);
//		List<MbEcCust> membersList = Arrays.asList(responseEntity.getBody());
//		MembersUtils.copyObject(result, mbEcCust);
//		if(membersList.isEmpty()){
//			result.setCertificationScsCd("B");
//		}else{
//			
//			MbMbrOcpnAthnt mbMbrOcpnAthnt =new MbMbrOcpnAthnt();
//			MembersUtils.copyObject(mbMbrOcpnAthnt, membersList.get(0));
//			result = sendFindPwdEmailCertification(mbMbrOcpnAthnt);
//		}
//		return result;
//	}
//	
//	/**
//	 * sendFindPwdEmailCertification
//	 * 비밀번호 찾기 이메일 발송
//	 * 
//	 * @param mbMbrOcpnAthnt
//	 * @return
//	 * @throws MembersException
//	 * @return MbMbrOcpnAthnt
//	 * @since 2017-11-14
//	 * @author junil
//	 */
//	private MbMbrOcpnAthnt sendFindPwdEmailCertification(MbMbrOcpnAthnt mbMbrOcpnAthnt) throws MembersException {
//		mbMbrOcpnAthnt.setAthntMediaTypeCd(MembersConst.ATHNT_MEDIA_TYPE_CD_EMAIL);//인증매체유형코드 #EMAIL
//		mbMbrOcpnAthnt.setUseYn(MembersConst.USE_YN_Y);//사용 Y
//		mbMbrOcpnAthnt.setAthntPurpsDvsCd(MembersConst.ATHNT_PURPS_DVS_CD_PWD_FIND);//인증용도 구분 코드 #비밀번호 찾기
//		mbMbrOcpnAthnt.setAthntStatCd(MembersConst.ATHNT_STAT_CD_ATHNT_WT);//ATHNT_WT 인증대기
//		StringBuilder url = new StringBuilder();
//		url.append(config.getApiServer() + ApiClientUtil.CERTIFICATION_API );
//		HttpEntity<MbMbrOcpnAthnt> httpEntity = ApiClientUtil.getEntityBodyParam(mbMbrOcpnAthnt, getHeaderWithApikey());
//		ResponseEntity<ResultObject> responseEntity = getRestTemplate().exchange(url.toString(), HttpMethod.POST, httpEntity, ResultObject.class);
//		if(responseEntity.getBody().getStatusCode() != HttpStatus.OK) {
//			throw new MembersException(responseEntity.getBody().getDevMessage());
//		}
//		MbMbrOcpnAthnt response =  responseEntity.getBody().getData(MbMbrOcpnAthnt.class);
//		return setAuthCertification(response);//이메일 발송후 정송 결과 페이지로 넘길시 session에 정보 추가
//	}
//
//	/* (non-Javadoc)
//	 * @see com.lotte.members.fo.service.MembersService#changePwdByCustEmailAddr(com.lotte.members.fo.model.MbEcCust)
//	 */
//	@Override
//	public MbEcCust changePwdByCustEmailAddr(MbEcCust mbEcCust) throws MembersException {
//		StringBuilder url = new StringBuilder();
//		mbEcCust.setMbrLoginId(mbEcCust.getCustEmailAddr());
//		mbEcCust.setMbrLoginPwd(passwordEncoder.encode(mbEcCust.getMbrLoginPwd()));//비밀번호 암호화
//		url.append(config.getApiServer() + ApiClientUtil.MEMBERS_API+"/password" );
//		HttpEntity<MbEcCust> httpEntity = ApiClientUtil.getEntityBodyParam(mbEcCust, getHeaderWithApikey());
//		ResponseEntity<ResultObject> responseEntity = getRestTemplate().exchange(url.toString(), HttpMethod.PUT, httpEntity, ResultObject.class);
//		if(responseEntity.getBody().getStatusCode() != HttpStatus.OK) {
//			throw new MembersException(responseEntity.getBody().getDevMessage());
//		}
//		MbEcCust response =  new MbEcCust();
//		response.setResult("Y");
//		
//		updateMbMbrOcpnAthnt(MembersConst.ATHNT_STAT_CD_ATHNT_SCS);//세션에 인증 번호로 성공으로 업데이트
//		redisManager.delete(MembersUtils.getRedisKey(MembersConst.MEMBER_MEMBSERVICE_PREFIX));//세션삭제
//		
//		return response;
//	}
//	

}
