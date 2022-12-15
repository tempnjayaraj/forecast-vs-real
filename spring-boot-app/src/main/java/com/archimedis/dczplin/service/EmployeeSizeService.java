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
import com.archimedis.dczplin.repository.EmployeeSizeRepository;
@Service
@Component
public class EmployeeSizeService {

	@Autowired
	EmployeeSizeRepository empSizeRepository;
	public List<Master> getEmployeeSizeOnly(){
		return empSizeRepository.getEmployeeSize(6);
		
	}
	
	public Master getEmployeeSize(long id) {
		return empSizeRepository.getEmployeeSizebyID(id);
	}
	
	public List<Master> getEmployeeSizeJson(String id) throws ParseException{
		JSONParser parser = new JSONParser();  
		JSONArray obj = (JSONArray) parser.parse(id);  
		List<Master> list = new ArrayList<Master>();
		for(int i=0;i<obj.size();i++) {
			long num = (long)obj.get(i);
			list.add(getEmployeeSize(num));
		}
		
		return list;
		
	}
}
