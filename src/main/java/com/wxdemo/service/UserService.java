package com.wxdemo.service;

import java.util.List;

import com.wxdemo.model.User;

public interface UserService {
	
	int insert(User user);
	
	List<User> selectAll();

}
