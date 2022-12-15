package com.archimedis.dczplin.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import org.springframework.stereotype.Component;

@Entity
@Component
@Table(name="geographies")
public class Geography {
	@Id
	int geo_id;
	
	int geo_category_id;
	
	String geo_name;

	public int getGeo_id() {
		return geo_id;
	}

	public void setGeo_id(int geo_id) {
		this.geo_id = geo_id;
	}

	public int getGeo_category_id() {
		return geo_category_id;
	}

	public void setGeo_category_id(int geo_category_id) {
		this.geo_category_id = geo_category_id;
	}

	public String getGeo_name() {
		return geo_name;
	}

	public void setGeo_name(String geo_name) {
		this.geo_name = geo_name;
	}

	public Geography(int geo_id, int geo_category_id, String geo_name) {
		super();
		this.geo_id = geo_id;
		this.geo_category_id = geo_category_id;
		this.geo_name = geo_name;
	}
	
	public Geography() {
		
	}
	
}
