package com.Stockshop.demo.service;


import com.Stockshop.demo.model.Stocks2;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface StockService {
    public Stocks2 createStocks(Stocks2 stocks2);

    public List<Stocks2> getAllStocks();

    public String deleteStock(Integer id);

    public ResponseEntity createexception(Stocks2 stocks);

    public ResponseEntity<Stocks2> updateJdbc(Stocks2 stocks2, Integer id);

   public Stocks2 findSpecific(Integer id);
}
