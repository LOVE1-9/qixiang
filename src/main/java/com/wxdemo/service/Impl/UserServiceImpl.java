package com.wxdemo.service.Impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wxdemo.mapper.UserMapper;
import com.wxdemo.model.User;
import com.wxdemo.service.UserService;

@Service
public class UserServiceImpl implements UserService{

	@Autowired
	UserMapper userMapper;
	
	
	
	@Override
	public int insert(User user) {
		int result = userMapper.insert(user);
		return result;
	}



	@Override
	public List<User> selectAll() {
		List<User> list = new ArrayList();
		list = userMapper.selectAll();
		return list;
	}

}
