package com.wxdemo.service.Impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wxdemo.mapper.OrdersMapper;
import com.wxdemo.model.Orders;
import com.wxdemo.service.OrdersService;

@Service
public class OrdersServiceImpl implements OrdersService {
	
	@Autowired
	OrdersMapper ordersMapper;

	public int insertOrder(Orders order) {
		int result = ordersMapper.insert(order);
		return result;
	}

	
	public List<Orders> selectAll() {
		List<Orders> listAll = ordersMapper.selectAll();
		return listAll;
	}


	
	public List<Orders> selectAllByOpenid(String openid) {
		List<Orders> listAll = ordersMapper.selectAllByOpenid(openid);
		return listAll;
	}


	
	public List<Orders> selectAllDoingOrdersByOpenid(String openid) {
		List<Orders> listAllDoing = ordersMapper.selectAllDoingByOpenid(openid);
		return listAllDoing;
	}
	


}
