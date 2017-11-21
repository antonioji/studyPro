package com.common.model.member;

import java.io.Serializable;
import java.sql.Timestamp;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

@Data
public class MbMbrLoginHst implements Serializable {

	private static final long serialVersionUID = -3217200559285531909L;
	private String ecCustNo;
	private Timestamp loginDttm;
	private String mbrLoginId;
	private String siteNo;
	private String chnlNo;
	private String loginIpAddr;
	private String loginRouteDvsCd;
	private String loginScsYn;
	
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern="yyyy-MM-dd HH:mm:ss" ,timezone="Asia/Seoul")
	private Timestamp rgstDttm;
	private String rgstrId;
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern="yyyy-MM-dd HH:mm:ss" ,timezone="Asia/Seoul")
	private Timestamp modiDttm;
	private String modrId;
}