package com.stockmanagement.demo.stockService;
import java.util.List;
import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.stockmanagement.demo.stockEntity.StockEntity;
import com.stockmanagement.demo.stockRepo.StockRepository;


@Service
public class StockServiceImpl implements StockService{

	@Autowired
	private StockRepository stockrepository;
	
	@Override
	public List<StockEntity> getStocks() {
		
		return stockrepository.findAll();
	}

	@Override
	public StockEntity addstocks(StockEntity stockentity) {
		
		return stockrepository.save(stockentity);
	}

	@Override
	public List<StockEntity> getbycategory(String category) {
		
		String tempname = "reset";
//		return stockrepository.updateDb(tempname);
		return stockrepository.findAllBycategory(category);
	}

	@Override
	public StockEntity updatestock(StockEntity stockentity) {
		
		return stockrepository.save(stockentity);
	}

	@Override
	public String deletestock(Integer id) {
		
		stockrepository.deleteById(id);
		return "Deleted";
	}

	@Override
	public StockEntity updatebystkname(Integer id, StockEntity stockentity) {
		
		StockEntity stkDB = stockrepository.findById(id).get();
		
		
		
		
		if(Objects.nonNull(stockentity.getCategory()) && !"".equalsIgnoreCase(stockentity.getCategory())){
			stkDB.setCategory(stockentity.getCategory());
		}
		
		 if(Objects.nonNull(stockentity.getStockname()) && !"".equalsIgnoreCase(stockentity.getStockname())){
			
			stkDB.setStockname(stockentity.getStockname());
		}
		
		 if(Objects.nonNull(stockentity.getQuantity())){
			stkDB.setQuantity(stockentity.getQuantity());
		}
		
		 if(Objects.nonNull( stockentity.getBaseprice() ) ){
			stkDB.setBaseprice(stockentity.getBaseprice());
		}
		
		 if(Objects.nonNull(stockentity.getProfit())){
			stkDB.setProfit(stockentity.getProfit());
		}
		
		 if(Objects.nonNull(stockentity.getExpirydate())){
			stkDB.setExpirydate(stockentity.getExpirydate());
		}
		return stockrepository.save(stkDB);
	}

	

	@Override
	public String updatenew(Integer id, StockEntity stockentity) {
		
		StockEntity stkDB = stockrepository.findById(id).get();
		
		if(Objects.nonNull(stockentity.getCategory()) && !"".equalsIgnoreCase(stockentity.getCategory())){
			stkDB.setCategory(stockentity.getCategory());
		}
		
		 if(Objects.nonNull(stockentity.getStockname()) && !"".equalsIgnoreCase(stockentity.getStockname())){
			
			stkDB.setStockname(stockentity.getStockname());
		}
		
		 if(Objects.nonNull(stockentity.getQuantity())){
			stkDB.setQuantity(stockentity.getQuantity());
		}
		
		 if(Objects.nonNull( stockentity.getBaseprice() ) ){
			stkDB.setBaseprice(stockentity.getBaseprice());
		}
		
		 if(Objects.nonNull(stockentity.getProfit())){
			stkDB.setProfit(stockentity.getProfit());
		}
		
		 if(Objects.nonNull(stockentity.getExpirydate())){
			stkDB.setExpirydate(stockentity.getExpirydate());
		}
		 
		updateChecking(stkDB);	
		return "updated";
	}
	
	private boolean updateChecking(StockEntity stkDB) {
		// TODO Auto-generated method stub
		String dummy = stkDB.getStockname();
		List<StockEntity> existingNames = stockrepository.updateDb(dummy);
		if(existingNames.contains(dummy)) {
			return false;
		}
		 stockrepository.save(stkDB);
		System.out.println(existingNames);
		return true;
	}


	@Override
	public ResponseEntity<StockEntity> getByIdStk(Integer id) {
		// TODO Auto-generated method stub
		stockrepository.findById(id);
		return null;
	}

	@Override
	public ResponseEntity<String> addStkwithExc(StockEntity stockentity) {
		String stkname = stockentity.getStockname();
		
		boolean already = stockrepository.existsByStockname(stkname);
		String errmsg = "Stock is already in database";
		String successmsg = "Stock is saved";
		String descempty = "Empty fields";
		
		if(already == true) {
			return ResponseEntity.status(HttpStatus.ALREADY_REPORTED).header("desc", "handling available stocks").body(errmsg);
		}
		else if(stockentity.getCategory() == "" || stockentity.getCategory() == null){
			   return ResponseEntity.status(HttpStatus.BAD_REQUEST).header("desc",descempty ).body("Category field not be null");
		}
		else if(stockentity.getStockname() == "" || stockentity.getStockname() == null) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).header("desc", descempty).body("Stock name not be empty");
		}
		else if(stockentity.getBaseprice() <= 0 || stockentity.getBaseprice() == null) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).header("desc", descempty).body("Base price not be empty");
		}
		else if(stockentity.getQuantity() <= 0 || stockentity.getQuantity() == null) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).header("desc", descempty).body("Quantity not be empty");
		}
		else if(stockentity.getProfit() <= 0 || stockentity.getProfit() == null) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).header("desc", descempty).body("Profit not be empty");
		}else {
			// write in last else
			stockrepository.save(stockentity); 
		}
		return ResponseEntity.status(HttpStatus.OK).header("desc", "adding stock").body(successmsg);
	}

}
