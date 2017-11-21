package com.common.fo.customer;




import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.catalina.security.SecurityUtil;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.common.fo.common.MembersConst;
import com.common.fo.security.user.AppUser;


@Aspect
@Component
public class MembersInfoAspect {
	private final String[] ID_FIELD = {"rgstrId", "modrId"};

	@Around("@annotation(com.common.fo.customer.MembersInfo)")
    public Object userSetting(ProceedingJoinPoint joinPoint) throws Throwable {
		List<Object> objectList = new ArrayList<Object>();

        AppUser appUser = this.getAppUser(joinPoint);

		for (Object obj : joinPoint.getArgs()) {
			if(obj instanceof  AppUser) {
				objectList.add(obj);
				continue;
			}

			obj = classReflection(obj, appUser);
			objectList.add(obj);
		}

	   Object returnPoint = joinPoint.proceed(objectList.toArray());
	   return returnPoint;
	}

	private AppUser getAppUser(ProceedingJoinPoint joinPoint) {
		HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
		if(request == null) return null;

		HttpSession session = request.getSession();
		String sessionId = session.getId();
        return (AppUser)session.getAttribute("testsessionkey" + sessionId);
	}

	private Object classReflection(Object obj, AppUser appUser) throws Exception {
		Class<?> targetType = obj.getClass();

		for(String id : ID_FIELD) {
			Field field = getClassField(targetType, id);
			if(field == null) continue;

			field.setAccessible(true);
			if(field.getType() != String.class) {
				continue;
			}

			String membersId = appUser == null ?  MembersConst.MEMBER_SYSTEM_ID : appUser.getId();
			field.set(obj, membersId);
		}
		return obj;
	}

	private Field getClassField(Class<?> targetType, String fieldName) {
		try {
			return targetType.getDeclaredField(fieldName);
		}catch(Exception ex){
			return null;
		}
	}
}
