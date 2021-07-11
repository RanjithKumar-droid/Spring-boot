package com.stockmanagement.demo.stockRepo;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.stockmanagement.demo.stockEntity.StockEntity;

@Repository
public interface StockRepository extends JpaRepository<StockEntity, Integer>{

	List<StockEntity> findAllBycategory(String category);

	boolean existsByStockname(String stkname);

	String updatetquery = "select * from stock_management.stocks where not stock_name = ?1";
	
	@Query(nativeQuery = true, value = updatetquery)
	List<StockEntity> updateDb(String string);
	
	
	
}
