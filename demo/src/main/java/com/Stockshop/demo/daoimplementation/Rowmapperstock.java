package com.Stockshop.demo.daoimplementation;

import com.Stockshop.demo.model.Stocks2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class Rowmapperstock implements RowMapper<Stocks2> {

    @Override
    public Stocks2 mapRow(ResultSet rs, int rowNum) throws SQLException {

        Stocks2 stocks = new Stocks2();

        stocks.setId(rs.getInt("id"));
        stocks.setCategory(rs.getString("category"));
        stocks.setStockname(rs.getString("stockname"));
        stocks.setQuantity(rs.getInt("quantity"));
        stocks.setBaseprice(rs.getInt("baseprice"));
        stocks.setProfit(rs.getInt("profit"));
        stocks.setExpirydate(rs.getDate("expirydate"));
        return stocks;
    }
}
