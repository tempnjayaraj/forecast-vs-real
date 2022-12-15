package com.archimedis.dczplin.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import org.springframework.stereotype.Component;

@Entity
@Component
@Table(name = "cfo_data")
public class CFOData {
	@Id
	int cfo_data_id;
	int _year;
	long _month;
	int gst;
	int tds;
	int amount;
	int status;
	public int getStatus() {
		return status;
	}
	public void setStatus(int status) {
		this.status = status;
	}
	public int getCfo_data_id() {
		return cfo_data_id;
	}
	public void setCfo_data_id(int cfo_data_id) {
		this.cfo_data_id = cfo_data_id;
	}
	public int get_year() {
		return _year;
	}
	public void set_year(int _year) {
		this._year = _year;
	}
	public long get_month() {
		return _month;
	}
	public void set_month(long _month) {
		this._month = _month;
	}
	public int getGst() {
		return gst;
	}
	public void setGst(int gst) {
		this.gst = gst;
	}
	public int getTds() {
		return tds;
	}
	public void setTds(int tds) {
		this.tds = tds;
	}
	public int getAmount() {
		return amount;
	}
	public void setAmount(int amount) {
		this.amount = amount;
	}
	public CFOData(int cfo_data_id, int _year, long _month, int gst, int tds, int amount,int status) {
		super();
		this.cfo_data_id = cfo_data_id;
		this._year = _year;
		this._month = _month;
		this.gst = gst;
		this.tds = tds;
		this.amount = amount;
		this.status = status;
	}
	public CFOData() {
		
	}
}
