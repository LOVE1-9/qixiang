package com.wxdemo.service.Impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.thymeleaf.standard.expression.OrExpression;

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


	
	public List<Orders> selectAllFinishOrdersByOpenid(String openid) {
		List<Orders> listAllFinish = ordersMapper.selectAllFinishByOpenid(openid);
		return listAllFinish;
	}


	
	public List<Orders> selectAllCnacelOrdersByOpenid(String openid) {
		List<Orders> listAllCancel = ordersMapper.selectAllCancelByOpenid(openid);
		return listAllCancel;
	}


	
	public List<Orders> selectAllNotPayOrdersByOpenid(String openid) {
		List<Orders> listAllNoPay = ordersMapper.selectAllNotPayByOpenid(openid);
		return listAllNoPay;
	}
	


}
