package com.archimedis.dczplin.service;

import java.util.ArrayList;
import java.util.List;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import com.archimedis.dczplin.model.Geography;
import com.archimedis.dczplin.model.Master;
import com.archimedis.dczplin.repository.CustomRepo;
import com.archimedis.dczplin.repository.GeographyRepository;
import com.archimedis.dczplin.repository.MasterRepo;

@Service
@Component
public class GeographyService {
	@Autowired
	GeographyRepository geoRepo;
	
	@Autowired
	MasterRepo masterRepo;
	
	
	public List<Geography> getGeoforCountryandGeoCategory(long country_id, long geo_category_id){
		return geoRepo.getGeographiesForCountryAndGeoCategory(country_id, geo_category_id);
	}
	
	public List<Integer> getExceptionGeoCategories(long country_id){
		return geoRepo.getExceptionGeoCategories(country_id);
	}
	
	public List<Master> getExceptionGeographies(long country_id){
		List<Integer> numList = getExceptionGeoCategories(country_id);
		List<Master> obj = new ArrayList<Master>();
		for(int i=0;i<numList.size();i++) {
			long temp = (long)numList.get(i);
			obj.add(masterRepo.getExceptionGeoCategories(temp));
		}
		return obj;
	}
	public String getGeoName(long id) {
		return geoRepo.findGeoName(id);
	}
	public List<Geography> getGeos(long country_id, long division_id){
		return geoRepo.getGeographiesForCountryAndSub(country_id, division_id);
	}
}
