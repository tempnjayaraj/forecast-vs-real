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
import com.archimedis.dczplin.service.EmployeeSizeService;

@Controller
@Component
@CrossOrigin
public class EmployeeSizeController {

	@Autowired
	EmployeeSizeService empSizeService;
	
	@RequestMapping(value = "/employeesize" ,method=RequestMethod.GET)
	@ResponseBody
	public List<Master> getEmployee(){
		return empSizeService.getEmployeeSizeOnly();
	}
	
	@RequestMapping(value = "/employeesize/{id}" ,method=RequestMethod.GET)
	@ResponseBody
	public Master getSingleQuestion(@PathVariable("id") int id){
		return empSizeService.getEmployeeSize(id);
	}
	
	@RequestMapping(
			value = "/employeesizes" ,
			method=RequestMethod.POST, 
			consumes={org.springframework.http.MediaType.APPLICATION_JSON_VALUE})
	@ResponseBody
	public List<Master> getDomainJson(@RequestBody String fullName) throws ParseException{
//		System.out.println(fullName);
		return empSizeService.getEmployeeSizeJson(fullName);
	}
}
