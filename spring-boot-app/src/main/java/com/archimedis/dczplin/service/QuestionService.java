package com.archimedis.dczplin.service;

import java.util.ArrayList;
import java.util.List;

import org.json.simple.JSONArray;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import com.archimedis.dczplin.model.Master;
import com.archimedis.dczplin.repository.QuestionRepository;


@Service
@Component
public class QuestionService {

	
	@Autowired
	QuestionRepository questionRepository;
	
	public List<Master> getinitalMetadata(){
		return  (List<Master>) questionRepository.findAll();
	}
	
	
	public List<Master> getQuestionOnly(){
		return questionRepository.getQuestions(1);
		
	}
	
	public Master getQuestion(long id) {
		return questionRepository.getQuestionbyID(id);
	}
	
	public Master getParent(long id) {
		return questionRepository.getParentQuestionbyJson(id);
	}
	
	
	
	public List<Master> getQuestionJson(String id) throws ParseException{
		JSONParser parser = new JSONParser();  
		JSONArray obj = (JSONArray) parser.parse(id);  
		List<Master> list = new ArrayList<Master>();
		for(int i=0;i<obj.size();i++) {
			long num = (long)obj.get(i);
			list.add(getQuestion(num));
		}
		
		return list;
		
	}
	
	
	
	
}
