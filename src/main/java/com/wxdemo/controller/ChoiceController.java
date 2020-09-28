package com.wxdemo.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import javax.websocket.server.PathParam;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.wxdemo.model.Choice;
import com.wxdemo.service.ChoiceService;
import com.wxdemo.util.ResultBody;

import cn.hutool.extra.tokenizer.Result;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;

@RestController
@Api(description="套餐精选管理",tags="Choice")
@RequestMapping("Choice")
public class ChoiceController {
	@Autowired
	ChoiceService choiceService;
	@Autowired
	Choice choice;
	
	@GetMapping("selectById")
	@ApiOperation(value="查询具体某个套餐精选",notes="根据小程序传过来的id来查对应的套餐")
	@ApiImplicitParam(name="id",value="套餐id")
	public ResultBody selectById(@RequestParam("id") int id) {
		choice = choiceService.selectById(id);
		return ResultBody.ok("成功查询套餐", choice);
		
	}
	
	@GetMapping("selectByIdList")
	@ApiOperation(value="查询idList里的套餐")
	@ApiImplicitParam(name="idlist",type="List")
	public ResultBody selectByIdList(@RequestParam("idlist") List list) {
		List<Choice> listAll = choiceService.selectByIdList(list);
		return ResultBody.ok("成功查询",listAll);
	}
	
	@GetMapping("getChoiceList")
	@ApiOperation(value="动态查询四个套餐用于小程序首页的使用",notes="自动生成id来查随机的套餐")
	public ResultBody getChoiceList() {
		Random ran = new Random();
		int z = 0;
		Choice choice = new Choice();
		List<Choice> listCache = new ArrayList();
		List<Choice> listAll = new ArrayList();
		listAll = choiceService.selectAll();
		
		//随机抽取不重复的四个套餐
		while(listCache.size() < 4) {
			z = ran.nextInt(50);
			for(int i = 0;i<listAll.size();i++) {
				if(z == listAll.get(i).getId()) {
					if(listCache.size() == 0) {
						listCache.add(listAll.get(i));
					}else{
						for(int j=0;j<listCache.size();j++) {
							if(z == listCache.get(j).getId()) {
								break;
							}else if(z != listCache.get(j).getId() && j == listCache.size()-1) {
								listCache.add(listAll.get(i));
							}
						}
						
					}
				}
			}
		}
//		for(int i=0;i<listCache.size();i++) {
//			choice = listCache.get(i);
//			System.out.println(choice.getId());
//		}
		return ResultBody.ok("成功查询四个随机不重复套餐",listCache);
		
	}
	@GetMapping("selectAll")
	@ApiOperation(value="查询所有套餐")
	public ResultBody selectAll() {
		List<Choice> listAll = new ArrayList();
		listAll = choiceService.selectAll();
		return ResultBody.ok("成功查询所有套餐", listAll);
	}

}
