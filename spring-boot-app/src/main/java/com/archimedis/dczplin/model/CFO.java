package com.archimedis.dczplin.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import org.springframework.stereotype.Component;

@Entity
@Component
@Table(name = "cashflowobjects")
public class CFO {
	String cfo_name;
	@Id
	String cfo_id;
	Boolean isInFlow;

	public String getCfo_name() {
		return cfo_name;
	}

	public void setCfo_name(String cfo_name) {
		this.cfo_name = cfo_name;
	}

	public String getCfo_id() {
		return cfo_id;
	}

	public void setCfo_id(String cfo_id) {
		this.cfo_id = cfo_id;
	}

	public Boolean getIsInFlow() {
		return isInFlow;
	}

	public void setIsInFlow(Boolean isInFlow) {
		this.isInFlow = isInFlow;
	}

	CFO(){
		
	}

	public CFO(String cfo_name, String cfo_id, Boolean isInFlow) {
		super();
		this.cfo_name = cfo_name;
		this.cfo_id = cfo_id;
		this.isInFlow = isInFlow;
	}

}
