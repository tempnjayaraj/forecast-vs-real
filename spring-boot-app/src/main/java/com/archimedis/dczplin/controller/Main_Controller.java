package com.archimedis.dczplin.controller;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.archimedis.dczplin.model.CFO;
import com.archimedis.dczplin.model.Master;
import com.archimedis.dczplin.service.CFODataService;
import com.archimedis.dczplin.service.CFOService;

@CrossOrigin
@Controller
public class Main_Controller {
	@Autowired
	CFOService service;
	
	@Autowired
	CFODataService service2;
	
	@RequestMapping(value="/")
	@ResponseBody
	public String greetings(){
		return "Greetings from Forecast!!";
	}
	
	@RequestMapping(value="/in")
	@ResponseBody
	public JSONArray displayInFlowObjects(){
		List<CFO> arr = service.getInFlowObjects();
		JSONArray result = new JSONArray();
		for(int i=0;i<arr.size();i++) {
			JSONObject obj = new JSONObject();
			String cfo_id = arr.get(i).getCfo_id();
			String cfo_name = arr.get(i).getCfo_name();
			obj.put("name", cfo_name);
			obj.put("cfo_id", cfo_id);
			obj.put("data", service2.getDataForID(cfo_id));
			result.add(obj);
		}
		return result;
	}
	@RequestMapping(value="/out")
	@ResponseBody
	public JSONArray displayOutFlowObjects(){
		List<CFO> arr = service.getOutFlowObjects();
		JSONArray result = new JSONArray();
		for(int i=0;i<arr.size();i++) {
			JSONObject obj = new JSONObject();
			String cfo_id = arr.get(i).getCfo_id();
			String cfo_name = arr.get(i).getCfo_name();
			obj.put("name", cfo_name);
			obj.put("cfo_id", cfo_id);
			obj.put("data", service2.getDataForID(cfo_id));
			System.out.println(cfo_name+cfo_id);
			result.add(obj);
		}
		return result;
	}
	
	@RequestMapping(
			value = "/postForeCastData" ,
			method=RequestMethod.POST, 
			consumes={org.springframework.http.MediaType.APPLICATION_JSON_VALUE})
	@ResponseBody
	public String postForeCast(@RequestBody JSONObject data) throws ParseException{
		String cfo_id = (String) data.get("cfo_id");
		Boolean isInFlow = (Boolean) data.get("isInFlow");
		ArrayList<LinkedHashMap<String,String>> obj = (ArrayList<LinkedHashMap<String,String>>) data.get("data");
		String year = (String) data.get("year");
		service2.postForecastData(cfo_id,true,obj,year);
		return "Post Complete";
	}
	
	@RequestMapping(
			value = "/postRealData" ,
			method=RequestMethod.POST, 
			consumes={org.springframework.http.MediaType.APPLICATION_JSON_VALUE})
	@ResponseBody
	public String postRealData(@RequestBody JSONObject data) throws ParseException{
		ArrayList<LinkedHashMap<String,String>> obj = (ArrayList<LinkedHashMap<String,String>>) data.get("data");
		System.out.println(obj);
		service2.postRealData(obj);
		return "Post Complete";
	}
	
	@RequestMapping(
			value = "/createNewCFO" ,
			method=RequestMethod.POST, 
			consumes={org.springframework.http.MediaType.APPLICATION_JSON_VALUE})
	@ResponseBody
	public String createNewCFO(@RequestBody JSONObject json) throws ParseException{
		Boolean inFlow = (Boolean) json.get("isInFlow");
		String cfo_name = (String) json.get("cfo_name");
		service2.postRealData(obj);
		return "Post Complete";
	}
}