package com.common.fo.controller;

import org.springframework.web.bind.annotation.RestController;

/**
 * RestMembersController
 * 화면에서 Ajax 통신을 해야하는경우 사용하는 controller
 * 화면이동이 아닌 data의 연동 관련 호출시 사용
 *
 * @Project Lotte EC Platform Service
 * @Company leps.com
 * @since 2017-10-30
 * @author junil
 */
@RestController
public class RestMembersController {

//	@Autowired
//	private MembersService membersService;
//
//
//	@MembersInfo
//	@RequestMapping("/test")
//	public ResponseEntity<MbEcCust> test(MbEcCust mbEcCust) throws MembersException{
//		return new ResponseEntity<>(mbEcCust, HttpStatus.OK);
//	}
//
//	/**
//	 * 중복체크
//	 *
//	 * @param mbEcCust
//	 * @return
//	 * @throws MembersException
//	 * @return ResponseEntity<DuplResult>
//	 * @since 2017-10-30
//	 * @author junil
//	 */
//	@RequestMapping("/regist/checkDupl")
//	public ResponseEntity<MbEcCust> checkDupl(MbEcCust mbEcCust) throws MembersException{
//		MbEcCust duplResult = membersService.checkDuplMambers(mbEcCust);
//		return new ResponseEntity<>(duplResult, HttpStatus.OK);
//	}
//	
//	/**
//	 * 중복체크
//	 *
//	 * @param findPwdByEmailAddr
//	 * @return
//	 * @throws MembersException
//	 * @return ResponseEntity<DuplResult>
//	 * @since 2017-10-30
//	 * @author junil
//	 */
//	@RequestMapping(value="/login/findPwdByEmailAddr" , method=RequestMethod.POST)
//	public ResponseEntity<MbMbrOcpnAthnt> findPwdByEmailAddr(@RequestBody MbEcCust mbEcCust) throws MembersException{
//		MbMbrOcpnAthnt mbMbrOcpnAthnt = membersService.selectMemberInfo(mbEcCust);
//		return new ResponseEntity<>(mbMbrOcpnAthnt, HttpStatus.OK);
//	}
//
//	
//	
//
//	/**
//	 * 이메일 인증 발송
//	 *
//	 * @param mbEcCust
//	 * @return
//	 * @throws MembersException
//	 * @return ResponseEntity<DuplResult>
//	 * @since 2017-10-30
//	 * @author junil
//	 */
//	@MembersInfo
//	@RequestMapping("/regist/sendEmailCertification")
//	public ResponseEntity<MbMbrOcpnAthnt> sendEmailCertification(MbMbrOcpnAthnt mbMbrOcpnAthnt) throws MembersException{
//		MbMbrOcpnAthnt result = membersService.sendEmailCertification(mbMbrOcpnAthnt);
//		return new ResponseEntity<>(result, HttpStatus.OK);
//	}
//	
//	/**
//	 * 이메일 인증 재발송
//	 *
//	 * @param mbEcCust
//	 * @return
//	 * @throws MembersException
//	 * @return ResponseEntity<DuplResult>
//	 * @since 2017-10-30
//	 * @author junil
//	 */
//	@MembersInfo
//	@RequestMapping(value="/regist/reSendEmailCertification" , method=RequestMethod.POST)
//	public ResponseEntity<MbMbrOcpnAthnt> reSendEmailCertification(@RequestBody MbMbrOcpnAthnt mbMbrOcpnAthnt) throws MembersException{
//		MbMbrOcpnAthnt result = membersService.reSendEmailCertification(mbMbrOcpnAthnt);
//		return new ResponseEntity<>(result, HttpStatus.OK);
//	}
//
//	/**
//	 * 회원 정보 등록
//	 *
//	 * @param memberOtherInfo
//	 * @return
//	 * @throws MembersException
//	 * @return ResponseEntity<mbEcCust>
//	 * @since 2017-11-01
//	 * @author junil
//	 */
//	@MembersInfo
//	@RequestMapping(value="/regist/registMemberInfo" , method=RequestMethod.POST)
//	public ResponseEntity<MbEcCust> registOtherInfo(@RequestBody MbMbrOcpnAthnt mbMbrOcpnAthnt) throws MembersException{
//		MbEcCust mbEcCustResult = membersService.registMemberInfo(mbMbrOcpnAthnt);
//		return new ResponseEntity<>(mbEcCustResult, HttpStatus.OK);
//	}
//	
//	
//	/**
//	 * SMS 인증 발송
//	 *
//	 * @param mbEcCust
//	 * @return
//	 * @throws MembersException
//	 * @return ResponseEntity<DuplResult>
//	 * @since 2017-10-30
//	 * @author junil
//	 */
//	@MembersInfo
//	@RequestMapping(value="/regist/sendCertificationBySms" , method=RequestMethod.POST)
//	public ResponseEntity<MbMbrOcpnAthnt> sendCertificationBySMS(@RequestBody MbMbrOcpnAthnt mbMbrOcpnAthnt) throws MembersException{
//		MbMbrOcpnAthnt result = membersService.sendCertificationBySMS(mbMbrOcpnAthnt);
//		return new ResponseEntity<>(result, HttpStatus.OK);
//	}
//	
//	
//	/**
//	 * SMS 인증 check
//	 *
//	 * @param mbEcCust
//	 * @return
//	 * @throws MembersException
//	 * @return ResponseEntity<DuplResult>
//	 * @since 2017-10-30
//	 * @author junil
//	 */
//	@MembersInfo
//	@RequestMapping(value="/regist/checkCertificationBySms" , method=RequestMethod.POST)
//	public ResponseEntity<MbMbrOcpnAthnt> checkCertificationBySms(@RequestBody MbMbrOcpnAthnt mbMbrOcpnAthnt) throws MembersException{
//		MbMbrOcpnAthnt result = membersService.checkCertificationBySms(mbMbrOcpnAthnt);
//		return new ResponseEntity<>(result, HttpStatus.OK);
//	}
//	
//	/**
//	 * 회원 비밀번호 수정
//	 *
//	 * @param changePwdByCustEmailAddr
//	 * @return
//	 * @throws MembersException
//	 * @return ResponseEntity<mbEcCust>
//	 * @since 2017-11-01
//	 * @author junil
//	 */
//	@MembersInfo
//	@RequestMapping(value="/login/changePwdByCustEmailAddr" , method=RequestMethod.POST)
//	public ResponseEntity<MbEcCust> changePwdByCustEmailAddr(@RequestBody MbEcCust mbEcCust) throws MembersException{
//		MbEcCust mbEcCustResult = membersService.changePwdByCustEmailAddr(mbEcCust);
//		return new ResponseEntity<>(mbEcCustResult, HttpStatus.OK);
//	}
//	
}
