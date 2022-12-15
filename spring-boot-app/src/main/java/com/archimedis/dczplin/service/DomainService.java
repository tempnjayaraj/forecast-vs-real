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
import com.archimedis.dczplin.repository.DomainRepository;

@Service
@Component
public class DomainService {

	@Autowired
	DomainRepository domainRepository;
	
	public List<Master> getDomainOnly(){
		return domainRepository.getDomains(3);
		
	}
	
	public Master getDomain(long id) {
		return domainRepository.getDomainbyID(id);
	}
	
	public List<Master> getDomainJson(String id) throws ParseException{
		JSONParser parser = new JSONParser();  
		JSONArray obj = (JSONArray) parser.parse(id);  
		List<Master> list = new ArrayList<Master>();
		for(int i=0;i<obj.size();i++) {
			long num = (long)obj.get(i);
			list.add(getDomain(num));
		}
		
		return list;
		
	}
	
}
