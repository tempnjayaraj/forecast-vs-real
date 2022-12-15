package com.archimedis.dczplin.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import org.springframework.stereotype.Component;

@Entity
@Component
@Table(name="country")
public class Country {

	@Id
	@Column(name ="country_id")
	int id;
	
	@Column(name="country_name")
	String value;

	public Country() {
		
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}

	public Country(int id, String value) {
		super();
		this.id = id;
		this.value = value;
	}

	
	
	
}
