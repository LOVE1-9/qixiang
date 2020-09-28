package com.wxdemo.service.Impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wxdemo.mapper.ChoiceMapper;
import com.wxdemo.model.Choice;
import com.wxdemo.service.ChoiceService;

@Service("ChoiceService")
public class ChoiceServiceImpl implements ChoiceService {
	@Autowired
	ChoiceMapper choiceMapper;
	
	@Autowired
	Choice choice;
	

	@Override
	public Choice selectById(int id) {
		choice = choiceMapper.selectByPrimaryKey(id);
		return choice;
	}


	@Override
	public List<Choice> selectByIdList(List list) {
		List<Choice> choiceList = choiceMapper.selectByIdList(list);
		return choiceList;
	}


	@Override
	public List<Choice> selectAll() {
		List<Choice> choiceList = choiceMapper.selectAll();
		return choiceList;
	}}
