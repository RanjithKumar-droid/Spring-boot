package com.Stockshop.demo.daoimplementation;

import com.Stockshop.demo.dao.Stockdao;
import com.Stockshop.demo.model.Stocks2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.SQLException;
import java.util.List;

@Repository
public class Stockdaoimplementation implements Stockdao {

    private final String create = "insert into stocks2(category,stockname,quantity,baseprice,profit,expirydate) values(?,?,?,?,?,?)";
    private final String getall = "select id,category,stockname,quantity,baseprice,profit,expirydate from stocks2";
    private final String deleteid = "delete from stocks2 where id = ?";
//    private final String exists = "select stockname from stocks2";
    private final String getbyid = "select * from stocks2 where id = ?";



    @Autowired
    JdbcTemplate jdbctemplate;
    @Override
    public Stocks2 createStocks(Stocks2 stocks2) {
        try{
       jdbctemplate.update(create,stocks2.getCategory(),stocks2.getStockname(),stocks2.getQuantity(),stocks2.getBaseprice(),stocks2.getProfit(),stocks2.getExpirydate());
        }catch(DataIntegrityViolationException dtvexc){
           dtvexc.printStackTrace();
        }
        return stocks2;
    }

    @Override
    public List<Stocks2> getAllStocks() {
        List<Stocks2> dummtylist = jdbctemplate.query(getall,new Rowmapperstock());
        return dummtylist;
    }

        @Override
    public String deleteStock(Integer id) {
        jdbctemplate.update(deleteid,id);
        return "Deleted succesfully";
    }

    @Override
    public boolean createException(Stocks2 stocks) {

       return jdbctemplate.queryForObject("SELECT EXISTS(SELECT stockname FROM stocks2 WHERE stockname = ?)", Boolean.class, stocks.getStockname());
    }

    @SuppressWarnings("deprecation")
    @Override
    public Stocks2 findSpecific(Integer id) {
        Stocks2 ans = null;
        try{
           ans = jdbctemplate.queryForObject(getbyid, new Object[]{id}, new Rowmapperstock());

        }catch(EmptyResultDataAccessException e){
            e.printStackTrace();
        }
        return ans;
    }

}
