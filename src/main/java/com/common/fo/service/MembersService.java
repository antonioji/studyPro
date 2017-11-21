package com.common.fo.service;

/**
 * MembersService.java
 * 회원 서비스
 *
 * @Project Lotte EC Platform Service
 * @Company leps.com
 * @since 2017-10-30
 * @author junil
 */
public interface MembersService {



//	/**
//	 * EC 회원 정보를 조회 한다.
//	 *
//	 * @Project Lotte EC Platform Service
//	 * @Company leps.com
//	 * @since 2017-10-27
//	 * @author kansin88.ext@lotte.net
//	 */
//	public Members getMembersInfo(String mbrLoginId) throws UsernameNotFoundException;
//
//
//	/**
//	 * 이름 ,이메일  , 휴대폰 번호로 중복 체크
//	 *
//	 * @param MbEcCust
//	 * @return
//	 * @throws Exception
//	 * @return DuplResult
//	 * @since 2017-10-30
//	 * @author junil
//	 */
//	public MbEcCust checkDuplMambers(MbEcCust MbEcCust) throws MembersException;
//
//
//	/**
//	 * 이메일 점유인증 발송
//	 *
//	 * @param MbEcCust
//	 * @return
//	 * @throws MembersException
//	 * @return DuplResult
//	 * @since 2017-10-30
//	 * @author junil
//	 */
//	public MbMbrOcpnAthnt sendEmailCertification(MbMbrOcpnAthnt mbMbrOcpnAthnt) throws MembersException;
//
//	
//	
//	/**
//	 * getMbMbrOcpnAthntByOcpnAthntSnByFindPwd
//	 * 
//	 * @param ocpnAthntSn
//	 * @param athntMediaTgtVal
//	 * @return
//	 * @throws MembersException
//	 * @return MbMbrOcpnAthnt
//	 * @since 2017-11-15
//	 * @author junil
//	 */
//	public MbMbrOcpnAthnt getMbMbrOcpnAthntByOcpnAthntSnByFindPwd(String ocpnAthntSn , String athntMediaTgtVal) throws MembersException;
//	
//	/**
//	 * reSendEmailCertification
//	 * 이메일 점유인증 재발송
//	 * @param mbMbrOcpnAthnt
//	 * @return
//	 * @throws MembersException
//	 * @return MbMbrOcpnAthnt
//	 * @since 2017-11-10
//	 * @author junil
//	 */
//	public MbMbrOcpnAthnt reSendEmailCertification(MbMbrOcpnAthnt mbMbrOcpnAthnt) throws MembersException ;
//		
//	/**
//	 * 이메일에서 인증키로 인증관련 정보 호출
//	 *
//	 * @param ocpnAthntSn
//	 * @param athntMediaTgtVal
//	 * @return
//	 * @throws MembersException
//	 * @return MbMbrOcpnAthnt
//	 * @since 2017-10-31
//	 * @author junil
//	 */
//	public MbMbrOcpnAthnt getMbMbrOcpnAthntByOcpnAthntSn(String ocpnAthntSn , String athntMediaTgtVal) throws MembersException;
//
//
//	/**
//	 * 회원 등록
//	 *
//	 * @param MbMbrOcpnAthnt
//	 * @return
//	 * @throws MembersException
//	 * @return MbEcCust
//	 * @since 2017-11-01
//	 * @author junil
//	 */
//	public MbEcCust registMemberInfo(MbMbrOcpnAthnt mbMbrOcpnAthnt) throws MembersException;
//
//	/**
//	 * 인증 상태 업데이트
//	 *
//	 * @param athntStatCd
//	 * @return
//	 * @throws MembersException
//	 * @return MbMbrOcpnAthnt
//	 * @since 2017-11-01
//	 * @author junil
//	 */
//	public MbMbrOcpnAthnt updateMbMbrOcpnAthnt(String athntStatCd) throws MembersException;
//	
//	
//	/**
//	 * 회원 가입후 세션의 정보를 controller에 전달
//	 * 
//	 * @return
//	 * @throws MembersException
//	 * @return MbMbrOcpnAthnt
//	 * @since 2017-11-13
//	 * @author junil
//	 */
//	public MbMbrOcpnAthnt getSessionInfo() throws MembersException;
//	
//	
//	/**
//	 * sendCertificationBySMS
//	 * SMS 인증 발송
//	 * 
//	 * @param mbMbrOcpnAthnt
//	 * @return
//	 * @throws MembersException
//	 * @return MbMbrOcpnAthnt
//	 * @since 2017-11-13
//	 * @author junil
//	 */
//	public MbMbrOcpnAthnt sendCertificationBySMS(MbMbrOcpnAthnt mbMbrOcpnAthnt) throws MembersException ;
//	
//	
//	
//	/**
//	 * checkCertificationBySms
//	 * SMS 인증 체크
//	 * 
//	 * @param mbMbrOcpnAthnt
//	 * @return
//	 * @throws MembersException
//	 * @return MbMbrOcpnAthnt
//	 * @since 2017-11-13
//	 * @author junil
//	 */
//	public MbMbrOcpnAthnt checkCertificationBySms(MbMbrOcpnAthnt mbMbrOcpnAthnt) throws MembersException ;
//	
//	
//	
//	/**
//	 * getSessionInfoAndFindId
//	 * 
//	 * @return
//	 * @throws MembersException
//	 * @return List<MbEcCust>
//	 * @since 2017-11-14
//	 * @author junil
//	 */
//	public List<MbEcCust> getSessionInfoAndFindId() throws MembersException;
//	
//	
//	/**
//	 * selectMemberInfo
//	 * 
//	 * @param mbEcCust
//	 * @return
//	 * @throws MembersException
//	 * @return MbEcCust
//	 * @since 2017-11-14
//	 * @author junil
//	 */
//	public MbMbrOcpnAthnt selectMemberInfo(MbEcCust mbEcCust) throws MembersException;
//	
//	
//	/**
//	 * changePwdByCustEmailAddr
//	 * 
//	 * @param mbEcCust
//	 * @return
//	 * @throws MembersException
//	 * @return MbEcCust
//	 * @since 2017-11-15
//	 * @author junil
//	 */
//	public MbEcCust changePwdByCustEmailAddr(MbEcCust mbEcCust) throws MembersException;
}
