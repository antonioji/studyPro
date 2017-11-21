package com.common.utils;

import java.beans.PropertyEditor;
import java.io.Serializable;
import java.lang.reflect.Field;
import java.math.BigDecimal;
import java.math.BigInteger;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.propertyeditors.CustomBooleanEditor;
import org.springframework.beans.propertyeditors.CustomNumberEditor;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import com.common.utils.propertyEditor.TimestampEditor;
import com.fasterxml.jackson.databind.JavaType;
import com.fasterxml.jackson.databind.type.TypeFactory;

@Component
public class ConvertUtil implements Serializable{

	private final Logger log = LoggerFactory.getLogger(getClass());
	private static final long serialVersionUID = -777137007968523527L;
	private TypeFactory typeFactory;
	private Map<Class<?>, PropertyEditor> defaultEditors;

	public ConvertUtil() {
		this.typeFactory = TypeFactory.defaultInstance();
		this.settingDefaultEditors();
	}

	/**
	 * Map 타입의 Data를 Class로 변환 한다.
	 *
	 * @param map
	 * @param key
	 * @param appUser
	 * @param cls
	 * @return
	 * @throws Exception
	 * @return T
	 * @since 2017-10-31
	 * @author kansin88.ext@lotte.net
	 */
	@SuppressWarnings("unchecked")
	public  <T> T mapToObject(Map<String, Object> map, String key, Class<T> cls) {
		if(mapKeyCheck(map, key) == false) {
			return null;
		}

		try {
			Map<String, Object> result = (Map<String, Object>) map.get(key);
			return (T) convert(result, typeFactory.constructType(cls));
		}catch (Exception ex) {return null;}
	}


	/**
	 * 단일 Object에 한해서 클래스로 반환 한다.
	 *
	 * @param map
	 * @param cls
	 * @return
	 * @return T
	 * @since 2017-11-14
	 * @author kansin88.ext@lotte.net
	 */
	@SuppressWarnings("unchecked")
	public  <T> T mapToObject(Map<String, Object> map, Class<T> cls) {
		try {
			return (T) convert(map, typeFactory.constructType(cls));
		}catch (Exception ex) {return null;}
	}

	/**
	 * Map 타입의 Data를 List로 변환 한다.
	 *
	 * @param map
	 * @param key
	 * @param appUser
	 * @param cls
	 * @return
	 * @throws Exception
	 * @return List<T>
	 * @since 2017-10-31
	 * @author kansin88.ext@lotte.net
	 */
	@SuppressWarnings("unchecked")
	public <T> List<T>  mapToList(Map<String, Object> map, String key, Class<T> cls) {

		if(mapKeyCheck(map, key) == false) {
			return null;
		}

		try {
			List<Map<String, Object>> result = (ArrayList<Map<String, Object>>) map.get(key);
			return (List<T>) convert(result, typeFactory.constructType(cls));
		}catch(Exception ex) {
			return null;
		}
	}


	@SuppressWarnings("unchecked")
	public <T> List<T>  mapToList(List<Map<String, Object>> map, Class<T> cls) {

		try {
			return (List<T>) convert(map, typeFactory.constructType(cls));
		}catch(Exception ex) {
			return null;
		}
	}

	/**
	 * Class 타입의 Data를 Map으로 변환한다.
	 *
	 * @param cls
	 * @return
	 * @throws Exception
	 * @return Map<String,Object>
	 * @since 2017-10-31
	 * @author kansin88.ext@lotte.net
	 */
	public <T> Map<String, Object> ObjectToMap (Object obj) {
		if(obj == null && (obj instanceof Class) == false) {
			return null;
		}

		try {
			return convert(obj);
		}catch(Exception ex) {
			return null;
		}
	}

	private Map<String, Object>  convert(Object obj) throws Exception {
		return classReflectionMap(obj);
	}


	private Object convert(Map<String, Object> fromValue, JavaType toValueType)
			throws Exception {

		if(mapKeyCheck(fromValue) == false) {
			return null;
		}

		return classReflectionObject(fromValue, toValueType);
	}

	private List<Object> convert(List<Map<String, Object>> fromList, JavaType toValueType) throws Exception {
		if(mapKeyCheck(fromList) == false) {
			return null;
		}

		return classReflectionList(fromList, toValueType);
	}

	private Object classReflectionObject(Map<String, Object> map, JavaType toValueType) throws Exception {
		Class<?> targetType = toValueType.getRawClass();
		return  classReflection(map, targetType);
	}

	private List<Object> classReflectionList(List<Map<String, Object>> list, JavaType toValueType) throws Exception {
		Class<?> targetType = toValueType.getRawClass();
		List<Object> responseList = new ArrayList<Object>(list.size());

		for(Map<String, Object> map : list) {
			Object myObj =  classReflection(map, targetType);
			responseList.add(myObj);
		}

		return responseList;
	}

	private Object classReflection(Map<String, Object> map, Class<?> targetType) throws Exception {
		Set<Entry<String, Object>> entrys = map.entrySet();
		Object myObj = targetType.getConstructor().newInstance();

		for( Entry<String, Object> entry : entrys ){
			final String key = entry.getKey().toString();
			String value = entry.getValue() == null ? "" : entry.getValue().toString();
			Field field = this.getField(targetType, key);

			if(field == null) continue;
			if(StringUtils.hasText(value) == false ) continue;

			field.setAccessible(true);
			if(field.getType() == String.class) {
				field.set(myObj, value);
				continue;
			}

			PropertyEditor propertyEditor = defaultEditors.get(field.getType());
			if (propertyEditor != null) {
			    propertyEditor.setAsText(value);
			    field.set(myObj, propertyEditor.getValue());
			}
		}

		return myObj;
	}


	private Map<String, Object> classReflectionMap(Object obj) throws Exception {
		Class<?> targetType = obj.getClass();
		Field[] fields = targetType.getDeclaredFields();
		Map<String, Object> map = new HashMap<String, Object>();

		for(Field field : fields) {
			field.setAccessible(true);
			final String key = field.getName();

			if(key.equals("serialVersionUID") == true) {
				continue;
			}

			if(field.get(obj) == null) {
				continue;
			}

			map.put(key,field.get(obj));
		}

		return map;
	}

	private Field getField(Class<?> targetType, String key) {
		try {
			Field field = targetType.getDeclaredField(key);
			return field;
		} catch (Exception e) {
			return null;
		}
	}

	private boolean mapKeyCheck(Map<String, Object> map, String key) {

		if(!map.containsKey(key)) {
			log.info("key가 없습니다. {}", key);
			return false;
		}

		return true;
	}

	private boolean mapKeyCheck(Map<String, Object> map) throws Exception {

		if(map == null || map.isEmpty() == true) {
			log.info("fromValue가 없습니다.");
			return false;
		}

		return true;
	}

	private boolean mapKeyCheck(List<Map<String, Object>> list) throws Exception {

		if(list == null || list.isEmpty() == true) {
			log.info("fromValue가 없습니다.");
			return false;
		}

		return true;
	}

	/**
	 * 타입 형변환
	 *
	 * @return void
	 * @since 2017-10-31
	 * @author kansi
	 */
	private void settingDefaultEditors() {
		this.defaultEditors = new HashMap<Class<?>, PropertyEditor>();
		this.defaultEditors.put(Timestamp.class, new TimestampEditor());
    	this.defaultEditors.put(Boolean.class, new CustomBooleanEditor(true));
    	this.defaultEditors.put(int.class, new CustomNumberEditor(Integer.class, false));
    	this.defaultEditors.put(Integer.class, new CustomNumberEditor(Integer.class, true));
    	this.defaultEditors.put(long.class, new CustomNumberEditor(Long.class, false));
    	this.defaultEditors.put(Long.class, new CustomNumberEditor(Long.class, true));
    	this.defaultEditors.put(double.class, new CustomNumberEditor(Double.class, false));
    	this.defaultEditors.put(Double.class, new CustomNumberEditor(Double.class, true));
    	this.defaultEditors.put(BigDecimal.class, new CustomNumberEditor(BigDecimal.class, true));
    	this.defaultEditors.put(BigInteger.class, new CustomNumberEditor(BigInteger.class, true));
    	this.defaultEditors.put(float.class, new CustomNumberEditor(Float.class, false));
    	this.defaultEditors.put(Float.class, new CustomNumberEditor(Float.class, true));
	}
}
