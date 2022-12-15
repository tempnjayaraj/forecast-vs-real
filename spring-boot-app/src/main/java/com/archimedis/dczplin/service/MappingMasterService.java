package com.archimedis.dczplin.service;

import java.util.List;

import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import com.archimedis.dczplin.model.MappingMaster;
import com.archimedis.dczplin.repository.MappingMasterRepository;

@Service
@Component
public class MappingMasterService {

	@Autowired
	MappingMasterRepository mapRepository;
	
	public List<MappingMaster> getAllData(int id){
		
		return  mapRepository.getObject1ByCountry(id);
	}
	
	public List<Integer> getAlld(int id,int obj){
		
		return  mapRepository.getObjectByCountry(id,obj);
	}
	
	public JSONObject getCountryDetails(int country_id) {
		JSONObject finals = new JSONObject();
		int[] req = {1,3,4,5,6,7};
		for(int i=0;i<req.length;i++) {
			List<Integer> list = getAlld(country_id,req[i]);
			finals.put(req[i], list);
		}
		
		return finals;
	}
	
}
