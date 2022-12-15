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
import org.springframework.web.bind.annotation.RestController;

import com.archimedis.dczplin.model.Master;
import com.archimedis.dczplin.service.QuestionService;

@RestController
//@Controller
@Component
@CrossOrigin
public class QuestionController {

	@Autowired
	QuestionService questionService;
	
	@RequestMapping(value = "/question" ,method=RequestMethod.GET)
	@ResponseBody
	public List<Master> getQuestion(){
		return questionService.getQuestionOnly();
	}
	
	@RequestMapping(value = "/question/{id}" ,method=RequestMethod.GET)
	@ResponseBody
	public Master getSingleQuestion(@PathVariable("id") int id){
		return questionService.getQuestion(id);
	}
	
	@RequestMapping(value = "/parentquestion/{id}" ,method=RequestMethod.GET)
	@ResponseBody
	public Master getParentQuestion(@PathVariable("id") long id){
		return questionService.getParent(id);
	}
	
	
	@RequestMapping(
			value = "/questions" ,
			method=RequestMethod.POST, 
			consumes={org.springframework.http.MediaType.APPLICATION_JSON_VALUE})
	@ResponseBody
	public List<Master> getQuestionJson(@RequestBody String fullName) throws ParseException{
//		System.out.println(fullName);
		return questionService.getQuestionJson(fullName);
	}
	
	
	
	
	@RequestMapping(value = "/metadata",method=RequestMethod.GET)
//	@ResponseBody
	public List<Master> getMetadata(){
		return questionService.getinitalMetadata();
	}
	
	
	
	
}
