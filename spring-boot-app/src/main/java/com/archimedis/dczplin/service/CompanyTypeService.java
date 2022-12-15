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
import com.archimedis.dczplin.repository.CompanyTypeRepository;

@Service
@Component
public class CompanyTypeService {

	@Autowired
	CompanyTypeRepository typeRepository;
	public List<Master> getCompanyTypeOnly(){
		return typeRepository.getCompanyType(5);
		
	}
	
	public Master getCompanyType(long id) {
		return typeRepository.getCompanyTypebyID(id);
	}
	
	public List<Master> getCompanyTypeJson(String id) throws ParseException{
		JSONParser parser = new JSONParser();  
		JSONArray obj = (JSONArray) parser.parse(id);  
		List<Master> list = new ArrayList<Master>();
		for(int i=0;i<obj.size();i++) {
			long num = (long)obj.get(i);
			list.add(getCompanyType(num));
		}
		
		return list;
		
	}
}
