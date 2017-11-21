package com.common.utils;

import java.lang.reflect.InvocationTargetException;

import org.apache.commons.beanutils.BeanUtils;
import org.springframework.web.context.request.RequestContextHolder;

public class MembersUtils {

	public static void copyObject(Object dest, Object orig) {
		try {
			BeanUtils.copyProperties(dest, orig);
		} catch (IllegalAccessException e) {
			e.printStackTrace();
		} catch (InvocationTargetException e) {
			e.printStackTrace();
		}
	}
	
	public static String getEmailId(String email){
		String[] tempArr = email.split("@");
		return tempArr[0];
	}
	
	public static String getRedisKey(String prefix ){
		/**
		 * TODO role에 따른 추가 prefix를 할 가능성 있음, 변수를 하나 더 받아서 추가
		 * */
		String sessionId = RequestContextHolder.currentRequestAttributes().getSessionId();
		StringBuilder sb = new StringBuilder();
		sb.append(prefix);
		sb.append(sessionId);
		return sb.toString();
	}
}