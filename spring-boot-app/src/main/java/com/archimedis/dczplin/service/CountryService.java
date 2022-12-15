package com.archimedis.dczplin.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import com.archimedis.dczplin.model.Country;
import com.archimedis.dczplin.model.Master;
import com.archimedis.dczplin.repository.CountryRepository;

@Component
@Service
public class CountryService {

	@Autowired
	CountryRepository countryRepo;
	
	public List<Country> getAllCountry(){
		return countryRepo.findbycountry();
	}
	public String getName(long id) {
		return countryRepo.findCountryName(id);
	}
}
