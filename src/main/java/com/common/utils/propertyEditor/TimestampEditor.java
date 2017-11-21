package com.common.utils.propertyEditor;

import java.beans.PropertyEditorSupport;
import java.sql.Timestamp;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;

import org.springframework.util.StringUtils;

public class TimestampEditor extends PropertyEditorSupport {
	private final DateFormat dateFormat;

	public TimestampEditor() {
		this.dateFormat = new SimpleDateFormat("yyyyMMddHHmmss");
	}

	@Override
	public void setAsText(String text) throws IllegalArgumentException {

		if (StringUtils.hasText(text) == false) {
			setValue(null);
			return;
		}

		if (text.length() < 8) {
			setValue(null);
			return;
		}

		try {
			text = this.textFormat(text);
			Timestamp timestamp;
			timestamp = new Timestamp(dateFormat.parse(text).getTime());
			setValue(timestamp);
		} catch (ParseException ex) {
			throw new IllegalArgumentException("Could not parse date: " + text, ex);
		}
	}

	@Override
	public String getAsText() {
		Timestamp value = (Timestamp) getValue();
		return value.toString();
	}

	private String textFormat(String text) {
		text = text.replaceAll("[^0-9]", "");
		text = String.format("%-14s", text).replace(' ', '0');

		return text;
	}
}
