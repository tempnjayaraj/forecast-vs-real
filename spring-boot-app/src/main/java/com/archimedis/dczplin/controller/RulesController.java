package com.archimedis.dczplin.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.archimedis.dczplin.model.Rules;

@Controller
@Component
public class RulesController {
	
	@Autowired
	com.archimedis.dczplin.service.RuleService ruleservice;

	
	@RequestMapping(
			value = "/ruleset" ,
			method=RequestMethod.POST, 
			consumes={org.springframework.http.MediaType.APPLICATION_JSON_VALUE})
	@ResponseBody
	public List<Rules> getRulesSetByCategory(@RequestBody int id){
		return ruleservice.getRuleSetbyID(id);
	}
	
	
	@RequestMapping(
			value = "/rule",
			method = RequestMethod.POST,
			consumes = {org.springframework.http.MediaType.APPLICATION_JSON_VALUE}
			)
	@ResponseBody
	public List<Rules> getRulebyRuleset(@RequestBody int id){
		return ruleservice.getRulebyRuleSet(id);
	}
	
}
