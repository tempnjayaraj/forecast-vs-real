package com.archimedis.dczplin.controller;

import java.util.List;

import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.archimedis.dczplin.model.Categories;
import com.archimedis.dczplin.service.CategoryService;

@Controller
@Component
public class CategoryController {

	@Autowired
	CategoryService categoryService;
	
	@RequestMapping(
			value = "/categories" ,
			method=RequestMethod.POST, 
			consumes={org.springframework.http.MediaType.APPLICATION_JSON_VALUE})
	@ResponseBody
	public List<Categories> getCategoryJson(@RequestBody int id) throws ParseException{
		return categoryService.getCategoryByID(id);
	}
	
	
	@RequestMapping(
			value="/subcategories/{countryId}",
			method=RequestMethod.POST,
			consumes= {org.springframework.http.MediaType.APPLICATION_JSON_VALUE})
	@ResponseBody
	public List<Categories> getSubCategory(@PathVariable int countryId,@RequestBody int subCategoryid){
		return categoryService.getSubCategory(countryId,subCategoryid);
	}
	
}
