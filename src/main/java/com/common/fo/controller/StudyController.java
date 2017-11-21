/** 
* API 
*
* @Project Lotte EC Platform Service
* @Company leps.com
* @since 2017-11-21
* @author junil
*/
package com.common.fo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/** 
 * StudyController.java
 *
 * @Project Lotte EC Platform Service
 * @Company leps.com
 * @since 2017-11-21
 */
@Controller
public class StudyController {

	
	/**
	 *
	 * index
	 *
	 * @return
	 * @return String
	 * @since 2017-10-26
	 */
	@RequestMapping(value= {"index",  "/"}, method=RequestMethod.GET)
	public String index() {
		return "index";
	}
}
