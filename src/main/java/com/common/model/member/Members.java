package com.common.model.member;

import java.io.Serializable;
import java.sql.Timestamp;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

@Data
public class Members  implements Serializable {

	private static final long serialVersionUID = -7441218232729471616L;
	
	//검색조건
	private String searchInfoType;
	private String searchInfoInput;
	private String searchContactType;
	private String searchContactInput;
	private String chkJoinDate;
	private String joinStDate;
	private String joinEndDate;
	
	
	private String ecCustNo;
	private String ecCustDvsCd;
	private String custNm; 	
	private String mccDvsCd;
	private String mccNoCd;
	private String custCellTxNo;
	private String custCellSprtlyNo;
	private String custEmailAddr;
	private String mbrLoginId;
	private String mbrLoginPwd;
	private String bfoEcCustNo;
	private String mbrJoinDvsCd;
	private String mbrStatCd;
	private String mbrGradeCd;
	private String staffYn;
	private String frnrYn;
	private String natltCd;
	private String mbrJoinDttm;
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern="yyyy-MM-dd HH:mm:ss" ,timezone="Asia/Seoul")
	private Timestamp rgstDttm;
	private String rgstrId;
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern="yyyy-MM-dd HH:mm:ss" ,timezone="Asia/Seoul")
	private Timestamp modiDttm;
	private String modrId;
	private String mbrBasicCntadrSn;
	private String basicSetupYn;
	private String cntadrNm;
	private String custTelRgnNo;
	private String custTlofNo;
	private String custTelSprtlyNo;
	private String custExtNo;
	private String frnrCustCellNo;
	private String addrRefiYn;
	private String addrDvsCd;
	private String stnmZipNo;
	private String oldStnmZipNo;
	private String custStnmZipAddr;
	private String custStnmDtlAddr;
	private String custBldgNo;
	private String jbZipNo;
	private String oldJbZipNo;
	private String custJbZipAddr;
	private String custJbDtlAddr;
	private String custHandphone;
	private String custTel;

}
