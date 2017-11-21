package com.common.utils;

import java.util.List;
import java.util.concurrent.TimeUnit;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Repository;

@Repository
public class RedisManager<T> {
	private Logger log = LoggerFactory.getLogger(getClass());

	@Autowired
	private RedisTemplate redisTemplate;
	@Resource(name = "redisTemplate")
	private ValueOperations<String, T> valueOps;
	@Resource(name = "redisTemplate")
	private ValueOperations<String, List<T>> valueOpsList;

	public RedisManager() {

	}

	public T getValue(String key) {
		try {
			return valueOps.get(key);

		} catch (Exception e) {
			//log.error("error getValue: " ,e);
			return null;
		}

	}

	public List<T> getListValue(String key) {
		try {
			return valueOpsList.get(key);
		} catch (Exception e) {
			log.error("error getListValue : ",e);
			return null;
		}

	}

	public void put(String key, T val, long timeout, TimeUnit timeUnit) {
		try {
			valueOps.set(key, val, timeout, timeUnit);
		} catch (Exception e) {
			log.error("error put : ",e);
		}
	}
	public void putList(String key, List<T> list, long timeout, TimeUnit timeUnit){
		try {
			valueOpsList.set(key, list, timeout, timeUnit);
		} catch (Exception e) {
			log.error("error putList : ",e);
		}
	}

	@SuppressWarnings("unchecked")
	public void delete(String key) {
		try {
			redisTemplate.delete(key);
		} catch (Exception e) {
			log.error("error getListValue : ",e);
		}

	}
}
