package com.Stockshop.demo.controller;

import com.Stockshop.demo.exceptionhandler.StockNotFoundException;
import com.Stockshop.demo.model.Stocks2;
import com.Stockshop.demo.service.StockService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/stockshopjdbc")
public class StockController {

    @Autowired
    StockService stockService;

    @PostMapping("/create")
    public Stocks2 createstocks(@RequestBody Stocks2 stocks2){
        return stockService.createStocks(stocks2);
    }

    @PostMapping("/createexc")
    public ResponseEntity createexception(@RequestBody Stocks2 stocks){
        return stockService.createexception(stocks);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Stocks2> updatejdbc(@RequestBody Stocks2 stocks2,@PathVariable Integer id ){
        return stockService.updateJdbc(stocks2,id);
    }

    @GetMapping("/retrieve")
    public List<Stocks2> getallstocks(){
        return stockService.getAllStocks();
    }

    @DeleteMapping("/delete/{id}")
    public String deletestkid(@PathVariable Integer id){
       return stockService.deleteStock(id);
    }

    @GetMapping("/find/{id}")
    public Stocks2 findspecific(@PathVariable Integer id) {
        Stocks2 gotvalue =  stockService.findSpecific(id);
        if(gotvalue == null){
            throw new StockNotFoundException("id:" +id);
        }
        return gotvalue;
    }

}
