package com.common.model.member;

import java.io.Serializable;
import java.sql.Timestamp;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

/** 
 * MbEcCustAgree.java
 *
 * @Project Lotte EC Platform Service
 * @Company leps.com
 * @since 2017-10-31
 * @author junil
 */
@Data
public class MbEcCustAgree implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -1857214235343963733L;
	
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
