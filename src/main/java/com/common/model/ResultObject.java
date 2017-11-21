package com.common.model;

import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;

import com.common.utils.ConvertUtil;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ResultObject {
	private String successYn;
	private HttpStatus statusCode;
	private Object data;
	private String devMessage;


	public ResultObject() {	}

	public ResultObject(String successYn) {
		this.successYn = successYn;
		this.statusCode = null;
		this.data = null;
		this.devMessage = null;
	}

	public ResultObject(String successYn, Object data) {
		this.successYn = successYn;
		this.statusCode = null;
		this.data = data;
		this.devMessage = null;
	}

	@SuppressWarnings("unchecked")
	public <T> T getData( Class<T> cls) {
		ConvertUtil convertUtil = new ConvertUtil();
		return convertUtil.mapToObject((Map<String, Object>) this.data, cls);
	}

	@SuppressWarnings("unchecked")
	public <T> List<T> getListData(Class<T> cls) {
		ConvertUtil convertUtil = new ConvertUtil();
		List<Map<String, Object>> list = (List<Map<String, Object>>) this.data;
		return convertUtil.mapToList(list, cls);
	}
}
