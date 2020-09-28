package com.wxdemo.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import com.wxdemo.model.Choice;
import com.wxdemo.model.Orders;
import com.wxdemo.service.ChoiceService;
import com.wxdemo.service.OrdersService;
import com.wxdemo.util.ResultBody;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;

@RestController
@Api(description="订单管理",tags="orders")
@RequestMapping("Orders")
public class OrdersController {
	@Autowired
	OrdersService ordersService;
	@Autowired
	ChoiceService choiceService;
	
	
	
	@PostMapping("insertOrder")
	@ApiOperation(value="增加订单",notes="通过小程序传来的预约订单，存入到库中")
	@ApiImplicitParam(name="order",type="Ordes")
	public ResultBody insertOrder(@RequestParam("order") String order) {
		
		Gson gson = new Gson();
		Orders orders = gson.fromJson(order, Orders.class);
		
		int result = ordersService.insertOrder(orders);
		return ResultBody.ok("成功插入订单");
	}
	
	@GetMapping("selectAllOrders")
	@ApiOperation(value="查询所有订单")
	public ResultBody selectAllOrders() {
		List<Orders> listAll = ordersService.selectAll();
		return ResultBody.ok("成功查询所有订单", listAll);
	}
	
	@GetMapping("selectAllSpecificOrdersByOpenid")
	@ApiOperation(value="查询用户的所有详细订单",notes="根据小程序传过来的openid来查询,并且通过订单里的choiceId，来查询具体套餐")
	@ApiImplicitParam(name="openid",type="String")
	public ResultBody selectAllSpecificOrdersByOpenid(@RequestParam("openid") String openid) {
		List<Orders> listAll = ordersService.selectAllByOpenid(openid);
		
		
		//把各自套餐里的内容加到里面去
		List listChoiceid = new ArrayList();
		int i = 0;
		for(Orders order:listAll) {
			listChoiceid.add(order.getChoiceId());
		}
		
		List<Choice> listAllChoice = choiceService.selectByIdList(listChoiceid);
		for(Orders order:listAll) {
			for(Choice choice:listAllChoice) {
				if(order.getChoiceId() == choice.getId()) {
					order.setChoice(choice);
					break;
				}
			}
		}
		return ResultBody.ok("成功查询用户的所有订单", listAll);
	}
	
	@GetMapping("selectAllDoingOrdersByOpenid")
	@ApiOperation(value="查询所有正在进行中的订单")
	@ApiImplicitParam(name="openid",type="String")
	public ResultBody selectAllDoingOrdersByOpenid(@RequestParam("openid") String openid) {
		
		List<Orders> listAllDoing = ordersService.selectAllDoingOrdersByOpenid(openid);
		
		//把各自套餐里的内容加到里面去
		List listChoiceid = new ArrayList();
		int i = 0;
		for(Orders order:listAllDoing) {
			listChoiceid.add(order.getChoiceId());
		}
		
		List<Choice> listAllChoice = choiceService.selectByIdList(listChoiceid);
		for(Orders order:listAllDoing) {
			for(Choice choice:listAllChoice) {
				if(order.getChoiceId() == choice.getId()) {
					order.setChoice(choice);
					break;
				}
			}
		}
		return ResultBody.ok("成功查询所有正在进行中的订单", listAllDoing);
		
	}
	
}
