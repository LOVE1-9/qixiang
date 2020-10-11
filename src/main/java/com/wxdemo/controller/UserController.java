package com.wxdemo.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.alibaba.fastjson.JSON;
import com.google.gson.Gson;
import com.wxdemo.model.User;
import com.wxdemo.service.UserService;
import com.wxdemo.util.ResultBody;

import cn.hutool.json.JSONObject;
import cn.hutool.json.JSONUtil;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
//import net.sf.json.JSONObject;
import io.swagger.annotations.ApiOperation;



@Api(value="/User",description="用户管理",tags="User")
@RestController
@RequestMapping("User")
public class UserController {
	
	@Autowired
	UserService  userService;
	
	@ApiOperation(value = "增加用户",notes="根据小程序传来的json字符串来创建user")
	@ApiImplicitParam(name="user",value="用户")
	@PostMapping(value="insertUser")
	public void insertUser(@RequestParam("user") String s) {
		//一种方法
//		JSONObject jsonObject = JSONUtil.parseObj(s);
//		User user = new User();
//		user.setWecharName(jsonObject.getStr("wechatName"));
//		user.setOpenId(jsonObject.getStr("openid"));
//		user.setGender(Integer.parseInt(jsonObject.getStr("gender")));
//		user.setUserCity(jsonObject.getStr("userCity"));	
//		int result = userService.insert(user);
		
		//第二种方法
//		User user = JSON.parseObject(s,User.class);
//		System.out.println(user.getWecharName());
//		System.out.println(user.getOpenId());
		//int result = userService.insert(user);
		
		//第三种方法
		Gson gson = new Gson();
		User user = gson.fromJson(s,User.class);
		List<User> list = new ArrayList();
		list = userService.selectAll();
		//来判断数据库里是否有这个用户的信息
		User u = new User();
		boolean b = true;
		if(list.size() != 0) {
			for(Object o:list) {
				 u= (User)o;
				if(user.getOpenId().equals( u.getOpenId())) {
					b = false;
				}
			}
			
		}
		
		if(b) {
			int result = userService.insert(user);
		}else {
			System.out.println("用户已存在");
		}
		//int result = userService.insert(user);
		
	}
	
	
	@GetMapping(value="selectAllUser")
	public ResultBody selectAllUser() {
		Gson gson = new Gson();
		List list = new ArrayList();
		list = userService.selectAll();
		System.out.println("selectAll");
		return ResultBody.ok("成功查询所有用户", gson.toJson(list));
	}

}
