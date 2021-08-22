package com.Stockshop.demo.serviceimplementation;

import com.Stockshop.demo.dao.Stockdao;
import com.Stockshop.demo.model.Stocks2;
import com.Stockshop.demo.service.StockService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.config.ConfigDataResourceNotFoundException;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
public class Serviceimplementation implements StockService{

    @Autowired
    Stockdao stockdao;

    @Override
    public Stocks2 createStocks(Stocks2 stocks2) {
        return stockdao.createStocks(stocks2);
    }

    @Override
    public List<Stocks2> getAllStocks() {
        return stockdao.getAllStocks();
    }

    @Override
    public String deleteStock(Integer id) {
        return stockdao.deleteStock(id);
    }

    @Override
    public ResponseEntity createexception(Stocks2 stocks) {
       boolean ifalready = stockdao.createException(stocks);

        if((stocks.getCategory() == null) || (stocks.getCategory() == "")){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Category is required");
        }
       else if((stocks.getStockname() == null) || (stocks.getStockname() == "")) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Stockname is required");
        }
       else if((stocks.getQuantity() == null) || (stocks.getQuantity() == 0)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Quantity is required");
        }
        else if((stocks.getBaseprice() == null) || (stocks.getBaseprice() == 0)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Baseprice is required");

        }
        else if((stocks.getProfit() == null) || (stocks.getProfit() == 0)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Profit is required");

        }
       else if((stocks.getExpirydate() == null)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Expirydate is required");

        }

        if(ifalready == true){
           return ResponseEntity.status(HttpStatus.ALREADY_REPORTED).body("Stock is already saved");
        }else if(ifalready == false){
            return ResponseEntity.status(HttpStatus.OK).body(stockdao.createStocks(stocks));
        }
        return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body("Something went wrong");
    }

    @Override
    public ResponseEntity<Stocks2> updateJdbc(Stocks2 stocks2, Integer id) {

       Stocks2 stockdb = stockdao.findSpecific(id);
//        System.out.println(stockdb);

        if(Objects.nonNull(stocks2.getCategory()) && !"".equalsIgnoreCase(stocks2.getCategory())){
            stockdb.setCategory(stocks2.getCategory());
        }
         if(Objects.nonNull(stocks2.getStockname()) && !"".equalsIgnoreCase(stocks2.getStockname())) {
            stockdb.setStockname(stocks2.getStockname());
        }
         if(Objects.nonNull(stocks2.getQuantity())) {
            stockdb.setQuantity(stocks2.getQuantity());
        }
         if(Objects.nonNull(stocks2.getBaseprice())) {
            stockdb.setBaseprice(stocks2.getBaseprice());
        }
         if(Objects.nonNull(stocks2.getProfit())) {
            stockdb.setProfit(stocks2.getProfit());
        }
         if(Objects.nonNull(stocks2.getExpirydate())) {
            stockdb.setExpirydate(stocks2.getExpirydate());
        }

        return ResponseEntity.status(HttpStatus.OK).body(stockdao.createStocks(stockdb));

    }

    @Override
    public Stocks2 findSpecific(Integer id) {

        return  stockdao.findSpecific(id);
    }

}
