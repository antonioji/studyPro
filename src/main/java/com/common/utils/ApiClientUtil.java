package com.common.utils;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;

public  class ApiClientUtil {


	public  final static String MEMBERS_API = "v1/members";
	public  final static String CERTIFICATION_API = "v1/certification";
	public  final static String MEMBERSLOG_API = "v1/membersLog";

	public  static HttpHeaders getHeaders() {
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);
		return headers;
	}

	public static <T>  HttpEntity<T> getEntityBodyParam(T t) {
		try {
			HttpHeaders headers = getHeaders();
			return new HttpEntity<T>(t, headers);
		} catch (Exception e) {
		}
		return null;
	}
	public static <T>  HttpEntity<T> getEntityBodyParam(T t, HttpHeaders headers) {
		try {
			return new HttpEntity<T>(t, headers);
		} catch (Exception e) {
		}
		return null;
	}

	@SuppressWarnings({ "rawtypes", "unchecked" })
	public static HttpEntity getEntity() {
		try {
			return new HttpEntity( getHeaders());
		} catch (Exception e) {
		}
		return null;
	}
	public static HttpEntity getEntity(HttpHeaders headers) {
		try {

			return new HttpEntity( headers);
		} catch (Exception e) {
		}
		return null;
	}
	public static HttpHeaders getHeaderWithApikey(String keyName, String keyValue) {
		HttpHeaders headers = getHeaders();
		headers.set(keyName, keyValue);
		return headers;
	}
}
