package com.archimedis.dczplin.controller;

import java.util.List;

import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.archimedis.dczplin.model.MappingMaster;
import com.archimedis.dczplin.service.MappingMasterService;

@Controller
@Component
@CrossOrigin
public class MappingMasterController {

	@Autowired
	MappingMasterService mapService;
	
	
	@RequestMapping(
			value = "/collect" ,
			method=RequestMethod.POST, 
			consumes={org.springframework.http.MediaType.APPLICATION_JSON_VALUE})
	@ResponseBody
	public List<MappingMaster> getMapObject(@RequestBody int id){
		return mapService.getAllData(id);
	}
	
	@RequestMapping(
			value = "/collects" ,
			method=RequestMethod.POST, 
			consumes={org.springframework.http.MediaType.APPLICATION_JSON_VALUE})
	@ResponseBody
	public JSONObject getCountry(@RequestBody int id){
		return mapService.getCountryDetails(id);
	}
	
	
	@RequestMapping(
			value = "/getMetadata" ,
			method=RequestMethod.POST, 
			consumes={org.springframework.http.MediaType.APPLICATION_JSON_VALUE})
	@ResponseBody
	public JSONObject generateMet(@RequestBody int num) {
		int temp = 1;
		JSONObject obj = new JSONObject();
		obj.put(temp++,"country_id");
		for(int i=1;i<=num;i++) {
			obj.put(temp++, "geo_level_"+i);
		}
		obj.put(temp++, "domain_id");
		obj.put(temp++, "company_type_id");
		obj.put(temp++, "company_size_id");
		obj.put(temp++, "employee_strength_id");
		return obj;
	}
	
}
