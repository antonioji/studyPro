package com.common.model.member;

import java.io.Serializable;
import java.sql.Timestamp;
import java.util.List;

import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.NotEmpty;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

/**
 * MbMbrOcpnAthnt
 * 인증 VO
 *
 * @Project Lotte EC Platform Service
 * @Company leps.com
 * @since 2017-11-03
 * @author junil
 */
@Data
public class MbMbrOcpnAthnt implements Serializable {


	private static final long serialVersionUID = -4930931512218629242L;

	private long ocpnAthntSn;	//OCPN_ATHNT_SN#COMMENT점유인증일련번호
	@NotEmpty(message="고객명은 필수 입니다.")
	private String custNm;	//CUST_NM#고객명
	private String mccDvsCd;	//CUST_MCC_DVS_CD#고객이동통신사구분코드
	private String mccNoCd;	//CUST_MCC_NO_CD#고객이동통신사번호코드
	private String custCellTxNo;	//CUST_CELL_TX_NO#고객휴대폰국번호
	private String custCellSprtlyNo;	//CUST_CELL_SPRTLY_NO#고객휴대폰개별번호
	@NotEmpty(message="고객 이메일 주소는 필수 입니다.")
	private String custEmailAddr;	//CUST_EMAIL_ADDR#고객이메일주소
	private String mbrLoginId;	//MBR_LOGIN_ID#회원로그인아이디
	private String mbrLoginPwd;	//MBR_LOGIN_PWD#회원로그인비밀번호
	@NotEmpty(message="인증용도구분 코드는 필수 입니다.")
	private String athntPurpsDvsCd;	//ATHNT_PURPS_DVS_CD#인증용도구분코드
	@NotEmpty(message="인증매체유형 코드는 필수 입니다.")
	private String athntMediaTypeCd;	//ATHNT_MEDIA_TYPE_CD#인증매체유형코드
	@NotNull(message="인증요청 일시값은 필수 입니다.")
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern="yyyy-MM-dd HH:mm:ss" ,timezone="Asia/Seoul")	//ATHNT_RQST_DTTM#인증요청일시
	private Timestamp athntRqstDttm;
	@NotNull(message="인증말료 일시값은 필수 입니다.")
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern="yyyy-MM-dd HH:mm:ss" ,timezone="Asia/Seoul")
	private Timestamp athntTmntDttm;	//ATHNT_TMNT_DTTM#인증만료일시
	@NotEmpty(message="인증 매체 대상값은 필수 입니다.")
	private String athntMediaTgtVal;	//ATHNT_MEDIA_TGT_VAL#인증매체대상값
	@NotEmpty(message="인증 상태값은 필수 입니다.")
	private String athntStatCd;	//ATHNT_STAT_CD#인증상태코드
	@NotEmpty(message="사용 여부값은 필수 입니다.")
	private String useYn;	//USE_YN#사용여부
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern="yyyy-MM-dd HH:mm:ss" ,timezone="Asia/Seoul")
	private Timestamp rgstDttm;	//RGST_DTTM#등록일시
	private String rgstrId;	//RGSTR_ID#등록자아이디
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern="yyyy-MM-dd HH:mm:ss" ,timezone="Asia/Seoul")
	private Timestamp modiDttm;	//MODI_DTTM#수정일시
	private String modrId;	//MODR_ID#수정자아이디

	/*자체 회원 등록시 필요정보 */
	private String birth; //생년월일
	private String gender; //성별
	
	
	private String siteAgreeYn; //사이트이용약관동의
	private String piAgreeEstlYn; //개인정보 수집 이용에 대한 동의(필수)
	private String piAgreeYn; //개인정보 수집 이용에 대한 동의(선택)
	private String emailAgreeYn; //이메일 수신동의
	private String smsAgreeYn; //SMS 수신동의
	
	private String certificationScsCd;// 점유인증 화면 상태 코드 A : 인증 성공 , B :인증실패(최종인증번호가 아닌경우) ,C : 유효기간 경과 , D : 증복인증

	//휴대폰 인증인 경우 그날의 count
	private long dayCount;
	
	private String maskCustNm;
	
}
