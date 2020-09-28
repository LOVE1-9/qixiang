package com.wxdemo.service;

import java.util.List;

import com.wxdemo.model.Orders;

public interface OrdersService {
	
	public int insertOrder(Orders order);
	
	public List<Orders> selectAll();
	
	public List<Orders> selectAllByOpenid(String openid);
	
	public List<Orders> selectAllDoingOrdersByOpenid(String openid);
}
