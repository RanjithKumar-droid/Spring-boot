package com.stockmanagement.demo.stockService;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.stockmanagement.demo.stockEntity.StockEntity;

public interface StockService {

	public List<StockEntity> getStocks();

	public StockEntity addstocks(StockEntity stockentity);

	public List<StockEntity> getbycategory(String category);

	public StockEntity updatestock(StockEntity stockentity);

	public String deletestock(Integer id);

	public StockEntity updatebystkname(Integer id, StockEntity stockentity);

	public ResponseEntity<StockEntity> getByIdStk(Integer id);

	public ResponseEntity<String> addStkwithExc(StockEntity stockentity);

	public String updatenew(Integer id, StockEntity stockentity);


}
