/** 
* API 
*
* @Project Lotte EC Platform Service
* @Company leps.com
* @since 2017-10-31
* @author junil
*/
package com.common.fo.common;

/** 
 * TODO TempCodeListConst.java
 *
 * @Project Lotte EC Platform Service
 * @Company leps.com
 * @since 2017-10-31
 * @author junil
 */
public class TempCodeListConst {

	public static final String EC_CUST_DVS_CD = "[{'code':'M' , 'name':'회원'},{'code':'G' , 'name':'비회원'}]";
	
	public static final String ATHNT_PURPS_DVS_CD = "[{'code':'MBR_ADMS' , 'name':'회원가입'}"
												 + ",{'code':'ID_FIND' , 'name':'아이디찾기'}"									 
												 + ",{'code':'PWD_FIND' , 'name':'비밀번호찾기'}]";
	
	
	public static final String ATHNT_STAT_CD = "[{'code':'ATHNT_WT' , 'name':'인증대기'}"
			 + ",{'code':'ATHNT_SCS' , 'name':'인증성공'}"									 
			 + ",{'code':'ATHNT_FAILR' , 'name':'인증실패'}"
			 + ",{'code':'ATHNT_TU' , 'name':'인증시간초과'}]";
	
	
	public static final String CUST_AGREE_TYPE_CD = "[{'code':'SITE_AGREE' , 'name':'사이트이용약관동의'}"
			 + ",{'code':'LPOINT_AGREE' , 'name':'LPOINT이용약관동의'}"									 
			 + ",{'code':'SNS_AGREE' , 'name':'SNS계정연계동의'}"
			 + ",{'code':'PIC_AGREE' , 'name':'개인정보수집활용동의'}"
			 + ",{'code':'OTHR_OFFR_AGREE' , 'name':'제3자제공동의'}"
			 + ",{'code':'SMS_AGREE' , 'name':'SMS수신동의'}"
			 + ",{'code':'INSR_AGREE' , 'name':'보험정보수신동의'}"
			 + ",{'code':'PI_CNSG_AGREE' , 'name':'개인정보위탁동의'}]";
			 
	public static final String CUST_MCC_DVS_CD = "[{'code':'SKT' , 'name':'SKT'}"
			 + ",{'code':'KT' , 'name':'KT'}"									 
			 + ",{'code':'LG' , 'name':'LG'}]";
	
	public static final String CUST_MEMBER_GRADE_CD = "[{'code':'A' , 'name':'플래티넘+'}"
            + ",{'code':'P' , 'name':'플래티넘'}"                                                                       
            + ",{'code':'G' , 'name':'골드'}"
            + ",{'code':'S' , 'name':'실버'}"
            + ",{'code':'F' , 'name':'프렌즈'}"
            + ",{'code':'W' , 'name':'웹컴'}]";

	public static final String CUST_MEMBER_TYPE_CD = "[{'code':'SELF' , 'name':'자체회원'}"
            + ",{'code':'LPOINT_AGREE' , 'name':'LPOINT'}"                                                                  
            + ",{'code':'STAFF' , 'name':'임직원'}]";

	
}
