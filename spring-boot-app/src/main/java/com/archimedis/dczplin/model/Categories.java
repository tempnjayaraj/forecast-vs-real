package com.archimedis.dczplin.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import org.springframework.stereotype.Component;

@Entity
@Component
@Table(name="categories")
public class Categories {
	
	@Id
	@Column(name = "category_id")
	int category_id;
	
	@Column(name="country_id")
	int country_id;
	
	@Column(name="geo_id")
	Integer geo_id;
	
	@Column(name="category_name")
	String category_name;
	
	@Column(name="category_series")
	int category_series;
	
	@Column(name="parent")
	Integer parent;
	
	
	public Categories() {
		
	}
	
	public Categories(int category_id, int country_id, Integer geo_id, String category_name, int category_series,
			Integer parent) {
		super();
		this.category_id = category_id;
		this.country_id = country_id;
		this.geo_id = geo_id;
		this.category_name = category_name;
		this.category_series = category_series;
		this.parent = parent;
	}

	public int getCategory_id() {
		return category_id;
	}

	public void setCategory_id(int category_id) {
		this.category_id = category_id;
	}

	public int getCountry_id() {
		return country_id;
	}

	public void setCountry_id(int country_id) {
		this.country_id = country_id;
	}

	public Integer getGeo_id() {
		return geo_id;
	}

	public void setGeo_id(Integer geo_id) {
		this.geo_id = geo_id;
	}

	public String getCategory_name() {
		return category_name;
	}

	public void setCategory_name(String category_name) {
		this.category_name = category_name;
	}

	public int getCategory_series() {
		return category_series;
	}

	public void setCategory_series(int category_series) {
		this.category_series = category_series;
	}

	public Integer getParent() {
		return parent;
	}

	public void setParent(Integer parent) {
		this.parent = parent;
	}
	
	
	
	
	

}
