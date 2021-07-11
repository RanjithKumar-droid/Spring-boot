package com.stockmanagement.demo.stockController;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
//import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.stockmanagement.demo.stockEntity.StockEntity;
import com.stockmanagement.demo.stockService.StockService;

@CrossOrigin(value = "*")
@RestController
@RequestMapping("/stockshop")
public class StockController {

	@Autowired
	private StockService stockservice;
	
	@GetMapping("/stocks")
	public List<StockEntity> getstocks() {
		return stockservice.getStocks();
	}

	@GetMapping("/stocks/{category}")
	public List<StockEntity> getbycategory(@PathVariable String category){
		return stockservice.getbycategory(category);
	}
	
	// Exception handling
	
	@GetMapping("/exc/{id}")
	public ResponseEntity<StockEntity>  getByIdStk(@PathVariable Integer id){
		if(id == 5) {
			throw new IllegalArgumentException();
		}
		return stockservice.getByIdStk(id);
	}
	
	
	
	@PostMapping("/stocks/add")
	public StockEntity addstocks(@RequestBody StockEntity stockentity) {
		return stockservice.addstocks(stockentity);
	}
	
	@PostMapping("/stocks/addexc")
	public ResponseEntity<String> addStkwithExc(@RequestBody StockEntity stockentity){
		
		return stockservice.addStkwithExc(stockentity);
	}
	
	@PutMapping("/stocks/{id}")
	public StockEntity updatebystkname(@PathVariable Integer id, @RequestBody StockEntity stockentity) {
		return stockservice.updatebystkname(id,stockentity);
	}
	
	@PutMapping("/update/{id}")
	public String update(@PathVariable Integer id, @RequestBody StockEntity stockentity) {
		stockservice.updatenew(id,stockentity);
		return "updated";
	}
	
	@DeleteMapping("/stocks/{id}")
	public String deletestock(@PathVariable Integer id) {
		return stockservice.deletestock(id);
	}
	
	
	
	@ExceptionHandler
	public ResponseEntity<Object> exceptionll(IllegalArgumentException e){
		return new ResponseEntity<Object>("stock not found",HttpStatus.BAD_REQUEST);
	}
}
