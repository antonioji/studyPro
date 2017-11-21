package com.common.model.member;

import java.io.Serializable;
import java.sql.Timestamp;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

/** 
 * MbEcCustTmp
 * 자체회원 등록시 점유인증 정보 저장하는 임시 테이블용 모델
 *
 * @Project Lotte EC Platform Service
 * @Company leps.com
 * @since 2017-11-09
 * @author junil
 */
@Data
public class MbEcCustTmp implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 2303496982657251435L;

	private long ocpnAthntSn;	//OCPN_ATHNT_SN#COMMENT점유인증일련번호 

	private String ecCustNo;//EC_CUST_NO#EC고객번호
	private String ecCustDvsCd;//EC_CUST_DVS_CD#EC고객구분코드
	private String custNm;//CUST_NM#고객명
	private String mccDvsCd;//CUST_MCC_DVS_CD#고객이동통신사구분코드
	private String mccNoCd;//CUST_MCC_NO_CD#고객이동통신사번호코드
	private String custCellTxNo;//CUST_CELL_TX_NO#고객휴대폰국번호
	private String custCellSprtlyNo;//CUST_CELL_SPRTLY_NO#고객휴대폰개별번호
	private String custEmailAddr;//CUST_EMAIL_ADDR#고객이메일주소
	private String mbrLoginId;//MBR_LOGIN_ID#회원로그인아이디
	private String mbrLoginPwd;//MBR_LOGIN_PWD#회원로그인비밀번호
	private String bfoEcCustNo;//BFO_EC_CUST_NO#이전EC고객번호
	private String mbrJoinDvsCd;//MBR_JOIN_DVS_CD#회원가입구분코드
	private String mbrStatCd;//MBR_STAT_CD#회원상태코드
	private String mbrGradeCd;//MBR_GRADE_CD#회원등급코드
	private String staffYn;//STAFF_YN#임직원여부
	private String frnrYn;//FRNR_YN#외국인여부
	private String natltCd;//NATLT_CD#국적코드

	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern="yyyy-MM-dd HH:mm:ss" ,timezone="Asia/Seoul")
	private Timestamp mbrJoinDttm;//MBR_JOIN_DTTM#회원가입일시

	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern="yyyy-MM-dd HH:mm:ss" ,timezone="Asia/Seoul")
	private String rgstDttm;//RGST_DTTM#등록일시
	private String rgstrId;//RGSTR_ID#등록자아이디

	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern="yyyy-MM-dd HH:mm:ss" ,timezone="Asia/Seoul")
	private Timestamp modiDttm;//MODI_DTTM#수정일시
	private String modrId;//MODR_ID#수정자아이디
	
	/**20171109  추가 필드*/
	private String cscoId		;//CSCO_ID#고객사ID
	private String siteNo		;//SITE_NO#사이트번호
	private String intrstCustYn		;//INTRST_CUST_YN#관심고객여부
	private String lpntUsePsbYn		;//LPNT_USE_PSB_YN#L포인트사용가능여부
	private String birthdt		;//BIRTHDT#생년월일
	private String cldsoYn		;//CLDSO_YN#양력여부
	private String sexCd		;//SEX_CD#성별코드
	private String staffNo		;//STAFF_NO#임직원번호
	private String lmbsCustNo		;//LMBS_CUST_NO#롯데멤버스고객번호
	private String mbrGradeDvsCd		;//MBR_GRADE_DVS_CD#회원등급구분코드
	private String ciNo		;//CI_NO#CI번호
	private String diNo		;//DI_NO#DI번호

	private String termsAgreeYn		;//TERMS_AGREE_YN#약관동의여부
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern="yyyy-MM-dd HH:mm:ss" ,timezone="Asia/Seoul")
	private Timestamp termsAgreeChngDttm ; //TERMS_AGREE_CHNG_DTTM #약관동의변경일시   
	
	private String picnuAgreeYn		;//PICNU_AGREE_YN#개인정보수집이용동의여부
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern="yyyy-MM-dd HH:mm:ss" ,timezone="Asia/Seoul")
	private Timestamp picnuAgreeChngDttm ; //PICNU_AGREE_CHNG_DTTM #개인정보수집이용동의변경일시
	
	
	
}
