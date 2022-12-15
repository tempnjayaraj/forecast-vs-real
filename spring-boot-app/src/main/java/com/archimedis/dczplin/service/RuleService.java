package com.archimedis.dczplin.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import com.archimedis.dczplin.model.Rules;
import com.archimedis.dczplin.repository.RulesRepository;

@Service
@Component
public class RuleService {

	@Autowired
	RulesRepository ruleRepository;
	
	public List<Rules> getRuleSetbyID(int id){
		return ruleRepository.getRuleSet(id);
	}
	
	public List<Rules> getRulebyRuleSet(int id){
		return ruleRepository.getRule(id);
	}
}
