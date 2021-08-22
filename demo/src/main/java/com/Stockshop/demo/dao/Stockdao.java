package com.Stockshop.demo.dao;

import com.Stockshop.demo.model.Stocks2;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface Stockdao {
   public Stocks2 createStocks(Stocks2 stocks2);

    public List<Stocks2> getAllStocks();

    public String deleteStock(Integer id);

    public boolean createException(Stocks2 stocks);

    public Stocks2 findSpecific(Integer id);

}
