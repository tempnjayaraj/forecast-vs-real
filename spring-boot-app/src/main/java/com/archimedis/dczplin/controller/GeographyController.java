package com.archimedis.dczplin.controller;

import java.util.List;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.archimedis.dczplin.model.Geography;
import com.archimedis.dczplin.model.Master;
import com.archimedis.dczplin.service.GeographyService;

@Controller
@Component
@CrossOrigin
public class GeographyController {
	@Autowired
	GeographyService geoService;
	
	@RequestMapping(
			value = "/geoforCountryandCategory" ,
			method=RequestMethod.POST, 
			consumes={org.springframework.http.MediaType.APPLICATION_JSON_VALUE})
	@ResponseBody
	public List<Geography> getMapObject(@RequestBody String json) throws ParseException{
		JSONParser parser = new JSONParser();  
		JSONObject obj = (JSONObject) parser.parse(json);  
		long countryId  = (long) obj.get("country_id");
		long geo_category_id  = (long) obj.get("geo_category_id");
		
		return geoService.getGeoforCountryandGeoCategory(countryId, geo_category_id);
	}
	
	@RequestMapping(
			value = "/geoExceptionCategories" ,
			method=RequestMethod.POST, 
			consumes={org.springframework.http.MediaType.APPLICATION_JSON_VALUE})
	@ResponseBody
	public List<Master> getExceptionCategories(@RequestBody int country_id) throws ParseException{
		return geoService.getExceptionGeographies(country_id);
	}
	
	@RequestMapping(value = "/geo/{id}" ,method=RequestMethod.GET)
	@ResponseBody
	public String getSingleQuestion(@PathVariable("id") long id){
		return geoService.getGeoName(id);
	}
	
	@RequestMapping(value = "/geo/{id}/{sub_id}" ,method=RequestMethod.GET)
	@ResponseBody
	public List<Geography> getGeos(@PathVariable("id") long id,@PathVariable("sub_id") long sub_id){
		return geoService.getGeos(id, sub_id);
	}

}
