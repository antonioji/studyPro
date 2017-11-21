package com.common.model.member;

import java.io.Serializable;
import java.sql.Timestamp;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

/** 
 * MbEcCustAgreeTmp
 * 자체회원 등록시 점유인증 정보 저장하는 임시 테이블용 모델
 *
 * @Project Lotte EC Platform Service
 * @Company leps.com
 * @since 2017-11-09
 * @author junil
 */
@Data
public class MbEcCustAgreeTmp implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 7278082681107910037L;


	private long ocpnAthntSn;	//OCPN_ATHNT_SN#COMMENT점유인증일련번호 

	
	private String ecCustNo        ;  // EC고객번호            
	private String custAgreeTypeCd ; // 고객동의유형코드  
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern="yyyy-MM-dd HH:mm:ss" ,timezone="Asia/Seoul")	
	private Timestamp aplyStrtDttm    ;  // 적용시작일시        
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern="yyyy-MM-dd HH:mm:ss" ,timezone="Asia/Seoul")	
	private Timestamp aplyEndDttm     ;  // 적용종료일시        
	private String estlAgreeYn; //ESTL_AGREE_YN #필수 여부
	private String custAgreeYn     ;  // 고객동의여부        
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern="yyyy-MM-dd HH:mm:ss" ,timezone="Asia/Seoul")	
	private Timestamp rgstDttm        ;   // 등록일시              
	private String rgstrId         ;   // 등록자아이디        
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern="yyyy-MM-dd HH:mm:ss" ,timezone="Asia/Seoul")	
	private Timestamp modiDttm        ;   // 수정일시              
	private String modrId          ;   // 수정자아이디   
}
