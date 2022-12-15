package com.archimedis.dczplin.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.archimedis.dczplin.model.Country;
import com.archimedis.dczplin.model.Master;
import com.archimedis.dczplin.service.CountryService;

@Controller
@Component
@CrossOrigin
public class CountryController {

	@Autowired
	CountryService countryService;
	
	
	@RequestMapping( value="/country", method=RequestMethod.GET)
	@ResponseBody
	public List<Country> getAllCountry(){
		return countryService.getAllCountry();
	}
	
	@RequestMapping(value = "/country/{id}" ,method=RequestMethod.GET)
	@ResponseBody
	public String getSingleQuestion(@PathVariable("id") long id){
		return countryService.getName(id);
	}

}
