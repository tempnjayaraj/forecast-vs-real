package com.archimedis.dczplin.controller;

import java.util.List;

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

import com.archimedis.dczplin.model.Master;
import com.archimedis.dczplin.service.CompanyTypeService;

@Controller
@Component
@CrossOrigin
public class CompanyTypeController {

	@Autowired
	CompanyTypeService typeService;
	@RequestMapping(value = "/companytype" ,method=RequestMethod.GET)
	@ResponseBody
	public List<Master> getCompanyType(){
		return typeService.getCompanyTypeOnly();
	}
	
	@RequestMapping(value = "/companytype/{id}" ,method=RequestMethod.GET)
	@ResponseBody
	public Master getSingleCompanyType(@PathVariable("id") int id){
		return typeService.getCompanyType(id);
	}
	
	@RequestMapping(
			value = "/companytypes" ,
			method=RequestMethod.POST, 
			consumes={org.springframework.http.MediaType.APPLICATION_JSON_VALUE})
	@ResponseBody
	public List<Master> getCompanytypeJson(@RequestBody String fullName) throws ParseException{
		return typeService.getCompanyTypeJson(fullName);
	}
}
