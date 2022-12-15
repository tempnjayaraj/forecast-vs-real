package com.archimedis.dczplin.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import org.springframework.stereotype.Component;

@Entity
@Table(name="rules")
@Component
public class Rules {

	@Id
	@Column(name="rule_id")
	int rule_id;
	
	@Column(name="rule_name")
	String rule_Name;
	
	@Column(name="parent")
	Integer parent;
	
	@Column(name="category_id")
	int category_id;

	public Rules() {
		
	}
	public Rules(int rule_id, String rule_Name, Integer parent, int category_id) {
		super();
		this.rule_id = rule_id;
		this.rule_Name = rule_Name;
		this.parent = parent;
		this.category_id = category_id;
	}

	public int getRule_id() {
		return rule_id;
	}

	public void setRule_id(int rule_id) {
		this.rule_id = rule_id;
	}

	public String getRule_Name() {
		return rule_Name;
	}

	public void setRule_Name(String rule_Name) {
		this.rule_Name = rule_Name;
	}

	public Integer getParent() {
		return parent;
	}

	public void setParent(Integer parent) {
		this.parent = parent;
	}

	public int getCategory_id() {
		return category_id;
	}

	public void setCategory_id(int category_id) {
		this.category_id = category_id;
	}
	
	
	
}
