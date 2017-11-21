package com.common.model.member;

import java.io.Serializable;
import java.sql.Timestamp;

import lombok.Data;

@Data
public class MbMbrLoginFailr implements Serializable {

	private static final long serialVersionUID = -5297661655585898202L;

	private String ecCustNo;
	private int pwdFailrNumtm;
	private String pwdLockYn;
	private Timestamp rgstDttm;
	private String rgstrId;
	private Timestamp modiDttm;
	private String modrId;
}
