package com.archimedis.dczplin.service;

import java.util.ArrayList;
import java.util.LinkedHashMap;

import javax.transaction.Transactional;

import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import com.archimedis.dczplin.repository.CFODataRepository;

@Service
@Component
public class CFODataService {

	@Autowired
	CFODataRepository repo;

	public JSONObject getDataForID(String id) {
		JSONObject obj = new JSONObject();
		System.out.println(repo.getCFOForecastDataForID(id));
		obj.put("forecast", repo.getCFOForecastDataForID(id));
		obj.put("real", repo.getCFORealDataForID(id));
		return obj;
	}

	@Transactional
	public void postForecastData(String cfo_id, Boolean isForecast, ArrayList<LinkedHashMap<String, String>> obj,
			String year) {
		for (int i = 0; i < obj.size(); i++) {
			LinkedHashMap<String, String> temp = obj.get(i);
			try{
				Integer amount = Integer.parseInt(temp.get("amount"));
				Integer gst = (int) Integer.parseInt(temp.get("gst"));
				Integer tds = Integer.parseInt(temp.get("tds"));
				if (amount != null && gst != null && tds != null) {
					repo.putForeCastData(cfo_id, Integer.parseInt(year), i + 1, Integer.parseInt(temp.get("gst")),
							Integer.parseInt(temp.get("tds")), Integer.parseInt(temp.get("amount")), isForecast);
				}

			}catch(Exception e) {
				System.out.println("Unable to insert data");
			}
		}
	}
	@Transactional
	public void postRealData( ArrayList<LinkedHashMap<String, String>> obj) {
		for (int i = 0; i < obj.size(); i++) {
			LinkedHashMap<String, String> temp = obj.get(i);
			try{
				Integer amount = Integer.parseInt(temp.get("amount"));
				Integer gst = (int) Integer.parseInt(temp.get("gst"));
				Integer tds = Integer.parseInt(temp.get("tds"));
				String cfo_id = temp.get("cfo_id");
				Integer isPartial = Integer.parseInt(temp.get("isPartial"));
				Integer month = Integer.parseInt(temp.get("month")); 
				Integer year = Integer.parseInt(temp.get("year")); 
				if(isPartial==1) {
					repo.deleteForecastEntry(cfo_id, year,  month);
				}
				System.out.println(amount + gst + tds + cfo_id + isPartial + month + year);
				repo.putRealData(cfo_id, year, month,gst, tds, amount, isPartial);
			}catch(Exception e) {
				e.printStackTrace();
			}
		}
	}

}