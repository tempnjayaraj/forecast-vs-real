package com.archimedis.dczplin.util;

import org.json.simple.JSONObject;

public class MetadataRender {
	public JSONObject generateMet(int num) {
		JSONObject obj = new JSONObject();
		obj.put("country_id", null);
		for(int i=1;i<=num;i++) {
			obj.put("geo_level_"+i, null);
		}
		obj.put("domain_id", null);
		obj.put("company_size_id", null);
		obj.put("company_type_id", null);
		obj.put("employee_strength_id", null);
		return obj;
	}
}
