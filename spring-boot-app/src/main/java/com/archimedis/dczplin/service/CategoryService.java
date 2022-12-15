package com.archimedis.dczplin.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import com.archimedis.dczplin.model.Categories;
import com.archimedis.dczplin.repository.CategoryRepository;

@Service
@Component
public class CategoryService {

	@Autowired
	CategoryRepository categoryRepository;
	
	public List<Categories> getCategoryByID(int id){
		return categoryRepository.getCategoryByCountry(id);
	}
	
	
	public List<Categories> getSubCategory(int countryId, int parentId){
		System.out.println(parentId);
		return categoryRepository.getSubcategory(countryId, parentId);
	}
	
	}
