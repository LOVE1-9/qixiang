package com.wxdemo.service;

import java.util.List;

import com.wxdemo.model.Choice;
import com.wxdemo.util.ResultBody;

public interface ChoiceService {

	public Choice selectById(int id);
	
	public List<Choice> selectByIdList(List list);
	
	public List<Choice> selectAll();
}
